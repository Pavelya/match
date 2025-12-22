/**
 * Preference Validator and Anti-Gaming Module
 *
 * NEW in Matching Algorithm V10
 *
 * Prevents "gaming" the matching algorithm by leaving preferences empty.
 * In V9, empty preferences gave favorable scores (0.5 for fields, 1.0 for locations).
 * V10 requires explicit "open to all" selections with reduced scores.
 *
 * Anti-Gaming Rules:
 * - Students must explicitly select preferences OR mark "open to all"
 * - "Open to all fields" → 0.70 score (not 1.0)
 * - "Open to all locations" → 0.85 score (not 1.0)
 * - Empty preferences without explicit flag → validation error (or fallback score)
 *
 * Based on: DOC_2_matching-algo X.md
 */

// Score constants for "open to all" selections
export const OPEN_TO_ALL_FIELD_SCORE = 0.7
export const OPEN_TO_ALL_LOCATION_SCORE = 0.85

// Fallback scores when preferences are empty but not explicitly "open to all"
// (Used during V10 transition period before UI enforces explicit selection)
export const IMPLICIT_EMPTY_FIELD_SCORE = 0.5 // Same as V9 for backward compat
export const IMPLICIT_EMPTY_LOCATION_SCORE = 0.6 // Lower than V9's 1.0

/**
 * Preference configuration for V10 matching
 */
export interface PreferenceConfig {
  // Field preferences
  preferredFields: string[]
  openToAllFields: boolean

  // Location preferences
  preferredCountries: string[]
  openToAllLocations: boolean
}

/**
 * Validation result for preference configurations
 */
export interface PreferenceValidationResult {
  isValid: boolean
  errors: PreferenceValidationError[]
  warnings: PreferenceValidationWarning[]
}

export interface PreferenceValidationError {
  field: 'fields' | 'locations'
  code: 'EMPTY_WITHOUT_FLAG' | 'BOTH_PREFS_AND_FLAG'
  message: string
}

export interface PreferenceValidationWarning {
  field: 'fields' | 'locations'
  code: 'IMPLICIT_OPEN_TO_ALL' | 'TOO_MANY_PREFERENCES'
  message: string
}

/**
 * Validate preference configuration
 *
 * Checks for:
 * - Empty preferences without explicit "open to all" flag (warning in V10 transition, error later)
 * - Both preferences AND "open to all" flag set (contradiction)
 *
 * @param config - Preference configuration to validate
 * @returns Validation result with errors and warnings
 */
export function validatePreferences(config: PreferenceConfig): PreferenceValidationResult {
  const errors: PreferenceValidationError[] = []
  const warnings: PreferenceValidationWarning[] = []

  // Field validation
  if (config.preferredFields.length === 0 && !config.openToAllFields) {
    // During transition: warning (not error) - UI may not support flag yet
    warnings.push({
      field: 'fields',
      code: 'IMPLICIT_OPEN_TO_ALL',
      message:
        'No field preferences set and not explicitly open to all. Consider setting preferences or marking "open to all fields".'
    })
  }

  if (config.preferredFields.length > 0 && config.openToAllFields) {
    // Contradiction: can't have specific preferences AND be open to all
    errors.push({
      field: 'fields',
      code: 'BOTH_PREFS_AND_FLAG',
      message: 'Cannot have both specific field preferences and "open to all fields" enabled.'
    })
  }

  // Location validation
  if (config.preferredCountries.length === 0 && !config.openToAllLocations) {
    // During transition: warning (not error)
    warnings.push({
      field: 'locations',
      code: 'IMPLICIT_OPEN_TO_ALL',
      message:
        'No location preferences set and not explicitly open to all. Consider setting preferences or marking "open to all locations".'
    })
  }

  if (config.preferredCountries.length > 0 && config.openToAllLocations) {
    // Contradiction
    errors.push({
      field: 'locations',
      code: 'BOTH_PREFS_AND_FLAG',
      message: 'Cannot have both specific location preferences and "open to all locations" enabled.'
    })
  }

  // Flag for excessive preferences (may indicate gaming)
  if (config.preferredFields.length > 10) {
    warnings.push({
      field: 'fields',
      code: 'TOO_MANY_PREFERENCES',
      message:
        'Many field preferences selected. Consider narrowing your focus or using "open to all".'
    })
  }

  if (config.preferredCountries.length > 15) {
    warnings.push({
      field: 'locations',
      code: 'TOO_MANY_PREFERENCES',
      message:
        'Many location preferences selected. Consider narrowing your focus or using "open to all".'
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Calculate V10 field match score with anti-gaming measures
 *
 * Unlike V9 which gave 0.5 for empty preferences, V10:
 * - Gives 1.0 for explicit match
 * - Gives 0.70 for explicit "open to all"
 * - Gives 0.50 for implicit empty (backward compat during transition)
 * - Gives 0.0 for mismatch
 *
 * @param studentFields - Array of field IDs the student is interested in
 * @param programField - The field ID of the program
 * @param openToAllFields - Whether student explicitly selected "open to all fields"
 * @returns Score between 0 and 1
 */
export function calculateFieldMatchV10(
  studentFields: string[],
  programField: string,
  openToAllFields: boolean
): {
  score: number
  matchType: 'EXPLICIT_MATCH' | 'OPEN_TO_ALL' | 'IMPLICIT_EMPTY' | 'MISMATCH'
  isMatch: boolean
} {
  // Case 1: Explicit "open to all fields"
  if (openToAllFields) {
    return {
      score: OPEN_TO_ALL_FIELD_SCORE,
      matchType: 'OPEN_TO_ALL',
      isMatch: false
    }
  }

  // Case 2: No preferences and not explicitly open to all (implicit empty)
  if (studentFields.length === 0) {
    return {
      score: IMPLICIT_EMPTY_FIELD_SCORE,
      matchType: 'IMPLICIT_EMPTY',
      isMatch: false
    }
  }

  // Case 3: Has preferences - check for match
  const isMatch = studentFields.includes(programField)

  if (isMatch) {
    return {
      score: 1.0,
      matchType: 'EXPLICIT_MATCH',
      isMatch: true
    }
  }

  return {
    score: 0.0,
    matchType: 'MISMATCH',
    isMatch: false
  }
}

/**
 * Calculate V10 location match score with anti-gaming measures
 *
 * Unlike V9 which gave 1.0 for empty preferences, V10:
 * - Gives 1.0 for explicit match
 * - Gives 0.85 for explicit "open to all"
 * - Gives 0.60 for implicit empty (backward compat during transition)
 * - Gives 0.0 for mismatch
 *
 * @param studentCountries - Array of country IDs the student prefers
 * @param programCountry - The country ID of the program
 * @param openToAllLocations - Whether student explicitly selected "open to all locations"
 * @returns Score between 0 and 1
 */
export function calculateLocationMatchV10(
  studentCountries: string[],
  programCountry: string,
  openToAllLocations: boolean
): {
  score: number
  matchType: 'EXPLICIT_MATCH' | 'OPEN_TO_ALL' | 'IMPLICIT_EMPTY' | 'MISMATCH'
  isMatch: boolean
} {
  // Case 1: Explicit "open to all locations"
  if (openToAllLocations) {
    return {
      score: OPEN_TO_ALL_LOCATION_SCORE,
      matchType: 'OPEN_TO_ALL',
      isMatch: false
    }
  }

  // Case 2: No preferences and not explicitly open to all (implicit empty)
  if (studentCountries.length === 0) {
    return {
      score: IMPLICIT_EMPTY_LOCATION_SCORE,
      matchType: 'IMPLICIT_EMPTY',
      isMatch: false
    }
  }

  // Case 3: Has preferences - check for match
  const isMatch = studentCountries.includes(programCountry)

  if (isMatch) {
    return {
      score: 1.0,
      matchType: 'EXPLICIT_MATCH',
      isMatch: true
    }
  }

  return {
    score: 0.0,
    matchType: 'MISMATCH',
    isMatch: false
  }
}

// Export constants for testing and configuration
export const PREFERENCE_CONSTANTS = {
  OPEN_TO_ALL_FIELD_SCORE,
  OPEN_TO_ALL_LOCATION_SCORE,
  IMPLICIT_EMPTY_FIELD_SCORE,
  IMPLICIT_EMPTY_LOCATION_SCORE
} as const
