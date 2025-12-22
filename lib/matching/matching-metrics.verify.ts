/**
 * Matching Metrics Tests
 *
 * Run with: npx tsx lib/matching/matching-metrics.verify.ts
 */

import {
  recordMatchingMetrics,
  getAggregatedMetrics,
  resetMetrics,
  getRawMetrics,
  createMatchingMetrics,
  checkAlgorithmHealth,
  METRICS_CONSTANTS,
  type MatchingMetrics
} from './matching-metrics'

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
    actual: actual.toFixed(2),
    priority
  })
}

console.log('\n🧪 Matching Metrics Verification Tests\n')
console.log('='.repeat(70))

// Reset before tests
resetMetrics()

// ============================================
// Test 1: Metrics creation
// ============================================

console.log('\n📋 Metrics Creation Tests:\n')

const metrics1 = createMatchingMetrics({
  latencyMs: 25,
  totalPrograms: 500,
  candidatesEvaluated: 100,
  resultsReturned: 10,
  categoryDistribution: { SAFETY: 2, MATCH: 5, REACH: 2, UNLIKELY: 1 },
  studentPoints: 38,
  cacheHits: 80,
  cacheMisses: 20,
  algorithmVersion: 'v10',
  v10FeaturesEnabled: ['FIT_QUALITY', 'CATEGORIZATION']
})

test('Create: has latencyMs', 25, metrics1.latencyMs)
test('Create: has totalPrograms', 500, metrics1.totalPrograms)
test('Create: has candidatesEvaluated', 100, metrics1.candidatesEvaluated)
test('Create: calculates reductionRatio', 5, metrics1.reductionRatio)
test('Create: calculates cacheHitRate', 0.8, metrics1.cacheHitRate)
test('Create: calculates isHighAchiever', true, metrics1.isHighAchiever)
test('Create: has algorithmVersion', 'v10', metrics1.algorithmVersion)

// ============================================
// Test 2: Recording metrics
// ============================================

console.log('\n📋 Recording Tests:\n')

resetMetrics()
recordMatchingMetrics(metrics1)

const rawAfter1 = getRawMetrics()
test('Record: stores metrics', 1, rawAfter1.length)
test('Record: correct latency', 25, rawAfter1[0].latencyMs)

// Record more
recordMatchingMetrics(
  createMatchingMetrics({
    latencyMs: 35,
    totalPrograms: 500,
    candidatesEvaluated: 150,
    resultsReturned: 10,
    categoryDistribution: { SAFETY: 1, MATCH: 6, REACH: 2, UNLIKELY: 1 },
    studentPoints: 35,
    algorithmVersion: 'v9'
  })
)

recordMatchingMetrics(
  createMatchingMetrics({
    latencyMs: 15,
    totalPrograms: 500,
    candidatesEvaluated: 80,
    resultsReturned: 10,
    categoryDistribution: { SAFETY: 3, MATCH: 4, REACH: 2, UNLIKELY: 1 },
    studentPoints: 42,
    cacheHits: 90,
    cacheMisses: 10,
    algorithmVersion: 'v10',
    v10FeaturesEnabled: ['FULL']
  })
)

test('Record: all stored', 3, getRawMetrics().length)

// ============================================
// Test 3: Aggregation
// ============================================

console.log('\n📋 Aggregation Tests:\n')

const agg = getAggregatedMetrics()

test('Aggregation: requestCount', 3, agg.requestCount)
testRange('Aggregation: avgLatencyMs', 20, 30, agg.avgLatencyMs)
test('Aggregation: highAchieverRequests', 2, agg.highAchieverRequests)
test('Aggregation: v10RequestCount', 2, agg.v10RequestCount)

// Category totals
const totalCategories =
  agg.categoryTotals.SAFETY +
  agg.categoryTotals.MATCH +
  agg.categoryTotals.REACH +
  agg.categoryTotals.UNLIKELY
test('Aggregation: category totals add up', 30, totalCategories)

console.log(`   Avg latency: ${agg.avgLatencyMs.toFixed(1)}ms`)
console.log(`   P95 latency: ${agg.p95LatencyMs.toFixed(1)}ms`)
console.log(`   Categories: SAFETY=${agg.categoryTotals.SAFETY}, MATCH=${agg.categoryTotals.MATCH}`)

// ============================================
// Test 4: Health check
// ============================================

console.log('\n📋 Health Check Tests:\n')

const health = checkAlgorithmHealth({
  maxAvgLatencyMs: 100,
  minCacheHitRate: 0.5
})

test('Health: overall healthy', true, health.healthy)
test('Health: latency ok', true, health.checks.latency.ok)
test('Health: has category details', true, health.checks.categoryBalance.details.length > 0)

console.log(`   Healthy: ${health.healthy}`)
console.log(
  `   Latency: ${health.checks.latency.avgMs.toFixed(1)}ms (threshold: ${health.checks.latency.threshold}ms)`
)
console.log(`   Categories: ${health.checks.categoryBalance.details}`)

// ============================================
// Test 5: Reset
// ============================================

console.log('\n📋 Reset Tests:\n')

resetMetrics()
test('Reset: clears metrics', 0, getRawMetrics().length)
test('Reset: empty aggregation', 0, getAggregatedMetrics().requestCount)

// ============================================
// Test 6: High achiever detection
// ============================================

console.log('\n📋 High Achiever Detection Tests:\n')

const lowPointsMetrics = createMatchingMetrics({
  latencyMs: 10,
  totalPrograms: 100,
  candidatesEvaluated: 20,
  resultsReturned: 10,
  categoryDistribution: { SAFETY: 0, MATCH: 5, REACH: 5, UNLIKELY: 0 },
  studentPoints: 35,
  algorithmVersion: 'v9'
})

const highPointsMetrics = createMatchingMetrics({
  latencyMs: 10,
  totalPrograms: 100,
  candidatesEvaluated: 20,
  resultsReturned: 10,
  categoryDistribution: { SAFETY: 5, MATCH: 5, REACH: 0, UNLIKELY: 0 },
  studentPoints: 42,
  algorithmVersion: 'v10'
})

test('High achiever: 35 pts = not high achiever', false, lowPointsMetrics.isHighAchiever)
test('High achiever: 42 pts = high achiever', true, highPointsMetrics.isHighAchiever)
test('High achiever threshold', 38, METRICS_CONSTANTS.HIGH_ACHIEVER_THRESHOLD)

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

console.log('\n✅ Verification complete.\n')
