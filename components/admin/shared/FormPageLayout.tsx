/**
 * FormPageLayout Component
 *
 * Standard layout for admin form pages (create/edit).
 * Provides consistent structure across all form pages.
 *
 * Features:
 * - Standard max-width container
 * - Back navigation link
 * - Optional breadcrumb navigation
 * - Page title and description
 * - Card wrapper for form content
 * - Optional secondary actions area
 *
 * Uses Lucide icons per icons-reference.md.
 */

import Link from 'next/link'
import { type ReactNode } from 'react'
import { ArrowLeft, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs'

export interface FormPageLayoutProps {
  /** Page title */
  title: string
  /** Optional description below title */
  description?: string
  /** Optional Lucide icon for the title */
  icon?: LucideIcon
  /** Back link href (optional) */
  backHref?: string
  /** Back link label (default: "Back") */
  backLabel?: string
  /** Optional breadcrumb items (replaces back link when provided) */
  breadcrumbs?: BreadcrumbItem[]
  /** Form content */
  children: ReactNode
  /** Additional content after the form (e.g., danger zone) */
  footer?: ReactNode
  /** Max width class override (default: max-w-4xl) */
  maxWidth?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  /** Additional CSS classes */
  className?: string
}

const maxWidthClasses = {
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  full: ''
}

export function FormPageLayout({
  title,
  description,
  icon: Icon,
  backHref,
  backLabel = 'Back',
  breadcrumbs,
  children,
  footer,
  maxWidth = 'full',
  className
}: FormPageLayoutProps) {
  return (
    <div className={cn('p-8', maxWidthClasses[maxWidth], className)}>
      {/* Navigation - Either breadcrumbs or back link */}
      {breadcrumbs ? (
        <Breadcrumbs items={breadcrumbs} className="mb-6" />
      ) : backHref ? (
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      ) : null}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          {Icon && <Icon className="h-7 w-7 text-muted-foreground" />}
          {title}
        </h1>
        {description && <p className="mt-2 text-muted-foreground">{description}</p>}
      </div>

      {/* Form Card */}
      <div className="rounded-xl border bg-card p-6">{children}</div>

      {/* Optional Footer (e.g., danger zone) */}
      {footer && <div className="mt-6">{footer}</div>}
    </div>
  )
}

/**
 * FormSection Component
 *
 * A helper for grouping related fields within a form.
 */
export interface FormSectionProps {
  /** Section title */
  title: string
  /** Optional description */
  description?: string
  /** Section content (form fields) */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
      {children}
    </div>
  )
}

/**
 * FormDivider Component
 *
 * A visual separator between form sections.
 */
export function FormDivider() {
  return <hr className="my-6 border-border" />
}

/**
 * FormActions Component
 *
 * Container for form submit/cancel buttons.
 */
export interface FormActionsProps {
  /** Action buttons */
  children: ReactNode
  /** Alignment: 'left', 'right', or 'space-between' */
  align?: 'left' | 'right' | 'between'
  /** Additional CSS classes */
  className?: string
}

export function FormActions({ children, align = 'right', className }: FormActionsProps) {
  const alignmentClasses = {
    left: 'justify-start',
    right: 'justify-end',
    between: 'justify-between'
  }

  return (
    <div className={cn('flex items-center gap-3 pt-6', alignmentClasses[align], className)}>
      {children}
    </div>
  )
}
