import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { COUNTRY_GUIDES } from '@/lib/programs/country-guides'

/*
 * The country guides as links, four to a row (two on a phone), and the link to the hub (rebranding
 * 4.1, board "D4.1 Home"). Home lists all 23; each guide lists the other 22 at its end (4.2, board
 * "D4.12 Country guide"). From code, never a read.
 */

export function GuideLinks({ except }: { except?: string }) {
  return (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {COUNTRY_GUIDES.filter((guide) => guide.href !== except).map((guide) => (
        <li key={guide.href}>
          <Link
            href={guide.href}
            className="flex min-h-12 items-center justify-between gap-2 rounded-control border border-border bg-background px-3 py-3 text-body leading-5 font-medium text-foreground transition-colors duration-180 ease-standard hover:border-line-3 hover:bg-muted md:px-4"
          >
            <span className="min-w-0 break-words">{guide.country}</span>
            <ChevronRight
              aria-hidden="true"
              size={16}
              strokeWidth={2}
              className="shrink-0 text-ink-3"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function GuidesHubLink() {
  return (
    <Link
      href="/ib-university-requirements"
      className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-chip text-body font-semibold text-primary underline-offset-3 transition-colors duration-180 ease-standard hover:text-brand-hover hover:underline"
    >
      IB rules by country
      <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
    </Link>
  )
}
