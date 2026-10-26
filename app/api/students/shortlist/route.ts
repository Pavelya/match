/**
 * GET /api/students/shortlist: the Shortlist in the new design (rebranding 2.5).
 *
 * Every saved program, newest first, as the list's rows and the compare table's columns show
 * them (lib/shortlist/items.ts), so List and Compare come from this one response. It reads what
 * GET /api/students/saved-programs reads, the profile and the saved programs, with one thing
 * more: the student's subjects and grades, for the fit, read with the profile, which becomes a
 * select. The table's other facts are columns of rows the old route reads already. No programs
 * cache, no search. A student without subjects gets first run's steps, and the list without the
 * fit.
 *
 * Today's page keeps the old route until release; it goes at cleanup (R.2).
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { hasSubjects, profileSteps } from '@/lib/matching/match-list'
import { transformStudent } from '@/lib/matching/transformers'
import { currentEntryYear } from '@/lib/programs/entry-year'
import { shortlistItem } from '@/lib/shortlist/items'
import type { ShortlistResponse } from '@/lib/shortlist/types'
import { logger } from '@/lib/logger'
import { applyRateLimit } from '@/lib/rate-limit'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rateLimited = await applyRateLimit('api', session.user.id)
    if (rateLimited) return rateLimited

    const profile = await prisma.studentProfile.findUnique({
      where: { userId: session.user.id },
      select: {
        id: true,
        totalIBPoints: true,
        tokGrade: true,
        eeGrade: true,
        openToAllFields: true,
        openToAllLocations: true,
        courses: {
          select: { level: true, grade: true, ibCourse: { select: { id: true, name: true } } }
        },
        preferredFields: { select: { id: true, name: true } },
        preferredCountries: { select: { id: true, name: true } }
      }
    })

    // Saving needs a profile, so without one there is nothing saved
    const saved = profile
      ? await prisma.savedProgram.findMany({
          where: { studentProfileId: profile.id },
          orderBy: { createdAt: 'desc' },
          select: {
            program: {
              select: {
                id: true,
                name: true,
                degreeType: true,
                duration: true,
                campusCity: true,
                minIBPoints: true,
                programUrl: true,
                requirementsEntryYear: true,
                fieldOfStudy: { select: { id: true } },
                university: {
                  select: {
                    id: true,
                    name: true,
                    abbreviatedName: true,
                    image: true,
                    city: true,
                    admitRate: true,
                    country: { select: { id: true, name: true } }
                  }
                },
                courseRequirements: {
                  select: {
                    requiredLevel: true,
                    minGrade: true,
                    isCritical: true,
                    orGroupId: true,
                    ownCourse: true,
                    ibCourse: { select: { id: true, name: true } }
                  }
                }
              }
            }
          }
        })
      : []

    const graded = hasSubjects(profile)
    const viewer = {
      student: graded ? transformStudent(profile) : null,
      countryIds: profile?.preferredCountries.map((c) => c.id) ?? [],
      openToAllLocations: profile?.openToAllLocations ?? false
    }
    const programs = saved.map((s) => shortlistItem(s.program, viewer))

    const body: ShortlistResponse = graded
      ? {
          complete: true,
          total: profile.totalIBPoints ?? 0,
          currentYear: currentEntryYear(),
          programs
        }
      : { complete: false, steps: profileSteps(profile), programs }
    return NextResponse.json(body)
  } catch (error) {
    logger.error('Failed to fetch the shortlist', { error })
    return NextResponse.json({ error: 'Failed to fetch the shortlist' }, { status: 500 })
  }
}
