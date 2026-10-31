/**
 * Matching Algorithm Cache Layer
 *
 * Provides Redis-backed caching for matching results to improve performance
 * and reduce redundant calculations.
 *
 * Cache Strategy:
 * - TTL: 30 minutes (1800 seconds)
 * - Key: matchesV10:{studentId}:{weightsHash}:{programCount}
 *
 * One list per student: Matches and the coordinator pages read the same key (MAINT 5.44).
 *
 * Note: V10 cache works correctly with tiered fallback filtering (see optimized-matcher.ts).
 * The fallback tier is NOT included in the cache key - we cache final results regardless
 * of which relaxation tier was used to gather candidates. This is the correct design since
 * the same student+programs should always get the same cached results.
 */

import { redis } from '@/lib/redis/client'
import { calculateMatches } from './scorer'
import { calculateOptimizedMatches } from './optimized-matcher'
import { enhanceMatchResult } from './enhanced-match-result'
import { createMatchingMetrics, recordMatchingMetrics } from './matching-metrics'
import type { MatchInput, MatchResult, WeightConfig } from './types'
import type { MatchCategory } from './categorization'
import { logger } from '@/lib/logger'
import { isFeatureEnabled, getEnabledV10Features } from '@/lib/feature-flags'

// Cache TTL in seconds (30 minutes)
const CACHE_TTL = 1800

/**
 * Most matches the student matches API returns, best first. The V10 candidate
 * filter can leave several hundred (63 at the median in October 2026), and each
 * match is about 3 KB of JSON.
 */
export const MAX_MATCHES_RETURNED = 50

/**
 * Scan for keys matching a pattern using SCAN (non-blocking)
 * Unlike KEYS, SCAN doesn't block Redis while iterating
 */
async function scanKeys(pattern: string): Promise<string[]> {
  const allKeys: string[] = []
  let cursor = 0
  do {
    const result = await redis.scan(cursor, { match: pattern, count: 100 })
    cursor = Number(result[0])
    allKeys.push(...result[1])
  } while (cursor !== 0)
  return allKeys
}

/**
 * Generate a hash for weight configuration
 * This ensures different weight configurations get different cache entries
 */
function hashWeights(weights: WeightConfig): string {
  return `${weights.academic.toFixed(2)}_${weights.location.toFixed(2)}_${weights.field.toFixed(2)}`
}

/**
 * Invalidate cache for a specific student
 * Call this when student profile is updated
 *
 * @param studentId - Student's user ID
 */
export async function invalidateStudentCache(studentId: string): Promise<void> {
  try {
    // Find all keys for this student using SCAN (non-blocking)
    const keys = await scanKeys(`matchesV10:${studentId}:*`)

    if (keys.length > 0) {
      await redis.del(...keys)
      logger.info('Student cache invalidated', { studentId, deletedKeys: keys.length })
    }
  } catch (error) {
    logger.error('Failed to invalidate student cache', { error, studentId })
  }
}

/**
 * Clear all matching cache
 * Use sparingly, only for admin operations
 */
export async function clearAllMatchCache(): Promise<void> {
  try {
    const keys = await scanKeys('matchesV10:*')

    if (keys.length > 0) {
      await redis.del(...keys)
      logger.info('All match cache cleared', { deletedKeys: keys.length })
    }
  } catch (error) {
    logger.error('Failed to clear match cache', { error })
  }
}

// ============================================
// V10 Matching with Feature Flags
// ============================================

/**
 * Generate cache key for V10 batch matches
 */
function getV10BatchCacheKey(
  studentId: string,
  weights: WeightConfig,
  programCount: number
): string {
  const weightsHash = hashWeights(weights)
  return `matchesV10:${studentId}:${weightsHash}:${programCount}`
}

/**
 * V10 Match Result with enhanced fields
 */
export interface V10MatchResult extends MatchResult {
  category: MatchCategory
  categoryInfo: {
    label: string
    description: string
    confidenceIndicator: 'high' | 'medium' | 'low'
  }
  confidence: {
    score: number
    level: 'high' | 'medium' | 'low'
    factors: Array<{ type: string; description: string }>
  }
  fitQuality: {
    pointsFitScore: number
    pointsFitCategory: string
    selectivityBoost: number
    selectivityTier: 1 | 2 | 3 | 4
    tierName: string
  }
}

/**
 * Get cached V10 match results or calculate with V10 features
 *
 * This is the main entry point for V10 matching. It:
 * 1. Checks if V10 is enabled via feature flags
 * 2. Uses optimized matching with performance features
 * 3. Enhances results with V10 fields (category, confidence, fitQuality)
 * 4. Records metrics for monitoring
 *
 * @param studentId - Student's user ID
 * @param student - Student profile
 * @param programs - Array of programs to match
 * @param mode - Matching mode
 * @param weights - Custom weights
 * @returns Sorted array of V10 enhanced match results
 */
export async function getCachedMatchesV10(
  studentId: string,
  student: MatchInput['student'],
  programs: MatchInput['program'][],
  mode?: MatchInput['mode'],
  weights?: MatchInput['weights']
): Promise<V10MatchResult[]> {
  const startTime = performance.now()
  const weightsUsed = weights || { academic: 0.6, location: 0.3, field: 0.1 }
  const context = { userId: studentId }

  // Check if V10 is enabled
  const v10Enabled = isFeatureEnabled('MATCHING_V10_FULL', context)
  const enabledFeatures = getEnabledV10Features(context)

  // Use V10-specific cache key
  const cacheKey = getV10BatchCacheKey(studentId, weightsUsed, programs.length)

  try {
    // Try to get from cache
    const cached = await redis.get<V10MatchResult[]>(cacheKey)

    if (cached) {
      logger.debug('V10 matches cache hit', { cacheKey, hit: true, count: cached.length })

      // Record metrics for cached result
      const metrics = createMatchingMetrics({
        latencyMs: performance.now() - startTime,
        totalPrograms: programs.length,
        candidatesEvaluated: cached.length,
        resultsReturned: Math.min(MAX_MATCHES_RETURNED, cached.length),
        categoryDistribution: countCategories(cached),
        studentPoints: student.totalIBPoints,
        algorithmVersion: 'v10',
        v10FeaturesEnabled: enabledFeatures
      })
      recordMatchingMetrics(metrics)

      return cached
    }

    logger.debug('V10 matches cache miss', {
      cacheKey,
      hit: false,
      programCount: programs.length,
      v10Enabled
    })

    // Calculate with V10 optimizations
    let results: V10MatchResult[]

    if (v10Enabled) {
      // Use optimized V10 matching
      const optimizedResult = calculateOptimizedMatches(
        student,
        programs,
        {
          useIndex: true,
          useCache: true,
          pointsMargin: 10
        },
        mode,
        weights
      )

      // Create programs map for enhancement
      const programsMap = new Map(programs.map((p) => [p.programId, p]))

      // Enhance each result with V10 fields
      results = optimizedResult.results.map((result) => {
        const program = programsMap.get(result.programId)
        if (!program) return result as V10MatchResult

        const enhanced = enhanceMatchResult(result, student, program, {
          gradesAreFinal: true,
          hasCompleteProfile: true,
          includeCategory: true,
          includeConfidence: true,
          includeFitQuality: true
        })

        return enhanced as V10MatchResult
      })

      // Record V10 metrics
      const metrics = createMatchingMetrics({
        latencyMs: performance.now() - startTime,
        filterTimeMs: optimizedResult.stats.filterTimeMs,
        matchTimeMs: optimizedResult.stats.matchTimeMs,
        totalPrograms: optimizedResult.stats.totalPrograms,
        candidatesEvaluated: optimizedResult.stats.candidatesAfterFilter,
        resultsReturned: Math.min(MAX_MATCHES_RETURNED, results.length),
        categoryDistribution: countCategories(results),
        studentPoints: student.totalIBPoints,
        cacheHits: optimizedResult.stats.cacheStats?.hits,
        cacheMisses: optimizedResult.stats.cacheStats?.misses,
        algorithmVersion: 'v10',
        v10FeaturesEnabled: enabledFeatures,
        fallbackTierUsed: optimizedResult.stats.fallbackTierUsed
      })
      recordMatchingMetrics(metrics)

      // Log with fallback tier info (warn if tier > 1 to monitor filter relaxation usage)
      const logLevel =
        optimizedResult.stats.fallbackTierUsed && optimizedResult.stats.fallbackTierUsed > 1
          ? 'warn'
          : 'info'
      logger[logLevel]('V10 matching completed', {
        studentId,
        latencyMs: metrics.latencyMs,
        candidatesEvaluated: metrics.candidatesEvaluated,
        reductionRatio: metrics.reductionRatio.toFixed(2),
        cacheHitRate: metrics.cacheHitRate?.toFixed(2),
        fallbackTierUsed: optimizedResult.stats.fallbackTierUsed ?? 1
      })
    } else {
      // Fall back to V9 matching but still add V10 enhancements
      const v9Results = calculateMatches(student, programs, mode, weights)
      const programsMap = new Map(programs.map((p) => [p.programId, p]))

      results = v9Results.map((result) => {
        const program = programsMap.get(result.programId)
        if (!program) return result as V10MatchResult

        return enhanceMatchResult(result, student, program, {
          gradesAreFinal: true,
          hasCompleteProfile: true,
          includeCategory: true,
          includeConfidence: true,
          includeFitQuality: true
        }) as V10MatchResult
      })

      // Record V9 metrics (with V10 enhancement)
      const metrics = createMatchingMetrics({
        latencyMs: performance.now() - startTime,
        totalPrograms: programs.length,
        candidatesEvaluated: programs.length,
        resultsReturned: Math.min(MAX_MATCHES_RETURNED, results.length),
        categoryDistribution: countCategories(results),
        studentPoints: student.totalIBPoints,
        algorithmVersion: 'v9',
        v10FeaturesEnabled: []
      })
      recordMatchingMetrics(metrics)
    }

    // Cache the V10 results
    await redis.set(cacheKey, results, { ex: CACHE_TTL })

    return results
  } catch (error) {
    // If Redis fails, fall back to direct calculation
    logger.error('V10 cache error, falling back to direct calculation', { error, cacheKey })

    const v9Results = calculateMatches(student, programs, mode, weights)
    const programsMap = new Map(programs.map((p) => [p.programId, p]))

    return v9Results.map((result) => {
      const program = programsMap.get(result.programId)
      if (!program) return result as V10MatchResult

      return enhanceMatchResult(result, student, program) as V10MatchResult
    })
  }
}

/**
 * Count category distribution for metrics
 */
function countCategories(results: V10MatchResult[]): Record<MatchCategory, number> {
  const counts: Record<MatchCategory, number> = { SAFETY: 0, MATCH: 0, REACH: 0, UNLIKELY: 0 }
  for (const r of results) {
    if (r.category && counts[r.category] !== undefined) {
      counts[r.category]++
    }
  }
  return counts
}
