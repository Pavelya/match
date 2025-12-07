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
        { error: 'Student profile not found. Please complete onboarding first.' },
        { status: 404 }
      )
    }

    // Fetch all programs from cache
    const programsStart = performance.now()
    const allPrograms = await getCachedPrograms()
    timings.fetchPrograms = Math.round(performance.now() - programsStart)

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
        const algoliaStart = performance.now()
        const candidateIds = await searchCandidatePrograms(
          studentFields,
          studentCountries,
          studentPoints
        )
        timings.algoliaSearch = Math.round(performance.now() - algoliaStart)

        // Only use Algolia filter if we have enough candidates (at least 50)
        // to ensure we can return 10 good matches
        if (candidateIds.length >= 50) {
          // Filter to only candidate programs
          const candidateIdSet = new Set(candidateIds)
          programs = allPrograms.filter((p) => candidateIdSet.has(p.id))
          usedAlgoliaFilter = true
        } else {
          logger.info('Algolia returned too few candidates, using all programs', {
            candidateCount: candidateIds.length,
            threshold: 50
          })
        }
      }
    }

    // Transform Prisma types to matching algorithm types
    const transformStart = performance.now()
    const transformedStudent = transformStudent(studentProfile)
    const transformedPrograms = transformPrograms(programs)
    timings.transform = Math.round(performance.now() - transformStart)

    // Get matches (with caching)
    const matchStart = performance.now()
    const matches = await getCachedMatches(
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
      programCount: {
        total: allPrograms.length,
        filtered: programs.length,
        reduction: usedAlgoliaFilter
          ? `${Math.round((1 - programs.length / allPrograms.length) * 100)}%`
          : 'none'
      },
      matchCount: matches.length,
      usedAlgoliaFilter,
      topScore: matches[0]?.overallScore
    })

    // Return top 10 matches with full program data
    const topMatches = matches.slice(0, 10)

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
