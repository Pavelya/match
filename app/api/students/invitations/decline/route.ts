/**
 * Decline Student Invitation API (for existing students)
 *
 * POST /api/students/invitations/decline
 *
 * Allows an existing student to decline a school connection invitation.
 * Sets invitation status to CANCELLED.
 *
 * Part of Task 4.5: Student Account Linking & Unlinking
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

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
        school: { select: { name: true } }
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

    // Cancel the invitation
    await prisma.invitation.update({
      where: { id: invitationId },
      data: { status: 'CANCELLED' }
    })

    const redactedEmail = user.email.replace(/(.{2}).*(@.*)/, '$1***$2')
    logger.info('Student declined school invitation', {
      userId: session.user.id,
      email: redactedEmail,
      invitationId,
      schoolName: invitation.school?.name
    })

    return NextResponse.json({
      success: true,
      message: 'Invitation declined'
    })
  } catch (error) {
    logger.error('Decline student invitation error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
