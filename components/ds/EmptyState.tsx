import type { ReactNode } from 'react'
import { Circle, CircleCheck, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * One panel for a list with nothing to show (rebranding 2.2, canvas board "D2.11 Empty and
 * error states", approved 10 October 2026): no matches, no results, an empty shortlist, a load
 * that failed, and the call to finish a profile. It takes the list's place under the page's
 * title and controls, which stay. Flat, left-aligned, no illustration: a Lucide icon in a 44px
 * tile, a title, a sentence or two, at most two buttons. It is the live region the skeleton
 * held, so a failed load reads its title once and focus stays where it was. Replaces
 * CompleteProfileCTA and the full-screen blocks in RecommendationsClient.
 */

const TILE = {
  /** Nothing to show */
  neutral: 'bg-muted text-muted-foreground',
  /** A load that failed */
  error: 'bg-gap-soft text-gap',
  /** The profile call to action */
  brand: 'bg-brand-soft text-brand-ink'
} as const

export interface EmptyStateStep {
  name: string
  done: boolean
  /** "Business & Economics, Computer Science", "Not added yet" */
  detail: string
}

interface EmptyStateProps {
  icon: LucideIcon
  tone?: keyof typeof TILE
  title: string
  children: ReactNode
  /** First run's steps, with the saved ones ticked (F6) */
  steps?: EmptyStateStep[]
  /** Up to two D2.1 buttons: the next step first, then the way out */
  actions?: ReactNode
  /** "About 2 minutes. You can change it any time." */
  meta?: ReactNode
  className?: string
}

export function EmptyState({
  icon: Icon,
  tone = 'neutral',
  title,
  children,
  steps,
  actions,
  meta,
  className
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex flex-col gap-2 rounded-card border border-border bg-card p-5 md:grid md:grid-cols-[44px_minmax(0,1fr)] md:items-start md:gap-x-5 md:gap-y-0 md:p-7',
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'mb-2 inline-flex size-11 items-center justify-center rounded-[0.75rem] border border-transparent md:mb-0',
          TILE[tone]
        )}
      >
        <Icon size={24} strokeWidth={1.75} />
      </span>
      <div className="flex min-w-0 flex-col gap-2">
        <h2 className="text-h2">{title}</h2>
        <div className="max-w-[62ch] text-body text-muted-foreground">{children}</div>
        {steps && (
          <ol className="mt-2 flex flex-col border-t border-border">
            {steps.map((step) => {
              const StepIcon = step.done ? CircleCheck : Circle
              return (
                <li
                  key={step.name}
                  className="grid grid-cols-[24px_minmax(0,1fr)] items-start gap-x-3 border-b border-border py-3 text-body"
                >
                  <StepIcon
                    aria-hidden="true"
                    size={20}
                    strokeWidth={2}
                    className={cn('mt-0.5', step.done ? 'text-ok' : 'text-ink-3')}
                  />
                  <span className="flex min-w-0 flex-col">
                    <span className="font-semibold">
                      {step.name}
                      <span className="sr-only">{step.done ? ', done' : ', not done'}</span>
                    </span>
                    <span className="text-small font-normal text-muted-foreground">
                      {step.detail}
                    </span>
                  </span>
                </li>
              )
            })}
          </ol>
        )}
        {(actions || meta) && (
          // Stacked and full width on a phone
          <div className="mt-2 flex flex-col gap-3 max-md:*:w-full md:flex-row md:flex-wrap md:items-center">
            {actions}
            {meta && <span className="text-small font-normal text-muted-foreground">{meta}</span>}
          </div>
        )}
      </div>
    </div>
  )
}
