/**
 * StatCardSkeleton Component
 *
 * Loading skeleton for StatCard components.
 * Shows animated placeholder while data is loading.
 */

import { cn } from '@/lib/utils'

export interface StatCardSkeletonProps {
  /** Layout variant */
  variant?: 'default' | 'horizontal'
  /** Additional CSS classes */
  className?: string
}

export function StatCardSkeleton({ variant = 'default', className }: StatCardSkeletonProps) {
  if (variant === 'horizontal') {
    return (
      <div className={cn('flex items-center gap-3 rounded-xl border bg-card p-4', className)}>
        {/* Icon skeleton */}
        <div className="h-10 w-10 rounded-lg bg-muted animate-shimmer" />
        <div className="flex-1 space-y-2">
          {/* Title skeleton */}
          <div className="h-3 w-16 rounded bg-muted animate-shimmer" />
          {/* Value skeleton */}
          <div className="h-5 w-10 rounded bg-muted animate-shimmer" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('rounded-xl border bg-card p-5', className)}>
      <div className="flex items-start justify-between mb-3">
        {/* Title skeleton */}
        <div className="h-4 w-24 rounded bg-muted animate-shimmer" />
        {/* Icon skeleton */}
        <div className="h-10 w-10 rounded-lg bg-muted animate-shimmer" />
      </div>
      {/* Value skeleton */}
      <div className="h-8 w-16 rounded bg-muted animate-shimmer" />
    </div>
  )
}

/**
 * StatCardSkeletonRow Component
 *
 * A row of StatCard skeletons for list page headers.
 */
export interface StatCardSkeletonRowProps {
  /** Number of cards to show */
  count?: number
  /** Layout variant */
  variant?: 'default' | 'horizontal'
  /** Additional CSS classes */
  className?: string
}

export function StatCardSkeletonRow({
  count = 4,
  variant = 'horizontal',
  className
}: StatCardSkeletonRowProps) {
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-4 gap-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <StatCardSkeleton key={index} variant={variant} />
      ))}
    </div>
  )
}
