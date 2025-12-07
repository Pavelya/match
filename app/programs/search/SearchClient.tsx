/**
 * Search Client Component
 *
 * Client-side search UI with Algolia integration.
 * Handles real-time search, filters, and results display.
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  X,
  MapPin,
  GraduationCap,
  Filter,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { FieldIcon } from '@/lib/icons'
import Link from 'next/link'

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
  fieldOfStudy: { id: string; name: string }
  country: { id: string; name: string; code: string }
  degreeType: string
  duration: string
  minimumIBPoints?: number
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
  const [minPoints, setMinPoints] = useState<number | null>(null)
  const [maxPoints, setMaxPoints] = useState<number | null>(null)

  // Debounced search function
  const performSearch = useCallback(
    async (searchQuery: string, fieldIds: string[], countryIds: string[]) => {
      setIsLoading(true)

      try {
        // Build query params
        const params = new URLSearchParams()
        if (searchQuery) params.set('q', searchQuery)
        if (fieldIds.length > 0) params.set('fields', fieldIds.join(','))
        if (countryIds.length > 0) params.set('countries', countryIds.join(','))
        if (minPoints) params.set('minPoints', minPoints.toString())
        if (maxPoints) params.set('maxPoints', maxPoints.toString())

        // Call search API
        const response = await fetch(`/api/programs/search?${params.toString()}`)
        const data = await response.json()

        if (data.hits) {
          setResults(data.hits)
          setTotalHits(data.nbHits || data.hits.length)
        }
      } catch {
        // Search failed - will show empty state
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

  // Update URL on search
  useEffect(() => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (selectedFields.length > 0) params.set('fields', selectedFields.join(','))
    if (selectedCountries.length > 0) params.set('countries', selectedCountries.join(','))

    const newUrl = params.toString() ? `?${params.toString()}` : '/programs/search'
    router.replace(newUrl, { scroll: false })
  }, [query, selectedFields, selectedCountries, router])

  // Toggle filter selection
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

  // Clear all filters
  const clearFilters = () => {
    setSelectedFields([])
    setSelectedCountries([])
    setMinPoints(null)
    setMaxPoints(null)
  }

  // Active filter count
  const activeFilterCount = selectedFields.length + selectedCountries.length

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search programs, universities, or fields..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-12 h-14 text-lg rounded-xl border-2 focus:border-primary"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
          {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Field Filter */}
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Fields of Study
              </h3>
              <div className="flex flex-wrap gap-2">
                {fields.map((field) => (
                  <Badge
                    key={field.id}
                    variant={selectedFields.includes(field.id) ? 'default' : 'outline'}
                    className={cn(
                      'cursor-pointer transition-colors',
                      selectedFields.includes(field.id) && 'bg-primary'
                    )}
                    onClick={() => toggleField(field.id)}
                  >
                    {field.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Country Filter */}
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Countries
              </h3>
              <div className="flex flex-wrap gap-2">
                {countries.map((country) => (
                  <Badge
                    key={country.id}
                    variant={selectedCountries.includes(country.id) ? 'default' : 'outline'}
                    className={cn(
                      'cursor-pointer transition-colors',
                      selectedCountries.includes(country.id) && 'bg-primary'
                    )}
                    onClick={() => toggleCountry(country.id)}
                  >
                    {country.flagEmoji} {country.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* IB Points Filter */}
            <div>
              <h3 className="font-medium mb-2">Minimum IB Points Requirement</h3>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  min={0}
                  max={45}
                  value={minPoints || ''}
                  onChange={(e) => setMinPoints(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-24"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  min={0}
                  max={45}
                  value={maxPoints || ''}
                  onChange={(e) => setMaxPoints(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-24"
                />
                <span className="text-muted-foreground text-sm">points</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching...
            </span>
          ) : (
            <>
              {totalHits} program{totalHits !== 1 ? 's' : ''} found
              {query && <span> for &ldquo;{query}&rdquo;</span>}
            </>
          )}
        </p>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <SearchResultCard key={result.objectID} result={result} />
          ))}
        </div>
      ) : !isLoading ? (
        <Card className="p-12 text-center">
          <div className="text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No programs found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        </Card>
      ) : null}
    </div>
  )
}

/**
 * Individual search result card
 */
function SearchResultCard({ result }: { result: SearchResult }) {
  return (
    <Link href={`/programs/${result.programId}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        <CardContent className="p-5 space-y-3">
          {/* University */}
          <div className="text-sm text-muted-foreground">
            {result.universityAbbreviation || result.universityName}
          </div>

          {/* Program Name */}
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
            {result.programName}
          </h3>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-2 text-sm">
            {/* Country */}
            <Badge variant="outline" className="gap-1">
              <MapPin className="h-3 w-3" />
              {result.country.name}
            </Badge>

            {/* Field */}
            <Badge variant="outline" className="gap-1">
              <FieldIcon fieldName={result.fieldOfStudy.name} className="h-3 w-3" />
              {result.fieldOfStudy.name}
            </Badge>
          </div>

          {/* Details */}
          <div className="pt-2 border-t flex items-center justify-between text-sm text-muted-foreground">
            <span>{result.degreeType}</span>
            <span>{result.duration}</span>
            {result.minimumIBPoints && (
              <span className="font-medium">{result.minimumIBPoints} IB pts</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
