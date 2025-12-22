/**
 * Preference Validator and Anti-Gaming Tests
 *
 * Run with: npx tsx lib/matching/preference-validator.verify.ts
 */

import {
  validatePreferences,
  calculateFieldMatchV10,
  calculateLocationMatchV10,
  PREFERENCE_CONSTANTS,
  type PreferenceConfig
} from './preference-validator'

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

console.log('\n🧪 Preference Validator Verification Tests\n')
console.log('='.repeat(70))

// ============================================
// Field Match V10 Tests (P0)
// ============================================

console.log('\n📋 Field Match V10 Tests:\n')

// Explicit match
const fieldMatch1 = calculateFieldMatchV10(['engineering', 'medicine'], 'engineering', false)
test('Field: Explicit match', 1.0, fieldMatch1.score)
test('Field: Explicit match type', 'EXPLICIT_MATCH', fieldMatch1.matchType)

// Open to all fields
const fieldMatch2 = calculateFieldMatchV10([], 'engineering', true)
test('Field: Open to all score', 0.7, fieldMatch2.score)
test('Field: Open to all type', 'OPEN_TO_ALL', fieldMatch2.matchType)

// Implicit empty (no prefs, no flag)
const fieldMatch3 = calculateFieldMatchV10([], 'engineering', false)
test('Field: Implicit empty score', 0.5, fieldMatch3.score)
test('Field: Implicit empty type', 'IMPLICIT_EMPTY', fieldMatch3.matchType)

// Mismatch
const fieldMatch4 = calculateFieldMatchV10(['engineering'], 'medicine', false)
test('Field: Mismatch score', 0.0, fieldMatch4.score)
test('Field: Mismatch type', 'MISMATCH', fieldMatch4.matchType)

// ============================================
// Location Match V10 Tests (P0)
// ============================================

console.log('\n📋 Location Match V10 Tests:\n')

// Explicit match
const locMatch1 = calculateLocationMatchV10(['uk', 'germany'], 'uk', false)
test('Location: Explicit match', 1.0, locMatch1.score)
test('Location: Explicit match type', 'EXPLICIT_MATCH', locMatch1.matchType)

// Open to all locations
const locMatch2 = calculateLocationMatchV10([], 'germany', true)
test('Location: Open to all score', 0.85, locMatch2.score)
test('Location: Open to all type', 'OPEN_TO_ALL', locMatch2.matchType)

// Implicit empty (no prefs, no flag)
const locMatch3 = calculateLocationMatchV10([], 'germany', false)
test('Location: Implicit empty score', 0.6, locMatch3.score)
test('Location: Implicit empty type', 'IMPLICIT_EMPTY', locMatch3.matchType)

// Mismatch
const locMatch4 = calculateLocationMatchV10(['uk'], 'germany', false)
test('Location: Mismatch score', 0.0, locMatch4.score)
test('Location: Mismatch type', 'MISMATCH', locMatch4.matchType)

// ============================================
// Gaming Prevention Tests (P0)
// ============================================

console.log('\n📋 Gaming Prevention Tests:\n')

// V10 "open to all" < explicit match
test(
  'Gaming: Explicit match > Open to all fields',
  true,
  calculateFieldMatchV10(['eng'], 'eng', false).score >
    calculateFieldMatchV10([], 'eng', true).score
)

test(
  'Gaming: Explicit match > Open to all locations',
  true,
  calculateLocationMatchV10(['uk'], 'uk', false).score >
    calculateLocationMatchV10([], 'uk', true).score
)

// Open to all gives lower than 1.0
test('Gaming: Open to all fields < 1.0', true, PREFERENCE_CONSTANTS.OPEN_TO_ALL_FIELD_SCORE < 1.0)

test(
  'Gaming: Open to all locations < 1.0',
  true,
  PREFERENCE_CONSTANTS.OPEN_TO_ALL_LOCATION_SCORE < 1.0
)

// ============================================
// Validation Tests (P1)
// ============================================

console.log('\n📋 Validation Tests:\n')

// Valid: has preferences
const validConfig1: PreferenceConfig = {
  preferredFields: ['engineering'],
  openToAllFields: false,
  preferredCountries: ['uk'],
  openToAllLocations: false
}
const validResult1 = validatePreferences(validConfig1)
test('Validation: Has preferences - valid', true, validResult1.isValid, 'P1')
test('Validation: Has preferences - no errors', 0, validResult1.errors.length, 'P1')

// Valid: open to all
const validConfig2: PreferenceConfig = {
  preferredFields: [],
  openToAllFields: true,
  preferredCountries: [],
  openToAllLocations: true
}
const validResult2 = validatePreferences(validConfig2)
test('Validation: Open to all - valid', true, validResult2.isValid, 'P1')

// Warning: implicit empty (no prefs, no flag)
const warnConfig: PreferenceConfig = {
  preferredFields: [],
  openToAllFields: false,
  preferredCountries: [],
  openToAllLocations: false
}
const warnResult = validatePreferences(warnConfig)
test('Validation: Implicit empty - valid (warning only)', true, warnResult.isValid, 'P1')
test('Validation: Implicit empty - has warnings', 2, warnResult.warnings.length, 'P1')

// Error: both prefs AND open to all
const errorConfig: PreferenceConfig = {
  preferredFields: ['engineering'],
  openToAllFields: true,
  preferredCountries: ['uk'],
  openToAllLocations: true
}
const errorResult = validatePreferences(errorConfig)
test('Validation: Contradiction - invalid', false, errorResult.isValid, 'P1')
test('Validation: Contradiction - has errors', 2, errorResult.errors.length, 'P1')

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
// Score Comparison Table
// ============================================

console.log('\n📊 Score Comparison (V9 vs V10):')
console.log('   Scenario                    | V9 Score | V10 Score | Change')
console.log('   ----------------------------|----------|-----------|-------')
console.log('   Explicit field match        |   1.00   |   1.00    | Same')
console.log('   Explicit location match     |   1.00   |   1.00    | Same')
console.log('   Open to all fields          |   0.50   |   0.70    | +0.20')
console.log('   Open to all locations       |   1.00   |   0.85    | -0.15')
console.log('   Implicit empty fields       |   0.50   |   0.50    | Same')
console.log('   Implicit empty locations    |   1.00   |   0.60    | -0.40')
console.log('   Mismatch                    |   0.00   |   0.00    | Same')

console.log('\n✅ Verification complete.\n')
