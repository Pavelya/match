/**
 * Invitation Acceptance Page
 *
 * Validates invitation token and shows acceptance form.
 * Part of Task 3.3: Coordinator Invitation System
 */

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { AcceptInviteForm } from '@/components/auth/AcceptInviteForm'
import { CoordinatorInviteCard } from '@/components/invitation/islands'
import { OutcomeCard } from '@/components/invitation/OutcomeCard'
import { AuthPage } from '@/components/sign-in/AuthPage'
import { showsNewUi } from '@/lib/new-ui'

interface PageProps {
  params: Promise<{ token: string }>
}

export default async function AcceptInvitePage({ params }: PageProps) {
  const { token } = await params

  // Validate token: the invitation and its school, as today
  const invitation = await prisma.invitation.findUnique({
    where: { token },
    select: {
      email: true,
      status: true,
      expiresAt: true,
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

  // The new design's card (rebranding 4.3, board "D4.16 School invitation"), in today's order:
  // no such invitation, expired, accepted, cancelled (the 404)
  if (await showsNewUi()) {
    const outcome = !invitation
      ? 'invalid'
      : invitation.expiresAt < new Date()
        ? 'expired'
        : invitation.status === 'ACCEPTED'
          ? 'accepted'
          : null
    if (!outcome && invitation?.status === 'CANCELLED') notFound()
    return (
      <AuthPage>
        {outcome || !invitation ? (
          <OutcomeCard
            outcome={outcome ?? 'invalid'}
            signInHref={outcome === 'accepted' ? '/auth/coordinator' : '/auth/signin'}
            expiredText="This invitation has expired. Please contact your administrator for a new invitation."
          />
        ) : (
          <CoordinatorInviteCard
            token={token}
            email={invitation.email}
            school={
              invitation.school
                ? {
                    name: invitation.school.name,
                    place: `${invitation.school.city}, ${invitation.school.country.name}`,
                    tier: invitation.school.subscriptionTier
                  }
                : null
            }
          />
        )}
      </AuthPage>
    )
  }

  // Token not found
  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-xl border bg-card p-8">
            <h1 className="text-2xl font-bold text-foreground mb-4">Invalid Invitation</h1>
            <p className="text-muted-foreground mb-6">
              This invitation link is invalid or has already been used.
            </p>
            <a href="/auth/signin" className="text-primary hover:underline font-medium">
              Go to Sign In
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Check if expired
  if (invitation.expiresAt < new Date()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-xl border bg-card p-8">
            <h1 className="text-2xl font-bold text-foreground mb-4">Invitation Expired</h1>
            <p className="text-muted-foreground mb-6">
              This invitation has expired. Please contact your administrator for a new invitation.
            </p>
            <a href="/auth/signin" className="text-primary hover:underline font-medium">
              Go to Sign In
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Check if already accepted
  if (invitation.status === 'ACCEPTED') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-xl border bg-card p-8">
            <h1 className="text-2xl font-bold text-foreground mb-4">Already Accepted</h1>
            <p className="text-muted-foreground mb-6">
              This invitation has already been accepted. You can sign in to your account.
            </p>
            <a
              href="/auth/coordinator"
              className="inline-block px-6 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Check if cancelled
  if (invitation.status === 'CANCELLED') {
    notFound()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border bg-card p-8">
          <AcceptInviteForm
            token={token}
            email={invitation.email}
            school={
              invitation.school
                ? {
                    id: invitation.school.id,
                    name: invitation.school.name,
                    city: invitation.school.city,
                    tier: invitation.school.subscriptionTier,
                    countryName: invitation.school.country.name,
                    countryFlag: invitation.school.country.flagEmoji
                  }
                : null
            }
          />
        </div>
      </div>
    </div>
  )
}
