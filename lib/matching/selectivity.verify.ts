/**
 * Selectivity Module Tests
 *
 * Run with: npx tsx lib/matching/selectivity.verify.ts
 */

import {
  calculateSelectivityTier,
  applySelectivityBoost,
  isHighAchiever,
  getSelectivityTierName,
  getBoostAmount,
  SELECTIVITY_CONSTANTS,
  type SelectivityTier
} from './selectivity'

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

// ============================================
// Tier Classification Tests (P0)
// ============================================

console.log('\n🧪 Selectivity Module Verification Tests\n')
console.log('='.repeat(70))

// Tier 1: Highly Selective (40+)
test('Tier 1: 42 required points', 1, calculateSelectivityTier(42))
test('Tier 1: 40 required points (boundary)', 1, calculateSelectivityTier(40))
test('Tier 1: 45 required points', 1, calculateSelectivityTier(45))

// Tier 2: Selective (36-39)
test('Tier 2: 38 required points', 2, calculateSelectivityTier(38))
test('Tier 2: 36 required points (boundary)', 2, calculateSelectivityTier(36))
test('Tier 2: 39 required points', 2, calculateSelectivityTier(39))

// Tier 3: Moderately Selective (32-35)
test('Tier 3: 34 required points', 3, calculateSelectivityTier(34))
test('Tier 3: 32 required points (boundary)', 3, calculateSelectivityTier(32))
test('Tier 3: 35 required points', 3, calculateSelectivityTier(35))

// Tier 4: Standard (<32)
test('Tier 4: 28 required points', 4, calculateSelectivityTier(28))
test('Tier 4: 31 required points', 4, calculateSelectivityTier(31))
test('Tier 4: 24 required points', 4, calculateSelectivityTier(24))

// Edge cases
test('Tier 4: null points', 4, calculateSelectivityTier(null), 'P1')
test('Tier 4: undefined points', 4, calculateSelectivityTier(undefined), 'P1')

// ============================================
// Selectivity Boost Tests (P0)
// ============================================

// High achiever boost tests
test('High achiever boost Tier 1 (42 pts, 0.85 base)', 0.9, applySelectivityBoost(0.85, 42, 1))
test('High achiever boost Tier 2 (42 pts, 0.85 base)', 0.88, applySelectivityBoost(0.85, 42, 2))
test('High achiever boost Tier 3 (42 pts, 0.85 base)', 0.86, applySelectivityBoost(0.85, 42, 3))
test('High achiever boost Tier 4 (42 pts, 0.85 base)', 0.85, applySelectivityBoost(0.85, 42, 4))

// Average student (no boost)
test(
  'Average student no boost (35 pts, 0.85 base, Tier 1)',
  0.85,
  applySelectivityBoost(0.85, 35, 1)
)
test('Average student no boost (37 pts, 0.90 base, Tier 1)', 0.9, applySelectivityBoost(0.9, 37, 1))

// Boundary (38 points = high achiever)
test('Boundary achiever boost (38 pts, 0.85 base, Tier 1)', 0.9, applySelectivityBoost(0.85, 38, 1))

// Cap at 1.0
test('Cap at 1.0 (42 pts, 0.98 base, Tier 1)', 1.0, applySelectivityBoost(0.98, 42, 1), 'P1')
test('Cap at 1.0 (42 pts, 0.99 base, Tier 2)', 1.0, applySelectivityBoost(0.99, 42, 2), 'P1')

// ============================================
// Helper Function Tests
// ============================================

test('isHighAchiever: 42 pts', true, isHighAchiever(42), 'P1')
test('isHighAchiever: 38 pts (boundary)', true, isHighAchiever(38), 'P1')
test('isHighAchiever: 37 pts', false, isHighAchiever(37), 'P1')
test('isHighAchiever: 35 pts', false, isHighAchiever(35), 'P1')

test('getBoostAmount: Tier 1', 0.05, getBoostAmount(1), 'P1')
test('getBoostAmount: Tier 2', 0.03, getBoostAmount(2), 'P1')
test('getBoostAmount: Tier 3', 0.01, getBoostAmount(3), 'P1')
test('getBoostAmount: Tier 4', 0.0, getBoostAmount(4), 'P1')

test('getTierName: Tier 1', 'Highly Selective', getSelectivityTierName(1), 'P1')
test('getTierName: Tier 2', 'Selective', getSelectivityTierName(2), 'P1')
test('getTierName: Tier 3', 'Moderately Selective', getSelectivityTierName(3), 'P1')
test('getTierName: Tier 4', 'Standard', getSelectivityTierName(4), 'P1')

// ============================================
// Print Results
// ============================================

let p0Passed = 0
let p0Failed = 0
let p1Passed = 0
let p1Failed = 0

for (const r of results) {
  const status = r.passed ? '✅' : '❌'
  console.log(
    `${status} [${r.priority}] ${r.name.padEnd(45)} | ` +
      `Expected: ${r.expected.padEnd(20)} | Got: ${r.actual}`
  )

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

if (p0Failed > 0) {
  console.log('❌ P0 failures:')
  for (const r of results.filter((r) => !r.passed && r.priority === 'P0')) {
    console.log(`   - ${r.name}`)
  }
}

// ============================================
// Tier Distribution Visualization
// ============================================

console.log('\n📊 Tier Classification by Points:')
console.log('   Points | Tier | Name')
console.log('   -------|------|------')
const samplePoints = [24, 28, 32, 34, 36, 38, 40, 42, 44]
for (const pts of samplePoints) {
  const tier = calculateSelectivityTier(pts)
  const name = getSelectivityTierName(tier)
  console.log(`   ${pts.toString().padStart(6)} | ${tier}    | ${name}`)
}

console.log('\n📈 Boost Effect for High Achiever (42 pts, base=0.80):')
console.log('   Tier | Boost | Final Score')
console.log('   -----|-------|------------')
for (let tier = 1; tier <= 4; tier++) {
  const t = tier as SelectivityTier
  const boost = getBoostAmount(t)
  const final = applySelectivityBoost(0.8, 42, t)
  console.log(`   ${tier}    | +${boost.toFixed(2)} | ${final.toFixed(2)}`)
}

console.log('\n✅ Verification complete.\n')
