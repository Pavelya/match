/**
 * Agents List Client Component
 *
 * Client-side wrapper for the Agents list page.
 * Handles search, filtering, and stats display.
 */

'use client'

import { useState, useMemo } from 'react'
import { Briefcase, Users, Building2, Landmark, Building } from 'lucide-react'
import { StatCard, SearchFilterBar, FilterChip } from '@/components/admin/shared'
import { AgentsTable } from './AgentsTable'

interface Country {
  name: string
  flagEmoji: string
}

interface University {
  id: string
  name: string
  abbreviatedName: string | null
  classification: 'PUBLIC' | 'PRIVATE'
  city: string
  country: Country
}

interface Agent {
  id: string
  userId: string
  email: string
  name: string | null
  image: string | null
  createdAt: string
  userCreatedAt: string
  university: University
}

interface AgentsListClientProps {
  agents: Agent[]
  stats: {
    total: number
    publicUniversities: number
    privateUniversities: number
    uniqueUniversities: number
  }
  universities: University[]
}

export function AgentsListClient({
  agents,
  stats,
  universities: _universities
}: AgentsListClientProps) {
  const [search, setSearch] = useState('')
  const [classificationFilter, setClassificationFilter] = useState<string | null>(null)

  // Filter agents
  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        const matchesEmail = agent.email.toLowerCase().includes(searchLower)
        const matchesName = agent.name?.toLowerCase().includes(searchLower)
        const matchesUniversity = agent.university.name.toLowerCase().includes(searchLower)
        const matchesAbbr = agent.university.abbreviatedName?.toLowerCase().includes(searchLower)
        if (!matchesEmail && !matchesName && !matchesUniversity && !matchesAbbr) return false
      }

      // Classification filter
      if (classificationFilter === 'public' && agent.university.classification !== 'PUBLIC')
        return false
      if (classificationFilter === 'private' && agent.university.classification !== 'PRIVATE')
        return false

      return true
    })
  }, [agents, search, classificationFilter])

  const hasActiveFilters = !!classificationFilter
  const activeFilterCount = classificationFilter ? 1 : 0

  const handleClearAll = () => {
    setSearch('')
    setClassificationFilter(null)
  }

  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Agents" value={stats.total} icon={Users} variant="horizontal" />
        <StatCard
          title="Public Unis"
          value={stats.publicUniversities}
          icon={Landmark}
          variant="horizontal"
          iconColor="blue"
        />
        <StatCard
          title="Private Unis"
          value={stats.privateUniversities}
          icon={Building}
          variant="horizontal"
          iconColor="purple"
        />
        <StatCard
          title="Universities"
          value={stats.uniqueUniversities}
          icon={Building2}
          variant="horizontal"
          iconColor="green"
        />
      </div>

      {/* Search and Filter Bar */}
      <SearchFilterBar
        placeholder="Search agents by name, email, or university..."
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        activeFilterCount={activeFilterCount}
        onClearAll={handleClearAll}
      >
        <FilterChip
          label="All Agents"
          isActive={!classificationFilter}
          onClick={() => setClassificationFilter(null)}
        />
        <FilterChip
          label="Public Unis"
          icon={Landmark}
          isActive={classificationFilter === 'public'}
          onClick={() => setClassificationFilter('public')}
        />
        <FilterChip
          label="Private Unis"
          icon={Building}
          isActive={classificationFilter === 'private'}
          onClick={() => setClassificationFilter('private')}
          variant="default"
        />
      </SearchFilterBar>

      {/* Results */}
      {filteredAgents.length === 0 ? (
        search || hasActiveFilters ? (
          <div className="rounded-xl border bg-card p-12 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No agents found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
            <button
              onClick={handleClearAll}
              className="text-sm font-medium text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No agents yet</h3>
            <p className="text-muted-foreground">
              University agents will appear here once they are invited.
            </p>
          </div>
        )
      ) : (
        <>
          <div className="text-sm text-muted-foreground mb-4">
            Showing {filteredAgents.length} of {agents.length} agents
          </div>
          <AgentsTable agents={filteredAgents} />
        </>
      )}
    </>
  )
}
