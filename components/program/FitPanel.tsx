import Link from 'next/link'
import { ListChecks } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { StatusBadge } from '@/components/ds/StatusBadge'
import { REQUIREMENT_STATUS as STATUS } from '@/components/match/requirement-status'
import { FitWorking } from '@/components/detail/islands'
import type { CardStatus } from '@/lib/matching/match-status'
import type { WhyThisMatch } from '@/lib/matching/match-why'

/*
 * Beside the requirements on a program page (rebranding 2.4, board "D4.8 Program page"): how the
 * student stands, or how to find out. With grades: the status badge (D2.7), one sentence on what
 * it means, field and country as in "Why this match" (D3.2), and the fit score behind "How the fit
 * is worked out", so the percentage is never the headline. Without them, "Do you meet these?" and
 * the way to sign in or to Academic. It stays in view beside the requirements from 1024px, and
 * comes before the facts on a phone.
 */

const panel = 'rounded-card border border-border bg-card p-4 lg:p-6'

export function FitPanel({
  status,
  badge,
  why,
  academicHref,
  className
}: {
  status: CardStatus
  badge: string
  why: WhyThisMatch
  academicHref: string
  className?: string
}) {
  return (
    <section
      aria-labelledby="your-fit"
      className={cn(panel, 'flex flex-col gap-3 lg:gap-4', className)}
    >
      <h2 id="your-fit" className="text-label text-muted-foreground">
        Your fit
      </h2>
      <StatusBadge status={status} size="lg" className="py-1.25">
        {badge}
      </StatusBadge>
      <p className="text-body">{why.note.text}</p>
      <ul aria-label="Field and country" className="flex flex-col gap-2">
        {[
          { what: 'Field', ...why.field },
          { what: 'Country', ...why.country }
        ].map((pref) => {
          const { Icon, label, text } = STATUS[pref.kind]
          return (
            <li
              key={pref.what}
              className="flex items-start gap-2 rounded-[0.625rem] border border-border px-3 py-2.5 text-[0.875rem]/5"
            >
              <Icon
                role="img"
                aria-label={label}
                size={18}
                strokeWidth={2}
                className={cn('mt-px shrink-0', text)}
              />
              <span className="flex flex-col">
                <span className="text-label text-muted-foreground">{pref.what}</span>
                {pref.text}
              </span>
            </li>
          )
        })}
      </ul>
      <FitWorking score={why.fit.score} parts={why.fit.parts} sentence={why.fit.sentence} />
      <Link
        href={academicHref}
        className="self-start rounded-chip text-body font-semibold text-primary underline-offset-3 hover:underline"
      >
        Edit your grades
      </Link>
    </section>
  )
}

/** Signed out, or signed in before adding grades: what checking needs, and the way there. */
export function FitAsk({
  signedIn,
  href,
  className
}: {
  signedIn: boolean
  href: string
  className?: string
}) {
  return (
    <section
      aria-labelledby="your-fit"
      className={cn(
        panel,
        'grid grid-cols-[44px_minmax(0,1fr)] items-start gap-x-3.5 gap-y-3 lg:flex lg:flex-col lg:items-stretch',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="inline-flex size-11 items-center justify-center rounded-[0.75rem] border border-transparent bg-brand-soft text-brand-ink"
      >
        <ListChecks size={24} strokeWidth={1.75} />
      </span>
      <div className="flex min-w-0 flex-col gap-1 lg:gap-3">
        <h2 id="your-fit" className="text-h3">
          Do you meet these?
        </h2>
        <p className="text-body text-muted-foreground">
          {signedIn
            ? 'Add your subjects and grades, and IB Match checks each requirement against them.'
            : 'Sign in and add your subjects and grades. IB Match checks each requirement against them, here and on every program.'}
        </p>
      </div>
      <ButtonLink href={href} className="col-span-2 w-full lg:mt-1">
        {signedIn ? 'Add your grades' : 'Sign in to check'}
      </ButtonLink>
      {!signedIn && (
        <p className="col-span-2 -mt-1 text-center text-small font-normal text-muted-foreground lg:mt-0">
          Takes about 2 minutes.
        </p>
      )}
    </section>
  )
}
