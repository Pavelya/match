'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const GRADE_OPTIONS = ['A', 'B', 'C', 'D', 'E'] as const

interface QuickScoreInputProps {
  totalPoints: number | null
  tokGrade: string | null
  eeGrade: string | null
  onScoreChange: (
    totalPoints: number | null,
    tokGrade: string | null,
    eeGrade: string | null
  ) => void
}

export function QuickScoreInput({
  totalPoints,
  tokGrade,
  eeGrade,
  onScoreChange
}: QuickScoreInputProps) {
  const handlePointsChange = (value: string) => {
    if (value === '') {
      onScoreChange(null, tokGrade, eeGrade)
      return
    }

    const points = parseInt(value, 10)
    if (!isNaN(points) && points >= 1 && points <= 45) {
      onScoreChange(points, tokGrade, eeGrade)
    }
  }

  const handleTokChange = (grade: string) => {
    onScoreChange(totalPoints, grade === tokGrade ? null : grade, eeGrade)
  }

  const handleEeChange = (grade: string) => {
    onScoreChange(totalPoints, tokGrade, grade === eeGrade ? null : grade)
  }

  const pointsError = totalPoints !== null && (totalPoints < 1 || totalPoints > 45)

  return (
    <div className="space-y-6">
      {/* Total IB Points */}
      <div className="space-y-3">
        <Label htmlFor="total-points" className="text-base font-semibold">
          Predicted IB Total Points
        </Label>
        <p className="text-sm text-muted-foreground">Enter your predicted total points (1-45)</p>
        <Input
          id="total-points"
          type="number"
          min="1"
          max="45"
          placeholder="e.g., 40"
          value={totalPoints ?? ''}
          onChange={(e) => handlePointsChange(e.target.value)}
          className={cn(
            'text-lg font-medium',
            pointsError && 'border-destructive focus-visible:ring-destructive'
          )}
        />
        {pointsError && (
          <p className="text-sm text-destructive">Please enter a value between 1 and 45</p>
        )}
      </div>

      {/* TOK Grade */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Theory of Knowledge (TOK) Grade</Label>
        <p className="text-sm text-muted-foreground">Select your predicted TOK grade</p>
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
        <p className="text-sm text-muted-foreground">Select your predicted EE grade</p>
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

      {totalPoints !== null && tokGrade && eeGrade && (
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm font-medium">
            Predicted Score:{' '}
            <span className="text-lg font-bold text-primary">{totalPoints} points</span> (TOK:{' '}
            {tokGrade}, EE: {eeGrade})
          </p>
        </div>
      )}
    </div>
  )
}
