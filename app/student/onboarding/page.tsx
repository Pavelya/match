'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FieldSelector } from '@/components/student/FieldSelector'

// TODO: Fetch from database in the future
const MOCK_FIELDS = [
  { id: '1', name: 'Business & Economics', icon: '💼' },
  { id: '2', name: 'Engineering', icon: '⚙️' },
  { id: '3', name: 'Medicine & Health', icon: '🏥' },
  { id: '4', name: 'Computer Science', icon: '💻' },
  { id: '5', name: 'Law', icon: '⚖️' },
  { id: '6', name: 'Arts & Humanities', icon: '🎨' },
  { id: '7', name: 'Natural Sciences', icon: '🔬' },
  { id: '8', name: 'Social Sciences', icon: '👥' },
  { id: '9', name: 'Architecture', icon: '🏛️' },
  { id: '10', name: 'Environmental Studies', icon: '🌱' }
]

export default function OnboardingPage() {
  const [selectedFields, setSelectedFields] = useState<string[]>([])

  const handleContinue = () => {
    if (selectedFields.length >= 3 && selectedFields.length <= 5) {
      // TODO: Save to database and navigate to next step
      // eslint-disable-next-line no-console
      console.log('Selected fields:', selectedFields)
    }
  }

  const canContinue = selectedFields.length >= 3 && selectedFields.length <= 5

  return (
    <Card>
      <CardHeader>
        <CardTitle>What do you want to study?</CardTitle>
        <CardDescription>
          Select 3-5 fields of study you&apos;re interested in. This will help us find the perfect
          university programs for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FieldSelector
          fields={MOCK_FIELDS}
          selectedFields={selectedFields}
          onSelectionChange={setSelectedFields}
          minSelection={3}
          maxSelection={5}
        />

        <div className="flex justify-end">
          <Button onClick={handleContinue} disabled={!canContinue} size="lg">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
