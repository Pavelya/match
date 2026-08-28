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
  // Selected rather than included. `include` pulled every column of every
  // joined row, which meant the full University record - including its image,
  // stored inline as base64 - for all 1,282 programs on every page load. One
  // 537KB image on a university with 68 programs made that a 37MB transfer of
  // data this page never renders. Keep this list aligned with the Program
  // interface in ProgramsListClient.
  const programs = await prisma.academicProgram.findMany({
    orderBy: [{ university: { name: 'asc' } }, { name: 'asc' }],
    select: {
      id: true,
      name: true,
      duration: true,
      degreeType: true,
      minIBPoints: true,
      university: {
        select: {
          id: true,
          name: true,
          city: true,
          country: { select: { flagEmoji: true } }
        }
      },
      fieldOfStudy: { select: { id: true, name: true } },
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
