/**
 * Matching Algorithm Cache Layer
 *
 * Provides Redis-backed caching for matching results to improve performance
 * and reduce redundant calculations.
 *
 * Cache Strategy:
 * - TTL: 5 minutes (300 seconds)
 * - Key Format: match:{studentId}:{programId}:{weightsHash}
 * - Batch Key: matches:{studentId}:{weightsHash}
 */

import { redis } from '@/lib/redis/client'
import { calculateMatch, calculateMatches } from './scorer'
import type { MatchInput, MatchResult, WeightConfig } from './types'
import { logger } from '@/lib/logger'

// Cache TTL in seconds (5 minutes)
const CACHE_TTL = 300

/**
 * Generate a hash for weight configuration
 * This ensures different weight configurations get different cache entries
 */
function hashWeights(weights: WeightConfig): string {
  return `${weights.academic.toFixed(2)}_${weights.location.toFixed(2)}_${weights.field.toFixed(2)}`
}

/**
 * Generate cache key for a single match
 */
function getCacheKey(studentId: string, programId: string, weights: WeightConfig): string {
  const weightsHash = hashWeights(weights)
  return `match:${studentId}:${programId}:${weightsHash}`
}

/**
 * Generate cache key for batch matches
 */
function getBatchCacheKey(studentId: string, weights: WeightConfig): string {
  const weightsHash = hashWeights(weights)
  return `matches:${studentId}:${weightsHash}`
}

/**
 * Get cached match result or calculate and cache if not found
 *
 * @param studentId - Student's user ID
 * @param input - Match input
 * @returns Match result (from cache or freshly calculated)
 */
export async function getCachedMatch(studentId: string, input: MatchInput): Promise<MatchResult> {
  const weightsUsed = input.weights || { academic: 0.6, location: 0.3, field: 0.1 } // Default

  const cacheKey = getCacheKey(studentId, input.program.programId, weightsUsed)

  try {
    // Try to get from cache
    const cached = await redis.get<MatchResult>(cacheKey)

    if (cached) {
      logger.debug('Match cache hit', { cacheKey, hit: true })
      return cached
    }

    logger.debug('Match cache miss', { cacheKey, hit: false })

    // Calculate fresh result
    const result = calculateMatch(input)

    // Cache the result
    await redis.set(cacheKey, result, { ex: CACHE_TTL })

    return result
  } catch (error) {
    // If Redis fails, fall back to direct calculation
    logger.error('Redis cache error, falling back to direct calculation', { error, cacheKey })
    return calculateMatch(input)
  }
}

/**
 * Get cached batch match results or calculate and cache if not found
 *
 * @param studentId - Student's user ID
 * @param student - Student profile
 * @param programs - Array of programs to match
 * @param mode - Matching mode
 * @param weights - Custom weights
 * @returns Sorted array of match results
 */
export async function getCachedMatches(
  studentId: string,
  student: MatchInput['student'],
  programs: MatchInput['program'][],
  mode?: MatchInput['mode'],
  weights?: MatchInput['weights']
): Promise<MatchResult[]> {
  const weightsUsed = weights || { academic: 0.6, location: 0.3, field: 0.1 } // Default

  const cacheKey = getBatchCacheKey(studentId, weightsUsed)

  try {
    // Try to get from cache
    const cached = await redis.get<MatchResult[]>(cacheKey)

    if (cached) {
      logger.debug('Batch matches cache hit', { cacheKey, hit: true, count: cached.length })
      return cached
    }

    logger.debug('Batch matches cache miss', {
      cacheKey,
      hit: false,
      programCount: programs.length
    })

    // Calculate fresh results
    const results = calculateMatches(student, programs, mode, weights)

    // Cache the results
    await redis.set(cacheKey, results, { ex: CACHE_TTL })

    return results
  } catch (error) {
    // If Redis fails, fall back to direct calculation
    logger.error('Redis batch cache error, falling back to direct calculation', { error, cacheKey })
    return calculateMatches(student, programs, mode, weights)
  }
}

/**
 * Invalidate cache for a specific student
 * Call this when student profile is updated
 *
 * @param studentId - Student's user ID
 */
export async function invalidateStudentCache(studentId: string): Promise<void> {
  try {
    // Find all keys for this student
    const pattern = `match:${studentId}:*`
    const batchPattern = `matches:${studentId}:*`

    // Note: In production with many keys, consider using SCAN instead of KEYS
    const matchKeys = await redis.keys(pattern)
    const batchKeys = await redis.keys(batchPattern)

    const allKeys = [...matchKeys, ...batchKeys]

    if (allKeys.length > 0) {
      await redis.del(...allKeys)
      logger.info('Student cache invalidated', { studentId, deletedKeys: allKeys.length })
    }
  } catch (error) {
    logger.error('Failed to invalidate student cache', { error, studentId })
  }
}

/**
 * Invalidate cache for a specific program
 * Call this when program requirements are updated
 *
 * @param programId - Program ID
 */
export async function invalidateProgramCache(programId: string): Promise<void> {
  try {
    // Find all keys for this program
    const pattern = `match:*:${programId}:*`

    // Note: In production with many keys, consider using SCAN instead of KEYS
    const keys = await redis.keys(pattern)

    if (keys.length > 0) {
      await redis.del(...keys)
      logger.info('Program cache invalidated', { programId, deletedKeys: keys.length })
    }
  } catch (error) {
    logger.error('Failed to invalidate program cache', { error, programId })
  }
}

/**
 * Clear all matching cache
 * Use sparingly, only for admin operations
 */
export async function clearAllMatchCache(): Promise<void> {
  try {
    const matchKeys = await redis.keys('match:*')
    const batchKeys = await redis.keys('matches:*')

    const allKeys = [...matchKeys, ...batchKeys]

    if (allKeys.length > 0) {
      await redis.del(...allKeys)
      logger.info('All match cache cleared', { deletedKeys: allKeys.length })
    }
  } catch (error) {
    logger.error('Failed to clear match cache', { error })
  }
}

/**
 * Get cache statistics
 * Useful for monitoring and debugging
 */
export async function getCacheStats(): Promise<{
  matchKeys: number
  batchKeys: number
  totalKeys: number
}> {
  try {
    const matchKeys = await redis.keys('match:*')
    const batchKeys = await redis.keys('matches:*')

    return {
      matchKeys: matchKeys.length,
      batchKeys: batchKeys.length,
      totalKeys: matchKeys.length + batchKeys.length
    }
  } catch (error) {
    logger.error('Failed to get cache stats', { error })
    return { matchKeys: 0, batchKeys: 0, totalKeys: 0 }
  }
}
