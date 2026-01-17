/**
 * Reference Data Cache
 *
 * Caches rarely-changing reference data (fields, countries, IB courses)
 * to avoid DB queries on every onboarding page load.
 *
 * Uses Next.js unstable_cache for automatic revalidation.
 *
 * IMPORTANT: The `tags` option is required for `revalidateTag()` to work.
 * The second argument to unstable_cache is the cache KEY (for deduplication),
 * while `tags` in the options object is what revalidateTag uses.
 */

import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'

// Cache TTL: 1 hour (reference data rarely changes)
const CACHE_TTL = 3600

/**
 * Get all fields of study (cached)
 */
export const getCachedFields = unstable_cache(
  async () => {
    return prisma.fieldOfStudy.findMany({
      orderBy: { name: 'asc' }
    })
  },
  ['fields-of-study'],
  { revalidate: CACHE_TTL, tags: ['fields-of-study'] }
)

/**
 * Get all countries (cached)
 */
export const getCachedCountries = unstable_cache(
  async () => {
    return prisma.country.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        code: true,
        flagEmoji: true
      }
    })
  },
  ['countries'],
  { revalidate: CACHE_TTL, tags: ['countries'] }
)

/**
 * Get countries that have at least one university with programs (cached)
 *
 * Used for student onboarding to only show locations where programs exist.
 * Admin pages should continue using getCachedCountries() for full list.
 *
 * Cache is invalidated via 'countries-with-programs' tag when programs are
 * created or deleted.
 */
export const getCachedCountriesWithPrograms = unstable_cache(
  async () => {
    return prisma.country.findMany({
      where: {
        universities: {
          some: {
            programs: {
              some: {} // At least one program exists
            }
          }
        }
      },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        code: true,
        flagEmoji: true
      }
    })
  },
  ['countries-with-programs'],
  { revalidate: CACHE_TTL, tags: ['countries-with-programs'] }
)

/**
 * Get all IB courses (cached)
 */
export const getCachedIBCourses = unstable_cache(
  async () => {
    return prisma.iBCourse.findMany({
      orderBy: [{ group: 'asc' }, { name: 'asc' }],
      select: {
        id: true,
        name: true,
        code: true,
        group: true
      }
    })
  },
  ['ib-courses'],
  { revalidate: CACHE_TTL, tags: ['ib-courses'] }
)
