'use client'

import { useId, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DescriptionClamp } from '@/lib/programs/description'

export interface ReadMoreProps {
  /** Where the text runs past ten lines, worked out on the server (lib/programs/description.ts) */
  clamp: DescriptionClamp
  className?: string
  children: ReactNode
}

/**
 * A description that stops at eight lines, with "Read the whole description" (rebranding 2.4,
 * boards "D4.8 Program page" and "D4.9 University page"). The whole text is in the server HTML;
 * the cut is CSS, so search engines and screen readers that skip the button still have it all.
 * Text that runs to ten lines or fewer shows whole, with no button. Loaded through islands.tsx.
 */
export function ReadMore({ clamp, className, children }: ReadMoreProps) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <>
      <p
        id={id}
        className={cn(
          'max-w-[68ch] text-body-l whitespace-pre-line',
          // The whole text fades in as it opens (D1.6)
          open && 'disclose',
          !open && clamp.phone && 'max-md:line-clamp-8',
          !open && clamp.wide && 'md:line-clamp-8',
          className
        )}
      >
        {children}
      </p>
      {(clamp.phone || clamp.wide) && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            '-mt-1 inline-flex h-11 items-center gap-1 self-start rounded-chip text-body font-semibold text-primary underline-offset-3 hover:underline pressed:text-brand-ink pressed:underline',
            !clamp.phone && 'max-md:hidden',
            !clamp.wide && 'md:hidden'
          )}
        >
          Read the whole description
          <ChevronDown
            aria-hidden="true"
            size={16}
            strokeWidth={2}
            className={cn('transition-transform duration-180 ease-standard', open && 'rotate-180')}
          />
        </button>
      )}
    </>
  )
}
