/**
 * CompleteProfileCTA Component
 *
 * A reusable call-to-action for logged-in students who haven't completed onboarding.
 * Used on matches, saved programs, and program detail pages.
 *
 * 2026 UX Best Practices:
 * - Value-first, benefit-driven messaging (not error-focused)
 * - Clear, action-oriented primary CTA → /student/onboarding
 * - Trust signals to reduce friction ("Takes 2 minutes")
 * - Completion bias: acknowledges progress if partial
 * - Two variants: "full-page" (centered, for empty pages) and "inline" (compact banner)
 */

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GraduationCap, ArrowRight, CheckCircle2, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CompleteProfileCTAProps {
  /** Display variant */
  variant?: 'full-page' | 'inline'
  /** Custom heading override */
  heading?: string
  /** Custom description override */
  description?: string
  /** Whether to show secondary "Browse Programs" CTA */
  showBrowsePrograms?: boolean
  /** Additional CSS classes */
  className?: string
}

export function CompleteProfileCTA({
  variant = 'full-page',
  heading,
  description,
  showBrowsePrograms = true,
  className
}: CompleteProfileCTAProps) {
  if (variant === 'inline') {
    return <InlineVariant heading={heading} description={description} className={className} />
  }

  return (
    <FullPageVariant
      heading={heading}
      description={description}
      showBrowsePrograms={showBrowsePrograms}
      className={className}
    />
  )
}

/** Full-page variant: centered layout for empty pages (matches, saved) */
function FullPageVariant({
  heading,
  description,
  showBrowsePrograms,
  className
}: Omit<CompleteProfileCTAProps, 'variant'>) {
  return (
    <div className={cn('flex items-center justify-center py-16 sm:py-24', className)}>
      <div className="max-w-md text-center space-y-6 px-4">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mx-auto">
          <GraduationCap className="h-10 w-10" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            {heading || 'Complete Your Academic Profile'}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {description ||
              'Set up your IB subjects and grades to get personalized program recommendations tailored to your academic profile.'}
          </p>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            Takes 2 minutes
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />3 simple steps
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            Edit anytime
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            asChild
            size="lg"
            className="gap-2 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
          >
            <Link href="/student/onboarding">
              Complete Profile Setup
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          {showBrowsePrograms && (
            <Button variant="outline" size="lg" asChild className="gap-2">
              <Link href="/programs/search">
                <Search className="h-4 w-4" />
                Browse Programs
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

/** Inline variant: compact banner for program detail pages */
function InlineVariant({
  heading,
  description,
  className
}: Pick<CompleteProfileCTAProps, 'heading' | 'description' | 'className'>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20',
        className
      )}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:self-center">
            <GraduationCap className="h-7 w-7" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-foreground">
              {heading || 'See how you match with this program'}
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              {description ||
                'Complete your academic profile to get your personalized match score and recommendations.'}
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                Takes 2 minutes
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />3 simple steps
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                Edit anytime
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="w-full sm:w-auto shrink-0 sm:self-center">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto gap-2 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
            >
              <Link href="/student/onboarding">
                Complete Profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
