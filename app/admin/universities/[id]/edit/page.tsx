/**
 * Admin University Edit Page
 *
 * Edit existing university details.
 */

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArrowLeft } from 'lucide-react'
import { UniversityEditForm } from '@/components/admin/universities/UniversityEditForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function UniversityEditPage({ params }: PageProps) {
  const { id } = await params

  const [university, countries] = await Promise.all([
    prisma.university.findUnique({
      where: { id },
      include: { country: true }
    }),
    prisma.country.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, code: true, flagEmoji: true }
    })
  ])

  if (!university) {
    notFound()
  }

  return (
    <div className="p-8 max-w-3xl">
      {/* Back link */}
      <Link
        href={`/admin/universities/${university.id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to University Details
      </Link>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Edit University</h1>
        <p className="mt-2 text-muted-foreground">Update university information and settings.</p>
      </div>

      {/* Form */}
      <div className="rounded-xl border bg-card p-6">
        <UniversityEditForm university={university} countries={countries} />
      </div>
    </div>
  )
}
