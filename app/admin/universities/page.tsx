/**
 * Admin Universities List Page
 *
 * Displays all universities with:
 * - Stats summary row
 * - Search and filter capabilities
 * - Location (flag + city, country)
 * - Classification (Public/Private)
 * - Programs count
 * - Edit and delete actions
 */

import { prisma } from '@/lib/prisma'
import { Plus, Building2 } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { UniversitiesListClient } from '@/components/admin/universities/UniversitiesListClient'

export default async function UniversitiesPage() {
  const universities = await prisma.university.findMany({
    orderBy: { name: 'asc' },
    include: {
      country: true,
      _count: {
        select: {
          programs: true,
          agents: true
        }
      }
    }
  })

  return (
    <PageContainer>
      <PageHeader
        title="Universities"
        icon={Building2}
        description="Manage universities and their academic programs."
        actions={[
          {
            label: 'Add University',
            href: '/admin/universities/new',
            icon: Plus,
            variant: 'primary'
          }
        ]}
      />

      <UniversitiesListClient universities={universities} />
    </PageContainer>
  )
}
