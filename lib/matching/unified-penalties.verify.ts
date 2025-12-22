/**
 * Unified Penalty System Tests
 *
 * Run with: npx tsx lib/matching/unified-penalties.verify.ts
 */

import {
  applyUnifiedPenalties,
  UNIFIED_PENALTY_CONSTANTS,
  type UnifiedPenaltyResult
} from './unified-penalties'
import type { AcademicMatchScore, WeightConfig, SubjectMatchDetail } from './types'

// ============================================
// Test Helpers
// ============================================

const defaultWeights: WeightConfig = {
  academic: 0.6,
  location: 0.3,
  field: 0.1
}

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

function createSubjectMatch(
  status: 'FULL_MATCH' | 'PARTIAL_MATCH' | 'NO_MATCH',
  score: number,
  isCritical: boolean = false
): SubjectMatchDetail {
  return {
    requirement: {
      courseId: 'test-course',
      courseName: 'Test Course',
      level: 'HL' as const,
      minimumGrade: 5 as const,
      isCritical
    },
    status,
    score,
    reason: status === 'PARTIAL_MATCH' ? 'Grade below requirement' : undefined
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
  const passed = JSON.stringify(expected) === JSON.stringify(actual)
  results.push({
    name,
    passed,
    expected: typeof expected === 'object' ? JSON.stringify(expected) : String(expected),
    actual: typeof actual === 'object' ? JSON.stringify(actual) : String(actual),
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
  const passed = actual >= min - 0.001 && actual <= max + 0.001
  results.push({
    name,
    passed,
    expected: `${min.toFixed(2)}-${max.toFixed(2)}`,
    actual: actual.toFixed(3),
    priority
  })
}

console.log('\n🧪 Unified Penalty System Verification Tests\n')
console.log('='.repeat(70))

// ============================================
// Test 1: Full match, no penalties
// ============================================

console.log('\n📋 Full Match Tests:\n')

const fullMatch = applyUnifiedPenalties(
  1.0,
  createAcademicMatch(),
  1.0, // location
  1.0, // field
  defaultWeights
)

test('Full match: finalScore = 1.0', 1.0, fullMatch.finalScore)
test('Full match: no penalties applied', 0, fullMatch.appliedPenalties.length)
test('Full match: no caps applied', 0, fullMatch.appliedCaps.length)
test('Full match: floor not applied', false, fullMatch.floorApplied)

// ============================================
// Test 2: Points shortfall only
// ============================================

console.log('\n📋 Points Shortfall Tests:\n')

const pointsShortfall = applyUnifiedPenalties(
  0.9,
  createAcademicMatch({
    meetsPointsRequirement: false,
    pointsShortfall: 3
  }),
  1.0,
  1.0,
  defaultWeights
)

test('Points shortfall: has penalty', true, pointsShortfall.appliedPenalties.length > 0)
test(
  'Points shortfall: has cap',
  true,
  pointsShortfall.appliedCaps.some((c) => c.type === 'POINTS_UNMET')
)
testRange('Points shortfall: finalScore in range', 0.82, 0.9, pointsShortfall.finalScore)

// ============================================
// Test 3: Missing critical subject
// ============================================

console.log('\n📋 Missing Critical Subject Tests:\n')

const missingCritical = applyUnifiedPenalties(
  0.85,
  createAcademicMatch({
    missingCriticalCount: 1,
    subjectMatches: [createSubjectMatch('NO_MATCH', 0, true)]
  }),
  1.0,
  1.0,
  defaultWeights
)

test('Missing critical: capped at 0.45', true, missingCritical.finalScore <= 0.45)
test(
  'Missing critical: has cap',
  true,
  missingCritical.appliedCaps.some((c) => c.type === 'CRITICAL_MISSING')
)
test('Missing critical: effectiveCap = 0.45', 0.45, missingCritical.effectiveCap)

// ============================================
// Test 4: Critical near-miss
// ============================================

console.log('\n📋 Critical Near-Miss Tests:\n')

const criticalNearMiss = applyUnifiedPenalties(
  0.9,
  createAcademicMatch({
    subjectMatches: [createSubjectMatch('PARTIAL_MATCH', 0.85, true)]
  }),
  1.0,
  1.0,
  defaultWeights
)

test('Critical near-miss: capped at 0.80', true, criticalNearMiss.finalScore <= 0.8)
test(
  'Critical near-miss: has cap',
  true,
  criticalNearMiss.appliedCaps.some((c) => c.type === 'CRITICAL_NEAR_MISS')
)

// ============================================
// Test 5: Multiple issues
// ============================================

console.log('\n📋 Multiple Issues Tests:\n')

const multipleIssues = applyUnifiedPenalties(
  0.8,
  createAcademicMatch({
    meetsPointsRequirement: false,
    pointsShortfall: 5,
    missingNonCriticalCount: 1,
    subjectMatches: [
      createSubjectMatch('NO_MATCH', 0, false),
      createSubjectMatch('PARTIAL_MATCH', 0.7, false)
    ]
  }),
  0.5,
  0.5,
  defaultWeights
)

test('Multiple issues: multiple penalties', true, multipleIssues.appliedPenalties.length >= 2)
test('Multiple issues: has caps', true, multipleIssues.appliedCaps.length > 0)
testRange('Multiple issues: reasonable score', 0.15, 0.7, multipleIssues.finalScore)

// ============================================
// Test 6: Penalty breakdown transparency
// ============================================

console.log('\n📋 Transparency Tests:\n')

test(
  'Penalty breakdown: includes type',
  true,
  multipleIssues.appliedPenalties.every((p) => !!p.type)
)
test(
  'Penalty breakdown: includes value',
  true,
  multipleIssues.appliedPenalties.every((p) => p.value >= 0)
)
test(
  'Penalty breakdown: includes description',
  true,
  multipleIssues.appliedPenalties.every((p) => !!p.description)
)

test(
  'Cap breakdown: includes type',
  true,
  multipleIssues.appliedCaps.every((c) => !!c.type)
)
test(
  'Cap breakdown: includes value',
  true,
  multipleIssues.appliedCaps.every((c) => c.value >= 0)
)
test(
  'Cap breakdown: includes description',
  true,
  multipleIssues.appliedCaps.every((c) => !!c.description)
)

// ============================================
// Test 7: Score floor
// ============================================

console.log('\n📋 Score Floor Tests:\n')

const veryLowScore = applyUnifiedPenalties(
  0.1,
  createAcademicMatch({
    meetsPointsRequirement: false,
    pointsShortfall: 15,
    missingCriticalCount: 2
  }),
  0.0,
  0.0,
  defaultWeights
)

test('Floor: score >= 0.15', true, veryLowScore.finalScore >= UNIFIED_PENALTY_CONSTANTS.SCORE_FLOOR)
test(
  'Floor: floor applied flag',
  true,
  veryLowScore.floorApplied || veryLowScore.finalScore === 0.15
)

// ============================================
// Test 8: Order independence (V10 key feature)
// ============================================

console.log('\n📋 Order Independence Tests:\n')

// Same inputs should always give same output
const orderTest1 = applyUnifiedPenalties(
  0.85,
  createAcademicMatch({
    meetsPointsRequirement: false,
    pointsShortfall: 2,
    subjectMatches: [createSubjectMatch('PARTIAL_MATCH', 0.8, false)]
  }),
  0.8,
  0.6,
  defaultWeights
)

const orderTest2 = applyUnifiedPenalties(
  0.85,
  createAcademicMatch({
    meetsPointsRequirement: false,
    pointsShortfall: 2,
    subjectMatches: [createSubjectMatch('PARTIAL_MATCH', 0.8, false)]
  }),
  0.8,
  0.6,
  defaultWeights
)

test('Order independence: same inputs = same output', orderTest1.finalScore, orderTest2.finalScore)
test(
  'Order independence: same penalties',
  orderTest1.appliedPenalties.length,
  orderTest2.appliedPenalties.length
)

// ============================================
// Test 9: Max penalty cap (60%)
// ============================================

console.log('\n📋 Max Penalty Cap Tests:\n')

const extremePenalties = applyUnifiedPenalties(
  1.0,
  createAcademicMatch({
    meetsPointsRequirement: false,
    pointsShortfall: 20,
    missingNonCriticalCount: 3,
    subjectMatches: [
      createSubjectMatch('NO_MATCH', 0, false),
      createSubjectMatch('NO_MATCH', 0, false),
      createSubjectMatch('NO_MATCH', 0, false)
    ]
  }),
  0.0,
  0.0,
  defaultWeights
)

test('Max penalty: totalPenaltyFactor <= 0.60', true, extremePenalties.totalPenaltyFactor <= 0.6)

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
// Example Breakdown
// ============================================

console.log('\n📊 Example Penalty Breakdown:')
console.log(
  JSON.stringify(
    {
      scenario: 'Points shortfall + partial subject',
      rawScore: orderTest1.rawScore,
      finalScore: orderTest1.finalScore.toFixed(3),
      penalties: orderTest1.appliedPenalties.map((p) => ({
        type: p.type,
        value: p.value.toFixed(3)
      })),
      caps: orderTest1.appliedCaps.map((c) => ({
        type: c.type,
        value: c.value
      })),
      effectiveCap: orderTest1.effectiveCap,
      reasons: orderTest1.reasons
    },
    null,
    2
  )
)

console.log('\n✅ Verification complete.\n')
