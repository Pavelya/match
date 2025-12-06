/**
 * Penalties and Caps
 *
 * Applies adjustments to match scores based on:
 * - Missing critical subjects
 * - Unmet requirements
 * - Multiple deficiencies
 * - Non-academic score floor
 *
 * Based on: DOC_2_matching-algo IX.md
 */

import type { MatchAdjustments, AcademicMatchScore, WeightConfig } from './types'

/**
 * Apply penalties and caps to a raw weighted score
 *
 * @param rawScore - The raw weighted score before adjustments
 * @param academicMatch - Academic match details
 * @param locationScore - Location match score (L_M)
 * @param fieldScore - Field match score (F_M)
 * @param weights - Weight configuration used
 * @returns MatchAdjustments with final score and reasons
 */
export function applyPenaltiesAndCaps(
  rawScore: number,
  academicMatch: AcademicMatchScore,
  locationScore: number,
  fieldScore: number,
  weights: WeightConfig
): MatchAdjustments {
  const caps: MatchAdjustments['caps'] = {}
  const reasons: string[] = []
  let finalScore = rawScore

  // === Determine Absolute Cap Limits First ===
  // These are hard limits based on what requirements are unmet

  let absoluteCap: number | null = null
  let capReasonText = ''

  if (academicMatch.missingCriticalCount > 0) {
    absoluteCap = 0.45
    caps.missingCriticalSubject = 0.45
    capReasonText = `Missing ${academicMatch.missingCriticalCount} critical subject(s) - capped at 0.45`
  } else if (academicMatch.missingNonCriticalCount > 0) {
    absoluteCap = 0.7
    caps.missingNonCriticalSubject = 0.7
    capReasonText = `Missing ${academicMatch.missingNonCriticalCount} non-critical subject(s) - capped at 0.70`
  } else if (checkCriticalNearMiss(academicMatch)) {
    absoluteCap = 0.8
    caps.criticalNearMiss = 0.8
    capReasonText = 'Critical subject near-miss - capped at 0.80'
  }

  // Points shortfall cap
  if (!academicMatch.meetsPointsRequirement && academicMatch.pointsShortfall > 0) {
    if (absoluteCap === null || 0.9 < absoluteCap) {
      absoluteCap = 0.9
      caps.unmetRequirements = 0.9
      capReasonText = `${academicMatch.pointsShortfall} IB points below requirement - capped at 0.90`
    }
  }

  // General unmet requirements cap
  const hasUnmetRequirements =
    !academicMatch.meetsPointsRequirement ||
    academicMatch.subjectMatches.some((m) => m.status !== 'FULL_MATCH')

  if (hasUnmetRequirements && (absoluteCap === null || 0.9 < absoluteCap)) {
    absoluteCap = 0.9
    if (!caps.unmetRequirements) {
      caps.unmetRequirements = 0.9
      if (!capReasonText) {
        capReasonText = 'Unmet requirements - capped at 0.90'
      }
    }
  }

  // Add cap reason FIRST if cap will apply
  if (absoluteCap !== null && rawScore > absoluteCap) {
    reasons.push(capReasonText)
  }

  // === Multiple Missing/Low Requirements Penalty ===
  // Only apply when there are multiple (2+) requirements
  // Single requirement gets cap only (cap IS the penalty)

  const totalRequirements = academicMatch.subjectMatches.length
  const multipleRequirementsPenalty =
    totalRequirements >= 2 ? calculateMultipleRequirementsPenalty(academicMatch) : 0

  if (multipleRequirementsPenalty > 0) {
    const adjustmentFactor = 1 - 0.4 * multipleRequirementsPenalty
    const adjustedScore = finalScore * adjustmentFactor
    if (adjustedScore < finalScore) {
      reasons.push(
        `Multiple unmet requirements penalty: ${(multipleRequirementsPenalty * 100).toFixed(0)}% → adjustment factor ${adjustmentFactor.toFixed(2)}`
      )
      finalScore = adjustedScore
    }
  }

  // === Non-Academic Score Floor ===

  const minNonAcademic = calculateNonAcademicFloor(locationScore, fieldScore, weights)
  if (finalScore < minNonAcademic) {
    reasons.push(
      `Non-academic floor applied: ${minNonAcademic.toFixed(2)} (from location/field match)`
    )
    finalScore = minNonAcademic
  }

  // === Apply Absolute Cap ===
  // Cap cannot be exceeded regardless of other adjustments

  if (absoluteCap !== null && finalScore > absoluteCap) {
    finalScore = absoluteCap
  }

  // === Minimum Score Guarantees ===

  // If student meets points but G_M ended up very low, ensure minimum 0.15
  if (academicMatch.meetsPointsRequirement && finalScore < 0.15) {
    reasons.push('Minimum guarantee: meets points requirement → floor at 0.15')
    finalScore = 0.15
  }

  return {
    rawScore,
    finalScore,
    caps,
    multipleRequirementsPenalty:
      multipleRequirementsPenalty > 0 ? multipleRequirementsPenalty : undefined,
    nonAcademicFloor: minNonAcademic,
    minimumScoreGuarantee:
      academicMatch.meetsPointsRequirement && finalScore === 0.15 ? 0.15 : undefined,
    reasons
  }
}

/**
 * Check if there's a critical near-miss
 * (critical subject 1 point below or SL instead of HL)
 */
function checkCriticalNearMiss(academicMatch: AcademicMatchScore): boolean {
  for (const match of academicMatch.subjectMatches) {
    // Check if it's a critical requirement
    const isCritical = 'isCritical' in match.requirement && match.requirement.isCritical

    if (isCritical && match.status === 'PARTIAL_MATCH') {
      // Near-miss scenarios: score around 0.80-0.85
      if (match.score >= 0.75) {
        return true
      }
    }
  }
  return false
}

/**
 * Calculate penalty factor for multiple missing/low requirements
 */
function calculateMultipleRequirementsPenalty(academicMatch: AcademicMatchScore): number {
  const totalRequirements = academicMatch.subjectMatches.length
  if (totalRequirements === 0) return 0

  let missingCount = 0
  let lowCount = 0

  for (const match of academicMatch.subjectMatches) {
    if (match.status === 'NO_MATCH') {
      missingCount++
    } else if (match.status === 'PARTIAL_MATCH') {
      lowCount++
    }
  }

  // penaltyFactor = (missing / total) + 0.5 * (low / total)
  const penaltyFactor = missingCount / totalRequirements + 0.5 * (lowCount / totalRequirements)

  return penaltyFactor
}

/**
 * Calculate non-academic score floor from location and field preferences
 */
function calculateNonAcademicFloor(
  locationScore: number,
  fieldScore: number,
  weights: WeightConfig
): number {
  // minLocationContribution = w_L × L_M × 0.8
  const minLocationContribution = weights.location * locationScore * 0.8

  // minFieldContribution = w_F × F_M × 0.8
  const minFieldContribution = weights.field * fieldScore * 0.8

  return minLocationContribution + minFieldContribution
}
