import { prisma } from '@/lib/prisma'
import { UniversityForm } from '@/components/admin/universities/UniversityForm'

export default async function NewUniversityPage() {
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
        <h1 className="text-2xl font-bold text-foreground">Create New University</h1>
        <p className="mt-2 text-muted-foreground">
          Add a new university to the platform. Programs can be added after the university is
          created.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border bg-card p-6">
        <UniversityForm countries={countries} />
      </div>
    </div>
  )
}
