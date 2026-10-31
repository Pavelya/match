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
 * the first step; no read before it. Step 3's Save and exit (3.2) keeps the complete subjects
 * and the core without a total, so the student still has no grades; it writes only a profile
 * that has none, so it can never undo a finished one. Grades still save, with their total,
 * through POST /api/students/profile.
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

  if (draft.step === 'subjects') {
    try {
      await prisma.studentProfile.update({
        where: { userId, totalIBPoints: null },
        data: {
          tokGrade: draft.tokGrade,
          eeGrade: draft.eeGrade,
          courses: {
            deleteMany: {},
            create: draft.courses.map(({ courseId, level, grade }) => ({
              ibCourseId: courseId,
              level,
              grade
            }))
          }
        },
        select: { id: true }
      })
      return NextResponse.json({ success: true })
    } catch (error) {
      const code = (error as { code?: string }).code
      // No profile without grades: a finished profile saves through Save changes
      if (code === 'P2025') {
        return NextResponse.json({ error: 'Your profile already has grades' }, { status: 409 })
      }
      // A subject that doesn't exist
      if (code === 'P2003') {
        return NextResponse.json({ error: 'Unknown subject' }, { status: 400 })
      }
      logger.error(
        { error: error instanceof Error ? error.message : 'Unknown error', step: draft.step },
        'Failed to save a first-run step'
      )
      return NextResponse.json({ error: 'Failed to save. Please try again.' }, { status: 500 })
    }
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
      await invalidateStudentCache(userId)
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
