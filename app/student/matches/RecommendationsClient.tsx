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
import { PageLoader } from '@/components/ui/page-loader'
import { FadeIn } from '@/components/ui/fade-in'
import { StaggerChildren } from '@/components/ui/stagger-children'
import { RefreshCw, AlertCircle } from 'lucide-react'
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
      // Fetch matches and saved programs in parallel
      const [matchesResponse, savedResponse] = await Promise.all([
        fetch('/api/students/matches'),
        fetch('/api/students/saved-programs')
      ])

      if (!matchesResponse.ok) {
        const data = await matchesResponse.json()
        throw new Error(data.error || 'Failed to fetch recommendations')
      }

      const matchesData: MatchesResponse = await matchesResponse.json()
      setMatches(matchesData)

      // Load saved programs to show correct save state
      if (savedResponse.ok) {
        const savedData = await savedResponse.json()
        const savedIds = new Set<string>(savedData.programs?.map((p: { id: string }) => p.id) || [])
        setSavedPrograms(savedIds)
      }
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
    return <PageLoader variant="skeleton-cards" count={6} message="Finding your best matches..." />
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
      {/* Animated Header */}
      <FadeIn direction="down" duration={400}>
        <PageHeader
          title="Your Program Recommendations"
          description={`We found ${matches.totalMatches} programs matching your profile. Showing top ${matches.returnedCount}.`}
        />
      </FadeIn>

      {/* Animated Recommendations Grid */}
      <StaggerChildren staggerDelay={60} initialDelay={200} className="space-y-4">
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
      </StaggerChildren>

      {/* Refresh Button - fades in after cards */}
      <FadeIn direction="up" delay={800}>
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={fetchRecommendations}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Recommendations
          </Button>
        </div>
      </FadeIn>
    </PageContainer>
  )
}
