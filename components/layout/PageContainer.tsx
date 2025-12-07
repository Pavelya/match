/**
 * Page Container Component
 *
 * Provides consistent layout and sizing for all app pages.
 * Use this component to wrap page content for uniform width and padding.
 *
 * Design reference: student/onboarding page
 * - max-w-7xl (1280px) on desktop
 * - Responsive padding (px-4 sm:px-6 lg:px-8)
 * - Centered with mx-auto
 */

import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: React.ReactNode
  /** Additional classes to apply */
  className?: string
  /** Use a narrower max-width for content-focused pages */
  narrow?: boolean
  /** Show background styling */
  withBackground?: boolean
}

export function PageContainer({
  children,
  className,
  narrow = false,
  withBackground = true
}: PageContainerProps) {
  return (
    <div className={cn(withBackground && 'min-h-screen bg-background')}>
      <div
        className={cn(
          'mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8',
          narrow ? 'max-w-5xl' : 'max-w-7xl',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * Page Header Component
 *
 * Consistent header styling for page titles and descriptions.
 */
interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <div className={cn('mb-6 sm:mb-8 space-y-2', className)}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
        {children}
      </div>
      {description && <p className="text-muted-foreground text-sm sm:text-base">{description}</p>}
    </div>
  )
}
