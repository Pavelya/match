/**
 * Admin University Edit Page
 *
 * Edit existing university details.
 */

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { UniversityEditForm } from '@/components/admin/universities/UniversityEditForm'
import { FormPageLayout } from '@/components/admin/shared'

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
    <FormPageLayout
      title="Edit University"
      description="Update university information and settings."
      breadcrumbs={[
        { label: 'Universities', href: '/admin/universities' },
        {
          label: university.abbreviatedName || university.name,
          href: `/admin/universities/${university.id}`
        },
        { label: 'Edit' }
      ]}
    >
      <UniversityEditForm university={university} countries={countries} />
    </FormPageLayout>
  )
}
