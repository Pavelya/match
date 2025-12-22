/**
 * Program Index Tests
 *
 * Run with: npx tsx lib/matching/program-index.verify.ts
 */

import {
  createProgramIndex,
  createEmptyProgramIndex,
  calculateReductionRatio,
  type ProgramIndex
} from './program-index'
import type { ProgramRequirements } from './types'

// ============================================
// Test Data - Simulated 100 programs
// ============================================

function generateTestPrograms(count: number): ProgramRequirements[] {
  const fields = ['engineering', 'medicine', 'business', 'arts', 'science']
  const countries = ['uk', 'germany', 'usa', 'netherlands', 'sweden']
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics']

  const programs: ProgramRequirements[] = []

  for (let i = 0; i < count; i++) {
    const field = fields[i % fields.length]
    const country = countries[i % countries.length]
    const points = 24 + Math.floor(i / 5) // Points from 24 to 44

    programs.push({
      programId: `prog-${i}`,
      programName: `Program ${i}`,
      universityId: `uni-${i % 20}`,
      universityName: `University ${i % 20}`,
      type: 'FULL_REQUIREMENTS',
      fieldId: field,
      countryId: country,
      minimumIBPoints: points > 45 ? 45 : points,
      requiredSubjects: [
        {
          courseId: `${subjects[i % 5].toLowerCase()}-hl`,
          courseName: subjects[i % 5],
          level: 'HL',
          minimumGrade: 5,
          isCritical: true
        }
      ],
      orGroupRequirements: []
    })
  }

  return programs
}

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
  const passed = expected === actual
  results.push({
    name,
    passed,
    expected: String(expected),
    actual: String(actual),
    priority
  })
}

function testRange(
  name: string,
  min: number,
  max: number,
  actual: number,
  priority: 'P0' | 'P1' = 'P0'
): void {
  const passed = actual >= min && actual <= max
  results.push({
    name,
    passed,
    expected: `${min}-${max}`,
    actual: String(actual),
    priority
  })
}

console.log('\n🧪 Program Index Verification Tests\n')
console.log('='.repeat(70))

// ============================================
// Create index with 100 programs
// ============================================

const testPrograms = generateTestPrograms(100)
const index = createProgramIndex(testPrograms)

// ============================================
// Test 1: Filter by points
// ============================================

console.log('\n📋 Filter by Points Tests:\n')

// Student with 38 points, ±10 margin = 28-48 range
const pointsFilter = index.filterByPoints(38, 10)
test('Filter by points: has results', true, pointsFilter.size > 0)
// Most programs will match since range covers 28-48 and includes no-req bucket
testRange('Filter by points: reasonable count', 10, 100, pointsFilter.size)

// Narrow margin
const narrowPoints = index.filterByPoints(40, 3)
test('Filter by narrow points: fewer results', true, narrowPoints.size < pointsFilter.size)

// ============================================
// Test 2: Filter by field
// ============================================

console.log('\n📋 Filter by Field Tests:\n')

const engineeringProgs = index.filterByField(['engineering'])
test('Filter by engineering: has results', true, engineeringProgs.size > 0)
// With 5 fields and 100 programs, expect ~20 engineering
testRange('Filter by engineering: approx 20', 15, 25, engineeringProgs.size)

// Multiple fields
const multiField = index.filterByField(['engineering', 'medicine'])
test('Multiple fields: more than single', true, multiField.size >= engineeringProgs.size)

// Non-existent field
const noField = index.filterByField(['nonexistent'])
test('Non-existent field: empty', 0, noField.size)

// ============================================
// Test 3: Filter by country
// ============================================

console.log('\n📋 Filter by Country Tests:\n')

const ukProgs = index.filterByCountry(['uk'])
test('Filter by UK: has results', true, ukProgs.size > 0)
testRange('Filter by UK: approx 20', 15, 25, ukProgs.size)

// Multiple countries
const multiCountry = index.filterByCountry(['uk', 'germany'])
testRange('Filter UK+Germany: approx 40', 30, 50, multiCountry.size)

// ============================================
// Test 4: Combined filtering
// ============================================

console.log('\n📋 Combined Filter Tests:\n')

const combined = index.filterCandidates({
  studentPoints: 38,
  pointsMargin: 10,
  fieldIds: ['engineering'],
  countryIds: ['uk']
})
test('Combined filter: has results', true, combined.length > 0)
test(
  'Combined filter: fewer than individual filters',
  true,
  combined.length <= Math.min(engineeringProgs.size, ukProgs.size)
)

// Open to all (no field/country filter)
const openToAll = index.filterCandidates({
  studentPoints: 38,
  includeOpenFields: true,
  includeOpenLocations: true
})
test('Open to all: more results than combined', true, openToAll.length >= combined.length)

// ============================================
// Test 5: Candidate count reduction
// ============================================

console.log('\n📋 Candidate Reduction Tests:\n')

const typicalFilter = index.filterCandidates({
  studentPoints: 36,
  fieldIds: ['engineering', 'science'],
  countryIds: ['uk', 'germany', 'netherlands']
})
const reduction = calculateReductionRatio(100, typicalFilter.length)
test('Candidate reduction: > 1x', true, reduction > 1)
console.log(
  `   Actual: ${typicalFilter.length} candidates from 100 (${reduction.toFixed(1)}x reduction)`
)

// ============================================
// Test 6: Index stats
// ============================================

console.log('\n📋 Index Stats Tests:\n')

const stats = index.getStats()
test('Stats: totalPrograms = 100', 100, stats.totalPrograms)
test('Stats: has pointsBuckets', true, stats.pointsBuckets > 0)
test('Stats: has fields indexed', true, stats.fieldsIndexed > 0)
test('Stats: has countries indexed', true, stats.countriesIndexed > 0)
test('Stats: has subjects indexed', true, stats.subjectsIndexed > 0)

// ============================================
// Test 7: Index invalidation
// ============================================

console.log('\n📋 Index Invalidation Tests:\n')

const tempIndex = createProgramIndex(testPrograms.slice(0, 10))
test('Before invalidate: size = 10', 10, tempIndex.size)

tempIndex.invalidate()
test('After invalidate: size = 0', 0, tempIndex.size)

tempIndex.rebuild(testPrograms.slice(0, 5))
test('After rebuild: size = 5', 5, tempIndex.size, 'P1')

// ============================================
// Test 8: Empty index
// ============================================

console.log('\n📋 Empty Index Tests:\n')

const empty = createEmptyProgramIndex()
test('Empty: size = 0', 0, empty.size)
test('Empty: filter returns empty', 0, empty.filterByPoints(38).size)

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
// Index Structure Summary
// ============================================

console.log('\n📊 Index Structure:')
console.log(`   Total programs: ${stats.totalPrograms}`)
console.log(`   Points buckets: ${stats.pointsBuckets}`)
console.log(`   Fields indexed: ${stats.fieldsIndexed}`)
console.log(`   Countries indexed: ${stats.countriesIndexed}`)
console.log(`   Subjects indexed: ${stats.subjectsIndexed}`)

console.log('\n✅ Verification complete.\n')
