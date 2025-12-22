/**
 * Fit Quality Score (FQS) Calculator
 *
 * NEW in Matching Algorithm V10
 *
 * Calculates how well a student's IB points "fit" a program's requirements.
 * Unlike the binary V9 approach (meet = 1.0, below = scaled penalty),
 * V10 uses a continuous curve that:
 *
 * 1. Rewards students slightly ABOVE requirements (optimal zone)
 * 2. Gently penalizes significant over-qualification
 * 3. Scales penalties for under-qualification based on deficit
 *
 * The optimal match occurs when a student exceeds requirements by 2-3 points,
 * providing a safety margin without significant over-qualification.
 *
 * Score ranges:
 * - Optimal zone (+0 to +3 above required): 0.95 - 1.00
 * - Over-qualified (>+3 above): 0.80 - 1.00 (gentle decay)
 * - Under-qualified: 0.30 - 0.90 (steeper decay)
 *
 * Based on: DOC_2_matching-algo X.md
 */

// IB Diploma constants
const IB_MAX_POINTS = 45
const IB_MIN_DIPLOMA = 24

// FQS tuning parameters
const OPTIMAL_BUFFER = 3 // Points above required for maximum fit

// Score bounds
const UNDER_QUALIFIED_FLOOR = 0.3 // Minimum score for severely under-qualified
const UNDER_QUALIFIED_CEILING = 0.9 // Maximum score when under-qualified
const OVER_QUALIFIED_FLOOR = 0.8 // Minimum score for severely over-qualified
const EXACT_MATCH_SCORE = 0.95 // Score when exactly meeting requirement
const OPTIMAL_MATCH_SCORE = 1.0 // Score at optimal point (required + buffer)

/**
 * Calculate Points Fit Quality score
 *
 * @param studentPoints - Student's total IB points
 * @param requiredPoints - Program's minimum IB points requirement
 * @returns Fit quality score between 0.30 and 1.00
 *
 * @example
 * // Optimal fit: 3 points above requirement
 * calculatePointsFitQuality(43, 40) // returns 1.00
 *
 * // Exactly meeting requirement
 * calculatePointsFitQuality(40, 40) // returns 0.95
 *
 * // Significantly over-qualified
 * calculatePointsFitQuality(45, 28) // returns ~0.81
 *
 * // Near miss (2 points below)
 * calculatePointsFitQuality(38, 40) // returns ~0.83
 */
export function calculatePointsFitQuality(studentPoints: number, requiredPoints: number): number {
  // Handle edge case: no points requirement
  if (requiredPoints <= 0) {
    return OPTIMAL_MATCH_SCORE
  }

  // Clamp inputs to valid IB range
  const clampedStudentPoints = Math.max(IB_MIN_DIPLOMA, Math.min(IB_MAX_POINTS, studentPoints))
  const clampedRequiredPoints = Math.max(IB_MIN_DIPLOMA, Math.min(IB_MAX_POINTS, requiredPoints))

  const optimalPoints = clampedRequiredPoints + OPTIMAL_BUFFER

  // CASE 1: Under-qualified (below requirement)
  if (clampedStudentPoints < clampedRequiredPoints) {
    return calculateUnderQualifiedScore(clampedStudentPoints, clampedRequiredPoints)
  }

  // CASE 2: Optimal zone (at or slightly above requirement, within buffer)
  if (clampedStudentPoints <= optimalPoints) {
    return calculateOptimalZoneScore(clampedStudentPoints, clampedRequiredPoints)
  }

  // CASE 3: Over-qualified (significantly above requirement)
  return calculateOverQualifiedScore(clampedStudentPoints, optimalPoints)
}

/**
 * Calculate score for under-qualified students (below requirement)
 *
 * Linear decay from 0.90 (1 point below) to 0.30 (maximum deficit)
 */
function calculateUnderQualifiedScore(studentPoints: number, requiredPoints: number): number {
  const deficit = requiredPoints - studentPoints

  // Maximum possible deficit (from required points to minimum diploma)
  const maxDeficit = requiredPoints - IB_MIN_DIPLOMA

  // Avoid division by zero
  if (maxDeficit <= 0) {
    return UNDER_QUALIFIED_FLOOR
  }

  // Linear decay rate: lose (0.90 - 0.30) = 0.60 over the full deficit range
  const decayRange = UNDER_QUALIFIED_CEILING - UNDER_QUALIFIED_FLOOR
  const decayRate = decayRange / maxDeficit

  const score = UNDER_QUALIFIED_CEILING - deficit * decayRate

  return Math.max(UNDER_QUALIFIED_FLOOR, score)
}

/**
 * Calculate score for optimal zone (at or slightly above requirement)
 *
 * Linear increase from 0.95 (exactly meeting) to 1.00 (at buffer)
 */
function calculateOptimalZoneScore(studentPoints: number, requiredPoints: number): number {
  const surplus = studentPoints - requiredPoints

  // Linear increase from exact match to optimal
  const scoreRange = OPTIMAL_MATCH_SCORE - EXACT_MATCH_SCORE
  const score = EXACT_MATCH_SCORE + (surplus / OPTIMAL_BUFFER) * scoreRange

  return Math.min(OPTIMAL_MATCH_SCORE, score)
}

/**
 * Calculate score for over-qualified students (significantly above requirement)
 *
 * Gentle linear decay from 1.00 to 0.80 as over-qualification increases
 */
function calculateOverQualifiedScore(studentPoints: number, optimalPoints: number): number {
  const overAmount = studentPoints - optimalPoints

  // Maximum possible over-qualification (from optimal to max IB points)
  const maxOver = IB_MAX_POINTS - optimalPoints

  // Avoid division by zero
  if (maxOver <= 0) {
    return OPTIMAL_MATCH_SCORE
  }

  // Gentle decay: lose only 0.20 over the full over-qualification range
  const decayRange = OPTIMAL_MATCH_SCORE - OVER_QUALIFIED_FLOOR
  const decayRate = decayRange / maxOver

  const score = OPTIMAL_MATCH_SCORE - overAmount * decayRate

  return Math.max(OVER_QUALIFIED_FLOOR, score)
}

/**
 * Get a human-readable fit quality category
 *
 * @param studentPoints - Student's total IB points
 * @param requiredPoints - Program's minimum IB points requirement
 * @returns Category string: 'OPTIMAL' | 'ABOVE' | 'BELOW' | 'FAR_BELOW' | 'FAR_ABOVE'
 */
export function getFitQualityCategory(
  studentPoints: number,
  requiredPoints: number
): 'OPTIMAL' | 'ABOVE' | 'BELOW' | 'FAR_BELOW' | 'FAR_ABOVE' {
  const optimalPoints = requiredPoints + OPTIMAL_BUFFER

  if (studentPoints < requiredPoints - 5) {
    return 'FAR_BELOW'
  }
  if (studentPoints < requiredPoints) {
    return 'BELOW'
  }
  if (studentPoints <= optimalPoints) {
    return 'OPTIMAL'
  }
  if (studentPoints <= requiredPoints + 10) {
    return 'ABOVE'
  }
  return 'FAR_ABOVE'
}

// Export constants for testing and configuration
export const FIT_QUALITY_CONSTANTS = {
  IB_MAX_POINTS,
  IB_MIN_DIPLOMA,
  OPTIMAL_BUFFER,
  UNDER_QUALIFIED_FLOOR,
  UNDER_QUALIFIED_CEILING,
  OVER_QUALIFIED_FLOOR,
  EXACT_MATCH_SCORE,
  OPTIMAL_MATCH_SCORE
} as const
