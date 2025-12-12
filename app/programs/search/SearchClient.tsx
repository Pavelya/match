/**
 * Search Client Component
 *
 * Modern search UI with Algolia integration.
 * 2025 Design Patterns:
 * - Inline filter chips below search
 * - Applied filters as cancellable tags
 * - Real-time results count
 * - Touch-friendly mobile design
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ProgramCard } from '@/components/student/ProgramCard'
import { Search, X, SlidersHorizontal, Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FieldIcon } from '@/lib/icons'

interface SearchClientProps {
  fields: Array<{ id: string; name: string }>
  countries: Array<{ id: string; name: string; code: string; flagEmoji: string | null }>
}

interface SearchResult {
  objectID: string
  programId: string
  programName: string
  universityName: string
  universityAbbreviation?: string
  universityImageUrl?: string // URL from Supabase Storage
  fieldOfStudy: { id: string; name: string }
  country: { id: string; name: string; code: string }
  degreeType: string
  duration: string
  minimumIBPoints?: number
}

/**
 * Transform Algolia search result to ProgramCard format
 */
function transformToProgram(result: SearchResult) {
  return {
    id: result.programId,
    name: result.programName,
    university: {
      name: result.universityName,
      abbreviation: result.universityAbbreviation ?? null,
      image: result.universityImageUrl ?? null
    },
    country: {
      name: result.country.name,
      code: result.country.code,
      flagEmoji: null
    },
    fieldOfStudy: {
      name: result.fieldOfStudy.name
    },
    degreeType: result.degreeType,
    duration: result.duration,
    minIBPoints: result.minimumIBPoints ?? null
  }
}

export function SearchClient({ fields, countries }: SearchClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Search state
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalHits, setTotalHits] = useState(0)

  // Filter state
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [minPoints, setMinPoints] = useState('')
  const [maxPoints, setMaxPoints] = useState('')

  // Debounced search function
  const performSearch = useCallback(
    async (searchQuery: string, fieldIds: string[], countryIds: string[]) => {
      setIsLoading(true)

      try {
        const params = new URLSearchParams()
        if (searchQuery) params.set('q', searchQuery)
        if (fieldIds.length > 0) params.set('fields', fieldIds.join(','))
        if (countryIds.length > 0) params.set('countries', countryIds.join(','))
        if (minPoints) params.set('minPoints', minPoints)
        if (maxPoints) params.set('maxPoints', maxPoints)

        const response = await fetch(`/api/programs/search?${params.toString()}`)
        const data = await response.json()

        if (data.hits) {
          setResults(data.hits)
          setTotalHits(data.nbHits || data.hits.length)
        }
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    },
    [minPoints, maxPoints]
  )

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query, selectedFields, selectedCountries)
    }, 300)
    return () => clearTimeout(timer)
  }, [query, selectedFields, selectedCountries, performSearch])

  // Update URL
  useEffect(() => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (selectedFields.length > 0) params.set('fields', selectedFields.join(','))
    if (selectedCountries.length > 0) params.set('countries', selectedCountries.join(','))
    const newUrl = params.toString() ? `?${params.toString()}` : '/programs/search'
    router.replace(newUrl, { scroll: false })
  }, [query, selectedFields, selectedCountries, router])

  // Toggle helpers
  const toggleField = (fieldId: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldId) ? prev.filter((f) => f !== fieldId) : [...prev, fieldId]
    )
  }

  const toggleCountry = (countryId: string) => {
    setSelectedCountries((prev) =>
      prev.includes(countryId) ? prev.filter((c) => c !== countryId) : [...prev, countryId]
    )
  }

  const clearAllFilters = () => {
    setSelectedFields([])
    setSelectedCountries([])
    setMinPoints('')
    setMaxPoints('')
  }

  const activeFilterCount =
    selectedFields.length + selectedCountries.length + (minPoints ? 1 : 0) + (maxPoints ? 1 : 0)

  // Get field/country names for applied filter display
  const getFieldName = (id: string) => fields.find((f) => f.id === id)?.name || id
  const getCountry = (id: string) => countries.find((c) => c.id === id)

  return (
    <div className="space-y-6">
      {/* Search Bar with Filter Toggle */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search programs, universities, or fields..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-12 h-14 text-base sm:text-lg rounded-2xl bg-muted/30 border-0 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle - Icon Only */}
        <Button
          variant={showFilters ? 'default' : 'outline'}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'h-14 w-14 rounded-2xl shrink-0 transition-all',
            showFilters && 'bg-primary text-primary-foreground',
            activeFilterCount > 0 && !showFilters && 'border-primary text-primary'
          )}
        >
          <SlidersHorizontal className="h-5 w-5" />
          {activeFilterCount > 0 && !showFilters && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Applied Filters as Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedFields.map((id) => (
            <button
              key={id}
              onClick={() => toggleField(id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              <FieldIcon fieldName={getFieldName(id)} className="h-3.5 w-3.5" />
              {getFieldName(id)}
              <X className="h-3.5 w-3.5 ml-0.5" />
            </button>
          ))}
          {selectedCountries.map((id) => {
            const country = getCountry(id)
            return (
              <button
                key={id}
                onClick={() => toggleCountry(id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                {country?.flagEmoji} {country?.name}
                <X className="h-3.5 w-3.5 ml-0.5" />
              </button>
            )
          })}
          {(minPoints || maxPoints) && (
            <button
              onClick={() => {
                setMinPoints('')
                setMaxPoints('')
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              {minPoints && maxPoints
                ? `${minPoints}-${maxPoints}`
                : minPoints
                  ? `${minPoints}+`
                  : `≤${maxPoints}`}{' '}
              IB pts
              <X className="h-3.5 w-3.5 ml-0.5" />
            </button>
          )}
          <button
            onClick={clearAllFilters}
            className="text-sm text-muted-foreground hover:text-foreground underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Expandable Filters Panel */}
      {showFilters && (
        <Card className="border-0 bg-muted/30 shadow-none">
          <CardContent className="p-5 space-y-6">
            {/* Fields of Study */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">Fields of Study</h3>
              <div className="flex flex-wrap gap-2">
                {fields.map((field) => (
                  <button
                    key={field.id}
                    onClick={() => toggleField(field.id)}
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                      selectedFields.includes(field.id)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-background hover:bg-muted border border-border'
                    )}
                  >
                    <FieldIcon fieldName={field.name} className="h-4 w-4" />
                    {field.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Countries */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">Countries</h3>
              <div className="flex flex-wrap gap-2">
                {countries.map((country) => (
                  <button
                    key={country.id}
                    onClick={() => toggleCountry(country.id)}
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                      selectedCountries.includes(country.id)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-background hover:bg-muted border border-border'
                    )}
                  >
                    <span>{country.flagEmoji}</span>
                    {country.name}
                  </button>
                ))}
              </div>
            </div>

            {/* IB Points Range */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">IB Points Range</h3>
              <div className="flex items-center gap-3 max-w-xs">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Min"
                  value={minPoints}
                  onChange={(e) => setMinPoints(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 h-12 px-4 rounded-xl bg-background border border-border text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <span className="text-muted-foreground font-medium">to</span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Max"
                  value={maxPoints}
                  onChange={(e) => setMaxPoints(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 h-12 px-4 rounded-xl bg-background border border-border text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Count */}
      <div className="flex items-center gap-2">
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Searching...</span>
          </div>
        ) : (
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{totalHits}</span> program
            {totalHits !== 1 ? 's' : ''} found
            {query && <span className="text-muted-foreground"> for &ldquo;{query}&rdquo;</span>}
          </p>
        )}
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result) => (
            <ProgramCard
              key={result.objectID}
              program={transformToProgram(result)}
              showMatchDetails={false}
            />
          ))}
        </div>
      ) : !isLoading ? (
        <Card className="border-0 bg-muted/30 shadow-none">
          <CardContent className="py-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No programs found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Try adjusting your search terms or filters to discover more programs
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
