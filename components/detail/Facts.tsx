import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface Fact {
  label: string
  value: ReactNode
  /** Under the value: "Admits 4.6%", "First-year applicants, fall 2025" */
  notes?: ReactNode[]
  /** Words rather than a figure ("Bachelor of Science"), set smaller so they wrap */
  words?: boolean
  /** In the secondary ink: "None" where there is no IB minimum */
  muted?: boolean
}

/**
 * A page's facts in one bordered row (rebranding 2.4, boards "D4.8 Program page" and "D4.9
 * University page"): side by side from 768px, two by two on a phone, where an odd last one takes
 * the whole row. The edges between them are real borders, so they show in forced colours.
 */
export function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl
      style={{ '--facts': facts.length } as React.CSSProperties}
      className="grid grid-cols-2 overflow-hidden rounded-card border border-border bg-card md:grid-cols-[repeat(var(--facts),minmax(0,1fr))]"
    >
      {facts.map((fact, i) => {
        const spans = i === facts.length - 1 && i % 2 === 0 && facts.length > 1
        return (
          <div
            key={fact.label}
            className={cn(
              'flex min-w-0 flex-col gap-0.5 border-border px-3.5 py-3 md:gap-1 md:px-4 md:py-3.5',
              i % 2 === 1 && 'max-md:border-l',
              i > 1 && 'max-md:border-t',
              spans && 'max-md:col-span-2',
              i > 0 && 'md:border-l'
            )}
          >
            <dt className="text-label text-muted-foreground">{fact.label}</dt>
            <dd
              className={cn(
                'font-semibold break-words tabular-nums',
                fact.words ? 'text-body/[1.375rem]' : 'text-[1.25rem]/7 md:text-[1.375rem]/7',
                fact.muted && 'text-muted-foreground'
              )}
            >
              {fact.value}
            </dd>
            {fact.notes?.map((note, n) => (
              <dd key={n} className="text-small font-normal text-muted-foreground tabular-nums">
                {note}
              </dd>
            ))}
          </div>
        )
      })}
    </dl>
  )
}
