/**
 * Admin API: Seasonal themes (rebranding 6.1)
 *
 * PUT - Save the schedule: each season built in code with its switch and dates, and the "All
 * seasonal decorations off" switch. Refuses what lib/seasons/rules.ts refuses, then expires the
 * root layout's cached schedule, so each prebuilt page renders again on its next visit.
 *
 * Security: Requires PLATFORM_ADMIN role
 */

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { applyRateLimit } from '@/lib/rate-limit'
import { checkSchedule, parseScheduleInput } from '@/lib/seasons/rules'
import { ALL_OFF_KEY, SEASON_TAG } from '@/lib/seasons/seasons'

/** A calendar day as Prisma writes a `@db.Date`: midnight UTC */
function storedDay(day: string | null): Date | null {
  return day === null ? null : new Date(`${day}T00:00:00Z`)
}

export async function PUT(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rateLimited = await applyRateLimit('api', session.user.id)
    if (rateLimited) return rateLimited

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const input = parseScheduleInput(await request.json().catch(() => null))
    if (!input) {
      return NextResponse.json({ error: 'Invalid schedule' }, { status: 400 })
    }

    const errors = checkSchedule(input.seasons)
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Invalid schedule', errors }, { status: 400 })
    }

    await prisma.$transaction([
      ...input.seasons.map((season) => {
        const data = {
          enabled: season.enabled,
          startsOn: storedDay(season.startsOn),
          endsOn: storedDay(season.endsOn)
        }
        return prisma.seasonalTheme.upsert({
          where: { key: season.key },
          create: { key: season.key, ...data },
          update: data,
          select: { key: true }
        })
      }),
      prisma.seasonalTheme.upsert({
        where: { key: ALL_OFF_KEY },
        create: { key: ALL_OFF_KEY, enabled: input.allOff },
        update: { enabled: input.allOff },
        select: { key: true }
      })
    ])

    revalidateTag(SEASON_TAG, { expire: 0 })

    logger.info('Seasonal themes saved', {
      userId: session.user.id,
      allOff: input.allOff,
      on: input.seasons.filter((season) => season.enabled).map((season) => season.key)
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error saving seasonal themes', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
