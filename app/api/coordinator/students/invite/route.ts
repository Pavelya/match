/**
 * Coordinator Student Invitation API Route
 *
 * POST /api/coordinator/students/invite
 *
 * Creates an invitation for a student to link their account to the school.
 * - Validates coordinator session and access level
 * - Checks invite capacity (unlimited for VIP/paid, 10 max for freemium)
 * - Checks if email already has an account (different flow)
 * - Generates secure token
 * - Creates Invitation record with role: STUDENT
 * - Sends invitation email via Resend
 *
 * Part of Task 4.4: Student Invitation System
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/email/client'
import { logger } from '@/lib/logger'
import { env } from '@/lib/env'
import { getCoordinatorAccess } from '@/lib/auth/access-control'
import StudentInviteEmail from '@/emails/student-invite'

// Token expiry: 7 days
const INVITATION_EXPIRY_DAYS = 7

/**
 * Creates a link request invitation for an existing student without a school
 * The student will see this in their pending invitations
 */
async function createLinkRequestInvitation({
  existingUser,
  school,
  coordinator,
  invitedById,
  studentName
}: {
  existingUser: {
    id: string
    email: string
    studentProfile: { id: string; schoolId: string | null } | null
  }
  school: { id: string; name: string }
  coordinator: { id: string; user: { name: string | null } }
  invitedById: string
  studentName?: string
}) {
  // Check for existing pending invitation from this school
  const existingInvitation = await prisma.invitation.findFirst({
    where: {
      email: existingUser.email,
      schoolId: school.id,
      status: 'PENDING',
      expiresAt: { gt: new Date() }
    }
  })

  if (existingInvitation) {
    return NextResponse.json(
      { error: 'A pending invitation already exists for this student from your school' },
      { status: 409 }
    )
  }

  // Generate secure token
  const token = crypto.randomBytes(32).toString('base64url').slice(0, 48)
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + INVITATION_EXPIRY_DAYS)

  // Create invitation record (for existing student - link request)
  const invitation = await prisma.invitation.create({
    data: {
      email: existingUser.email,
      token,
      role: 'STUDENT',
      status: 'PENDING',
      expiresAt,
      schoolId: school.id,
      invitedById,
      studentName: studentName || null,
      coordinatorAccessConsent: false
    }
  })

  // Send notification email
  const baseUrl = env.NEXT_PUBLIC_APP_URL || env.NEXTAUTH_URL
  const inviteUrl = `${baseUrl}/student/invitations`

  const { error: emailError } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: existingUser.email,
    subject: `${school.name} wants to connect with your IB Match account`,
    react: StudentInviteEmail({
      inviteUrl,
      schoolName: school.name,
      coordinatorName: coordinator.user.name || undefined,
      expiresInDays: INVITATION_EXPIRY_DAYS
    })
  })

  if (emailError) {
    logger.error('Failed to send link request email', {
      invitationId: invitation.id,
      error: emailError.message
    })

    await prisma.invitation.update({
      where: { id: invitation.id },
      data: { status: 'CANCELLED' }
    })

    return NextResponse.json(
      { error: 'Failed to send invitation email. Please try again.' },
      { status: 500 }
    )
  }

  const redactedEmail = existingUser.email.replace(/(.{2}).*(@.*)/, '$1***$2')
  logger.info('Link request invitation sent to existing student', {
    invitationId: invitation.id,
    email: redactedEmail,
    schoolId: school.id,
    existingUserId: existingUser.id
  })

  return NextResponse.json({
    success: true,
    message: 'Invitation sent successfully',
    existingStudent: true,
    invitation: {
      id: invitation.id,
      email: existingUser.email,
      studentName: studentName || null,
      schoolName: school.name,
      expiresAt: invitation.expiresAt
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    // 1. Validate coordinator session
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Get coordinator profile and school
    const coordinator = await prisma.coordinatorProfile.findFirst({
      where: { userId: session.user.id },
      include: {
        user: {
          select: { name: true }
        },
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
      return NextResponse.json(
        { error: 'Coordinator profile or school not found' },
        { status: 404 }
      )
    }

    // Check if coordinator is active
    if (!coordinator.isActive) {
      return NextResponse.json(
        { error: 'Your coordinator access has been revoked' },
        { status: 403 }
      )
    }

    const school = coordinator.school

    // 3. Check access level and invite capacity
    const access = getCoordinatorAccess(school)

    // Count current students linked to school
    const currentStudentCount = await prisma.studentProfile.count({
      where: { schoolId: school.id }
    })

    // Count pending student invitations
    const pendingInviteCount = await prisma.invitation.count({
      where: {
        schoolId: school.id,
        role: 'STUDENT',
        status: 'PENDING',
        expiresAt: { gt: new Date() }
      }
    })

    const totalStudentCount = currentStudentCount + pendingInviteCount

    if (!access.canInviteStudents(totalStudentCount)) {
      return NextResponse.json(
        {
          error: 'Student invitation limit reached',
          message: 'Upgrade your subscription to invite more students.',
          limit: access.maxStudents,
          current: totalStudentCount
        },
        { status: 403 }
      )
    }

    // 4. Parse and validate request body
    const body = await request.json()
    const { email, studentName } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // 5. Check if email already has a user/student
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        studentProfile: {
          select: { id: true, schoolId: true }
        }
      }
    })

    if (existingUser) {
      // User exists - check if they're already a student linked to this school
      if (existingUser.studentProfile?.schoolId === school.id) {
        return NextResponse.json(
          { error: 'This student is already linked to your school' },
          { status: 409 }
        )
      }

      // User exists AND has a student profile linked to ANOTHER school
      if (existingUser.studentProfile?.schoolId) {
        return NextResponse.json(
          {
            error: 'This student is already linked to another school',
            message: 'They must unlink from their current school before joining yours.'
          },
          { status: 409 }
        )
      }

      // User exists but isn't a student (could be coordinator or other role)
      if (existingUser.role !== 'STUDENT') {
        return NextResponse.json(
          { error: 'This email is already registered with a different account type' },
          { status: 409 }
        )
      }

      // User exists, is a student, but has no school linked - create link request invitation
      // This will show up in their pending invitations
      return await createLinkRequestInvitation({
        existingUser,
        school,
        coordinator,
        invitedById: session.user.id,
        studentName
      })
    }

    // 6. Check for pending invitation for this email
    const existingInvitation = await prisma.invitation.findFirst({
      where: {
        email: normalizedEmail,
        status: 'PENDING',
        expiresAt: { gt: new Date() }
      }
    })

    if (existingInvitation) {
      return NextResponse.json(
        { error: 'A pending invitation already exists for this email' },
        { status: 409 }
      )
    }

    // 7. Generate secure token (48 chars, URL-safe)
    const token = crypto.randomBytes(32).toString('base64url').slice(0, 48)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + INVITATION_EXPIRY_DAYS)

    // 8. Create invitation record
    const invitation = await prisma.invitation.create({
      data: {
        email: normalizedEmail,
        token,
        role: 'STUDENT',
        status: 'PENDING',
        expiresAt,
        schoolId: school.id,
        invitedById: session.user.id,
        studentName: studentName || null,
        coordinatorAccessConsent: false // Will be set to true when student accepts
      }
    })

    // 9. Build invitation URL
    const baseUrl = env.NEXT_PUBLIC_APP_URL || env.NEXTAUTH_URL
    const inviteUrl = `${baseUrl}/auth/accept-student-invite/${token}`

    // 10. Send invitation email
    const { error: emailError } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: normalizedEmail,
      subject: `You're invited to join ${school.name} on IB Match`,
      react: StudentInviteEmail({
        inviteUrl,
        schoolName: school.name,
        coordinatorName: coordinator.user.name || undefined,
        expiresInDays: INVITATION_EXPIRY_DAYS
      })
    })

    if (emailError) {
      // Log error but don't expose details to client
      logger.error('Failed to send student invitation email', {
        invitationId: invitation.id,
        error: emailError.message
      })

      // Mark invitation as cancelled
      await prisma.invitation.update({
        where: { id: invitation.id },
        data: { status: 'CANCELLED' }
      })

      return NextResponse.json(
        { error: 'Failed to send invitation email. Please try again.' },
        { status: 500 }
      )
    }

    // 11. Log success (redacted email per SEC_tasks.md)
    const redactedEmail = normalizedEmail.replace(/(.{2}).*(@.*)/, '$1***$2')
    logger.info('Student invitation sent', {
      invitationId: invitation.id,
      email: redactedEmail,
      schoolId: school.id,
      coordinatorId: coordinator.id
    })

    return NextResponse.json({
      success: true,
      message: 'Invitation sent successfully',
      invitation: {
        id: invitation.id,
        email: normalizedEmail,
        studentName: studentName || null,
        schoolName: school.name,
        expiresAt: invitation.expiresAt
      }
    })
  } catch (error) {
    logger.error('Student invitation API error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

/**
 * GET /api/coordinator/students/invite
 *
 * List pending student invitations for the coordinator's school
 */
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const coordinator = await prisma.coordinatorProfile.findFirst({
      where: { userId: session.user.id },
      include: {
        school: {
          select: { id: true }
        }
      }
    })

    if (!coordinator?.school) {
      return NextResponse.json(
        { error: 'Coordinator profile or school not found' },
        { status: 404 }
      )
    }

    const invitations = await prisma.invitation.findMany({
      where: {
        schoolId: coordinator.school.id,
        role: 'STUDENT',
        status: 'PENDING'
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        status: true,
        expiresAt: true,
        createdAt: true,
        invitedBy: {
          select: { name: true }
        }
      }
    })

    return NextResponse.json({
      invitations,
      count: invitations.length
    })
  } catch (error) {
    logger.error('Get student invitations error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
