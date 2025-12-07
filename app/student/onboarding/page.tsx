import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { FieldSelectorClient } from './FieldSelectorClient'
import { getCachedFields, getCachedCountries, getCachedIBCourses } from '@/lib/reference-data'
import { PageContainer } from '@/components/layout/PageContainer'

const ONBOARDING_STEPS = [
  { number: 1, label: 'Study Interests' },
  { number: 2, label: 'Location Preferences' },
  { number: 3, label: 'Academic Profile' }
]

export default async function OnboardingPage() {
  // Check authentication
  const session = await auth()
  if (!session) {
    redirect('/auth/signin')
  }

  // Fetch reference data from cache (Next.js unstable_cache)
  // These rarely change, so 1 hour TTL is safe
  const [fields, countries, ibCourses] = await Promise.all([
    getCachedFields(),
    getCachedCountries(),
    getCachedIBCourses()
  ])

  // Fetch existing student profile if it exists (for pre-populating form)
  const existingProfile = session.user
    ? await prisma.studentProfile.findUnique({
        where: { userId: session.user.id },
        include: {
          preferredFields: {
            select: { id: true }
          },
          preferredCountries: {
            select: { id: true }
          },
          courses: {
            include: {
              ibCourse: {
                select: { id: true, name: true }
              }
            }
          }
        }
      })
    : null

  // Transform existing profile data for client component
  const initialData = existingProfile
    ? {
        selectedFields: existingProfile.preferredFields.map((f) => f.id),
        selectedCountries: existingProfile.preferredCountries.map((c) => c.id),
        courseSelections: existingProfile.courses.map((c) => ({
          courseId: c.ibCourse.id,
          courseName: c.ibCourse.name,
          level: c.level as 'HL' | 'SL',
          grade: c.grade
        })),
        tokGrade: existingProfile.tokGrade,
        eeGrade: existingProfile.eeGrade,
        totalPoints: existingProfile.totalIBPoints
      }
    : undefined

  // Transform to format expected by FieldSelector
  const fieldsForSelector = fields.map((field) => ({
    id: field.id,
    name: field.name,
    icon: field.iconName || '📚',
    description: field.description ?? ''
  }))

  return (
    <PageContainer withBackground={false}>
      <FieldSelectorClient
        fields={fieldsForSelector}
        countries={countries}
        courses={ibCourses}
        steps={ONBOARDING_STEPS}
        initialData={initialData}
      />
    </PageContainer>
  )
}
