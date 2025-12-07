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
 * Performance optimizations:
 * - Algolia pre-filtering (reduces candidates from 2500 to ~300)
 * - Redis cache for programs (1 hour TTL)
 * - Redis cache for matches (30 min TTL)
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { getCachedMatches } from '@/lib/matching'
import { getCachedPrograms } from '@/lib/matching/program-cache'
import { transformStudent, transformPrograms } from '@/lib/matching/transformers'
import { logger } from '@/lib/logger'
import { searchCandidatePrograms, isAlgoliaAvailable } from '@/lib/algolia/search'

export async function GET() {
  const startTime = performance.now()

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

    // Fetch all programs from cache
    const allPrograms = await getCachedPrograms()

    // Pre-filter using Algolia if available (reduces 2500 -> ~300 candidates)
    let programs = allPrograms
    let usedAlgoliaFilter = false

    if (isAlgoliaAvailable()) {
      const studentPoints = studentProfile.totalIBPoints || 0
      const studentFields = studentProfile.preferredFields.map((f) => f.id)
      const studentCountries = studentProfile.preferredCountries.map((c) => c.id)

      // Only use Algolia if student has preferences to filter by
      const hasPreferences = studentFields.length > 0 || studentCountries.length > 0

      if (hasPreferences) {
        const candidateIds = await searchCandidatePrograms(
          studentFields,
          studentCountries,
          studentPoints
        )

        if (candidateIds.length > 0) {
          // Filter to only candidate programs
          const candidateIdSet = new Set(candidateIds)
          programs = allPrograms.filter((p) => candidateIdSet.has(p.id))
          usedAlgoliaFilter = true

          logger.info('Algolia pre-filter applied', {
            allPrograms: allPrograms.length,
            candidates: programs.length,
            reduction: `${Math.round((1 - programs.length / allPrograms.length) * 100)}%`
          })
        }
      }
    }

    logger.debug('Data fetched', {
      studentId,
      programCount: programs.length,
      hasIBPoints: !!studentProfile.totalIBPoints,
      usedAlgoliaFilter
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

    const duration = performance.now() - startTime

    logger.info('Matches retrieved successfully', {
      studentId,
      matchCount: matches.length,
      topScore: matches[0]?.overallScore,
      duration: Math.round(duration),
      usedAlgoliaFilter
    })

    // Return top 15 matches with full program data
    const topMatches = matches.slice(0, 15)

    // Enrich matches with full program data (use allPrograms for enrichment)
    const enrichedMatches = topMatches.map((match) => {
      const program = allPrograms.find((p) => p.id === match.programId)
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
