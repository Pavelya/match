/**
 * ProgramCard Component
 *
 * Displays a university program with complete match information.
 * Clean, consistent design aligned with platform UI.
 */

'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ArrowRight, Bookmark, GraduationCap, Clock, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MatchResult } from '@/lib/matching/types'

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
          {/* University Image - Larger */}
          <div className="shrink-0">
            <div className="relative h-28 w-full sm:h-36 sm:w-52 overflow-hidden rounded-xl bg-muted">
              {program.university.image ? (
                <Image
                  src={program.university.image}
                  alt={program.university.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <GraduationCap className="h-14 w-14 text-primary/30" />
                </div>
              )}
            </div>
          </div>

          {/* Program Info */}
          <div className="flex-1 space-y-4">
            {/* Title Row with Save */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground leading-tight">{program.name}</h3>
                <p className="text-sm text-foreground">
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

            {/* Quick Info Pills */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1.5 font-normal">
                {program.fieldOfStudy.iconName && (
                  <span className="text-sm">{program.fieldOfStudy.iconName}</span>
                )}
                {program.fieldOfStudy.name}
              </Badge>
              <Badge variant="secondary" className="gap-1.5 font-normal">
                <Clock className="h-3.5 w-3.5" />
                {program.duration}
              </Badge>
              <Badge variant="secondary" className="gap-1.5 font-normal">
                <GraduationCap className="h-3.5 w-3.5" />
                {program.degreeType}
              </Badge>
            </div>

            {/* View Details CTA */}
            <Button className="gap-2">
              View Program Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Match Score Section - No Divider */}
        {matchResult && (
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-5">
            {/* Score Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{getMatchRating(matchScore)}</span>
                <span className="text-lg font-bold">{matchPercentage}%</span>
              </div>

              {/* Progress Bar - Primary Color Only */}
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
                <div className="rounded-xl border p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Total IB points</p>
                      <p className="text-sm text-muted-foreground">
                        Required: {program.minIBPoints} points
                      </p>
                      {matchResult.academicMatch.meetsPointsRequirement ? (
                        <p className="mt-1 flex items-center gap-1 text-sm text-green-600">
                          <Check className="h-4 w-4" />
                          Requirement met
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {matchResult.academicMatch.pointsShortfall} points short
                        </p>
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
                <div className="rounded-xl border p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      {program.fieldOfStudy.iconName ? (
                        <span className="text-lg">{program.fieldOfStudy.iconName}</span>
                      ) : (
                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{program.fieldOfStudy.name}</p>
                      {matchResult.fieldMatch.isMatch ? (
                        <p className="mt-0.5 flex items-center gap-1 text-sm text-green-600">
                          <Check className="h-4 w-4" />
                          Matches your field preferences
                        </p>
                      ) : (
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {matchResult.fieldMatch.noPreferences
                            ? 'No field preferences set'
                            : 'Different from your preferences'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Preference */}
                <div className="rounded-xl border p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <span className="text-lg">{program.country.flagEmoji || '🌍'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{program.country.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {program.city || program.university.name}
                      </p>
                      {matchResult.locationMatch.isMatch ? (
                        <p className="mt-0.5 flex items-center gap-1 text-sm text-green-600">
                          <Check className="h-4 w-4" />
                          Matches your location preferences
                        </p>
                      ) : (
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {matchResult.locationMatch.noPreferences
                            ? 'No location preferences set'
                            : 'Different from your preferences'}
                        </p>
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
