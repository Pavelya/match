/**
 * Manual test verification for Subject Requirement Matching
 * Run with: npx tsx lib/matching/subject-matcher.verify.ts
 */

import { calculateSubjectMatch, calculateORGroupMatch } from './subject-matcher'
import type { StudentCourse, SubjectRequirement, ORGroupRequirement } from './types'

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

console.log('\n🧪 Subject Requirement Matching Verification Tests\n')

// Test Data Setup
const studentCourses: StudentCourse[] = [
  { courseId: 'bio', courseName: 'Biology', level: 'HL', grade: 7 },
  { courseId: 'chem', courseName: 'Chemistry', level: 'HL', grade: 6 },
  { courseId: 'math', courseName: 'Math', level: 'HL', grade: 5 },
  { courseId: 'eng', courseName: 'English', level: 'SL', grade: 7 },
  { courseId: 'spa', courseName: 'Spanish', level: 'SL', grade: 6 },
  { courseId: 'econ', courseName: 'Economics', level: 'SL', grade: 4 }
]

// === Test 1: Full Matches ===
console.log('Test Group 1: Full Matches\n')

test('Full match: exact level and grade met', () => {
  const req: SubjectRequirement = {
    courseId: 'bio',
    courseName: 'Biology',
    level: 'HL',
    minimumGrade: 6,
    isCritical: true
  }
  const result = calculateSubjectMatch(req, studentCourses)
  expect(result.score).toBe(1.0)
  expect(result.status).toBe('FULL_MATCH')
})

test('Full match: student grade exceeds requirement', () => {
  const req: SubjectRequirement = {
    courseId: 'bio',
    courseName: 'Biology',
    level: 'HL',
    minimumGrade: 5,
    isCritical: false
  }
  const result = calculateSubjectMatch(req, studentCourses)
  expect(result.score).toBe(1.0)
  expect(result.status).toBe('FULL_MATCH')
})

test('Full match: HL student for SL requirement', () => {
  const req: SubjectRequirement = {
    courseId: 'eng',
    courseName: 'English',
    level: 'SL',
    minimumGrade: 6,
    isCritical: false
  }
  // Student has English SL 7, which meets SL 6
  const result = calculateSubjectMatch(req, studentCourses)
  expect(result.score).toBe(1.0)
  expect(result.status).toBe('FULL_MATCH')
})

// === Test 2: No Match (Subject Not Taken) ===
console.log('\nTest Group 2: No Match - Subject Not Taken\n')

test('No match: student did not take physics', () => {
  const req: SubjectRequirement = {
    courseId: 'phys',
    courseName: 'Physics',
    level: 'HL',
    minimumGrade: 6,
    isCritical: true
  }
  const result = calculateSubjectMatch(req, studentCourses)
  expect(result.score).toBe(0.0)
  expect(result.status).toBe('NO_MATCH')
})

// === Test 3: Grade Shortfall (Same Level) ===
console.log('\nTest Group 3: Grade Shortfall - Same Level\n')

test('Grade shortfall: critical subject, 1 point below → 0.85', () => {
  const req: SubjectRequirement = {
    courseId: 'math',
    courseName: 'Math',
    level: 'HL',
    minimumGrade: 6,
    isCritical: true
  }
  // Student has Math HL 5, requirement is 6
  const result = calculateSubjectMatch(req, studentCourses)
  expect(result.score).toBe(0.85)
  expect(result.status).toBe('PARTIAL_MATCH')
})

test('Grade shortfall: non-critical subject, 1 point below → ~0.78', () => {
  const req: SubjectRequirement = {
    courseId: 'spa',
    courseName: 'Spanish',
    level: 'SL',
    minimumGrade: 7,
    isCritical: false
  }
  // Student has Spanish SL 6, requirement is 7
  const result = calculateSubjectMatch(req, studentCourses)
  expect(result.score).toBe(0.78)
  expect(result.status).toBe('PARTIAL_MATCH')
})

test('Grade shortfall: 2 points below → proportional score', () => {
  const req: SubjectRequirement = {
    courseId: 'econ',
    courseName: 'Economics',
    level: 'SL',
    minimumGrade: 7,
    isCritical: false
  }
  // Student has Economics SL 4, requirement is 7 (3 points below)
  // This tests larger gap scores
  const result = calculateSubjectMatch(req, studentCourses)
  expect(result.score).toBeGreaterThan(0.25) // At least minimum
  expect(result.score).toBeLessThan(0.78) // Less than 1-point shortfall
  expect(result.status).toBe('PARTIAL_MATCH')
})

test('Grade shortfall: minimum floor of 0.25', () => {
  const req: SubjectRequirement = {
    courseId: 'econ',
    courseName: 'Economics',
    level: 'SL',
    minimumGrade: 7,
    isCritical: false
  }
  // Student has Economics SL 4, requirement is 7 (3 points below)
  const result = calculateSubjectMatch(req, studentCourses)
  expect(result.score).toBeGreaterThan(0.24) // At least minimum
  expect(result.status).toBe('PARTIAL_MATCH')
})

// === Test 4: Level Mismatch (SL for HL) ===
console.log('\nTest Group 4: Level Mismatch - SL instead of HL\n')

test('Level mismatch: SL 7 for HL 6 requirement → ~0.80', () => {
  const req: SubjectRequirement = {
    courseId: 'eng',
    courseName: 'English',
    level: 'HL',
    minimumGrade: 6,
    isCritical: false
  }
  // Student has English SL 7, requirement is HL 6
  const result = calculateSubjectMatch(req, studentCourses)
  expect(result.score).toBeCloseTo(0.8, 1)
  expect(result.status).toBe('PARTIAL_MATCH')
})

test('Level mismatch: SL 4 for HL 6 → low partial score', () => {
  const req: SubjectRequirement = {
    courseId: 'econ',
    courseName: 'Economics',
    level: 'HL',
    minimumGrade: 6,
    isCritical: false
  }
  // Student has Economics SL 4, requirement is HL 6
  const result = calculateSubjectMatch(req, studentCourses)
  expect(result.score).toBeCloseTo(0.25, 1) // Should be around minimum
  expect(result.status).toBe('PARTIAL_MATCH')
})

// === Test 5: OR-Group Requirements ===
console.log('\nTest Group 5: OR-Group Requirements\n')

test('OR-group: one option fully met → score 1.0', () => {
  const orGroup: ORGroupRequirement = {
    options: [
      { courseId: 'phys', courseName: 'Physics', level: 'HL', minimumGrade: 6, isCritical: true },
      { courseId: 'chem', courseName: 'Chemistry', level: 'HL', minimumGrade: 6, isCritical: true }
    ],
    isCritical: true
  }
  // Student has Chemistry HL 6, which fully meets one option
  const result = calculateORGroupMatch(orGroup, studentCourses)
  expect(result.score).toBe(1.0)
  expect(result.status).toBe('FULL_MATCH')
})

test('OR-group: best partial match taken', () => {
  const orGroup: ORGroupRequirement = {
    options: [
      { courseId: 'phys', courseName: 'Physics', level: 'HL', minimumGrade: 6, isCritical: false },
      { courseId: 'math', courseName: 'Math', level: 'HL', minimumGrade: 6, isCritical: true }
    ],
    isCritical: true
  }
  // Student has Math HL 5 (1 below), no Physics
  // Should take Math's partial score (0.85 for critical 1-below)
  const result = calculateORGroupMatch(orGroup, studentCourses)
  expect(result.score).toBe(0.85)
  expect(result.status).toBe('PARTIAL_MATCH')
})

test('OR-group: no options met → score 0.0', () => {
  const orGroup: ORGroupRequirement = {
    options: [
      { courseId: 'phys', courseName: 'Physics', level: 'HL', minimumGrade: 6, isCritical: false },
      {
        courseId: 'cs',
        courseName: 'Computer Science',
        level: 'HL',
        minimumGrade: 6,
        isCritical: false
      }
    ],
    isCritical: false
  }
  // Student took neither Physics nor CS
  const result = calculateORGroupMatch(orGroup, studentCourses)
  expect(result.score).toBe(0.0)
  expect(result.status).toBe('NO_MATCH')
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
