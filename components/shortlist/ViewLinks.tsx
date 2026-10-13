'use client'

import type { MouseEvent } from 'react'
import { cn } from '@/lib/utils'
import type { ShortlistView } from '@/lib/shortlist/view'

/*
 * List and Compare (rebranding 2.5, board "D4.10 Shortlist"): two links drawn like D2.4's
 * segmented control, 220 × 44, full width on a phone. Each view has its own address and the
 * current one carries aria-current, so Back and a reload keep it. Both views come from one
 * response, so a switch changes the address without loading the page again.
 */

const VIEWS: { view: ShortlistView; label: string }[] = [
  { view: 'list', label: 'List' },
  { view: 'compare', label: 'Compare' }
]

export function ViewLinks({
  view,
  href,
  onGo
}: {
  view: ShortlistView
  href: (view: ShortlistView) => string
  onGo: (view: ShortlistView) => void
}) {
  const go = (next: ShortlistView) => (event: MouseEvent<HTMLAnchorElement>) => {
    // A new tab or window opens the address as a link would
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return
    }
    event.preventDefault()
    if (next !== view) onGo(next)
  }
  return (
    <nav
      aria-label="View"
      className="grid h-11 w-full grid-cols-2 gap-[3px] rounded-control border border-transparent bg-muted p-0.5 md:w-[220px]"
    >
      {VIEWS.map((option) => (
        <a
          key={option.view}
          href={href(option.view)}
          aria-current={option.view === view ? 'page' : undefined}
          onClick={go(option.view)}
          className={cn(
            'flex items-center justify-center rounded-[0.5rem] border border-transparent text-body font-medium text-muted-foreground underline-offset-3',
            'transition-colors duration-180 ease-standard',
            'not-aria-[current=page]:hover:text-foreground not-aria-[current=page]:hover:underline',
            // The chosen view: surface with the 1px line-3 edge of a chosen segment (D2.4)
            'aria-[current=page]:border-line-3 aria-[current=page]:bg-card aria-[current=page]:font-semibold aria-[current=page]:text-foreground dark:aria-[current=page]:bg-border',
            // Forced colours drop the fills, so the current view takes the system highlight
            'forced-colors:border-0 forced-colors:aria-[current=page]:bg-[Highlight] forced-colors:aria-[current=page]:text-[HighlightText] forced-colors:aria-[current=page]:forced-color-adjust-none'
          )}
        >
          {option.label}
        </a>
      ))}
    </nav>
  )
}
