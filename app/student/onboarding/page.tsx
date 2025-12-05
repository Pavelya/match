import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { FieldSelectorClient } from './FieldSelectorClient'

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

  // Fetch fields of study from database (single source of truth)
  const fields = await prisma.fieldOfStudy.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      iconName: true
    }
  })

  // Fetch countries from database (single source of truth)
  const countries = await prisma.country.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      code: true,
      flagEmoji: true
    }
  })

  // Fetch IB courses from database (single source of truth)
  const ibCourses = await prisma.iBCourse.findMany({
    orderBy: [{ group: 'asc' }, { name: 'asc' }],
    select: {
      id: true,
      name: true,
      code: true,
      group: true
    }
  })

  // Transform to format expected by FieldSelector
  const fieldsForSelector = fields.map(
    (field: { id: string; name: string; iconName: string | null }) => ({
      id: field.id,
      name: field.name,
      icon: field.iconName || '📚' // Fallback icon if not set
    })
  )

  return (
    <div className="w-full space-y-6 px-8">
      <Card>
        <CardContent className="space-y-6 pt-6">
          <FieldSelectorClient
            fields={fieldsForSelector}
            countries={countries}
            courses={ibCourses}
            steps={ONBOARDING_STEPS}
          />
        </CardContent>
      </Card>
    </div>
  )
}
