/**
 * PageHeader Component
 *
 * Unified header component for admin pages.
 * Provides consistent styling for page titles, descriptions, and action buttons.
 *
 * Features:
 * - Title with optional icon
 * - Description text
 * - Action buttons (primary and secondary variants)
 * - Back navigation link
 *
 * Uses Lucide icons per icons-reference.md.
 */

import Link from 'next/link'
import { ArrowLeft, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PageAction {
  /** Label text for the action button */
  label: string
  /** URL to navigate to */
  href: string
  /** Lucide icon component */
  icon?: LucideIcon
  /** Button variant: primary (filled) or secondary (outlined) */
  variant?: 'primary' | 'secondary'
}

export interface PageHeaderProps {
  /** Page title */
  title: string
  /** Optional description text below the title */
  description?: string
  /** Optional Lucide icon to display before the title */
  icon?: LucideIcon
  /** Back navigation link (displays arrow and text) */
  backHref?: string
  /** Custom back link text (defaults to "Back") */
  backLabel?: string
  /** Action buttons to display on the right */
  actions?: PageAction[]
  /** Additional CSS classes for the container */
  className?: string
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  backHref,
  backLabel = 'Back',
  actions = [],
  className
}: PageHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      {/* Back Link */}
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      )}

      {/* Title Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            {Icon && <Icon className="h-7 w-7 flex-shrink-0" />}
            <span className="truncate">{title}</span>
          </h1>
          {description && <p className="mt-1 text-muted-foreground">{description}</p>}
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex items-center gap-3 flex-shrink-0">
            {actions.map((action, index) => {
              const ActionIcon = action.icon
              const isPrimary =
                action.variant === 'primary' || (!action.variant && index === actions.length - 1)

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
                    isPrimary
                      ? 'text-primary-foreground bg-primary hover:bg-primary/90'
                      : 'border hover:bg-muted/50'
                  )}
                >
                  {ActionIcon && <ActionIcon className="h-4 w-4" />}
                  {action.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
