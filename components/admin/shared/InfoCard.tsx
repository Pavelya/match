/**
 * InfoCard Component
 *
 * Unified card component for detail page sections.
 * Provides consistent styling for information display areas.
 *
 * Features:
 * - Title with optional icon
 * - Consistent padding and border styling
 * - Optional action button in header
 *
 * Uses Lucide icons per icons-reference.md.
 */

import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InfoCardAction {
  /** Action label */
  label: string
  /** Action href */
  href: string
  /** Optional icon */
  icon?: LucideIcon
}

export interface InfoCardProps {
  /** Card title */
  title: string
  /** Optional Lucide icon for the title */
  icon?: LucideIcon
  /** Card content */
  children: React.ReactNode
  /** Optional action in the card header */
  action?: InfoCardAction
  /** Padding size: 'default' (p-6) or 'compact' (p-5) */
  padding?: 'default' | 'compact'
  /** Additional CSS classes */
  className?: string
}

export function InfoCard({
  title,
  icon: Icon,
  children,
  action,
  padding = 'default',
  className
}: InfoCardProps) {
  return (
    <div
      className={cn('rounded-xl border bg-card', padding === 'compact' ? 'p-5' : 'p-6', className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className={cn(
            'text-foreground flex items-center gap-2',
            padding === 'compact' ? 'font-medium' : 'text-lg font-semibold'
          )}
        >
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
          {title}
        </h3>
        {action && (
          <Link
            href={action.href}
            className="flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            {action.icon && <action.icon className="h-4 w-4" />}
            {action.label}
          </Link>
        )}
      </div>
      {/* Content */}
      {children}
    </div>
  )
}

/**
 * InfoRow Component
 *
 * A helper component for displaying label-value pairs within InfoCard.
 */
export interface InfoRowProps {
  /** Label text */
  label: string
  /** Value as string (alternative to children) */
  value?: string
  /** Value content (alternative to value prop) */
  children?: React.ReactNode
  /** Whether to show a copy button (only works with value prop) */
  copyable?: boolean
  /** Additional CSS classes */
  className?: string
}

export function InfoRow({ label, value, children, copyable: _copyable, className }: InfoRowProps) {
  const displayContent = value ?? children

  return (
    <div className={cn('flex justify-between items-center', className)}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium truncate max-w-[60%] text-right">{displayContent}</span>
    </div>
  )
}
