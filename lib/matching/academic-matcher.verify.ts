/**
 * Manual test verification for Academic Match (G_M)
 * Run with: npx tsx lib/matching/academic-matcher.verify.ts
 */

import { calculateAcademicMatch } from './academic-matcher'
import type { StudentProfile, ProgramRequirements } from './types'

let passed = 0
let failed = 0

function test(description: string, fn: () => void) {
  try {
    fn()
    console.log(`✅ ${description}`)
    passed++
  } catch (error) {
    console.log(`❌ ${description}`)
    console.log(`   ${error instanceof Error ? error.message : error}`)
    failed++
  }
}

function expect(value: unknown) {
  return {
    toBe(expected: unknown) {
      if (value !== expected) {
        throw new Error(`Expected ${expected} but got ${value}`)
      }
    },
    toBeCloseTo(expected: number, precision = 2) {
      const actual = value as number
      const diff = Math.abs(actual - expected)
      const tolerance = Math.pow(10, -precision)
      if (diff > tolerance) {
        throw new Error(`Expected ${expected} but got ${actual} (diff: ${diff})`)
      }
    },
    toBeGreaterThan(expected: number) {
      if ((value as number) <= expected) {
        throw new Error(`Expected > ${expected} but got ${value}`)
      }
    },
    toBeLessThan(expected: number) {
      if ((value as number) >= expected) {
        throw new Error(`Expected < ${expected} but got ${value}`)
      }
    }
  }
}

console.log('\n🧪 Academic Match (G_M) Verification Tests\n')

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
console.log('Test Group 1: Points-Only Programs\n')

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

test('Points-only: student 2 points below → capped at 0.90', () => {
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
  expect(result.score).toBeCloseTo(0.9, 1)
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
console.log('\nTest Group 2: Subjects-Only Programs\n')

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
console.log('\nTest Group 3: Full Requirements Programs\n')

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
  // Points shortfall: 5 points -> penalty factor ~0.5-0.8
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

// Summary
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`)

if (failed === 0) {
  console.log('🎉 All tests passed!\n')
  process.exit(0)
} else {
  console.log('❌ Some tests failed\n')
  process.exit(1)
}
