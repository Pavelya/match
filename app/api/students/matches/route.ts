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

    // Get matches (with caching)

    const matches = await getCachedMatches(
      studentId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      studentProfile as any, // Type assertion - Prisma result matches our StudentProfile structure
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      programs as any, // Type assertion - Prisma result matches our program structure
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'BALANCED' as any // Matching mode
    )

    logger.info('Matches retrieved successfully', {
      studentId,
      matchCount: matches.length,
      topScore: matches[0]?.overallScore
    })

    // Return top 15 matches
    const topMatches = matches.slice(0, 15)

    return NextResponse.json({
      matches: topMatches,
      studentId,
      totalMatches: matches.length,
      returnedCount: topMatches.length
    })
  } catch (error) {
    logger.error('Failed to fetch student matches', { error })
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 })
  }
}
