/**
 * Resend Student Invitation API Route
 *
 * POST /api/coordinator/students/invite/resend
 *
 * Resends an invitation email for a pending student invitation.
 * - Validates coordinator session and school ownership
 * - Regenerates token and updates expiry
 * - Resends invitation email
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
import StudentInviteEmail from '@/emails/student-invite'

const INVITATION_EXPIRY_DAYS = 7

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
            name: true
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

    // 3. Parse request body
    const body = await request.json()
    const { invitationId } = body

    if (!invitationId || typeof invitationId !== 'string') {
      return NextResponse.json({ error: 'Invitation ID is required' }, { status: 400 })
    }

    // 4. Find the invitation and verify ownership
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId }
    })

    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
    }

    // Verify the invitation belongs to this school
    if (invitation.schoolId !== coordinator.school.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Verify it's a student invitation
    if (invitation.role !== 'STUDENT') {
      return NextResponse.json({ error: 'This is not a student invitation' }, { status: 400 })
    }

    // Verify it's still pending
    if (invitation.status !== 'PENDING') {
      return NextResponse.json({ error: 'Can only resend pending invitations' }, { status: 400 })
    }

    // 5. Generate new token and update expiry
    const newToken = crypto.randomBytes(32).toString('base64url').slice(0, 48)
    const newExpiresAt = new Date()
    newExpiresAt.setDate(newExpiresAt.getDate() + INVITATION_EXPIRY_DAYS)

    await prisma.invitation.update({
      where: { id: invitationId },
      data: {
        token: newToken,
        expiresAt: newExpiresAt
      }
    })

    // 6. Build invitation URL
    const baseUrl = env.NEXT_PUBLIC_APP_URL || env.NEXTAUTH_URL
    const inviteUrl = `${baseUrl}/auth/accept-student-invite/${newToken}`

    // 7. Send email
    const { error: emailError } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: invitation.email,
      subject: `Reminder: You're invited to join ${coordinator.school.name} on IB Match`,
      react: StudentInviteEmail({
        inviteUrl,
        schoolName: coordinator.school.name,
        coordinatorName: coordinator.user.name || undefined,
        expiresInDays: INVITATION_EXPIRY_DAYS
      })
    })

    if (emailError) {
      logger.error('Failed to resend student invitation email', {
        invitationId,
        error: emailError.message
      })
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    // 8. Log success
    const redactedEmail = invitation.email.replace(/(.{2}).*(@.*)/, '$1***$2')
    logger.info('Student invitation resent', {
      invitationId,
      email: redactedEmail,
      schoolId: coordinator.school.id,
      coordinatorId: coordinator.id
    })

    return NextResponse.json({
      success: true,
      message: 'Invitation resent successfully',
      expiresAt: newExpiresAt
    })
  } catch (error) {
    logger.error('Resend student invitation error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
