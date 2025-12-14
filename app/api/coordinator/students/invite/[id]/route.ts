/**
 * Cancel Student Invitation API Route
 *
 * DELETE /api/coordinator/students/invite/[id]
 *
 * Cancels a pending student invitation.
 * - Validates coordinator session and school ownership
 * - Sets invitation status to CANCELLED
 *
 * Part of Task 4.4: Student Invitation System
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: invitationId } = await params

    // 1. Validate coordinator session
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Get coordinator profile and school
    const coordinator = await prisma.coordinatorProfile.findFirst({
      where: { userId: session.user.id },
      include: {
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

    // 3. Find the invitation and verify ownership
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

    // Check if already processed
    if (invitation.status !== 'PENDING') {
      return NextResponse.json(
        {
          error: 'Cannot cancel this invitation',
          message: `Invitation is already ${invitation.status.toLowerCase()}`
        },
        { status: 400 }
      )
    }

    // 4. Cancel the invitation
    await prisma.invitation.update({
      where: { id: invitationId },
      data: {
        status: 'CANCELLED'
      }
    })

    // 5. Log success
    const redactedEmail = invitation.email.replace(/(.{2}).*(@.*)/, '$1***$2')
    logger.info('Student invitation cancelled', {
      invitationId,
      email: redactedEmail,
      schoolId: coordinator.school.id,
      coordinatorId: coordinator.id
    })

    return NextResponse.json({
      success: true,
      message: 'Invitation cancelled successfully'
    })
  } catch (error) {
    logger.error('Cancel student invitation error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

/**
 * GET /api/coordinator/students/invite/[id]
 *
 * Get details of a specific invitation
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: invitationId } = await params

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

    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
      select: {
        id: true,
        email: true,
        status: true,
        role: true,
        expiresAt: true,
        createdAt: true,
        acceptedAt: true,
        schoolId: true,
        invitedBy: {
          select: { name: true }
        }
      }
    })

    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
    }

    // Verify school ownership
    if (invitation.schoolId !== coordinator.school.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    return NextResponse.json({
      invitation: {
        ...invitation,
        isExpired: invitation.expiresAt < new Date()
      }
    })
  } catch (error) {
    logger.error('Get invitation error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
