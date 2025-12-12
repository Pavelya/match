/**
 * Students List Loading State
 *
 * Displays skeleton loaders while students data is being fetched.
 */

import { GraduationCap } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { StatCardSkeletonRow } from '@/components/admin/shared/StatCardSkeleton'
import { TableSkeleton, SearchBarSkeleton } from '@/components/admin/shared/TableSkeleton'

export default function StudentsLoading() {
  return (
    <PageContainer>
      <PageHeader
        title="Students"
        icon={GraduationCap}
        description="View and manage student accounts and profiles."
      />
      <StatCardSkeletonRow count={4} className="mb-6" />
      <SearchBarSkeleton />
      <TableSkeleton rows={8} columns={6} />
    </PageContainer>
  )
}
