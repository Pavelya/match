/**
 * Optimized Matcher Tests
 *
 * Run with: npx tsx lib/matching/optimized-matcher.verify.ts
 */

import {
  calculateOptimizedMatches,
  calculateMatchesWithIndex,
  benchmarkMatching,
  getGlobalProgramIndex,
  invalidateGlobalProgramIndex,
  type OptimizedMatcherConfig
} from './optimized-matcher'
import { createProgramIndex } from './program-index'
import type { StudentProfile, ProgramRequirements } from './types'

// ============================================
// Test Data
// ============================================

const testStudent: StudentProfile = {
  courses: [
    { courseId: 'math-hl', courseName: 'Mathematics', level: 'HL', grade: 6 },
    { courseId: 'phys-hl', courseName: 'Physics', level: 'HL', grade: 5 },
    { courseId: 'chem-hl', courseName: 'Chemistry', level: 'HL', grade: 6 },
    { courseId: 'eng-sl', courseName: 'English', level: 'SL', grade: 6 },
    { courseId: 'hist-sl', courseName: 'History', level: 'SL', grade: 5 },
    { courseId: 'span-sl', courseName: 'Spanish', level: 'SL', grade: 5 }
  ],
  totalIBPoints: 38,
  tokGrade: 'B',
  eeGrade: 'B',
  interestedFields: ['engineering', 'science'],
  preferredCountries: ['uk', 'germany']
}

function generateTestPrograms(count: number): ProgramRequirements[] {
  const fields = ['engineering', 'medicine', 'business', 'arts', 'science']
  const countries = ['uk', 'germany', 'usa', 'netherlands', 'sweden']
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics']

  const programs: ProgramRequirements[] = []

  for (let i = 0; i < count; i++) {
    const field = fields[i % fields.length]
    const country = countries[i % countries.length]
    const points = 28 + (Math.floor(i / 10) % 15) // 28-42 range

    programs.push({
      programId: `prog-${i}`,
      programName: `Program ${i}`,
      universityId: `uni-${i % 20}`,
      universityName: `University ${i % 20}`,
      type: 'FULL_REQUIREMENTS',
      fieldId: field,
      countryId: country,
      minimumIBPoints: points,
      requiredSubjects: [
        {
          courseId: `${subjects[i % 5].toLowerCase()}-hl`,
          courseName: subjects[i % 5],
          level: 'HL',
          minimumGrade: 5,
          isCritical: i % 3 === 0
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
    actual: actual.toFixed(3),
    priority
  })
}

console.log('\n🧪 Optimized Matcher Verification Tests\n')
console.log('='.repeat(70))

// ============================================
// Test 1: Basic optimized matching
// ============================================

console.log('\n📋 Basic Optimized Matching Tests:\n')

const smallPrograms = generateTestPrograms(50)
const basicResult = calculateOptimizedMatches(testStudent, smallPrograms)

test('Basic: returns results', true, basicResult.results.length > 0)
test('Basic: has stats', true, basicResult.stats.totalPrograms === 50)
test(
  'Basic: results sorted by score',
  true,
  basicResult.results[0].overallScore >=
    basicResult.results[basicResult.results.length - 1].overallScore
)

// ============================================
// Test 2: Candidate filtering with index
// ============================================

console.log('\n📋 Candidate Filtering Tests:\n')

const largePrograms = generateTestPrograms(500)
const filteredResult = calculateOptimizedMatches(testStudent, largePrograms, {
  useIndex: true,
  pointsMargin: 5
})

test(
  'Filtering: reduces candidates',
  true,
  filteredResult.stats.candidatesAfterFilter < filteredResult.stats.totalPrograms
)
test('Filtering: reduction ratio > 1', true, filteredResult.stats.reductionRatio > 1)
console.log(
  `   Candidates: ${filteredResult.stats.candidatesAfterFilter} / ${filteredResult.stats.totalPrograms}`
)
console.log(`   Reduction: ${filteredResult.stats.reductionRatio.toFixed(1)}x`)

// ============================================
// Test 3: Cache hit rate
// ============================================

console.log('\n📋 Cache Tests:\n')

const cachedResult = calculateOptimizedMatches(testStudent, smallPrograms, {
  useCache: true
})

test('Cache: has stats', true, cachedResult.stats.cacheStats !== undefined)
// First run = all misses, so hit rate will be 0
// But structure should be correct
test(
  'Cache: tracks operations',
  true,
  (cachedResult.stats.cacheStats?.hits ?? 0) + (cachedResult.stats.cacheStats?.misses ?? 0) > 0
)

// ============================================
// Test 4: Pre-built index matching
// ============================================

console.log('\n📋 Pre-built Index Tests:\n')

const index = createProgramIndex(largePrograms)
const indexResult = calculateMatchesWithIndex(testStudent, index, {
  pointsMargin: 10
})

test('Index matching: returns results', true, indexResult.results.length > 0)
test('Index matching: has filter time', true, indexResult.stats.filterTimeMs >= 0)
test('Index matching: has match time', true, indexResult.stats.matchTimeMs >= 0)

// ============================================
// Test 5: Global index caching
// ============================================

console.log('\n📋 Global Index Tests:\n')

invalidateGlobalProgramIndex()
const globalIndex1 = getGlobalProgramIndex(largePrograms)
const globalIndex2 = getGlobalProgramIndex(largePrograms)

test('Global index: returns same instance', true, globalIndex1 === globalIndex2)

invalidateGlobalProgramIndex()
const globalIndex3 = getGlobalProgramIndex(largePrograms)
test('Global index: new after invalidate', true, globalIndex1 !== globalIndex3)

// ============================================
// Test 6: Score equivalence
// ============================================

console.log('\n📋 Score Equivalence Tests:\n')

const benchmark = benchmarkMatching(testStudent, smallPrograms)
test('Benchmark: top 10 scores match', true, benchmark.scoresMatch)
test('Benchmark: has speedup data', true, benchmark.speedup > 0)
console.log(`   Speedup: ${benchmark.speedup.toFixed(2)}x`)

// ============================================
// Test 7: Performance targets
// ============================================

console.log('\n📋 Performance Tests:\n')

const perfPrograms = generateTestPrograms(200)
const perfResult = calculateOptimizedMatches(testStudent, perfPrograms, {
  useIndex: true,
  useCache: true
})

testRange('Performance: total time < 500ms', 0, 500, perfResult.stats.totalTimeMs, 'P0')
console.log(`   Total time: ${perfResult.stats.totalTimeMs.toFixed(1)}ms`)
console.log(`   Filter time: ${perfResult.stats.filterTimeMs.toFixed(1)}ms`)
console.log(`   Match time: ${perfResult.stats.matchTimeMs.toFixed(1)}ms`)

// ============================================
// Test 8: Config options
// ============================================

console.log('\n📋 Config Options Tests:\n')

// Without index
const noIndexResult = calculateOptimizedMatches(testStudent, smallPrograms, {
  useIndex: false
})
test('No index: processes all programs', 50, noIndexResult.stats.candidatesAfterFilter)

// Without cache
const noCacheResult = calculateOptimizedMatches(testStudent, smallPrograms, {
  useCache: false
})
test('No cache: no cache stats', undefined, noCacheResult.stats.cacheStats)

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
// Performance Summary
// ============================================

console.log('\n📊 Performance Summary (200 programs):')
console.log(`   Filter time:  ${perfResult.stats.filterTimeMs.toFixed(1)}ms`)
console.log(`   Match time:   ${perfResult.stats.matchTimeMs.toFixed(1)}ms`)
console.log(`   Total time:   ${perfResult.stats.totalTimeMs.toFixed(1)}ms`)
console.log(
  `   Candidates:   ${perfResult.stats.candidatesAfterFilter} (${perfResult.stats.reductionRatio.toFixed(1)}x reduction)`
)

console.log('\n✅ Verification complete.\n')
