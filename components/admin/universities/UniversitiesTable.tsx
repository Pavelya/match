/**
 * Universities Table Component
 *
 * Client component wrapper for the Universities DataTable.
 * Handles rendering of university data with proper Actions column.
 */

'use client'

import Link from 'next/link'
import { Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DataTable, type Column } from '@/components/admin/shared'
import { UniversityDeleteButton } from './UniversityDeleteButton'

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

interface UniversitiesTableProps {
  universities: University[]
}

export function UniversitiesTable({ universities }: UniversitiesTableProps) {
  const columns: Column<University>[] = [
    {
      key: 'name',
      header: 'University',
      render: (university) => (
        <div>
          <Link
            href={`/admin/universities/${university.id}`}
            className="font-medium text-foreground hover:text-primary transition-colors"
          >
            {university.name}
          </Link>
          {university.abbreviatedName && (
            <span className="text-muted-foreground text-sm ml-2">
              ({university.abbreviatedName})
            </span>
          )}
        </div>
      )
    },
    {
      key: 'location',
      header: 'Location',
      render: (university) => (
        <span className="text-sm text-muted-foreground">
          <span className="mr-1">{university.country.flagEmoji}</span>
          {university.city}, {university.country.name}
        </span>
      )
    },
    {
      key: 'type',
      header: 'Type',
      render: (university) => (
        <span
          className={cn(
            'inline-flex px-2 py-1 text-xs font-medium rounded-full',
            university.classification === 'PUBLIC'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-purple-100 text-purple-700'
          )}
        >
          {university.classification}
        </span>
      )
    },
    {
      key: 'programs',
      header: 'Programs',
      render: (university) => (
        <span className="text-sm text-muted-foreground">
          {university._count.programs} program{university._count.programs !== 1 ? 's' : ''}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (university) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/universities/${university.id}/edit`}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <UniversityDeleteButton
            universityId={university.id}
            universityName={university.name}
            hasPrograms={university._count.programs > 0}
            hasAgents={university._count.agents > 0}
          />
        </div>
      )
    }
  ]

  return (
    <DataTable columns={columns} data={universities} getRowKey={(university) => university.id} />
  )
}
