/**
 * Coordinator Status Badge Component
 *
 * Displays status badge for coordinators/invitations.
 * Uses Lucide icons per icons-reference.md.
 */

import { CheckCircle2, Clock, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CoordinatorStatusBadgeProps {
  status: 'ACTIVE' | 'PENDING' | 'REVOKED' | 'EXPIRED'
  className?: string
}

export function CoordinatorStatusBadge({ status, className }: CoordinatorStatusBadgeProps) {
  const config = {
    ACTIVE: {
      label: 'Active',
      icon: CheckCircle2,
      className: 'bg-green-100 text-green-700'
    },
    PENDING: {
      label: 'Pending',
      icon: Clock,
      className: 'bg-amber-100 text-amber-700'
    },
    REVOKED: {
      label: 'Revoked',
      icon: XCircle,
      className: 'bg-red-100 text-red-700'
    },
    EXPIRED: {
      label: 'Expired',
      icon: XCircle,
      className: 'bg-gray-100 text-gray-600'
    }
  }

  const { label, icon: Icon, className: badgeClass } = config[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full',
        badgeClass,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  )
}
