/**
 * Coordinator Table Component
 *
 * Client component displaying coordinators in a table format.
 * Shows both active coordinators and pending invitations.
 *
 * Uses Lucide icons per icons-reference.md.
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { GraduationCap, Crown, Users, ExternalLink, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CoordinatorStatusBadge } from './CoordinatorStatusBadge'

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

interface CoordinatorTableProps {
  coordinators: Coordinator[]
}

export function CoordinatorTable({ coordinators }: CoordinatorTableProps) {
  if (coordinators.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center">
        <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No coordinators yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Invite coordinators from individual school pages.
        </p>
        <Link href="/admin/schools" className="text-sm font-medium text-primary hover:underline">
          Go to Schools →
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/30">
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Coordinator
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              School
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {coordinators.map((coordinator) => (
            <tr key={coordinator.id} className="hover:bg-muted/20 transition-colors">
              {/* Coordinator Info */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  {coordinator.image ? (
                    <Image
                      src={coordinator.image}
                      alt={coordinator.name || 'Coordinator'}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Mail className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-foreground">
                      {coordinator.name || 'Pending Invitation'}
                    </div>
                    <div className="text-sm text-muted-foreground">{coordinator.email}</div>
                  </div>
                </div>
              </td>

              {/* School */}
              <td className="px-4 py-4">
                {coordinator.school ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground">{coordinator.school.name}</span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium rounded',
                        coordinator.school.subscriptionTier === 'VIP'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {coordinator.school.subscriptionTier === 'VIP' ? (
                        <Crown className="h-3 w-3" />
                      ) : (
                        <Users className="h-3 w-3" />
                      )}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </td>

              {/* Status */}
              <td className="px-4 py-4">
                <CoordinatorStatusBadge status={coordinator.status} />
              </td>

              {/* Date */}
              <td className="px-4 py-4">
                <div className="text-sm text-foreground">
                  {coordinator.status === 'PENDING' ? (
                    <>
                      <div>Invited</div>
                      <div className="text-muted-foreground">
                        {new Date(coordinator.createdAt).toLocaleDateString('en-GB')}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>Joined</div>
                      <div className="text-muted-foreground">
                        {new Date(coordinator.joinedAt || coordinator.createdAt).toLocaleDateString(
                          'en-GB'
                        )}
                      </div>
                    </>
                  )}
                </div>
              </td>

              {/* Actions */}
              <td className="px-4 py-4 text-right">
                <Link
                  href={
                    coordinator.type === 'coordinator'
                      ? `/admin/coordinators/${coordinator.id}`
                      : `/admin/coordinators/invitation/${coordinator.id}`
                  }
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
