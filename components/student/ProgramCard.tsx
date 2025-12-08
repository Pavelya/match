/**
 * ProgramCard Component
 *
 * Unified component for displaying university programs.
 * Used across matches page, search results, and program detail page.
 *
 * Variants:
 * - 'card' (default): Compact card for lists with "View Program Details" button
 * - 'detail': Full detail view for program page with description, requirements grid
 *
 * Props:
 * - variant: Display mode ('card' | 'detail')
 * - showMatchDetails: Set to false to hide match-specific sections
 * - studentProfile: For detail variant - enables personalized requirement status
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Bookmark,
  GraduationCap,
  Clock,
  Check,
  X,
  Circle,
  ExternalLink,
  FileText,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MatchResult } from '@/lib/matching/types'
import { FieldIcon } from '@/lib/icons'

// Course requirement for detail view
interface CourseRequirement {
  id: string
  ibCourse: {
    id: string
    name: string
    code: string
  }
  requiredLevel: string
  minGrade: number
  isCritical: boolean
}

// Student course for matching requirements
interface StudentCourse {
  ibCourse: {
    id: string
    name: string
  }
  level: string
  grade: number
}

// Student profile for personalized status
interface StudentProfile {
  courses: StudentCourse[]
  preferredFields: { id: string; name: string }[]
  preferredCountries: { id: string; name: string }[]
  totalIBPoints: number | null
}

interface ProgramCardProps {
  program: {
    id: string
    name: string
    university: {
      name: string
      abbreviation?: string | null
      image?: string | null
      description?: string
      websiteUrl?: string
    }
    country: {
      id?: string
      name: string
      code: string
      flagEmoji?: string | null
    }
    fieldOfStudy: {
      id?: string
      name: string
      iconName?: string | null
      description?: string | null
    }
    degreeType: string
    duration: string
    minIBPoints?: number | null
    city?: string | null
    // Detail-only fields
    description?: string
    programUrl?: string | null
    courseRequirements?: CourseRequirement[]
  }
  matchResult?: MatchResult
  /** Display variant: 'card' for lists, 'detail' for full page */
  variant?: 'card' | 'detail'
  /** Set to false to hide match-specific sections (score bar, requirements, preferences) */
  showMatchDetails?: boolean
  /** Student profile for personalized requirement status (detail variant) */
  studentProfile?: StudentProfile | null
  isSaved?: boolean
  onSave?: (programId: string) => void
  onUnsave?: (programId: string) => void
  className?: string
}

/**
 * Get match rating text and color based on score
 */
function getMatchRating(score: number): { label: string; color: string } {
  if (score >= 0.9) return { label: 'Excellent Match', color: 'text-green-600' }
  if (score >= 0.75) return { label: 'Strong Match', color: 'text-green-600' }
  if (score >= 0.6) return { label: 'Good Match', color: 'text-blue-600' }
  if (score >= 0.4) return { label: 'Fair Match', color: 'text-amber-600' }
  return { label: 'Weak Match', color: 'text-red-600' }
}

/**
 * Check if student meets a course requirement
 */
function getRequirementStatus(
  requirement: CourseRequirement,
  studentCourses: StudentCourse[]
): { met: boolean; status: string; color: string } {
  const studentCourse = studentCourses.find((sc) => sc.ibCourse.id === requirement.ibCourse.id)

  if (!studentCourse) {
    return { met: false, status: 'Not taken in your diploma', color: 'text-red-500' }
  }

  const levelMet =
    requirement.requiredLevel === 'SL' || studentCourse.level === requirement.requiredLevel
  const gradeMet = studentCourse.grade >= requirement.minGrade

  if (levelMet && gradeMet) {
    return { met: true, status: 'Requirement met', color: 'text-green-600' }
  }

  if (!levelMet) {
    return { met: false, status: `Requires ${requirement.requiredLevel}`, color: 'text-red-500' }
  }

  return { met: false, status: `Need grade ${requirement.minGrade}+`, color: 'text-red-500' }
}

export function ProgramCard({
  program,
  matchResult,
  variant = 'card',
  showMatchDetails = true,
  studentProfile,
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
  const matchRating = matchResult ? getMatchRating(matchScore) : null

  // Determine match description
  const getMatchDescription = () => {
    if (!matchResult) return ''
    const parts = []
    if (!matchResult.fieldMatch.isMatch && !matchResult.fieldMatch.noPreferences)
      parts.push('field')
    if (!matchResult.locationMatch.isMatch && !matchResult.locationMatch.noPreferences)
      parts.push('location')

    if (parts.length === 2) return 'Outside your field and location preferences'
    if (parts.length === 1) return `Outside your ${parts[0]} preferences`
    if (matchResult.fieldMatch.isMatch && matchResult.locationMatch.isMatch)
      return 'Matches your field and location preferences'
    return 'Based on your academic profile'
  }

  // Check IB points status
  const getPointsStatus = () => {
    if (!studentProfile || !program.minIBPoints) return null
    const studentPoints = studentProfile.totalIBPoints || 0
    const met = studentPoints >= program.minIBPoints
    return {
      met,
      shortfall: met ? 0 : program.minIBPoints - studentPoints
    }
  }

  // Check field/location preferences
  const getFieldStatus = () => {
    if (!studentProfile || !program.fieldOfStudy.id) return null
    const isMatch = studentProfile.preferredFields.some((f) => f.id === program.fieldOfStudy.id)
    return {
      isMatch,
      text: isMatch ? 'Matches your field preferences' : 'Outside your field preferences'
    }
  }

  const getLocationStatus = () => {
    if (!studentProfile || !program.country.id) return null
    const isMatch = studentProfile.preferredCountries.some((c) => c.id === program.country.id)
    return {
      isMatch,
      text: isMatch ? 'Matches your location preferences' : 'Outside your location preferences'
    }
  }

  const pointsStatus = getPointsStatus()
  const fieldStatus = getFieldStatus()
  const locationStatus = getLocationStatus()

  const isDetailView = variant === 'detail'

  // Wrapper component - Card for card variant, div for detail
  const Wrapper = isDetailView ? 'div' : Card
  const wrapperProps = isDetailView
    ? { className: cn('space-y-8', className) }
    : { className: cn('overflow-hidden transition-all hover:shadow-lg', className) }

  return (
    <Wrapper {...wrapperProps}>
      {isDetailView ? (
        // Detail View Layout
        <>
          {/* Back to results */}
          <Link
            href="/programs/search"
            className="text-primary hover:underline text-sm inline-flex items-center gap-1"
          >
            ← Back to results
          </Link>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* University Image */}
            <div className="shrink-0">
              <div className="relative aspect-[4/3] w-full md:w-48 h-32 overflow-hidden rounded-lg bg-muted">
                {program.university.image ? (
                  <Image
                    src={program.university.image}
                    alt={program.university.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <GraduationCap className="h-10 w-10 text-primary/30" />
                  </div>
                )}
              </div>
            </div>

            {/* Program Info */}
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl font-bold">{program.name}</h1>
                <p className="text-muted-foreground">{program.university.name}</p>
                <p className="text-muted-foreground text-sm">
                  {program.city}, {program.country.name}
                </p>
              </div>

              {/* Quick Info Bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg bg-muted/50 px-4 py-2 text-sm">
                <span className="flex items-center gap-1.5">
                  <FieldIcon
                    fieldName={program.fieldOfStudy.name}
                    className="h-4 w-4 text-muted-foreground"
                  />
                  {program.fieldOfStudy.name}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {program.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  {program.degreeType}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" onClick={handleSaveToggle} className="gap-2">
                  <Bookmark className={cn('h-4 w-4', saved && 'fill-current')} />
                  {saved ? 'Saved' : 'Save Program'}
                </Button>
                {program.programUrl && (
                  <Button size="sm" asChild className="gap-2">
                    <a href={program.programUrl} target="_blank" rel="noopener noreferrer">
                      Visit Program Website
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Match Score Section */}
          {matchResult && (
            <div className="border-t pt-6 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">Match Score</h2>
                  <p className={cn('font-semibold', matchRating?.color)}>{matchRating?.label}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{matchPercentage}%</p>
                  <p className="text-xs text-muted-foreground">Balanced mode</p>
                </div>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    matchPercentage >= 75
                      ? 'bg-green-500'
                      : matchPercentage >= 50
                        ? 'bg-blue-500'
                        : matchPercentage >= 25
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                  )}
                  style={{ width: `${matchPercentage}%` }}
                />
              </div>

              <p className="text-sm text-muted-foreground">{getMatchDescription()}</p>
            </div>
          )}

          {/* Program Overview */}
          {program.description && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Program Overview</h2>
              <p className="text-muted-foreground whitespace-pre-line">{program.description}</p>
            </div>
          )}

          {/* Academic Requirements */}
          {(program.minIBPoints || (program.courseRequirements?.length ?? 0) > 0) && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Academic Requirements</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* IB Points */}
                {program.minIBPoints && (
                  <div
                    className={cn(
                      'rounded-lg border p-4',
                      pointsStatus?.met ? 'border-green-200 bg-green-50' : 'border-muted'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Total IB points</p>
                        <p className="text-sm text-muted-foreground">
                          Required: {program.minIBPoints} points
                        </p>
                        {pointsStatus && (
                          <p
                            className={cn(
                              'text-sm mt-1 flex items-center gap-1',
                              pointsStatus.met ? 'text-green-600' : 'text-red-500'
                            )}
                          >
                            {pointsStatus.met ? (
                              <>
                                <Check className="h-3 w-3" /> Requirement met
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-3 w-3" /> Need {pointsStatus.shortfall}{' '}
                                more
                              </>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Course Requirements */}
                {program.courseRequirements?.map((req) => {
                  const status = studentProfile
                    ? getRequirementStatus(req, studentProfile.courses)
                    : null

                  return (
                    <div
                      key={req.id}
                      className={cn(
                        'rounded-lg border p-4',
                        status?.met ? 'border-green-200 bg-green-50' : 'border-muted'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                            status?.met ? 'bg-green-100' : 'bg-muted'
                          )}
                        >
                          <FileText
                            className={cn(
                              'h-5 w-5',
                              status?.met ? 'text-green-600' : 'text-muted-foreground'
                            )}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{req.ibCourse.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {req.requiredLevel} • Required: {req.minGrade}
                          </p>
                          {status && (
                            <p className={cn('text-sm mt-1 flex items-center gap-1', status.color)}>
                              {status.met ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <AlertCircle className="h-3 w-3" />
                              )}
                              {status.status}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Your Preferences */}
          {studentProfile && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Your Preferences</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field Preference */}
                <div
                  className={cn(
                    'rounded-lg border p-4',
                    fieldStatus?.isMatch ? 'border-green-200 bg-green-50' : 'border-muted'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                        fieldStatus?.isMatch ? 'bg-green-100' : 'bg-muted'
                      )}
                    >
                      <FieldIcon
                        fieldName={program.fieldOfStudy.name}
                        className={cn(
                          'h-5 w-5',
                          fieldStatus?.isMatch ? 'text-green-600' : 'text-muted-foreground'
                        )}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{program.fieldOfStudy.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {program.fieldOfStudy.description}
                      </p>
                      <p
                        className={cn(
                          'text-sm mt-1',
                          fieldStatus?.isMatch ? 'text-green-600' : 'text-red-500'
                        )}
                      >
                        {fieldStatus?.text}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location Preference */}
                <div
                  className={cn(
                    'rounded-lg border p-4',
                    locationStatus?.isMatch ? 'border-green-200 bg-green-50' : 'border-muted'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                        locationStatus?.isMatch ? 'bg-green-100' : 'bg-muted'
                      )}
                    >
                      <span className="text-lg">{program.country.flagEmoji || '🌍'}</span>
                    </div>
                    <div>
                      <p className="font-medium">{program.country.name}</p>
                      <p className="text-sm text-muted-foreground">{program.city}</p>
                      <p
                        className={cn(
                          'text-sm mt-1',
                          locationStatus?.isMatch ? 'text-green-600' : 'text-red-500'
                        )}
                      >
                        {locationStatus?.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        // Card View Layout (Original)
        <CardContent className="p-0">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6">
            {/* University Image */}
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

                {/* Quick Info */}
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
                  {!showMatchDetails && program.minIBPoints && (
                    <span className="flex items-center gap-1.5 text-green-600 font-medium">
                      <Circle className="h-4 w-4 fill-current" />
                      {program.minIBPoints} IB Points
                    </span>
                  )}
                </div>
              </div>

              {/* View Details CTA */}
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

          {/* Match Score Section - Card variant */}
          {matchResult && showMatchDetails && (
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-5">
              {/* Score Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{matchRating?.label}</span>
                  <span className="text-lg font-bold">{matchPercentage}%</span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${matchPercentage}%` }}
                  />
                </div>

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
      )}
    </Wrapper>
  )
}
