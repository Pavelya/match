import { expect, test } from 'vitest'
import { applyPenaltiesAndCaps } from './penalties'
import type { AcademicMatchScore, WeightConfig } from './types'

const defaultWeights: WeightConfig = {
  academic: 0.6,
  location: 0.3,
  field: 0.1
}

// === Test 1: Missing Critical Subject Cap ===

test('Missing critical subject → cap at 0.45', () => {
  const academicMatch: AcademicMatchScore = {
    score: 0.5,
    subjectsMatchScore: 0.5,
    meetsPointsRequirement: true,
    pointsShortfall: 0,
    subjectMatches: [
      {
        requirement: {
          courseId: 'math',
          courseName: 'Math',
          level: 'HL',
          minimumGrade: 6,
          isCritical: true
        },
        score: 0.0,
        status: 'NO_MATCH',
        reason: 'Subject not taken'
      }
    ],
    missingCriticalCount: 1,
    missingNonCriticalCount: 0
  }

  const result = applyPenaltiesAndCaps(0.95, academicMatch, 1.0, 1.0, defaultWeights)

  expect(result.finalScore).toBe(0.45)
  expect(result.caps.missingCriticalSubject).toBe(0.45)
  expect(result.reasons[0]).toContain('critical')
})

// === Test 2: Missing Non-Critical Subject Cap ===

test('Missing non-critical subject → cap at 0.70', () => {
  const academicMatch: AcademicMatchScore = {
    score: 0.5,
    subjectsMatchScore: 0.5,
    meetsPointsRequirement: true,
    pointsShortfall: 0,
    subjectMatches: [
      {
        requirement: {
          courseId: 'econ',
          courseName: 'Economics',
          level: 'SL',
          minimumGrade: 6,
          isCritical: false
        },
        score: 0.0,
        status: 'NO_MATCH',
        reason: 'Subject not taken'
      }
    ],
    missingCriticalCount: 0,
    missingNonCriticalCount: 1
  }

  const result = applyPenaltiesAndCaps(0.85, academicMatch, 1.0, 1.0, defaultWeights)

  expect(result.finalScore).toBe(0.7)
  expect(result.caps.missingNonCriticalSubject).toBe(0.7)
})

// === Test 3: Critical Near-Miss Cap ===

test('Critical subject near-miss → cap at 0.80', () => {
  const academicMatch: AcademicMatchScore = {
    score: 0.85,
    subjectsMatchScore: 0.85,
    meetsPointsRequirement: true,
    pointsShortfall: 0,
    subjectMatches: [
      {
        requirement: {
          courseId: 'math',
          courseName: 'Math',
          level: 'HL',
          minimumGrade: 6,
          isCritical: true
        },
        score: 0.85, // 1 point below
        status: 'PARTIAL_MATCH',
        reason: 'Grade 1 point below requirement'
      }
    ],
    missingCriticalCount: 0,
    missingNonCriticalCount: 0
  }

  const result = applyPenaltiesAndCaps(0.92, academicMatch, 1.0, 1.0, defaultWeights)

  expect(result.finalScore).toBe(0.8)
  expect(result.caps.criticalNearMiss).toBe(0.8)
})

// === Test 4: Points Shortfall Cap ===

test('Points not met → cap at 0.90', () => {
  const academicMatch: AcademicMatchScore = {
    score: 0.95,
    subjectsMatchScore: 1.0,
    meetsPointsRequirement: false,
    pointsShortfall: 2,
    subjectMatches: [
      {
        requirement: {
          courseId: 'bio',
          courseName: 'Biology',
          level: 'HL',
          minimumGrade: 6,
          isCritical: true
        },
        score: 1.0,
        status: 'FULL_MATCH'
      }
    ],
    missingCriticalCount: 0,
    missingNonCriticalCount: 0
  }

  const result = applyPenaltiesAndCaps(0.95, academicMatch, 1.0, 1.0, defaultWeights)

  expect(result.finalScore).toBe(0.9)
  expect(result.caps.unmetRequirements).toBe(0.9)
  expect(result.reasons[0]).toContain('2 IB points')
})

// === Test 5: Multiple Requirements Penalty ===

test('Multiple missing/low requirements → adjustment factor applied', () => {
  const academicMatch: AcademicMatchScore = {
    score: 0.5,
    subjectsMatchScore: 0.5,
    meetsPointsRequirement: true,
    pointsShortfall: 0,
    subjectMatches: [
      {
        requirement: {
          courseId: 'math',
          courseName: 'Math',
          level: 'HL',
          minimumGrade: 6,
          isCritical: false
        },
        score: 0.0,
        status: 'NO_MATCH'
      },
      {
        requirement: {
          courseId: 'phys',
          courseName: 'Physics',
          level: 'HL',
          minimumGrade: 6,
          isCritical: false
        },
        score: 0.5,
        status: 'PARTIAL_MATCH'
      },
      {
        requirement: {
          courseId: 'chem',
          courseName: 'Chemistry',
          level: 'HL',
          minimumGrade: 6,
          isCritical: false
        },
        score: 1.0,
        status: 'FULL_MATCH'
      },
      {
        requirement: {
          courseId: 'bio',
          courseName: 'Biology',
          level: 'HL',
          minimumGrade: 6,
          isCritical: false
        },
        score: 1.0,
        status: 'FULL_MATCH'
      }
    ],
    missingCriticalCount: 0,
    missingNonCriticalCount: 1
  }

  const result = applyPenaltiesAndCaps(0.6, academicMatch, 1.0, 1.0, defaultWeights)

  // 1 missing + 1 low out of 4: penalty = 0.25 + 0.5*0.25 = 0.375
  // adjustment = 1 - 0.4*0.375 = 0.85
  // 0.60 * 0.85 = 0.51
  expect(result.finalScore).toBeCloseTo(0.51, 2)
  expect(result.multipleRequirementsPenalty).toBeCloseTo(0.375, 2)
})

// === Test 6: Non-Academic Floor ===

test('Low academic but good location/field → floor applied', () => {
  const academicMatch: AcademicMatchScore = {
    score: 0.1,
    subjectsMatchScore: 0.1,
    meetsPointsRequirement: false,
    pointsShortfall: 10,
    subjectMatches: [],
    missingCriticalCount: 0,
    missingNonCriticalCount: 0
  }

  // L_M = 1.0, F_M = 1.0, weights = 0.3 / 0.1
  // Floor = 0.3*1*0.8 + 0.1*1*0.8 = 0.32
  const result = applyPenaltiesAndCaps(0.2, academicMatch, 1.0, 1.0, defaultWeights)

  expect(result.finalScore).toBeCloseTo(0.32, 2)
  expect(result.nonAcademicFloor).toBeCloseTo(0.32, 2)
})

// === Test 7: Minimum Score Guarantee ===

test('Meets points but very low score → floor at 0.15', () => {
  const academicMatch: AcademicMatchScore = {
    score: 0.05,
    subjectsMatchScore: 0.05,
    meetsPointsRequirement: true,
    pointsShortfall: 0,
    subjectMatches: [],
    missingCriticalCount: 0,
    missingNonCriticalCount: 0
  }

  const result = applyPenaltiesAndCaps(0.08, academicMatch, 0.0, 0.0, defaultWeights)

  expect(result.finalScore).toBe(0.15)
  expect(result.minimumScoreGuarantee).toBe(0.15)
})

// === Test 8: No Penalties Case ===

test('Perfect match → no adjustments', () => {
  const academicMatch: AcademicMatchScore = {
    score: 1.0,
    subjectsMatchScore: 1.0,
    meetsPointsRequirement: true,
    pointsShortfall: 0,
    subjectMatches: [
      {
        requirement: {
          courseId: 'bio',
          courseName: 'Biology',
          level: 'HL',
          minimumGrade: 6,
          isCritical: true
        },
        score: 1.0,
        status: 'FULL_MATCH'
      }
    ],
    missingCriticalCount: 0,
    missingNonCriticalCount: 0
  }

  const result = applyPenaltiesAndCaps(0.95, academicMatch, 1.0, 1.0, defaultWeights)

  expect(result.finalScore).toBe(0.95)
  expect(result.reasons.length).toBe(0)
})
