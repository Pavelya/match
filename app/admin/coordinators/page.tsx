/**
 * Admin Coordinators List Page
 *
 * Displays all coordinators and pending invitations.
 * Features:
 * - Table with coordinator details
 * - Status badges (Active/Pending)
 * - Filter tabs
 * - Link to individual coordinator pages
 *
 * Part of Task 3.3: Coordinator Invitation System
 */

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { CoordinatorTable } from '@/components/admin/coordinators/CoordinatorTable'
import { UserPlus, Users, Clock, UserCog } from 'lucide-react'

interface PageProps {
  searchParams: Promise<{ status?: string; schoolId?: string }>
}

export default async function CoordinatorsPage({ searchParams }: PageProps) {
  const { status, schoolId } = await searchParams

  // Fetch coordinators
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

  // Fetch pending invitations
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

  // Format data
  const activeCoordinators = coordinators.map((c) => ({
    id: c.id,
    type: 'coordinator' as const,
    userId: c.user.id,
    email: c.user.email,
    name: c.user.name,
    image: c.user.image,
    status: (c.isActive ? 'ACTIVE' : 'REVOKED') as 'ACTIVE' | 'REVOKED',
    school: c.school,
    createdAt: c.createdAt.toISOString(),
    joinedAt: c.user.createdAt.toISOString()
  }))

  const pendingCoords = pendingInvitations.map((inv) => ({
    id: inv.id,
    type: 'invitation' as const,
    userId: null,
    email: inv.email,
    name: null,
    image: null,
    status: 'PENDING' as const,
    school: inv.school,
    createdAt: inv.createdAt.toISOString(),
    expiresAt: inv.expiresAt.toISOString()
  }))

  // Filter by status
  let displayList = [...activeCoordinators, ...pendingCoords]
  if (status === 'active') {
    displayList = activeCoordinators
  } else if (status === 'pending') {
    displayList = pendingCoords
  }

  // Sort by createdAt
  displayList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const counts = {
    total: activeCoordinators.length + pendingCoords.length,
    active: activeCoordinators.length,
    pending: pendingCoords.length
  }

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <UserCog className="h-7 w-7" />
            Coordinators
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage IB coordinators and pending invitations
          </p>
        </div>
        <Link
          href="/admin/schools"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          Invite from School
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Link
          href="/admin/coordinators"
          className={`rounded-xl border p-4 transition-colors ${!status ? 'bg-primary/5 border-primary' : 'bg-card hover:bg-muted/50'}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{counts.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/coordinators?status=active"
          className={`rounded-xl border p-4 transition-colors ${status === 'active' ? 'bg-primary/5 border-primary' : 'bg-card hover:bg-muted/50'}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <UserCog className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{counts.active}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/coordinators?status=pending"
          className={`rounded-xl border p-4 transition-colors ${status === 'pending' ? 'bg-primary/5 border-primary' : 'bg-card hover:bg-muted/50'}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{counts.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Coordinator Table */}
      <CoordinatorTable coordinators={displayList} />
    </div>
  )
}
