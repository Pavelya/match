/**
 * Program Data Cache
 *
 * Caches all program data in Redis to avoid fetching from DB on every request,
 * and keeps the parsed copy in each server instance's memory for a few minutes
 * so that a request does not download it from Redis either. Every write path
 * invalidates it explicitly, so the TTL is only a backstop.
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

// Cache configuration. v3 adds the entry year and the admit rates the new match cards show
// (rebranding 2.2); a deployment still on v2 keeps its own key, so neither reads the other's shape.
const PROGRAMS_CACHE_KEY = 'programs:all:v3'
const OLDER_CACHE_KEYS = ['programs:all:v2', 'programs:all:v1']
// Six hours, not one. Each refresh re-reads every program from Postgres, which
// is billed egress on Supabase; at hourly that is 24 full reads a day for data
// that changes a few times a week. All four write paths - create, update,
// delete, bulk and copy - invalidate explicitly, so this only bounds how long a
// missed invalidation could go unnoticed.
const PROGRAMS_CACHE_TTL = 6 * 60 * 60

// Upstash rejects any request larger than 10MB. Checked before writing so an
// oversized payload is reported as a named cause rather than an opaque error.
const UPSTASH_MAX_REQUEST_BYTES = 10 * 1024 * 1024

// Each server instance keeps the catalogue for five minutes. The Redis copy is about 3 MB and
// Upstash's free plan allows 10 GB a month, so reading it on every Matches load and every profile
// save would cover only about 3,300 of them a month. A student's own profile changes still show at
// once: saving clears that student's match cache (lib/matching/cache.ts), not this. Only program
// edits can lag, by up to these minutes on instances other than the one that made them.
const KEPT_FOR_MS = 5 * 60 * 1000
let kept: { at: number; programs: Promise<CachedProgram[]> } | null = null

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
    /** Percent admitted, for programs with no IB minimum. Display only: matching never reads it. */
    admitRate: number | null
    internationalAdmitRate: number | null
    admitRateYear: number | null
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
  /** Where it is taught when that is not `university.city`. Show `campusCity ?? university.city`. */
  campusCity: string | null
  minIBPoints: number | null
  /** The intake the requirements were checked for; null when never checked. */
  requirementsEntryYear: number | null
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
  // Selected, not included. `include` returns every column of every joined row,
  // so this pulled program descriptions and every university and field column -
  // then optimizeForCache discarded most of it. The read is billed egress on
  // Supabase and runs on every cache refresh, so it should fetch exactly what
  // CachedProgram declares and nothing more. Keep the two in step.
  return prisma.academicProgram.findMany({
    select: {
      id: true,
      name: true,
      universityId: true,
      degreeType: true,
      duration: true,
      campusCity: true,
      minIBPoints: true,
      requirementsEntryYear: true,
      programUrl: true,
      fieldOfStudyId: true,
      university: {
        select: {
          id: true,
          name: true,
          abbreviatedName: true,
          image: true,
          city: true,
          admitRate: true,
          internationalAdmitRate: true,
          admitRateYear: true,
          country: {
            select: { id: true, name: true, code: true, flagEmoji: true }
          }
        }
      },
      fieldOfStudy: {
        select: { id: true, name: true, iconName: true, description: true }
      },
      courseRequirements: {
        select: {
          id: true,
          requiredLevel: true,
          minGrade: true,
          isCritical: true,
          orGroupId: true,
          ibCourse: {
            select: { id: true, name: true, code: true, group: true }
          }
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
      admitRate: p.university.admitRate,
      internationalAdmitRate: p.university.internationalAdmitRate,
      admitRateYear: p.university.admitRateYear,
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
    campusCity: p.campusCity,
    minIBPoints: p.minIBPoints,
    requirementsEntryYear: p.requirementsEntryYear,
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
 * Kept in this instance's memory for KEPT_FOR_MS; past that, read from Redis, and on a miss
 * from the database, which also refills Redis. Concurrent requests share one read, and a failed
 * one is not kept, so the next request tries again.
 *
 * Every caller shares the returned array, so none may change it or the programs in it.
 *
 * @returns Array of programs with essential relations for matching
 */
export function getCachedPrograms(): Promise<CachedProgram[]> {
  if (!kept || Date.now() - kept.at > KEPT_FOR_MS) {
    const programs = readPrograms()
    const entry = { at: Date.now(), programs }
    kept = entry
    programs.catch(() => {
      if (kept === entry) kept = null
    })
  }
  return kept.programs
}

async function readPrograms(): Promise<CachedProgram[]> {
  let cached: CachedProgram[] | null
  try {
    cached = await redis.get<CachedProgram[]>(PROGRAMS_CACHE_KEY)
  } catch (error) {
    // Kept like a Redis copy, so an outage costs one database read per instance every few
    // minutes rather than one per request: the read pattern behind the Supabase overage.
    logger.error('Programs cache error, falling back to DB', { error })
    return optimizeForCache(await fetchProgramsFromDB())
  }

  if (cached) {
    logger.debug('Programs cache hit', { count: cached.length })
    return cached
  }

  logger.info('Programs cache miss, fetching from DB')
  const optimized = optimizeForCache(await fetchProgramsFromDB())
  try {
    await writeProgramsCache(optimized)
  } catch (error) {
    // The programs are already read; a failed write must not read them again
    logger.error('Failed to write programs cache', { error })
  }
  return optimized
}

/**
 * Invalidate programs cache
 *
 * Call this when programs are added, updated, or deleted.
 */
export async function invalidateProgramsCache(): Promise<void> {
  // This instance's copy; other instances keep theirs for up to KEPT_FOR_MS
  kept = null
  try {
    // The current key, and the older ones a deployment still running earlier code may read
    await redis.del(PROGRAMS_CACHE_KEY, ...OLDER_CACHE_KEYS)
    logger.info('Programs cache invalidated')
  } catch (error) {
    logger.error('Failed to invalidate programs cache', { error })
  }
}

/**
 * Warm the programs cache
 *
 * Unconditionally re-reads every program from Postgres and rewrites the cache,
 * so it is for one-off use after a manual invalidation - see
 * scripts/invalidate-program-cache.ts.
 *
 * Never call this on server start. instrumentation.ts used to, and on Vercel
 * every cold start is a server start: from December 2025 to October 2026 it ran
 * the full catalogue read about 600 times a day, which is ~1.2MB of billed
 * Supabase egress each time and was what kept the project over its free-tier
 * quota. The cache lives in Redis and is shared by every instance, so warming
 * it per instance never saved anyone a cold read - getCachedPrograms already
 * fills it on the first miss.
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
