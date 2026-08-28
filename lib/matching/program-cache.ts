/**
 * Program Data Cache
 *
 * Caches all program data in Redis to avoid fetching from DB on every request.
 * Programs rarely change, so 1 hour TTL is safe.
 *
 * OPTIMIZED in v2:
 * - Strips unnecessary fields (descriptions, timestamps, logos) to reduce payload
 * - Supports several thousand programs within Upstash's 10MB request limit
 *
 * The university object is embedded in every program, so any large value on it
 * is multiplied by that university's program count. One 537KB inline base64
 * image on a university with 68 programs produced a 39.7MB payload and silently
 * broke this cache entirely. Inline images are therefore dropped here, and the
 * payload size is checked before every write.
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

// Upstash rejects any request larger than 10MB. Checked before writing so an
// oversized payload is reported as a named cause rather than an opaque error.
const UPSTASH_MAX_REQUEST_BYTES = 10 * 1024 * 1024

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
 * Inline base64 images must never enter the cache.
 *
 * The value is duplicated once per program, so a single large one can exceed
 * Upstash's request limit on its own. Program cards already fall back to a
 * placeholder when the image is null, so dropping it degrades gracefully.
 * Universities should store a storage URL instead - see
 * scripts/fix-university-images.ts.
 */
function cacheableImage(
  university: { name: string; image: string | null },
  offenders: Map<string, number>
): string | null {
  const { image } = university
  if (!image) return null
  if (image.startsWith('data:')) {
    offenders.set(university.name, image.length)
    return null
  }
  return image
}

/**
 * Write the cache, refusing payloads Upstash would reject.
 */
async function writeProgramsCache(programs: CachedProgram[]): Promise<boolean> {
  const bytes = JSON.stringify(programs).length

  if (bytes > UPSTASH_MAX_REQUEST_BYTES) {
    logger.error('Programs cache payload too large to store; serving from DB instead', {
      bytes,
      limit: UPSTASH_MAX_REQUEST_BYTES,
      count: programs.length
    })
    return false
  }

  await redis.set(PROGRAMS_CACHE_KEY, programs, { ex: PROGRAMS_CACHE_TTL })
  logger.info('Programs cached', { count: programs.length, sizeKB: (bytes / 1024).toFixed(2) })
  return true
}

/**
 * Transform full program data to optimized cache format
 * Strips: descriptions, logos, timestamps, contact info
 */
function optimizeForCache(
  programs: Awaited<ReturnType<typeof fetchProgramsFromDB>>
): CachedProgram[] {
  const offenders = new Map<string, number>()

  const optimized = programs.map((p) => ({
    id: p.id,
    name: p.name,
    universityId: p.universityId,
    university: {
      id: p.university.id,
      name: p.university.name,
      abbreviatedName: p.university.abbreviatedName,
      image: cacheableImage(p.university, offenders),
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

  if (offenders.size > 0) {
    logger.warn('Dropped inline base64 university images from the programs cache', {
      universities: Array.from(offenders, ([name, bytes]) => `${name} (${bytes} bytes)`),
      hint: 'Run scripts/fix-university-images.ts to move these to Supabase Storage'
    })
  }

  return optimized
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

    await writeProgramsCache(optimized)

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
    await writeProgramsCache(optimized)
  } catch (error) {
    logger.error('Failed to warm programs cache', { error })
  }
}
