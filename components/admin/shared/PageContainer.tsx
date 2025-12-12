/**
 * PageContainer Component
 *
 * Unified container component for admin pages.
 * Provides consistent padding and optional max-width constraints.
 *
 * By default, pages are full-width to utilize screen real estate.
 * Use maxWidth prop for form pages that need constrained width.
 */

import { cn } from '@/lib/utils'

export type MaxWidthOption =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full'

export interface PageContainerProps {
  /** Page content */
  children: React.ReactNode
  /**
   * Maximum width constraint.
   * - 'full' (default): No constraint, uses full available width
   * - 'sm' to '7xl': Tailwind max-width values
   * - '3xl': Recommended for form pages
   * - '4xl': Recommended for detail pages
   */
  maxWidth?: MaxWidthOption
  /** Additional CSS classes */
  className?: string
}

const maxWidthClasses: Record<MaxWidthOption, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: ''
}

export function PageContainer({ children, maxWidth = 'full', className }: PageContainerProps) {
  return <div className={cn('p-8', maxWidthClasses[maxWidth], className)}>{children}</div>
}
