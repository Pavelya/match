/**
 * Admin Program Edit Page
 *
 * Edit existing program details and IB requirements.
 */

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ProgramEditForm } from '@/components/admin/programs/ProgramEditForm'
import { FormPageLayout } from '@/components/admin/shared'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProgramEditPage({ params }: PageProps) {
  const { id } = await params

  const [program, universities, fieldsOfStudy, ibCourses] = await Promise.all([
    // Selected, not included: the whole program goes to a client component, and the old
    // `include` sent the university's row, logo and all, along with it.
    prisma.academicProgram.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        universityId: true,
        fieldOfStudyId: true,
        degreeType: true,
        duration: true,
        minIBPoints: true,
        programUrl: true,
        requirementsEntryYear: true,
        courseRequirements: {
          select: {
            id: true,
            ibCourseId: true,
            requiredLevel: true,
            minGrade: true,
            isCritical: true,
            orGroupId: true
          }
        }
      }
    }),
    prisma.university.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        country: { select: { flagEmoji: true, name: true } }
      }
    }),
    prisma.fieldOfStudy.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true }
    }),
    prisma.iBCourse.findMany({
      orderBy: [{ group: 'asc' }, { name: 'asc' }],
      select: { id: true, name: true, code: true, group: true }
    })
  ])

  if (!program) {
    notFound()
  }

  return (
    <FormPageLayout
      title="Edit Program"
      description="Update program information and IB requirements."
      breadcrumbs={[
        { label: 'Programs', href: '/admin/programs' },
        { label: program.name, href: `/admin/programs/${program.id}` },
        { label: 'Edit' }
      ]}
    >
      <ProgramEditForm
        program={program}
        universities={universities}
        fieldsOfStudy={fieldsOfStudy}
        ibCourses={ibCourses}
      />
    </FormPageLayout>
  )
}
