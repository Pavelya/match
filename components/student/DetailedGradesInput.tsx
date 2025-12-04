'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const GRADE_OPTIONS = ['A', 'B', 'C', 'D', 'E'] as const
const LEVEL_OPTIONS = ['HL', 'SL'] as const
const SUBJECT_GRADES = [7, 6, 5, 4, 3, 2, 1] as const

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
  const updateSelection = (index: number, updates: Partial<CourseSelection>) => {
    const newSelections = [...selections]
    newSelections[index] = { ...newSelections[index], ...updates }
    onSelectionsChange(newSelections, tokGrade, eeGrade)
  }

  const handleTokChange = (grade: string) => {
    onSelectionsChange(selections, grade === tokGrade ? null : grade, eeGrade)
  }

  const handleEeChange = (grade: string) => {
    onSelectionsChange(selections, tokGrade, grade === eeGrade ? null : grade)
  }

  // Calculate total points
  const calculateTotal = () => {
    const subjectPoints = selections.reduce((sum, sel) => {
      return sum + (sel.grade || 0)
    }, 0)

    // TOK/EE bonus points (simplified - in reality it's a matrix)
    let bonusPoints = 0
    if (tokGrade && eeGrade) {
      const tokValue = 5 - ['A', 'B', 'C', 'D', 'E'].indexOf(tokGrade)
      const eeValue = 5 - ['A', 'B', 'C', 'D', 'E'].indexOf(eeGrade)
      bonusPoints = Math.min(3, Math.max(0, tokValue + eeValue - 6))
    }

    return subjectPoints + bonusPoints
  }

  const totalPoints = calculateTotal()
  const isComplete =
    selections.every((sel) => sel.courseId && sel.level && sel.grade !== null) &&
    tokGrade &&
    eeGrade

  // Get selected course IDs to avoid duplicates
  const selectedCourseIds = selections.map((s) => s.courseId).filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Subject Selections */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-base font-semibold">IB Subjects</Label>
          <p className="text-sm text-muted-foreground">
            Select 6 subjects with their levels (HL/SL) and predicted grades
          </p>
        </div>

        {selections.map((selection, index) => (
          <div key={index} className="grid gap-3 sm:grid-cols-3">
            {/* Course Selector */}
            <Select
              value={selection.courseId || ''}
              onValueChange={(value) => updateSelection(index, { courseId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Subject ${index + 1}`} />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem
                    key={course.id}
                    value={course.id}
                    disabled={
                      selectedCourseIds.includes(course.id) && selection.courseId !== course.id
                    }
                  >
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Level Selector */}
            <Select
              value={selection.level || ''}
              onValueChange={(value) => updateSelection(index, { level: value as 'HL' | 'SL' })}
              disabled={!selection.courseId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {LEVEL_OPTIONS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Grade Selector */}
            <Select
              value={selection.grade?.toString() || ''}
              onValueChange={(value) => updateSelection(index, { grade: parseInt(value, 10) })}
              disabled={!selection.courseId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                {SUBJECT_GRADES.map((grade) => (
                  <SelectItem key={grade} value={grade.toString()}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      {/* TOK Grade */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Theory of Knowledge (TOK) Grade</Label>
        <div className="flex gap-2">
          {GRADE_OPTIONS.map((grade) => (
            <button
              key={grade}
              onClick={() => handleTokChange(grade)}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-lg border-2 font-semibold transition-all',
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

      {/* EE Grade */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Extended Essay (EE) Grade</Label>
        <div className="flex gap-2">
          {GRADE_OPTIONS.map((grade) => (
            <button
              key={grade}
              onClick={() => handleEeChange(grade)}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-lg border-2 font-semibold transition-all',
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

      {/* Total Score Display */}
      {isComplete && (
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm font-medium">
            Total Predicted Score:{' '}
            <span className="text-2xl font-bold text-primary">{totalPoints}/45</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Subject points:{' '}
            {totalPoints -
              (tokGrade && eeGrade
                ? Math.min(
                    3,
                    Math.max(
                      0,
                      5 -
                        ['A', 'B', 'C', 'D', 'E'].indexOf(tokGrade) +
                        (5 - ['A', 'B', 'C', 'D', 'E'].indexOf(eeGrade)) -
                        6
                    )
                  )
                : 0)}{' '}
            + TOK/EE bonus:{' '}
            {tokGrade && eeGrade
              ? Math.min(
                  3,
                  Math.max(
                    0,
                    5 -
                      ['A', 'B', 'C', 'D', 'E'].indexOf(tokGrade) +
                      (5 - ['A', 'B', 'C', 'D', 'E'].indexOf(eeGrade)) -
                      6
                  )
                )
              : 0}
          </p>
        </div>
      )}
    </div>
  )
}
