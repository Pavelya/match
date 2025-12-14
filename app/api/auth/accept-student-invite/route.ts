/**
 * Accept Student Invitation API
 *
 * POST /api/auth/accept-student-invite
 *
 * Accepts a student invitation and creates:
 * - User record with role STUDENT
 * - StudentProfile linked to school with consent recorded
 * - Updates Invitation to ACCEPTED
 *
 * Part of Task 4.4: Student Invitation System
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

// Current consent version - update when consent language changes
const CONSENT_VERSION = '2025-12-14'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    // 1. Find and validate the invitation
    const invitation = await prisma.invitation.findUnique({
      where: { token },
      include: {
        school: {
          select: { id: true, name: true }
        }
      }
    })

    if (!invitation) {
      return NextResponse.json({ error: 'Invalid invitation token' }, { status: 404 })
    }

    // Check status
    if (invitation.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'This invitation has already been used or cancelled' },
        { status: 400 }
      )
    }

    // Check expiry
    if (invitation.expiresAt < new Date()) {
      return NextResponse.json({ error: 'This invitation has expired' }, { status: 400 })
    }

    // Check role
    if (invitation.role !== 'STUDENT') {
      return NextResponse.json({ error: 'This is not a student invitation' }, { status: 400 })
    }

    // Check school
    if (!invitation.school) {
      return NextResponse.json({ error: 'Invitation is not linked to a school' }, { status: 400 })
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: invitation.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please sign in instead.' },
        { status: 409 }
      )
    }

    // 3. Create user and student profile in a transaction
    const now = new Date()

    const result = await prisma.$transaction(async (tx) => {
      // Create User
      const user = await tx.user.create({
        data: {
          email: invitation.email,
          role: 'STUDENT',
          // Consent to terms when accepting invite
          termsAcceptedAt: now,
          termsVersion: CONSENT_VERSION,
          privacyAcceptedAt: now,
          privacyPolicyVersion: CONSENT_VERSION
        }
      })

      // Create StudentProfile linked to school with consent
      const studentProfile = await tx.studentProfile.create({
        data: {
          userId: user.id,
          schoolId: invitation.schoolId,
          linkedByInvitation: true,
          coordinatorAccessConsentAt: now,
          coordinatorAccessConsentVersion: CONSENT_VERSION
        }
      })

      // Update invitation to ACCEPTED
      await tx.invitation.update({
        where: { id: invitation.id },
        data: {
          status: 'ACCEPTED',
          acceptedAt: now,
          coordinatorAccessConsent: true
        }
      })

      return { user, studentProfile }
    })

    // 4. Log success (redacted email)
    const redactedEmail = invitation.email.replace(/(.{2}).*(@.*)/, '$1***$2')
    logger.info('Student invitation accepted', {
      invitationId: invitation.id,
      email: redactedEmail,
      schoolId: invitation.schoolId,
      userId: result.user.id,
      studentProfileId: result.studentProfile.id
    })

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      email: invitation.email,
      schoolName: invitation.school.name
    })
  } catch (error) {
    logger.error('Accept student invitation error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
