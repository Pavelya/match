'use client'

import { useEffect, useMemo } from 'react'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { SubjectSelectorDialog } from './SubjectSelectorDialog'
import { X, AlertTriangle } from 'lucide-react'
import { getCorePoints } from '@/lib/ib/core-points'
import { validateDiploma } from '@/lib/ib/diploma'

const GRADE_OPTIONS = ['A', 'B', 'C', 'D', 'E'] as const

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

interface DetailedGradesInputProps {
  courses: IBCourse[]
  selections: CourseSelection[]
  tokGrade: string | null
  eeGrade: string | null
  onSelectionsChange: (
    selections: CourseSelection[],
    tokGrade: string | null,
    eeGrade: string | null
  ) => void
  /** Callback to notify parent of validation status (used to disable save button) */
  onValidationChange?: (isValid: boolean) => void
}

export function DetailedGradesInput({
  courses,
  selections,
  tokGrade,
  eeGrade,
  onSelectionsChange,
  onValidationChange
}: DetailedGradesInputProps) {
  const handleAddSubject = (newSelection: CourseSelection) => {
    onSelectionsChange([...selections, newSelection], tokGrade, eeGrade)
  }

  const handleRemoveSubject = (courseId: string) => {
    onSelectionsChange(
      selections.filter((s) => s.courseId !== courseId),
      tokGrade,
      eeGrade
    )
  }

  const handleTokChange = (grade: string) => {
    onSelectionsChange(selections, grade === tokGrade ? null : grade, eeGrade)
  }

  const handleEeChange = (grade: string) => {
    onSelectionsChange(selections, tokGrade, grade === eeGrade ? null : grade)
  }

  // Calculate total points
  const calculateTotal = () => {
    const subjectPoints = selections.reduce((sum, sel) => sum + sel.grade, 0)

    // TOK/EE core points from the IB matrix. An E fails the diploma and adds nothing.
    const corePoints = getCorePoints(tokGrade, eeGrade)
    const bonusPoints = typeof corePoints === 'number' ? corePoints : 0

    return { subjectPoints, bonusPoints, total: subjectPoints + bonusPoints }
  }

  const { subjectPoints, bonusPoints, total } = calculateTotal()
  const isComplete = selections.length === 6 && tokGrade && eeGrade

  // Validate diploma requirements
  const validation = useMemo(
    () => validateDiploma(selections, tokGrade, eeGrade),
    [selections, tokGrade, eeGrade]
  )

  // Notify parent of validation changes
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(validation.isValid)
    }
  }, [validation.isValid, onValidationChange])

  return (
    <div className="space-y-6">
      {/* Diploma Failing Warning */}
      {isComplete && !validation.isValid && (
        <div className="rounded-lg border-2 border-destructive/50 bg-destructive/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-destructive mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-semibold text-destructive">Diploma Requirements Not Met</h3>
              <p className="text-sm text-muted-foreground">
                Based on your current scores, the IB Diploma would not be awarded. Please review and
                adjust your grades:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-destructive/90">
                {validation.failingReasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-2 italic">
                You can still save your profile once the grades meet diploma requirements.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Total Points Display */}
      <div
        className={cn(
          'rounded-lg p-6',
          isComplete && !validation.isValid ? 'bg-destructive/10' : 'bg-primary/10'
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">Total Points</p>
            <p className="text-sm text-muted-foreground">Based on subjects & bonus points</p>
          </div>
          <p
            className={cn(
              'text-5xl font-bold',
              isComplete && !validation.isValid ? 'text-destructive' : 'text-primary'
            )}
          >
            {total}
          </p>
        </div>
      </div>

      {/* Selected Subjects */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Your Selected Subjects</Label>
          <span className="text-sm font-medium text-primary">
            {selections.length} subject{selections.length !== 1 ? 's' : ''} selected
          </span>
        </div>

        {selections.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {selections.map((selection) => {
              const isFailingGrade = selection.grade === 1
              return (
                <div
                  key={selection.courseId}
                  className={cn(
                    'relative rounded-lg border-2 bg-card p-4',
                    isFailingGrade ? 'border-destructive/50' : 'border-muted'
                  )}
                >
                  <button
                    onClick={() => handleRemoveSubject(selection.courseId)}
                    className="absolute right-2 top-2 rounded-full p-1 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <h3 className="pr-8 font-medium">{selection.courseName}</h3>
                  <div className="mt-2 flex gap-2">
                    <Badge variant={selection.level === 'HL' ? 'default' : 'secondary'}>
                      {selection.level}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn(
                        isFailingGrade
                          ? 'bg-destructive/10 text-destructive border-destructive/50'
                          : 'bg-primary/10'
                      )}
                    >
                      Grade: {selection.grade}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <SubjectSelectorDialog
          courses={courses}
          existingSelections={selections}
          onAddSubject={handleAddSubject}
        />
      </div>

      {/* Core Components Section */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Core Components</Label>

        {/* Grid layout: stacked on mobile, side-by-side on desktop */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Extended Essay */}
          <div
            className={cn(
              'rounded-lg border-2 p-4',
              eeGrade === 'E' ? 'border-destructive/50' : 'border-muted'
            )}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              <div>
                <h3 className="font-semibold">Extended Essay</h3>
                <p className="text-xs text-muted-foreground">
                  Select your predicted Extended Essay grade
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {GRADE_OPTIONS.map((grade) => (
                <button
                  key={grade}
                  onClick={() => handleEeChange(grade)}
                  className={cn(
                    'flex h-12 w-full items-center justify-center rounded-lg border-2 font-semibold transition-all',
                    eeGrade === grade
                      ? grade === 'E'
                        ? 'border-destructive bg-destructive text-destructive-foreground'
                        : 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-muted'
                  )}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Theory of Knowledge */}
          <div
            className={cn(
              'rounded-lg border-2 p-4',
              tokGrade === 'E' ? 'border-destructive/50' : 'border-muted'
            )}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="font-semibold">Theory of Knowledge</h3>
                <p className="text-xs text-muted-foreground">Select your predicted TOK grade</p>
              </div>
            </div>
            <div className="flex gap-2">
              {GRADE_OPTIONS.map((grade) => (
                <button
                  key={grade}
                  onClick={() => handleTokChange(grade)}
                  className={cn(
                    'flex h-12 w-full items-center justify-center rounded-lg border-2 font-semibold transition-all',
                    tokGrade === grade
                      ? grade === 'E'
                        ? 'border-destructive bg-destructive text-destructive-foreground'
                        : 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-muted'
                  )}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* IB Diploma Score Summary */}
      {isComplete && (
        <div
          className={cn('rounded-lg p-6', !validation.isValid ? 'bg-destructive/5' : 'bg-muted')}
        >
          <h3 className="mb-4 font-semibold">IB Diploma Score Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Subject Points:</p>
              <p
                className={cn(
                  'text-3xl font-bold',
                  !validation.isValid ? 'text-destructive' : 'text-primary'
                )}
              >
                {subjectPoints}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">TOK/EE Bonus:</p>
              <p
                className={cn(
                  'text-3xl font-bold',
                  !validation.isValid ? 'text-destructive' : 'text-primary'
                )}
              >
                +{bonusPoints}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total IB Score:</p>
              <p
                className={cn(
                  'text-3xl font-bold',
                  !validation.isValid ? 'text-destructive' : 'text-primary'
                )}
              >
                {total}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
