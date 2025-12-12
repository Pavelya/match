/**
 * Admin Coordinators List Page
 *
 * Displays all coordinators and pending invitations with:
 * - Stats summary row (Total, Active, Pending)
 * - Search by name, email, or school
 * - Filter by status
 * - Table with coordinator details
 * - Status badges (Active/Pending/Revoked)
 *
 * Part of Task 3.3: Coordinator Invitation System
 */

import { prisma } from '@/lib/prisma'
import { UserPlus, UserCog } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { CoordinatorsListClient } from '@/components/admin/coordinators/CoordinatorsListClient'

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

  // Combine and sort by createdAt
  const allCoordinators = [...activeCoordinators, ...pendingCoords].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <PageContainer>
      <PageHeader
        title="Coordinators"
        icon={UserCog}
        description="Manage IB coordinators and pending invitations"
        actions={[
          {
            label: 'Invite from School',
            href: '/admin/schools',
            icon: UserPlus,
            variant: 'secondary'
          }
        ]}
      />

      <CoordinatorsListClient coordinators={allCoordinators} statusFilter={status || null} />
    </PageContainer>
  )
}
