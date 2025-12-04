'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FieldSelector } from '@/components/student/FieldSelector'
import { LocationSelector } from '@/components/student/LocationSelector'
import { QuickScoreInput } from '@/components/student/QuickScoreInput'
import { DetailedGradesInput } from '@/components/student/DetailedGradesInput'

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
  courseId: string | null
  level: 'HL' | 'SL' | null
  grade: number | null
}

interface FieldSelectorClientProps {
  fields: Field[]
  countries: Country[]
  courses: IBCourse[]
}

export function FieldSelectorClient({ fields, countries, courses }: FieldSelectorClientProps) {
  const [step, setStep] = useState(1)
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [totalPoints, setTotalPoints] = useState<number | null>(null)
  const [tokGrade, setTokGrade] = useState<string | null>(null)
  const [eeGrade, setEeGrade] = useState<string | null>(null)
  const [useDetailedGrades, setUseDetailedGrades] = useState(false)
  const [courseSelections, setCourseSelections] = useState<CourseSelection[]>(
    Array(6).fill({ courseId: null, level: null, grade: null })
  )

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

  const handleSwitchToDetailed = () => {
    setUseDetailedGrades(true)
  }

  const handleSwitchToQuick = () => {
    setUseDetailedGrades(false)
  }

  const canContinueFromFields = selectedFields.length >= 3 && selectedFields.length <= 5
  const canContinueFromQuickScore = totalPoints !== null && tokGrade !== null && eeGrade !== null
  const canContinueFromDetailedGrades =
    courseSelections.every((sel) => sel.courseId && sel.level && sel.grade !== null) &&
    tokGrade &&
    eeGrade

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

      {step === 3 && !useDetailedGrades && (
        <>
          <QuickScoreInput
            totalPoints={totalPoints}
            tokGrade={tokGrade}
            eeGrade={eeGrade}
            onScoreChange={handleScoreChange}
          />

          <div className="text-center">
            <button
              onClick={handleSwitchToDetailed}
              className="text-sm text-primary underline hover:no-underline"
            >
              Or enter detailed grades instead
            </button>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)} size="lg">
              Back
            </Button>
            <Button
              onClick={handleContinueFromQuickScore}
              disabled={!canContinueFromQuickScore}
              size="lg"
            >
              Continue
            </Button>
          </div>
        </>
      )}

      {step === 3 && useDetailedGrades && (
        <>
          <DetailedGradesInput
            courses={courses}
            selections={courseSelections}
            tokGrade={tokGrade}
            eeGrade={eeGrade}
            onSelectionsChange={handleDetailedGradesChange}
          />

          <div className="text-center">
            <button
              onClick={handleSwitchToQuick}
              className="text-sm text-primary underline hover:no-underline"
            >
              Switch to quick score entry
            </button>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)} size="lg">
              Back
            </Button>
            <Button
              onClick={handleContinueFromDetailedGrades}
              disabled={!canContinueFromDetailedGrades}
              size="lg"
            >
              Continue
            </Button>
          </div>
        </>
      )}
    </>
  )
}
