/**
 * Accept Student Invitation API (for existing students)
 *
 * POST /api/students/invitations/accept
 *
 * Allows an existing student to accept a school connection invitation.
 * Updates their profile with school link and consent info.
 *
 * Part of Task 4.5: Student Account Linking & Unlinking
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

// Current consent version
const CONSENT_VERSION = '2025-12-14'

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { invitationId } = body

    if (!invitationId || typeof invitationId !== 'string') {
      return NextResponse.json({ error: 'Invitation ID is required' }, { status: 400 })
    }

    // Get student profile
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: session.user.id }
    })

    if (!studentProfile) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 })
    }

    // Check if already linked to a school
    if (studentProfile.schoolId) {
      return NextResponse.json(
        {
          error:
            'You are already linked to a school. Unlink first to connect to a different school.'
        },
        { status: 400 }
      )
    }

    // Get user email
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { email: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Find the invitation
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
      include: {
        school: { select: { id: true, name: true } }
      }
    })

    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
    }

    // Verify invitation is for this user
    if (invitation.email.toLowerCase() !== user.email.toLowerCase()) {
      return NextResponse.json({ error: 'This invitation is not for you' }, { status: 403 })
    }

    // Check status
    if (invitation.status !== 'PENDING') {
      return NextResponse.json({ error: 'This invitation is no longer valid' }, { status: 400 })
    }

    // Check expiry
    if (invitation.expiresAt < new Date()) {
      return NextResponse.json({ error: 'This invitation has expired' }, { status: 400 })
    }

    // Check school
    if (!invitation.school) {
      return NextResponse.json({ error: 'Invitation is not linked to a school' }, { status: 400 })
    }

    const now = new Date()

    // Update in transaction
    await prisma.$transaction([
      // Update student profile with school link and consent
      prisma.studentProfile.update({
        where: { id: studentProfile.id },
        data: {
          schoolId: invitation.schoolId,
          linkedByInvitation: true,
          coordinatorAccessConsentAt: now,
          coordinatorAccessConsentVersion: CONSENT_VERSION
        }
      }),
      // Mark invitation as accepted
      prisma.invitation.update({
        where: { id: invitationId },
        data: {
          status: 'ACCEPTED',
          acceptedAt: now,
          coordinatorAccessConsent: true
        }
      })
    ])

    const redactedEmail = user.email.replace(/(.{2}).*(@.*)/, '$1***$2')
    logger.info('Existing student accepted school invitation', {
      userId: session.user.id,
      email: redactedEmail,
      studentProfileId: studentProfile.id,
      schoolId: invitation.schoolId,
      invitationId
    })

    return NextResponse.json({
      success: true,
      message: `Successfully connected to ${invitation.school.name}`,
      schoolName: invitation.school.name
    })
  } catch (error) {
    logger.error('Accept student invitation error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
