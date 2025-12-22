/**
 * Program Selectivity Module
 *
 * NEW in Matching Algorithm V10
 *
 * Programs are classified into selectivity tiers based on their minimum
 * IB points requirement. High-achieving students (38+ points) receive
 * a small boost when matched with appropriately challenging programs.
 *
 * This incentivizes high achievers to apply to selective programs
 * rather than "settling" for less competitive options.
 *
 * Selectivity Tiers:
 * - Tier 1 (40+ points): Highly Selective
 * - Tier 2 (36-39 points): Selective
 * - Tier 3 (32-35 points): Moderately Selective
 * - Tier 4 (<32 points): Standard
 *
 * Based on: DOC_2_matching-algo X.md
 */

// Selectivity tier type
export type SelectivityTier = 1 | 2 | 3 | 4

// High achiever threshold (students with 38+ points get boosts)
const HIGH_ACHIEVER_THRESHOLD = 38

// Tier boost amounts for high-achieving students
const TIER_BOOSTS: Record<SelectivityTier, number> = {
  1: 0.05, // +5% for Highly Selective
  2: 0.03, // +3% for Selective
  3: 0.01, // +1% for Moderately Selective
  4: 0.0 // No boost for Standard
}

// Points thresholds for tier classification
const TIER_THRESHOLDS = {
  TIER_1_MIN: 40, // Highly Selective
  TIER_2_MIN: 36, // Selective
  TIER_3_MIN: 32 // Moderately Selective
  // Below 32 = Tier 4 (Standard)
}

/**
 * Calculate the selectivity tier for a program based on its minimum IB points requirement
 *
 * @param requiredPoints - Program's minimum IB points requirement
 * @returns Selectivity tier (1 = most selective, 4 = standard)
 *
 * @example
 * calculateSelectivityTier(42) // returns 1 (Highly Selective)
 * calculateSelectivityTier(38) // returns 2 (Selective)
 * calculateSelectivityTier(34) // returns 3 (Moderately Selective)
 * calculateSelectivityTier(28) // returns 4 (Standard)
 */
export function calculateSelectivityTier(
  requiredPoints: number | null | undefined
): SelectivityTier {
  // Handle null/undefined - treat as Standard tier
  if (requiredPoints == null) {
    return 4
  }

  if (requiredPoints >= TIER_THRESHOLDS.TIER_1_MIN) return 1
  if (requiredPoints >= TIER_THRESHOLDS.TIER_2_MIN) return 2
  if (requiredPoints >= TIER_THRESHOLDS.TIER_3_MIN) return 3
  return 4
}

/**
 * Get the human-readable name for a selectivity tier
 *
 * @param tier - Selectivity tier (1-4)
 * @returns Human-readable tier name
 */
export function getSelectivityTierName(tier: SelectivityTier): string {
  switch (tier) {
    case 1:
      return 'Highly Selective'
    case 2:
      return 'Selective'
    case 3:
      return 'Moderately Selective'
    case 4:
      return 'Standard'
  }
}

/**
 * Check if a student qualifies as a high achiever
 *
 * @param studentPoints - Student's total IB points
 * @returns True if student qualifies for selectivity boost
 */
export function isHighAchiever(studentPoints: number): boolean {
  return studentPoints >= HIGH_ACHIEVER_THRESHOLD
}

/**
 * Apply selectivity boost for high-achieving students
 *
 * High-achieving students (38+ points) receive a small boost when matched
 * with appropriately challenging programs. This incentivizes them to aim
 * for selective programs rather than settling for safer options.
 *
 * @param baseScore - The base match score before boost (0-1)
 * @param studentPoints - Student's total IB points
 * @param programTier - Program's selectivity tier (1-4)
 * @returns Boosted score, capped at 1.0
 *
 * @example
 * // High achiever with Tier 1 program
 * applySelectivityBoost(0.85, 42, 1) // returns 0.90 (+0.05 boost)
 *
 * // High achiever with Tier 4 program
 * applySelectivityBoost(0.85, 42, 4) // returns 0.85 (no boost)
 *
 * // Average student (no boost regardless of tier)
 * applySelectivityBoost(0.85, 35, 1) // returns 0.85
 */
export function applySelectivityBoost(
  baseScore: number,
  studentPoints: number,
  programTier: SelectivityTier
): number {
  // Only high achievers get the boost
  if (!isHighAchiever(studentPoints)) {
    return baseScore
  }

  const boost = TIER_BOOSTS[programTier]
  return Math.min(1.0, baseScore + boost)
}

/**
 * Get the boost amount for a given tier
 *
 * @param tier - Selectivity tier (1-4)
 * @returns Boost amount (0.00 - 0.05)
 */
export function getBoostAmount(tier: SelectivityTier): number {
  return TIER_BOOSTS[tier]
}

// Export constants for testing and configuration
export const SELECTIVITY_CONSTANTS = {
  HIGH_ACHIEVER_THRESHOLD,
  TIER_BOOSTS,
  TIER_THRESHOLDS
} as const
