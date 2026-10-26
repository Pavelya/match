import { describe, expect, it } from 'vitest'
import {
  validatePreferences,
  calculateFieldMatchV10,
  calculateLocationMatchV10,
  PREFERENCE_CONSTANTS
} from './preference-validator'

describe('calculateFieldMatchV10', () => {
  it.each([
    {
      name: 'Explicit match',
      prefs: ['engineering', 'medicine'],
      field: 'engineering',
      openToAll: false,
      score: 1.0,
      matchType: 'EXPLICIT_MATCH'
    },
    {
      name: 'Open to all',
      prefs: [],
      field: 'engineering',
      openToAll: true,
      score: 0.7,
      matchType: 'OPEN_TO_ALL'
    },
    // No preferences and no flag
    {
      name: 'Implicit empty',
      prefs: [],
      field: 'engineering',
      openToAll: false,
      score: 0.5,
      matchType: 'IMPLICIT_EMPTY'
    },
    {
      name: 'Mismatch',
      prefs: ['engineering'],
      field: 'medicine',
      openToAll: false,
      score: 0.0,
      matchType: 'MISMATCH'
    }
  ])('Field: $name scores $score', ({ prefs, field, openToAll, score, matchType }) => {
    const result = calculateFieldMatchV10(prefs, field, openToAll)
    expect(result.score).toBe(score)
    expect(result.matchType).toBe(matchType)
  })
})

describe('calculateLocationMatchV10', () => {
  it.each([
    {
      name: 'Explicit match',
      prefs: ['uk', 'germany'],
      country: 'uk',
      openToAll: false,
      score: 1.0,
      matchType: 'EXPLICIT_MATCH'
    },
    {
      name: 'Open to all',
      prefs: [],
      country: 'germany',
      openToAll: true,
      score: 0.85,
      matchType: 'OPEN_TO_ALL'
    },
    // No preferences and no flag
    {
      name: 'Implicit empty',
      prefs: [],
      country: 'germany',
      openToAll: false,
      score: 0.6,
      matchType: 'IMPLICIT_EMPTY'
    },
    {
      name: 'Mismatch',
      prefs: ['uk'],
      country: 'germany',
      openToAll: false,
      score: 0.0,
      matchType: 'MISMATCH'
    }
  ])('Location: $name scores $score', ({ prefs, country, openToAll, score, matchType }) => {
    const result = calculateLocationMatchV10(prefs, country, openToAll)
    expect(result.score).toBe(score)
    expect(result.matchType).toBe(matchType)
  })
})

describe('gaming prevention', () => {
  it('Gaming: Explicit match > Open to all fields', () => {
    expect(calculateFieldMatchV10(['eng'], 'eng', false).score).toBeGreaterThan(
      calculateFieldMatchV10([], 'eng', true).score
    )
  })

  it('Gaming: Explicit match > Open to all locations', () => {
    expect(calculateLocationMatchV10(['uk'], 'uk', false).score).toBeGreaterThan(
      calculateLocationMatchV10([], 'uk', true).score
    )
  })

  it('Gaming: Open to all fields < 1.0', () => {
    expect(PREFERENCE_CONSTANTS.OPEN_TO_ALL_FIELD_SCORE).toBeLessThan(1.0)
  })

  it('Gaming: Open to all locations < 1.0', () => {
    expect(PREFERENCE_CONSTANTS.OPEN_TO_ALL_LOCATION_SCORE).toBeLessThan(1.0)
  })
})

describe('validatePreferences', () => {
  it('Validation: Has preferences - valid, no errors', () => {
    const result = validatePreferences({
      preferredFields: ['engineering'],
      openToAllFields: false,
      preferredCountries: ['uk'],
      openToAllLocations: false
    })
    expect(result.isValid).toBe(true)
    expect(result.errors.length).toBe(0)
  })

  it('Validation: Open to all - valid', () => {
    const result = validatePreferences({
      preferredFields: [],
      openToAllFields: true,
      preferredCountries: [],
      openToAllLocations: true
    })
    expect(result.isValid).toBe(true)
  })

  it('Validation: Implicit empty - valid, with a warning for each', () => {
    const result = validatePreferences({
      preferredFields: [],
      openToAllFields: false,
      preferredCountries: [],
      openToAllLocations: false
    })
    expect(result.isValid).toBe(true)
    expect(result.warnings.length).toBe(2)
  })

  it('Validation: Contradiction - invalid, with an error for each', () => {
    // Preferences and "open to all" at once
    const result = validatePreferences({
      preferredFields: ['engineering'],
      openToAllFields: true,
      preferredCountries: ['uk'],
      openToAllLocations: true
    })
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBe(2)
  })
})
