/**
 * Admin Invitation API Route
 *
 * POST /api/admin/invite
 *
 * Creates an invitation for a coordinator to join a school.
 * - Validates admin session
 * - Checks for existing invitations/users
 * - Generates secure token
 * - Sends invitation email via Resend
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

// Token expiry: 7 days
const INVITATION_EXPIRY_DAYS = 7

export async function POST(request: NextRequest) {
  try {
    // 1. Validate admin session
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true, name: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    // 2. Parse and validate request body
    const body = await request.json()
    const { email, schoolId, role = 'COORDINATOR' } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (!schoolId || typeof schoolId !== 'string') {
      return NextResponse.json({ error: 'School ID is required' }, { status: 400 })
    }

    // Validate role
    if (role !== 'COORDINATOR') {
      return NextResponse.json(
        { error: 'Only COORDINATOR role is supported for invitations' },
        { status: 400 }
      )
    }

    // 3. Check school exists
    const school = await prisma.iBSchool.findUnique({
      where: { id: schoolId },
      select: { id: true, name: true }
    })

    if (!school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 })
    }

    // 4. Check if email already has a user
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, role: true }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 409 })
    }

    // 5. Check for pending invitation
    const pendingInvitation = await prisma.invitation.findFirst({
      where: {
        email: email.toLowerCase(),
        status: 'PENDING',
        expiresAt: { gt: new Date() }
      }
    })

    if (pendingInvitation) {
      return NextResponse.json(
        { error: 'A pending invitation already exists for this email' },
        { status: 409 }
      )
    }

    // 6. Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + INVITATION_EXPIRY_DAYS)

    // 7. Create invitation record
    const invitation = await prisma.invitation.create({
      data: {
        email: email.toLowerCase(),
        token,
        role: 'COORDINATOR',
        status: 'PENDING',
        expiresAt,
        schoolId,
        invitedById: session.user.id
      }
    })

    // 8. Build invitation URL
    const baseUrl = env.NEXT_PUBLIC_APP_URL || env.NEXTAUTH_URL
    const inviteUrl = `${baseUrl}/auth/accept-invite/${token}`

    // 9. Send invitation email
    const { error: emailError } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: email.toLowerCase(),
      subject: `You're invited to join ${school.name} on IB Match`,
      react: CoordinatorInviteEmail({
        inviteUrl,
        schoolName: school.name,
        inviterName: user.name || undefined,
        expiresInDays: INVITATION_EXPIRY_DAYS
      })
    })

    if (emailError) {
      // Log error but don't expose details to client
      logger.error('Failed to send invitation email', {
        invitationId: invitation.id,
        error: emailError.message
      })

      // Mark invitation as failed (optional: could delete or leave pending)
      await prisma.invitation.update({
        where: { id: invitation.id },
        data: { status: 'CANCELLED' }
      })

      return NextResponse.json(
        { error: 'Failed to send invitation email. Please try again.' },
        { status: 500 }
      )
    }

    // 10. Log success (redacted email per SEC_tasks.md)
    const redactedEmail = email.replace(/(.{2}).*(@.*)/, '$1***$2')
    logger.info('Coordinator invitation sent', {
      invitationId: invitation.id,
      email: redactedEmail,
      schoolId: school.id
    })

    return NextResponse.json({
      success: true,
      message: 'Invitation sent successfully',
      invitation: {
        id: invitation.id,
        email: email.toLowerCase(),
        schoolName: school.name,
        expiresAt: invitation.expiresAt
      }
    })
  } catch (error) {
    logger.error('Invitation API error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
