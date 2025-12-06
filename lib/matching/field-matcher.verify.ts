/**
 * Manual test verification for Field Match (F_M)
 * Run with: npx tsx lib/matching/field-matcher.verify.ts
 */
/* eslint-disable no-console */

import { calculateFieldMatch } from './field-matcher'

let passed = 0
let failed = 0

function test(description: string, fn: () => void) {
  try {
    fn()
    console.log(`✅ ${description}`)
    passed++
  } catch (error) {
    console.log(`❌ ${description}`)
    console.log(`   ${error instanceof Error ? error.message : error}`)
    failed++
  }
}

function expect(value: unknown) {
  return {
    toBe(expected: unknown) {
      if (value !== expected) {
        throw new Error(`Expected ${expected} but got ${value}`)
      }
    }
  }
}

console.log('\n🧪 Field Match (F_M) Verification Tests\n')

// Test 1: Exact Match
test('Exact match: program field in student preferences → score 1.0', () => {
  const result = calculateFieldMatch(['field-engineering', 'field-medicine'], 'field-engineering')
  expect(result.score).toBe(1.0)
  expect(result.isMatch).toBe(true)
  expect(result.noPreferences).toBe(false)
})

test('Exact match: single preference matches → score 1.0', () => {
  const result = calculateFieldMatch(['field-medicine'], 'field-medicine')
  expect(result.score).toBe(1.0)
  expect(result.isMatch).toBe(true)
})

test('Exact match: matches last in list → score 1.0', () => {
  const result = calculateFieldMatch(
    ['field-a', 'field-b', 'field-engineering'],
    'field-engineering'
  )
  expect(result.score).toBe(1.0)
  expect(result.isMatch).toBe(true)
})

// Test 2: No Preferences
test('No preferences: empty array → score 0.5', () => {
  const result = calculateFieldMatch([], 'field-engineering')
  expect(result.score).toBe(0.5)
  expect(result.isMatch).toBe(false)
  expect(result.noPreferences).toBe(true)
})

test('No preferences: all programs get 0.5', () => {
  const fields = ['field-engineering', 'field-medicine', 'field-business']
  fields.forEach((field) => {
    const result = calculateFieldMatch([], field)
    expect(result.score).toBe(0.5)
    expect(result.noPreferences).toBe(true)
  })
})

// Test 3: Mismatch
test('Mismatch: program field not in preferences → score 0.0', () => {
  const result = calculateFieldMatch(['field-engineering', 'field-medicine'], 'field-business')
  expect(result.score).toBe(0.0)
  expect(result.isMatch).toBe(false)
  expect(result.noPreferences).toBe(false)
})

test('Mismatch: completely different fields → score 0.0', () => {
  const result = calculateFieldMatch(['field-arts', 'field-humanities'], 'field-engineering')
  expect(result.score).toBe(0.0)
  expect(result.isMatch).toBe(false)
})

// Edge Cases
test('Edge case: case-sensitive matching', () => {
  const result = calculateFieldMatch(['field-Engineering'], 'field-engineering')
  expect(result.score).toBe(0.0)
  expect(result.isMatch).toBe(false)
})

test('Edge case: duplicate fields in preferences still match', () => {
  const result = calculateFieldMatch(
    ['field-engineering', 'field-engineering'],
    'field-engineering'
  )
  expect(result.score).toBe(1.0)
  expect(result.isMatch).toBe(true)
})

// Summary
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`)

if (failed === 0) {
  console.log('🎉 All tests passed!\n')
  process.exit(0)
} else {
  console.log('❌ Some tests failed\n')
  process.exit(1)
}
