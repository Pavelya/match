/**
 * Unified Penalty System
 *
 * NEW in Matching Algorithm V10
 *
 * Replaces the sequential 6-step penalty system in V9 with a single
 * unified calculation that collects all penalties and caps, then
 * applies them in one pass for order-independent, predictable results.
 *
 * V9 Issues Addressed:
 * - Sequential adjustments could conflict (order mattered)
 * - Hard to debug which penalty applied in what order
 * - Multiple function calls made the flow complex
 *
 * V10 Approach:
 * 1. COLLECT all applicable penalties into an array
 * 2. COLLECT all applicable caps into an array
 * 3. CALCULATE total penalty (max 60% reduction)
 * 4. APPLY the lowest cap
 * 5. APPLY the score floor (0.15 minimum)
 *
 * Based on: DOC_2_matching-algo X.md
 */

import type { AcademicMatchScore, WeightConfig } from './types'

// ============================================
// Types
// ============================================

export interface PenaltyItem {
  type: PenaltyType
  value: number // Amount to reduce score by (0.0 - 1.0)
  description: string
}

export interface CapItem {
  type: CapType
  value: number // Maximum score allowed (0.0 - 1.0)
  description: string
}

export type PenaltyType =
  | 'POINTS_SHORTFALL'
  | 'MISSING_REQUIREMENTS'
  | 'LOW_REQUIREMENTS'
  | 'MULTIPLE_ISSUES'

export type CapType =
  | 'CRITICAL_MISSING'
  | 'CRITICAL_LARGE_MISS'
  | 'CRITICAL_NEAR_MISS'
  | 'NON_CRITICAL_MISSING'
  | 'POINTS_UNMET'
  | 'ANY_UNMET'

export interface UnifiedPenaltyResult {
  rawScore: number
  finalScore: number

  // Full breakdown for transparency
  appliedPenalties: PenaltyItem[]
  totalPenaltyFactor: number // How much the score was reduced (0.0 - 0.6)

  appliedCaps: CapItem[]
  effectiveCap: number | null // The cap that was applied (lowest)

  floorApplied: boolean
  floorValue: number

  // V9 compatibility fields
  nonAcademicFloor: number

  // Human-readable reasons
  reasons: string[]
}

// ============================================
// Constants
// ============================================

const MAX_PENALTY_REDUCTION = 0.6 // Maximum 60% penalty reduction
const SCORE_FLOOR = 0.15 // Minimum possible score

// Penalty rates
const POINTS_SHORTFALL_RATE = 0.025 // 2.5% per point
const MISSING_REQ_RATE = 0.3 // Up to 30% for missing requirements
const LOW_REQ_RATE = 0.15 // Up to 15% for low requirements

// Cap values
const CAP_CRITICAL_MISSING = 0.45
const CAP_CRITICAL_LARGE_MISS = 0.6
const CAP_CRITICAL_NEAR_MISS = 0.8
const CAP_NON_CRITICAL_MISSING = 0.7
const CAP_POINTS_UNMET = 0.9
const CAP_ANY_UNMET = 0.9

// ============================================
// Main Function
// ============================================

/**
 * Apply unified penalties and caps in a single pass
 *
 * @param rawScore - The raw weighted score before adjustments
 * @param academicMatch - Academic match details
 * @param locationScore - Location match score (L_M)
 * @param fieldScore - Field match score (F_M)
 * @param weights - Weight configuration used
 * @returns UnifiedPenaltyResult with full breakdown
 */
export function applyUnifiedPenalties(
  rawScore: number,
  academicMatch: AcademicMatchScore,
  locationScore: number,
  fieldScore: number,
  weights: WeightConfig
): UnifiedPenaltyResult {
  const penalties: PenaltyItem[] = []
  const caps: CapItem[] = []
  const reasons: string[] = []

  // ============================================
  // Step 1: Collect all penalties
  // ============================================

  // Points shortfall penalty
  if (!academicMatch.meetsPointsRequirement && academicMatch.pointsShortfall > 0) {
    const penaltyValue = Math.min(
      academicMatch.pointsShortfall * POINTS_SHORTFALL_RATE,
      0.25 // Max 25% from points alone
    )
    penalties.push({
      type: 'POINTS_SHORTFALL',
      value: penaltyValue,
      description: `${academicMatch.pointsShortfall} points below requirement`
    })
  }

  // Missing and low requirements penalties
  const totalRequirements = academicMatch.subjectMatches.length
  if (totalRequirements > 0) {
    let missingCount = 0
    let lowCount = 0

    for (const match of academicMatch.subjectMatches) {
      if (match.status === 'NO_MATCH') {
        missingCount++
      } else if (match.status === 'PARTIAL_MATCH') {
        lowCount++
      }
    }

    if (missingCount > 0) {
      const missingPenalty = (missingCount / totalRequirements) * MISSING_REQ_RATE
      penalties.push({
        type: 'MISSING_REQUIREMENTS',
        value: missingPenalty,
        description: `${missingCount} of ${totalRequirements} requirements missing`
      })
    }

    if (lowCount > 0) {
      const lowPenalty = (lowCount / totalRequirements) * LOW_REQ_RATE
      penalties.push({
        type: 'LOW_REQUIREMENTS',
        value: lowPenalty,
        description: `${lowCount} of ${totalRequirements} requirements partially met`
      })
    }
  }

  // ============================================
  // Step 2: Collect all caps
  // ============================================

  // Critical subject caps
  if (academicMatch.missingCriticalCount > 0) {
    caps.push({
      type: 'CRITICAL_MISSING',
      value: CAP_CRITICAL_MISSING,
      description: `Missing ${academicMatch.missingCriticalCount} critical subject(s)`
    })
  } else {
    // Check for critical near-miss or large miss
    const criticalIssue = checkCriticalSubjectIssues(academicMatch)
    if (criticalIssue === 'large_miss') {
      caps.push({
        type: 'CRITICAL_LARGE_MISS',
        value: CAP_CRITICAL_LARGE_MISS,
        description: 'Critical subject significantly below requirement'
      })
    } else if (criticalIssue === 'near_miss') {
      caps.push({
        type: 'CRITICAL_NEAR_MISS',
        value: CAP_CRITICAL_NEAR_MISS,
        description: 'Critical subject near-miss (1 grade below or SL for HL)'
      })
    }
  }

  // Non-critical missing cap
  if (academicMatch.missingNonCriticalCount > 0) {
    caps.push({
      type: 'NON_CRITICAL_MISSING',
      value: CAP_NON_CRITICAL_MISSING,
      description: `Missing ${academicMatch.missingNonCriticalCount} non-critical subject(s)`
    })
  }

  // Points unmet cap
  if (!academicMatch.meetsPointsRequirement) {
    caps.push({
      type: 'POINTS_UNMET',
      value: CAP_POINTS_UNMET,
      description: 'IB points requirement not met'
    })
  }

  // Any unmet requirements cap
  const hasUnmetRequirements =
    !academicMatch.meetsPointsRequirement ||
    academicMatch.subjectMatches.some((m) => m.status !== 'FULL_MATCH')

  if (hasUnmetRequirements && caps.length === 0) {
    // Only add generic cap if no specific cap already applies
    caps.push({
      type: 'ANY_UNMET',
      value: CAP_ANY_UNMET,
      description: 'Some requirements not fully met'
    })
  }

  // ============================================
  // Step 3: Calculate total penalty
  // ============================================

  const totalPenalty = penalties.reduce((sum, p) => sum + p.value, 0)
  const clampedPenalty = Math.min(totalPenalty, MAX_PENALTY_REDUCTION)
  const penaltyFactor = 1 - clampedPenalty

  let score = rawScore * penaltyFactor

  if (penalties.length > 0) {
    reasons.push(
      `Penalties applied: ${(clampedPenalty * 100).toFixed(0)}% reduction ` +
        `(${penalties.map((p) => p.type).join(', ')})`
    )
  }

  // ============================================
  // Step 4: Apply the lowest cap
  // ============================================

  const effectiveCap = caps.length > 0 ? Math.min(...caps.map((c) => c.value)) : null

  if (effectiveCap !== null && score > effectiveCap) {
    const cappingItem = caps.find((c) => c.value === effectiveCap)
    reasons.push(
      `Capped at ${effectiveCap.toFixed(2)}: ${cappingItem?.description || 'requirement issue'}`
    )
    score = effectiveCap
  }

  // ============================================
  // Step 5: Apply non-academic floor (V9 compat)
  // ============================================

  const nonAcademicFloor = calculateNonAcademicFloor(locationScore, fieldScore, weights)
  if (score < nonAcademicFloor) {
    reasons.push(
      `Non-academic floor applied: ${nonAcademicFloor.toFixed(2)} (location/field preferences)`
    )
    score = nonAcademicFloor
  }

  // ============================================
  // Step 6: Apply score floor
  // ============================================

  let floorApplied = false
  if (score < SCORE_FLOOR) {
    floorApplied = true
    reasons.push(`Minimum score floor applied: ${SCORE_FLOOR}`)
    score = SCORE_FLOOR
  }

  // Special case: meets points but score very low
  if (academicMatch.meetsPointsRequirement && score < SCORE_FLOOR) {
    floorApplied = true
    score = SCORE_FLOOR
    reasons.push(`Minimum guarantee: meets points requirement → floor at ${SCORE_FLOOR}`)
  }

  return {
    rawScore,
    finalScore: score,
    appliedPenalties: penalties,
    totalPenaltyFactor: clampedPenalty,
    appliedCaps: caps,
    effectiveCap,
    floorApplied,
    floorValue: SCORE_FLOOR,
    nonAcademicFloor,
    reasons
  }
}

// ============================================
// Helper Functions
// ============================================

/**
 * Check for critical subject issues (near-miss or large miss)
 */
function checkCriticalSubjectIssues(
  academicMatch: AcademicMatchScore
): 'near_miss' | 'large_miss' | null {
  for (const match of academicMatch.subjectMatches) {
    const isCritical = 'isCritical' in match.requirement && match.requirement.isCritical

    if (isCritical && match.status === 'PARTIAL_MATCH') {
      // Near-miss: score 0.75-0.90 (1 grade below or level mismatch)
      if (match.score >= 0.75) {
        return 'near_miss'
      }
      // Large miss: score below 0.75
      if (match.score < 0.75 && match.score > 0) {
        return 'large_miss'
      }
    }
  }
  return null
}

/**
 * Calculate non-academic score floor from location and field preferences
 */
function calculateNonAcademicFloor(
  locationScore: number,
  fieldScore: number,
  weights: WeightConfig
): number {
  // Minimum contribution from non-academic factors (80% of their weight)
  const minLocationContribution = weights.location * locationScore * 0.8
  const minFieldContribution = weights.field * fieldScore * 0.8
  return minLocationContribution + minFieldContribution
}

// ============================================
// Constants Export
// ============================================

export const UNIFIED_PENALTY_CONSTANTS = {
  MAX_PENALTY_REDUCTION,
  SCORE_FLOOR,
  POINTS_SHORTFALL_RATE,
  MISSING_REQ_RATE,
  LOW_REQ_RATE,
  CAP_CRITICAL_MISSING,
  CAP_CRITICAL_LARGE_MISS,
  CAP_CRITICAL_NEAR_MISS,
  CAP_NON_CRITICAL_MISSING,
  CAP_POINTS_UNMET,
  CAP_ANY_UNMET
} as const
