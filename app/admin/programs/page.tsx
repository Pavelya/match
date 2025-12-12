/**
 * Admin Programs List Page
 *
 * Displays all academic programs with:
 * - Stats summary row (by degree type)
 * - Search and filter capabilities
 * - Program name & duration
 * - University
 * - Field of study
 * - Degree type
 * - Min IB points
 * - Edit and delete actions
 */

import { prisma } from '@/lib/prisma'
import { Plus, BookOpen } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { ProgramsListClient } from '@/components/admin/programs/ProgramsListClient'

export default async function ProgramsPage() {
  const programs = await prisma.academicProgram.findMany({
    orderBy: [{ university: { name: 'asc' } }, { name: 'asc' }],
    include: {
      university: {
        include: {
          country: true
        }
      },
      fieldOfStudy: true,
      _count: {
        select: {
          courseRequirements: true,
          savedBy: true
        }
      }
    }
  })

  return (
    <PageContainer>
      <PageHeader
        title="Academic Programs"
        icon={BookOpen}
        description="Manage university programs and their IB requirements."
        actions={[
          { label: 'Add Program', href: '/admin/programs/new', icon: Plus, variant: 'primary' }
        ]}
      />

      <ProgramsListClient programs={programs} />
    </PageContainer>
  )
}
