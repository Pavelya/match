/**
 * Coordinator Analytics API
 *
 * Provides school-wide analytics data for coordinators.
 *
 * Access Control:
 * - Basic stats: All coordinators
 * - Advanced analytics: VIP or subscribed REGULAR only
 *
 * Data Returned:
 * - Total students (with consent)
 * - Average IB score
 * - Match distribution
 * - Top fields/countries (advanced)
 * - Profile completion rate (advanced)
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { getCoordinatorAccess } from '@/lib/auth/access-control'
import { logger } from '@/lib/logger'
import { getCachedMatches } from '@/lib/matching'
import { getCachedPrograms } from '@/lib/matching/program-cache'
import { transformStudent, transformPrograms } from '@/lib/matching/transformers'
import type { PrismaStudentWithRelations } from '@/lib/matching/transformers'

export async function GET() {
  try {
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
            name: true,
            subscriptionTier: true,
            subscriptionStatus: true
          }
        }
      }
    })

    if (!coordinator?.school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 })
    }

    const school = coordinator.school
    const access = getCoordinatorAccess(school)

    // Fetch all students with consent
    const students = await prisma.studentProfile.findMany({
      where: {
        schoolId: school.id,
        coordinatorAccessConsentAt: { not: null }
      },
      include: {
        courses: { include: { ibCourse: true } },
        preferredFields: { select: { id: true, name: true } },
        preferredCountries: { select: { id: true, name: true } }
      }
    })

    const studentCount = students.length

    // Aggregate IB points
    const studentsWithPoints = students.filter((s) => s.totalIBPoints !== null)
    const avgIBPoints =
      studentsWithPoints.length > 0
        ? Math.round(
            studentsWithPoints.reduce((sum, s) => sum + (s.totalIBPoints || 0), 0) /
              studentsWithPoints.length
          )
        : 0

    // Basic response for freemium
    const basicStats = {
      totalStudents: studentCount,
      avgIBPoints,
      hasFullAccess: access.hasFullAccess
    }

    // If not full access, return basic stats only
    if (!access.hasFullAccess) {
      return NextResponse.json({
        ...basicStats,
        advanced: null
      })
    }

    // Advanced stats for VIP/subscribed coordinators
    const completeProfiles = students.filter(
      (s) => s.totalIBPoints !== null && s.courses.length >= 6
    ).length
    const profileCompletionRate =
      studentCount > 0 ? Math.round((completeProfiles / studentCount) * 100) : 0

    // Calculate field popularity
    const fieldCounts: Record<string, number> = {}
    students.forEach((s) => {
      s.preferredFields.forEach((f) => {
        fieldCounts[f.name] = (fieldCounts[f.name] || 0) + 1
      })
    })
    const topFields = Object.entries(fieldCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    // Calculate country popularity
    const countryCounts: Record<string, number> = {}
    students.forEach((s) => {
      s.preferredCountries.forEach((c) => {
        countryCounts[c.name] = (countryCounts[c.name] || 0) + 1
      })
    })
    const topCountries = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    // Calculate match distribution (percentage buckets)
    // This requires running matching for each student - only for schools with < 50 students
    let matchDistribution: { bucket: string; count: number }[] | null = null

    if (studentCount > 0 && studentCount <= 50) {
      const programs = await getCachedPrograms()
      const transformedPrograms = transformPrograms(programs)

      const matchScores: number[] = []

      for (const student of students) {
        if (student.totalIBPoints !== null && student.courses.length > 0) {
          const transformedStudent = transformStudent(student as PrismaStudentWithRelations)
          const matches = await getCachedMatches(
            student.userId,
            transformedStudent,
            transformedPrograms
          )

          // Get top match score
          if (matches.length > 0) {
            const topScore = matches[0].overallScore * 100
            matchScores.push(topScore)
          }
        }
      }

      // Create distribution buckets
      if (matchScores.length > 0) {
        const buckets = [
          { label: '90-100%', min: 90, max: 100, count: 0 },
          { label: '80-89%', min: 80, max: 89, count: 0 },
          { label: '70-79%', min: 70, max: 79, count: 0 },
          { label: '60-69%', min: 60, max: 69, count: 0 },
          { label: 'Below 60%', min: 0, max: 59, count: 0 }
        ]

        matchScores.forEach((score) => {
          const bucket = buckets.find((b) => score >= b.min && score <= b.max)
          if (bucket) bucket.count++
        })

        matchDistribution = buckets.map((b) => ({ bucket: b.label, count: b.count }))
      }
    }

    return NextResponse.json({
      ...basicStats,
      advanced: {
        completeProfiles,
        profileCompletionRate,
        topFields,
        topCountries,
        matchDistribution
      }
    })
  } catch (error) {
    logger.error('Failed to fetch analytics', { error })
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
