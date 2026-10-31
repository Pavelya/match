/**
 * Overall Score Calculation
 *
 * Main entry point for the matching algorithm.
 * Combines all components to produce a final match score.
 *
 * Based on: DOC_2_matching-algo XI.md
 */

import type { MatchInput, MatchResult, WeightConfig } from './types'
import { getWeights } from './types'
import { calculateFieldMatch } from './field-matcher'
import { calculateLocationMatch } from './location-matcher'
import { calculateAcademicMatch } from './academic-matcher'
import { applyPenaltiesAndCaps } from './penalties'

/**
 * Calculate overall match score between student and program
 *
 * This is the main function that orchestrates the entire matching algorithm:
 * 1. Calculate field match (F_M)
 * 2. Calculate location match (L_M)
 * 3. Calculate academic match (G_M)
 * 4. Compute weighted score: M = w_G × G_M + w_L × L_M + w_F × F_M
 * 5. Apply penalties and caps
 * 6. Return complete match result
 *
 * @param input - Match input with student profile and program requirements
 * @returns Complete match result with scores and adjustments
 */
export function calculateMatch(input: MatchInput): MatchResult {
  // === Step 1: Determine weights ===
  const weights: WeightConfig = input.weights
    ? input.weights
    : getWeights(input.mode, input.weights)

  // A preference the student hasn't stated has no weight, so being open can't lower the score
  let finalWeights = weights
  const noCountries = input.student.preferredCountries.length === 0
  const noFields = input.student.interestedFields.length === 0
  if (noCountries || noFields) {
    // Set the weight to 0 and redistribute
    // Example: 0.6/0.1/0.3 becomes 0.667/0/0.333 with no countries, 0.857/0.143/0 with no fields,
    // and 1/0/0 with neither
    const location = noCountries ? 0 : weights.location
    const field = noFields ? 0 : weights.field
    const redistributionFactor = 1 / (weights.academic + location + field)
    finalWeights = {
      academic: weights.academic * redistributionFactor,
      location: location * redistributionFactor,
      field: field * redistributionFactor
    }
  }

  // === Step 2: Calculate component scores ===

  const fieldMatch = calculateFieldMatch(input.student.interestedFields, input.program.fieldId)

  const locationMatch = calculateLocationMatch(
    input.student.preferredCountries,
    input.program.countryId
  )

  const academicMatch = calculateAcademicMatch(input.student, input.program)

  // === Step 3: Calculate weighted score ===
  // M = w_G × G_M + w_L × L_M + w_F × F_M

  const rawScore =
    finalWeights.academic * academicMatch.score +
    finalWeights.location * locationMatch.score +
    finalWeights.field * fieldMatch.score

  // === Step 4: Apply penalties and caps ===

  const adjustments = applyPenaltiesAndCaps(
    rawScore,
    academicMatch,
    locationMatch.score,
    fieldMatch.score,
    finalWeights
  )

  // === Step 5: Return complete result ===

  return {
    programId: input.program.programId,
    overallScore: adjustments.finalScore,
    academicMatch,
    locationMatch,
    fieldMatch,
    weightsUsed: finalWeights,
    adjustments
  }
}

/**
 * Calculate matches for multiple programs (batch processing)
 *
 * @param student - Student profile
 * @param programs - Array of programs to match against
 * @param mode - Optional matching mode
 * @param weights - Optional custom weights
 * @returns Array of match results sorted by score (descending)
 */
export function calculateMatches(
  student: MatchInput['student'],
  programs: MatchInput['program'][],
  mode?: MatchInput['mode'],
  weights?: MatchInput['weights']
): MatchResult[] {
  const results = programs.map((program) =>
    calculateMatch({
      student,
      program,
      mode,
      weights
    })
  )

  // Sort by overall score descending (best matches first)
  return results.sort((a, b) => b.overallScore - a.overallScore)
}
