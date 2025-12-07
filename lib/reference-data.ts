/**
 * Reference Data Cache
 *
 * Caches rarely-changing reference data (fields, countries, IB courses)
 * to avoid DB queries on every onboarding page load.
 *
 * Uses Next.js unstable_cache for automatic revalidation.
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
  { revalidate: CACHE_TTL }
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
  { revalidate: CACHE_TTL }
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
  { revalidate: CACHE_TTL }
)
