/**
 * Universities List Loading State
 *
 * Displays skeleton loaders while universities data is being fetched.
 */

import { Building2 } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { StatCardSkeletonRow } from '@/components/admin/shared/StatCardSkeleton'
import { TableSkeleton, SearchBarSkeleton } from '@/components/admin/shared/TableSkeleton'

export default function UniversitiesLoading() {
  return (
    <PageContainer>
      <PageHeader
        title="Universities"
        icon={Building2}
        description="Manage universities and their programs."
      />
      <StatCardSkeletonRow count={4} className="mb-6" />
      <SearchBarSkeleton />
      <TableSkeleton rows={8} columns={5} />
    </PageContainer>
  )
}
