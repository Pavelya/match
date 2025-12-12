/**
 * Agents Table Component
 *
 * Displays agents in a consistent table format using the shared DataTable.
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { User, Landmark, Building, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DataTable, type Column } from '@/components/admin/shared'

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

interface AgentsTableProps {
  agents: Agent[]
}

const columns: Column<Agent>[] = [
  {
    key: 'name',
    header: 'Agent',
    render: (agent) => (
      <div className="flex items-center gap-3">
        {agent.image ? (
          <Image
            src={agent.image}
            alt={agent.name || 'Agent'}
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
          <div className="font-medium text-foreground">{agent.name || 'Unnamed Agent'}</div>
          <div className="text-xs text-muted-foreground">{agent.email}</div>
        </div>
      </div>
    )
  },
  {
    key: 'university',
    header: 'University',
    render: (agent) => (
      <Link href={`/admin/universities/${agent.university.id}`} className="group">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg',
              agent.university.classification === 'PUBLIC' ? 'bg-blue-100' : 'bg-purple-100'
            )}
          >
            {agent.university.classification === 'PUBLIC' ? (
              <Landmark className="h-4 w-4 text-blue-600" />
            ) : (
              <Building className="h-4 w-4 text-purple-600" />
            )}
          </div>
          <div>
            <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {agent.university.abbreviatedName || agent.university.name}
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <span>{agent.university.country.flagEmoji}</span>
              {agent.university.city}
            </div>
          </div>
        </div>
      </Link>
    )
  },
  {
    key: 'classification',
    header: 'Type',
    render: (agent) => (
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full',
          agent.university.classification === 'PUBLIC'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-purple-100 text-purple-700'
        )}
      >
        {agent.university.classification}
      </span>
    )
  },
  {
    key: 'createdAt',
    header: 'Joined',
    render: (agent) => (
      <span className="text-sm text-muted-foreground">
        {new Date(agent.userCreatedAt).toLocaleDateString('en-GB', {
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
    align: 'right',
    render: (agent) => (
      <Link
        href={`/admin/universities/${agent.university.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
      >
        View University
        <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    )
  }
]

export function AgentsTable({ agents }: AgentsTableProps) {
  return <DataTable columns={columns} data={agents} getRowKey={(agent) => agent.id} />
}
