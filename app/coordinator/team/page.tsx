/**
 * Coordinator Team Page - Placeholder
 *
 * Will be fully implemented in task 4.8.
 * This placeholder ensures the route exists and navigation works.
 */

import { PageContainer, PageHeader, TableEmptyState } from '@/components/admin/shared'
import { UserCog, UserPlus } from 'lucide-react'

export default function CoordinatorTeamPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Team"
        icon={UserCog}
        description="Manage coordinators at your school"
        actions={[
          {
            label: 'Invite Coordinator',
            href: '/coordinator/team/invite',
            icon: UserPlus,
            variant: 'primary'
          }
        ]}
      />

      <TableEmptyState
        icon={UserCog}
        title="No other coordinators"
        description="You're the only coordinator at this school. Invite other coordinators to help manage students and view analytics."
        action={{
          label: 'Invite Coordinator',
          href: '/coordinator/team/invite'
        }}
      />
    </PageContainer>
  )
}
