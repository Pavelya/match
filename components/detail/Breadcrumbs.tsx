import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Crumb } from './trail'

/**
 * The trail above a program or university page (rebranding 2.4, audit 1.4), in place of today's
 * "Back to results", which went wherever the browser had been. A nav named Breadcrumb holding an
 * ordered list; links 32px tall, wrapping on a phone, names never cut.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 text-[0.875rem]/5">
        {trail.map((crumb, i) => (
          <li key={crumb.href} className="inline-flex min-w-0 items-center gap-1.5">
            {i > 0 && (
              <ChevronRight
                aria-hidden="true"
                size={14}
                strokeWidth={2}
                className="shrink-0 text-ink-3"
              />
            )}
            <Link
              href={crumb.href}
              className="inline-flex min-h-8 items-center rounded-chip break-words text-muted-foreground underline decoration-line-2 underline-offset-3 hover:text-foreground hover:decoration-current"
            >
              {crumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
