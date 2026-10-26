import { expect, test } from 'vitest'
import { calculateLocationMatch } from './location-matcher'

// Test 1: Preferred Country
test('Preferred country: program country in student preferences → score 1.0', () => {
  const result = calculateLocationMatch(['country-usa', 'country-uk'], 'country-usa')
  expect(result.score).toBe(1.0)
  expect(result.isMatch).toBe(true)
  expect(result.noPreferences).toBe(false)
})

test('Preferred country: single preference matches → score 1.0', () => {
  const result = calculateLocationMatch(['country-germany'], 'country-germany')
  expect(result.score).toBe(1.0)
  expect(result.isMatch).toBe(true)
})

test('Preferred country: matches last in list → score 1.0', () => {
  const result = calculateLocationMatch(
    ['country-usa', 'country-uk', 'country-canada'],
    'country-canada'
  )
  expect(result.score).toBe(1.0)
  expect(result.isMatch).toBe(true)
})

// Test 2: No Preferences
test('No preferences: empty array → score 1.0 (all locations acceptable)', () => {
  const result = calculateLocationMatch([], 'country-usa')
  expect(result.score).toBe(1.0)
  expect(result.isMatch).toBe(false)
  expect(result.noPreferences).toBe(true)
})

test('No preferences: all countries get 1.0', () => {
  const countries = ['country-usa', 'country-uk', 'country-germany', 'country-france']
  countries.forEach((country) => {
    const result = calculateLocationMatch([], country)
    expect(result.score).toBe(1.0)
    expect(result.noPreferences).toBe(true)
  })
})

// Test 3: Not Preferred
test('Not preferred: program country not in preferences → score 0.0', () => {
  const result = calculateLocationMatch(['country-usa', 'country-uk'], 'country-germany')
  expect(result.score).toBe(0.0)
  expect(result.isMatch).toBe(false)
  expect(result.noPreferences).toBe(false)
})

test('Not preferred: student has preferences but none match → score 0.0', () => {
  const result = calculateLocationMatch(['country-usa'], 'country-japan')
  expect(result.score).toBe(0.0)
  expect(result.isMatch).toBe(false)
})

// Edge Cases
test('Edge case: case-sensitive matching', () => {
  const result = calculateLocationMatch(['country-USA'], 'country-usa')
  expect(result.score).toBe(0.0)
  expect(result.isMatch).toBe(false)
})

test('Edge case: duplicate countries in preferences still match', () => {
  const result = calculateLocationMatch(['country-usa', 'country-usa'], 'country-usa')
  expect(result.score).toBe(1.0)
  expect(result.isMatch).toBe(true)
})

test('Edge case: many preferences with match', () => {
  const manyCountries = Array.from({ length: 20 }, (_, i) => `country-${i}`)
  manyCountries.push('country-target')
  const result = calculateLocationMatch(manyCountries, 'country-target')
  expect(result.score).toBe(1.0)
  expect(result.isMatch).toBe(true)
})
