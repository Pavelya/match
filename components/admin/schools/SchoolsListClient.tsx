/**
 * Schools List Client Component
 *
 * Client-side wrapper for the Schools list page.
 * Handles search, filtering, and stats display.
 */

'use client'

import { useState, useMemo } from 'react'
import { GraduationCap, Crown, CheckCircle2, XCircle } from 'lucide-react'
import { StatCard, SearchFilterBar, FilterChip, TableEmptyState } from '@/components/admin/shared'
import { SchoolsTable } from './SchoolsTable'

interface School {
  id: string
  name: string
  city: string
  subscriptionTier: 'VIP' | 'REGULAR'
  subscriptionStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'CANCELLED'
  country: {
    name: string
    flagEmoji: string
  }
  _count: {
    coordinators: number
    students: number
  }
}

interface SchoolsListClientProps {
  schools: School[]
}

export function SchoolsListClient({ schools }: SchoolsListClientProps) {
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // Calculate stats
  const stats = useMemo(
    () => ({
      total: schools.length,
      vip: schools.filter((s) => s.subscriptionTier === 'VIP').length,
      regular: schools.filter((s) => s.subscriptionTier === 'REGULAR').length,
      active: schools.filter((s) => s.subscriptionStatus === 'ACTIVE').length
    }),
    [schools]
  )

  // Filter schools
  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        const matchesName = school.name.toLowerCase().includes(searchLower)
        const matchesCity = school.city.toLowerCase().includes(searchLower)
        const matchesCountry = school.country.name.toLowerCase().includes(searchLower)
        if (!matchesName && !matchesCity && !matchesCountry) return false
      }

      // Tier filter
      if (tierFilter && school.subscriptionTier !== tierFilter) return false

      // Status filter
      if (statusFilter && school.subscriptionStatus !== statusFilter) return false

      return true
    })
  }, [schools, search, tierFilter, statusFilter])

  const hasActiveFilters = !!tierFilter || !!statusFilter
  const activeFilterCount = (tierFilter ? 1 : 0) + (statusFilter ? 1 : 0)

  const handleClearAll = () => {
    setSearch('')
    setTierFilter(null)
    setStatusFilter(null)
  }

  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Schools"
          value={stats.total}
          icon={GraduationCap}
          variant="horizontal"
        />
        <StatCard
          title="VIP Schools"
          value={stats.vip}
          icon={Crown}
          variant="horizontal"
          iconColor="amber"
        />
        <StatCard
          title="Regular Schools"
          value={stats.regular}
          icon={GraduationCap}
          variant="horizontal"
        />
        <StatCard
          title="Active Subscriptions"
          value={stats.active}
          icon={CheckCircle2}
          variant="horizontal"
          iconColor="green"
        />
      </div>

      {/* Search and Filter Bar */}
      <SearchFilterBar
        placeholder="Search schools by name, city, or country..."
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        activeFilterCount={activeFilterCount}
        onClearAll={handleClearAll}
      >
        <FilterChip label="All Tiers" isActive={!tierFilter} onClick={() => setTierFilter(null)} />
        <FilterChip
          label="VIP"
          icon={Crown}
          isActive={tierFilter === 'VIP'}
          onClick={() => setTierFilter('VIP')}
          variant="warning"
        />
        <FilterChip
          label="Regular"
          isActive={tierFilter === 'REGULAR'}
          onClick={() => setTierFilter('REGULAR')}
        />
        <div className="w-px h-6 bg-border mx-2" />
        <FilterChip
          label="Active"
          icon={CheckCircle2}
          isActive={statusFilter === 'ACTIVE'}
          onClick={() => setStatusFilter(statusFilter === 'ACTIVE' ? null : 'ACTIVE')}
          variant="success"
        />
        <FilterChip
          label="Inactive"
          icon={XCircle}
          isActive={statusFilter === 'INACTIVE'}
          onClick={() => setStatusFilter(statusFilter === 'INACTIVE' ? null : 'INACTIVE')}
          variant="error"
        />
      </SearchFilterBar>

      {/* Results */}
      {filteredSchools.length === 0 ? (
        search || hasActiveFilters ? (
          <div className="rounded-xl border bg-card p-12 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No schools found</h3>
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
            icon={GraduationCap}
            title="No schools yet"
            description="Get started by adding your first IB school."
            action={{ label: 'Add School', href: '/admin/schools/new' }}
          />
        )
      ) : (
        <>
          <div className="text-sm text-muted-foreground mb-4">
            Showing {filteredSchools.length} of {schools.length} schools
          </div>
          <SchoolsTable schools={filteredSchools} />
        </>
      )}
    </>
  )
}
