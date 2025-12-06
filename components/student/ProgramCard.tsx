/**
 * ProgramCard Component
 *
 * Displays a university program with complete match information.
 * All details visible at once - no click to expand.
 *
 * Features:
 * - University image placeholder
 * - Program details header
 * - Match score with progress bar
 * - Academic requirements
 * - Preference matching indicators
 * - Single CTA: "View Program Details"
 */

'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ArrowRight, Bookmark, GraduationCap, Clock, Globe, Check } from 'lucide-react'
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

/**
 * Get progress bar color based on score
 */
function getProgressColor(score: number): string {
  if (score >= 0.9) return 'bg-green-500'
  if (score >= 0.75) return 'bg-blue-500'
  if (score >= 0.6) return 'bg-yellow-500'
  return 'bg-orange-500'
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
        {/* Header Section */}
        <div className="flex gap-6 p-6 pb-4">
          {/* University Image */}
          <div className="shrink-0">
            <div className="relative h-32 w-48 overflow-hidden rounded-lg bg-muted">
              {program.university.image ? (
                <Image
                  src={program.university.image}
                  alt={program.university.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
                  <GraduationCap className="h-12 w-12 text-blue-300" />
                </div>
              )}
            </div>
          </div>

          {/* Program Info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">{program.name}</h3>
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
                className="shrink-0"
                aria-label={saved ? 'Unsave program' : 'Save program'}
              >
                <Bookmark className={cn('h-5 w-5', saved && 'fill-primary text-primary')} />
              </Button>
            </div>

            {/* Quick Info Pills */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1.5 font-normal">
                {program.fieldOfStudy.iconName && <span>{program.fieldOfStudy.iconName}</span>}
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

        {/* Divider */}
        <div className="border-t" />

        {/* Match Score Section */}
        {matchResult && (
          <div className="p-6 pt-4 space-y-4">
            {/* Score Header */}
            <div className="flex items-center justify-between">
              <span className="font-semibold">{getMatchRating(matchScore)}</span>
              <span className="text-lg font-bold">{matchPercentage}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn('h-full transition-all duration-500', getProgressColor(matchScore))}
                style={{ width: `${matchPercentage}%` }}
              />
            </div>

            {/* Match Description */}
            <p className="text-sm text-muted-foreground">{getMatchDescription()}</p>

            {/* Academic Requirements */}
            {program.minIBPoints && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Academic Requirements</h4>
                <div className="rounded-xl border bg-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-blue-600">Total IB points</p>
                      <p className="text-sm text-muted-foreground">
                        Required: {program.minIBPoints} points
                      </p>
                      {matchResult.academicMatch.meetsPointsRequirement ? (
                        <p className="mt-1 flex items-center gap-1 text-sm text-green-600">
                          <Check className="h-4 w-4" />
                          Requirement met
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-orange-600">
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
              <div className="grid grid-cols-2 gap-3">
                {/* Field Preference */}
                <div className="rounded-xl border bg-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      {program.fieldOfStudy.iconName ? (
                        <span className="text-xl">{program.fieldOfStudy.iconName}</span>
                      ) : (
                        <Globe className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-blue-600 truncate">
                        {program.fieldOfStudy.name}
                      </p>
                      {matchResult.fieldMatch.isMatch ? (
                        <p className="mt-1 flex items-center gap-1 text-sm text-green-600">
                          <Check className="h-4 w-4" />
                          Matches your field preferences
                        </p>
                      ) : matchResult.fieldMatch.noPreferences ? (
                        <p className="mt-1 text-sm text-muted-foreground">
                          No field preferences set
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-muted-foreground">
                          Different from your preferences
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Preference */}
                <div className="rounded-xl border bg-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      <span className="text-xl">{program.country.flagEmoji || '🌍'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-blue-600">{program.country.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {program.city || program.university.name}
                      </p>
                      {matchResult.locationMatch.isMatch ? (
                        <p className="mt-1 flex items-center gap-1 text-sm text-green-600">
                          <Check className="h-4 w-4" />
                          Matches your location preferences
                        </p>
                      ) : matchResult.locationMatch.noPreferences ? (
                        <p className="mt-1 text-sm text-muted-foreground">
                          No location preferences set
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-muted-foreground">
                          Different from your preferences
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
