/**
 * Programs List Client Component
 *
 * Client-side wrapper for the Programs list page.
 * Handles search, filtering, and stats display.
 */

'use client'

import { useState, useMemo } from 'react'
import { BookOpen, GraduationCap, Award, Briefcase } from 'lucide-react'
import { StatCard, SearchFilterBar, FilterChip, TableEmptyState } from '@/components/admin/shared'
import { ProgramsTable } from './ProgramsTable'

interface Program {
  id: string
  name: string
  duration: string
  degreeType: string
  minIBPoints: number | null
  university: {
    id: string
    name: string
    city: string
    country: {
      flagEmoji: string
    }
  }
  fieldOfStudy: {
    id: string
    name: string
  }
  _count: {
    courseRequirements: number
    savedBy: number
  }
}

interface ProgramsListClientProps {
  programs: Program[]
}

export function ProgramsListClient({ programs }: ProgramsListClientProps) {
  const [search, setSearch] = useState('')
  const [degreeFilter, setDegreeFilter] = useState<string | null>(null)

  // Get unique degree types for filter chips
  const degreeTypes = useMemo(() => {
    const types = new Set(programs.map((p) => p.degreeType))
    return Array.from(types).sort()
  }, [programs])

  // Calculate stats
  // Note: degreeType is a free-text field with various formats:
  // - Full names: "Bachelor of Science", "Master of Arts"
  // - UK abbreviations: "BSc (Hons)", "MA (Hons)", "BEng (Hons)"
  // - Professional: "MBChB", "BVM&S", "BN"
  const stats = useMemo(() => {
    let bachelorCount = 0
    let masterCount = 0

    programs.forEach((p) => {
      const dt = p.degreeType.toLowerCase()

      // Bachelor patterns: Bachelor..., BSc, BA, BEng, BN, BVM&S, etc.
      if (
        dt.startsWith('bachelor') ||
        dt.startsWith('bsc') ||
        dt.startsWith('ba ') ||
        dt.startsWith('beng') ||
        dt.startsWith('bn') ||
        dt.startsWith('bvm') ||
        dt.startsWith('mbchb') // Medicine is undergraduate
      ) {
        bachelorCount++
      }
      // Master patterns: Master..., MA (Hons), MSc, MInf, etc.
      // Note: MA (Hons) in Scottish universities is actually undergraduate!
      else if (
        dt.startsWith('master') ||
        dt.startsWith('msc') ||
        dt.startsWith('minf') ||
        (dt.startsWith('ma ') && !dt.includes('(hons)')) // MA without (Hons) is postgrad
      ) {
        masterCount++
      }
      // Scottish MA (Hons) is undergraduate
      else if (dt.startsWith('ma (hons)') || dt.startsWith('ma(hons)')) {
        bachelorCount++
      }
    })

    return {
      total: programs.length,
      bachelor: bachelorCount,
      master: masterCount,
      other: programs.length - bachelorCount - masterCount
    }
  }, [programs])

  // Filter programs
  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        const matchesName = program.name.toLowerCase().includes(searchLower)
        const matchesUniversity = program.university.name.toLowerCase().includes(searchLower)
        const matchesField = program.fieldOfStudy.name.toLowerCase().includes(searchLower)
        const matchesCity = program.university.city.toLowerCase().includes(searchLower)
        if (!matchesName && !matchesUniversity && !matchesField && !matchesCity) return false
      }

      // Degree filter
      if (degreeFilter && program.degreeType !== degreeFilter) return false

      return true
    })
  }, [programs, search, degreeFilter])

  const hasActiveFilters = !!degreeFilter
  const activeFilterCount = degreeFilter ? 1 : 0

  const handleClearAll = () => {
    setSearch('')
    setDegreeFilter(null)
  }

  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Programs" value={stats.total} icon={BookOpen} variant="horizontal" />
        <StatCard
          title="Bachelor's"
          value={stats.bachelor}
          icon={GraduationCap}
          variant="horizontal"
          iconColor="blue"
        />
        <StatCard
          title="Master's"
          value={stats.master}
          icon={Award}
          variant="horizontal"
          iconColor="purple"
        />
        <StatCard
          title="Other Degrees"
          value={stats.other}
          icon={Briefcase}
          variant="horizontal"
          iconColor="amber"
        />
      </div>

      {/* Search and Filter Bar */}
      <SearchFilterBar
        placeholder="Search programs by name, university, field, or city..."
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        activeFilterCount={activeFilterCount}
        onClearAll={handleClearAll}
      >
        <FilterChip
          label="All Degrees"
          isActive={!degreeFilter}
          onClick={() => setDegreeFilter(null)}
        />
        {degreeTypes.map((type) => (
          <FilterChip
            key={type}
            label={type.charAt(0) + type.slice(1).toLowerCase()}
            isActive={degreeFilter === type}
            onClick={() => setDegreeFilter(type)}
          />
        ))}
      </SearchFilterBar>

      {/* Results */}
      {filteredPrograms.length === 0 ? (
        search || hasActiveFilters ? (
          <div className="rounded-xl border bg-card p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No programs found</h3>
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
            icon={BookOpen}
            title="No programs yet"
            description="Get started by adding your first academic program."
            action={{ label: 'Add Program', href: '/admin/programs/new' }}
          />
        )
      ) : (
        <>
          <div className="text-sm text-muted-foreground mb-4">
            Showing {filteredPrograms.length} of {programs.length} programs
          </div>
          <ProgramsTable programs={filteredPrograms} />
        </>
      )}
    </>
  )
}
