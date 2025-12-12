/**
 * Coordinators List Loading State
 *
 * Displays skeleton loaders while coordinators data is being fetched.
 */

import { Users } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { StatCardSkeletonRow } from '@/components/admin/shared/StatCardSkeleton'
import { TableSkeleton, SearchBarSkeleton } from '@/components/admin/shared/TableSkeleton'

export default function CoordinatorsLoading() {
  return (
    <PageContainer>
      <PageHeader
        title="Coordinators"
        icon={Users}
        description="Manage school coordinators and their access."
      />
      <StatCardSkeletonRow count={4} className="mb-6" />
      <SearchBarSkeleton />
      <TableSkeleton rows={8} columns={5} />
    </PageContainer>
  )
}
