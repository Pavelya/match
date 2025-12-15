/**
 * Coordinator Settings Page
 *
 * Shows school settings and links to subscription management.
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { PageContainer, PageHeader, InfoCard, InfoRow } from '@/components/admin/shared'
import { Settings, CreditCard, School, Shield, ArrowRight } from 'lucide-react'

export default async function CoordinatorSettingsPage() {
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
          city: true,
          country: {
            select: { name: true, flagEmoji: true }
          }
        }
      }
    }
  })

  if (!coordinator?.school) {
    redirect('/')
  }

  const school = coordinator.school
  const isVIP = school.subscriptionTier === 'VIP'
  const tierDisplay = isVIP ? '👑 VIP' : 'Regular'
  const statusDisplay =
    school.subscriptionStatus === 'ACTIVE' ? '✓ Active' : school.subscriptionStatus

  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        icon={Settings}
        description="Manage your school settings and subscription"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* School Info */}
        <InfoCard title="School Information" icon={School}>
          <div className="space-y-3">
            <InfoRow label="School Name" value={school.name} />
            <InfoRow
              label="Location"
              value={`${school.city}, ${school.country.flagEmoji} ${school.country.name}`}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Subscription Tier</span>
              <span className={`text-sm font-medium ${isVIP ? 'text-amber-600' : ''}`}>
                {tierDisplay}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status</span>
              <span
                className={`text-sm font-medium ${school.subscriptionStatus === 'ACTIVE' ? 'text-green-600' : ''}`}
              >
                {statusDisplay}
              </span>
            </div>
          </div>
        </InfoCard>

        {/* Subscription Management */}
        <InfoCard title="Subscription" icon={CreditCard}>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {isVIP
                ? 'Your school has VIP partnership access with all features included.'
                : school.subscriptionStatus === 'ACTIVE'
                  ? 'Your subscription is active. You have full access to all features.'
                  : 'Subscribe to unlock unlimited students, advanced analytics, and more.'}
            </p>
            <Link
              href="/coordinator/settings/subscription"
              className="flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium">
                  {isVIP
                    ? 'View Subscription Details'
                    : school.subscriptionStatus === 'ACTIVE'
                      ? 'Manage Subscription'
                      : 'Subscribe Now'}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </InfoCard>

        {/* Data & Privacy */}
        <InfoCard title="Data & Privacy" icon={Shield}>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Request deletion of your school&apos;s data from the platform.
            </p>
            <Link
              href="/coordinator/settings/delete-request"
              className="flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100">
                  <Shield className="h-4 w-4 text-red-600" />
                </div>
                <span className="text-sm font-medium text-red-600">Request Data Deletion</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </InfoCard>
      </div>
    </PageContainer>
  )
}
