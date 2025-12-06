/**
 * Student Matches API Route
 *
 * GET /api/students/matches
 *
 * Returns top program matches for the authenticated student based on:
 * - Academic profile (courses, grades, IB points)
 * - Preferences (fields, countries)
 * - Matching algorithm score
 *
 * Uses Redis cache (5 min TTL) for performance.
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { getCachedMatches } from '@/lib/matching'
import { transformStudent, transformPrograms } from '@/lib/matching/transformers'
import { logger } from '@/lib/logger'

export async function GET() {
  try {
    // Get authenticated session
    const session = await auth()

    if (!session?.user?.id) {
      logger.warn('Unauthorized matches request - no session')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const studentId = session.user.id

    logger.info('Fetching matches for student', { studentId })

    // Fetch student profile with all required data
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: studentId },
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
      logger.warn('Student profile not found', { studentId })
      return NextResponse.json(
        { error: 'Student profile not found. Please complete onboarding first.' },
        { status: 404 }
      )
    }

    // Fetch all programs
    const programs = await prisma.academicProgram.findMany({
      include: {
        university: {
          include: {
            country: true
          }
        },
        fieldOfStudy: true,
        courseRequirements: {
          include: {
            ibCourse: true
          }
        }
      }
    })

    logger.debug('Data fetched', {
      studentId,
      programCount: programs.length,
      hasIBPoints: !!studentProfile.totalIBPoints
    })

    // Transform Prisma types to matching algorithm types (type-safe)
    const transformedStudent = transformStudent(studentProfile)
    const transformedPrograms = transformPrograms(programs)

    // Get matches (with caching) - now fully type-safe!
    const matches = await getCachedMatches(
      studentId,
      transformedStudent,
      transformedPrograms,
      'BALANCED'
    )

    logger.info('Matches retrieved successfully', {
      studentId,
      matchCount: matches.length,
      topScore: matches[0]?.overallScore
    })

    // Return top 15 matches with full program data
    const topMatches = matches.slice(0, 15)

    // Enrich matches with full program data
    const enrichedMatches = topMatches.map((match) => {
      const program = programs.find((p) => p.id === match.programId)
      return {
        ...match,
        program: program
          ? {
              id: program.id,
              name: program.name,
              university: {
                name: program.university.name,
                abbreviation: program.university.abbreviatedName
              },
              country: {
                name: program.university.country.name,
                code: program.university.country.code,
                flagEmoji: program.university.country.flagEmoji
              },
              fieldOfStudy: {
                name: program.fieldOfStudy.name,
                iconName: program.fieldOfStudy.iconName
              },
              degreeType: program.degreeType,
              duration: program.duration,
              minIBPoints: program.minIBPoints
            }
          : null
      }
    })

    return NextResponse.json({
      matches: enrichedMatches,
      studentId,
      totalMatches: matches.length,
      returnedCount: topMatches.length
    })
  } catch (error) {
    logger.error('Failed to fetch student matches', { error })
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 })
  }
}
