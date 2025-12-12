/**
 * Recommendations Client Component
 *
 * Fetches and displays personalized program recommendations
 * with loading states, error handling, and save functionality.
 */

'use client'

import { useEffect, useState } from 'react'
import { ProgramCard } from '@/components/student/ProgramCard'
import { PageContainer, PageHeader } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/button'
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react'
import { logger } from '@/lib/logger'
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
  }
  degreeType: string
  duration: string
  minIBPoints?: number | null
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
  studentId: string
  totalMatches: number
  returnedCount: number
}

export function RecommendationsClient() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [matches, setMatches] = useState<MatchesResponse | null>(null)
  const [savedPrograms, setSavedPrograms] = useState<Set<string>>(new Set())

  const fetchRecommendations = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/students/matches')

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to fetch recommendations')
      }

      const data: MatchesResponse = await response.json()
      setMatches(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (programId: string) => {
    try {
      const response = await fetch('/api/students/saved-programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programId })
      })

      if (response.ok) {
        setSavedPrograms((prev) => new Set(prev).add(programId))
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
        setSavedPrograms((prev) => {
          const next = new Set(prev)
          next.delete(programId)
          return next
        })
      }
    } catch (err) {
      logger.error('Error unsaving program', { error: err, programId })
    }
  }

  useEffect(() => {
    fetchRecommendations()
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Finding your best matches...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-md text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-bold">Unable to Load Recommendations</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={fetchRecommendations} className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // No matches state
  if (!matches || matches.matches.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold">No Matches Found</h2>
          <p className="text-muted-foreground">
            We couldn&apos;t find any programs matching your profile. Please complete your
            onboarding or adjust your preferences.
          </p>
          <Button onClick={() => (window.location.href = '/student/onboarding')} className="mt-4">
            Update Profile
          </Button>
        </div>
      </div>
    )
  }

  return (
    <PageContainer>
      <PageHeader
        title="Your Program Recommendations"
        description={`We found ${matches.totalMatches} programs matching your profile. Showing top ${matches.returnedCount}.`}
      />

      {/* Recommendations Grid */}
      <div className="space-y-4">
        {matches.matches.map((match) => {
          if (!match.program) return null

          return (
            <ProgramCard
              key={match.programId}
              program={match.program}
              matchResult={match as MatchResult}
              isSaved={savedPrograms.has(match.programId)}
              onSave={handleSave}
              onUnsave={handleUnsave}
            />
          )
        })}
      </div>

      {/* Refresh Button */}
      <div className="mt-8 text-center">
        <Button variant="outline" onClick={fetchRecommendations}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Recommendations
        </Button>
      </div>
    </PageContainer>
  )
}
