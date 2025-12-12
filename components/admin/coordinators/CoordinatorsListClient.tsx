/**
 * Coordinators List Client Component
 *
 * Client-side wrapper for the Coordinators list page.
 * Handles search functionality and results display.
 */

'use client'

import { useState, useMemo } from 'react'
import { Users, UserCog, Clock, GraduationCap } from 'lucide-react'
import { StatCard, SearchFilterBar, FilterChip, TableEmptyState } from '@/components/admin/shared'
import { CoordinatorTable } from './CoordinatorTable'

interface School {
  id: string
  name: string
  subscriptionTier: 'VIP' | 'REGULAR'
}

interface Coordinator {
  id: string
  type: 'coordinator' | 'invitation'
  userId: string | null
  email: string
  name: string | null
  image: string | null
  status: 'ACTIVE' | 'PENDING' | 'REVOKED'
  school: School | null
  createdAt: string
  joinedAt?: string
  expiresAt?: string
}

interface CoordinatorsListClientProps {
  coordinators: Coordinator[]
  statusFilter: string | null
}

export function CoordinatorsListClient({
  coordinators,
  statusFilter
}: CoordinatorsListClientProps) {
  const [search, setSearch] = useState('')

  // Calculate stats from ALL coordinators (not filtered by status)
  const stats = useMemo(
    () => ({
      total: coordinators.length,
      active: coordinators.filter((c) => c.status === 'ACTIVE').length,
      pending: coordinators.filter((c) => c.status === 'PENDING').length,
      revoked: coordinators.filter((c) => c.status === 'REVOKED').length
    }),
    [coordinators]
  )

  // Apply status filter from URL
  const statusFilteredCoordinators = useMemo(() => {
    if (!statusFilter) return coordinators
    if (statusFilter === 'active') return coordinators.filter((c) => c.status === 'ACTIVE')
    if (statusFilter === 'pending') return coordinators.filter((c) => c.status === 'PENDING')
    return coordinators
  }, [coordinators, statusFilter])

  // Apply search filter
  const filteredCoordinators = useMemo(() => {
    if (!search) return statusFilteredCoordinators

    const searchLower = search.toLowerCase()
    return statusFilteredCoordinators.filter((coordinator) => {
      const matchesEmail = coordinator.email.toLowerCase().includes(searchLower)
      const matchesName = coordinator.name?.toLowerCase().includes(searchLower)
      const matchesSchool = coordinator.school?.name.toLowerCase().includes(searchLower)
      return matchesEmail || matchesName || matchesSchool
    })
  }, [statusFilteredCoordinators, search])

  const handleClearSearch = () => {
    setSearch('')
  }

  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total"
          value={stats.total}
          icon={Users}
          href="/admin/coordinators"
          variant="horizontal"
          isActive={!statusFilter}
        />
        <StatCard
          title="Active"
          value={stats.active}
          icon={UserCog}
          href="/admin/coordinators?status=active"
          variant="horizontal"
          isActive={statusFilter === 'active'}
          iconColor="green"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          href="/admin/coordinators?status=pending"
          variant="horizontal"
          isActive={statusFilter === 'pending'}
          iconColor="amber"
        />
      </div>

      {/* Search Bar */}
      <SearchFilterBar
        placeholder="Search by name, email, or school..."
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={!!statusFilter}
        activeFilterCount={statusFilter ? 1 : 0}
        onClearAll={() => {
          setSearch('')
          // Status filter is controlled via URL, so we just clear search
        }}
      >
        <FilterChip
          label="All"
          isActive={!statusFilter}
          onClick={() => {
            // Navigate to remove status param - using Link would be cleaner
            window.location.href = '/admin/coordinators'
          }}
        />
        <FilterChip
          label="Active"
          icon={UserCog}
          isActive={statusFilter === 'active'}
          onClick={() => {
            window.location.href = '/admin/coordinators?status=active'
          }}
          variant="success"
        />
        <FilterChip
          label="Pending"
          icon={Clock}
          isActive={statusFilter === 'pending'}
          onClick={() => {
            window.location.href = '/admin/coordinators?status=pending'
          }}
          variant="warning"
        />
      </SearchFilterBar>

      {/* Results */}
      {filteredCoordinators.length === 0 ? (
        search ? (
          <div className="rounded-xl border bg-card p-12 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No coordinators found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search.</p>
            <button
              onClick={handleClearSearch}
              className="text-sm font-medium text-primary hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <TableEmptyState
            icon={GraduationCap}
            title="No coordinators yet"
            description="Invite coordinators from individual school pages."
            action={{ label: 'Go to Schools', href: '/admin/schools' }}
          />
        )
      ) : (
        <>
          <div className="text-sm text-muted-foreground mb-4">
            Showing {filteredCoordinators.length} coordinator
            {filteredCoordinators.length !== 1 ? 's' : ''}
            {search && ` matching "${search}"`}
          </div>
          <CoordinatorTable coordinators={filteredCoordinators} />
        </>
      )}
    </>
  )
}
