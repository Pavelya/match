import type { ReactNode } from 'react'
import { Check, type LucideIcon } from 'lucide-react'
import { containerClass } from '@/components/site/styles'
import { cn } from '@/lib/utils'

/*
 * The text-page template (rebranding 4.3, boards "D4.13 Requirements hub" and "D4.14 Text pages",
 * approved 19 October 2026), built from the country guide's parts (D4.12): a hero in the 1240px
 * column, then sections on the paper divided by hairlines, each with today's label as an eyebrow
 * and today's big line as its h2, and D4.12's plain cards. No grey and white bands, no gradients,
 * no emoji. The requirements hub, How it works, FAQs, Contact, Support us and For schools (D4.17)
 * share it. Server components: none sends JavaScript of its own.
 */

const container = cn(containerClass, 'px-4 md:px-6')

export function TextHero({
  eyebrow,
  title,
  intro,
  introClassName = 'section-description',
  ticks,
  actions,
  children
}: {
  eyebrow?: string
  title: string
  intro: ReactNode
  /** The speakable selector the page's JSON-LD names */
  introClassName?: string
  /** Short facts under the intro, ticked as on the guides */
  ticks?: string[]
  /** Up to two actions; full width on a phone */
  actions?: ReactNode
  /** Anything else after the intro, as the hub's figures */
  children?: ReactNode
}) {
  return (
    <header className={cn(container, 'pt-7 pb-9 md:pt-14 md:pb-14')}>
      <div className="flex max-w-180 flex-col gap-4 md:gap-5">
        {eyebrow && <p className="text-small font-semibold text-muted-foreground">{eyebrow}</p>}
        <h1 className="text-display-l">{title}</h1>
        <p className={cn(introClassName, 'text-body-l text-muted-foreground')}>{intro}</p>
        {ticks && (
          <ul className="flex flex-col gap-2 text-body text-muted-foreground md:flex-row md:flex-wrap md:gap-x-6">
            {ticks.map((tick) => (
              <li key={tick} className="flex items-center gap-2">
                <Check
                  aria-hidden="true"
                  size={16}
                  strokeWidth={2.4}
                  className="shrink-0 text-ok"
                />
                {tick}
              </li>
            ))}
          </ul>
        )}
        {children}
        {actions && (
          <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center md:gap-5">
            {actions}
          </div>
        )}
      </div>
    </header>
  )
}

export function TextSection({
  id,
  eyebrow,
  title,
  intro,
  surface = false,
  children
}: {
  id: string
  eyebrow?: string
  title: string
  intro?: ReactNode
  /** The one section set on the surface, as How it works' No-AI section is */
  surface?: boolean
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        'content-section scroll-mt-14 border-t border-border md:scroll-mt-16',
        surface && 'bg-card'
      )}
    >
      <div className={cn(container, 'flex flex-col gap-6 pt-10 pb-12 md:gap-8 md:pt-16 md:pb-18')}>
        <div className="flex max-w-180 flex-col gap-2.5">
          {eyebrow && <p className="text-small font-semibold text-muted-foreground">{eyebrow}</p>}
          <h2 id={`${id}-heading`} className="text-h1">
            {title}
          </h2>
          {intro && (
            <p className="section-description mt-1 text-body-l text-muted-foreground">{intro}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}

/** The page's own column under a hero with no sections, as FAQs and Contact have */
export function TextBody({ children }: { children: ReactNode }) {
  return <div className={cn(container, 'pb-14 md:pb-24')}>{children}</div>
}

export interface TextCard {
  title: string
  text: ReactNode
  icon?: LucideIcon
}

const COLUMNS = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' } as const

/** D4.12's plain cards, with a 36px icon tile where today's card had an icon */
export function CardGrid({
  cards,
  columns,
  onPaper = false,
  textClassName
}: {
  cards: TextCard[]
  columns: keyof typeof COLUMNS
  /** Cards on the paper, inside a section set on the surface */
  onPaper?: boolean
  /** The speakable selector the page's JSON-LD names, as For schools' `.feature-description` */
  textClassName?: string
}) {
  return (
    <ul className={cn('grid gap-3 md:grid-cols-2 md:gap-4', COLUMNS[columns])}>
      {cards.map(({ title, text, icon: Icon }) => (
        <li
          key={title}
          className={cn(
            'flex flex-col gap-2.5 rounded-card border border-border p-5',
            onPaper ? 'bg-background' : 'bg-card'
          )}
        >
          {Icon && <SmallTile icon={Icon} />}
          <h3 className="text-h3">{title}</h3>
          <p className={cn(textClassName, 'text-body text-muted-foreground')}>{text}</p>
        </li>
      ))}
    </ul>
  )
}

/** A 36px icon tile on the sunken fill, as in the field rows and cards (D4.13, D4.14) */
export function SmallTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-9 shrink-0 items-center justify-center rounded-[0.5625rem] border border-transparent bg-muted text-muted-foreground"
    >
      <Icon size={20} strokeWidth={1.75} />
    </span>
  )
}

/** Plain bullets: a tick means a met requirement (D3.4), so lists never use one */
export function PlainList({ items, large = false }: { items: ReactNode[]; large?: boolean }) {
  return (
    <ul
      className={cn(
        'flex list-disc flex-col gap-2.5 pl-5.5 marker:text-ink-3 [&>li]:pl-0.5',
        large ? 'text-body-l' : 'text-body'
      )}
    >
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}
