/**
 * Field Match (F_M) Calculator
 *
 * Calculates how well a program's field aligns with student's interests.
 *
 * Rules:
 * - Exact Match or No Preference: 1.0
 * - Mismatch: Program field not in student's preferences → 0.0
 *
 * Based on: DOC_2_matching-algo XI.md
 */

import type { FieldMatchScore } from './types'

/**
 * Calculate field match score between student interests and program field
 *
 * @param studentFields - Array of field IDs the student is interested in
 * @param programField - The field ID of the program
 * @returns FieldMatchScore with score (0-1) and match details
 *
 * @example
 * ```typescript
 * // Exact match
 * calculateFieldMatch(['field-engineering', 'field-medicine'], 'field-engineering')
 * // Returns: { score: 1.0, isMatch: true, noPreferences: false }
 *
 * // No preferences - all fields acceptable
 * calculateFieldMatch([], 'field-engineering')
 * // Returns: { score: 1.0, isMatch: false, noPreferences: true }
 *
 * // Mismatch
 * calculateFieldMatch(['field-engineering'], 'field-medicine')
 * // Returns: { score: 0.0, isMatch: false, noPreferences: false }
 * ```
 */
export function calculateFieldMatch(
  studentFields: string[],
  programField: string
): FieldMatchScore {
  // Case 1: Student has no field preferences
  // All fields are acceptable (score 1.0)
  if (studentFields.length === 0) {
    return {
      score: 1.0,
      isMatch: false,
      noPreferences: true
    }
  }

  // Case 2: Check if program field is in student's preferences
  const isMatch = studentFields.includes(programField)

  return {
    score: isMatch ? 1.0 : 0.0,
    isMatch,
    noPreferences: false
  }
}
