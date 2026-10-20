import Link from 'next/link'
import { Search } from 'lucide-react'
import { buttonVariants } from '@/components/ds/button-variants'
import { cn } from '@/lib/utils'

/**
 * A program or university that isn't there (rebranding 2.4), in place of Next's bare "404 | This
 * page could not be found.". The page still answers 404. The search is a plain form to Explore,
 * which reads what was typed from the address, so it works before any script loads.
 */
export function NotFoundPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-4 pt-14 pb-20 md:px-6 md:pt-22 md:pb-30">
      <div className="flex max-w-160 flex-col gap-4">
        <h1 className="text-h1">{title}</h1>
        <p className="text-body-l text-muted-foreground">{children}</p>
        <NotFoundSearch />
        <Link
          href="/programs/search"
          className="inline-flex min-h-11 items-center self-start rounded-chip text-body font-semibold text-primary underline-offset-3 hover:underline pressed:text-brand-ink pressed:underline"
        >
          Explore programs
        </Link>
      </div>
    </div>
  )
}

/**
 * The search on every not-found page: a plain form to Explore, which reads what was typed from the
 * address, so it works before any script loads. The site's 404 (rebranding 4.3, D4.15) puts the
 * button under the field on a phone, full width.
 */
export function NotFoundSearch({ stackOnPhone = false }: { stackOnPhone?: boolean }) {
  return (
    <form
      role="search"
      action="/programs/search"
      method="get"
      className="mt-2 flex flex-wrap gap-3"
    >
      <label
        className={cn(
          'flex h-11 min-w-0 flex-1 basis-56 items-center gap-2.5 rounded-control border border-input bg-card pl-3.5 transition-[border-color] duration-180 ease-standard hover:border-muted-foreground has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring md:h-13 md:gap-3 md:pl-4',
          stackOnPhone && 'max-md:basis-full'
        )}
      >
        <Search
          aria-hidden="true"
          size={20}
          strokeWidth={1.75}
          className="shrink-0 text-muted-foreground"
        />
        <input
          type="search"
          name="q"
          aria-label="Search programs"
          placeholder="Program, university or city"
          className="h-10.5 min-w-0 flex-1 bg-transparent pr-3 text-field text-foreground outline-hidden placeholder:text-ink-3 md:h-11"
        />
      </label>
      <button
        type="submit"
        className={buttonVariants({
          className: cn('md:h-13 md:px-5.5', stackOnPhone && 'max-md:w-full md:text-body-l')
        })}
      >
        Search
      </button>
    </form>
  )
}
