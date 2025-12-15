/**
 * Coordinator Student API Endpoint
 *
 * GET: Fetch a single student profile (with consent check)
 * PATCH: Update student academic data (with access control)
 *
 * Access Control:
 * - Coordinator must be from the same school as student
 * - Student must have provided coordinator access consent
 * - PATCH: Only VIP or subscribed REGULAR coordinators
 *
 * Part of Task 4.6.4: Create student management API endpoints
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { getCoordinatorAccess } from '@/lib/auth/access-control'
import { invalidateStudentCache } from '@/lib/matching/cache'

interface RouteContext {
  params: Promise<{ id: string }>
}

interface CourseUpdate {
  courseId: string
  level: 'HL' | 'SL'
  grade: number
}

interface UpdateStudentRequest {
  courses?: CourseUpdate[]
  totalIBPoints?: number | null
  tokGrade?: string | null
  eeGrade?: string | null
  preferredFields?: string[]
  preferredCountries?: string[]
}

// GET: Fetch student profile
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params

    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get coordinator's school
    const coordinator = await prisma.coordinatorProfile.findFirst({
      where: { userId: session.user.id },
      include: {
        school: {
          select: {
            id: true,
            subscriptionTier: true,
            subscriptionStatus: true
          }
        }
      }
    })

    if (!coordinator?.school) {
      return NextResponse.json({ error: 'Coordinator profile not found' }, { status: 403 })
    }

    // Fetch student
    const student = await prisma.studentProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        courses: {
          include: { ibCourse: true },
          orderBy: { ibCourse: { group: 'asc' } }
        },
        preferredFields: {
          select: { id: true, name: true }
        },
        preferredCountries: {
          select: { id: true, name: true, flagEmoji: true }
        }
      }
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Check student belongs to coordinator's school
    if (student.schoolId !== coordinator.school.id) {
      return NextResponse.json({ error: 'Unauthorized access to this student' }, { status: 403 })
    }

    // Check consent
    if (!student.coordinatorAccessConsentAt) {
      return NextResponse.json(
        { error: 'Student has not provided consent for coordinator access' },
        { status: 403 }
      )
    }

    return NextResponse.json({ student })
  } catch (error) {
    logger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      'Failed to fetch student'
    )
    return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 })
  }
}

// PATCH: Update student academic data
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params

    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get coordinator's school
    const coordinator = await prisma.coordinatorProfile.findFirst({
      where: { userId: session.user.id },
      include: {
        school: {
          select: {
            id: true,
            subscriptionTier: true,
            subscriptionStatus: true
          }
        }
      }
    })

    if (!coordinator?.school) {
      return NextResponse.json({ error: 'Coordinator profile not found' }, { status: 403 })
    }

    const access = getCoordinatorAccess(coordinator.school)

    // Check if coordinator can edit student data
    if (!access.canEditStudentData) {
      return NextResponse.json(
        { error: 'Upgrade to VIP or subscribe to edit student data' },
        { status: 403 }
      )
    }

    // Fetch student
    const student = await prisma.studentProfile.findUnique({
      where: { id },
      include: {
        courses: {
          select: {
            id: true,
            ibCourseId: true,
            level: true,
            grade: true
          }
        },
        preferredFields: { select: { id: true } },
        preferredCountries: { select: { id: true } }
      }
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Check student belongs to coordinator's school
    if (student.schoolId !== coordinator.school.id) {
      return NextResponse.json({ error: 'Unauthorized access to this student' }, { status: 403 })
    }

    // Check consent
    if (!student.coordinatorAccessConsentAt) {
      return NextResponse.json(
        { error: 'Student has not provided consent for coordinator access' },
        { status: 403 }
      )
    }

    // Parse request body
    const data: UpdateStudentRequest = await request.json()

    // Build update object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {}

    // Update scalar fields
    if (data.totalIBPoints !== undefined) {
      updateData.totalIBPoints = data.totalIBPoints
    }
    if (data.tokGrade !== undefined) {
      updateData.tokGrade = data.tokGrade
    }
    if (data.eeGrade !== undefined) {
      updateData.eeGrade = data.eeGrade
    }

    // Update preferred fields
    if (data.preferredFields !== undefined) {
      updateData.preferredFields = {
        set: data.preferredFields.map((id) => ({ id }))
      }
    }

    // Update preferred countries
    if (data.preferredCountries !== undefined) {
      updateData.preferredCountries = {
        set: data.preferredCountries.map((id) => ({ id }))
      }
    }

    // Update courses
    if (data.courses !== undefined) {
      // Delete all existing courses and create new ones
      // This is simpler than computing diff for course updates
      updateData.courses = {
        deleteMany: {},
        create: data.courses.map((course) => ({
          ibCourseId: course.courseId,
          level: course.level,
          grade: course.grade
        }))
      }
    }

    // Perform update
    const updatedStudent = await prisma.studentProfile.update({
      where: { id },
      data: updateData
    })

    logger.info('Coordinator updated student profile', {
      coordinatorId: coordinator.id,
      studentId: id,
      updatedFields: Object.keys(updateData)
    })

    // Invalidate student cache to trigger match recalculation
    const userId = student.userId
    invalidateStudentCache(userId)
      .then(() => logger.info('Student cache invalidated after coordinator update', { userId }))
      .catch((err) => logger.warn('Cache invalidation failed', { error: err.message, userId }))

    // Trigger match precompute in background
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const internalKey = process.env.INTERNAL_API_KEY

    if (internalKey) {
      fetch(`${appUrl}/api/students/matches/precompute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-key': internalKey
        },
        body: JSON.stringify({ studentId: userId })
      }).catch((err) => {
        logger.warn('Failed to trigger matches precompute', { error: err.message })
      })
    }

    return NextResponse.json({
      success: true,
      studentId: updatedStudent.id
    })
  } catch (error) {
    logger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      'Failed to update student'
    )
    return NextResponse.json({ error: 'Failed to update student' }, { status: 500 })
  }
}
