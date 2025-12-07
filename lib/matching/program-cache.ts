/**
 * Program Data Cache
 *
 * Caches all program data in Redis to avoid fetching from DB on every request.
 * Programs rarely change, so 1 hour TTL is safe.
 *
 * Performance Impact:
 * - Before: ~300-500ms DB query for 2,500 programs
 * - After: ~10-20ms Redis fetch
 */

import { redis } from '@/lib/redis/client'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

// Cache configuration
const PROGRAMS_CACHE_KEY = 'programs:all:v1'
const PROGRAMS_CACHE_TTL = 3600 // 1 hour in seconds

// Type for cached program data (includes all relations needed for matching)
export type CachedProgram = Awaited<ReturnType<typeof fetchProgramsFromDB>>[number]

/**
 * Fetch programs from database with all required relations
 */
async function fetchProgramsFromDB() {
  return prisma.academicProgram.findMany({
    include: {
      university: {
        include: {
          country: true
        }
      },
      fieldOfStudy: true,
      courseRequirements: {
        include: {
          ibCourse: true
        }
      }
    }
  })
}

/**
 * Get all programs with caching
 *
 * First checks Redis cache, falls back to DB if not found.
 * Automatically caches results for 1 hour.
 *
 * @returns Array of programs with all relations
 */
export async function getCachedPrograms(): Promise<CachedProgram[]> {
  try {
    // Try to get from Redis cache
    const cached = await redis.get<CachedProgram[]>(PROGRAMS_CACHE_KEY)

    if (cached) {
      logger.debug('Programs cache hit', { count: cached.length })
      return cached
    }

    logger.info('Programs cache miss, fetching from DB')

    // Fetch from database
    const programs = await fetchProgramsFromDB()

    // Cache the results
    await redis.set(PROGRAMS_CACHE_KEY, programs, { ex: PROGRAMS_CACHE_TTL })

    logger.info('Programs cached', { count: programs.length, ttl: PROGRAMS_CACHE_TTL })

    return programs
  } catch (error) {
    // If Redis fails, fall back to direct DB query
    logger.error('Programs cache error, falling back to DB', { error })
    return fetchProgramsFromDB()
  }
}

/**
 * Invalidate programs cache
 *
 * Call this when programs are added, updated, or deleted.
 */
export async function invalidateProgramsCache(): Promise<void> {
  try {
    await redis.del(PROGRAMS_CACHE_KEY)
    logger.info('Programs cache invalidated')
  } catch (error) {
    logger.error('Failed to invalidate programs cache', { error })
  }
}

/**
 * Warm the programs cache
 *
 * Pre-loads programs into cache. Can be called on app startup
 * or after cache invalidation to avoid cold start.
 */
export async function warmProgramsCache(): Promise<void> {
  try {
    const programs = await fetchProgramsFromDB()
    await redis.set(PROGRAMS_CACHE_KEY, programs, { ex: PROGRAMS_CACHE_TTL })
    logger.info('Programs cache warmed', { count: programs.length })
  } catch (error) {
    logger.error('Failed to warm programs cache', { error })
  }
}
