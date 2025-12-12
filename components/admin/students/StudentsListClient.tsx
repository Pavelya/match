/**
 * Students List Client Component
 *
 * Client-side wrapper for the Students list page.
 * Handles search, filtering, and stats display.
 */

'use client'

import { useState, useMemo } from 'react'
import { GraduationCap, Users, School, CheckCircle2, XCircle } from 'lucide-react'
import { StatCard, SearchFilterBar, FilterChip } from '@/components/admin/shared'
import { StudentsTable } from './StudentsTable'

interface StudentSchool {
  id: string
  name: string
  subscriptionTier: 'VIP' | 'REGULAR'
}

interface StudentProfile {
  id: string
  totalIBPoints: number | null
  coursesCount: number
  savedProgramsCount: number
  school: StudentSchool | null
}

interface Student {
  id: string
  email: string
  name: string | null
  image: string | null
  createdAt: string
  hasProfile: boolean
  profile: StudentProfile | null
}

interface StudentsListClientProps {
  students: Student[]
  stats: {
    total: number
    withProfile: number
    withoutProfile: number
    withSchool: number
  }
}

export function StudentsListClient({ students, stats }: StudentsListClientProps) {
  const [search, setSearch] = useState('')
  const [profileFilter, setProfileFilter] = useState<string | null>(null)

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        const matchesEmail = student.email.toLowerCase().includes(searchLower)
        const matchesName = student.name?.toLowerCase().includes(searchLower)
        const matchesSchool = student.profile?.school?.name.toLowerCase().includes(searchLower)
        if (!matchesEmail && !matchesName && !matchesSchool) return false
      }

      // Profile filter
      if (profileFilter === 'with_profile' && !student.hasProfile) return false
      if (profileFilter === 'without_profile' && student.hasProfile) return false
      if (profileFilter === 'with_school' && !student.profile?.school) return false

      return true
    })
  }, [students, search, profileFilter])

  const hasActiveFilters = !!profileFilter
  const activeFilterCount = profileFilter ? 1 : 0

  const handleClearAll = () => {
    setSearch('')
    setProfileFilter(null)
  }

  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Students" value={stats.total} icon={Users} variant="horizontal" />
        <StatCard
          title="With Profile"
          value={stats.withProfile}
          icon={CheckCircle2}
          variant="horizontal"
          iconColor="green"
        />
        <StatCard
          title="Without Profile"
          value={stats.withoutProfile}
          icon={XCircle}
          variant="horizontal"
          iconColor="amber"
        />
        <StatCard
          title="With School"
          value={stats.withSchool}
          icon={School}
          variant="horizontal"
          iconColor="blue"
        />
      </div>

      {/* Search and Filter Bar */}
      <SearchFilterBar
        placeholder="Search students by name, email, or school..."
        searchValue={search}
        onSearchChange={setSearch}
        hasActiveFilters={hasActiveFilters}
        activeFilterCount={activeFilterCount}
        onClearAll={handleClearAll}
      >
        <FilterChip
          label="All Students"
          isActive={!profileFilter}
          onClick={() => setProfileFilter(null)}
        />
        <FilterChip
          label="With Profile"
          icon={CheckCircle2}
          isActive={profileFilter === 'with_profile'}
          onClick={() => setProfileFilter('with_profile')}
          variant="success"
        />
        <FilterChip
          label="Without Profile"
          icon={XCircle}
          isActive={profileFilter === 'without_profile'}
          onClick={() => setProfileFilter('without_profile')}
          variant="warning"
        />
        <FilterChip
          label="With School"
          icon={School}
          isActive={profileFilter === 'with_school'}
          onClick={() => setProfileFilter('with_school')}
        />
      </SearchFilterBar>

      {/* Results */}
      {filteredStudents.length === 0 ? (
        search || hasActiveFilters ? (
          <div className="rounded-xl border bg-card p-12 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
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
            <h3 className="text-lg font-medium text-foreground mb-2">No students yet</h3>
            <p className="text-muted-foreground">Students will appear here once they sign up.</p>
          </div>
        )
      ) : (
        <>
          <div className="text-sm text-muted-foreground mb-4">
            Showing {filteredStudents.length} of {students.length} students
          </div>
          <StudentsTable students={filteredStudents} />
        </>
      )}
    </>
  )
}
