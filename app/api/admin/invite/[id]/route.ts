/**
 * Admin Invitation Delete API Route
 *
 * DELETE /api/admin/invite/[id]
 *
 * Deletes a pending invitation.
 * Part of Task 3.3: Coordinator Invitation System
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
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params

    // Find invitation
    const invitation = await prisma.invitation.findUnique({
      where: { id },
      select: { id: true, email: true, status: true }
    })

    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
    }

    // Delete the invitation
    await prisma.invitation.delete({
      where: { id }
    })

    // Redact email for logging
    const redactedEmail = invitation.email.replace(/(.{2}).*(@.*)/, '$1***$2')

    logger.info('Invitation deleted', {
      invitationId: id,
      email: redactedEmail,
      previousStatus: invitation.status,
      deletedBy: session.user.id.slice(0, 8)
    })

    return NextResponse.json({
      success: true,
      message: 'Invitation deleted successfully'
    })
  } catch (error) {
    logger.error('Delete invitation error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    )
  }
}
