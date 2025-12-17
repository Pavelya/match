/**
 * TableSkeleton Component
 *
 * Loading skeleton for DataTable components.
 * Shows animated placeholder while data is loading.
 */

import { cn } from '@/lib/utils'

export interface TableSkeletonProps {
  /** Number of rows to show */
  rows?: number
  /** Number of columns to show */
  columns?: number
  /** Whether to show the header row */
  showHeader?: boolean
  /** Additional CSS classes */
  className?: string
}

// Deterministic widths for skeleton elements to avoid Math.random()
const headerWidths = ['70%', '80%', '60%', '75%', '65%', '85%', '70%', '80%']
const cellWidths = ['75%', '60%', '80%', '70%', '65%', '85%', '55%', '75%']

export function TableSkeleton({
  rows = 5,
  columns = 5,
  showHeader = true,
  className
}: TableSkeletonProps) {
  return (
    <div className={cn('rounded-xl border bg-card overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          {showHeader && (
            <thead className="bg-muted/50">
              <tr>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <th key={colIndex} className="px-4 py-3">
                    <div
                      className="h-4 rounded bg-muted animate-shimmer"
                      style={{ width: headerWidths[colIndex % headerWidths.length] }}
                    />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-3">
                    {colIndex === 0 ? (
                      // First column often has avatar + text
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-muted animate-shimmer" />
                        <div className="space-y-2">
                          <div className="h-4 w-24 rounded bg-muted animate-shimmer" />
                          <div className="h-3 w-32 rounded bg-muted animate-shimmer" />
                        </div>
                      </div>
                    ) : colIndex === columns - 1 ? (
                      // Last column often has action
                      <div className="h-4 w-12 rounded bg-muted animate-shimmer ml-auto" />
                    ) : (
                      // Middle columns - use deterministic widths based on position
                      <div
                        className="h-4 rounded bg-muted animate-shimmer"
                        style={{ width: cellWidths[(rowIndex + colIndex) % cellWidths.length] }}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * SearchBarSkeleton Component
 *
 * Loading skeleton for the search/filter bar.
 */
export function SearchBarSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('mb-6', className)}>
      {/* Search row with filter button */}
      <div className="flex gap-3">
        {/* Search input skeleton - full width */}
        <div className="flex-1 h-12 rounded-xl bg-muted animate-shimmer" />
        {/* Filter toggle button skeleton */}
        <div className="w-12 h-12 rounded-xl bg-muted animate-shimmer" />
      </div>
    </div>
  )
}
