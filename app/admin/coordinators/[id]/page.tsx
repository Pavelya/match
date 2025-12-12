/**
 * Admin Coordinator Detail Page
 *
 * Shows coordinator details with two-column layout:
 * - Left (2/3): School info, Edit form
 * - Right (1/3): Account Info, Access Control
 * - Footer: Danger Zone (full-width)
 *
 * Part of Task 3.3: Coordinator Invitation System
 */

import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  User,
  Mail,
  GraduationCap,
  MapPin,
  Crown,
  Users,
  Calendar,
  Shield,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CoordinatorEditForm } from '@/components/admin/coordinators/CoordinatorEditForm'
import { CoordinatorStatusBadge } from '@/components/admin/coordinators/CoordinatorStatusBadge'
import { AccessToggleButton } from '@/components/admin/coordinators/AccessToggleButton'
import { DeleteCoordinatorButton } from '@/components/admin/coordinators/DeleteCoordinatorButton'
import {
  PageContainer,
  PageHeader,
  DetailPageLayout,
  InfoCard,
  QuickStat,
  Breadcrumbs
} from '@/components/admin/shared'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CoordinatorDetailPage({ params }: PageProps) {
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
    notFound()
  }

  const status = coordinator.isActive ? 'ACTIVE' : 'REVOKED'

  return (
    <PageContainer>
      <PageHeader
        backHref="/admin/coordinators"
        backLabel="Back to Coordinators"
        title={coordinator.user.name || 'Unnamed Coordinator'}
        description={coordinator.user.email}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Coordinators', href: '/admin/coordinators' },
          { label: coordinator.user.name || coordinator.user.email }
        ]}
        className="mb-6 -mt-4"
      />

      {/* Coordinator Info Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6 -mt-4">
        {/* Avatar */}
        {coordinator.user.image ? (
          <Image
            src={coordinator.user.image}
            alt={coordinator.user.name || 'Coordinator'}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <User className="h-6 w-6" />
          </div>
        )}
        <CoordinatorStatusBadge status={status} />
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <Mail className="h-4 w-4" />
          {coordinator.user.email}
        </div>
      </div>

      <DetailPageLayout
        sidebar={
          <>
            {/* Account Info Card */}
            <InfoCard title="Account Info" icon={Calendar} padding="compact">
              <div className="space-y-1">
                <QuickStat
                  label="Joined"
                  value={new Date(coordinator.user.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                />
                <QuickStat label="Status" value={coordinator.isActive ? 'Active' : 'Revoked'} />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">User ID</span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {coordinator.user.id.slice(0, 8)}...
                  </span>
                </div>
              </div>
            </InfoCard>

            {/* Access Control Card */}
            <InfoCard title="Access Control" icon={Shield} padding="compact">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg',
                      coordinator.isActive ? 'bg-green-100' : 'bg-red-100'
                    )}
                  >
                    <Shield
                      className={cn(
                        'h-5 w-5',
                        coordinator.isActive ? 'text-green-600' : 'text-red-600'
                      )}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {coordinator.isActive ? 'Access Granted' : 'Access Revoked'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {coordinator.isActive
                        ? 'Can access coordinator dashboard'
                        : 'Cannot access coordinator dashboard'}
                    </div>
                  </div>
                </div>
                <AccessToggleButton
                  coordinatorId={coordinator.id}
                  isActive={coordinator.isActive}
                />
              </div>
            </InfoCard>
          </>
        }
        footer={
          /* Danger Zone - Full Width */
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h3 className="text-sm font-medium text-red-800 mb-2">Danger Zone</h3>
            <p className="text-sm text-red-600 mb-4">
              Permanently delete this coordinator account and all associated data. This action
              cannot be undone.
            </p>
            <DeleteCoordinatorButton
              coordinatorId={coordinator.id}
              coordinatorName={coordinator.user.name}
            />
          </div>
        }
      >
        {/* School Card */}
        <InfoCard title="School" icon={GraduationCap} padding="compact">
          <div className="flex items-start justify-between">
            <div>
              <Link
                href={`/admin/schools/${coordinator.school.id}`}
                className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
              >
                {coordinator.school.name}
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{coordinator.school.country.flagEmoji}</span>
                {coordinator.school.city}, {coordinator.school.country.name}
              </div>
            </div>
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full',
                coordinator.school.subscriptionTier === 'VIP'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {coordinator.school.subscriptionTier === 'VIP' ? (
                <Crown className="h-3 w-3" />
              ) : (
                <Users className="h-3 w-3" />
              )}
              {coordinator.school.subscriptionTier}
            </span>
          </div>
        </InfoCard>

        {/* Edit Form Card */}
        <InfoCard title="Edit Coordinator" padding="default">
          <CoordinatorEditForm
            coordinatorId={coordinator.id}
            initialName={coordinator.user.name || ''}
          />
        </InfoCard>
      </DetailPageLayout>
    </PageContainer>
  )
}
