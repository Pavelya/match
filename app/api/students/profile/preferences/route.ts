import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { invalidateStudentCache } from '@/lib/matching/cache'
import { applyRateLimit } from '@/lib/rate-limit'
import { readDraft } from '@/lib/student/draft'

/*
 * First run's step drafts (rebranding 3.1, today `03-flows.md` F1 "nothing is saved until the
 * last button"): Continue on step 1 saves the interests, on step 2 the countries or "Open to
 * anywhere", before any grades exist. One write of the student's own profile, creating it on
 * the first step; no read before it. Grades still save through POST /api/students/profile.
 */

export async function PUT(request: NextRequest) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const rateLimitResponse = await applyRateLimit('profile', userId)
  if (rateLimitResponse) return rateLimitResponse

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  const draft = readDraft(body)
  if (typeof draft === 'string') {
    return NextResponse.json({ error: draft }, { status: 400 })
  }

  const choices =
    draft.step === 'interests'
      ? {
          create: { preferredFields: { connect: draft.fields.map((id) => ({ id })) } },
          update: { preferredFields: { set: draft.fields.map((id) => ({ id })) } }
        }
      : {
          create: {
            openToAllLocations: draft.anywhere,
            preferredCountries: { connect: draft.countries.map((id) => ({ id })) }
          },
          update: {
            openToAllLocations: draft.anywhere,
            preferredCountries: { set: draft.countries.map((id) => ({ id })) }
          }
        }

  try {
    const profile = await prisma.studentProfile.upsert({
      where: { userId },
      create: { userId, ...choices.create },
      update: choices.update,
      select: { totalIBPoints: true }
    })

    // A student with grades who changes their choices has matches to work out again
    if (profile.totalIBPoints !== null) {
      invalidateStudentCache(userId).catch((err) =>
        logger.warn('Cache invalidation failed', { error: err.message, studentId: userId })
      )
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    // A field or country that doesn't exist: the connect finds no record
    const code = (error as { code?: string }).code
    if (code === 'P2025' || code === 'P2018') {
      return NextResponse.json({ error: 'Unknown field or country' }, { status: 400 })
    }
    logger.error(
      { error: error instanceof Error ? error.message : 'Unknown error', step: draft.step },
      'Failed to save a first-run step'
    )
    return NextResponse.json({ error: 'Failed to save. Please try again.' }, { status: 500 })
  }
}
