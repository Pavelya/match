/**
 * ProgramCard Component
 *
 * Displays a university program with match score and details.
 * Reusable across: recommendations, search, saved programs, admin pages.
 *
 * Features:
 * - Match score visualization with color-coded badge
 * - University and location information
 * - Field of study with icon
 * - Academic requirements display
 * - Save/unsave functionality
 * - Expandable match breakdown
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bookmark, MapPin, Globe, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MatchResult } from '@/lib/matching/types'

interface ProgramCardProps {
  program: {
    id: string
    name: string
    university: {
      name: string
      abbreviation?: string | null
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
  }
  matchResult?: MatchResult
  isSaved?: boolean
  onSave?: (programId: string) => void
  onUnsave?: (programId: string) => void
  showMatchDetails?: boolean
  className?: string
}

/**
 * Get match score color based on percentage
 */
function getMatchScoreColor(score: number): string {
  if (score >= 0.9) return 'bg-green-100 text-green-800 border-green-200'
  if (score >= 0.75) return 'bg-blue-100 text-blue-800 border-blue-200'
  if (score >= 0.6) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  return 'bg-orange-100 text-orange-800 border-orange-200'
}

export function ProgramCard({
  program,
  matchResult,
  isSaved = false,
  onSave,
  onUnsave,
  showMatchDetails = false,
  className
}: ProgramCardProps) {
  const [saved, setSaved] = useState(isSaved)
  const [showBreakdown, setShowBreakdown] = useState(false)

  const handleSaveToggle = () => {
    if (saved) {
      onUnsave?.(program.id)
      setSaved(false)
    } else {
      onSave?.(program.id)
      setSaved(true)
    }
  }

  const matchScore = matchResult?.overallScore
  const matchPercentage = matchScore ? Math.round(matchScore * 100) : null

  return (
    <Card
      className={cn(
        'transition-all hover:shadow-md hover:border-primary/50',
        showMatchDetails && 'cursor-pointer',
        className
      )}
      onClick={showMatchDetails ? () => setShowBreakdown(!showBreakdown) : undefined}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <CardTitle className="text-xl font-bold">{program.name}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">
                {program.university.abbreviation || program.university.name}
              </span>
              {matchPercentage !== null && (
                <Badge className={cn('font-semibold border', getMatchScoreColor(matchScore!))}>
                  {matchPercentage}% Match
                </Badge>
              )}
            </div>
          </div>

          {/* Save button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              handleSaveToggle()
            }}
            className="shrink-0"
            aria-label={saved ? 'Unsave program' : 'Save program'}
          >
            <Bookmark className={cn('h-5 w-5', saved && 'fill-current text-primary')} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="flex items-center gap-1.5">
            {program.country.flagEmoji && (
              <span className="text-base">{program.country.flagEmoji}</span>
            )}
            {program.country.name}
          </span>
        </div>

        {/* Field of Study */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="h-4 w-4 shrink-0" />
          <span className="flex items-center gap-1.5">
            {program.fieldOfStudy.iconName && (
              <span className="text-base">{program.fieldOfStudy.iconName}</span>
            )}
            {program.fieldOfStudy.name}
          </span>
        </div>

        {/* Program Details */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4 shrink-0" />
          <span>
            {program.degreeType} • {program.duration}
            {program.minIBPoints && ` • ${program.minIBPoints}+ IB Points`}
          </span>
        </div>

        {/* Match Breakdown (expandable) */}
        {showMatchDetails && matchResult && showBreakdown && (
          <div className="mt-4 space-y-3 rounded-lg border bg-muted/50 p-4">
            <div className="font-semibold text-sm">Match Breakdown</div>

            <div className="space-y-2">
              {/* Academic Match */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Academic:</span>
                <span className="font-medium">
                  {Math.round(matchResult.academicMatch.score * 100)}%
                </span>
              </div>

              {/* Field Match */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Field:</span>
                <span className="font-medium">
                  {Math.round(matchResult.fieldMatch.score * 100)}%
                </span>
              </div>

              {/* Location Match */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">
                  {Math.round(matchResult.locationMatch.score * 100)}%
                </span>
              </div>

              {/* Adjustments if any */}
              {matchResult.adjustments.caps &&
                Object.keys(matchResult.adjustments.caps).length > 0 && (
                  <div className="pt-2 mt-2 border-t">
                    <div className="text-xs text-muted-foreground">
                      Note: Score adjusted for requirements
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
