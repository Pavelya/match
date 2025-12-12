/**
 * Admin University Create Page
 *
 * Form for creating a new university.
 */

import { prisma } from '@/lib/prisma'
import { UniversityForm } from '@/components/admin/universities/UniversityForm'
import { FormPageLayout } from '@/components/admin/shared'

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
    <FormPageLayout
      title="Create New University"
      description="Add a new university to the platform. Programs can be added after the university is created."
      backHref="/admin/universities"
      backLabel="Back to Universities"
    >
      <UniversityForm countries={countries} />
    </FormPageLayout>
  )
}
