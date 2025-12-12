/**
 * Universities List Client Component
 *
 * Client-side wrapper for the Universities list page.
 * Handles search, filtering, and stats display.
 */

'use client'

import { useState, useMemo } from 'react'
import { Building2, BookOpen, Landmark, Building } from 'lucide-react'
import { StatCard, SearchFilterBar, FilterChip, TableEmptyState } from '@/components/admin/shared'
import { UniversitiesTable } from './UniversitiesTable'

interface University {
  id: string
  name: string
  abbreviatedName: string | null
  city: string
  classification: 'PUBLIC' | 'PRIVATE'
  country: {
    name: string
    flagEmoji: string
  }
  _count: {
    programs: number
    agents: number
  }
}

interface UniversitiesListClientProps {
  universities: University[]
}

export function UniversitiesListClient({ universities }: UniversitiesListClientProps) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string | null>(null)

  // Calculate stats
  const stats = useMemo(
    () => ({
      total: universities.length,
      public: universities.filter((u) => u.classification === 'PUBLIC').length,
      private: universities.filter((u) => u.classification === 'PRIVATE').length,
      withPrograms: universities.filter((u) => u._count.programs > 0).length
    }),
    [universities]
  )

  // Filter universities
  const filteredUniversities = useMemo(() => {
    return universities.filter((university) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        const matchesName = university.name.toLowerCase().includes(searchLower)
        const matchesAbbr = university.abbreviatedName?.toLowerCase().includes(searchLower)
        const matchesCity = university.city.toLowerCase().includes(searchLower)
        const matchesCountry = university.country.name.toLowerCase().includes(searchLower)
        if (!matchesName && !matchesAbbr && !matchesCity && !matchesCountry) return false
      }

      // Type filter
      if (typeFilter && university.classification !== typeFilter) return false

      return true
    })
  }, [universities, search, typeFilter])

  const hasActiveFilters = !!typeFilter
  const activeFilterCount = typeFilter ? 1 : 0

  const handleClearAll = () => {
    setSearch('')
    setTypeFilter(null)
  }

  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Universities"
          value={stats.total}
          icon={Building2}
          variant="horizontal"
        />
        <StatCard
          title="Public"
          value={stats.public}
          icon={Landmark}
          variant="horizontal"
          iconColor="blue"
        />
        <StatCard
          title="Private"
          value={stats.private}
          icon={Building}
          variant="horizontal"
          iconColor="purple"
        />
        <StatCard
          title="With Programs"
          value={stats.withPrograms}
          icon={BookOpen}
          variant="horizontal"
          iconColor="green"
        />
      </div>

      {/* Search and Filter Bar */}
      <SearchFilterBar
        placeholder="Search universities by name, city, or country..."
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        activeFilterCount={activeFilterCount}
        onClearAll={handleClearAll}
      >
        <FilterChip label="All Types" isActive={!typeFilter} onClick={() => setTypeFilter(null)} />
        <FilterChip
          label="Public"
          icon={Landmark}
          isActive={typeFilter === 'PUBLIC'}
          onClick={() => setTypeFilter('PUBLIC')}
        />
        <FilterChip
          label="Private"
          icon={Building}
          isActive={typeFilter === 'PRIVATE'}
          onClick={() => setTypeFilter('PRIVATE')}
        />
      </SearchFilterBar>

      {/* Results */}
      {filteredUniversities.length === 0 ? (
        search || hasActiveFilters ? (
          <div className="rounded-xl border bg-card p-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No universities found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
            <button
              onClick={handleClearAll}
              className="text-sm font-medium text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <TableEmptyState
            icon={Building2}
            title="No universities yet"
            description="Get started by adding your first university."
            action={{ label: 'Add University', href: '/admin/universities/new' }}
          />
        )
      ) : (
        <>
          <div className="text-sm text-muted-foreground mb-4">
            Showing {filteredUniversities.length} of {universities.length} universities
          </div>
          <UniversitiesTable universities={filteredUniversities} />
        </>
      )}
    </>
  )
}
