/**
 * Invite Coordinator Page
 *
 * Page for coordinators to invite other coordinators to their school.
 * Only accessible to VIP or subscribed REGULAR coordinators.
 *
 * Part of Task 4.8: Coordinator-to-Coordinator Invitation
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  PageContainer,
  PageHeader,
  FormPageLayout,
  UpgradePromptBanner
} from '@/components/admin/shared'
import { UserCog } from 'lucide-react'
import { getCoordinatorAccess } from '@/lib/auth/access-control'
import { InviteCoordinatorForm } from './InviteCoordinatorForm'

export default async function InviteCoordinatorPage() {
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

  // If no access to invite coordinators, show upgrade prompt
  if (!access.canInviteCoordinators) {
    return (
      <PageContainer maxWidth="3xl">
        <PageHeader
          title="Invite Coordinator"
          icon={UserCog}
          description="Invite another coordinator to help manage your school"
          backHref="/coordinator/team"
          backLabel="Back to Team"
        />

        <UpgradePromptBanner
          feature="Invite Coordinators"
          description="Upgrade to a paid subscription to invite additional coordinators to help manage your school's students and view analytics."
          variant="card"
          upgradeHref="/coordinator/settings/subscription"
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer maxWidth="3xl">
      <PageHeader
        title="Invite Coordinator"
        icon={UserCog}
        description="Invite another coordinator to help manage your school"
        backHref="/coordinator/team"
        backLabel="Back to Team"
      />

      <FormPageLayout
        title="Coordinator Invitation"
        description="The coordinator will receive an email with an invitation link. Once they accept, they'll have full access to manage students at your school."
      >
        <InviteCoordinatorForm schoolName={school.name} />
      </FormPageLayout>
    </PageContainer>
  )
}
