/**
 * Admin Coordinator Detail Page
 *
 * Shows coordinator details with edit and action options.
 * Part of Task 3.3: Coordinator Invitation System
 */

import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  ArrowLeft,
  User,
  Mail,
  GraduationCap,
  MapPin,
  Crown,
  Users,
  Calendar,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CoordinatorEditForm } from '@/components/admin/coordinators/CoordinatorEditForm'
import { CoordinatorStatusBadge } from '@/components/admin/coordinators/CoordinatorStatusBadge'
import { AccessToggleButton } from '@/components/admin/coordinators/AccessToggleButton'
import { DeleteCoordinatorButton } from '@/components/admin/coordinators/DeleteCoordinatorButton'

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
    <div className="p-8 max-w-4xl">
      {/* Back link */}
      <Link
        href="/admin/coordinators"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Coordinators
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          {coordinator.user.image ? (
            <Image
              src={coordinator.user.image}
              alt={coordinator.user.name || 'Coordinator'}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <User className="h-8 w-8" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">
                {coordinator.user.name || 'Unnamed Coordinator'}
              </h1>
              <CoordinatorStatusBadge status={status} />
            </div>
            <div className="flex items-center gap-1 text-muted-foreground mt-1">
              <Mail className="h-4 w-4" />
              {coordinator.user.email}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* School Card */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            School
          </h3>
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <Link
                  href={`/admin/schools/${coordinator.school.id}`}
                  className="font-medium text-foreground hover:text-primary"
                >
                  {coordinator.school.name}
                </Link>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{coordinator.school.country.flagEmoji}</span>
                  {coordinator.school.city}, {coordinator.school.country.name}
                </div>
              </div>
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full',
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
          </div>
        </div>

        {/* Account Info Card */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Account Info
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Joined</span>
              <span className="font-medium">
                {new Date(coordinator.user.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">User ID</span>
              <span className="font-mono text-xs">{coordinator.user.id.slice(0, 12)}...</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Access Status</span>
              <span className={cn('font-medium', !coordinator.isActive && 'text-destructive')}>
                {coordinator.isActive ? 'Active' : 'Revoked'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="rounded-xl border bg-card p-6 mb-6">
        <h3 className="font-medium text-foreground mb-4">Edit Coordinator</h3>
        <CoordinatorEditForm
          coordinatorId={coordinator.id}
          initialName={coordinator.user.name || ''}
        />
      </div>

      {/* Access Control */}
      <div className="rounded-xl border bg-card p-6">
        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Access Control
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {coordinator.isActive
            ? 'This coordinator has active access to the coordinator dashboard.'
            : "This coordinator's access has been revoked. They cannot access the coordinator dashboard."}
        </p>
        <AccessToggleButton coordinatorId={coordinator.id} isActive={coordinator.isActive} />
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
        <h3 className="font-medium text-red-700 mb-4">Danger Zone</h3>
        <p className="text-sm text-red-600 mb-4">
          Permanently delete this coordinator account and all associated data.
        </p>
        <DeleteCoordinatorButton
          coordinatorId={coordinator.id}
          coordinatorName={coordinator.user.name}
        />
      </div>
    </div>
  )
}
