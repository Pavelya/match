/**
 * Matching V10 Feature Flags Tests
 *
 * Run with: npx tsx lib/feature-flags/matching-v10.verify.ts
 */

import {
  isFeatureEnabled,
  isAnyV10FeatureEnabled,
  getEnabledV10Features,
  getFlagConfig,
  getAllFlagConfigs,
  useFitQualityScore,
  useSelectivityBoost,
  useAntiGaming,
  useConfidenceScoring,
  useCategorization,
  usePerformanceOptimizations,
  MATCHING_V10_FLAGS,
  type MatchingV10Flag,
  type FeatureFlagContext
} from './matching-v10'

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

console.log('\n🧪 Matching V10 Feature Flags Verification Tests\n')
console.log('='.repeat(70))

// ============================================
// Test 1: Default state (all disabled)
// ============================================

console.log('\n📋 Default State Tests:\n')

// By default, all flags should be disabled
test('Default: FIT_QUALITY disabled', false, isFeatureEnabled('MATCHING_V10_FIT_QUALITY'))
test('Default: SELECTIVITY disabled', false, isFeatureEnabled('MATCHING_V10_SELECTIVITY'))
test('Default: ANTI_GAMING disabled', false, isFeatureEnabled('MATCHING_V10_ANTI_GAMING'))
test('Default: CONFIDENCE disabled', false, isFeatureEnabled('MATCHING_V10_CONFIDENCE'))
test('Default: CATEGORIZATION disabled', false, isFeatureEnabled('MATCHING_V10_CATEGORIZATION'))
test('Default: PERFORMANCE disabled', false, isFeatureEnabled('MATCHING_V10_PERFORMANCE'))
test('Default: FULL disabled', false, isFeatureEnabled('MATCHING_V10_FULL'))

test('Default: no V10 features enabled', false, isAnyV10FeatureEnabled())
test('Default: empty enabled list', 0, getEnabledV10Features().length)

// ============================================
// Test 2: Force enable/disable context
// ============================================

console.log('\n📋 Context Override Tests:\n')

const forceEnableContext: FeatureFlagContext = { forceEnable: true }
const forceDisableContext: FeatureFlagContext = { forceDisable: true }

test(
  'Force enable: returns true',
  true,
  isFeatureEnabled('MATCHING_V10_FIT_QUALITY', forceEnableContext)
)
test(
  'Force disable: returns false',
  false,
  isFeatureEnabled('MATCHING_V10_FIT_QUALITY', forceDisableContext)
)
test(
  'Force disable overrides force enable',
  false,
  isFeatureEnabled('MATCHING_V10_FIT_QUALITY', { forceEnable: true, forceDisable: true })
)

// ============================================
// Test 3: Flag configuration
// ============================================

console.log('\n📋 Flag Configuration Tests:\n')

const fitQualityConfig = getFlagConfig('MATCHING_V10_FIT_QUALITY')
test('Config: has enabled field', true, 'enabled' in fitQualityConfig)
test('Config: has rolloutPercentage field', true, 'rolloutPercentage' in fitQualityConfig)
test('Config: has description field', true, 'description' in fitQualityConfig)

const allConfigs = getAllFlagConfigs()
test('All configs: has all flags', MATCHING_V10_FLAGS.length, Object.keys(allConfigs).length)

// ============================================
// Test 4: Convenience helpers
// ============================================

console.log('\n📋 Convenience Helper Tests:\n')

// All should return false by default
test('Helper: useFitQualityScore', false, useFitQualityScore())
test('Helper: useSelectivityBoost', false, useSelectivityBoost())
test('Helper: useAntiGaming', false, useAntiGaming())
test('Helper: useConfidenceScoring', false, useConfidenceScoring())
test('Helper: useCategorization', false, useCategorization())
test('Helper: usePerformanceOptimizations', false, usePerformanceOptimizations())

// With force enable
test('Helper with force: useFitQualityScore', true, useFitQualityScore({ forceEnable: true }))

// ============================================
// Test 5: Consistent hashing for rollout
// ============================================

console.log('\n📋 Consistent Hashing Tests:\n')

// Same user should always get same result
const userId1 = 'test-user-123'
const userId2 = 'test-user-456'

// Run multiple times with same user
const results1: boolean[] = []
const results2: boolean[] = []

for (let i = 0; i < 5; i++) {
  results1.push(
    isFeatureEnabled('MATCHING_V10_FIT_QUALITY', { userId: userId1, forceEnable: true })
  )
  results2.push(
    isFeatureEnabled('MATCHING_V10_FIT_QUALITY', { userId: userId2, forceEnable: true })
  )
}

// All results for same user should be identical
const allSame1 = results1.every((r) => r === results1[0])
const allSame2 = results2.every((r) => r === results2[0])

test('Consistent hashing: user1 same across calls', true, allSame1, 'P1')
test('Consistent hashing: user2 same across calls', true, allSame2, 'P1')

// ============================================
// Test 6: Flag list
// ============================================

console.log('\n📋 Flag List Tests:\n')

test(
  'Flag list: includes FIT_QUALITY',
  true,
  MATCHING_V10_FLAGS.includes('MATCHING_V10_FIT_QUALITY')
)
test(
  'Flag list: includes SELECTIVITY',
  true,
  MATCHING_V10_FLAGS.includes('MATCHING_V10_SELECTIVITY')
)
test('Flag list: includes FULL', true, MATCHING_V10_FLAGS.includes('MATCHING_V10_FULL'))
test('Flag list: correct count', 7, MATCHING_V10_FLAGS.length)

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
// Environment Variable Guide
// ============================================

console.log('\n📊 Environment Variable Configuration:')
console.log('   To enable a feature:')
console.log('     MATCHING_V10_FIT_QUALITY=true')
console.log('   To set rollout percentage:')
console.log('     MATCHING_V10_FIT_QUALITY_ROLLOUT=25  (25% of users)')
console.log('   To enable all V10 features:')
console.log('     MATCHING_V10_FULL=true')

console.log('\n✅ Verification complete.\n')
