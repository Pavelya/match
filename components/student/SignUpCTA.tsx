/**
 * SignUpCTA Component
 *
 * A prominent call-to-action banner for logged-out users on program detail pages.
 * Encourages users to sign up to see their personalized match score.
 *
 * 2026 Design Best Practices:
 * - Benefit-driven headline
 * - Clear, action-oriented CTA button
 * - Trust signals to reduce friction
 * - Subtle gradient background for visual appeal
 */

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'

interface SignUpCTAProps {
  /** Program ID for callback URL after sign-in */
  programId: string
  /** Program name for contextual messaging */
  programName?: string
  /** University name for contextual messaging */
  universityName?: string
}

export function SignUpCTA({
  programId,
  programName: _programName,
  universityName
}: SignUpCTAProps) {
  const callbackUrl = encodeURIComponent(`/programs/${programId}`)

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:self-center">
            <Sparkles className="h-7 w-7" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-foreground">
              See how you match with this program
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Create a free account to get your personalized match score
              {universityName && ` for ${universityName}`}.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                Free forever
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                Takes 2 minutes
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                No credit card
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
              <Link href={`/auth/signin?callbackUrl=${callbackUrl}`}>
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
