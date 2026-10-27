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

    // Everything the export writes, and nothing more (select, not include)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        lastActiveAt: true,
        inactivityNoticeSentAt: true,
        termsVersion: true,
        termsAcceptedAt: true,
        privacyPolicyVersion: true,
        privacyAcceptedAt: true,
        // Not who resolved a ticket: that is another person's data
        supportTickets: {
          select: {
            ticketNumber: true,
            category: true,
            status: true,
            subject: true,
            message: true,
            adminResponse: true,
            createdAt: true,
            updatedAt: true,
            resolvedAt: true
          },
          orderBy: { createdAt: 'asc' }
        },
        studentProfile: {
          select: {
            totalIBPoints: true,
            tokGrade: true,
            eeGrade: true,
            openToAllLocations: true,
            linkedByInvitation: true,
            coordinatorAccessConsentAt: true,
            coordinatorAccessConsentVersion: true,
            createdAt: true,
            updatedAt: true,
            school: {
              select: {
                name: true,
                country: {
                  select: { name: true }
                }
              }
            },
            courses: {
              select: {
                level: true,
                grade: true,
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
              select: {
                createdAt: true,
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

    // School invitations sent to their address, matched as deleting the account matches them
    // (lib/account/delete-student.ts). Not who sent one, or the link's token
    const invitations = await prisma.invitation.findMany({
      where: { role: 'STUDENT', email: { equals: user.email, mode: 'insensitive' } },
      select: {
        status: true,
        createdAt: true,
        expiresAt: true,
        acceptedAt: true,
        school: { select: { name: true } }
      },
      orderBy: { createdAt: 'asc' }
    })

    // Format data for export
    const exportData = {
      exportDate: new Date().toISOString(),
      exportVersion: '1.2',
      account: {
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        // MAINT 7.6: the day last seen signed in, and when an inactivity notice was sent
        lastActiveAt: user.lastActiveAt,
        inactivityNoticeSentAt: user.inactivityNoticeSentAt
      },
      consent: {
        termsVersion: user.termsVersion,
        termsAcceptedAt: user.termsAcceptedAt,
        privacyPolicyVersion: user.privacyPolicyVersion,
        privacyAcceptedAt: user.privacyAcceptedAt,
        // What the student agreed to when a school invitation linked them
        coordinatorAccess: user.studentProfile
          ? {
              linkedByInvitation: user.studentProfile.linkedByInvitation,
              consentedAt: user.studentProfile.coordinatorAccessConsentAt,
              consentVersion: user.studentProfile.coordinatorAccessConsentVersion
            }
          : null
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
            })),
            // "Open to anywhere", saved by first run since rebranding 3.1, with no countries
            openToAllLocations: user.studentProfile.openToAllLocations
          }
        : null,
      savedPrograms: user.studentProfile
        ? user.studentProfile.savedPrograms.map((sp) => ({
            programName: sp.program.name,
            universityName: sp.program.university.name,
            savedAt: sp.createdAt
          }))
        : [],
      supportTickets: user.supportTickets.map((t) => ({
        ticketNumber: t.ticketNumber,
        category: t.category,
        status: t.status,
        subject: t.subject,
        message: t.message,
        reply: t.adminResponse,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
        resolvedAt: t.resolvedAt
      })),
      invitations: invitations.map((i) => ({
        school: i.school?.name ?? null,
        status: i.status,
        sentAt: i.createdAt,
        expiresAt: i.expiresAt,
        acceptedAt: i.acceptedAt
      }))
    }

    return NextResponse.json(exportData)
  } catch (error) {
    logger.error('Data export error', { error })
    return NextResponse.json({ error: 'Failed to export data' }, { status: 500 })
  }
}
