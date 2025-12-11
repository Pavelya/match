/**
 * Admin Coordinator Detail API Route
 *
 * GET /api/admin/coordinators/[id] - Get coordinator details
 * PATCH /api/admin/coordinators/[id] - Update coordinator
 * DELETE /api/admin/coordinators/[id] - Delete coordinator and user account
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

export async function GET(request: NextRequest, { params }: RouteParams) {
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

    const coordinator = await prisma.coordinatorProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            createdAt: true
          }
        },
        school: {
          select: {
            id: true,
            name: true,
            city: true,
            subscriptionTier: true,
            country: {
              select: { name: true, flagEmoji: true }
            }
          }
        }
      }
    })

    if (!coordinator) {
      return NextResponse.json({ error: 'Coordinator not found' }, { status: 404 })
    }

    return NextResponse.json({ coordinator })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    )
  }
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
    const { name } = body

    const coordinator = await prisma.coordinatorProfile.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!coordinator) {
      return NextResponse.json({ error: 'Coordinator not found' }, { status: 404 })
    }

    // Update user name
    const updatedUser = await prisma.user.update({
      where: { id: coordinator.userId },
      data: { name: name?.trim() || null },
      select: { id: true, name: true, email: true }
    })

    logger.info('Coordinator updated', {
      coordinatorId: id,
      userId: updatedUser.id.slice(0, 8)
    })

    return NextResponse.json({
      success: true,
      user: updatedUser
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (adminUser?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params

    // Find coordinator
    const coordinator = await prisma.coordinatorProfile.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        user: { select: { email: true } }
      }
    })

    if (!coordinator) {
      return NextResponse.json({ error: 'Coordinator not found' }, { status: 404 })
    }

    // Delete user (cascade deletes CoordinatorProfile, Sessions, Accounts)
    await prisma.user.delete({
      where: { id: coordinator.userId }
    })

    // Redact email for logging
    const redactedEmail = coordinator.user.email.replace(/(.{2}).*(@.*)/, '$1***$2')

    logger.info('Coordinator account deleted', {
      coordinatorId: id,
      email: redactedEmail,
      deletedBy: session.user.id.slice(0, 8)
    })

    return NextResponse.json({
      success: true,
      message: 'Coordinator account deleted successfully'
    })
  } catch (error) {
    logger.error('Delete coordinator error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    )
  }
}
