/**
 * Accept Invitation API Route
 *
 * POST /api/auth/accept-invite
 *
 * Accepts an invitation and creates the coordinator account.
 * - Validates token
 * - Creates User with COORDINATOR role
 * - Creates CoordinatorProfile linked to school
 * - Marks invitation as accepted
 *
 * Part of Task 3.3: Coordinator Invitation System
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

// Current policy versions (same as auth/config.ts)
const CURRENT_TERMS_VERSION = '2025-12-09'
const CURRENT_PRIVACY_VERSION = '2025-12-09'

export async function POST(request: NextRequest) {
  try {
    // 1. Parse request body
    const body = await request.json()
    const { token, name } = body

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    // 2. Find and validate invitation
    const invitation = await prisma.invitation.findUnique({
      where: { token },
      include: {
        school: {
          select: { id: true, name: true }
        }
      }
    })

    if (!invitation) {
      return NextResponse.json({ error: 'Invalid invitation' }, { status: 404 })
    }

    // Check expiry
    if (invitation.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Invitation has expired' }, { status: 410 })
    }

    // Check status
    if (invitation.status !== 'PENDING') {
      return NextResponse.json({ error: 'Invitation has already been used' }, { status: 409 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: invitation.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // 3. Create user and coordinator profile in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user with COORDINATOR role
      const user = await tx.user.create({
        data: {
          email: invitation.email,
          name: name.trim(),
          role: 'COORDINATOR',
          emailVerified: new Date(), // Mark as verified since they clicked the invite link
          termsAcceptedAt: new Date(),
          termsVersion: CURRENT_TERMS_VERSION,
          privacyAcceptedAt: new Date(),
          privacyPolicyVersion: CURRENT_PRIVACY_VERSION
        }
      })

      // Create coordinator profile linked to school
      if (invitation.schoolId) {
        await tx.coordinatorProfile.create({
          data: {
            userId: user.id,
            schoolId: invitation.schoolId
          }
        })
      }

      // Mark invitation as accepted
      await tx.invitation.update({
        where: { id: invitation.id },
        data: {
          status: 'ACCEPTED',
          acceptedAt: new Date()
        }
      })

      return user
    })

    // 4. Log success (redacted email)
    const redactedEmail = invitation.email.replace(/(.{2}).*(@.*)/, '$1***$2')
    logger.info('Coordinator account created via invitation', {
      userId: result.id.slice(0, 8),
      email: redactedEmail,
      schoolId: invitation.schoolId
    })

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: result.id,
        email: result.email,
        name: result.name
      }
    })
  } catch (error) {
    logger.error('Accept invitation error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
