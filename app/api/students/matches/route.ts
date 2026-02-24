/**
 * Student Matches API Route
 *
 * GET /api/students/matches
 *
 * Returns top 10 program matches for the authenticated student based on:
 * - Academic profile (courses, grades, IB points)
 * - Preferences (fields, countries)
 * - Matching algorithm score
 *
 * V10 Enhancements:
 * - Match categorization (SAFETY/MATCH/REACH/UNLIKELY)
 * - Confidence scoring
 * - Fit quality breakdown
 * - Performance optimizations
 *
 * Performance optimizations:
 * - Redis cache for programs (1 hour TTL)
 * - Redis cache for matches (30 min TTL)
 * - V10 candidate filtering (5-25x reduction)
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { getCachedMatchesV10 } from '@/lib/matching'
import { getCachedPrograms } from '@/lib/matching/program-cache'
import { transformStudent, transformPrograms } from '@/lib/matching/transformers'
import { logger } from '@/lib/logger'
import { applyRateLimit } from '@/lib/rate-limit'
// Note: Algolia is not used here - matching runs against all programs

export async function GET() {
  const startTime = performance.now()
  const timings: Record<string, number> = {}

  try {
    // Get authenticated session
    const authStart = performance.now()
    const session = await auth()
    timings.auth = Math.round(performance.now() - authStart)

    if (!session?.user?.id) {
      logger.warn('Unauthorized matches request - no session')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Apply rate limiting (20 requests per minute per user)
    const rateLimitResponse = await applyRateLimit('matches', session.user.id)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const studentId = session.user.id

    // Fetch student profile
    const profileStart = performance.now()
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
    timings.fetchProfile = Math.round(performance.now() - profileStart)

    if (!studentProfile) {
      logger.warn('Student profile not found', { studentId })
      return NextResponse.json(
        {
          error: 'Student profile not found. Please complete onboarding first.',
          code: 'PROFILE_NOT_FOUND'
        },
        { status: 404 }
      )
    }

    // Fetch all programs from cache
    const programsStart = performance.now()
    const allPrograms = await getCachedPrograms()
    timings.fetchPrograms = Math.round(performance.now() - programsStart)

    // NOTE: We do NOT use Algolia pre-filtering for the matches API.
    // The matching algorithm must run against ALL programs to correctly
    // rank and return the top 10 programs by match score.
    // Algolia pre-filtering is only suitable for search/browse pages.

    // Transform Prisma types to matching algorithm types
    const transformStart = performance.now()
    const transformedStudent = transformStudent(studentProfile)
    const transformedPrograms = transformPrograms(allPrograms)
    timings.transform = Math.round(performance.now() - transformStart)

    // Get matches using V10 algorithm (with caching, optimization, and enhancement)
    const matchStart = performance.now()
    const matches = await getCachedMatchesV10(
      studentId,
      transformedStudent,
      transformedPrograms,
      'BALANCED'
    )
    timings.matching = Math.round(performance.now() - matchStart)

    const totalDuration = Math.round(performance.now() - startTime)

    // Log comprehensive performance metrics
    logger.info('matches_api_performance', {
      studentId,
      totalDuration,
      timings,
      programCount: allPrograms.length,
      matchCount: matches.length,
      topScore: matches[0]?.overallScore,
      topCategory: matches[0]?.category,
      algorithmVersion: 'v10'
    })

    // Return top 10 matches with full program data
    const topMatches = matches.slice(0, 10)

    // Create lookup map for O(1) access instead of O(n) .find() per match
    const programMap = new Map(allPrograms.map((p) => [p.id, p]))

    // Enrich matches with full program data and V10 fields using O(1) lookups
    const enrichedMatches = topMatches.map((match) => {
      const program = programMap.get(match.programId)
      return {
        // Core match data
        programId: match.programId,
        overallScore: match.overallScore,
        academicMatch: match.academicMatch,
        fieldMatch: match.fieldMatch,
        locationMatch: match.locationMatch,

        // V10: Match categorization
        category: match.category,
        categoryInfo: match.categoryInfo,

        // V10: Confidence scoring
        confidence: match.confidence,

        // V10: Fit quality breakdown
        fitQuality: match.fitQuality,

        // Full program data
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
      studentId,
      totalMatches: matches.length,
      returnedCount: topMatches.length,
      algorithmVersion: 'v10'
    })
  } catch (error) {
    logger.error('Failed to fetch student matches', { error })
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 })
  }
}
