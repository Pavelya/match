import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { NotFoundSearch } from '@/components/detail/NotFoundPanel'
import { NotFoundFrame } from './not-found-island'
import { containerClass } from './styles'

/*
 * One 404 for every address the site doesn't have (rebranding 4.3, board "D4.15 404 and error
 * pages", approved 19 October 2026), in place of Next's bare "404 | This page could not be found.":
 * what happened, the search, which opens Explore with what was typed, and three ways on. Prebuilt
 * with the signed-out header, as every prebuilt page is; it reads nothing and answers 404. The
 * program and university pages keep their own (2.4).
 */

const WAYS_ON = [
  { href: '/programs/search', label: 'Explore programs' },
  { href: '/ib-university-requirements', label: 'Country guides' },
  { href: '/', label: 'Home' }
]

export function NotFoundPage() {
  return (
    <NotFoundFrame>
      <main className={`${containerClass} px-4 pt-14 pb-20 md:px-6 md:pt-22 md:pb-30`}>
        <div className="flex max-w-160 flex-col gap-4">
          <h1 className="text-h1">We can’t find that page</h1>
          <p className="text-body-l text-muted-foreground">
            The address may be mistyped, or the page may have moved. Search for a program, or start
            from one of these.
          </p>
          <NotFoundSearch stackOnPhone />
          <nav aria-label="Ways on" className="pt-1">
            <ul className="flex flex-col md:flex-row md:gap-7">
              {WAYS_ON.map((way) => (
                <li key={way.href}>
                  <Link
                    href={way.href}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-chip text-body font-semibold text-primary underline-offset-3 transition-colors duration-180 ease-standard hover:text-brand-hover hover:underline"
                  >
                    {way.label}
                    <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
    </NotFoundFrame>
  )
}
