/**
 * Admin Invitation Detail Page
 *
 * Shows pending invitation details with resend option.
 * Part of Task 3.3: Coordinator Invitation System
 */

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArrowLeft, Mail, GraduationCap, MapPin, Crown, Users, Calendar, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CoordinatorStatusBadge } from '@/components/admin/coordinators/CoordinatorStatusBadge'
import { ResendInviteButton } from '@/components/admin/coordinators/ResendInviteButton'
import { DeleteInvitationButton } from '@/components/admin/coordinators/DeleteInvitationButton'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function InvitationDetailPage({ params }: PageProps) {
  const { id } = await params

  const invitation = await prisma.invitation.findUnique({
    where: { id },
    include: {
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
      },
      invitedBy: {
        select: { name: true, email: true }
      }
    }
  })

  if (!invitation) {
    notFound()
  }

  const isExpired = invitation.expiresAt < new Date()
  const status = invitation.status === 'PENDING' && isExpired ? 'EXPIRED' : invitation.status

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
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-foreground">Pending Invitation</h1>
            <CoordinatorStatusBadge
              status={
                status === 'ACCEPTED' ? 'ACTIVE' : status === 'EXPIRED' ? 'EXPIRED' : 'PENDING'
              }
            />
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Mail className="h-4 w-4" />
            {invitation.email}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* School Card */}
        {invitation.school && (
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              School
            </h3>
            <div className="flex items-start justify-between">
              <div>
                <Link
                  href={`/admin/schools/${invitation.school.id}`}
                  className="font-medium text-foreground hover:text-primary"
                >
                  {invitation.school.name}
                </Link>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{invitation.school.country.flagEmoji}</span>
                  {invitation.school.city}, {invitation.school.country.name}
                </div>
              </div>
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full',
                  invitation.school.subscriptionTier === 'VIP'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {invitation.school.subscriptionTier === 'VIP' ? (
                  <Crown className="h-3 w-3" />
                ) : (
                  <Users className="h-3 w-3" />
                )}
                {invitation.school.subscriptionTier}
              </span>
            </div>
          </div>
        )}

        {/* Invitation Info Card */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Invitation Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Invited</span>
              <span className="font-medium">
                {new Date(invitation.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Expires</span>
              <span className={cn('font-medium', isExpired && 'text-destructive')}>
                {new Date(invitation.expiresAt).toLocaleDateString()}
                {isExpired && ' (Expired)'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Invited by</span>
              <span className="font-medium">
                {invitation.invitedBy.name || invitation.invitedBy.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {(status === 'PENDING' || status === 'EXPIRED') && (
        <div className="rounded-xl border bg-card p-6 mb-6">
          <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Actions
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {isExpired
              ? 'This invitation has expired. Resend to generate a new invitation link.'
              : "Resend the invitation email if the coordinator hasn't received it."}
          </p>
          <ResendInviteButton invitationId={invitation.id} />
        </div>
      )}

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
        <h3 className="font-medium text-red-700 mb-4">Danger Zone</h3>
        <p className="text-sm text-red-600 mb-4">
          Permanently delete this invitation. The coordinator will not be able to use the invitation
          link.
        </p>
        <DeleteInvitationButton invitationId={invitation.id} email={invitation.email} />
      </div>
    </div>
  )
}
