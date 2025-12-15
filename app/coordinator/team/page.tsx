/**
 * Coordinator Team Page
 *
 * Lists all coordinators at the school and pending invitations.
 * Allows inviting new coordinators (VIP/subscribed only).
 *
 * Part of Task 4.8: Coordinator-to-Coordinator Invitation
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { PageContainer, PageHeader, InfoCard, TableEmptyState } from '@/components/admin/shared'
import { UserCog, UserPlus, Mail, Clock, CheckCircle2 } from 'lucide-react'
import { getCoordinatorAccess } from '@/lib/auth/access-control'

export default async function CoordinatorTeamPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/auth/coordinator/signin')
  }

  // Get coordinator profile and school
  const coordinator = await prisma.coordinatorProfile.findFirst({
    where: { userId: session.user.id },
    include: {
      school: {
        select: {
          id: true,
          name: true,
          subscriptionTier: true,
          subscriptionStatus: true
        }
      }
    }
  })

  if (!coordinator?.school) {
    redirect('/')
  }

  const school = coordinator.school
  const access = getCoordinatorAccess(school)

  // Get all coordinators at this school
  const coordinators = await prisma.coordinatorProfile.findMany({
    where: { schoolId: school.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      }
    },
    orderBy: { createdAt: 'asc' }
  })

  // Get pending coordinator invitations
  const pendingInvitations = await prisma.invitation.findMany({
    where: {
      schoolId: school.id,
      role: 'COORDINATOR',
      status: 'PENDING',
      expiresAt: { gt: new Date() }
    },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      studentName: true, // Used for coordinator name
      expiresAt: true,
      createdAt: true,
      invitedBy: {
        select: { name: true }
      }
    }
  })

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }

  return (
    <PageContainer>
      <PageHeader
        title="Team"
        icon={UserCog}
        description={`Coordinators at ${school.name}`}
        backHref="/coordinator/dashboard"
        backLabel="Back to Dashboard"
        actions={
          access.canInviteCoordinators
            ? [
                {
                  label: 'Invite Coordinator',
                  href: '/coordinator/team/invite',
                  icon: UserPlus,
                  variant: 'primary'
                }
              ]
            : undefined
        }
      />

      {/* Current Coordinators */}
      <InfoCard title="Active Coordinators" icon={CheckCircle2} className="mb-6">
        <div className="divide-y">
          {coordinators.map((coord, index) => (
            <div
              key={coord.id}
              className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                  {coord.user.name?.[0]?.toUpperCase() || coord.user.email?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {coord.user.name || 'Unnamed Coordinator'}
                    {coord.userId === session?.user?.id && (
                      <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        You
                      </span>
                    )}
                    {index === 0 && (
                      <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                        Primary
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{coord.user.email}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Joined {formatDate(coord.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <InfoCard title="Pending Invitations" icon={Clock} className="mb-6">
          <div className="divide-y">
            {pendingInvitations.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{inv.studentName || inv.email}</p>
                    {inv.studentName && (
                      <p className="text-sm text-muted-foreground">{inv.email}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-amber-600">Pending</p>
                  <p className="text-xs text-muted-foreground">
                    Expires {formatDate(inv.expiresAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      )}

      {/* Empty state for single coordinator */}
      {coordinators.length === 1 && pendingInvitations.length === 0 && (
        <TableEmptyState
          icon={UserCog}
          title="You're the only coordinator"
          description="Invite other coordinators to help manage students and view analytics."
          action={
            access.canInviteCoordinators
              ? {
                  label: 'Invite Coordinator',
                  href: '/coordinator/team/invite'
                }
              : undefined
          }
        />
      )}

      {/* Upgrade prompt for freemium */}
      {!access.canInviteCoordinators && (
        <div className="mt-6 p-6 rounded-xl border border-dashed bg-muted/30 text-center">
          <UserPlus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-sm">
            <Link
              href="/coordinator/settings/subscription"
              className="text-primary hover:underline"
            >
              Upgrade your subscription
            </Link>{' '}
            to invite additional coordinators to your team.
          </p>
        </div>
      )}
    </PageContainer>
  )
}
