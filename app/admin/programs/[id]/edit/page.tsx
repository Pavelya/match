import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArrowLeft } from 'lucide-react'
import { ProgramEditForm } from '@/components/admin/programs/ProgramEditForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProgramEditPage({ params }: PageProps) {
  const { id } = await params

  const [program, universities, fieldsOfStudy, ibCourses] = await Promise.all([
    prisma.academicProgram.findUnique({
      where: { id },
      include: {
        university: { include: { country: true } },
        fieldOfStudy: true,
        courseRequirements: { include: { ibCourse: true } }
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
    <div className="p-8 max-w-4xl">
      {/* Back link */}
      <Link
        href={`/admin/programs/${program.id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Program Details
      </Link>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Edit Program</h1>
        <p className="mt-2 text-muted-foreground">
          Update program information and IB requirements.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border bg-card p-6">
        <ProgramEditForm
          program={program}
          universities={universities}
          fieldsOfStudy={fieldsOfStudy}
          ibCourses={ibCourses}
        />
      </div>
    </div>
  )
}
