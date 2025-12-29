/**
 * Admin Bulk Program Upload Page
 *
 * Server component that fetches reference data and renders the bulk upload form.
 */

import { prisma } from '@/lib/prisma'
import { BulkUploadForm } from '@/components/admin/programs/BulkUploadForm'
import { FormPageLayout } from '@/components/admin/shared'
import { Upload } from 'lucide-react'

export default async function BulkUploadPage() {
  // Fetch all reference data needed for validation and display
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
    <FormPageLayout
      title="Bulk Program Upload"
      description="Upload multiple programs at once using a CSV file."
      icon={Upload}
      backHref="/admin/programs"
      backLabel="Back to Programs"
      maxWidth="5xl"
    >
      <BulkUploadForm
        universities={universities}
        fieldsOfStudy={fieldsOfStudy}
        ibCourses={ibCourses}
      />
    </FormPageLayout>
  )
}
