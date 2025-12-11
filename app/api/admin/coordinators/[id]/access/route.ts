/**
 * Coordinator Access API Route
 *
 * PATCH /api/admin/coordinators/[id]/access
 *
 * Toggles coordinator access (revoke/restore).
 *
 * Part of Task 3.3: Coordinator Invitation System
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
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
    const body = await request.json()
    const { isActive } = body

    if (typeof isActive !== 'boolean') {
      return NextResponse.json({ error: 'isActive must be a boolean' }, { status: 400 })
    }

    const coordinator = await prisma.coordinatorProfile.findUnique({
      where: { id },
      select: { id: true, userId: true }
    })

    if (!coordinator) {
      return NextResponse.json({ error: 'Coordinator not found' }, { status: 404 })
    }

    // Update access status
    const updated = await prisma.coordinatorProfile.update({
      where: { id },
      data: { isActive },
      select: { id: true, isActive: true }
    })

    logger.info('Coordinator access updated', {
      coordinatorId: id,
      isActive,
      updatedBy: session.user.id.slice(0, 8)
    })

    return NextResponse.json({
      success: true,
      coordinator: updated
    })
  } catch (error) {
    logger.error('Update access error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
