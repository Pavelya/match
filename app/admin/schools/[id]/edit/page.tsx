/**
 * Admin School Edit Page
 *
 * Edit existing school details.
 */

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArrowLeft } from 'lucide-react'
import { SchoolEditForm } from '@/components/admin/schools/SchoolEditForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function SchoolEditPage({ params }: PageProps) {
  const { id } = await params

  const [school, countries] = await Promise.all([
    prisma.iBSchool.findUnique({
      where: { id },
      include: { country: true }
    }),
    prisma.country.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, code: true, flagEmoji: true }
    })
  ])

  if (!school) {
    notFound()
  }

  return (
    <div className="p-8 max-w-3xl">
      {/* Back link */}
      <Link
        href={`/admin/schools/${school.id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to School Details
      </Link>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Edit School</h1>
        <p className="mt-2 text-muted-foreground">Update school information and settings.</p>
      </div>

      {/* Form */}
      <div className="rounded-xl border bg-card p-6">
        <SchoolEditForm school={school} countries={countries} />
      </div>
    </div>
  )
}
