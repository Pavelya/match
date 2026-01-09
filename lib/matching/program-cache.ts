/**
 * Program Data Cache
 *
 * Caches all program data in Redis to avoid fetching from DB on every request.
 * Programs rarely change, so 1 hour TTL is safe.
 *
 * OPTIMIZED in v2:
 * - Strips unnecessary fields (descriptions, timestamps, logos) to reduce payload
 * - Reduces cache size from ~15MB to ~0.3MB for 267 programs
 * - Supports ~8,000 programs within Upstash's 10MB request limit
 *
 * Performance Impact:
 * - Before: ~300-500ms DB query for 2,500 programs
 * - After: ~10-20ms Redis fetch
 */

import { redis } from '@/lib/redis/client'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

// Cache configuration - v2 uses optimized data structure
const PROGRAMS_CACHE_KEY = 'programs:all:v2'
const PROGRAMS_CACHE_TTL = 3600 // 1 hour in seconds

/**
 * Optimized program data for caching
 * Contains only fields needed for matching algorithm and display in match results
 */
export interface CachedProgram {
  id: string
  name: string
  universityId: string
  university: {
    id: string
    name: string
    abbreviatedName: string | null
    image: string | null
    city: string
    country: {
      id: string
      name: string
      code: string
      flagEmoji: string
    }
  }
  fieldOfStudyId: string
  fieldOfStudy: {
    id: string
    name: string
    iconName: string | null
    description: string | null
  }
  degreeType: string
  duration: string
  minIBPoints: number | null
  programUrl: string | null
  courseRequirements: Array<{
    id: string
    ibCourse: {
      id: string
      name: string
      code: string
      group: number
    }
    requiredLevel: string
    minGrade: number
    isCritical: boolean
    orGroupId: string | null
  }>
}

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
 * Transform full program data to optimized cache format
 * Strips: descriptions, logos, timestamps, contact info
 */
function optimizeForCache(
  programs: Awaited<ReturnType<typeof fetchProgramsFromDB>>
): CachedProgram[] {
  return programs.map((p) => ({
    id: p.id,
    name: p.name,
    universityId: p.universityId,
    university: {
      id: p.university.id,
      name: p.university.name,
      abbreviatedName: p.university.abbreviatedName,
      image: p.university.image,
      city: p.university.city,
      country: {
        id: p.university.country.id,
        name: p.university.country.name,
        code: p.university.country.code,
        flagEmoji: p.university.country.flagEmoji
      }
    },
    fieldOfStudyId: p.fieldOfStudyId,
    fieldOfStudy: {
      id: p.fieldOfStudy.id,
      name: p.fieldOfStudy.name,
      iconName: p.fieldOfStudy.iconName,
      description: p.fieldOfStudy.description
    },
    degreeType: p.degreeType,
    duration: p.duration,
    minIBPoints: p.minIBPoints,
    programUrl: p.programUrl,
    courseRequirements: p.courseRequirements.map((cr) => ({
      id: cr.id,
      ibCourse: {
        id: cr.ibCourse.id,
        name: cr.ibCourse.name,
        code: cr.ibCourse.code,
        group: cr.ibCourse.group
      },
      requiredLevel: cr.requiredLevel,
      minGrade: cr.minGrade,
      isCritical: cr.isCritical,
      orGroupId: cr.orGroupId
    }))
  }))
}

/**
 * Get all programs with caching
 *
 * First checks Redis cache, falls back to DB if not found.
 * Automatically caches optimized results for 1 hour.
 *
 * @returns Array of programs with essential relations for matching
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

    // Optimize for cache (strip unnecessary fields)
    const optimized = optimizeForCache(programs)

    // Log size for monitoring
    const sizeKB = (JSON.stringify(optimized).length / 1024).toFixed(2)
    logger.info('Caching optimized programs', {
      count: optimized.length,
      sizeKB,
      ttl: PROGRAMS_CACHE_TTL
    })

    // Cache the optimized results
    await redis.set(PROGRAMS_CACHE_KEY, optimized, { ex: PROGRAMS_CACHE_TTL })

    logger.info('Programs cached successfully', { count: optimized.length })

    return optimized
  } catch (error) {
    // If Redis fails, fall back to direct DB query (still optimized)
    logger.error('Programs cache error, falling back to DB', { error })
    const programs = await fetchProgramsFromDB()
    return optimizeForCache(programs)
  }
}

/**
 * Invalidate programs cache
 *
 * Call this when programs are added, updated, or deleted.
 */
export async function invalidateProgramsCache(): Promise<void> {
  try {
    // Delete both v1 (legacy) and v2 (current) keys
    await redis.del(PROGRAMS_CACHE_KEY)
    await redis.del('programs:all:v1') // Clean up legacy key
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
    const optimized = optimizeForCache(programs)
    await redis.set(PROGRAMS_CACHE_KEY, optimized, { ex: PROGRAMS_CACHE_TTL })
    logger.info('Programs cache warmed', { count: optimized.length })
  } catch (error) {
    logger.error('Failed to warm programs cache', { error })
  }
}
