/**
 * Data Export API Route
 *
 * GET /api/students/account/export
 *
 * GDPR Article 20 - Right to Data Portability
 * Returns all user data in JSON format for download.
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { applyRateLimit } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

export async function GET() {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Apply rate limiting (use profile limiter - 10 per minute)
    const rateLimitResponse = await applyRateLimit('profile', session.user.id)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Fetch all user data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        studentProfile: {
          include: {
            school: {
              select: {
                name: true,
                country: {
                  select: { name: true }
                }
              }
            },
            courses: {
              include: {
                ibCourse: {
                  select: {
                    name: true,
                    group: true
                  }
                }
              }
            },
            preferredFields: {
              select: {
                name: true
              }
            },
            preferredCountries: {
              select: {
                name: true,
                code: true
              }
            },
            savedPrograms: {
              include: {
                program: {
                  select: {
                    name: true,
                    university: {
                      select: { name: true }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Format data for export
    const exportData = {
      exportDate: new Date().toISOString(),
      exportVersion: '1.0',
      account: {
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      academicProfile: user.studentProfile
        ? {
            totalIBPoints: user.studentProfile.totalIBPoints,
            tokGrade: user.studentProfile.tokGrade,
            eeGrade: user.studentProfile.eeGrade,
            school: user.studentProfile.school
              ? {
                  name: user.studentProfile.school.name,
                  country: user.studentProfile.school.country?.name
                }
              : null,
            courses: user.studentProfile.courses.map((c) => ({
              name: c.ibCourse.name,
              group: c.ibCourse.group,
              level: c.level,
              grade: c.grade
            })),
            createdAt: user.studentProfile.createdAt,
            updatedAt: user.studentProfile.updatedAt
          }
        : null,
      preferences: user.studentProfile
        ? {
            fields: user.studentProfile.preferredFields.map((f) => f.name),
            countries: user.studentProfile.preferredCountries.map((c) => ({
              name: c.name,
              code: c.code
            }))
          }
        : null,
      savedPrograms: user.studentProfile
        ? user.studentProfile.savedPrograms.map((sp) => ({
            programName: sp.program.name,
            universityName: sp.program.university.name,
            savedAt: sp.createdAt
          }))
        : []
    }

    return NextResponse.json(exportData)
  } catch (error) {
    logger.error('Data export error', { error })
    return NextResponse.json({ error: 'Failed to export data' }, { status: 500 })
  }
}
