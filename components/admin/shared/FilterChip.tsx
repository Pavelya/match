/**
 * FilterChip Component
 *
 * A clickable chip/pill for filtering data.
 * Supports active state and click handler.
 *
 * Uses Lucide icons per icons-reference.md.
 */

'use client'

import { type LucideIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FilterChipProps {
  /** Label text */
  label: string
  /** Optional icon */
  icon?: LucideIcon
  /** Whether this filter is currently active */
  isActive?: boolean
  /** Click handler */
  onClick: () => void
  /** Whether to show a remove button (for removable filters) */
  removable?: boolean
  /** Color variant for the chip */
  variant?: 'default' | 'success' | 'warning' | 'error'
  /** Additional CSS classes */
  className?: string
}

const variantStyles = {
  default: {
    active: 'bg-primary/10 border-primary text-primary',
    inactive: 'bg-card border-border text-muted-foreground hover:bg-muted/50'
  },
  success: {
    active: 'bg-green-100 border-green-500 text-green-700',
    inactive: 'bg-card border-border text-muted-foreground hover:bg-green-50'
  },
  warning: {
    active: 'bg-amber-100 border-amber-500 text-amber-700',
    inactive: 'bg-card border-border text-muted-foreground hover:bg-amber-50'
  },
  error: {
    active: 'bg-red-100 border-red-500 text-red-700',
    inactive: 'bg-card border-border text-muted-foreground hover:bg-red-50'
  }
}

export function FilterChip({
  label,
  icon: Icon,
  isActive = false,
  onClick,
  removable = false,
  variant = 'default',
  className
}: FilterChipProps) {
  const styles = variantStyles[variant]

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border transition-colors',
        isActive ? styles.active : styles.inactive,
        className
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {label}
      {removable && isActive && <X className="h-3.5 w-3.5 ml-0.5" />}
    </button>
  )
}
