/**
 * Breadcrumbs Component
 *
 * Navigation breadcrumb trail for admin pages.
 * Shows the current page location within the hierarchy.
 *
 * Features:
 * - Clickable parent links
 * - Current page (non-clickable)
 * - Chevron separators
 * - Home/Dashboard as root
 *
 * Uses Lucide icons per icons-reference.md.
 */

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  /** Display label */
  label: string
  /** Link href (omit for current page) */
  href?: string
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[]
  /** Whether to show home icon as first item */
  showHome?: boolean
  /** Additional CSS classes */
  className?: string
}

export function Breadcrumbs({ items, showHome = true, className }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: 'Dashboard', href: '/admin/dashboard' }, ...items]
    : items

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-sm', className)}>
      <ol className="flex items-center gap-1">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          const isHome = index === 0 && showHome

          return (
            <li key={index} className="flex items-center gap-1">
              {/* Separator (except for first item) */}
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
              )}

              {/* Breadcrumb item */}
              {isLast ? (
                // Current page (not clickable)
                <span
                  className="text-foreground font-medium truncate max-w-[200px]"
                  aria-current="page"
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : item.href ? (
                // Clickable link
                <Link
                  href={item.href}
                  className={cn(
                    'text-muted-foreground hover:text-foreground transition-colors truncate max-w-[150px]',
                    isHome && 'flex items-center gap-1'
                  )}
                  title={item.label}
                >
                  {isHome && <Home className="h-4 w-4 flex-shrink-0" />}
                  <span className={cn(isHome && 'sr-only sm:not-sr-only')}>{item.label}</span>
                </Link>
              ) : (
                // Non-link text (shouldn't happen often)
                <span className="text-muted-foreground truncate max-w-[150px]">{item.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/**
 * Helper function to generate breadcrumb items for common patterns
 */
export function generateBreadcrumbs(
  section: 'schools' | 'universities' | 'programs' | 'coordinators' | 'students' | 'agents',
  entityName?: string,
  entityId?: string,
  subPage?: 'edit'
): BreadcrumbItem[] {
  const sectionLabels = {
    schools: 'Schools',
    universities: 'Universities',
    programs: 'Programs',
    coordinators: 'Coordinators',
    students: 'Students',
    agents: 'Agents'
  }

  const items: BreadcrumbItem[] = [{ label: sectionLabels[section], href: `/admin/${section}` }]

  if (entityName && entityId) {
    if (subPage === 'edit') {
      items.push({ label: entityName, href: `/admin/${section}/${entityId}` })
      items.push({ label: 'Edit' })
    } else {
      items.push({ label: entityName })
    }
  }

  return items
}
