'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FieldSelector } from '@/components/student/FieldSelector'

interface Field {
  id: string
  name: string
  icon?: string
}

interface FieldSelectorClientProps {
  fields: Field[]
}

export function FieldSelectorClient({ fields }: FieldSelectorClientProps) {
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
    <>
      <FieldSelector
        fields={fields}
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
    </>
  )
}
