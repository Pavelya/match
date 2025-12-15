/**
 * Coordinator Team Invitation API Route
 *
 * POST /api/coordinator/team/invite
 *
 * Allows coordinators to invite other coordinators to their school.
 * - Only VIP or subscribed REGULAR coordinators can invite
 * - Creates invitation with role COORDINATOR and schoolId
 * - Sends invitation email via Resend
 *
 * Part of Task 4.8: Coordinator-to-Coordinator Invitation
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/email/client'
import { logger } from '@/lib/logger'
import { env } from '@/lib/env'
import { getCoordinatorAccess } from '@/lib/auth/access-control'
import CoordinatorInviteEmail from '@/emails/coordinator-invite'

// Token expiry: 7 days
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

    if (!coordinator.isActive) {
      return NextResponse.json(
        { error: 'Your coordinator access has been revoked' },
        { status: 403 }
      )
    }

    const school = coordinator.school

    // 3. Check access level - only VIP or subscribed can invite coordinators
    const access = getCoordinatorAccess(school)

    if (!access.canInviteCoordinators) {
      return NextResponse.json(
        {
          error: 'Upgrade required',
          message: 'Only VIP or subscribed schools can invite additional coordinators.'
        },
        { status: 403 }
      )
    }

    // 4. Parse and validate request body
    const body = await request.json()
    const { email, coordinatorName } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // 5. Check if email already has a user
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, role: true }
    })

    if (existingUser) {
      // Check if already a coordinator at this school
      if (existingUser.role === 'COORDINATOR') {
        const existingCoordinator = await prisma.coordinatorProfile.findFirst({
          where: { userId: existingUser.id, schoolId: school.id }
        })

        if (existingCoordinator) {
          return NextResponse.json(
            { error: 'This person is already a coordinator at your school' },
            { status: 409 }
          )
        }
      }

      return NextResponse.json(
        {
          error:
            'A user with this email already exists. They need to be added through a different process.'
        },
        { status: 409 }
      )
    }

    // 6. Check for pending invitation for this email
    const pendingInvitation = await prisma.invitation.findFirst({
      where: {
        email: normalizedEmail,
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

    // 7. Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + INVITATION_EXPIRY_DAYS)

    // 8. Create invitation record
    const invitation = await prisma.invitation.create({
      data: {
        email: normalizedEmail,
        token,
        role: 'COORDINATOR',
        status: 'PENDING',
        expiresAt,
        schoolId: school.id,
        invitedById: session.user.id,
        studentName: coordinatorName || null // Reusing studentName field for coordinator name
      }
    })

    // 9. Build invitation URL
    const baseUrl = env.NEXT_PUBLIC_APP_URL || env.NEXTAUTH_URL
    const inviteUrl = `${baseUrl}/auth/accept-invite/${token}`

    // 10. Send invitation email
    const { error: emailError } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: normalizedEmail,
      subject: `You're invited to join ${school.name} on IB Match`,
      react: CoordinatorInviteEmail({
        inviteUrl,
        schoolName: school.name,
        inviterName: coordinator.user.name || undefined,
        expiresInDays: INVITATION_EXPIRY_DAYS
      })
    })

    if (emailError) {
      logger.error('Failed to send coordinator invitation email', {
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

    // 11. Log success
    const redactedEmail = normalizedEmail.replace(/(.{2}).*(@.*)/, '$1***$2')
    logger.info('Coordinator invitation sent by coordinator', {
      invitationId: invitation.id,
      email: redactedEmail,
      schoolId: school.id,
      invitedByCoordinatorId: coordinator.id
    })

    return NextResponse.json({
      success: true,
      message: 'Invitation sent successfully',
      invitation: {
        id: invitation.id,
        email: normalizedEmail,
        coordinatorName: coordinatorName || null,
        schoolName: school.name,
        expiresAt: invitation.expiresAt
      }
    })
  } catch (error) {
    logger.error('Coordinator team invitation API error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

/**
 * GET /api/coordinator/team/invite
 *
 * List pending coordinator invitations for the school
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
        role: 'COORDINATOR',
        status: 'PENDING',
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        studentName: true, // Used for coordinator name
        status: true,
        expiresAt: true,
        createdAt: true,
        invitedBy: {
          select: { name: true }
        }
      }
    })

    return NextResponse.json({
      invitations: invitations.map((inv) => ({
        ...inv,
        coordinatorName: inv.studentName,
        studentName: undefined
      })),
      count: invitations.length
    })
  } catch (error) {
    logger.error('Get coordinator invitations error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
