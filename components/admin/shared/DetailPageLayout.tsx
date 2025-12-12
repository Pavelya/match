/**
 * DetailPageLayout Component
 *
 * Standard layout for admin detail pages.
 * Provides consistent structure across School, University, Coordinator,
 * and Program detail pages.
 *
 * Layout:
 * - Full-width header with back navigation, title, badges, and actions
 * - Two-column responsive grid (2/3 + 1/3 on desktop, stacked on mobile)
 *
 * Uses Lucide icons per icons-reference.md.
 */

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface DetailPageLayoutProps {
  /** Main content for the left column (2/3 width on desktop) */
  children: ReactNode
  /** Sidebar content for the right column (1/3 width on desktop) */
  sidebar?: ReactNode
  /** Optional full-width section below the two columns */
  footer?: ReactNode
  /** Additional CSS classes for the container */
  className?: string
}

export function DetailPageLayout({ children, sidebar, footer, className }: DetailPageLayoutProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Two-column layout */}
      {sidebar ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content - 2/3 */}
          <div className="lg:col-span-2 space-y-6">{children}</div>
          {/* Sidebar - 1/3 */}
          <div className="space-y-6">{sidebar}</div>
        </div>
      ) : (
        // Full-width when no sidebar
        <div className="space-y-6">{children}</div>
      )}

      {/* Optional full-width footer section */}
      {footer && <div className="space-y-6">{footer}</div>}
    </div>
  )
}

/**
 * DetailSection Component
 *
 * A container for grouping related cards within a detail page.
 * Provides consistent spacing between cards.
 */
export interface DetailSectionProps {
  /** Section title (optional) */
  title?: string
  /** Section content */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

export function DetailSection({ title, children, className }: DetailSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {title && <h2 className="text-lg font-semibold text-foreground">{title}</h2>}
      {children}
    </div>
  )
}

/**
 * QuickStat Component
 *
 * A compact stat display for sidebars on detail pages.
 */
export interface QuickStatProps {
  /** Label text */
  label: string
  /** Value to display */
  value: string | number
  /** Optional icon */
  icon?: React.ReactNode
}

export function QuickStat({ label, value, icon }: QuickStatProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}
