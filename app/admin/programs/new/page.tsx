import { prisma } from '@/lib/prisma'
import { ProgramForm } from '@/components/admin/programs/ProgramForm'

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
    <div className="p-8 max-w-4xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Create New Program</h1>
        <p className="mt-2 text-muted-foreground">
          Add a new academic program with IB course requirements.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border bg-card p-6">
        <ProgramForm
          universities={universities}
          fieldsOfStudy={fieldsOfStudy}
          ibCourses={ibCourses}
        />
      </div>
    </div>
  )
}
