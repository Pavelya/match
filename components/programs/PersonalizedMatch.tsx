/**
 * PersonalizedMatch Component
 *
 * Displays personalized match score for logged-in students.
 * Fetches student profile and calculates match against the current program.
 * Uses the same visual patterns as ProgramCard match section.
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, Check, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MatchResult } from '@/lib/matching/types'
import { FieldIcon } from '@/lib/icons'

interface PersonalizedMatchProps {
  programId: string
  userId: string
}

interface MatchResponse {
  match: MatchResult
  program: {
    fieldOfStudy: {
      name: string
    }
    country: {
      name: string
      flagEmoji: string
    }
    minIBPoints: number | null
  }
}

function getMatchRating(score: number): string {
  if (score >= 0.9) return 'Excellent Match'
  if (score >= 0.75) return 'Strong Match'
  if (score >= 0.6) return 'Good Match'
  return 'Potential Match'
}

export function PersonalizedMatch({ programId, userId }: PersonalizedMatchProps) {
  const [matchData, setMatchData] = useState<MatchResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMatch() {
      try {
        setLoading(true)
        const response = await fetch(`/api/programs/${programId}/match`)

        if (!response.ok) {
          if (response.status === 404) {
            // Student profile not found - they need to complete onboarding
            setError('Complete onboarding to see your match score')
          } else {
            setError('Unable to calculate match')
          }
          return
        }

        const data = await response.json()
        setMatchData(data)
      } catch {
        setError('Unable to calculate match')
      } finally {
        setLoading(false)
      }
    }

    fetchMatch()
  }, [programId, userId])

  // Don't render if there's an error (user hasn't completed onboarding)
  if (error) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-5 sm:p-6 text-center text-muted-foreground">
          <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>{error}</p>
        </CardContent>
      </Card>
    )
  }

  // Loading state
  if (loading) {
    return (
      <Card>
        <CardContent className="p-5 sm:p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/3" />
            <div className="h-3 bg-muted rounded" />
            <div className="h-20 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!matchData) return null

  const { match, program } = matchData
  const matchPercentage = Math.round(match.overallScore * 100)

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardContent className="p-5 sm:p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Your Personal Match</h2>
        </div>

        {/* Score Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{getMatchRating(match.overallScore)}</span>
            <span className="text-2xl font-bold">{matchPercentage}%</span>
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${matchPercentage}%` }}
            />
          </div>
        </div>

        {/* Match Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Academic Match */}
          <div
            className={cn(
              'rounded-xl border-2 p-4',
              match.academicMatch.meetsPointsRequirement
                ? 'border-primary/20 bg-primary/5'
                : 'border-destructive/30 bg-transparent'
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-sm">Academic</span>
            </div>
            <div className="flex items-center gap-1.5">
              {match.academicMatch.meetsPointsRequirement ? (
                <>
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm text-primary">Meets requirements</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4 text-destructive" />
                  <span className="text-sm text-destructive">
                    {match.academicMatch.pointsShortfall > 0
                      ? `Need ${match.academicMatch.pointsShortfall} more points`
                      : 'Does not meet'}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Field Match */}
          <div
            className={cn(
              'rounded-xl border-2 p-4',
              match.fieldMatch.isMatch
                ? 'border-primary/20 bg-primary/5'
                : 'border-destructive/30 bg-transparent'
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <FieldIcon
                fieldName={program.fieldOfStudy.name}
                className="h-5 w-5 text-muted-foreground"
              />
              <span className="font-medium text-sm">Field</span>
            </div>
            <div className="flex items-center gap-1.5">
              {match.fieldMatch.isMatch ? (
                <>
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm text-primary">Matches interests</span>
                </>
              ) : match.fieldMatch.noPreferences ? (
                <span className="text-sm text-muted-foreground">No preferences set</span>
              ) : (
                <>
                  <X className="h-4 w-4 text-destructive" />
                  <span className="text-sm text-destructive">Outside interests</span>
                </>
              )}
            </div>
          </div>

          {/* Location Match */}
          <div
            className={cn(
              'rounded-xl border-2 p-4',
              match.locationMatch.isMatch
                ? 'border-primary/20 bg-primary/5'
                : 'border-destructive/30 bg-transparent'
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{program.country.flagEmoji || '🌍'}</span>
              <span className="font-medium text-sm">Location</span>
            </div>
            <div className="flex items-center gap-1.5">
              {match.locationMatch.isMatch ? (
                <>
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm text-primary">Preferred location</span>
                </>
              ) : match.locationMatch.noPreferences ? (
                <span className="text-sm text-muted-foreground">No preferences set</span>
              ) : (
                <>
                  <X className="h-4 w-4 text-destructive" />
                  <span className="text-sm text-destructive">Not preferred</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
