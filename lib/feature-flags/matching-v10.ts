/**
 * Matching V10 Feature Flags
 *
 * Feature flag system for gradual V10 algorithm rollout.
 * Supports:
 * - Environment variable configuration
 * - Per-feature toggles
 * - Percentage-based rollout (A/B testing)
 * - User-consistent hashing for stable assignment
 *
 * Based on: DOC_2_matching-algo X.md - Feature Flags
 */

// ============================================
// Types
// ============================================

export type MatchingV10Flag =
  | 'MATCHING_V10_FIT_QUALITY'
  | 'MATCHING_V10_SELECTIVITY'
  | 'MATCHING_V10_ANTI_GAMING'
  | 'MATCHING_V10_CONFIDENCE'
  | 'MATCHING_V10_CATEGORIZATION'
  | 'MATCHING_V10_PERFORMANCE'
  | 'MATCHING_V10_FULL'

export interface FeatureFlagConfig {
  /** Is the feature enabled */
  enabled: boolean
  /** Rollout percentage (0-100), only applies if enabled */
  rolloutPercentage: number
  /** Feature description */
  description: string
}

export interface FeatureFlagContext {
  /** User ID for consistent hashing */
  userId?: string
  /** Student ID for student-specific features */
  studentId?: string
  /** Force enable (for testing) */
  forceEnable?: boolean
  /** Force disable (for testing) */
  forceDisable?: boolean
}

// ============================================
// Default Configuration
// ============================================

const DEFAULT_FLAGS: Record<MatchingV10Flag, FeatureFlagConfig> = {
  MATCHING_V10_FIT_QUALITY: {
    enabled: false,
    rolloutPercentage: 0,
    description: 'Enable Fit Quality Score (FQS) calculation for optimal points matching'
  },
  MATCHING_V10_SELECTIVITY: {
    enabled: false,
    rolloutPercentage: 0,
    description: 'Enable selectivity boost for high-achieving students'
  },
  MATCHING_V10_ANTI_GAMING: {
    enabled: false,
    rolloutPercentage: 0,
    description: 'Enable anti-gaming measures (diminishing returns, caps)'
  },
  MATCHING_V10_CONFIDENCE: {
    enabled: false,
    rolloutPercentage: 0,
    description: 'Enable confidence scoring based on data quality'
  },
  MATCHING_V10_CATEGORIZATION: {
    enabled: false,
    rolloutPercentage: 0,
    description: 'Enable match categorization (SAFETY/MATCH/REACH/UNLIKELY)'
  },
  MATCHING_V10_PERFORMANCE: {
    enabled: false,
    rolloutPercentage: 0,
    description: 'Enable performance optimizations (indexing, caching)'
  },
  MATCHING_V10_FULL: {
    enabled: false,
    rolloutPercentage: 0,
    description: 'Enable all V10 features (overrides individual flags)'
  }
}

// ============================================
// Environment Variable Parsing
// ============================================

/**
 * Get flag configuration from environment variables
 *
 * Environment variable format:
 * - MATCHING_V10_FIT_QUALITY=true|false
 * - MATCHING_V10_FIT_QUALITY_ROLLOUT=0-100 (percentage, defaults to 100 if not set)
 */
function getFlagFromEnv(flag: MatchingV10Flag): FeatureFlagConfig {
  const defaultConfig = DEFAULT_FLAGS[flag]
  const envKey = flag

  // Check if flag is enabled via env var
  const enabledValue = process.env[envKey]
  const enabled = enabledValue === 'true' || enabledValue === '1'

  // Check for rollout percentage
  // If enabled but no rollout percentage set, default to 100% (full rollout)
  const rolloutKey = `${flag}_ROLLOUT`
  const rolloutValue = process.env[rolloutKey]
  let rolloutPercentage: number

  if (rolloutValue !== undefined) {
    // Explicit rollout percentage set
    rolloutPercentage = parseInt(rolloutValue, 10)
    if (isNaN(rolloutPercentage)) rolloutPercentage = 100
  } else if (enabled) {
    // Enabled but no rollout set = 100% rollout
    rolloutPercentage = 100
  } else {
    // Not enabled = 0% rollout
    rolloutPercentage = 0
  }

  return {
    ...defaultConfig,
    enabled,
    rolloutPercentage: Math.min(100, Math.max(0, rolloutPercentage))
  }
}

// ============================================
// Flag Checking
// ============================================

/**
 * Check if a feature flag is enabled for the given context
 *
 * @param flag - Feature flag to check
 * @param context - Context for rollout evaluation
 * @returns Whether the feature is enabled
 *
 * @example
 * // Check if fit quality is enabled for a user
 * if (isFeatureEnabled('MATCHING_V10_FIT_QUALITY', { userId: 'user-123' })) {
 *   // Use V10 fit quality scoring
 * }
 */
export function isFeatureEnabled(flag: MatchingV10Flag, context: FeatureFlagContext = {}): boolean {
  // Context overrides
  if (context.forceDisable) return false
  if (context.forceEnable) return true

  // Check FULL flag first (overrides individual flags)
  if (flag !== 'MATCHING_V10_FULL') {
    const fullFlag = getFlagFromEnv('MATCHING_V10_FULL')
    if (fullFlag.enabled) {
      return isInRollout(fullFlag.rolloutPercentage, context)
    }
  }

  // Check specific flag
  const config = getFlagFromEnv(flag)
  if (!config.enabled) return false

  // Check rollout percentage
  return isInRollout(config.rolloutPercentage, context)
}

/**
 * Check if user is in rollout percentage
 */
function isInRollout(percentage: number, context: FeatureFlagContext): boolean {
  if (percentage >= 100) return true
  if (percentage <= 0) return false

  // Use consistent hashing for stable assignment
  const identifier = context.userId || context.studentId || 'default'
  const hash = simpleHash(identifier)
  const bucket = hash % 100

  return bucket < percentage
}

/**
 * Simple hash function for consistent user assignment
 */
function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

// ============================================
// Convenience Functions
// ============================================

/**
 * Check if any V10 feature is enabled
 */
export function isAnyV10FeatureEnabled(context: FeatureFlagContext = {}): boolean {
  const flags: MatchingV10Flag[] = [
    'MATCHING_V10_FULL',
    'MATCHING_V10_FIT_QUALITY',
    'MATCHING_V10_SELECTIVITY',
    'MATCHING_V10_ANTI_GAMING',
    'MATCHING_V10_CONFIDENCE',
    'MATCHING_V10_CATEGORIZATION',
    'MATCHING_V10_PERFORMANCE'
  ]

  return flags.some((flag) => isFeatureEnabled(flag, context))
}

/**
 * Get all enabled V10 features for a context
 */
export function getEnabledV10Features(context: FeatureFlagContext = {}): MatchingV10Flag[] {
  const allFlags: MatchingV10Flag[] = [
    'MATCHING_V10_FIT_QUALITY',
    'MATCHING_V10_SELECTIVITY',
    'MATCHING_V10_ANTI_GAMING',
    'MATCHING_V10_CONFIDENCE',
    'MATCHING_V10_CATEGORIZATION',
    'MATCHING_V10_PERFORMANCE'
  ]

  // If FULL is enabled, return all
  if (isFeatureEnabled('MATCHING_V10_FULL', context)) {
    return allFlags
  }

  return allFlags.filter((flag) => isFeatureEnabled(flag, context))
}

/**
 * Get flag configuration for debugging/logging
 */
export function getFlagConfig(flag: MatchingV10Flag): FeatureFlagConfig {
  return getFlagFromEnv(flag)
}

/**
 * Get all flag configurations
 */
export function getAllFlagConfigs(): Record<MatchingV10Flag, FeatureFlagConfig> {
  const result: Partial<Record<MatchingV10Flag, FeatureFlagConfig>> = {}
  for (const flag of Object.keys(DEFAULT_FLAGS) as MatchingV10Flag[]) {
    result[flag] = getFlagFromEnv(flag)
  }
  return result as Record<MatchingV10Flag, FeatureFlagConfig>
}

// ============================================
// Feature-Specific Helpers
// ============================================

/**
 * Check if Fit Quality Score should be used
 */
export function useFitQualityScore(context: FeatureFlagContext = {}): boolean {
  return isFeatureEnabled('MATCHING_V10_FIT_QUALITY', context)
}

/**
 * Check if Selectivity Boost should be used
 */
export function useSelectivityBoost(context: FeatureFlagContext = {}): boolean {
  return isFeatureEnabled('MATCHING_V10_SELECTIVITY', context)
}

/**
 * Check if Anti-Gaming measures should be used
 */
export function useAntiGaming(context: FeatureFlagContext = {}): boolean {
  return isFeatureEnabled('MATCHING_V10_ANTI_GAMING', context)
}

/**
 * Check if Confidence Scoring should be used
 */
export function useConfidenceScoring(context: FeatureFlagContext = {}): boolean {
  return isFeatureEnabled('MATCHING_V10_CONFIDENCE', context)
}

/**
 * Check if Match Categorization should be used
 */
export function useCategorization(context: FeatureFlagContext = {}): boolean {
  return isFeatureEnabled('MATCHING_V10_CATEGORIZATION', context)
}

/**
 * Check if Performance Optimizations should be used
 */
export function usePerformanceOptimizations(context: FeatureFlagContext = {}): boolean {
  return isFeatureEnabled('MATCHING_V10_PERFORMANCE', context)
}

// ============================================
// Export Constants
// ============================================

export const MATCHING_V10_FLAGS = Object.keys(DEFAULT_FLAGS) as MatchingV10Flag[]
