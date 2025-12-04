'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FieldSelector } from '@/components/student/FieldSelector'
import { LocationSelector } from '@/components/student/LocationSelector'
import { QuickScoreInput } from '@/components/student/QuickScoreInput'

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
  const [totalPoints, setTotalPoints] = useState<number | null>(null)
  const [tokGrade, setTokGrade] = useState<string | null>(null)
  const [eeGrade, setEeGrade] = useState<string | null>(null)

  const handleContinueFromFields = () => {
    if (selectedFields.length >= 3 && selectedFields.length <= 5) {
      setStep(2)
    }
  }

  const handleContinueFromLocations = () => {
    setStep(3)
  }

  const handleSkipLocations = () => {
    setStep(3)
  }

  const handleContinueFromScore = () => {
    // TODO: Save all data to database and navigate to next step
    // eslint-disable-next-line no-console
    console.log('Onboarding data:', {
      selectedFields,
      selectedCountries,
      totalPoints,
      tokGrade,
      eeGrade
    })
  }

  const handleScoreChange = (points: number | null, tok: string | null, ee: string | null) => {
    setTotalPoints(points)
    setTokGrade(tok)
    setEeGrade(ee)
  }

  const canContinueFromFields = selectedFields.length >= 3 && selectedFields.length <= 5
  const canContinueFromScore = totalPoints !== null && tokGrade !== null && eeGrade !== null

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

      {step === 3 && (
        <>
          <QuickScoreInput
            totalPoints={totalPoints}
            tokGrade={tokGrade}
            eeGrade={eeGrade}
            onScoreChange={handleScoreChange}
          />

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)} size="lg">
              Back
            </Button>
            <Button onClick={handleContinueFromScore} disabled={!canContinueFromScore} size="lg">
              Continue
            </Button>
          </div>
        </>
      )}
    </>
  )
}
