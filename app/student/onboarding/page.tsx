import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldSelectorClient } from './FieldSelectorClient'

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

  // Transform to format expected by FieldSelector
  const fieldsForSelector = fields.map(
    (field: { id: string; name: string; iconName: string | null }) => ({
      id: field.id,
      name: field.name,
      icon: field.iconName || '📚' // Fallback icon if not set
    })
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>What do you want to study?</CardTitle>
          <CardDescription>
            Select 3-5 fields of study you&apos;re interested in. This will help us find the perfect
            university programs for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FieldSelectorClient fields={fieldsForSelector} countries={countries} />
        </CardContent>
      </Card>
    </div>
  )
}
