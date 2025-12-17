'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FieldSelector } from '@/components/student/FieldSelector'
import { LocationSelector } from '@/components/student/LocationSelector'
import { QuickScoreInput } from '@/components/student/QuickScoreInput'
import { DetailedGradesInput } from '@/components/student/DetailedGradesInput'
import { StepIndicator } from '@/components/ui/step-indicator'
import { FadeIn } from '@/components/ui/fade-in'

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

interface InitialData {
  selectedFields: string[]
  selectedCountries: string[]
  courseSelections: CourseSelection[]
  tokGrade: string | null
  eeGrade: string | null
  totalPoints: number | null
}

interface FieldSelectorClientProps {
  fields: Field[]
  countries: Country[]
  courses: IBCourse[]
  steps: Step[]
  initialData?: InitialData
}

export function FieldSelectorClient({
  fields,
  countries,
  courses,
  steps,
  initialData
}: FieldSelectorClientProps) {
  const [step, setStep] = useState(1)
  const [selectedFields, setSelectedFields] = useState<string[]>(initialData?.selectedFields || [])
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    initialData?.selectedCountries || []
  )
  const [totalPoints, setTotalPoints] = useState<number | null>(initialData?.totalPoints || null)
  const [tokGrade, setTokGrade] = useState<string | null>(initialData?.tokGrade || null)
  const [eeGrade, setEeGrade] = useState<string | null>(initialData?.eeGrade || null)
  const [useDetailedGrades, _setUseDetailedGrades] = useState(true) // Default to detailed grades, hide toggle
  const [courseSelections, setCourseSelections] = useState<CourseSelection[]>(
    initialData?.courseSelections || []
  )
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const router = useRouter()

  const handleContinueFromFields = () => {
    if (selectedFields.length >= 3 && selectedFields.length <= 5) {
      setStep(2)
    }
  }

  const handleContinueFromLocations = () => {
    setStep(3)
  }

  // Calculate total IB points from course selections
  const calculateTotalPoints = () => {
    if (courseSelections.length !== 6 || !tokGrade || !eeGrade) return null

    const subjectPoints = courseSelections.reduce((sum, sel) => sum + sel.grade, 0)

    // TOK/EE bonus points (simplified - actual IB matrix is more complex)
    const tokValue = 5 - ['A', 'B', 'C', 'D', 'E'].indexOf(tokGrade)
    const eeValue = 5 - ['A', 'B', 'C', 'D', 'E'].indexOf(eeGrade)
    const bonusPoints = Math.min(3, Math.max(0, tokValue + eeValue - 6))

    return subjectPoints + bonusPoints
  }

  // Quick score handlers - kept for when/if we bring back quick score option
  const handleContinueFromQuickScore = async () => {
    if (!totalPoints || !tokGrade || !eeGrade) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const response = await fetch('/api/students/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interestedFields: selectedFields,
          preferredCountries: selectedCountries,
          courseSelections: [],
          tokGrade,
          eeGrade,
          totalIBPoints: totalPoints
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save profile')
      }

      router.push('/student/matches')
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleContinueFromDetailedGrades = async () => {
    if (courseSelections.length !== 6 || !tokGrade || !eeGrade) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const totalPoints = calculateTotalPoints()

      const response = await fetch('/api/students/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interestedFields: selectedFields,
          preferredCountries: selectedCountries,
          courseSelections,
          tokGrade,
          eeGrade,
          totalIBPoints: totalPoints
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save profile')
      }

      router.push('/student/matches')
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save profile')
    } finally {
      setIsSaving(false)
    }
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
      {/* Animated Step Indicator */}
      <FadeIn direction="down" duration={300}>
        <StepIndicator steps={steps} currentStep={step} className="mb-8" />
      </FadeIn>

      {step === 1 && (
        <FadeIn key="step-1" direction="up" duration={400}>
          <FieldSelector
            fields={fields}
            selectedFields={selectedFields}
            onSelectionChange={setSelectedFields}
            minSelection={3}
            maxSelection={5}
          />

          <div className="flex justify-end mt-8">
            <Button onClick={handleContinueFromFields} disabled={!canContinueFromFields} size="lg">
              Continue to Countries →
            </Button>
          </div>
        </FadeIn>
      )}

      {step === 2 && (
        <FadeIn key="step-2" direction="up" duration={400}>
          <LocationSelector
            countries={countries}
            selectedCountries={selectedCountries}
            onSelectionChange={setSelectedCountries}
          />

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setStep(1)} size="lg">
              ← Back
            </Button>
            <Button onClick={handleContinueFromLocations} size="lg">
              Continue to Scores →
            </Button>
          </div>
        </FadeIn>
      )}

      {step === 3 && (
        <FadeIn key="step-3" direction="up" duration={400}>
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

              {saveError && (
                <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                  {saveError}
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep(2)} size="lg" disabled={isSaving}>
                  ← Back
                </Button>
                <Button
                  onClick={handleContinueFromDetailedGrades}
                  disabled={!canContinueFromDetailedGrades || isSaving}
                  size="lg"
                >
                  {isSaving ? 'Saving...' : 'Complete Profile'}
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

              {saveError && (
                <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                  {saveError}
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep(2)} size="lg" disabled={isSaving}>
                  ← Back
                </Button>
                <Button
                  onClick={handleContinueFromQuickScore}
                  disabled={totalPoints === null || isSaving}
                  size="lg"
                >
                  {isSaving ? 'Saving...' : 'Complete Profile'}
                </Button>
              </div>
            </>
          )}
        </FadeIn>
      )}
    </>
  )
}
