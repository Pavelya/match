/**
 * ProgramCard Component
 *
 * Displays a university program with optional match information.
 * Reusable across matches page, search results, and anywhere programs are listed.
 *
 * Props:
 * - showMatchDetails: Set to false to hide match-specific sections (score, requirements, preferences)
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ArrowRight, Bookmark, GraduationCap, Clock, Check, X, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MatchResult } from '@/lib/matching/types'
import { FieldIcon } from '@/lib/icons'

interface ProgramCardProps {
  program: {
    id: string
    name: string
    university: {
      name: string
      abbreviation?: string | null
      image?: string | null
    }
    country: {
      name: string
      code: string
      flagEmoji?: string | null
    }
    fieldOfStudy: {
      name: string
      iconName?: string | null
    }
    degreeType: string
    duration: string
    minIBPoints?: number | null
    city?: string | null
  }
  matchResult?: MatchResult
  /** Set to false to hide match-specific sections (score bar, requirements, preferences) */
  showMatchDetails?: boolean
  isSaved?: boolean
  onSave?: (programId: string) => void
  onUnsave?: (programId: string) => void
  className?: string
}

/**
 * Get match rating text based on score
 */
function getMatchRating(score: number): string {
  if (score >= 0.9) return 'Excellent Match'
  if (score >= 0.75) return 'Strong Match'
  if (score >= 0.6) return 'Good Match'
  return 'Potential Match'
}

export function ProgramCard({
  program,
  matchResult,
  showMatchDetails = true,
  isSaved = false,
  onSave,
  onUnsave,
  className
}: ProgramCardProps) {
  const [saved, setSaved] = useState(isSaved)

  const handleSaveToggle = () => {
    if (saved) {
      onUnsave?.(program.id)
      setSaved(false)
    } else {
      onSave?.(program.id)
      setSaved(true)
    }
  }

  const matchScore = matchResult?.overallScore ?? 0
  const matchPercentage = Math.round(matchScore * 100)

  // Determine match description
  const getMatchDescription = () => {
    const parts = []
    if (matchResult?.fieldMatch.isMatch) parts.push('field')
    if (matchResult?.locationMatch.isMatch) parts.push('location')

    if (parts.length === 2) return 'Aligned with your field and location preferences'
    if (parts.length === 1) return `Aligned with your ${parts[0]} preferences`
    return 'Based on your academic profile'
  }

  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-lg', className)}>
      <CardContent className="p-0">
        {/* Header Section - Responsive */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6">
          {/* University Image - Larger for alignment with button */}
          <div className="shrink-0 w-full sm:w-auto">
            <div className="relative aspect-[16/9] sm:aspect-square w-full sm:h-44 sm:w-44 overflow-hidden rounded-xl bg-muted">
              {program.university.image ? (
                <Image
                  src={program.university.image}
                  alt={program.university.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <GraduationCap className="h-12 w-12 text-primary/30" />
                </div>
              )}
            </div>
          </div>

          {/* Program Info */}
          <div className="flex-1 flex flex-col justify-between min-h-[176px] sm:min-h-0">
            <div className="space-y-3">
              {/* Title Row with Save */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                    {program.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {program.university.name}
                    {program.city && `, ${program.city}`}
                    {`, ${program.country.name}`}
                  </p>
                </div>

                {/* Save Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSaveToggle}
                  className="shrink-0 -mt-1"
                  aria-label={saved ? 'Unsave program' : 'Save program'}
                >
                  <Bookmark className={cn('h-5 w-5', saved && 'fill-primary text-primary')} />
                </Button>
              </div>

              {/* Quick Info - Gray background, no border */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl bg-muted/50 px-4 py-3 text-sm">
                <span className="flex items-center gap-1.5 text-foreground">
                  <FieldIcon
                    fieldName={program.fieldOfStudy.name}
                    className="h-4 w-4 text-muted-foreground"
                  />
                  {program.fieldOfStudy.name}
                </span>
                <span className="flex items-center gap-1.5 text-foreground">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {program.duration}
                </span>
                <span className="flex items-center gap-1.5 text-foreground">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  {program.degreeType}
                </span>
                {/* Show IB points in search mode (when match details are hidden) */}
                {!showMatchDetails && program.minIBPoints && (
                  <span className="flex items-center gap-1.5 text-green-600 font-medium">
                    <Circle className="h-4 w-4 fill-current" />
                    {program.minIBPoints} IB Points
                  </span>
                )}
              </div>
            </div>

            {/* View Details CTA - Aligned with bottom of image */}
            <div className="mt-3 sm:mt-0">
              <Button asChild className="gap-2">
                <Link href={`/programs/${program.id}`}>
                  View Program Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Match Score Section - Only shown when matchResult exists AND showMatchDetails is true */}
        {matchResult && showMatchDetails && (
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-5">
            {/* Score Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{getMatchRating(matchScore)}</span>
                <span className="text-lg font-bold">{matchPercentage}%</span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${matchPercentage}%` }}
                />
              </div>

              {/* Match Description */}
              <p className="text-sm text-muted-foreground">{getMatchDescription()}</p>
            </div>

            {/* Academic Requirements */}
            {program.minIBPoints && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Academic Requirements</h4>
                <div
                  className={cn(
                    'rounded-xl border-2 p-4',
                    matchResult.academicMatch.meetsPointsRequirement
                      ? 'border-primary/20 bg-primary/5'
                      : 'border-destructive/30 bg-transparent'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                        matchResult.academicMatch.meetsPointsRequirement
                          ? 'bg-primary/10'
                          : 'bg-muted'
                      )}
                    >
                      <GraduationCap className="h-6 w-6 text-current opacity-70" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Total IB points</p>
                      <p className="text-sm text-muted-foreground">
                        Required: {program.minIBPoints} points
                      </p>
                    </div>
                    <div className="shrink-0">
                      {matchResult.academicMatch.meetsPointsRequirement ? (
                        <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-primary">Met</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 rounded-full border border-destructive/30 px-3 py-1.5">
                          <X className="h-4 w-4 text-destructive" />
                          <span className="text-sm font-medium text-destructive">
                            Need {matchResult.academicMatch.pointsShortfall} more
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Your Preferences */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Your Preferences</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Field Preference */}
                <div
                  className={cn(
                    'rounded-xl border-2 p-4',
                    matchResult.fieldMatch.isMatch
                      ? 'border-primary/20 bg-primary/5'
                      : 'border-destructive/30 bg-transparent'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                        matchResult.fieldMatch.isMatch ? 'bg-primary/10' : 'bg-muted'
                      )}
                    >
                      <FieldIcon
                        fieldName={program.fieldOfStudy.name}
                        className={cn(
                          'h-6 w-6',
                          matchResult.fieldMatch.isMatch ? 'text-primary' : 'text-destructive'
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{program.fieldOfStudy.name}</p>
                      {matchResult.fieldMatch.isMatch ? (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm text-primary">Matches your interests</span>
                        </div>
                      ) : matchResult.fieldMatch.noPreferences ? (
                        <span className="text-sm text-muted-foreground">No preferences set</span>
                      ) : (
                        <div className="flex items-center gap-1 mt-0.5">
                          <X className="h-4 w-4 text-destructive" />
                          <span className="text-sm text-destructive">Outside your interests</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Preference */}
                <div
                  className={cn(
                    'rounded-xl border-2 p-4',
                    matchResult.locationMatch.isMatch
                      ? 'border-primary/20 bg-primary/5'
                      : 'border-destructive/30 bg-transparent'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                        matchResult.locationMatch.isMatch ? 'bg-primary/10' : 'bg-muted'
                      )}
                    >
                      <span className="text-2xl">{program.country.flagEmoji || '🌍'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{program.country.name}</p>
                      {matchResult.locationMatch.isMatch ? (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm text-primary">Preferred location</span>
                        </div>
                      ) : matchResult.locationMatch.noPreferences ? (
                        <span className="text-sm text-muted-foreground">No preferences set</span>
                      ) : (
                        <div className="flex items-center gap-1 mt-0.5">
                          <X className="h-4 w-4 text-destructive" />
                          <span className="text-sm text-destructive">
                            Not in your preferred locations
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
