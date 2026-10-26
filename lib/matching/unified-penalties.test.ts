import { describe, expect, it } from 'vitest'
import { applyUnifiedPenalties, UNIFIED_PENALTY_CONSTANTS } from './unified-penalties'
import type { AcademicMatchScore, WeightConfig, SubjectMatchDetail } from './types'

const defaultWeights: WeightConfig = {
  academic: 0.6,
  location: 0.3,
  field: 0.1
}

function createAcademicMatch(overrides: Partial<AcademicMatchScore> = {}): AcademicMatchScore {
  return {
    score: 1.0,
    subjectsMatchScore: 1.0,
    meetsPointsRequirement: true,
    pointsShortfall: 0,
    subjectMatches: [],
    missingCriticalCount: 0,
    missingNonCriticalCount: 0,
    ...overrides
  }
}

function createSubjectMatch(
  status: 'FULL_MATCH' | 'PARTIAL_MATCH' | 'NO_MATCH',
  score: number,
  isCritical: boolean = false
): SubjectMatchDetail {
  return {
    requirement: {
      courseId: 'test-course',
      courseName: 'Test Course',
      level: 'HL' as const,
      minimumGrade: 5 as const,
      isCritical
    },
    status,
    score,
    reason: status === 'PARTIAL_MATCH' ? 'Grade below requirement' : undefined
  }
}

/** Inclusive, with the 0.001 slack the old script allowed at both ends. */
function expectBetween(actual: number, min: number, max: number) {
  expect(actual).toBeGreaterThanOrEqual(min - 0.001)
  expect(actual).toBeLessThanOrEqual(max + 0.001)
}

describe('full match', () => {
  const fullMatch = applyUnifiedPenalties(
    1.0,
    createAcademicMatch(),
    1.0, // location
    1.0, // field
    defaultWeights
  )

  it('Full match: finalScore = 1.0, with no penalty, cap or floor', () => {
    expect(fullMatch.finalScore).toBe(1.0)
    expect(fullMatch.appliedPenalties.length).toBe(0)
    expect(fullMatch.appliedCaps.length).toBe(0)
    expect(fullMatch.floorApplied).toBe(false)
  })
})

describe('points shortfall', () => {
  const pointsShortfall = applyUnifiedPenalties(
    0.9,
    createAcademicMatch({ meetsPointsRequirement: false, pointsShortfall: 3 }),
    1.0,
    1.0,
    defaultWeights
  )

  it('Points shortfall: has penalty', () => {
    expect(pointsShortfall.appliedPenalties.length).toBeGreaterThan(0)
  })

  it('Points shortfall: has cap', () => {
    expect(pointsShortfall.appliedCaps.some((c) => c.type === 'POINTS_UNMET')).toBe(true)
  })

  it('Points shortfall: finalScore in range', () => {
    expectBetween(pointsShortfall.finalScore, 0.82, 0.9)
  })
})

describe('missing critical subject', () => {
  const missingCritical = applyUnifiedPenalties(
    0.85,
    createAcademicMatch({
      missingCriticalCount: 1,
      subjectMatches: [createSubjectMatch('NO_MATCH', 0, true)]
    }),
    1.0,
    1.0,
    defaultWeights
  )

  it('Missing critical: capped at 0.45', () => {
    expect(missingCritical.finalScore).toBeLessThanOrEqual(0.45)
    expect(missingCritical.effectiveCap).toBe(0.45)
  })

  it('Missing critical: has cap', () => {
    expect(missingCritical.appliedCaps.some((c) => c.type === 'CRITICAL_MISSING')).toBe(true)
  })
})

describe('critical near-miss', () => {
  const criticalNearMiss = applyUnifiedPenalties(
    0.9,
    createAcademicMatch({
      subjectMatches: [createSubjectMatch('PARTIAL_MATCH', 0.85, true)]
    }),
    1.0,
    1.0,
    defaultWeights
  )

  it('Critical near-miss: capped at 0.80', () => {
    expect(criticalNearMiss.finalScore).toBeLessThanOrEqual(0.8)
  })

  it('Critical near-miss: has cap', () => {
    expect(criticalNearMiss.appliedCaps.some((c) => c.type === 'CRITICAL_NEAR_MISS')).toBe(true)
  })
})

describe('multiple issues', () => {
  const multipleIssues = applyUnifiedPenalties(
    0.8,
    createAcademicMatch({
      meetsPointsRequirement: false,
      pointsShortfall: 5,
      missingNonCriticalCount: 1,
      subjectMatches: [
        createSubjectMatch('NO_MATCH', 0, false),
        createSubjectMatch('PARTIAL_MATCH', 0.7, false)
      ]
    }),
    0.5,
    0.5,
    defaultWeights
  )

  it('Multiple issues: multiple penalties', () => {
    expect(multipleIssues.appliedPenalties.length).toBeGreaterThanOrEqual(2)
  })

  it('Multiple issues: has caps', () => {
    expect(multipleIssues.appliedCaps.length).toBeGreaterThan(0)
  })

  it('Multiple issues: reasonable score', () => {
    expectBetween(multipleIssues.finalScore, 0.15, 0.7)
  })

  it('Penalty breakdown: each has a type, value and description', () => {
    expect(multipleIssues.appliedPenalties.every((p) => !!p.type)).toBe(true)
    expect(multipleIssues.appliedPenalties.every((p) => p.value >= 0)).toBe(true)
    expect(multipleIssues.appliedPenalties.every((p) => !!p.description)).toBe(true)
  })

  it('Cap breakdown: each has a type, value and description', () => {
    expect(multipleIssues.appliedCaps.every((c) => !!c.type)).toBe(true)
    expect(multipleIssues.appliedCaps.every((c) => c.value >= 0)).toBe(true)
    expect(multipleIssues.appliedCaps.every((c) => !!c.description)).toBe(true)
  })
})

describe('score floor', () => {
  const veryLowScore = applyUnifiedPenalties(
    0.1,
    createAcademicMatch({
      meetsPointsRequirement: false,
      pointsShortfall: 15,
      missingCriticalCount: 2
    }),
    0.0,
    0.0,
    defaultWeights
  )

  it('Floor: score >= 0.15', () => {
    expect(veryLowScore.finalScore).toBeGreaterThanOrEqual(UNIFIED_PENALTY_CONSTANTS.SCORE_FLOOR)
  })

  it('Floor: floor applied flag', () => {
    expect(veryLowScore.floorApplied || veryLowScore.finalScore === 0.15).toBe(true)
  })
})

describe('order independence', () => {
  it('Order independence: same inputs = same output', () => {
    const run = () =>
      applyUnifiedPenalties(
        0.85,
        createAcademicMatch({
          meetsPointsRequirement: false,
          pointsShortfall: 2,
          subjectMatches: [createSubjectMatch('PARTIAL_MATCH', 0.8, false)]
        }),
        0.8,
        0.6,
        defaultWeights
      )
    const first = run()
    const second = run()
    expect(second.finalScore).toBe(first.finalScore)
    expect(second.appliedPenalties.length).toBe(first.appliedPenalties.length)
  })
})

describe('max penalty cap', () => {
  it('Max penalty: totalPenaltyFactor <= 0.60', () => {
    const extremePenalties = applyUnifiedPenalties(
      1.0,
      createAcademicMatch({
        meetsPointsRequirement: false,
        pointsShortfall: 20,
        missingNonCriticalCount: 3,
        subjectMatches: [
          createSubjectMatch('NO_MATCH', 0, false),
          createSubjectMatch('NO_MATCH', 0, false),
          createSubjectMatch('NO_MATCH', 0, false)
        ]
      }),
      0.0,
      0.0,
      defaultWeights
    )
    expect(extremePenalties.totalPenaltyFactor).toBeLessThanOrEqual(0.6)
  })
})
