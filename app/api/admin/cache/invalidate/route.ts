/**
 * Admin API: Cache Invalidation
 *
 * POST - Invalidate Next.js caches for reference data
 *
 * Use after bulk imports or direct database changes.
 * Example: curl -X POST http://localhost:3000/api/admin/cache/invalidate
 *
 * Security: Requires PLATFORM_ADMIN role
 */

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

export async function POST() {
  return invalidateCache()
}

// Also support GET for easy browser access
export async function GET() {
  return invalidateCache()
}

async function invalidateCache() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Invalidate all reference data caches
    revalidateTag('countries-with-programs', { expire: 0 })
    revalidateTag('countries', { expire: 0 })
    revalidateTag('fields-of-study', { expire: 0 })
    revalidateTag('ib-courses', { expire: 0 })

    logger.info('Reference data caches invalidated', {
      userId: session.user.id,
      tags: ['countries-with-programs', 'countries', 'fields-of-study', 'ib-courses']
    })

    return NextResponse.json({
      success: true,
      message: 'All reference data caches invalidated',
      invalidatedTags: ['countries-with-programs', 'countries', 'fields-of-study', 'ib-courses']
    })
  } catch (error) {
    logger.error('Error invalidating cache', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
