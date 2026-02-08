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

import { useState, useEffect } from 'react'
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
  ExternalLink,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MatchResult, SubjectMatchDetail } from '@/lib/matching/types'
import { FieldIcon, SubjectGroupIcon } from '@/lib/icons'
import { SignUpCTA } from '@/components/student/SignUpCTA'

// Course requirement for detail view
interface CourseRequirement {
  id: string
  ibCourse: {
    id: string
    name: string
    code: string
    group: number
  }
  requiredLevel: string
  minGrade: number
  isCritical: boolean
  orGroupId?: string | null
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
    universityId?: string
    university: {
      id?: string
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
  /** Coordinator view: pass student profile ID to link to program with student context */
  coordinatorStudentId?: string
  /** Set to true when coordinator is viewing a student's program match (disables save, changes labels) */
  isCoordinatorView?: boolean
  /** Whether the user is logged in (enables sign-up CTA for logged-out users in detail view) */
  isLoggedIn?: boolean
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

  // HL satisfies SL requirement
  const levelMet =
    requirement.requiredLevel === 'SL' || studentCourse.level === requirement.requiredLevel
  const gradeMet = studentCourse.grade >= requirement.minGrade

  if (levelMet && gradeMet) {
    return { met: true, status: 'Requirement met', color: 'text-primary' }
  }

  if (!levelMet) {
    // Student has SL but HL required
    return {
      met: false,
      status: `You have SL${studentCourse.grade}, needs HL${requirement.minGrade}`,
      color: 'text-red-500'
    }
  }

  // Level met but grade below - show what they have vs what's needed
  const gradeGap = requirement.minGrade - studentCourse.grade
  const isHLForSL = studentCourse.level === 'HL' && requirement.requiredLevel === 'SL'

  if (gradeGap === 1) {
    return {
      met: false,
      status: isHLForSL
        ? `HL${studentCourse.grade} counts for SL - just 1 grade below (partial credit)`
        : `You have ${studentCourse.level}${studentCourse.grade}, need ${requirement.minGrade}+ (close!)`,
      color: 'text-orange-600'
    }
  }

  // Larger grade gap
  return {
    met: false,
    status: isHLForSL
      ? `HL${studentCourse.grade} counts for SL - need grade ${requirement.minGrade}+ (partial credit)`
      : `You have ${studentCourse.level}${studentCourse.grade}, need grade ${requirement.minGrade}+`,
    color: isHLForSL ? 'text-orange-600' : 'text-destructive'
  }
}

/**
 * Process requirements: for OR groups, select the best matching option
 * Returns a flat list of requirements with the best OR match selected
 */
function processRequirementsForDisplay(
  requirements: CourseRequirement[],
  studentCourses: StudentCourse[]
): { requirement: CourseRequirement; isFromOrGroup: boolean; orGroupSize: number }[] {
  const result: { requirement: CourseRequirement; isFromOrGroup: boolean; orGroupSize: number }[] =
    []
  const processedGroups = new Set<string>()

  for (const req of requirements) {
    if (req.orGroupId) {
      if (!processedGroups.has(req.orGroupId)) {
        processedGroups.add(req.orGroupId)
        const groupItems = requirements.filter((r) => r.orGroupId === req.orGroupId)

        // Find which option the student actually took
        let bestReq = groupItems[0]
        let bestScore = -1

        for (const option of groupItems) {
          // Check if student took this specific course
          const studentHasCourse = studentCourses.some(
            (sc) => sc.ibCourse.id === option.ibCourse.id
          )

          if (studentHasCourse) {
            const status = getRequirementStatus(option, studentCourses)
            // Prioritize: met > partial > not taken
            const score = status.met ? 2 : 1
            if (score > bestScore) {
              bestScore = score
              bestReq = option
            }
            // If we found a met requirement, stop searching
            if (status.met) break
          }
        }

        // If no student course matched, fall back to original logic
        if (bestScore === -1) {
          for (const option of groupItems) {
            const status = getRequirementStatus(option, studentCourses)
            const score = status.met ? 2 : status.status === 'Not taken in your diploma' ? 0 : 1
            if (score > bestScore) {
              bestScore = score
              bestReq = option
            }
          }
        }

        result.push({ requirement: bestReq, isFromOrGroup: true, orGroupSize: groupItems.length })
      }
    } else {
      result.push({ requirement: req, isFromOrGroup: false, orGroupSize: 1 })
    }
  }

  return result
}

/**
 * Process requirements for card display: for OR groups, select the best matching option
 * Uses match result data instead of student courses (for card variant without full student profile)
 */
function processRequirementsForCardDisplay(
  requirements: CourseRequirement[],
  subjectMatches: SubjectMatchDetail[] | undefined
): { requirement: CourseRequirement; status: string; reason?: string }[] {
  const result: { requirement: CourseRequirement; status: string; reason?: string }[] = []
  const processedGroups = new Set<string>()

  // Helper to find match for a specific courseId
  const findMatchForCourse = (courseId: string): SubjectMatchDetail | undefined => {
    return subjectMatches?.find((sm) => {
      // Check if it's a regular SubjectRequirement with matching courseId
      if ('courseId' in sm.requirement && sm.requirement.courseId === courseId) {
        return true
      }
      // Check if it's an ORGroupRequirement that contains this courseId in options
      if ('options' in sm.requirement) {
        return sm.requirement.options.some((opt) => opt.courseId === courseId)
      }
      return false
    })
  }

  for (const req of requirements) {
    if (req.orGroupId) {
      if (!processedGroups.has(req.orGroupId)) {
        processedGroups.add(req.orGroupId)
        const groupItems = requirements.filter((r) => r.orGroupId === req.orGroupId)

        // For OR groups, find the match entry (it's the same for all options in the group)
        const orGroupMatch = findMatchForCourse(groupItems[0].ibCourse.id)

        // Use matchedCourseId to find the correct option to display
        let displayReq = groupItems[0] // Fallback to first

        if (orGroupMatch?.matchedCourseId) {
          // Find the requirement that matches the courseId from the match result
          const matchedReq = groupItems.find(
            (item) => item.ibCourse.id === orGroupMatch.matchedCourseId
          )
          if (matchedReq) {
            displayReq = matchedReq
          }
        } else {
          // FALLBACK: No matched course ID, try to find best based on status
          // (This handles backward compatibility or edge cases)
          for (const option of groupItems) {
            const optionMatch = findMatchForCourse(option.ibCourse.id)
            if (optionMatch?.status === 'FULL_MATCH') {
              displayReq = option
              break
            }
          }
        }

        // Use the status from the OR group match
        result.push({
          requirement: displayReq,
          status: orGroupMatch?.status || 'NO_MATCH',
          reason: orGroupMatch?.reason
        })
      }
    } else {
      // Regular requirement (not OR group)
      const matchInfo = findMatchForCourse(req.ibCourse.id)
      result.push({
        requirement: req,
        status: matchInfo?.status || 'NO_MATCH',
        reason: matchInfo?.reason
      })
    }
  }

  return result
}

/**
 * Group requirements for public display (logged-out users)
 * Returns grouped requirements: standalone requirements and OR-groups
 */
type GroupedRequirement =
  | { type: 'single'; requirement: CourseRequirement }
  | { type: 'or-group'; requirements: CourseRequirement[] }

function groupRequirementsForPublicDisplay(
  requirements: CourseRequirement[]
): GroupedRequirement[] {
  const result: GroupedRequirement[] = []
  const processedGroups = new Set<string>()

  for (const req of requirements) {
    if (req.orGroupId) {
      if (!processedGroups.has(req.orGroupId)) {
        processedGroups.add(req.orGroupId)
        const groupItems = requirements.filter((r) => r.orGroupId === req.orGroupId)
        result.push({ type: 'or-group', requirements: groupItems })
      }
    } else {
      result.push({ type: 'single', requirement: req })
    }
  }

  return result
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
  className,
  coordinatorStudentId,
  isCoordinatorView = false,
  isLoggedIn = true
}: ProgramCardProps) {
  const [saved, setSaved] = useState(isSaved)
  // State for animated progress bar - start at 0, animate to actual value
  const [showProgress, setShowProgress] = useState(false)

  // Sync internal state with isSaved prop when it changes
  useEffect(() => {
    setSaved(isSaved)
  }, [isSaved])

  // Trigger progress bar animation after component mounts
  useEffect(() => {
    // Small delay to ensure the element is rendered before animation starts
    const timer = setTimeout(() => {
      setShowProgress(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

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
  // Animated percentage: 0 initially, then actual value after mount
  const animatedPercentage = showProgress ? matchPercentage : 0
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

  const isDetailView = variant === 'detail'

  // Build program detail URL - use coordinator route for coordinator view
  const programDetailUrl = coordinatorStudentId
    ? `/coordinator/students/${coordinatorStudentId}/matches/${program.id}`
    : `/programs/${program.id}`

  // Wrapper component - Card for card variant, div for detail
  const Wrapper = isDetailView ? 'div' : Card
  const wrapperProps = isDetailView
    ? { className: cn('space-y-8', className) }
    : {
        className: cn(
          'overflow-hidden',
          'transition-all duration-200 ease-out',
          // Mobile-friendly: lifts on desktop hover, scales on mobile tap
          'hover-lift',
          'active:scale-[0.995]',
          className
        )
      }

  return (
    <Wrapper {...wrapperProps}>
      {isDetailView ? (
        // Detail View Layout
        <>
          {/* Back to results - only show for student view, coordinator page has its own back link */}
          {!isCoordinatorView && (
            <Link
              href="/programs/search"
              className="text-primary hover:underline text-sm inline-flex items-center gap-1"
            >
              ← Back to results
            </Link>
          )}

          {/* Hero Section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* University Image - Same size as card variant */}
            <div className="shrink-0 w-full sm:w-auto">
              <div className="relative aspect-[16/9] sm:aspect-square w-full sm:h-44 sm:w-44 overflow-hidden rounded-xl bg-muted">
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
                    <GraduationCap className="h-12 w-12 text-primary/30" />
                  </div>
                )}
              </div>
            </div>

            {/* Program Info */}
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl font-bold">{program.name}</h1>
                {program.universityId || program.university.id ? (
                  <Link
                    href={`/universities/${program.universityId || program.university.id}`}
                    className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                  >
                    {program.university.name}
                  </Link>
                ) : (
                  <p className="text-muted-foreground">{program.university.name}</p>
                )}
                <p className="text-muted-foreground text-sm">
                  {program.city}, {program.country.name}
                </p>
              </div>

              {/* Quick Info Bar - Same styling as card variant */}
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
                {program.minIBPoints && (
                  <span className="flex items-center gap-1.5 text-primary font-medium">
                    <GraduationCap className="h-4 w-4" />
                    {program.minIBPoints} IB Points
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {/* Save button - only for student view */}
                {!isCoordinatorView && (
                  <Button variant="outline" size="sm" onClick={handleSaveToggle} className="gap-2">
                    <Bookmark className={cn('h-4 w-4', saved && 'fill-current')} />
                    {saved ? 'Saved' : 'Save Program'}
                  </Button>
                )}
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

          {/* Match Score Section - Only shown for logged-in users with matchResult */}
          {matchResult && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{matchRating?.label}</span>
                <span className="text-lg font-bold">{matchPercentage}%</span>
              </div>

              {/* Progress Bar - Same color as card variant */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-700 ease-out"
                  style={{ width: `${animatedPercentage}%` }}
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

          {/* Sign-Up CTA for Logged-Out Users */}
          {!isLoggedIn && !isCoordinatorView && (
            <SignUpCTA
              programId={program.id}
              programName={program.name}
              universityName={program.university.name}
            />
          )}

          {/* Academic Requirements - Unified Grid Layout */}
          {(program.minIBPoints || (program.courseRequirements?.length ?? 0) > 0) && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Academic Requirements</h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* IB Points Tile */}
                {program.minIBPoints && matchResult && (
                  <div
                    className={cn(
                      'rounded-xl border-2 p-3',
                      matchResult.academicMatch.meetsPointsRequirement
                        ? 'border-primary/20 bg-primary/5'
                        : 'border-destructive/20 bg-transparent'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                          matchResult.academicMatch.meetsPointsRequirement
                            ? 'bg-primary/10'
                            : 'bg-muted'
                        )}
                      >
                        <GraduationCap className="h-4 w-4 text-current opacity-70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-tight">Total IB Points</p>
                        <p className="text-xs text-muted-foreground">
                          Required: {program.minIBPoints} points
                        </p>
                        {matchResult.academicMatch.meetsPointsRequirement ? (
                          <p className="text-xs mt-0.5 flex items-center gap-1 text-primary">
                            <Check className="h-2.5 w-2.5" />
                            Requirement met
                          </p>
                        ) : (
                          <p className="text-xs mt-0.5 flex items-center gap-1 text-destructive">
                            <AlertCircle className="h-2.5 w-2.5" />
                            Need {matchResult.academicMatch.pointsShortfall} more points
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Course Requirement Tiles - With Student Profile */}
                {program.courseRequirements &&
                  program.courseRequirements.length > 0 &&
                  studentProfile &&
                  processRequirementsForDisplay(
                    program.courseRequirements,
                    studentProfile.courses
                  ).map(
                    ({
                      requirement: req,
                      isFromOrGroup: _isFromOrGroup,
                      orGroupSize: _orGroupSize
                    }) => {
                      const status = getRequirementStatus(req, studentProfile.courses)
                      const isPartialCredit = !status.met && status.color === 'text-orange-600'
                      const borderStyle = status.met
                        ? 'border-primary/20 bg-primary/5'
                        : isPartialCredit
                          ? 'border-orange-200 bg-transparent'
                          : 'border-destructive/20 bg-transparent'

                      return (
                        <div key={req.id} className={cn('rounded-xl border-2 p-3', borderStyle)}>
                          <div className="flex items-start gap-2">
                            <div
                              className={cn(
                                'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                                status.met ? 'bg-primary/10' : 'bg-muted'
                              )}
                            >
                              <SubjectGroupIcon
                                groupId={req.ibCourse.group}
                                className={cn(
                                  'h-4 w-4',
                                  status.met ? 'text-primary' : 'text-muted-foreground'
                                )}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm leading-tight">
                                {req.ibCourse.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {req.requiredLevel} • Required: {req.minGrade}
                              </p>
                              <p
                                className={cn(
                                  'text-xs mt-0.5 flex items-center gap-1',
                                  status.color
                                )}
                              >
                                {status.met ? (
                                  <Check className="h-2.5 w-2.5" />
                                ) : (
                                  <AlertCircle className="h-2.5 w-2.5" />
                                )}
                                {status.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  )}

                {/* Course Requirement Tiles - Without Student Profile (Public View) */}
                {program.courseRequirements &&
                  program.courseRequirements.length > 0 &&
                  !studentProfile &&
                  groupRequirementsForPublicDisplay(program.courseRequirements).map(
                    (group, index) => {
                      if (group.type === 'single') {
                        const req = group.requirement
                        return (
                          <div key={req.id} className="rounded-xl border-2 border-muted p-3">
                            <div className="flex items-start gap-2">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                                <SubjectGroupIcon
                                  groupId={req.ibCourse.group}
                                  className="h-4 w-4 text-muted-foreground"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm leading-tight">
                                  {req.ibCourse.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {req.requiredLevel} • Required: {req.minGrade}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      } else {
                        // OR-group: display as a single card with all options listed
                        const reqs = group.requirements
                        const firstReq = reqs[0]
                        return (
                          <div
                            key={`or-group-${index}`}
                            className="rounded-xl border-2 border-muted p-3 relative"
                          >
                            {/* OR Badge */}
                            <div className="absolute -top-2 right-3 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-semibold uppercase tracking-wide rounded-full">
                              One of
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                                <SubjectGroupIcon
                                  groupId={firstReq.ibCourse.group}
                                  className="h-4 w-4 text-muted-foreground"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm leading-tight">
                                  {reqs.map((r) => r.ibCourse.name).join(' or ')}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {firstReq.requiredLevel} • Required: {firstReq.minGrade}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    }
                  )}
              </div>
            </div>
          )}

          {/* Preferences - Smaller cards matching Academic Requirements */}
          {matchResult && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">
                {isCoordinatorView ? "Student's Preferences" : 'Your Preferences'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Field Preference */}
                <div
                  className={cn(
                    'rounded-xl border-2 p-3',
                    matchResult.fieldMatch.isMatch
                      ? 'border-primary/20 bg-primary/5'
                      : 'border-destructive/20 bg-transparent'
                  )}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                        matchResult.fieldMatch.isMatch ? 'bg-primary/10' : 'bg-muted'
                      )}
                    >
                      <FieldIcon
                        fieldName={program.fieldOfStudy.name}
                        className={cn(
                          'h-4 w-4',
                          matchResult.fieldMatch.isMatch ? 'text-primary' : 'text-destructive'
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm leading-tight truncate">
                        {program.fieldOfStudy.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {program.fieldOfStudy.description || 'Field of Study'}
                      </p>
                      {matchResult.fieldMatch.isMatch ? (
                        <p className="text-xs mt-0.5 flex items-center gap-1 text-primary">
                          <Check className="h-2.5 w-2.5" />
                          Matches your interests
                        </p>
                      ) : matchResult.fieldMatch.noPreferences ? (
                        <p className="text-xs mt-0.5 text-muted-foreground">No preferences set</p>
                      ) : (
                        <p className="text-xs mt-0.5 flex items-center gap-1 text-destructive">
                          <AlertCircle className="h-2.5 w-2.5" />
                          Outside your field preferences
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Preference */}
                <div
                  className={cn(
                    'rounded-xl border-2 p-3',
                    matchResult.locationMatch.isMatch
                      ? 'border-primary/20 bg-primary/5'
                      : 'border-destructive/20 bg-transparent'
                  )}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                        matchResult.locationMatch.isMatch ? 'bg-primary/10' : 'bg-muted'
                      )}
                    >
                      <span className="text-base">{program.country.flagEmoji || '🌍'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm leading-tight">{program.country.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {program.city || 'Location'}
                      </p>
                      {matchResult.locationMatch.isMatch ? (
                        <p className="text-xs mt-0.5 flex items-center gap-1 text-primary">
                          <Check className="h-2.5 w-2.5" />
                          Preferred location
                        </p>
                      ) : matchResult.locationMatch.noPreferences ? (
                        <p className="text-xs mt-0.5 text-muted-foreground">No preferences set</p>
                      ) : (
                        <p className="text-xs mt-0.5 flex items-center gap-1 text-destructive">
                          <AlertCircle className="h-2.5 w-2.5" />
                          Outside your location preferences
                        </p>
                      )}
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
                    <Link href={programDetailUrl} className="hover:underline">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                        {program.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {program.universityId || program.university.id ? (
                        <Link
                          href={`/universities/${program.universityId || program.university.id}`}
                          className="hover:text-primary hover:underline transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {program.university.name}
                        </Link>
                      ) : (
                        <span>{program.university.name}</span>
                      )}
                      {program.city && `, ${program.city}`}
                      {`, ${program.country.name}`}
                    </p>
                  </div>

                  {/* Save Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSaveToggle}
                    className="shrink-0 -mt-1 hover:scale-110 transition-transform duration-150"
                    aria-label={saved ? 'Unsave program' : 'Save program'}
                  >
                    <Bookmark
                      className={cn(
                        'h-5 w-5 transition-all duration-200',
                        saved && 'fill-primary text-primary scale-110'
                      )}
                    />
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
                  {program.minIBPoints && (
                    <span className="flex items-center gap-1.5 text-primary font-medium">
                      <GraduationCap className="h-4 w-4" />
                      {program.minIBPoints} IB Points
                    </span>
                  )}
                </div>
              </div>

              {/* View Details CTA */}
              <div className="mt-3 sm:mt-0">
                <Button asChild className="gap-2">
                  <Link href={programDetailUrl}>
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
                    className="h-full bg-primary transition-all duration-700 ease-out"
                    style={{ width: `${animatedPercentage}%` }}
                  />
                </div>

                <p className="text-sm text-muted-foreground">{getMatchDescription()}</p>
              </div>

              {/* Academic Requirements */}
              {(program.minIBPoints || (program.courseRequirements?.length ?? 0) > 0) && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Academic Requirements</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* IB Points Tile */}
                    {program.minIBPoints && (
                      <div
                        className={cn(
                          'rounded-xl border-2 p-3',
                          matchResult.academicMatch.meetsPointsRequirement
                            ? 'border-primary/20 bg-primary/5'
                            : 'border-destructive/20 bg-transparent'
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <div
                            className={cn(
                              'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                              matchResult.academicMatch.meetsPointsRequirement
                                ? 'bg-primary/10'
                                : 'bg-muted'
                            )}
                          >
                            <GraduationCap className="h-4 w-4 text-current opacity-70" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm leading-tight">Total IB Points</p>
                            <p className="text-xs text-muted-foreground">
                              Required: {program.minIBPoints} points
                            </p>
                            {matchResult.academicMatch.meetsPointsRequirement ? (
                              <p className="text-xs mt-0.5 flex items-center gap-1 text-primary">
                                <Check className="h-2.5 w-2.5" />
                                Requirement met
                              </p>
                            ) : (
                              <p className="text-xs mt-0.5 flex items-center gap-1 text-destructive">
                                <AlertCircle className="h-2.5 w-2.5" />
                                Need {matchResult.academicMatch.pointsShortfall} more points
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Course Requirement Tiles - Card Variant */}
                    {program.courseRequirements &&
                      program.courseRequirements.length > 0 &&
                      processRequirementsForCardDisplay(
                        program.courseRequirements,
                        matchResult.academicMatch.subjectMatches
                      ).map(({ requirement: req, status, reason }) => {
                        const isMet = status === 'FULL_MATCH'
                        const isPartial = status === 'PARTIAL_MATCH'
                        const borderStyle = isMet
                          ? 'border-primary/20 bg-primary/5'
                          : isPartial
                            ? 'border-orange-200 bg-transparent'
                            : 'border-destructive/20 bg-transparent'

                        return (
                          <div key={req.id} className={cn('rounded-xl border-2 p-3', borderStyle)}>
                            <div className="flex items-start gap-2">
                              <div
                                className={cn(
                                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                                  isMet ? 'bg-primary/10' : 'bg-muted'
                                )}
                              >
                                <SubjectGroupIcon
                                  groupId={req.ibCourse.group}
                                  className={cn(
                                    'h-4 w-4',
                                    isMet ? 'text-primary' : 'text-muted-foreground'
                                  )}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm leading-tight">
                                  {req.ibCourse.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {req.requiredLevel} • Required: {req.minGrade}
                                </p>
                                {isMet ? (
                                  <p className="text-xs mt-0.5 flex items-center gap-1 text-primary">
                                    <Check className="h-2.5 w-2.5" />
                                    Requirement met
                                  </p>
                                ) : isPartial ? (
                                  <p className="text-xs mt-0.5 flex items-center gap-1 text-orange-600">
                                    <AlertCircle className="h-2.5 w-2.5" />
                                    {reason || 'Partially met'}
                                  </p>
                                ) : (
                                  <p className="text-xs mt-0.5 flex items-center gap-1 text-destructive">
                                    <AlertCircle className="h-2.5 w-2.5" />
                                    {reason || 'Not taken in your diploma'}
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

              {/* Preferences */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  {isCoordinatorView ? "Student's Preferences" : 'Your Preferences'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Field Preference */}
                  <div
                    className={cn(
                      'rounded-xl border-2 p-3',
                      matchResult.fieldMatch.isMatch
                        ? 'border-primary/20 bg-primary/5'
                        : 'border-destructive/20 bg-transparent'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                          matchResult.fieldMatch.isMatch ? 'bg-primary/10' : 'bg-muted'
                        )}
                      >
                        <FieldIcon
                          fieldName={program.fieldOfStudy.name}
                          className={cn(
                            'h-4 w-4',
                            matchResult.fieldMatch.isMatch ? 'text-primary' : 'text-destructive'
                          )}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-tight truncate">
                          {program.fieldOfStudy.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {program.fieldOfStudy.description || 'Field of Study'}
                        </p>
                        {matchResult.fieldMatch.isMatch ? (
                          <p className="text-xs mt-0.5 flex items-center gap-1 text-primary">
                            <Check className="h-2.5 w-2.5" />
                            Matches your interests
                          </p>
                        ) : matchResult.fieldMatch.noPreferences ? (
                          <p className="text-xs mt-0.5 text-muted-foreground">No preferences set</p>
                        ) : (
                          <p className="text-xs mt-0.5 flex items-center gap-1 text-destructive">
                            <AlertCircle className="h-2.5 w-2.5" />
                            Outside your field preferences
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Location Preference */}
                  <div
                    className={cn(
                      'rounded-xl border-2 p-3',
                      matchResult.locationMatch.isMatch
                        ? 'border-primary/20 bg-primary/5'
                        : 'border-destructive/20 bg-transparent'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                          matchResult.locationMatch.isMatch ? 'bg-primary/10' : 'bg-muted'
                        )}
                      >
                        <span className="text-base">{program.country.flagEmoji || '🌍'}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-tight">{program.country.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {program.city || 'Location'}
                        </p>
                        {matchResult.locationMatch.isMatch ? (
                          <p className="text-xs mt-0.5 flex items-center gap-1 text-primary">
                            <Check className="h-2.5 w-2.5" />
                            Preferred location
                          </p>
                        ) : matchResult.locationMatch.noPreferences ? (
                          <p className="text-xs mt-0.5 text-muted-foreground">No preferences set</p>
                        ) : (
                          <p className="text-xs mt-0.5 flex items-center gap-1 text-destructive">
                            <AlertCircle className="h-2.5 w-2.5" />
                            Outside your location preferences
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
      )}
    </Wrapper>
  )
}
