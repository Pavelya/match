/**
 * Admin Program Create Page
 *
 * Form for creating a new academic program.
 */

import { prisma } from '@/lib/prisma'
import { ProgramForm } from '@/components/admin/programs/ProgramForm'
import { FormPageLayout } from '@/components/admin/shared'

export default async function NewProgramPage() {
  // Fetch all reference data needed for the form
  const [universities, fieldsOfStudy, ibCourses] = await Promise.all([
    prisma.university.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        country: {
          select: { flagEmoji: true, name: true }
        }
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

  return (
    <FormPageLayout
      title="Create New Program"
      description="Add a new academic program with IB course requirements."
      backHref="/admin/programs"
      backLabel="Back to Programs"
    >
      <ProgramForm
        universities={universities}
        fieldsOfStudy={fieldsOfStudy}
        ibCourses={ibCourses}
      />
    </FormPageLayout>
  )
}
