import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { invalidateStudentCache } from '@/lib/matching/cache'

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

    // Upsert student profile (handles both new and existing users)
    const profile = await prisma.studentProfile.upsert({
      where: {
        userId: studentId
      },
      create: {
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
      },
      update: {
        totalIBPoints: data.totalIBPoints,
        tokGrade: data.tokGrade,
        eeGrade: data.eeGrade,
        preferredFields: {
          set: data.interestedFields.map((id) => ({ id }))
        },
        preferredCountries: {
          set: data.preferredCountries.map((id) => ({ id }))
        },
        courses: {
          deleteMany: {}, // Remove all existing courses
          create: data.courseSelections.map((selection) => ({
            ibCourseId: selection.courseId,
            level: selection.level,
            grade: selection.grade
          }))
        }
      }
    })

    // CRITICAL: Invalidate the matches cache since profile has changed
    await invalidateStudentCache(studentId)
    logger.info('Student cache invalidated after profile update', { studentId })

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
