/**
 * PageLoader Component
 *
 * Unified loading component for consistent loading states across the app.
 * Provides multiple variants for different page layouts.
 *
 * @example
 * ```tsx
 * // Spinner variant (default) - centered spinner with message
 * <PageLoader message="Finding your best matches..." />
 *
 * // Skeleton cards variant - for program lists
 * <PageLoader variant="skeleton-cards" count={6} />
 *
 * // Skeleton table variant - for admin tables
 * <PageLoader variant="skeleton-table" />
 *
 * // Skeleton form variant - for form pages
 * <PageLoader variant="skeleton-form" />
 * ```
 */

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export type PageLoaderVariant =
  | 'spinner'
  | 'skeleton-cards'
  | 'skeleton-table'
  | 'skeleton-form'
  | 'skeleton-dashboard'

export interface PageLoaderProps {
  /** Loading variant */
  variant?: PageLoaderVariant
  /** Optional message to display (for spinner variant) */
  message?: string
  /** Number of skeleton items to show */
  count?: number
  /** Whether to fill the full screen height */
  fullScreen?: boolean
  /**
   * Inline mode - skips container layout (max-width, padding).
   * Use when rendering inside an existing PageContainer.
   */
  inline?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Skeleton animation for loading elements.
 * Uses pulse animation with muted background.
 */
function SkeletonBox({ className }: { className?: string }) {
  return <div className={cn('rounded bg-muted animate-pulse', className)} />
}

/**
 * Card skeleton - matches ProgramCard layout
 */
function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-4">
      {/* Header with image and title */}
      <div className="flex gap-4">
        <SkeletonBox className="h-16 w-16 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonBox className="h-5 w-3/4" />
          <SkeletonBox className="h-4 w-1/2" />
          <SkeletonBox className="h-3 w-1/3" />
        </div>
      </div>
      {/* Content area */}
      <div className="flex gap-2">
        <SkeletonBox className="h-6 w-20 rounded-full" />
        <SkeletonBox className="h-6 w-24 rounded-full" />
        <SkeletonBox className="h-6 w-16 rounded-full" />
      </div>
      {/* Progress bar area */}
      <div className="space-y-2">
        <SkeletonBox className="h-3 w-full" />
        <SkeletonBox className="h-2 w-full rounded-full" />
      </div>
    </div>
  )
}

/**
 * Table row skeleton
 */
function SkeletonTableRow({ columns = 5 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          {i === 0 ? (
            <div className="flex items-center gap-3">
              <SkeletonBox className="h-9 w-9 rounded-full" />
              <div className="space-y-1">
                <SkeletonBox className="h-4 w-24" />
                <SkeletonBox className="h-3 w-32" />
              </div>
            </div>
          ) : i === columns - 1 ? (
            <SkeletonBox className="h-4 w-12 ml-auto" />
          ) : (
            <SkeletonBox className="h-4 w-20" />
          )}
        </td>
      ))}
    </tr>
  )
}

/**
 * Form field skeleton
 */
function SkeletonFormField() {
  return (
    <div className="space-y-2">
      <SkeletonBox className="h-4 w-24" />
      <SkeletonBox className="h-10 w-full rounded-lg" />
    </div>
  )
}

/**
 * Stat card skeleton (horizontal variant)
 */
function SkeletonStatCard() {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
      <SkeletonBox className="h-10 w-10 rounded-lg" />
      <div className="flex-1 space-y-1">
        <SkeletonBox className="h-3 w-16" />
        <SkeletonBox className="h-5 w-10" />
      </div>
    </div>
  )
}

export function PageLoader({
  variant = 'spinner',
  message,
  count = 6,
  fullScreen = true,
  inline = false,
  className
}: PageLoaderProps) {
  const containerClasses = cn(
    'flex items-center justify-center',
    fullScreen && 'min-h-screen',
    !fullScreen && 'min-h-[400px]',
    className
  )

  // Spinner variant - simple centered spinner
  if (variant === 'spinner') {
    return (
      <div className={containerClasses}>
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          {message && <p className="text-muted-foreground text-sm">{message}</p>}
        </div>
      </div>
    )
  }

  // Skeleton cards variant - for program/card lists
  if (variant === 'skeleton-cards') {
    // Inline mode - just the cards, no container
    if (inline) {
      return (
        <div className={cn('space-y-4', className)}>
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )
    }

    // Full page mode - with container layout matching PageContainer
    return (
      <div className={cn(fullScreen && 'min-h-screen bg-background', className)}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Header skeleton */}
          <div className="mb-6 sm:mb-8 space-y-2">
            <SkeletonBox className="h-8 w-64" />
            <SkeletonBox className="h-4 w-80 max-w-full" />
          </div>
          {/* Cards */}
          <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Skeleton table variant - for admin list pages
  if (variant === 'skeleton-table') {
    return (
      <div className={cn('p-6', className)}>
        {/* Header skeleton */}
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-2">
            <SkeletonBox className="h-8 w-48" />
            <SkeletonBox className="h-4 w-64" />
          </div>
          <SkeletonBox className="h-10 w-32 rounded-lg" />
        </div>
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
        {/* Search bar */}
        <div className="flex gap-3 mb-6">
          <SkeletonBox className="flex-1 h-12 rounded-xl" />
          <SkeletonBox className="w-12 h-12 rounded-xl" />
        </div>
        {/* Table */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {Array.from({ length: 5 }).map((_, i) => (
                  <th key={i} className="px-4 py-3">
                    <SkeletonBox className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {Array.from({ length: count }).map((_, i) => (
                <SkeletonTableRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Skeleton form variant - for form/edit pages
  if (variant === 'skeleton-form') {
    return (
      <div className={cn('p-6 max-w-2xl mx-auto', className)}>
        {/* Header */}
        <div className="mb-8 space-y-2">
          <SkeletonBox className="h-8 w-48" />
          <SkeletonBox className="h-4 w-64" />
        </div>
        {/* Form fields */}
        <div className="space-y-6">
          <SkeletonFormField />
          <SkeletonFormField />
          <div className="grid grid-cols-2 gap-4">
            <SkeletonFormField />
            <SkeletonFormField />
          </div>
          <SkeletonFormField />
          {/* Textarea */}
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-32 w-full rounded-lg" />
          </div>
          {/* Submit button */}
          <div className="flex justify-end gap-3 pt-4">
            <SkeletonBox className="h-10 w-24 rounded-lg" />
            <SkeletonBox className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  // Skeleton dashboard variant - for dashboard pages
  if (variant === 'skeleton-dashboard') {
    return (
      <div className={cn('p-6', className)}>
        {/* Header */}
        <div className="mb-8 space-y-2">
          <SkeletonBox className="h-8 w-64" />
          <SkeletonBox className="h-4 w-96" />
        </div>
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Chart placeholder */}
          <div className="rounded-xl border bg-card p-6">
            <SkeletonBox className="h-5 w-32 mb-4" />
            <SkeletonBox className="h-48 w-full rounded-lg" />
          </div>
          {/* List placeholder */}
          <div className="rounded-xl border bg-card p-6">
            <SkeletonBox className="h-5 w-32 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <SkeletonBox className="h-8 w-8 rounded-full" />
                  <SkeletonBox className="h-4 flex-1" />
                  <SkeletonBox className="h-4 w-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Fallback to spinner
  return (
    <div className={containerClasses}>
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        {message && <p className="text-muted-foreground text-sm">{message}</p>}
      </div>
    </div>
  )
}

/**
 * Inline loader for smaller loading states within components
 */
export function InlineLoader({ message, className }: { message?: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 text-muted-foreground', className)}>
      <Loader2 className="h-4 w-4 animate-spin" />
      {message && <span className="text-sm">{message}</span>}
    </div>
  )
}
