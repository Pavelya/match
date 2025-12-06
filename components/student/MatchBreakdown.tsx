/**
 * Match Breakdown Dialog Component
 *
 * Displays detailed breakdown of match scores with visual progress bars.
 * Shows academic, field, and location match details.
 */

'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import type { MatchResult } from '@/lib/matching/types'
import { CheckCircle2, AlertCircle, XCircle, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MatchBreakdownProps {
  programName: string
  universityName: string
  matchResult: MatchResult
  isOpen: boolean
  onClose: () => void
}

/**
 * Get color classes for score percentage
 */
function getScoreColor(score: number): string {
  if (score >= 0.9) return 'bg-green-500'
  if (score >= 0.75) return 'bg-blue-500'
  if (score >= 0.6) return 'bg-yellow-500'
  return 'bg-orange-500'
}

/**
 * Get text color for score percentage
 */
function getScoreTextColor(score: number): string {
  if (score >= 0.9) return 'text-green-700'
  if (score >= 0.75) return 'text-blue-700'
  if (score >= 0.6) return 'text-yellow-700'
  return 'text-orange-700'
}

/**
 * Progress bar for visual score representation
 */
function ScoreBar({ score, label }: { score: number; label: string }) {
  const percentage = Math.round(score * 100)
  const colorClass = getScoreColor(score)
  const textColorClass = getScoreTextColor(score)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className={cn('text-sm font-bold', textColorClass)}>{percentage}%</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full transition-all duration-500', colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export function MatchBreakdown({
  programName,
  universityName,
  matchResult,
  isOpen,
  onClose
}: MatchBreakdownProps) {
  const overallPercentage = Math.round(matchResult.overallScore * 100)
  const { academicMatch, fieldMatch, locationMatch, weightsUsed, adjustments } = matchResult

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Match Breakdown: {programName}</DialogTitle>
          <p className="text-sm text-muted-foreground">{universityName}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Score */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Match Score</p>
                <p
                  className={cn('text-3xl font-bold', getScoreTextColor(matchResult.overallScore))}
                >
                  {overallPercentage}%
                </p>
              </div>
              <Badge className={cn('text-lg px-4 py-2', getScoreColor(matchResult.overallScore))}>
                {overallPercentage >= 90 && 'Excellent'}
                {overallPercentage >= 75 && overallPercentage < 90 && 'Strong'}
                {overallPercentage >= 60 && overallPercentage < 75 && 'Good'}
                {overallPercentage < 60 && 'Moderate'}
              </Badge>
            </div>
          </div>

          {/* Component Scores */}
          <div className="space-y-4">
            <h3 className="font-semibold">Score Components</h3>

            {/* Academic Match */}
            <div className="space-y-3">
              <ScoreBar score={academicMatch.score} label="Academic Match" />
              <div className="rounded-lg border p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IB Points Requirement:</span>
                  <span className="font-medium">
                    {academicMatch.meetsPointsRequirement ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> Met
                      </span>
                    ) : (
                      <span className="text-orange-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {academicMatch.pointsShortfall > 0 &&
                          `${academicMatch.pointsShortfall} points short`}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subject Requirements:</span>
                  <span className="font-medium">
                    {Math.round(academicMatch.subjectsMatchScore * 100)}%
                  </span>
                </div>
                {academicMatch.missingCriticalCount > 0 && (
                  <div className="flex items-center gap-2 text-orange-600">
                    <XCircle className="h-4 w-4" />
                    <span>Missing {academicMatch.missingCriticalCount} critical subject(s)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Field Match */}
            <div className="space-y-3">
              <ScoreBar score={fieldMatch.score} label="Field of Study Match" />
              <div className="rounded-lg border p-3 text-sm">
                <div className="flex items-center gap-2">
                  {fieldMatch.isMatch ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Matches your field preferences</span>
                    </>
                  ) : fieldMatch.noPreferences ? (
                    <>
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span>No field preferences set</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-orange-600" />
                      <span>Different from your preferences</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Location Match */}
            <div className="space-y-3">
              <ScoreBar score={locationMatch.score} label="Location Match" />
              <div className="rounded-lg border p-3 text-sm">
                <div className="flex items-center gap-2">
                  {locationMatch.isMatch ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Matches your location preferences</span>
                    </>
                  ) : locationMatch.noPreferences ? (
                    <>
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span>No location preferences set</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-orange-600" />
                      <span>Different from your preferences</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Weights Used */}
          <div className="space-y-3">
            <h3 className="font-semibold">Weighting Applied</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-3 text-center">
                <p className="text-xs text-muted-foreground">Academic</p>
                <p className="text-lg font-bold">{Math.round(weightsUsed.academic * 100)}%</p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-lg font-bold">{Math.round(weightsUsed.location * 100)}%</p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <p className="text-xs text-muted-foreground">Field</p>
                <p className="text-lg font-bold">{Math.round(weightsUsed.field * 100)}%</p>
              </div>
            </div>
          </div>

          {/* Adjustments */}
          {Object.keys(adjustments.caps).length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                Score Adjustments
              </h3>
              <div className="rounded-lg border bg-orange-50 dark:bg-orange-950/20 p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Raw Score:</span>
                  <span className="font-medium">{Math.round(adjustments.rawScore * 100)}%</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Final Score (after caps):</span>
                  <span>{Math.round(adjustments.finalScore * 100)}%</span>
                </div>
                {adjustments.caps.missingCriticalSubject && (
                  <p className="text-xs text-orange-700 dark:text-orange-400">
                    • Capped due to missing critical subject
                  </p>
                )}
                {adjustments.caps.criticalNearMiss && (
                  <p className="text-xs text-orange-700 dark:text-orange-400">
                    • Capped due to critical subject near-miss
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
