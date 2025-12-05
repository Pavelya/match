'use client'

import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { SubjectSelectorDialog } from './SubjectSelectorDialog'
import { X } from 'lucide-react'

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
}

export function DetailedGradesInput({
  courses,
  selections,
  tokGrade,
  eeGrade,
  onSelectionsChange
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

    // TOK/EE bonus points (simplified - actual IB matrix is more complex)
    let bonusPoints = 0
    if (tokGrade && eeGrade) {
      const tokValue = 5 - ['A', 'B', 'C', 'D', 'E'].indexOf(tokGrade)
      const eeValue = 5 - ['A', 'B', 'C', 'D', 'E'].indexOf(eeGrade)
      bonusPoints = Math.min(3, Math.max(0, tokValue + eeValue - 6))
    }

    return { subjectPoints, bonusPoints, total: subjectPoints + bonusPoints }
  }

  const { subjectPoints, bonusPoints, total } = calculateTotal()
  const isComplete = selections.length === 6 && tokGrade && eeGrade

  return (
    <div className="space-y-6">
      {/* Total Points Display */}
      <div className="rounded-lg bg-primary/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">Total Points</p>
            <p className="text-sm text-muted-foreground">Based on subjects & bonus points</p>
          </div>
          <p className="text-5xl font-bold text-primary">{total}</p>
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
            {selections.map((selection) => (
              <div
                key={selection.courseId}
                className="relative rounded-lg border-2 border-muted bg-card p-4"
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
                  <Badge variant="outline" className="bg-primary/10">
                    Grade: {selection.grade}
                  </Badge>
                </div>
              </div>
            ))}
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
          <div className="rounded-lg border-2 border-muted p-4">
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
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-muted'
                  )}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Theory of Knowledge */}
          <div className="rounded-lg border-2 border-muted p-4">
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
                      ? 'border-primary bg-primary text-primary-foreground'
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
        <div className="rounded-lg bg-muted p-6">
          <h3 className="mb-4 font-semibold">IB Diploma Score Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Subject Points:</p>
              <p className="text-3xl font-bold text-primary">{subjectPoints}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">TOK/EE Bonus:</p>
              <p className="text-3xl font-bold text-primary">+{bonusPoints}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total IB Score:</p>
              <p className="text-3xl font-bold text-primary">{total}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
