/**
 * Student Capability Vector Tests
 *
 * Run with: npx tsx lib/matching/student-capability-vector.verify.ts
 */

import {
  createStudentCapabilityVector,
  createEmptyCapabilityVector,
  canMeetRequirements,
  measureLookupPerformance,
  type StudentCapabilityVector
} from './student-capability-vector'
import type { StudentCourse } from './types'

// ============================================
// Test Data
// ============================================

const testCourses: StudentCourse[] = [
  { courseId: 'math-hl', courseName: 'Mathematics', level: 'HL', grade: 6 },
  { courseId: 'phys-hl', courseName: 'Physics', level: 'HL', grade: 5 },
  { courseId: 'chem-hl', courseName: 'Chemistry', level: 'HL', grade: 7 },
  { courseId: 'eng-sl', courseName: 'English', level: 'SL', grade: 6 },
  { courseId: 'hist-sl', courseName: 'History', level: 'SL', grade: 5 },
  { courseId: 'span-sl', courseName: 'Spanish', level: 'SL', grade: 4 }
]

// ============================================
// Test Helpers
// ============================================

interface TestResult {
  name: string
  passed: boolean
  expected: string
  actual: string
  priority: 'P0' | 'P1'
}

const results: TestResult[] = []

function test(
  name: string,
  expected: unknown,
  actual: unknown,
  priority: 'P0' | 'P1' = 'P0'
): void {
  const passed = JSON.stringify(expected) === JSON.stringify(actual)
  results.push({
    name,
    passed,
    expected: typeof expected === 'object' ? JSON.stringify(expected) : String(expected),
    actual: typeof actual === 'object' ? JSON.stringify(actual) : String(actual),
    priority
  })
}

console.log('\n🧪 Student Capability Vector Verification Tests\n')
console.log('='.repeat(70))

// ============================================
// Create vector
// ============================================

const vector = createStudentCapabilityVector(testCourses)

// ============================================
// Test 1: Get subject by name and level
// ============================================

console.log('\n📋 Get Subject Tests:\n')

const mathHL = vector.getSubject('Mathematics', 'HL')
test('Get Math HL: found', true, mathHL !== null)
test('Get Math HL: correct name', 'Mathematics', mathHL?.courseName)
test('Get Math HL: correct level', 'HL', mathHL?.level)
test('Get Math HL: correct grade', 6, mathHL?.grade)

// Case insensitive
const mathHLLower = vector.getSubject('mathematics', 'HL')
test('Get math (lowercase) HL: found', true, mathHLLower !== null)

// Non-existent subject
const biology = vector.getSubject('Biology', 'HL')
test('Get Biology HL: not found', null, biology)

// Wrong level
const mathSL = vector.getSubject('Mathematics', 'SL')
test('Get Math SL when has HL: not found', null, mathSL)

// ============================================
// Test 2: Get subject any level (prefers HL)
// ============================================

console.log('\n📋 Get Subject Any Level Tests:\n')

const mathAny = vector.getSubjectAnyLevel('Mathematics')
test('Get Math any level: found', true, mathAny !== null)
test('Get Math any level: prefers HL', 'HL', mathAny?.level)

const engAny = vector.getSubjectAnyLevel('English')
test('Get English any level: found', true, engAny !== null)
test('Get English any level: returns SL (only option)', 'SL', engAny?.level)

const bioAny = vector.getSubjectAnyLevel('Biology')
test('Get Biology any level: not found', null, bioAny)

// ============================================
// Test 3: hasSubject and hasSubjectAtLevel
// ============================================

console.log('\n📋 Has Subject Tests:\n')

test('hasSubject Math: true', true, vector.hasSubject('Mathematics'))
test('hasSubject Biology: false', false, vector.hasSubject('Biology'))

test('hasSubjectAtLevel Math HL: true', true, vector.hasSubjectAtLevel('Mathematics', 'HL'))
test('hasSubjectAtLevel Math SL: false', false, vector.hasSubjectAtLevel('Mathematics', 'SL'))
test('hasSubjectAtLevel English SL: true', true, vector.hasSubjectAtLevel('English', 'SL'))
test('hasSubjectAtLevel Biology HL: false', false, vector.hasSubjectAtLevel('Biology', 'HL'))

// ============================================
// Test 4: meetsRequirement
// ============================================

console.log('\n📋 Meets Requirement Tests:\n')

test('Meets Math HL 5: true (has 6)', true, vector.meetsRequirement('Mathematics', 'HL', 5))
test('Meets Math HL 6: true (has 6)', true, vector.meetsRequirement('Mathematics', 'HL', 6))
test('Meets Math HL 7: false (has 6)', false, vector.meetsRequirement('Mathematics', 'HL', 7))
test('Meets Chemistry HL 7: true (has 7)', true, vector.meetsRequirement('Chemistry', 'HL', 7))
test('Meets Biology HL 5: false (missing)', false, vector.meetsRequirement('Biology', 'HL', 5))

// ============================================
// Test 5: Computed properties
// ============================================

console.log('\n📋 Computed Properties Tests:\n')

test('hlCount: 3', 3, vector.hlCount)
test('slCount: 3', 3, vector.slCount)
test('maxHLGrade: 7', 7, vector.maxHLGrade)
test('maxSLGrade: 6', 6, vector.maxSLGrade)
test('courses count: 6', 6, vector.courses.length)

// Average grade: (6+5+7+6+5+4)/6 = 33/6 = 5.5
const expectedAvg = (6 + 5 + 7 + 6 + 5 + 4) / 6
test('averageGrade: 5.5', expectedAvg, vector.averageGrade)

// ============================================
// Test 6: Empty vector
// ============================================

console.log('\n📋 Empty Vector Tests:\n')

const empty = createEmptyCapabilityVector()
test('Empty: getSubject returns null', null, empty.getSubject('Math', 'HL'))
test('Empty: hasSubject returns false', false, empty.hasSubject('Math'))
test('Empty: hlCount = 0', 0, empty.hlCount)
test('Empty: slCount = 0', 0, empty.slCount)
test('Empty: maxHLGrade = null', null, empty.maxHLGrade)

// ============================================
// Test 7: canMeetRequirements helper
// ============================================

console.log('\n📋 Can Meet Requirements Tests:\n')

test(
  'Can meet Math HL + Physics HL: true',
  true,
  canMeetRequirements(vector, [
    { name: 'Mathematics', level: 'HL' },
    { name: 'Physics', level: 'HL' }
  ])
)

test(
  'Can meet Math HL + Biology HL: false',
  false,
  canMeetRequirements(vector, [
    { name: 'Mathematics', level: 'HL' },
    { name: 'Biology', level: 'HL' }
  ])
)

// ============================================
// Test 8: Performance
// ============================================

console.log('\n📋 Performance Tests:\n')

const perf = measureLookupPerformance(vector, 1000)
test('Performance: 1000 lookups < 10ms', true, perf.totalMs < 10, 'P1')
console.log(`   Actual: ${perf.totalMs.toFixed(3)}ms total, ~${perf.avgNs.toFixed(0)}ns per lookup`)

// ============================================
// Print Results
// ============================================

console.log('\n' + '='.repeat(70))
console.log('\n📊 Test Results:\n')

let p0Passed = 0
let p0Failed = 0
let p1Passed = 0
let p1Failed = 0

for (const r of results) {
  const status = r.passed ? '✅' : '❌'
  console.log(`${status} [${r.priority}] ${r.name}`)
  if (!r.passed) {
    console.log(`     Expected: ${r.expected}`)
    console.log(`     Actual:   ${r.actual}`)
  }

  if (r.priority === 'P0') {
    if (r.passed) p0Passed++
    else p0Failed++
  } else {
    if (r.passed) p1Passed++
    else p1Failed++
  }
}

console.log('\n' + '='.repeat(70))
console.log('\n📋 Summary:')
console.log(`   P0 Tests: ${p0Passed} passed, ${p0Failed} failed`)
console.log(`   P1 Tests: ${p1Passed} passed, ${p1Failed} failed`)
console.log(`   Total:    ${p0Passed + p1Passed} passed, ${p0Failed + p1Failed} failed\n`)

// ============================================
// Complexity Comparison
// ============================================

console.log('\n📊 Complexity Improvement:')
console.log('   Operation              | V9 (Array) | V10 (Map)')
console.log('   -----------------------|------------|----------')
console.log('   Find subject by name   | O(n)       | O(1)')
console.log('   Check has subject      | O(n)       | O(1)')
console.log('   Meet requirement check | O(n)       | O(1)')
console.log('   Where n = number of courses (typically 6)')

console.log('\n✅ Verification complete.\n')
