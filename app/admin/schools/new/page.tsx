import { prisma } from '@/lib/prisma'
import { SchoolForm } from '@/components/admin/schools/SchoolForm'

export default async function NewSchoolPage() {
  // Fetch countries for the selector
  const countries = await prisma.country.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      code: true,
      flagEmoji: true
    }
  })

  return (
    <div className="p-8 max-w-3xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Create New School</h1>
        <p className="mt-2 text-muted-foreground">
          Add a new IB school to the platform. Coordinators can be invited after the school is
          created.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border bg-card p-6">
        <SchoolForm countries={countries} />
      </div>
    </div>
  )
}
