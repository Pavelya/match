/**
 * Admin Student Detail API Route
 *
 * GET /api/admin/students/[id] - Get student details
 * DELETE /api/admin/students/[id] - Delete student account (with email notification)
 *
 * Follows existing patterns from admin coordinator routes.
 */

import { NextRequest, NextResponse, after } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { applyRateLimit } from '@/lib/rate-limit'
import { sendAccountDeletedEmail } from '@/lib/email/account-emails'
import { deleteStudentAccount } from '@/lib/account/delete-student'
import { invalidateStudentCache } from '@/lib/matching/cache'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rateLimited = await applyRateLimit('api', session.user.id)
    if (rateLimited) return rateLimited

    const adminUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (adminUser?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params

    const student = await prisma.user.findUnique({
      where: { id, role: 'STUDENT' },
      include: {
        studentProfile: {
          include: {
            school: {
              select: {
                id: true,
                name: true,
                city: true,
                subscriptionTier: true,
                country: { select: { name: true, flagEmoji: true } }
              }
            },
            _count: {
              select: {
                courses: true,
                savedPrograms: true
              }
            }
          }
        }
      }
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    return NextResponse.json({ student })
  } catch (error) {
    logger.error('Get student error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rateLimited = await applyRateLimit('api', session.user.id)
    if (rateLimited) return rateLimited

    const adminUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (adminUser?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params

    // Find student user
    const student = await prisma.user.findUnique({
      where: { id, role: 'STUDENT' },
      select: { email: true }
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    const redactedEmail = student.email.replace(/(.{2}).*(@.*)/, '$1***$2')

    logger.info('Admin student deletion initiated', {
      studentId: id.slice(0, 8),
      deletedBy: session.user.id.slice(0, 8)
    })

    // The same deletion as the student's own, in one transaction, so a failure part-way leaves
    // the whole account rather than part of it (MAINT 5.25)
    const deleted = await prisma.$transaction((tx) => deleteStudentAccount(tx, id))

    logger.info('Admin student deletion completed', {
      studentId: id.slice(0, 8),
      email: redactedEmail,
      deletedBy: session.user.id.slice(0, 8)
    })

    // After the response, which Vercel would otherwise not wait for (MAINT 5.24): "Account
    // deleted", and the student's cached matches (5.25). Neither can fail the deletion
    after(async () => {
      await Promise.allSettled([
        sendAccountDeletedEmail({
          to: deleted.email,
          userName: deleted.name || undefined,
          deletedBy: 'admin'
        }),
        invalidateStudentCache(id)
      ])
    })

    return NextResponse.json({
      success: true,
      message: 'Student account deleted successfully'
    })
  } catch (error) {
    logger.error('Delete student error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    )
  }
}
