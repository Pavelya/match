import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonBase } from '@/components/ds/button-variants'
import { containerClass } from '@/components/site/styles'
import { cn } from '@/lib/utils'

/*
 * The lime band that ends Home (rebranding 4.1, board "D4.1 Home") and every country guide (4.2,
 * "D4.12 Country guide"). Lime in both themes, with ink words. Dark's brand button would be 2.1:1
 * on it, so the action is an ink button, and the focus outline is ink too. In forced colours the
 * band turns to the system's background, and its transparent edges are drawn.
 */

const onLimeButton = cn(buttonBase, 'h-13 gap-2.5 px-6 text-body-l focus-visible:outline-on-lime')

// Side by side from 768px on Home; a guide's longer Explore label needs 1024px
const ROW = {
  md: 'md:flex-row md:items-center md:justify-between md:gap-12',
  lg: 'lg:flex-row lg:items-center lg:justify-between lg:gap-12'
}

interface LimeBandProps {
  id: string
  heading: string
  children: ReactNode
  /** The outlined second action: Explore, all of it or one country */
  explore: { href: string; label: string }
  rowFrom?: keyof typeof ROW
}

export function LimeBand({ id, heading, children, explore, rowFrom = 'md' }: LimeBandProps) {
  return (
    <section aria-labelledby={id} className="border-y border-transparent bg-lime text-on-lime">
      <div
        className={cn(
          containerClass,
          'flex flex-col gap-8 px-4 py-12 md:px-6 md:py-20',
          ROW[rowFrom]
        )}
      >
        <div className="flex max-w-160 flex-col gap-3.5">
          <h2 id={id} className="text-display-l">
            {heading}
          </h2>
          {children}
        </div>
        <div className="flex shrink-0 flex-col gap-2.5 md:flex-row md:gap-3">
          <Link
            href="/student"
            className={cn(
              onLimeButton,
              // A transparent edge, which forced colours draw
              'border-transparent bg-on-lime font-semibold text-on-ink hover:opacity-80'
            )}
          >
            Get my matches
            <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
          </Link>
          <Link
            href={explore.href}
            className={cn(
              onLimeButton,
              // A long country name wraps on a phone rather than overflowing the button
              'h-auto min-h-13 py-3 text-center whitespace-normal',
              'border-current bg-transparent font-medium text-on-lime underline-offset-3 hover:underline'
            )}
          >
            {explore.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
