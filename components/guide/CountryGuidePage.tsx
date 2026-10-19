import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, ChevronDown, List } from 'lucide-react'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { GuideLinks, GuidesHubLink } from '@/components/home/GuideLinks'
import { LimeBand } from '@/components/home/LimeBand'
import { containerClass } from '@/components/site/styles'
import {
  QUESTIONS_ID,
  QUESTIONS_LABEL,
  countryName,
  exploreHref,
  lastUpdated,
  sectionId
} from '@/lib/guides/guide'
import type { CountryGuide, GuideSection } from '@/lib/guides/types'
import { cn } from '@/lib/utils'
import { GuideBlocks, GuideSources } from './GuideBlocks'
import { ExternalAnchor, RichText } from './RichText'

/*
 * Every country guide in the new design (rebranding 4.2, boards "D4.12 Country guide", "… · other
 * guides" and "… · phone", approved 18 October 2026), from the guide's data. Prebuilt, and it
 * reads nothing: server components only, so it sends no JavaScript of its own. The metadata and
 * JSON-LD stay in each page.tsx, shared with today's guide; the hero paragraph, each section and
 * each answer carry the classes their speakable selectors name.
 *
 * Desktop, from 1024px: "On this page" in a sticky 248px column, then the 720px text column. The
 * hero comes first in the page so the h1 is the first heading; the grid places the column beside
 * it. Below 1024px: one column, and "On this page" a closed disclosure under the hero.
 */

const container = cn(containerClass, 'px-4 md:px-6')
const disclosureChevron =
  'shrink-0 text-muted-foreground transition-transform duration-180 ease-standard group-open:rotate-180 motion-reduce:transition-none'

export function CountryGuidePage({ guide }: { guide: CountryGuide }) {
  const name = countryName(guide)
  const explore = { href: exploreHref(guide), label: `Explore programs in ${name}` }
  const contents = [
    ...guide.sections.map((section) => ({ id: sectionId(section.label), label: section.label })),
    { id: QUESTIONS_ID, label: QUESTIONS_LABEL }
  ]
  return (
    <main>
      <div
        className={cn(
          container,
          'lg:grid lg:grid-cols-[15.5rem_minmax(0,45rem)] lg:gap-x-12 lg:pt-12 xl:gap-x-20'
        )}
      >
        <Hero guide={guide} explore={explore} />
        <div className="max-lg:hidden lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <nav aria-labelledby="guide-contents" className="sticky top-24 flex flex-col gap-2.5">
            <h2 id="guide-contents" className="text-label text-ink-3">
              On this page
            </h2>
            <ol className="flex flex-col">
              {contents.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className="-ml-3 flex min-h-9 items-center rounded-[0.5rem] px-3 py-1.5 text-body leading-5 text-muted-foreground transition-colors duration-180 ease-standard hover:bg-muted hover:text-foreground"
                  >
                    {entry.label}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-3 border-t border-border pt-4 text-body">
              <ArrowLink href={explore.href} label={explore.label} />
            </p>
          </nav>
        </div>
        <details className="group mb-8 rounded-card border border-border bg-card lg:hidden">
          <summary className="flex min-h-13 cursor-pointer list-none items-center gap-3 rounded-card px-4 [&::-webkit-details-marker]:hidden">
            <List aria-hidden="true" size={20} className="shrink-0 text-muted-foreground" />
            <span className="flex-1 text-body font-semibold">On this page</span>
            <span className="text-small font-normal text-muted-foreground tabular-nums">
              {contents.length} sections
            </span>
            <ChevronDown
              aria-hidden="true"
              size={20}
              strokeWidth={2}
              className={disclosureChevron}
            />
          </summary>
          <nav aria-label="On this page" className="border-t border-border">
            <ol>
              {contents.map((entry) => (
                <li key={entry.id} className="not-first:border-t not-first:border-border">
                  <a
                    href={`#${entry.id}`}
                    className="flex min-h-11 items-center px-4 py-2.5 text-body leading-5 text-foreground"
                  >
                    {entry.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </details>
        <article className="min-w-0 lg:col-start-2 lg:row-start-2">
          {guide.sections.map((section) => (
            <Section key={section.label} section={section} />
          ))}
          <Questions guide={guide} />
        </article>
      </div>

      <section aria-labelledby="more-guides" className="border-y border-border bg-card">
        <div className={cn(container, 'flex flex-col gap-6 py-12 md:gap-8 md:py-18')}>
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between md:gap-6">
            <div className="flex max-w-3xl flex-col gap-3.5">
              <h2 id="more-guides" className="text-h1">
                More country guides
              </h2>
              <p className="text-body-l text-muted-foreground">
                How universities in each country read the IB Diploma, for 2027 entry.
              </p>
            </div>
            <GuidesHubLink />
          </div>
          <GuideLinks except={guide.path} />
        </div>
      </section>

      <LimeBand
        id="guide-cta"
        heading={`Ready to find your match in ${name}?`}
        explore={explore}
        rowFrom="lg"
      >
        <p className="text-body-l">
          <RichText text={guide.closing} />
        </p>
        <p className="text-body">100% free for students. No credit card required.</p>
      </LimeBand>
    </main>
  )
}

function Hero({
  guide,
  explore
}: {
  guide: CountryGuide
  explore: { href: string; label: string }
}) {
  const updated = lastUpdated(guide)
  return (
    <header className="flex flex-col gap-4 pt-7 pb-8 md:gap-5 lg:col-start-2 lg:row-start-1 lg:pt-2 lg:pb-14">
      <p className="text-small font-semibold text-muted-foreground">{guide.eyebrow}</p>
      <h1 className="text-display-l">{guide.title}</h1>
      <p className="hero-description text-body-l text-muted-foreground">{guide.intro}</p>
      <ul className="flex flex-col gap-2 text-body text-muted-foreground md:flex-row md:flex-wrap md:gap-x-6">
        <Tick>IB Diploma only</Tick>
        <Tick>Official sources</Tick>
        <Tick>
          Last updated for the {guide.intake} intake, on{' '}
          <time dateTime={updated.iso} className="tabular-nums">
            {updated.text}
          </time>
        </Tick>
      </ul>
      <div className="pt-1 md:pt-2">
        <ButtonLink
          href={explore.href}
          variant="secondary"
          size="lg"
          className="h-auto min-h-13 w-full py-3 text-center whitespace-normal max-md:px-5 md:w-auto"
        >
          {/* One run of text, so a long country wraps and the arrow stays with its last word */}
          <span>
            <LastWordWith label={explore.label}>
              <ArrowRight
                aria-hidden="true"
                size={18}
                strokeWidth={2}
                className="ml-2.5 inline-block align-[-3px]"
              />
            </LastWordWith>
          </span>
        </ButtonLink>
      </div>
    </header>
  )
}

function Tick({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <Check aria-hidden="true" size={16} strokeWidth={2.4} className="mt-1 shrink-0 text-ok" />
      <span>{children}</span>
    </li>
  )
}

/** The label, with `children` (an icon) held to its last word so the two never part */
function LastWordWith({ label, children }: { label: string; children: ReactNode }) {
  const cut = label.lastIndexOf(' ')
  return (
    <>
      {label.slice(0, cut + 1)}
      <span className="whitespace-nowrap">
        {label.slice(cut + 1)}
        {children}
      </span>
    </>
  )
}

/** A link in brand with an arrow that holds on to its last word */
function ArrowLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-chip font-semibold text-primary underline-offset-3 transition-colors duration-180 ease-standard hover:text-brand-hover hover:underline"
    >
      <LastWordWith label={label}>
        <ArrowRight
          aria-hidden="true"
          size={16}
          strokeWidth={2}
          className="ml-1.5 inline-block align-[-3px]"
        />
      </LastWordWith>
    </Link>
  )
}

/** Sections sit on the paper, divided by a hairline; a jump lands the h2 under the header */
const sectionClass =
  'content-section flex scroll-mt-14 flex-col gap-5 border-t border-border pt-10 pb-11 md:scroll-mt-16 md:pt-12 md:pb-14'

function Section({ section }: { section: GuideSection }) {
  const id = sectionId(section.label)
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={sectionClass}>
      <h2 id={`${id}-heading`} className="mb-1 text-h1">
        {section.heading}
      </h2>
      <GuideBlocks blocks={section.blocks} />
      {section.sources && section.sources.length > 0 && <GuideSources sources={section.sources} />}
    </section>
  )
}

/** The questions, collapsed, as Explore's (D4.7); the answers stay in the server HTML */
function Questions({ guide }: { guide: CountryGuide }) {
  const { heading, items, after } = guide.questions
  return (
    <section
      id={QUESTIONS_ID}
      aria-labelledby={`${QUESTIONS_ID}-heading`}
      className={cn(sectionClass, 'pb-12 md:pb-18')}
    >
      <h2 id={`${QUESTIONS_ID}-heading`} className="mb-1 text-h1">
        {heading}
      </h2>
      <div className="rounded-card border border-border bg-card">
        {items.map((item) => (
          <details key={item.question} className="group not-first:border-t not-first:border-border">
            <summary className="grid min-h-14 cursor-pointer list-none grid-cols-[minmax(0,1fr)_1.25rem] items-start gap-x-4 px-4 py-3.5 group-first:rounded-t-card focus-visible:outline-offset-[-2px] md:px-5 md:py-4 [&::-webkit-details-marker]:hidden">
              <h3 className="text-h3">{item.question}</h3>
              <ChevronDown
                aria-hidden="true"
                size={20}
                strokeWidth={2}
                className={cn('mt-0.5', disclosureChevron)}
              />
            </summary>
            <div className="flex flex-col gap-2.5 px-4 pb-4 md:pr-14 md:pb-5 md:pl-5">
              <p className="faq-answer text-body-l">{item.answer}</p>
              {item.source && (
                <p className="text-body text-muted-foreground">
                  Source:{' '}
                  {item.source.href ? (
                    <ExternalAnchor href={item.source.href} label={item.source.label} />
                  ) : (
                    item.source.label
                  )}
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
      <p className="mt-1 text-body-l text-muted-foreground">
        <RichText text={after} />
      </p>
    </section>
  )
}
