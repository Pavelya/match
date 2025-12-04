'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FieldSelector } from '@/components/student/FieldSelector'
import { LocationSelector } from '@/components/student/LocationSelector'

interface Field {
  id: string
  name: string
  icon?: string
}

interface Country {
  id: string
  name: string
  code: string
  flagEmoji: string
}

interface FieldSelectorClientProps {
  fields: Field[]
  countries: Country[]
}

export function FieldSelectorClient({ fields, countries }: FieldSelectorClientProps) {
  const [step, setStep] = useState(1)
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])

  const handleContinueFromFields = () => {
    if (selectedFields.length >= 3 && selectedFields.length <= 5) {
      setStep(2)
    }
  }

  const handleContinueFromLocations = () => {
    // TODO: Save both fields and countries to database and navigate to next step
    // eslint-disable-next-line no-console
    console.log('Selected fields:', selectedFields)
    // eslint-disable-next-line no-console
    console.log('Selected countries:', selectedCountries)
  }

  const handleSkipLocations = () => {
    // TODO: Save fields (no countries) and navigate to next step
    // eslint-disable-next-line no-console
    console.log('Skipped location selection')
    handleContinueFromLocations()
  }

  const canContinueFromFields = selectedFields.length >= 3 && selectedFields.length <= 5

  return (
    <>
      {step === 1 && (
        <>
          <FieldSelector
            fields={fields}
            selectedFields={selectedFields}
            onSelectionChange={setSelectedFields}
            minSelection={3}
            maxSelection={5}
          />

          <div className="flex justify-end">
            <Button onClick={handleContinueFromFields} disabled={!canContinueFromFields} size="lg">
              Continue
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <LocationSelector
            countries={countries}
            selectedCountries={selectedCountries}
            onSelectionChange={setSelectedCountries}
          />

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)} size="lg">
              Back
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSkipLocations} size="lg">
                Skip
              </Button>
              <Button onClick={handleContinueFromLocations} size="lg">
                Continue
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
