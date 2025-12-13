/**
 * Students Client Component
 *
 * Client-side component for the students list.
 * Handles search filtering and data table display.
 */

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { DataTable, SearchFilterBar, type Column } from '@/components/admin/shared'
import { getAvatarColor } from '@/lib/avatar-utils'
import { Eye, Edit, LineChart, CheckCircle2, AlertCircle } from 'lucide-react'

interface Student {
  id: string
  userId: string
  name: string
  email: string
  image: string | null
  totalIBPoints: number | null
  coursesCount: number
  createdAt: string
  hasConsent: boolean
}

interface StudentsClientProps {
  students: Student[]
  hasFullAccess: boolean
  canEditStudents: boolean
}

export function StudentsClient({ students, hasFullAccess, canEditStudents }: StudentsClientProps) {
  const [searchValue, setSearchValue] = useState('')

  // Filter students by search query
  const filteredStudents = useMemo(() => {
    if (!searchValue.trim()) return students

    const query = searchValue.toLowerCase()
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query)
    )
  }, [students, searchValue])

  // Define table columns
  const columns: Column<Student>[] = [
    {
      key: 'student',
      header: 'Student',
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
      header: 'IB Points',
      align: 'center',
      width: 'w-24',
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
            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
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

  return (
    <div>
      {/* Search bar */}
      <SearchFilterBar
        placeholder="Search students by name or email..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      {/* Results info */}
      {searchValue && (
        <p className="text-sm text-muted-foreground mb-4">
          {filteredStudents.length} result{filteredStudents.length !== 1 ? 's' : ''} for &quot;
          {searchValue}&quot;
        </p>
      )}

      {/* Data table */}
      {filteredStudents.length > 0 ? (
        <DataTable columns={columns} data={filteredStudents} getRowKey={(student) => student.id} />
      ) : (
        <div className="rounded-xl border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            No students found matching &quot;{searchValue}&quot;
          </p>
        </div>
      )}
    </div>
  )
}
