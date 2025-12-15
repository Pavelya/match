/**
 * Students Client Component
 *
 * Client-side component for the coordinator students list.
 * Features:
 * - Stats row with clickable filter cards (Total, Consented, Pending)
 * - Search bar with filter chips (matching admin pattern)
 * - Export button aligned with search
 * - Sortable data table
 *
 * Follows the same pattern as admin/coordinators for consistency.
 */

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  DataTable,
  SearchFilterBar,
  FilterChip,
  StatCard,
  TableEmptyState,
  type Column
} from '@/components/admin/shared'
import { getAvatarColor } from '@/lib/avatar-utils'
import {
  Eye,
  Edit,
  LineChart,
  CheckCircle2,
  AlertCircle,
  Download,
  ArrowUpDown,
  Users,
  UserCheck,
  Clock
} from 'lucide-react'

interface Student {
  id: string
  userId: string
  name: string
  email: string
  image: string | null
  totalIBPoints: number | null
  coursesCount: number
  createdAt: string
  joinedDate: string
  hasConsent: boolean
  consentDate: string | null
}

interface StudentsClientProps {
  students: Student[]
  hasFullAccess: boolean
  canEditStudents: boolean
  canBulkExport?: boolean
}

type SortField = 'name' | 'ibPoints' | 'joinedDate'
type SortDirection = 'asc' | 'desc'
type ConsentFilter = 'all' | 'consented' | 'pending'

// Helper to format dates consistently (avoids hydration mismatch)
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${day}/${month}/${year}`
}

export function StudentsClient({
  students,
  hasFullAccess,
  canEditStudents,
  canBulkExport = false
}: StudentsClientProps) {
  const [searchValue, setSearchValue] = useState('')
  const [consentFilter, setConsentFilter] = useState<ConsentFilter>('all')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [isExporting, setIsExporting] = useState(false)

  // Calculate stats from ALL students (before filtering)
  const stats = useMemo(
    () => ({
      total: students.length,
      consented: students.filter((s) => s.hasConsent).length,
      pending: students.filter((s) => !s.hasConsent).length
    }),
    [students]
  )

  // Apply consent filter
  const consentFilteredStudents = useMemo(() => {
    if (consentFilter === 'all') return students
    if (consentFilter === 'consented') return students.filter((s) => s.hasConsent)
    return students.filter((s) => !s.hasConsent)
  }, [students, consentFilter])

  // Apply search filter and sort
  const filteredStudents = useMemo(() => {
    let result = [...consentFilteredStudents]

    // Search filter
    if (searchValue.trim()) {
      const query = searchValue.toLowerCase()
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query)
      )
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'ibPoints':
          // Handle null values - push them to the end
          if (a.totalIBPoints === null && b.totalIBPoints === null) comparison = 0
          else if (a.totalIBPoints === null) comparison = 1
          else if (b.totalIBPoints === null) comparison = -1
          else comparison = a.totalIBPoints - b.totalIBPoints
          break
        case 'joinedDate':
          comparison = new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime()
          break
      }

      return sortDirection === 'desc' ? -comparison : comparison
    })

    return result
  }, [consentFilteredStudents, searchValue, sortField, sortDirection])

  // Handle sort toggle
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Handle bulk export
  const handleExport = async () => {
    if (!canBulkExport) return

    setIsExporting(true)
    try {
      // Create CSV content
      const headers = ['Name', 'Email', 'IB Points', 'Courses', 'Consent Status', 'Joined Date']
      const rows = filteredStudents.map((student) => [
        student.name,
        student.email,
        student.totalIBPoints?.toString() || '',
        student.coursesCount.toString(),
        student.hasConsent ? 'Consented' : 'Pending',
        formatDate(student.joinedDate)
      ])

      const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `students-export-${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } finally {
      setIsExporting(false)
    }
  }

  const handleClearSearch = () => {
    setSearchValue('')
  }

  // Sort button component
  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
      <ArrowUpDown
        className={`h-3 w-3 ${sortField === field ? 'text-foreground' : 'opacity-50'}`}
      />
    </button>
  )

  // Define table columns
  const columns: Column<Student>[] = [
    {
      key: 'student',
      header: <SortButton field="name" label="Student" />,
      width: 'min-w-[250px]',
      render: (student) => (
        <div className="flex items-center gap-3">
          {student.image ? (
            <Image
              src={student.image}
              alt={student.name}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          ) : (
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-white text-sm font-medium"
              style={{ backgroundColor: getAvatarColor(student.email) }}
            >
              {student.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-foreground">{student.name}</p>
            <p className="text-xs text-muted-foreground">{student.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'ibPoints',
      header: <SortButton field="ibPoints" label="IB Points" />,
      align: 'center',
      width: 'w-28',
      render: (student) => (
        <span className="text-sm">
          {student.totalIBPoints !== null ? (
            <span className="font-medium">{student.totalIBPoints}</span>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </span>
      )
    },
    {
      key: 'courses',
      header: 'Courses',
      align: 'center',
      width: 'w-24',
      render: (student) => (
        <span className="text-sm">
          {student.coursesCount > 0 ? (
            student.coursesCount
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </span>
      )
    },
    {
      key: 'consent',
      header: 'Consent',
      align: 'center',
      width: 'w-28',
      render: (student) => (
        <div className="flex justify-center">
          {student.hasConsent ? (
            <span
              className="inline-flex items-center gap-1 text-xs font-medium text-green-600"
              title={
                student.consentDate
                  ? `Consented on ${formatDate(student.consentDate)}`
                  : 'Consented'
              }
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Consented
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
              <AlertCircle className="h-3.5 w-3.5" />
              Pending
            </span>
          )}
        </div>
      )
    },
    {
      key: 'joined',
      header: <SortButton field="joinedDate" label="Joined" />,
      align: 'center',
      width: 'w-28',
      render: (student) => (
        <span className="text-xs text-muted-foreground">{formatDate(student.joinedDate)}</span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      width: 'w-40',
      render: (student) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/coordinator/students/${student.id}`}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            title="View student"
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </Link>
          {canEditStudents && student.hasConsent && (
            <Link
              href={`/coordinator/students/${student.id}/edit`}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              title="Edit academic data"
            >
              <Edit className="h-3.5 w-3.5" />
              Edit
            </Link>
          )}
          {hasFullAccess && (
            <Link
              href={`/coordinator/students/${student.id}/matches`}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              title="View matches"
            >
              <LineChart className="h-3.5 w-3.5" />
              Matches
            </Link>
          )}
        </div>
      )
    }
  ]

  const hasActiveFilters = consentFilter !== 'all'
  const activeFilterCount = hasActiveFilters ? 1 : 0

  return (
    <>
      {/* Stats Row - Clickable filter cards like admin/coordinators */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total"
          value={stats.total}
          icon={Users}
          variant="horizontal"
          isActive={consentFilter === 'all'}
          onClick={() => setConsentFilter('all')}
        />
        <StatCard
          title="Consented"
          value={stats.consented}
          icon={UserCheck}
          variant="horizontal"
          isActive={consentFilter === 'consented'}
          iconColor="green"
          onClick={() => setConsentFilter('consented')}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          variant="horizontal"
          isActive={consentFilter === 'pending'}
          iconColor="amber"
          onClick={() => setConsentFilter('pending')}
        />
      </div>

      {/* Search Bar with Export Button aligned horizontally */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1">
          <SearchFilterBar
            placeholder="Search by name or email..."
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            hasActiveFilters={hasActiveFilters}
            activeFilterCount={activeFilterCount}
            onClearAll={() => {
              setSearchValue('')
              setConsentFilter('all')
            }}
            className="mb-0"
          >
            <FilterChip
              label="All"
              isActive={consentFilter === 'all'}
              onClick={() => setConsentFilter('all')}
            />
            <FilterChip
              label="Consented"
              icon={UserCheck}
              isActive={consentFilter === 'consented'}
              onClick={() => setConsentFilter('consented')}
              variant="success"
            />
            <FilterChip
              label="Pending"
              icon={Clock}
              isActive={consentFilter === 'pending'}
              onClick={() => setConsentFilter('pending')}
              variant="warning"
            />
          </SearchFilterBar>
        </div>

        {/* Export button aligned with search bar */}
        {canBulkExport && (
          <button
            onClick={handleExport}
            disabled={isExporting || filteredStudents.length === 0}
            className="inline-flex items-center gap-2 h-12 px-4 rounded-xl border bg-background text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            title="Export to CSV"
          >
            <Download className="h-4 w-4" />
            {isExporting ? 'Exporting...' : 'Export CSV'}
          </button>
        )}
      </div>

      {/* Results */}
      {filteredStudents.length === 0 ? (
        searchValue ? (
          <div className="rounded-xl border bg-card p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
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
            icon={Users}
            title={consentFilter === 'pending' ? 'No pending consents' : 'No students yet'}
            description={
              consentFilter === 'pending'
                ? 'All linked students have provided consent.'
                : 'Invite students to link their IB Match accounts to your school.'
            }
            action={{ label: 'Invite Student', href: '/coordinator/students/invite' }}
          />
        )
      ) : (
        <>
          <div className="text-sm text-muted-foreground mb-4">
            Showing {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
            {searchValue && ` matching "${searchValue}"`}
            {consentFilter !== 'all' && (
              <span> • {consentFilter === 'consented' ? 'Consented' : 'Pending consent'} only</span>
            )}
          </div>
          <DataTable
            columns={columns}
            data={filteredStudents}
            getRowKey={(student) => student.id}
          />
        </>
      )}
    </>
  )
}
