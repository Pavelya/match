/**
 * Feature Flags Index
 *
 * Re-exports all feature flag functionality for easy import.
 */

// Matching V10 Feature Flags
export {
  isFeatureEnabled,
  isAnyV10FeatureEnabled,
  getEnabledV10Features,
  getFlagConfig,
  getAllFlagConfigs,
  useFitQualityScore,
  useSelectivityBoost,
  useAntiGaming,
  useConfidenceScoring,
  useCategorization,
  usePerformanceOptimizations,
  MATCHING_V10_FLAGS,
  type MatchingV10Flag,
  type FeatureFlagConfig,
  type FeatureFlagContext
} from './matching-v10'
