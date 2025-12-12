/**
 * Agents List Loading State
 *
 * Displays skeleton loaders while agents data is being fetched.
 */

import { Briefcase } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { StatCardSkeletonRow } from '@/components/admin/shared/StatCardSkeleton'
import { TableSkeleton, SearchBarSkeleton } from '@/components/admin/shared/TableSkeleton'

export default function AgentsLoading() {
  return (
    <PageContainer>
      <PageHeader
        title="University Agents"
        icon={Briefcase}
        description="View and manage university agent accounts."
      />
      <StatCardSkeletonRow count={4} className="mb-6" />
      <SearchBarSkeleton />
      <TableSkeleton rows={8} columns={5} />
    </PageContainer>
  )
}
