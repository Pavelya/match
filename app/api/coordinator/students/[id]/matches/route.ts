/**
 * Coordinator Student Matches API Endpoint
 *
 * GET: Fetch matches for a specific student (coordinator view)
 *
 * Access Control:
 * - Coordinator must be from the same school as student
 * - Student must have provided coordinator access consent
 *
 * Part of Task 4.6.5: View student matches
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { getCoordinatorAccess } from '@/lib/auth/access-control'
import { getCachedMatches } from '@/lib/matching'
import { getCachedPrograms } from '@/lib/matching/program-cache'
import { transformStudent, transformPrograms } from '@/lib/matching/transformers'
import { logger } from '@/lib/logger'

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET: Fetch student matches
export async function GET(request: NextRequest, context: RouteContext) {
  const startTime = performance.now()

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

    // Check if coordinator has full access (VIP or subscribed)
    if (!access.hasFullAccess) {
      return NextResponse.json({ error: 'Upgrade to VIP to view student matches' }, { status: 403 })
    }

    // Fetch student with profile data
    const student = await prisma.studentProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        courses: {
          include: { ibCourse: true }
        },
        preferredFields: true,
        preferredCountries: true
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

    // Fetch all programs from cache
    const allPrograms = await getCachedPrograms()

    // Transform data for matching algorithm
    const transformedStudent = transformStudent(student)
    const transformedPrograms = transformPrograms(allPrograms)

    // Get matches (with caching based on student's userId for consistency)
    const matches = await getCachedMatches(
      student.userId,
      transformedStudent,
      transformedPrograms,
      'BALANCED'
    )

    const totalDuration = Math.round(performance.now() - startTime)

    logger.info('Coordinator viewed student matches', {
      coordinatorId: coordinator.id,
      studentId: id,
      matchCount: matches.length,
      duration: totalDuration
    })

    // Return top 10 matches with full program data
    const topMatches = matches.slice(0, 10)

    // Create lookup map for O(1) access
    const programMap = new Map(allPrograms.map((p) => [p.id, p]))

    // Enrich matches with full program data
    const enrichedMatches = topMatches.map((match) => {
      const program = programMap.get(match.programId)
      return {
        ...match,
        program: program
          ? {
              id: program.id,
              name: program.name,
              university: {
                name: program.university.name,
                abbreviation: program.university.abbreviatedName,
                image: program.university.image
              },
              country: {
                name: program.university.country.name,
                code: program.university.country.code,
                flagEmoji: program.university.country.flagEmoji
              },
              fieldOfStudy: {
                name: program.fieldOfStudy.name,
                iconName: program.fieldOfStudy.iconName,
                description: program.fieldOfStudy.description
              },
              degreeType: program.degreeType,
              duration: program.duration,
              minIBPoints: program.minIBPoints,
              city: program.university.city,
              courseRequirements: program.courseRequirements.map((cr) => ({
                id: cr.id,
                ibCourse: {
                  id: cr.ibCourse.id,
                  name: cr.ibCourse.name,
                  code: cr.ibCourse.code,
                  group: cr.ibCourse.group
                },
                requiredLevel: cr.requiredLevel,
                minGrade: cr.minGrade,
                isCritical: cr.isCritical,
                orGroupId: cr.orGroupId
              }))
            }
          : null
      }
    })

    return NextResponse.json({
      matches: enrichedMatches,
      student: {
        id: student.id,
        name: student.user.name,
        email: student.user.email
      },
      totalMatches: matches.length,
      returnedCount: topMatches.length
    })
  } catch (error) {
    logger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      'Failed to fetch student matches for coordinator'
    )
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 })
  }
}
