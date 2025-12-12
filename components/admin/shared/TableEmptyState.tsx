/**
 * TableEmptyState Component
 *
 * Empty state placeholder for tables when no data is present.
 * Provides consistent styling for empty table states.
 *
 * Uses Lucide icons per icons-reference.md.
 */

import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TableEmptyStateProps {
  /** Lucide icon to display */
  icon: LucideIcon
  /** Main title text */
  title: string
  /** Description text */
  description: string
  /** Optional action button */
  action?: {
    label: string
    href: string
  }
  /** Additional CSS classes */
  className?: string
}

export function TableEmptyState({
  icon: Icon,
  title,
  description,
  action,
  className
}: TableEmptyStateProps) {
  return (
    <div className={cn('rounded-xl border bg-card p-12 text-center', className)}>
      <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}
