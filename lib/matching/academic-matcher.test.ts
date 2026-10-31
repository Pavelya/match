import { describe, expect, test } from 'vitest'
import { calculateAcademicMatch, pointsShortFactor } from './academic-matcher'
import type { StudentProfile, ProgramRequirements } from './types'

// Test Student Profile
const strongStudent: StudentProfile = {
  courses: [
    { courseId: 'bio', courseName: 'Biology', level: 'HL', grade: 7 },
    { courseId: 'chem', courseName: 'Chemistry', level: 'HL', grade: 7 },
    { courseId: 'math', courseName: 'Math', level: 'HL', grade: 6 },
    { courseId: 'eng', courseName: 'English', level: 'SL', grade: 7 },
    { courseId: 'spa', courseName: 'Spanish', level: 'SL', grade: 6 },
    { courseId: 'econ', courseName: 'Economics', level: 'SL', grade: 6 }
  ],
  totalIBPoints: 42,
  tokGrade: 'A',
  eeGrade: 'A',
  interestedFields: ['field-medicine'],
  preferredCountries: ['country-usa']
}

const weakerStudent: StudentProfile = {
  ...strongStudent,
  totalIBPoints: 35,
  courses: [
    { courseId: 'bio', courseName: 'Biology', level: 'HL', grade: 5 },
    { courseId: 'chem', courseName: 'Chemistry', level: 'HL', grade: 5 },
    { courseId: 'math', courseName: 'Math', level: 'HL', grade: 4 },
    { courseId: 'eng', courseName: 'English', level: 'SL', grade: 6 },
    { courseId: 'spa', courseName: 'Spanish', level: 'SL', grade: 5 },
    { courseId: 'econ', courseName: 'Economics', level: 'SL', grade: 5 }
  ]
}

// === Test 1: Points-Only Programs ===

test('Points-only: student meets requirement → score 1.0', () => {
  const program: ProgramRequirements = {
    programId: 'prog-1',
    programName: 'Business Program',
    universityId: 'uni-1',
    universityName: 'University A',
    type: 'POINTS_ONLY',
    fieldId: 'field-business',
    countryId: 'country-usa',
    minimumIBPoints: 40,
    requiredSubjects: [],
    orGroupRequirements: []
  }

  const result = calculateAcademicMatch(strongStudent, program)
  expect(result.score).toBe(1.0)
  expect(result.meetsPointsRequirement).toBe(true)
  expect(result.pointsShortfall).toBe(0)
})

test('Points-only: student 2 points below → 0.82, on the same curve as every program', () => {
  const program: ProgramRequirements = {
    programId: 'prog-2',
    programName: 'Business Program',
    universityId: 'uni-1',
    universityName: 'University A',
    type: 'POINTS_ONLY',
    fieldId: 'field-business',
    countryId: 'country-usa',
    minimumIBPoints: 37,
    requiredSubjects: [],
    orGroupRequirements: []
  }

  const result = calculateAcademicMatch(weakerStudent, program)
  expect(result.score).toBeCloseTo(0.82, 3)
  expect(result.meetsPointsRequirement).toBe(false)
  expect(result.pointsShortfall).toBe(2)
})

test('Points-only: large deficit → proportional score above 0.30', () => {
  const program: ProgramRequirements = {
    programId: 'prog-3',
    programName: 'Top Program',
    universityId: 'uni-1',
    universityName: 'University A',
    type: 'POINTS_ONLY',
    fieldId: 'field-business',
    countryId: 'country-usa',
    minimumIBPoints: 43,
    requiredSubjects: [],
    orGroupRequirements: []
  }

  const result = calculateAcademicMatch(weakerStudent, program) // 35 vs 43 = -8
  expect(result.score).toBeGreaterThan(0.3)
  expect(result.score).toBeLessThan(0.9)
  expect(result.meetsPointsRequirement).toBe(false)
})

// === Test 2: Subjects-Only Programs ===

test('Subjects-only: all requirements met → score 1.0', () => {
  const program: ProgramRequirements = {
    programId: 'prog-4',
    programName: 'Medicine Program',
    universityId: 'uni-1',
    universityName: 'University A',
    type: 'SUBJECTS_ONLY',
    fieldId: 'field-medicine',
    countryId: 'country-usa',
    requiredSubjects: [
      { courseId: 'bio', courseName: 'Biology', level: 'HL', minimumGrade: 6, isCritical: true },
      { courseId: 'chem', courseName: 'Chemistry', level: 'HL', minimumGrade: 6, isCritical: true }
    ],
    orGroupRequirements: []
  }

  const result = calculateAcademicMatch(strongStudent, program)
  expect(result.score).toBe(1.0)
  expect(result.subjectsMatchScore).toBe(1.0)
  expect(result.missingCriticalCount).toBe(0)
})

test('Subjects-only: partial match → proportional score', () => {
  const program: ProgramRequirements = {
    programId: 'prog-5',
    programName: 'Medicine Program',
    universityId: 'uni-1',
    universityName: 'University A',
    type: 'SUBJECTS_ONLY',
    fieldId: 'field-medicine',
    countryId: 'country-usa',
    requiredSubjects: [
      { courseId: 'bio', courseName: 'Biology', level: 'HL', minimumGrade: 6, isCritical: true },
      { courseId: 'phys', courseName: 'Physics', level: 'HL', minimumGrade: 6, isCritical: false }
    ],
    orGroupRequirements: []
  }

  const result = calculateAcademicMatch(weakerStudent, program)
  // Bio: 5 vs 6 (critical, 1 below) = 0.85
  // Phys: not taken = 0.0
  // Average: 0.425
  expect(result.score).toBeCloseTo(0.425, 1)
  expect(result.missingCriticalCount).toBe(0)
  expect(result.missingNonCriticalCount).toBe(1)
})

// === Test 3: Full Requirements Programs ===

test('Full requirements: meets both points and subjects → score 1.0', () => {
  const program: ProgramRequirements = {
    programId: 'prog-6',
    programName: 'Medicine Program',
    universityId: 'uni-1',
    universityName: 'University A',
    type: 'FULL_REQUIREMENTS',
    fieldId: 'field-medicine',
    countryId: 'country-usa',
    minimumIBPoints: 40,
    requiredSubjects: [
      { courseId: 'bio', courseName: 'Biology', level: 'HL', minimumGrade: 6, isCritical: true }
    ],
    orGroupRequirements: []
  }

  const result = calculateAcademicMatch(strongStudent, program)
  expect(result.score).toBe(1.0)
  expect(result.meetsPointsRequirement).toBe(true)
  expect(result.subjectsMatchScore).toBe(1.0)
})

test('Full requirements: meets subjects but not points → score scaled down', () => {
  const program: ProgramRequirements = {
    programId: 'prog-7',
    programName: 'Medicine Program',
    universityId: 'uni-1',
    universityName: 'University A',
    type: 'FULL_REQUIREMENTS',
    fieldId: 'field-medicine',
    countryId: 'country-usa',
    minimumIBPoints: 40,
    requiredSubjects: [
      { courseId: 'bio', courseName: 'Biology', level: 'HL', minimumGrade: 5, isCritical: true }
    ],
    orGroupRequirements: []
  }

  const result = calculateAcademicMatch(weakerStudent, program) // 35 points vs 40
  // Subjects score = 1.0 (Bio HL 5 meets requirement)
  // Points shortfall: 5 points -> factor 0.73
  expect(result.score).toBeLessThan(1.0)
  expect(result.score).toBeGreaterThan(0.4)
  expect(result.meetsPointsRequirement).toBe(false)
  expect(result.subjectsMatchScore).toBe(1.0)
})

test('Full requirements: meets points but not all subjects → lower score', () => {
  const program: ProgramRequirements = {
    programId: 'prog-8',
    programName: 'Medicine Program',
    universityId: 'uni-1',
    universityName: 'University A',
    type: 'FULL_REQUIREMENTS',
    fieldId: 'field-medicine',
    countryId: 'country-usa',
    minimumIBPoints: 40,
    requiredSubjects: [
      { courseId: 'bio', courseName: 'Biology', level: 'HL', minimumGrade: 6, isCritical: true },
      { courseId: 'phys', courseName: 'Physics', level: 'HL', minimumGrade: 6, isCritical: true }
    ],
    orGroupRequirements: []
  }

  const result = calculateAcademicMatch(strongStudent, program)
  // Bio: 7 vs 6 = 1.0
  // Phys: not taken = 0.0
  // Average subjects: 0.5
  expect(result.score).toBe(0.5)
  expect(result.meetsPointsRequirement).toBe(true)
  expect(result.subjectsMatchScore).toBe(0.5)
  expect(result.missingCriticalCount).toBe(1)
})

// === Test 4: A bigger gap never scores higher (MAINT 5.43) ===

describe('points short: one curve for every program', () => {
  const MINIMUMS = [24, 30, 36, 45]
  const SHORT = Array.from({ length: 21 }, (_, i) => i + 1)

  const program = (
    minimumIBPoints: number,
    requiredSubjects: ProgramRequirements['requiredSubjects'] = []
  ): ProgramRequirements => ({
    programId: 'program',
    programName: 'Program',
    universityId: 'university',
    universityName: 'University',
    type: requiredSubjects.length > 0 ? 'FULL_REQUIREMENTS' : 'POINTS_ONLY',
    fieldId: 'field-medicine',
    countryId: 'country-usa',
    minimumIBPoints,
    requiredSubjects,
    orGroupRequirements: []
  })

  const score = (p: ProgramRequirements, short: number) =>
    calculateAcademicMatch({ ...strongStudent, totalIBPoints: (p.minimumIBPoints ?? 0) - short }, p)
      .score

  const SUBJECTS = {
    'one subject, met': [
      { courseId: 'bio', courseName: 'Biology', level: 'HL', minimumGrade: 6, isCritical: true }
    ],
    'several subjects, met': [
      { courseId: 'bio', courseName: 'Biology', level: 'HL', minimumGrade: 6, isCritical: true },
      { courseId: 'chem', courseName: 'Chemistry', level: 'HL', minimumGrade: 6, isCritical: false }
    ],
    'several subjects, one not taken': [
      { courseId: 'bio', courseName: 'Biology', level: 'HL', minimumGrade: 6, isCritical: true },
      { courseId: 'phys', courseName: 'Physics', level: 'HL', minimumGrade: 6, isCritical: false }
    ]
  } satisfies Record<string, ProgramRequirements['requiredSubjects']>

  const SHAPES = { 'points only': [], ...SUBJECTS }

  describe.each(Object.entries(SHAPES))('%s', (_, subjects) => {
    test.each(MINIMUMS)('minimum %i: falls or stays with each point, under 0 short', (minimum) => {
      const p = program(minimum, subjects)
      const scores = [0, ...SHORT].map((short) => score(p, short))
      scores.slice(1).forEach((value, i) => expect(value).toBeLessThanOrEqual(scores[i]))
      expect(scores[1]).toBeLessThan(scores[0])
    })

    test('does not depend on the minimum', () => {
      for (const short of SHORT) {
        const [first, ...rest] = MINIMUMS.map((minimum) => score(program(minimum, subjects), short))
        rest.forEach((value) => expect(value).toBeCloseTo(first, 10))
      }
    })
  })

  test('a points-only program and one with its subjects met score the same', () => {
    const subjects = SUBJECTS['one subject, met']
    for (const short of SHORT) {
      expect(score(program(40), short)).toBeCloseTo(score(program(40, subjects), short), 10)
    }
  })

  test('falls with every point until the floor, so nothing ties from 1 to 5 short', () => {
    const factors = SHORT.map(pointsShortFactor)
    factors.slice(1, 12).forEach((value, i) => expect(value).toBeLessThan(factors[i]))
    expect(factors[11]).toBeCloseTo(0.52, 10)
    expect(factors.slice(12)).toEqual(Array(9).fill(0.5))
  })

  test.each([
    [1, 0.85],
    [2, 0.82],
    [3, 0.79],
    [4, 0.76],
    [7, 0.67],
    [10, 0.58]
  ])('%i short keeps %f', (short, factor) => {
    expect(pointsShortFactor(short)).toBeCloseTo(factor, 10)
  })
})
