/**
 * Student Matches Client Component (Coordinator View)
 *
 * Fetches and displays program matches for a student.
 * Similar to student view but with coordinator-specific UI.
 *
 * Part of Task 4.6.5: View student matches
 */

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ProgramCard } from '@/components/student/ProgramCard'
import { PageHeader } from '@/components/admin/shared'
import { Loader2, RefreshCw, AlertCircle, LineChart, ArrowLeft } from 'lucide-react'
import type { MatchResult } from '@/lib/matching/types'

interface ProgramData {
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
    description?: string | null
  }
  degreeType: string
  duration: string
  minIBPoints?: number | null
  city?: string | null
  courseRequirements?: {
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
  }[]
}

interface MatchWithProgram {
  programId: string
  overallScore: number
  academicMatch: MatchResult['academicMatch']
  locationMatch: MatchResult['locationMatch']
  fieldMatch: MatchResult['fieldMatch']
  weightsUsed: MatchResult['weightsUsed']
  adjustments: MatchResult['adjustments']
  program: ProgramData | null
}

interface MatchesResponse {
  matches: MatchWithProgram[]
  student: {
    id: string
    name: string | null
    email: string
  }
  totalMatches: number
  returnedCount: number
}

interface StudentMatchesClientProps {
  studentId: string
  studentName: string
  studentProfileId: string // The student's profile ID for linking to programs
}

export function StudentMatchesClient({
  studentId,
  studentName,
  studentProfileId
}: StudentMatchesClientProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [matches, setMatches] = useState<MatchesResponse | null>(null)

  const fetchMatches = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/coordinator/students/${studentId}/matches`)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to fetch matches')
      }

      const data: MatchesResponse = await response.json()
      setMatches(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatches()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId])

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading matches...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="max-w-md text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-xl font-bold">Unable to Load Matches</h2>
          <p className="text-muted-foreground">{error}</p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Link
              href={`/coordinator/students/${studentId}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Student
            </Link>
            <button
              onClick={fetchMatches}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // No matches state
  if (!matches || matches.matches.length === 0) {
    return (
      <>
        <PageHeader
          title={`Matches for ${studentName}`}
          icon={LineChart}
          backHref={`/coordinator/students/${studentId}`}
          backLabel="Back to Student"
        />

        <div className="flex items-center justify-center py-24">
          <div className="max-w-md text-center space-y-4">
            <LineChart className="h-12 w-12 text-muted-foreground mx-auto" />
            <h2 className="text-xl font-bold">No Matches Found</h2>
            <p className="text-muted-foreground">
              This student doesn&apos;t have any matching programs yet. Ensure they have completed
              their profile with courses and preferences.
            </p>
            <Link
              href={`/coordinator/students/${studentId}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 mt-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Student
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title={`Matches for ${studentName}`}
        icon={LineChart}
        description={`Found ${matches.totalMatches} matching programs. Showing top ${matches.returnedCount}.`}
        backHref={`/coordinator/students/${studentId}`}
        backLabel="Back to Student"
      />

      {/* Matches Grid */}
      <div className="space-y-4 mt-6">
        {matches.matches.map((match) => {
          if (!match.program) return null

          return (
            <ProgramCard
              key={match.programId}
              program={match.program}
              matchResult={match as MatchResult}
              variant="card"
              coordinatorStudentId={studentProfileId}
              // No save functionality for coordinator view
            />
          )
        })}
      </div>

      {/* Refresh Button */}
      <div className="mt-8 text-center">
        <button
          onClick={fetchMatches}
          className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Matches
        </button>
      </div>
    </>
  )
}
