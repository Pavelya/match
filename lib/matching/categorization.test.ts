import { describe, expect, it } from 'vitest'
import { categorizeMatch, getMatchCategory, getCategoryInfo } from './categorization'
import type { AcademicMatchScore } from './types'

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

// Strong fit: +7 points, 0.95 score, all subjects met
const safetyResult = categorizeMatch(0.95, 42, 35, createAcademicMatch())

// Significant gaps: -8 points, 0.40 score, missing subjects
const unlikelyResult = categorizeMatch(
  0.4,
  27,
  35,
  createAcademicMatch({
    missingCriticalCount: 1,
    subjectMatches: [
      {
        requirement: {
          courseId: 'c1',
          courseName: 'Physics',
          level: 'HL',
          minimumGrade: 5,
          isCritical: true
        },
        status: 'NO_MATCH',
        score: 0
      }
    ]
  })
)

describe('SAFETY category', () => {
  it('SAFETY: Strong fit category', () => {
    expect(safetyResult.category).toBe('SAFETY')
  })

  it('SAFETY: Has high confidence', () => {
    expect(safetyResult.confidenceIndicator).toBe('high')
  })

  it('SAFETY: Has factors', () => {
    expect(safetyResult.factors.length > 0).toBe(true)
  })

  it('SAFETY: Quick category function', () => {
    expect(getMatchCategory(0.95, 42, 35, true)).toBe('SAFETY')
  })
})

describe('MATCH category', () => {
  it('MATCH: Good fit category', () => {
    // Good fit: +2 points, 0.85 score, all subjects met
    const matchResult = categorizeMatch(0.85, 37, 35, createAcademicMatch())
    expect(matchResult.category).toBe('MATCH')
  })

  it('MATCH: Exactly meets requirements', () => {
    expect(getMatchCategory(0.8, 35, 35, true)).toBe('MATCH')
  })
})

describe('REACH category', () => {
  it('REACH: Aspirational category', () => {
    // Aspirational: -2 points, 0.65 score, partial subjects
    const reachResult = categorizeMatch(
      0.65,
      33,
      35,
      createAcademicMatch({
        subjectMatches: [
          {
            requirement: {
              courseId: 'c1',
              courseName: 'Math',
              level: 'HL',
              minimumGrade: 5,
              isCritical: false
            },
            status: 'PARTIAL_MATCH',
            score: 0.7
          }
        ]
      })
    )
    expect(reachResult.category).toBe('REACH')
  })

  it('REACH: Near miss with decent score', () => {
    // Near miss with score >= 0.45
    expect(getMatchCategory(0.5, 32, 35, false)).toBe('REACH')
  })
})

describe('UNLIKELY category', () => {
  it('UNLIKELY: Significant gaps category', () => {
    expect(unlikelyResult.category).toBe('UNLIKELY')
  })

  it('UNLIKELY: Has low confidence', () => {
    expect(unlikelyResult.confidenceIndicator).toBe('low')
  })

  it('UNLIKELY: Very low score', () => {
    expect(getMatchCategory(0.3, 28, 35, false)).toBe('UNLIKELY')
  })
})

describe('edge cases', () => {
  it('Edge: High score but missing subjects → not SAFETY', () => {
    expect(getMatchCategory(0.9, 40, 35, false)).not.toBe('SAFETY')
  })

  it('Edge: Good points but low score → REACH', () => {
    // Points above but score below MATCH threshold
    expect(getMatchCategory(0.7, 40, 35, true)).toBe('REACH')
  })

  it('Edge: Null required points → MATCH', () => {
    expect(getMatchCategory(0.85, 38, null, true)).toBe('MATCH')
  })

  it('Boundary: Score exactly at SAFETY threshold', () => {
    expect(getMatchCategory(0.92, 40, 35, true)).toBe('SAFETY')
  })

  it('Boundary: Score just below SAFETY', () => {
    expect(getMatchCategory(0.91, 40, 35, true)).toBe('MATCH')
  })
})

describe('category info', () => {
  it.each([
    ['SAFETY', 'Safety', 'green'],
    ['MATCH', 'Match', 'blue'],
    ['REACH', 'Reach', 'amber'],
    ['UNLIKELY', 'Unlikely', 'red']
  ] as const)('Info: %s has label %s and color %s', (category, label, color) => {
    const info = getCategoryInfo(category)
    expect(info.label).toBe(label)
    expect(info.color).toBe(color)
  })
})

describe('factors', () => {
  it('Factors: SAFETY has positive score factor', () => {
    expect(
      safetyResult.factors.some((f) => f.type === 'SCORE' && f.contribution === 'positive')
    ).toBe(true)
  })

  it('Factors: SAFETY has positive points factor', () => {
    expect(
      safetyResult.factors.some((f) => f.type === 'POINTS' && f.contribution === 'positive')
    ).toBe(true)
  })

  it('Factors: UNLIKELY has negative factors', () => {
    expect(unlikelyResult.factors.some((f) => f.contribution === 'negative')).toBe(true)
  })
})
