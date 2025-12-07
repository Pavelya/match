/**
 * Pre-compute Matches API Route
 *
 * POST /api/students/matches/precompute
 *
 * Triggered after profile save to pre-populate the matches cache.
 * This ensures /student/matches is always fast (cache hit).
 *
 * Security: Requires x-internal-key header or valid session.
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { getCachedMatches } from '@/lib/matching'
import { getCachedPrograms } from '@/lib/matching/program-cache'
import { transformStudent, transformPrograms } from '@/lib/matching/transformers'
import { logger } from '@/lib/logger'
import { searchCandidatePrograms, isAlgoliaAvailable } from '@/lib/algolia/search'

export async function POST(request: NextRequest) {
  const startTime = performance.now()

  try {
    // Get studentId from request body or session
    let studentId: string | null = null

    // Check for internal API key (for fire-and-forget calls)
    const internalKey = request.headers.get('x-internal-key')
    if (internalKey && internalKey === process.env.INTERNAL_API_KEY) {
      const body = await request.json()
      studentId = body.studentId
    } else {
      // Fall back to session auth
      const session = await auth()
      studentId = session?.user?.id ?? null
    }

    if (!studentId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    logger.info('Pre-computing matches', { studentId })

    // Fetch student profile
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
      logger.warn('Student profile not found for precompute', { studentId })
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 })
    }

    // Fetch all programs from cache
    const allPrograms = await getCachedPrograms()

    // Pre-filter using Algolia if available
    let programs = allPrograms
    let usedAlgoliaFilter = false

    if (isAlgoliaAvailable()) {
      const studentPoints = studentProfile.totalIBPoints || 0
      const studentFields = studentProfile.preferredFields.map((f) => f.id)
      const studentCountries = studentProfile.preferredCountries.map((c) => c.id)

      const hasPreferences = studentFields.length > 0 || studentCountries.length > 0

      if (hasPreferences) {
        const candidateIds = await searchCandidatePrograms(
          studentFields,
          studentCountries,
          studentPoints
        )

        if (candidateIds.length > 0) {
          const candidateIdSet = new Set(candidateIds)
          programs = allPrograms.filter((p) => candidateIdSet.has(p.id))
          usedAlgoliaFilter = true
        }
      }
    }

    // Transform to matching algorithm types
    const transformedStudent = transformStudent(studentProfile)
    const transformedPrograms = transformPrograms(programs)

    // Calculate and cache matches (this populates the Redis cache)
    const matches = await getCachedMatches(
      studentId,
      transformedStudent,
      transformedPrograms,
      'BALANCED'
    )

    const duration = performance.now() - startTime

    logger.info('Matches pre-computed successfully', {
      studentId,
      matchCount: matches.length,
      topScore: matches[0]?.overallScore,
      duration: Math.round(duration),
      usedAlgoliaFilter
    })

    return NextResponse.json({
      success: true,
      matchCount: matches.length,
      duration: Math.round(duration),
      usedAlgoliaFilter
    })
  } catch (error) {
    logger.error('Failed to pre-compute matches', { error })
    return NextResponse.json({ error: 'Failed to pre-compute matches' }, { status: 500 })
  }
}
