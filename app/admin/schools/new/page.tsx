/**
 * Admin School Create Page
 *
 * Form for creating a new IB school.
 */

import { prisma } from '@/lib/prisma'
import { SchoolForm } from '@/components/admin/schools/SchoolForm'
import { FormPageLayout } from '@/components/admin/shared'

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
    <FormPageLayout
      title="Create New School"
      description="Add a new IB school to the platform. Coordinators can be invited after the school is created."
      backHref="/admin/schools"
      backLabel="Back to Schools"
    >
      <SchoolForm countries={countries} />
    </FormPageLayout>
  )
}
