/**
 * GET /api/students/matches/list: the Matches page in the new design (rebranding 2.2).
 *
 * Every match the algorithm finds, with no cap, as the cards and "Why this match" show them
 * (lib/matching/match-list.ts), best fit first; the page groups them by status. With them, the
 * profile panel beside the list and the student's shortlist, all from the one profile query
 * the old route makes, so the page reads nothing else. A student without subjects gets first
 * run's steps instead.
 *
 * The scores come from the same V10 cache as GET /api/students/matches, which today's page
 * keeps using until release; that route goes at cleanup (R.2).
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { getCachedMatchesV10 } from '@/lib/matching'
import { getCachedPrograms } from '@/lib/matching/program-cache'
import { transformPrograms, transformStudent } from '@/lib/matching/transformers'
import {
  hasSubjects,
  isWidened,
  matchItems,
  profileSteps,
  profileSummary
} from '@/lib/matching/match-list'
import type { MatchesResponse } from '@/lib/matching/match-groups'
import { logger } from '@/lib/logger'
import { applyRateLimit } from '@/lib/rate-limit'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rateLimited = await applyRateLimit('matches', session.user.id)
    if (rateLimited) return rateLimited

    const studentId = session.user.id
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: studentId },
      select: {
        totalIBPoints: true,
        tokGrade: true,
        eeGrade: true,
        openToAllFields: true,
        openToAllLocations: true,
        courses: {
          select: { level: true, grade: true, ibCourse: { select: { id: true, name: true } } }
        },
        preferredFields: { select: { id: true, name: true } },
        preferredCountries: { select: { id: true, name: true } },
        savedPrograms: { select: { programId: true } }
      }
    })

    if (!hasSubjects(profile)) {
      const body: MatchesResponse = { complete: false, steps: profileSteps(profile) }
      return NextResponse.json(body)
    }

    const programs = await getCachedPrograms()
    const results = await getCachedMatchesV10(
      studentId,
      transformStudent(profile),
      transformPrograms(programs),
      'BALANCED'
    )

    const total = profile.totalIBPoints ?? 0
    const body: MatchesResponse = {
      complete: true,
      profile: profileSummary(profile),
      matches: matchItems(results, new Map(programs.map((p) => [p.id, p])), total),
      widened: isWidened(results),
      savedIds: profile.savedPrograms.map((s) => s.programId)
    }
    return NextResponse.json(body)
  } catch (error) {
    logger.error('Failed to list student matches', { error })
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 })
  }
}
