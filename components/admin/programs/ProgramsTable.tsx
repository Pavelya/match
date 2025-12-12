/**
 * Programs Table Component
 *
 * Client component wrapper for the Programs DataTable.
 * Handles rendering of program data with proper Actions column.
 */

'use client'

import Link from 'next/link'
import { Pencil, Building2, GraduationCap } from 'lucide-react'
import { DataTable, type Column } from '@/components/admin/shared'
import { ProgramDeleteButton } from './ProgramDeleteButton'

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

interface ProgramsTableProps {
  programs: Program[]
}

export function ProgramsTable({ programs }: ProgramsTableProps) {
  const columns: Column<Program>[] = [
    {
      key: 'name',
      header: 'Program',
      render: (program) => (
        <div>
          <Link
            href={`/admin/programs/${program.id}`}
            className="font-medium text-foreground hover:text-primary transition-colors"
          >
            {program.name}
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5">{program.duration}</p>
        </div>
      )
    },
    {
      key: 'university',
      header: 'University',
      render: (program) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="text-sm text-foreground">{program.university.name}</p>
            <p className="text-xs text-muted-foreground">
              {program.university.country.flagEmoji} {program.university.city}
            </p>
          </div>
        </div>
      )
    },
    {
      key: 'field',
      header: 'Field of Study',
      render: (program) => (
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-sm text-muted-foreground">{program.fieldOfStudy.name}</span>
        </div>
      )
    },
    {
      key: 'degree',
      header: 'Degree',
      render: (program) => (
        <span className="inline-flex px-2 py-1 text-xs font-medium bg-muted rounded-full">
          {program.degreeType}
        </span>
      )
    },
    {
      key: 'minPoints',
      header: 'Min IB Points',
      render: (program) =>
        program.minIBPoints ? (
          <span className="font-medium text-foreground">{program.minIBPoints}</span>
        ) : (
          <span className="text-muted-foreground/60">—</span>
        )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (program) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/programs/${program.id}/edit`}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <ProgramDeleteButton programId={program.id} programName={program.name} />
        </div>
      )
    }
  ]

  return <DataTable columns={columns} data={programs} getRowKey={(program) => program.id} />
}
