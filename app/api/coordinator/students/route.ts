/**
 * Coordinator Students List API Endpoint
 *
 * GET: List students for coordinator's school with filtering
 *
 * Features:
 * - Filter by coordinator's schoolId (automatic)
 * - Include consent status
 * - Pagination support (page, limit)
 * - Search by name/email
 * - Filter by consent status
 *
 * Part of Task 4.6.4: Create student management API endpoints
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { Prisma } from '@prisma/client'

// GET: List students for coordinator's school
export async function GET(request: NextRequest) {
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
          select: { id: true }
        }
      }
    })

    if (!coordinator?.school) {
      return NextResponse.json({ error: 'Coordinator profile not found' }, { status: 403 })
    }

    const schoolId = coordinator.school.id

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100) // Max 100
    const search = searchParams.get('search') || ''
    const consentStatus = searchParams.get('consent') as 'all' | 'consented' | 'pending' | null

    // Build where clause
    const where: Prisma.StudentProfileWhereInput = {
      schoolId
    }

    // Search by name or email
    if (search) {
      where.user = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      }
    }

    // Filter by consent status
    if (consentStatus === 'consented') {
      where.coordinatorAccessConsentAt = { not: null }
    } else if (consentStatus === 'pending') {
      where.coordinatorAccessConsentAt = null
    }

    // Get total count for pagination
    const totalCount = await prisma.studentProfile.count({ where })

    // Fetch students with pagination
    const students = await prisma.studentProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true
          }
        },
        courses: {
          select: { id: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    // Transform for response
    const data = students.map((student) => ({
      id: student.id,
      userId: student.user.id,
      name: student.user.name,
      email: student.user.email,
      image: student.user.image,
      totalIBPoints: student.totalIBPoints,
      coursesCount: student.courses.length,
      hasConsent: student.coordinatorAccessConsentAt !== null,
      consentDate: student.coordinatorAccessConsentAt?.toISOString() || null,
      createdAt: student.createdAt.toISOString(),
      joinedDate: student.user.createdAt.toISOString()
    }))

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit)
    const hasNextPage = page < totalPages
    const hasPreviousPage = page > 1

    return NextResponse.json({
      students: data,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage
      }
    })
  } catch (error) {
    logger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      'Failed to fetch students list'
    )
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 })
  }
}
