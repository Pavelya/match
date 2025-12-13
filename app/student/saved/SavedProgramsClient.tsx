/**
 * Saved Programs Client Component
 *
 * Fetches and displays saved programs with the same card view as search results.
 * Features:
 * - Same ProgramCard layout as programs/search
 * - Option to remove programs from saved list
 * - Loading and empty states
 */

'use client'

import { useEffect, useState, useCallback } from 'react'
import { ProgramCard } from '@/components/student/ProgramCard'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Bookmark, BookmarkX, RefreshCw, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { logger } from '@/lib/logger'

interface SavedProgram {
  id: string
  name: string
  university: {
    name: string
    abbreviation?: string | null
    image?: string | null
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
  savedAt: string
}

interface SavedProgramsResponse {
  programs: SavedProgram[]
  total: number
}

export function SavedProgramsClient() {
  const [programs, setPrograms] = useState<SavedProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set())

  const fetchSavedPrograms = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/students/saved-programs')

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to fetch saved programs')
      }

      const data: SavedProgramsResponse = await response.json()
      setPrograms(data.programs)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleRemove = async (programId: string) => {
    // Optimistic update
    setRemovingIds((prev) => new Set(prev).add(programId))

    try {
      const response = await fetch(`/api/students/saved-programs/${programId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // Remove from local state
        setPrograms((prev) => prev.filter((p) => p.id !== programId))
      } else {
        // Failed - revert optimistic update
        setRemovingIds((prev) => {
          const next = new Set(prev)
          next.delete(programId)
          return next
        })
        logger.error('Failed to remove program', { programId })
      }
    } catch (err) {
      // Error - revert optimistic update
      setRemovingIds((prev) => {
        const next = new Set(prev)
        next.delete(programId)
        return next
      })
      logger.error('Error removing program', { error: err, programId })
    }
  }

  useEffect(() => {
    fetchSavedPrograms()
  }, [fetchSavedPrograms])

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading your saved programs...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="max-w-md text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-bold">Unable to Load Saved Programs</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={fetchSavedPrograms} className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // Empty state
  if (programs.length === 0) {
    return (
      <Card className="border-0 bg-muted/30 shadow-none">
        <CardContent className="py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
            <Bookmark className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Saved Programs Yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto mb-6">
            Save programs you&apos;re interested in to review them later. Click the bookmark icon on
            any program card to save it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/programs/search">Browse Programs</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/student/matches">View Your Matches</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">{programs.length}</span> saved program
          {programs.length !== 1 ? 's' : ''}
        </p>
        <Button variant="ghost" size="sm" onClick={fetchSavedPrograms}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Programs Grid - Same layout as search */}
      <div className="space-y-4">
        {programs.map((program) => {
          const isRemoving = removingIds.has(program.id)

          return (
            <div
              key={program.id}
              className={isRemoving ? 'opacity-50 pointer-events-none transition-opacity' : ''}
            >
              <ProgramCard
                program={program}
                showMatchDetails={false}
                isSaved={true}
                onUnsave={handleRemove}
              />
            </div>
          )
        })}
      </div>

      {/* Action hint */}
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <BookmarkX className="h-4 w-4" />
          Click the bookmark icon to remove a program from your saved list
        </p>
      </div>
    </div>
  )
}
