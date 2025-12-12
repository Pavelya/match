/**
 * StatCard Component
 *
 * Unified KPI/stat card for dashboard and list pages.
 * Designed for reuse across Admin, Coordinator, and Agent dashboards.
 *
 * Supports two visual variants:
 * - 'compact': Icon top-right, smaller footprint (dashboard style)
 * - 'horizontal': Icon in circle on left, value on right (filter style)
 *
 * Features:
 * - Clickable with optional href
 * - Active state for filter-style cards
 * - Custom icon background colors
 * - Trend indicators (optional)
 * - Locked state for tiered access (VIP vs Regular)
 *
 * Uses Lucide icons per icons-reference.md.
 */

import Link from 'next/link'
import { Lock, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StatCardProps {
  /** Display label for the stat */
  title: string
  /** Numeric value to display */
  value: number
  /** Lucide icon component */
  icon: LucideIcon
  /** Optional link URL - makes the entire card clickable */
  href?: string
  /** Visual variant: 'compact' for dashboard, 'horizontal' for filters */
  variant?: 'compact' | 'horizontal'
  /** Whether this card is currently active/selected (for filter cards) */
  isActive?: boolean
  /**
   * Icon background color preset or custom Tailwind classes
   * Presets: 'default', 'green', 'amber', 'red', 'blue', 'purple'
   */
  iconColor?: 'default' | 'green' | 'amber' | 'red' | 'blue' | 'purple' | string
  /** Optional trend indicator (e.g., "+5" or "-2") */
  trend?: {
    value: number
    label?: string
  }
  /**
   * Whether the stat is locked (for VIP/Regular tier access control)
   * When true, shows a lock overlay and optional upgrade message
   */
  locked?: boolean
  /** Message to show when locked (e.g., "Upgrade to VIP") */
  lockedMessage?: string
  /** Additional CSS classes */
  className?: string
}

const iconColorPresets: Record<string, { bg: string; text: string }> = {
  default: { bg: 'bg-muted', text: 'text-muted-foreground' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
  red: { bg: 'bg-red-100', text: 'text-red-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' }
}

export function StatCard({
  title,
  value,
  icon: Icon,
  href,
  variant = 'compact',
  isActive = false,
  iconColor = 'default',
  trend,
  locked = false,
  lockedMessage,
  className
}: StatCardProps) {
  // Resolve icon colors
  const iconColors = iconColorPresets[iconColor] || { bg: iconColor, text: 'text-current' }

  const content =
    variant === 'horizontal' ? (
      // Horizontal variant (filter-style)
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0',
            iconColors.bg
          )}
        >
          <Icon className={cn('h-5 w-5', iconColors.text)} />
        </div>
        <div className="min-w-0">
          <div className="text-2xl font-bold text-foreground">{value.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground truncate">{title}</div>
        </div>
        {trend && (
          <div
            className={cn(
              'ml-auto text-xs font-medium',
              trend.value >= 0 ? 'text-green-600' : 'text-red-600'
            )}
          >
            {trend.value >= 0 ? '+' : ''}
            {trend.value}
            {trend.label && <span className="text-muted-foreground ml-1">{trend.label}</span>}
          </div>
        )}
      </div>
    ) : (
      // Compact variant (dashboard-style)
      <>
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-foreground">{value.toLocaleString()}</p>
          {trend && (
            <span
              className={cn(
                'text-xs font-medium',
                trend.value >= 0 ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.value >= 0 ? '+' : ''}
              {trend.value}
              {trend.label && <span className="text-muted-foreground ml-1">{trend.label}</span>}
            </span>
          )}
        </div>
        {href && <p className="text-xs text-primary mt-1">View all</p>}
      </>
    )

  const cardClasses = cn(
    'rounded-xl border p-4 transition-all',
    variant === 'horizontal'
      ? isActive
        ? 'bg-primary/5 border-primary'
        : 'bg-card hover:bg-muted/50'
      : 'bg-card hover:shadow-md',
    className
  )

  // Locked overlay for tier-based access
  if (locked) {
    return (
      <div className={cn(cardClasses, 'relative overflow-hidden')}>
        <div className="opacity-40 pointer-events-none">{content}</div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-[1px]">
          <Lock className="h-5 w-5 text-muted-foreground mb-1" />
          {lockedMessage && (
            <span className="text-xs text-muted-foreground text-center px-2">{lockedMessage}</span>
          )}
        </div>
      </div>
    )
  }

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {content}
      </Link>
    )
  }

  return <div className={cardClasses}>{content}</div>
}
