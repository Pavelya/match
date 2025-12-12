/**
 * Schools List Loading State
 *
 * Displays skeleton loaders while schools data is being fetched.
 */

import { School } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { StatCardSkeletonRow } from '@/components/admin/shared/StatCardSkeleton'
import { TableSkeleton, SearchBarSkeleton } from '@/components/admin/shared/TableSkeleton'

export default function SchoolsLoading() {
  return (
    <PageContainer>
      <PageHeader title="Schools" icon={School} description="Manage IB schools on the platform." />
      <StatCardSkeletonRow count={4} className="mb-6" />
      <SearchBarSkeleton />
      <TableSkeleton rows={8} columns={5} />
    </PageContainer>
  )
}
