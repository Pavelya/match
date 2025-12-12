/**
 * Programs List Loading State
 *
 * Displays skeleton loaders while programs data is being fetched.
 */

import { BookOpen } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { StatCardSkeletonRow } from '@/components/admin/shared/StatCardSkeleton'
import { TableSkeleton, SearchBarSkeleton } from '@/components/admin/shared/TableSkeleton'

export default function ProgramsLoading() {
  return (
    <PageContainer>
      <PageHeader
        title="Programs"
        icon={BookOpen}
        description="Manage academic programs and their requirements."
      />
      <StatCardSkeletonRow count={4} className="mb-6" />
      <SearchBarSkeleton />
      <TableSkeleton rows={8} columns={6} />
    </PageContainer>
  )
}
