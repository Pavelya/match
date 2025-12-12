/**
 * Schools Table Component
 *
 * Client component wrapper for the Schools DataTable.
 * Handles rendering of school data with proper Actions column.
 */

'use client'

import Link from 'next/link'
import { Crown, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DataTable, type Column } from '@/components/admin/shared'
import { SchoolDeleteButton } from './SchoolDeleteButton'

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

interface SchoolsTableProps {
  schools: School[]
}

export function SchoolsTable({ schools }: SchoolsTableProps) {
  const columns: Column<School>[] = [
    {
      key: 'name',
      header: 'School',
      render: (school) => (
        <Link
          href={`/admin/schools/${school.id}`}
          className="font-medium text-foreground hover:text-primary transition-colors"
        >
          {school.name}
        </Link>
      )
    },
    {
      key: 'location',
      header: 'Location',
      render: (school) => (
        <span className="text-sm text-muted-foreground">
          <span className="mr-1">{school.country.flagEmoji}</span>
          {school.city}, {school.country.name}
        </span>
      )
    },
    {
      key: 'tier',
      header: 'Tier',
      render: (school) => (
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full',
            school.subscriptionTier === 'VIP'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-muted text-muted-foreground'
          )}
        >
          {school.subscriptionTier === 'VIP' && <Crown className="h-3 w-3" />}
          {school.subscriptionTier}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (school) => (
        <span
          className={cn(
            'inline-flex px-2 py-1 text-xs font-medium rounded-full',
            school.subscriptionStatus === 'ACTIVE'
              ? 'bg-green-100 text-green-700'
              : school.subscriptionStatus === 'INACTIVE'
                ? 'bg-gray-100 text-gray-600'
                : 'bg-red-100 text-red-700'
          )}
        >
          {school.subscriptionStatus}
        </span>
      )
    },
    {
      key: 'members',
      header: 'Members',
      render: (school) => (
        <span className="text-sm text-muted-foreground">
          {school._count.coordinators} coordinator{school._count.coordinators !== 1 ? 's' : ''},{' '}
          {school._count.students} student{school._count.students !== 1 ? 's' : ''}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (school) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/schools/${school.id}/edit`}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <SchoolDeleteButton
            schoolId={school.id}
            schoolName={school.name}
            hasCoordinators={school._count.coordinators > 0}
            hasStudents={school._count.students > 0}
          />
        </div>
      )
    }
  ]

  return <DataTable columns={columns} data={schools} getRowKey={(school) => school.id} />
}
