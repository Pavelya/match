/**
 * Resend Invitation API Route
 *
 * POST /api/admin/invite/resend
 *
 * Resends an invitation email for a pending invitation.
 *
 * Part of Task 3.3: Coordinator Invitation System
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/email/client'
import { logger } from '@/lib/logger'
import { env } from '@/lib/env'
import CoordinatorInviteEmail from '@/emails/coordinator-invite'

const INVITATION_EXPIRY_DAYS = 7

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true, name: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { invitationId } = body

    if (!invitationId) {
      return NextResponse.json({ error: 'Invitation ID is required' }, { status: 400 })
    }

    // Find the invitation
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
      include: {
        school: { select: { name: true } }
      }
    })

    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
    }

    if (invitation.status !== 'PENDING') {
      return NextResponse.json({ error: 'Can only resend pending invitations' }, { status: 400 })
    }

    // Generate new token and update expiry
    const newToken = crypto.randomBytes(32).toString('hex')
    const newExpiresAt = new Date()
    newExpiresAt.setDate(newExpiresAt.getDate() + INVITATION_EXPIRY_DAYS)

    await prisma.invitation.update({
      where: { id: invitationId },
      data: {
        token: newToken,
        expiresAt: newExpiresAt
      }
    })

    // Build invitation URL
    const baseUrl = env.NEXT_PUBLIC_APP_URL || env.NEXTAUTH_URL
    const inviteUrl = `${baseUrl}/auth/accept-invite/${newToken}`

    // Send email
    const { error: emailError } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: invitation.email,
      subject: `Reminder: You're invited to join ${invitation.school?.name || 'a school'} on IB Match`,
      react: CoordinatorInviteEmail({
        inviteUrl,
        schoolName: invitation.school?.name || 'the school',
        inviterName: user.name || undefined,
        expiresInDays: INVITATION_EXPIRY_DAYS
      })
    })

    if (emailError) {
      logger.error('Failed to resend invitation email', {
        invitationId,
        error: emailError.message
      })
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    const redactedEmail = invitation.email.replace(/(.{2}).*(@.*)/, '$1***$2')
    logger.info('Invitation resent', {
      invitationId,
      email: redactedEmail
    })

    return NextResponse.json({
      success: true,
      message: 'Invitation resent successfully',
      expiresAt: newExpiresAt
    })
  } catch (error) {
    logger.error('Resend invitation error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
