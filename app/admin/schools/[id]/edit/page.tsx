/**
 * Admin School Edit Page
 *
 * Edit existing school details.
 */

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SchoolEditForm } from '@/components/admin/schools/SchoolEditForm'
import { FormPageLayout } from '@/components/admin/shared'

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
    <FormPageLayout
      title="Edit School"
      description="Update school information and settings."
      breadcrumbs={[
        { label: 'Schools', href: '/admin/schools' },
        { label: school.name, href: `/admin/schools/${school.id}` },
        { label: 'Edit' }
      ]}
    >
      <SchoolEditForm school={school} countries={countries} />
    </FormPageLayout>
  )
}
