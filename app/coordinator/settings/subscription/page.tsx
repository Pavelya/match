/**
 * Coordinator Subscription Management Page
 *
 * Shows subscription status and allows:
 * - Upgrading to VIP (create checkout session)
 * - Managing subscription (Stripe Portal)
 * - Viewing subscription details
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PageContainer, PageHeader, InfoCard } from '@/components/admin/shared'
import { CreditCard, Check, AlertCircle, CheckCircle } from 'lucide-react'
import { getCoordinatorAccess, FREEMIUM_MAX_STUDENTS } from '@/lib/auth/access-control'
import { SubscriptionActions } from './SubscriptionActions'

interface SearchParams {
  success?: string
  canceled?: string
}

export default async function CoordinatorSubscriptionPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/auth/coordinator/signin')
  }

  // Get coordinator's school
  const coordinator = await prisma.coordinatorProfile.findFirst({
    where: { userId: session.user.id },
    include: {
      school: {
        select: {
          id: true,
          name: true,
          subscriptionTier: true,
          subscriptionStatus: true,
          stripeCustomerId: true,
          stripeSubscriptionId: true
        }
      }
    }
  })

  if (!coordinator?.school) {
    redirect('/')
  }

  const school = coordinator.school
  const access = getCoordinatorAccess(school)
  const isVIP = school.subscriptionTier === 'VIP'
  const hasSubscription = !!school.stripeSubscriptionId
  const params = await searchParams

  // VIP schools - no subscription management needed
  if (isVIP) {
    return (
      <PageContainer>
        <PageHeader
          title="Subscription"
          icon={CreditCard}
          description="Manage your school's subscription"
          backHref="/coordinator/settings"
          backLabel="Back to Settings"
        />

        <div className="rounded-xl border bg-gradient-to-br from-amber-50 to-amber-100 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white">
              <span className="text-2xl">👑</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-amber-900">VIP School</h2>
              <p className="text-amber-700">Full access to all features</p>
            </div>
          </div>
          <p className="text-sm text-amber-800">
            Your school has VIP status with complimentary access to all IB Match features. No
            payment required.
          </p>
        </div>

        <InfoCard title="VIP Benefits">
          <ul className="space-y-3">
            <FeatureItem>Unlimited student invitations</FeatureItem>
            <FeatureItem>Advanced analytics and reporting</FeatureItem>
            <FeatureItem>Student data management</FeatureItem>
            <FeatureItem>Invite other coordinators</FeatureItem>
            <FeatureItem>Bulk data export</FeatureItem>
            <FeatureItem>Priority support</FeatureItem>
          </ul>
        </InfoCard>
      </PageContainer>
    )
  }

  // Regular tier - show subscription management
  return (
    <PageContainer>
      <PageHeader
        title="Subscription"
        icon={CreditCard}
        description={
          access.hasFullAccess ? 'Manage your subscription' : 'Upgrade to unlock all features'
        }
        backHref="/coordinator/settings"
        backLabel="Back to Settings"
      />

      {/* Success/Cancel messages */}
      {params.success === 'true' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200 mb-6">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-800">Subscription activated!</p>
            <p className="text-xs text-green-700">You now have full access to all features.</p>
          </div>
        </div>
      )}

      {params.canceled === 'true' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 mb-6">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            Checkout was canceled. You can try again anytime.
          </p>
        </div>
      )}

      {/* Current Plan Status */}
      <div className="rounded-xl border bg-card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Current Plan</h2>
            <p className="text-muted-foreground">
              {access.hasFullAccess ? 'Subscribed Plan' : 'Free Plan'}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              access.hasFullAccess
                ? 'bg-green-100 text-green-700'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {access.hasFullAccess ? 'Active' : 'Limited'}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {access.hasFullAccess
            ? 'You have full access to all coordinator features.'
            : `Limited to ${FREEMIUM_MAX_STUDENTS} students. Upgrade to unlock unlimited access.`}
        </p>

        {/* Action buttons */}
        <SubscriptionActions
          hasFullAccess={access.hasFullAccess}
          hasSubscription={hasSubscription}
        />
      </div>

      {/* Features Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Free Plan">
          <ul className="space-y-3">
            <FeatureItem>{FREEMIUM_MAX_STUDENTS} student limit</FeatureItem>
            <FeatureItem>Basic student management</FeatureItem>
            <FeatureItem>View student profiles</FeatureItem>
            <FeatureItem muted>Advanced analytics</FeatureItem>
            <FeatureItem muted>Invite coordinators</FeatureItem>
            <FeatureItem muted>Bulk export</FeatureItem>
          </ul>
        </InfoCard>

        <InfoCard title="Subscribed Plan" className="border-primary/50">
          <ul className="space-y-3">
            <FeatureItem highlight>Unlimited students</FeatureItem>
            <FeatureItem highlight>Full student management</FeatureItem>
            <FeatureItem highlight>Edit student data</FeatureItem>
            <FeatureItem highlight>Advanced analytics</FeatureItem>
            <FeatureItem highlight>Invite coordinators</FeatureItem>
            <FeatureItem highlight>Bulk export</FeatureItem>
          </ul>
        </InfoCard>
      </div>
    </PageContainer>
  )
}

function FeatureItem({
  children,
  muted,
  highlight
}: {
  children: React.ReactNode
  muted?: boolean
  highlight?: boolean
}) {
  return (
    <li className={`flex items-center gap-2 text-sm ${muted ? 'text-muted-foreground' : ''}`}>
      <Check
        className={`h-4 w-4 flex-shrink-0 ${
          muted ? 'text-muted-foreground/50' : highlight ? 'text-primary' : 'text-green-600'
        }`}
      />
      <span className={muted ? 'line-through' : ''}>{children}</span>
    </li>
  )
}
