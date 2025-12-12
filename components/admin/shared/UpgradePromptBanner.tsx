/**
 * UpgradePromptBanner Component
 *
 * A banner component for prompting users to upgrade their subscription tier.
 * Designed for use in the IB Coordinator Dashboard (Regular tier schools).
 *
 * Usage:
 * - Display when a feature is locked for Regular tier schools
 * - Show inline within sections that require VIP access
 * - Provide clear CTA to upgrade
 */

import Link from 'next/link'
import { Crown, Sparkles, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface UpgradePromptBannerProps {
  /** Feature name that requires upgrade (e.g., "Advanced Analytics") */
  feature: string
  /** Optional description of what the feature provides */
  description?: string
  /** Link to upgrade page */
  upgradeHref?: string
  /** Button label (default: "Upgrade to VIP") */
  buttonLabel?: string
  /** Visual variant */
  variant?: 'inline' | 'card' | 'subtle'
  /** Custom icon (defaults to Crown) */
  icon?: LucideIcon
  /** Additional CSS classes */
  className?: string
}

export function UpgradePromptBanner({
  feature,
  description,
  upgradeHref = '/coordinator/settings/subscription',
  buttonLabel = 'Upgrade to VIP',
  variant = 'inline',
  icon: Icon = Crown,
  className
}: UpgradePromptBannerProps) {
  if (variant === 'subtle') {
    return (
      <div
        className={cn(
          'flex items-center justify-between py-2 px-3 rounded-lg bg-amber-50 border border-amber-200',
          className
        )}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-amber-600" />
          <span className="text-sm text-amber-800">
            <span className="font-medium">{feature}</span> requires VIP
          </span>
        </div>
        <Link
          href={upgradeHref}
          className="text-xs font-medium text-amber-700 hover:text-amber-900 underline-offset-2 hover:underline"
        >
          Upgrade
        </Link>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div
        className={cn(
          'rounded-xl border-2 border-dashed border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 text-center',
          className
        )}
      >
        <div className="flex justify-center mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <Icon className="h-6 w-6 text-amber-600" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-amber-900 mb-1">{feature}</h3>
        {description && (
          <p className="text-sm text-amber-700 mb-4 max-w-sm mx-auto">{description}</p>
        )}
        <Link
          href={upgradeHref}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          {buttonLabel}
        </Link>
      </div>
    )
  }

  // Default: inline variant
  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 rounded-lg bg-amber-50 border border-amber-200',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 flex-shrink-0">
          <Icon className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-amber-900">{feature}</p>
          {description && <p className="text-xs text-amber-700 mt-0.5">{description}</p>}
        </div>
      </div>
      <Link
        href={upgradeHref}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors whitespace-nowrap"
      >
        <Sparkles className="h-3.5 w-3.5" />
        {buttonLabel}
      </Link>
    </div>
  )
}
