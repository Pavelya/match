/* eslint-disable no-console */
/**
 * Manual verification script for OR-group subject display fix
 *
 * This script manually tests the OR-group matching logic to verify
 * that matchedCourseId and matchedCourseName are correctly populated.
 *
 * Run with: npx tsx lib/matching/or-group-display-verify.ts
 */

import { calculateORGroupMatch } from './subject-matcher'
import type { ORGroupRequirement, StudentCourse } from './types'

console.log('🧪 OR-Group Subject Display Fix - Verification Tests\n')
console.log('='.repeat(70))

let passCount = 0
let failCount = 0

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`)
    passCount++
  } else {
    console.log(`❌ FAIL: ${testName}`)
    if (details) console.log(`   ${details}`)
    failCount++
  }
}

// Test 1: Full match in OR-group
console.log('\n📋 Test 1: Full match - Computer Science (not Biology)')
{
  const studentCourses: StudentCourse[] = [
    {
      courseId: 'cs-hl',
      courseName: 'Computer Science',
      level: 'HL',
      grade: 6
    }
  ]

  const orGroup: ORGroupRequirement = {
    options: [
      {
        courseId: 'bio-hl',
        courseName: 'Biology',
        level: 'HL',
        minimumGrade: 5,
        isCritical: true
      },
      {
        courseId: 'cs-hl',
        courseName: 'Computer Science',
        level: 'HL',
        minimumGrade: 5,
        isCritical: true
      },
      {
        courseId: 'econ-hl',
        courseName: 'Economics',
        level: 'HL',
        minimumGrade: 5,
        isCritical: true
      }
    ],
    isCritical: true
  }

  const result = calculateORGroupMatch(orGroup, studentCourses)

  assert(result.status === 'FULL_MATCH', 'Status is FULL_MATCH')
  assert(result.score === 1.0, 'Score is 1.0')
  assert(result.matchedCourseId === 'cs-hl', 'matchedCourseId is cs-hl')
  assert(result.matchedCourseName === 'Computer Science', 'matchedCourseName is Computer Science')
  assert(result.reason?.includes('Computer Science') ?? false, 'Reason includes Computer Science')
  assert(!(result.reason?.includes('Biology') ?? true), 'Reason does NOT include Biology')
}

// Test 2: Partial match in OR-group
console.log('\n📋 Test 2: Partial match - SL instead of HL')
{
  const studentCourses: StudentCourse[] = [
    {
      courseId: 'cs-sl',
      courseName: 'Computer Science',
      level: 'SL',
      grade: 6
    }
  ]

  const orGroup: ORGroupRequirement = {
    options: [
      {
        courseId: 'bio-hl',
        courseName: 'Biology',
        level: 'HL',
        minimumGrade: 5,
        isCritical: true
      },
      {
        courseId: 'cs-sl',
        courseName: 'Computer Science',
        level: 'HL', // Requires HL but student has SL
        minimumGrade: 5,
        isCritical: true
      }
    ],
    isCritical: true
  }

  const result = calculateORGroupMatch(orGroup, studentCourses)

  assert(result.status === 'PARTIAL_MATCH', 'Status is PARTIAL_MATCH')
  assert(result.matchedCourseId === 'cs-sl', 'matchedCourseId is cs-sl')
  assert(result.matchedCourseName === 'Computer Science', 'matchedCourseName is Computer Science')
}

// Test 3: No match in OR-group
console.log('\n📋 Test 3: No match - Student has different subjects')
{
  const studentCourses: StudentCourse[] = [
    {
      courseId: 'hist-sl',
      courseName: 'History',
      level: 'SL',
      grade: 6
    }
  ]

  const orGroup: ORGroupRequirement = {
    options: [
      {
        courseId: 'bio-hl',
        courseName: 'Biology',
        level: 'HL',
        minimumGrade: 5,
        isCritical: true
      },
      {
        courseId: 'cs-hl',
        courseName: 'Computer Science',
        level: 'HL',
        minimumGrade: 5,
        isCritical: true
      }
    ],
    isCritical: true
  }

  const result = calculateORGroupMatch(orGroup, studentCourses)

  assert(result.status === 'NO_MATCH', 'Status is NO_MATCH')
  assert(result.score === 0.0, 'Score is 0.0')
  assert(result.matchedCourseId === undefined, 'matchedCourseId is undefined')
  assert(result.matchedCourseName === undefined, 'matchedCourseName is undefined')
  assert(
    result.reason?.includes('None of the OR options met') ?? false,
    'Reason indicates no match'
  )
}

// Test 4: Grade below requirement
console.log('\n📋 Test 4: Low grade - tracks matched course even when grade is low')
{
  const studentCourses: StudentCourse[] = [
    {
      courseId: 'cs-hl',
      courseName: 'Computer Science',
      level: 'HL',
      grade: 4 // Below minimum of 5
    }
  ]

  const orGroup: ORGroupRequirement = {
    options: [
      {
        courseId: 'bio-hl',
        courseName: 'Biology',
        level: 'HL',
        minimumGrade: 5,
        isCritical: true
      },
      {
        courseId: 'cs-hl',
        courseName: 'Computer Science',
        level: 'HL',
        minimumGrade: 5,
        isCritical: true
      }
    ],
    isCritical: true
  }

  const result = calculateORGroupMatch(orGroup, studentCourses)

  assert(result.status === 'PARTIAL_MATCH', 'Status is PARTIAL_MATCH')
  assert(result.matchedCourseId === 'cs-hl', 'Still tracks Computer Science')
  assert(result.reason?.includes('Computer Science') ?? false, 'Reason mentions Computer Science')
}

// Test 5: Empty OR-group
console.log('\n📋 Test 5: Empty OR-group - handles gracefully')
{
  const studentCourses: StudentCourse[] = []

  const orGroup: ORGroupRequirement = {
    options: [],
    isCritical: true
  }

  const result = calculateORGroupMatch(orGroup, studentCourses)

  assert(result.status === 'NO_MATCH', 'Status is NO_MATCH for empty OR-group')
  assert(result.score === 0.0, 'Score is 0.0')
}

// Test 6: Single option OR-group
console.log('\n📋 Test 6: Single option OR-group')
{
  const studentCourses: StudentCourse[] = [
    {
      courseId: 'cs-hl',
      courseName: 'Computer Science',
      level: 'HL',
      grade: 6
    }
  ]

  const orGroup: ORGroupRequirement = {
    options: [
      {
        courseId: 'cs-hl',
        courseName: 'Computer Science',
        level: 'HL',
        minimumGrade: 5,
        isCritical: true
      }
    ],
    isCritical: true
  }

  const result = calculateORGroupMatch(orGroup, studentCourses)

  assert(result.status === 'FULL_MATCH', 'Status is FULL_MATCH')
  assert(result.matchedCourseId === 'cs-hl', 'matchedCourseId is cs-hl')
  assert(result.matchedCourseName === 'Computer Science', 'matchedCourseName is Computer Science')
}

// Test 7: Multiple students' courses (first match wins)
console.log('\n📋 Test 7: Multiple matching courses - first full match wins')
{
  const studentCourses: StudentCourse[] = [
    {
      courseId: 'bio-hl',
      courseName: 'Biology',
      level: 'HL',
      grade: 5
    },
    {
      courseId: 'cs-hl',
      courseName: 'Computer Science',
      level: 'HL',
      grade: 7
    }
  ]

  const orGroup: ORGroupRequirement = {
    options: [
      {
        courseId: 'bio-hl',
        courseName: 'Biology',
        level: 'HL',
        minimumGrade: 5,
        isCritical: true
      },
      {
        courseId: 'cs-hl',
        courseName: 'Computer Science',
        level: 'HL',
        minimumGrade: 5,
        isCritical: true
      }
    ],
    isCritical: true
  }

  const result = calculateORGroupMatch(orGroup, studentCourses)

  assert(result.status === 'FULL_MATCH', 'Status is FULL_MATCH')
  assert(result.score === 1.0, 'Score is 1.0')
  // Algorithm stops at first full match (Biology in this case)
  assert(result.matchedCourseId === 'bio-hl', 'First match (Biology) is selected')
}

// Summary
console.log('\n' + '='.repeat(70))
console.log('\n📊 Test Summary:')
console.log(`   ✅ Passed: ${passCount}`)
console.log(`   ❌ Failed: ${failCount}`)
console.log(`   📈 Success Rate: ${((passCount / (passCount + failCount)) * 100).toFixed(1)}%\n`)

if (failCount === 0) {
  console.log('🎉 All tests passed! The OR-group display fix is working correctly.\n')
  process.exit(0)
} else {
  console.log('⚠️  Some tests failed. Please review the implementation.\n')
  process.exit(1)
}
