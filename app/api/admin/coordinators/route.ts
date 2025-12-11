/**
 * Admin Coordinators API Route
 *
 * GET /api/admin/coordinators
 *
 * Lists all coordinators and pending invitations.
 * Includes filtering by school and status.
 *
 * Part of Task 3.3: Coordinator Invitation System
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // 1. Validate admin session
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    // 2. Parse query params for filtering
    const { searchParams } = new URL(request.url)
    const schoolId = searchParams.get('schoolId')
    const status = searchParams.get('status') // 'active', 'pending', 'all'

    // 3. Fetch coordinators (accepted invitations)
    const coordinators = await prisma.coordinatorProfile.findMany({
      where: schoolId ? { schoolId } : undefined,
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
            subscriptionTier: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // 4. Fetch pending invitations
    const pendingInvitations = await prisma.invitation.findMany({
      where: {
        role: 'COORDINATOR',
        status: 'PENDING',
        expiresAt: { gt: new Date() },
        ...(schoolId ? { schoolId } : {})
      },
      include: {
        school: {
          select: {
            id: true,
            name: true,
            subscriptionTier: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // 5. Combine and format response
    const activeCoordinators = coordinators.map((c) => ({
      id: c.id,
      type: 'coordinator' as const,
      userId: c.user.id,
      email: c.user.email,
      name: c.user.name,
      image: c.user.image,
      status: 'ACTIVE',
      school: c.school,
      createdAt: c.createdAt,
      joinedAt: c.user.createdAt
    }))

    const pendingCoords = pendingInvitations.map((inv) => ({
      id: inv.id,
      type: 'invitation' as const,
      userId: null,
      email: inv.email,
      name: null,
      image: null,
      status: 'PENDING',
      school: inv.school,
      createdAt: inv.createdAt,
      expiresAt: inv.expiresAt
    }))

    // 6. Filter by status if requested
    let result = [...activeCoordinators, ...pendingCoords]

    if (status === 'active') {
      result = activeCoordinators
    } else if (status === 'pending') {
      result = pendingCoords
    }

    // Sort by createdAt descending
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      coordinators: result,
      counts: {
        total: activeCoordinators.length + pendingCoords.length,
        active: activeCoordinators.length,
        pending: pendingCoords.length
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
