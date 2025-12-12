/**
 * Admin Schools List Page
 *
 * Displays all IB schools with:
 * - Stats summary row
 * - Search and filter capabilities
 * - Tier badges (VIP/Regular)
 * - Subscription status
 * - Coordinator and student counts
 * - Edit and delete actions
 */

import { prisma } from '@/lib/prisma'
import { Plus, GraduationCap } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { SchoolsListClient } from '@/components/admin/schools/SchoolsListClient'

export default async function SchoolsPage() {
  const schools = await prisma.iBSchool.findMany({
    orderBy: { name: 'asc' },
    include: {
      country: true,
      _count: {
        select: {
          coordinators: true,
          students: true
        }
      }
    }
  })

  return (
    <PageContainer>
      <PageHeader
        title="IB Schools"
        icon={GraduationCap}
        description="Manage IB schools and their coordinators."
        actions={[
          { label: 'Add School', href: '/admin/schools/new', icon: Plus, variant: 'primary' }
        ]}
      />

      <SchoolsListClient schools={schools} />
    </PageContainer>
  )
}
