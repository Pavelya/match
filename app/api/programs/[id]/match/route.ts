/**
 * Program Match API Route
 *
 * GET /api/programs/[id]/match
 *
 * Returns match score for the authenticated student against a specific program.
 * Used by the PersonalizedMatch component on program detail pages.
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { calculateMatch } from '@/lib/matching'
import { transformStudent, transformProgram } from '@/lib/matching/transformers'
import { logger } from '@/lib/logger'
import { applyRateLimit } from '@/lib/rate-limit'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, context: RouteContext) {
  try {
    // Get authenticated session
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rateLimited = await applyRateLimit('api', session.user.id)
    if (rateLimited) return rateLimited

    const { id: programId } = await context.params

    // Fetch student profile
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        courses: {
          include: {
            ibCourse: true
          }
        },
        preferredFields: true,
        preferredCountries: true
      }
    })

    if (!studentProfile) {
      return NextResponse.json(
        { error: 'Student profile not found. Please complete onboarding first.' },
        { status: 404 }
      )
    }

    // Fetch the fields matching and the response need. Selected, not included:
    // University.logo can hold an inline base64 image.
    const program = await prisma.academicProgram.findUnique({
      where: { id: programId },
      select: {
        id: true,
        name: true,
        minIBPoints: true,
        university: {
          select: {
            id: true,
            name: true,
            country: { select: { id: true, name: true, flagEmoji: true } }
          }
        },
        fieldOfStudy: { select: { id: true, name: true } },
        courseRequirements: {
          select: {
            requiredLevel: true,
            minGrade: true,
            isCritical: true,
            orGroupId: true,
            ibCourse: { select: { id: true, name: true } }
          }
        }
      }
    })

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    // Transform and calculate match
    const transformedStudent = transformStudent(studentProfile)
    const transformedProgram = transformProgram(program)

    const matchResult = calculateMatch({
      student: transformedStudent,
      program: transformedProgram,
      mode: 'BALANCED'
    })

    logger.debug('Program match calculated', {
      programId,
      studentId: session.user.id,
      score: matchResult.overallScore
    })

    return NextResponse.json({
      match: matchResult,
      program: {
        fieldOfStudy: {
          name: program.fieldOfStudy.name
        },
        country: {
          name: program.university.country.name,
          flagEmoji: program.university.country.flagEmoji
        },
        minIBPoints: program.minIBPoints
      }
    })
  } catch (error) {
    logger.error('Failed to calculate program match', { error })
    return NextResponse.json({ error: 'Failed to calculate match' }, { status: 500 })
  }
}
