'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FieldSelector } from '@/components/student/FieldSelector'
import { LocationSelector } from '@/components/student/LocationSelector'
import { QuickScoreInput } from '@/components/student/QuickScoreInput'
import { DetailedGradesInput } from '@/components/student/DetailedGradesInput'
import { StepIndicator } from '@/components/ui/step-indicator'

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

interface IBCourse {
  id: string
  name: string
  code: string
  group: number
}

interface CourseSelection {
  courseId: string
  courseName: string
  level: 'HL' | 'SL'
  grade: number
}

interface Step {
  number: number
  label: string
}

interface FieldSelectorClientProps {
  fields: Field[]
  countries: Country[]
  courses: IBCourse[]
  steps: Step[]
}

export function FieldSelectorClient({
  fields,
  countries,
  courses,
  steps
}: FieldSelectorClientProps) {
  const [step, setStep] = useState(1)
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [totalPoints, setTotalPoints] = useState<number | null>(null)
  const [tokGrade, setTokGrade] = useState<string | null>(null)
  const [eeGrade, setEeGrade] = useState<string | null>(null)
  const [useDetailedGrades, _setUseDetailedGrades] = useState(true) // Default to detailed grades, hide toggle
  const [courseSelections, setCourseSelections] = useState<CourseSelection[]>([])

  const handleContinueFromFields = () => {
    if (selectedFields.length >= 3 && selectedFields.length <= 5) {
      setStep(2)
    }
  }

  const handleContinueFromLocations = () => {
    setStep(3)
  }

  // Quick score handlers - kept for when/if we bring back quick score option
  const handleContinueFromQuickScore = () => {
    // TODO: Implement API call to save onboarding data to database
    // Will navigate to /student/matches after save
  }

  const handleContinueFromDetailedGrades = () => {
    // TODO: Implement API call to save detailed grades to database
    // Will navigate to /student/matches after save
  }

  const handleScoreChange = (points: number | null, tok: string | null, ee: string | null) => {
    setTotalPoints(points)
    setTokGrade(tok)
    setEeGrade(ee)
  }

  const handleDetailedGradesChange = (
    selections: CourseSelection[],
    tok: string | null,
    ee: string | null
  ) => {
    setCourseSelections(selections)
    setTokGrade(tok)
    setEeGrade(ee)
  }

  const canContinueFromFields = selectedFields.length >= 3 && selectedFields.length <= 5
  const canContinueFromDetailedGrades = courseSelections.length === 6 && tokGrade && eeGrade

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  return (
    <>
      <StepIndicator steps={steps} currentStep={step} className="mb-8" />

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
              Continue to Countries →
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
              ← Back
            </Button>
            <Button onClick={handleContinueFromLocations} size="lg">
              Continue to Scores →
            </Button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          {/* Grade entry type toggle - HIDDEN but functionality preserved */}
          {/* 
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <h3 className="font-semibold">Grade Entry Method</h3>
              <p className="text-sm text-muted-foreground">
                {useDetailedGrades
                  ? 'Enter individual subject grades'
                  : 'Enter your total IB Diploma score'}
              </p>
            </div>
            <Switch checked={useDetailedGrades} onCheckedChange={setUseDetailedGrades} />
          </div>
          */}

          {useDetailedGrades ? (
            <>
              <DetailedGradesInput
                courses={courses}
                selections={courseSelections}
                tokGrade={tokGrade}
                eeGrade={eeGrade}
                onSelectionsChange={handleDetailedGradesChange}
              />

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)} size="lg">
                  ← Back
                </Button>
                <Button
                  onClick={handleContinueFromDetailedGrades}
                  disabled={!canContinueFromDetailedGrades}
                  size="lg"
                >
                  Complete Profile
                </Button>
              </div>
            </>
          ) : (
            <>
              <QuickScoreInput
                totalPoints={totalPoints}
                tokGrade={tokGrade}
                eeGrade={eeGrade}
                onScoreChange={handleScoreChange}
              />

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)} size="lg">
                  ← Back
                </Button>
                <Button
                  onClick={handleContinueFromQuickScore}
                  disabled={totalPoints === null}
                  size="lg"
                >
                  Complete Profile
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}
