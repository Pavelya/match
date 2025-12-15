/**
 * Program Detail Client Wrapper
 *
 * Client component that handles save/unsave functionality
 * for the program detail page.
 */

'use client'

import { useEffect, useState } from 'react'
import { ProgramCard } from '@/components/student/ProgramCard'
import type { MatchResult } from '@/lib/matching/types'
import { logger } from '@/lib/logger'

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

interface ProgramData {
  id: string
  name: string
  description: string
  degreeType: string
  duration: string
  minIBPoints?: number | null
  programUrl?: string | null
  city?: string | null
  university: {
    name: string
    abbreviation?: string | null
    image?: string | null
    description?: string
    websiteUrl?: string
  }
  country: {
    id: string
    name: string
    code: string
    flagEmoji?: string | null
  }
  fieldOfStudy: {
    id: string
    name: string
    iconName?: string | null
    description?: string | null
  }
  courseRequirements?: CourseRequirement[]
}

interface StudentProfileData {
  courses: {
    ibCourse: { id: string; name: string }
    level: string
    grade: number
  }[]
  preferredFields: { id: string; name: string }[]
  preferredCountries: { id: string; name: string }[]
  totalIBPoints: number | null
}

interface ProgramDetailClientProps {
  program: ProgramData
  matchResult?: MatchResult
  studentProfile?: StudentProfileData | null
  isLoggedIn: boolean
  /** Set to true when coordinator is viewing a student's program match */
  isCoordinatorView?: boolean
}

export function ProgramDetailClient({
  program,
  matchResult,
  studentProfile,
  isLoggedIn,
  isCoordinatorView = false
}: ProgramDetailClientProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch saved state on mount
  useEffect(() => {
    if (!isLoggedIn) {
      setIsLoading(false)
      return
    }

    const checkSavedState = async () => {
      try {
        const response = await fetch('/api/students/saved-programs')
        if (response.ok) {
          const data = await response.json()
          const savedIds = new Set<string>(data.programs?.map((p: { id: string }) => p.id) || [])
          setIsSaved(savedIds.has(program.id))
        }
      } catch {
        // Ignore errors - user might not have a profile yet
      } finally {
        setIsLoading(false)
      }
    }

    checkSavedState()
  }, [isLoggedIn, program.id])

  const handleSave = async (programId: string) => {
    try {
      const response = await fetch('/api/students/saved-programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programId })
      })

      if (response.ok) {
        setIsSaved(true)
      }
    } catch (err) {
      logger.error('Error saving program', { error: err, programId })
    }
  }

  const handleUnsave = async (programId: string) => {
    try {
      const response = await fetch(`/api/students/saved-programs/${programId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setIsSaved(false)
      }
    } catch (err) {
      logger.error('Error unsaving program', { error: err, programId })
    }
  }
  // Coordinators shouldn't save programs on behalf of students
  const canSave = isLoggedIn && !isCoordinatorView

  return (
    <ProgramCard
      program={program}
      matchResult={matchResult}
      variant="detail"
      studentProfile={studentProfile}
      isSaved={isLoading ? false : isSaved}
      onSave={canSave ? handleSave : undefined}
      onUnsave={canSave ? handleUnsave : undefined}
      isCoordinatorView={isCoordinatorView}
    />
  )
}
