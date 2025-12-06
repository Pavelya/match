/**
 * Location Match (L_M) Calculator
 *
 * Calculates how well a program's location aligns with student's preferences.
 *
 * Rules:
 * - Preferred Country or No Preference: 1.0
 * - Not Preferred: 0.0
 *
 * Based on: DOC_2_matching-algo IX.md
 */

import type { LocationMatchScore } from './types'

/**
 * Calculate location match score between student preferences and program country
 *
 * @param studentCountries - Array of country IDs the student prefers
 * @param programCountry - The country ID of the program
 * @returns LocationMatchScore with score (0-1) and match details
 *
 * @example
 * ```typescript
 * // Preferred country
 * calculateLocationMatch(['country-usa', 'country-uk'], 'country-usa')
 * // Returns: { score: 1.0, isMatch: true, noPreferences: false }
 *
 * // No preferences - all locations acceptable
 * calculateLocationMatch([], 'country-germany')
 * // Returns: { score: 1.0, isMatch: false, noPreferences: true }
 *
 * // Not preferred
 * calculateLocationMatch(['country-usa'], 'country-germany')
 * // Returns: { score: 0.0, isMatch: false, noPreferences: false }
 * ```
 */
export function calculateLocationMatch(
  studentCountries: string[],
  programCountry: string
): LocationMatchScore {
  // Case 1: Student has no location preferences
  // All locations are acceptable (score 1.0)
  if (studentCountries.length === 0) {
    return {
      score: 1.0,
      isMatch: false,
      noPreferences: true
    }
  }

  // Case 2: Check if program country is in student's preferences
  const isMatch = studentCountries.includes(programCountry)

  return {
    score: isMatch ? 1.0 : 0.0,
    isMatch,
    noPreferences: false
  }
}
