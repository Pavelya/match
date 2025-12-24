/**
 * Admin Student Detail API Route
 *
 * GET /api/admin/students/[id] - Get student details
 * DELETE /api/admin/students/[id] - Delete student account (with email notification)
 *
 * Follows existing patterns from admin coordinator routes.
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { sendAccountDeletedEmail } from '@/lib/email/account-emails'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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
      select: {
        id: true,
        email: true,
        name: true,
        studentProfile: { select: { id: true } }
      }
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Capture student info before deletion for email and logging
    const studentEmail = student.email
    const studentName = student.name
    const redactedEmail = studentEmail.replace(/(.{2}).*(@.*)/, '$1***$2')

    logger.info('Admin student deletion initiated', {
      studentId: id.slice(0, 8),
      deletedBy: session.user.id.slice(0, 8)
    })

    // Delete in explicit order to respect foreign key constraints
    // (Prisma cascade should handle most, but being explicit for safety)

    if (student.studentProfile) {
      // 1. Delete saved programs
      await prisma.savedProgram.deleteMany({
        where: { studentProfileId: student.studentProfile.id }
      })

      // 2. Delete student courses
      await prisma.studentCourse.deleteMany({
        where: { studentProfileId: student.studentProfile.id }
      })

      // 3. Delete student profile
      await prisma.studentProfile.delete({
        where: { id: student.studentProfile.id }
      })
    }

    // 4. Delete support tickets
    await prisma.supportTicket.deleteMany({
      where: { userId: id }
    })

    // 5. Delete sessions
    await prisma.session.deleteMany({
      where: { userId: id }
    })

    // 6. Delete OAuth accounts
    await prisma.account.deleteMany({
      where: { userId: id }
    })

    // 7. Delete verification tokens by email
    await prisma.verificationToken.deleteMany({
      where: { identifier: studentEmail }
    })

    // 8. Delete user
    await prisma.user.delete({
      where: { id }
    })

    logger.info('Admin student deletion completed', {
      studentId: id.slice(0, 8),
      email: redactedEmail,
      deletedBy: session.user.id.slice(0, 8)
    })

    // Send deletion confirmation email (non-blocking)
    sendAccountDeletedEmail({
      to: studentEmail,
      userName: studentName || undefined
    }).catch((emailError) => {
      logger.error('Failed to send deletion email', {
        error: emailError instanceof Error ? emailError.message : 'Unknown error',
        studentId: id.slice(0, 8)
      })
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
