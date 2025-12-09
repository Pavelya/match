import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { invalidateStudentCache } from '@/lib/matching/cache'
import { applyRateLimit } from '@/lib/rate-limit'

interface CourseSelection {
  courseId: string
  level: 'HL' | 'SL'
  grade: number
}

interface SaveProfileRequest {
  interestedFields: string[]
  preferredCountries: string[]
  courseSelections: CourseSelection[]
  tokGrade: string | null
  eeGrade: string | null
  totalIBPoints: number | null
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Apply rate limiting (10 requests per minute per user)
    const rateLimitResponse = await applyRateLimit('profile', session.user.id)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Parse request body
    const data: SaveProfileRequest = await request.json()

    // Validate required fields
    if (!data.interestedFields || data.interestedFields.length < 3) {
      return NextResponse.json(
        { error: 'Please select at least 3 fields of study' },
        { status: 400 }
      )
    }

    if (!data.courseSelections || data.courseSelections.length !== 6) {
      return NextResponse.json({ error: 'Please select exactly 6 IB courses' }, { status: 400 })
    }

    if (!data.tokGrade || !data.eeGrade) {
      return NextResponse.json({ error: 'Please provide TOK and EE grades' }, { status: 400 })
    }

    const studentId = session.user.id

    // Fetch existing profile to compute diff
    const existingProfile = await prisma.studentProfile.findUnique({
      where: { userId: studentId },
      include: {
        preferredFields: { select: { id: true } },
        preferredCountries: { select: { id: true } },
        courses: {
          select: {
            id: true,
            ibCourseId: true,
            level: true,
            grade: true
          }
        }
      }
    })

    let profile

    if (!existingProfile) {
      // CREATE: New profile - use original create logic
      profile = await prisma.studentProfile.create({
        data: {
          userId: studentId,
          totalIBPoints: data.totalIBPoints,
          tokGrade: data.tokGrade,
          eeGrade: data.eeGrade,
          preferredFields: {
            connect: data.interestedFields.map((id) => ({ id }))
          },
          preferredCountries: {
            connect: data.preferredCountries.map((id) => ({ id }))
          },
          courses: {
            create: data.courseSelections.map((selection) => ({
              ibCourseId: selection.courseId,
              level: selection.level,
              grade: selection.grade
            }))
          }
        }
      })
      logger.info('Created new student profile', { studentId, profileId: profile.id })
    } else {
      // UPDATE: Compute diff and only update changed values
      const existingFieldIds = new Set(existingProfile.preferredFields.map((f) => f.id))
      const existingCountryIds = new Set(existingProfile.preferredCountries.map((c) => c.id))
      const newFieldIds = new Set(data.interestedFields)
      const newCountryIds = new Set(data.preferredCountries)

      // Check what changed
      const fieldsChanged =
        existingFieldIds.size !== newFieldIds.size ||
        ![...existingFieldIds].every((id) => newFieldIds.has(id))
      const countriesChanged =
        existingCountryIds.size !== newCountryIds.size ||
        ![...existingCountryIds].every((id) => newCountryIds.has(id))
      const scalarChanged =
        existingProfile.totalIBPoints !== data.totalIBPoints ||
        existingProfile.tokGrade !== data.tokGrade ||
        existingProfile.eeGrade !== data.eeGrade

      // Check if courses changed (compare by courseId + level + grade)
      const existingCourseMap = new Map(
        existingProfile.courses.map((c) => [`${c.ibCourseId}:${c.level}:${c.grade}`, c])
      )
      const newCourseKeys = new Set(
        data.courseSelections.map((s) => `${s.courseId}:${s.level}:${s.grade}`)
      )
      const coursesChanged =
        existingProfile.courses.length !== data.courseSelections.length ||
        ![...existingCourseMap.keys()].every((key) => newCourseKeys.has(key))

      // Only proceed with update if something actually changed
      if (!fieldsChanged && !countriesChanged && !scalarChanged && !coursesChanged) {
        logger.info('No changes detected, skipping profile update', { studentId })
        return NextResponse.json({
          success: true,
          profileId: existingProfile.id,
          noChanges: true
        })
      }

      // Build update object with only changed fields
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: any = {}

      if (scalarChanged) {
        updateData.totalIBPoints = data.totalIBPoints
        updateData.tokGrade = data.tokGrade
        updateData.eeGrade = data.eeGrade
      }

      if (fieldsChanged) {
        updateData.preferredFields = {
          set: data.interestedFields.map((id) => ({ id }))
        }
      }

      if (countriesChanged) {
        updateData.preferredCountries = {
          set: data.preferredCountries.map((id) => ({ id }))
        }
      }

      if (coursesChanged) {
        // Compute which courses to add vs remove
        const coursesToDelete = existingProfile.courses.filter(
          (c) => !newCourseKeys.has(`${c.ibCourseId}:${c.level}:${c.grade}`)
        )
        const coursesToAdd = data.courseSelections.filter(
          (s) => !existingCourseMap.has(`${s.courseId}:${s.level}:${s.grade}`)
        )

        if (coursesToDelete.length > 0 || coursesToAdd.length > 0) {
          updateData.courses = {}
          if (coursesToDelete.length > 0) {
            updateData.courses.deleteMany = {
              id: { in: coursesToDelete.map((c) => c.id) }
            }
          }
          if (coursesToAdd.length > 0) {
            updateData.courses.create = coursesToAdd.map((selection) => ({
              ibCourseId: selection.courseId,
              level: selection.level,
              grade: selection.grade
            }))
          }
        }
      }

      profile = await prisma.studentProfile.update({
        where: { id: existingProfile.id },
        data: updateData
      })

      logger.info('Updated student profile with diff', {
        studentId,
        profileId: profile.id,
        fieldsChanged,
        countriesChanged,
        scalarChanged,
        coursesChanged
      })
    }

    // Fire-and-forget: Invalidate cache in background (don't block response)
    // Cache will be rebuilt on next access if needed
    invalidateStudentCache(studentId)
      .then(() => logger.info('Student cache invalidated after profile update', { studentId }))
      .catch((err) => logger.warn('Cache invalidation failed', { error: err.message, studentId }))

    // Fire-and-forget: Pre-compute matches in background
    // This ensures /student/matches is fast on first visit
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const internalKey = process.env.INTERNAL_API_KEY

    if (internalKey) {
      fetch(`${appUrl}/api/students/matches/precompute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-key': internalKey
        },
        body: JSON.stringify({ studentId })
      }).catch((err) => {
        // Don't block on precompute failure - it's optional optimization
        logger.warn('Failed to trigger matches precompute', { error: err.message })
      })
      logger.info('Matches precompute triggered', { studentId })
    }

    return NextResponse.json({
      success: true,
      profileId: profile.id
    })
  } catch (error) {
    logger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      'Failed to save student profile'
    )
    return NextResponse.json(
      { error: 'Failed to save profile. Please try again.' },
      { status: 500 }
    )
  }
}
