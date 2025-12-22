/**
 * Match Categorization Tests
 *
 * Run with: npx tsx lib/matching/categorization.verify.ts
 */

import {
  categorizeMatch,
  getMatchCategory,
  getCategoryInfo,
  CATEGORIZATION_CONSTANTS,
  type MatchCategory
} from './categorization'
import type { AcademicMatchScore } from './types'

// ============================================
// Test Helpers
// ============================================

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

console.log('\n🧪 Match Categorization Verification Tests\n')
console.log('='.repeat(70))

// ============================================
// Test 1: SAFETY category
// ============================================

console.log('\n📋 SAFETY Category Tests:\n')

// Strong fit: +7 points, 0.95 score, all subjects met
const safetyResult = categorizeMatch(0.95, 42, 35, createAcademicMatch())
test('SAFETY: Strong fit category', 'SAFETY', safetyResult.category)
test('SAFETY: Has high confidence', 'high', safetyResult.confidenceIndicator)
test('SAFETY: Has factors', true, safetyResult.factors.length > 0)

// Quick category check
test('SAFETY: Quick category function', 'SAFETY', getMatchCategory(0.95, 42, 35, true))

// ============================================
// Test 2: MATCH category
// ============================================

console.log('\n📋 MATCH Category Tests:\n')

// Good fit: +2 points, 0.85 score, all subjects met
const matchResult = categorizeMatch(0.85, 37, 35, createAcademicMatch())
test('MATCH: Good fit category', 'MATCH', matchResult.category)

// Meets exactly
const matchExact = getMatchCategory(0.8, 35, 35, true)
test('MATCH: Exactly meets requirements', 'MATCH', matchExact)

// ============================================
// Test 3: REACH category
// ============================================

console.log('\n📋 REACH Category Tests:\n')

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
test('REACH: Aspirational category', 'REACH', reachResult.category)

// Near miss with score >= 0.45
const reachNearMiss = getMatchCategory(0.5, 32, 35, false)
test('REACH: Near miss with decent score', 'REACH', reachNearMiss)

// ============================================
// Test 4: UNLIKELY category
// ============================================

console.log('\n📋 UNLIKELY Category Tests:\n')

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
test('UNLIKELY: Significant gaps category', 'UNLIKELY', unlikelyResult.category)
test('UNLIKELY: Has low confidence', 'low', unlikelyResult.confidenceIndicator)

// Very low score
const unlikelyLowScore = getMatchCategory(0.3, 28, 35, false)
test('UNLIKELY: Very low score', 'UNLIKELY', unlikelyLowScore)

// ============================================
// Test 5: Edge cases
// ============================================

console.log('\n📋 Edge Case Tests:\n')

// Score high but missing subjects → MATCH (not SAFETY)
const edgeCase1 = getMatchCategory(0.9, 40, 35, false)
test('Edge: High score but missing subjects → not SAFETY', true, edgeCase1 !== 'SAFETY')

// Points above but score below MATCH threshold
const edgeCase2 = getMatchCategory(0.7, 40, 35, true)
test('Edge: Good points but low score → REACH', 'REACH', edgeCase2)

// No required points (null)
const edgeCase3 = getMatchCategory(0.85, 38, null, true)
test('Edge: Null required points → MATCH', 'MATCH', edgeCase3)

// Threshold boundaries
test('Boundary: Score exactly at SAFETY threshold', 'SAFETY', getMatchCategory(0.92, 40, 35, true))
test('Boundary: Score just below SAFETY', 'MATCH', getMatchCategory(0.91, 40, 35, true))

// ============================================
// Test 6: Category info
// ============================================

console.log('\n📋 Category Info Tests:\n')

const safetyInfo = getCategoryInfo('SAFETY')
test('Info: SAFETY has label', 'Safety', safetyInfo.label)
test('Info: SAFETY has color', 'green', safetyInfo.color)

const matchInfo = getCategoryInfo('MATCH')
test('Info: MATCH has label', 'Match', matchInfo.label)
test('Info: MATCH has color', 'blue', matchInfo.color)

const reachInfo = getCategoryInfo('REACH')
test('Info: REACH has label', 'Reach', reachInfo.label)
test('Info: REACH has color', 'amber', reachInfo.color)

const unlikelyInfo = getCategoryInfo('UNLIKELY')
test('Info: UNLIKELY has label', 'Unlikely', unlikelyInfo.label)
test('Info: UNLIKELY has color', 'red', unlikelyInfo.color)

// ============================================
// Test 7: Factors analysis
// ============================================

console.log('\n📋 Factors Analysis Tests:\n')

test(
  'Factors: SAFETY has positive score factor',
  true,
  safetyResult.factors.some((f) => f.type === 'SCORE' && f.contribution === 'positive')
)

test(
  'Factors: SAFETY has positive points factor',
  true,
  safetyResult.factors.some((f) => f.type === 'POINTS' && f.contribution === 'positive')
)

test(
  'Factors: UNLIKELY has negative factors',
  true,
  unlikelyResult.factors.some((f) => f.contribution === 'negative')
)

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
// Category Distribution Example
// ============================================

console.log('\n📊 Category Thresholds:')
console.log(
  `   SAFETY:   Score >= ${CATEGORIZATION_CONSTANTS.SAFETY_MIN_SCORE}, Margin >= +${CATEGORIZATION_CONSTANTS.SAFETY_MIN_MARGIN}, All subjects met`
)
console.log(
  `   MATCH:    Score >= ${CATEGORIZATION_CONSTANTS.MATCH_MIN_SCORE}, Margin >= ${CATEGORIZATION_CONSTANTS.MATCH_MIN_MARGIN}, All subjects met`
)
console.log(
  `   REACH:    Score >= ${CATEGORIZATION_CONSTANTS.REACH_MIN_SCORE} OR (Margin >= ${CATEGORIZATION_CONSTANTS.REACH_MIN_MARGIN} AND Score >= ${CATEGORIZATION_CONSTANTS.REACH_NEAR_MISS_SCORE})`
)
console.log('   UNLIKELY: Everything else')

console.log('\n✅ Verification complete.\n')
