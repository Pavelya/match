/**
 * ProgramDetailsView Component
 *
 * Unified view for program details matching the design reference:
 * - Back to results link
 * - Hero section with image, program name, quick info, buttons
 * - Match Score section with progress bar (logged-in only)
 * - Program Overview
 * - Academic Requirements as cards with student status
 * - Your Preferences section
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  GraduationCap,
  Clock,
  ExternalLink,
  Bookmark,
  FileText,
  Check,
  AlertCircle
} from 'lucide-react'
import { FieldIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { MatchResult } from '@/lib/matching/types'

interface CourseRequirement {
  id: string
  orGroupId: string | null
  ibCourse: {
    id: string
    name: string
    code: string
  }
  requiredLevel: string
  minGrade: number
  isCritical: boolean
}

interface StudentCourse {
  ibCourseId: string
  ibCourse: {
    id: string
    name: string
  }
  level: string
  grade: number
}

interface StudentProfile {
  courses: StudentCourse[]
  preferredFields: { id: string; name: string }[]
  preferredCountries: { id: string; name: string }[]
  totalIBPoints: number | null
}

interface ProgramDetailsViewProps {
  program: {
    id: string
    name: string
    description: string
    degreeType: string
    duration: string
    minIBPoints: number | null
    programUrl: string | null
    university: {
      id: string
      name: string
      abbreviatedName: string | null
      description: string
      city: string
      classification: string
      studentPopulation: number | null
      image: string | null
      websiteUrl: string
      country: {
        id: string
        name: string
        code: string
        flagEmoji: string
      }
    }
    fieldOfStudy: {
      id: string
      name: string
      iconName: string | null
      description: string | null
    }
    courseRequirements: CourseRequirement[]
  }
  matchResult: MatchResult | null
  studentProfile: StudentProfile | null
}

function getMatchRating(score: number): { label: string; color: string } {
  if (score >= 0.9) return { label: 'Excellent Match', color: 'text-green-600' }
  if (score >= 0.75) return { label: 'Strong Match', color: 'text-green-600' }
  if (score >= 0.6) return { label: 'Good Match', color: 'text-blue-600' }
  if (score >= 0.4) return { label: 'Fair Match', color: 'text-amber-600' }
  return { label: 'Weak Match', color: 'text-red-600' }
}

function getRequirementStatus(
  requirement: CourseRequirement,
  studentCourses: StudentCourse[]
): { met: boolean; status: string; color: string } {
  const studentCourse = studentCourses.find((sc) => sc.ibCourse.id === requirement.ibCourse.id)

  if (!studentCourse) {
    return {
      met: false,
      status: 'Not taken in your diploma',
      color: 'text-red-500'
    }
  }

  // Check level and grade
  const levelMet =
    requirement.requiredLevel === 'SL' || studentCourse.level === requirement.requiredLevel
  const gradeMet = studentCourse.grade >= requirement.minGrade

  if (levelMet && gradeMet) {
    return { met: true, status: 'Requirement met', color: 'text-green-600' }
  }

  if (!levelMet) {
    return {
      met: false,
      status: `Requires ${requirement.requiredLevel}`,
      color: 'text-red-500'
    }
  }

  return {
    met: false,
    status: `Need grade ${requirement.minGrade}+`,
    color: 'text-red-500'
  }
}

export function ProgramDetailsView({
  program,
  matchResult,
  studentProfile
}: ProgramDetailsViewProps) {
  const [saved, setSaved] = useState(false)
  const { university, fieldOfStudy, courseRequirements } = program

  const matchPercentage = matchResult ? Math.round(matchResult.overallScore * 100) : 0
  const matchRating = matchResult ? getMatchRating(matchResult.overallScore) : null

  // Generate match description
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

  // Check field preference
  const fieldPreferenceStatus = () => {
    if (!studentProfile) return null
    const isMatch = studentProfile.preferredFields.some((f) => f.id === fieldOfStudy.id)
    return {
      isMatch,
      text: isMatch ? 'Matches your field preferences' : 'Outside your field preferences'
    }
  }

  // Check location preference
  const locationPreferenceStatus = () => {
    if (!studentProfile) return null
    const isMatch = studentProfile.preferredCountries.some((c) => c.id === university.country.id)
    return {
      isMatch,
      text: isMatch ? 'Matches your location preferences' : 'Outside your location preferences'
    }
  }

  // Check IB points
  const pointsStatus = () => {
    if (!studentProfile || !program.minIBPoints) return null
    const studentPoints = studentProfile.totalIBPoints || 0
    const met = studentPoints >= program.minIBPoints
    const shortfall = program.minIBPoints - studentPoints
    return {
      met,
      studentPoints,
      required: program.minIBPoints,
      shortfall: met ? 0 : shortfall
    }
  }

  const fieldStatus = fieldPreferenceStatus()
  const locationStatus = locationPreferenceStatus()
  const ibPointsStatus = pointsStatus()

  return (
    <div className="space-y-8">
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
            {university.image ? (
              <Image
                src={university.image}
                alt={university.name}
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
            <p className="text-muted-foreground">{university.name}</p>
            <p className="text-muted-foreground text-sm">
              {university.city}, {university.country.name}
            </p>
          </div>

          {/* Quick Info Bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg bg-muted/50 px-4 py-2 text-sm">
            <span className="flex items-center gap-1.5">
              <FieldIcon fieldName={fieldOfStudy.name} className="h-4 w-4 text-muted-foreground" />
              {fieldOfStudy.name}
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
            <Button variant="outline" size="sm" onClick={() => setSaved(!saved)} className="gap-2">
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

      {/* Match Score Section - Only for logged-in students with profile */}
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
              <p className="text-xs text-muted-foreground">All factors are considered equally</p>
            </div>
          </div>

          {/* Progress Bar */}
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
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Program Overview</h2>
        <p className="text-muted-foreground whitespace-pre-line">{program.description}</p>
      </div>

      {/* Academic Requirements - Only show detailed view for logged-in students */}
      {(program.minIBPoints || courseRequirements.length > 0) && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Academic Requirements</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* IB Points Requirement */}
            {program.minIBPoints && (
              <div
                className={cn(
                  'rounded-lg border p-4',
                  studentProfile && ibPointsStatus
                    ? ibPointsStatus.met
                      ? 'border-green-200 bg-green-50'
                      : 'border-muted'
                    : 'border-muted'
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
                    {studentProfile && ibPointsStatus && (
                      <p
                        className={cn(
                          'text-sm mt-1',
                          ibPointsStatus.met ? 'text-green-600' : 'text-red-500'
                        )}
                      >
                        {ibPointsStatus.met ? (
                          <span className="flex items-center gap-1">
                            <Check className="h-3 w-3" /> Requirement met
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> You need {ibPointsStatus.shortfall}{' '}
                            more points to meet this requirement
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Course Requirements */}
            {courseRequirements.map((req) => {
              const status = studentProfile
                ? getRequirementStatus(req, studentProfile.courses)
                : null

              return (
                <div
                  key={req.id}
                  className={cn(
                    'rounded-lg border p-4',
                    status
                      ? status.met
                        ? 'border-green-200 bg-green-50'
                        : 'border-muted'
                      : 'border-muted'
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

      {/* Your Preferences - Only for logged-in students */}
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
                    fieldName={fieldOfStudy.name}
                    className={cn(
                      'h-5 w-5',
                      fieldStatus?.isMatch ? 'text-green-600' : 'text-muted-foreground'
                    )}
                  />
                </div>
                <div>
                  <p className="font-medium">{fieldOfStudy.name}</p>
                  <p className="text-sm text-muted-foreground">{fieldOfStudy.description}</p>
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
                  <span className="text-lg">{university.country.flagEmoji}</span>
                </div>
                <div>
                  <p className="font-medium">{university.country.name}</p>
                  <p className="text-sm text-muted-foreground">{university.city}</p>
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
    </div>
  )
}
