/**
 * Students Table Component
 *
 * Displays students in a consistent table format using the shared DataTable.
 * Includes delete action with confirmation dialog.
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { User, School, Crown, CheckCircle2, XCircle, ExternalLink, Trash2 } from 'lucide-react'
import { DataTable, type Column } from '@/components/admin/shared'
import { DeleteStudentDialog } from './DeleteStudentDialog'

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

interface StudentsTableProps {
  students: Student[]
}

const columns: Column<Student>[] = [
  {
    key: 'name',
    header: 'Student',
    render: (student) => (
      <div className="flex items-center gap-3">
        {student.image ? (
          <Image
            src={student.image}
            alt={student.name || 'Student'}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        <div>
          <div className="font-medium text-foreground">{student.name || 'Unnamed Student'}</div>
          <div className="text-xs text-muted-foreground">{student.email}</div>
        </div>
      </div>
    )
  },
  {
    key: 'school',
    header: 'School',
    render: (student) =>
      student.profile?.school ? (
        <Link
          href={`/admin/schools/${student.profile.school.id}`}
          className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
        >
          <School className="h-4 w-4 text-muted-foreground" />
          <span>{student.profile.school.name}</span>
          {student.profile.school.subscriptionTier === 'VIP' && (
            <Crown className="h-3 w-3 text-amber-500" />
          )}
        </Link>
      ) : (
        <span className="text-muted-foreground text-sm">Not linked</span>
      )
  },
  {
    key: 'profile',
    header: 'Profile',
    render: (student) => (
      <div className="flex items-center gap-2">
        {student.hasProfile ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span className="text-sm text-foreground">Complete</span>
          </>
        ) : (
          <>
            <XCircle className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-muted-foreground">Incomplete</span>
          </>
        )}
      </div>
    )
  },
  {
    key: 'stats',
    header: 'Activity',
    render: (student) =>
      student.profile ? (
        <div className="text-sm text-muted-foreground">
          <span>{student.profile.coursesCount} courses</span>
          <span className="mx-1">•</span>
          <span>{student.profile.savedProgramsCount} saved</span>
        </div>
      ) : (
        <span className="text-muted-foreground text-sm">—</span>
      )
  },
  {
    key: 'createdAt',
    header: 'Joined',
    render: (student) => (
      <span className="text-sm text-muted-foreground">
        {new Date(student.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })}
      </span>
    )
  },
  {
    key: 'actions',
    header: '',
    render: (student) => (
      <div className="flex items-center gap-2 justify-end">
        <Link
          href={`/admin/students/${student.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          View
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
        <DeleteStudentDialog
          studentId={student.id}
          studentName={student.name}
          studentEmail={student.email}
          onDeleted={() => window.location.reload()}
          trigger={
            <button
              className="inline-flex items-center gap-1.5 text-sm text-destructive hover:underline"
              title="Delete student"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          }
        />
      </div>
    )
  }
]

export function StudentsTable({ students }: StudentsTableProps) {
  return <DataTable columns={columns} data={students} getRowKey={(student) => student.id} />
}
