import { Fragment } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { fieldIcon } from '@/components/first-run/field-icons'
import { QuestionsPanel } from '@/components/guide/QuestionsPanel'
import { LimeBand } from '@/components/home/LimeBand'
import {
  CardGrid,
  PlainList,
  SmallTile,
  TextHero,
  TextSection
} from '@/components/text-page/TextPage'
import { NO_IB_MINIMUM } from '@/lib/programs/ib-minimum'

/*
 * The requirements hub in the new design (rebranding 4.3, boards "D4.13 Requirements hub" and
 * "… · phone", approved 19 October 2026), from the guide template's parts. Prebuilt with the same
 * reads at build time as today, weekly; page.tsx makes them and keeps the metadata and JSON-LD,
 * which both designs share. Every section's label is its eyebrow and its big line its h2. A server
 * component: it sends no JavaScript of its own.
 */

export interface HubCountry {
  name: string
  href: string
  summary: string
  programCount: number
  /** Null when none of the country's programs sets a minimum (the USA) */
  minPoints: number | null
  maxPoints: number | null
}

export interface HubField {
  id: string
  name: string
  programCount: number
  avgPoints: number | null
}

interface HubProps {
  stats: { countries: number; programs: number; minPoints: number; maxPoints: number }
  /** A to Z */
  countries: HubCountry[]
  /** The twelve fields, most programs first */
  fields: HubField[]
  faqs: { question: string; answer: string }[]
}

const figure = new Intl.NumberFormat('en-US')

/** "24–45 IB points", one number where every program asks the same, D2.7's words where none asks */
export function pointsRange(min: number | null, max: number | null): string {
  if (min === null || max === null) return NO_IB_MINIMUM
  return min === max ? `${min} IB points` : `${min}–${max} IB points`
}

function programs(count: number): string {
  return `${figure.format(count)} ${count === 1 ? 'program' : 'programs'}`
}

const arrow = 'mt-0.5 shrink-0 text-ink-3'
// In forced colours the cards keep their edge, and their words and arrows the text colour (D4.13)
const cardLink =
  'rounded-card border border-border bg-card text-foreground transition-colors duration-180 ease-standard hover:border-line-3 hover:bg-muted forced-colors:text-[CanvasText] forced-colors:[&_svg]:text-[CanvasText]'

export function NewRequirementsHub({ stats, countries, fields, faqs }: HubProps) {
  return (
    <main>
      <article>
        <TextHero
          eyebrow="Country guides updated for the 2027 intake"
          title="IB Diploma admission rules by country"
          introClassName="hero-description"
          intro="Every country evaluates the IB Diploma differently. Find official recognition rules, grade conversion systems, and application processes for your target country — all sourced from government and institutional portals."
          actions={
            <ButtonLink
              href="/programs/search"
              variant="secondary"
              size="lg"
              className="max-md:w-full"
            >
              Explore programs
              <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
            </ButtonLink>
          }
        >
          <ul aria-label="On IB Match" className="flex gap-6 pt-1 md:gap-10">
            {[
              [figure.format(stats.countries), 'countries'],
              [figure.format(stats.programs), 'programs'],
              [`${stats.minPoints}–${stats.maxPoints}`, 'IB points range']
            ].map(([value, label]) => (
              <li key={label} className="flex flex-col">
                <span className="text-[1.5rem] leading-7 font-semibold tabular-nums md:text-[1.75rem] md:leading-8">
                  {value}
                </span>
                <span className="text-small font-normal text-muted-foreground">{label}</span>
              </li>
            ))}
          </ul>
        </TextHero>

        <TextSection
          id="country-guides"
          eyebrow="Country guides"
          title="Detailed IB admission guides"
          intro="In-depth guides with official recognition rules, grade conversion tables, application deadlines, and document requirements."
        >
          <ul className="grid gap-2.5 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {countries.map((country) => (
              <li key={country.href}>
                <Link
                  href={country.href}
                  className={`country-card ${cardLink} grid h-full grid-cols-[minmax(0,1fr)_1.25rem] grid-rows-[auto_1fr_auto] items-start gap-x-3 gap-y-1.5 p-4 md:p-5`}
                >
                  <h3 className="text-h3">{country.name}</h3>
                  <ArrowRight aria-hidden="true" size={20} strokeWidth={1.75} className={arrow} />
                  <p className="col-span-2 text-[0.9375rem] leading-[1.375rem] text-muted-foreground">
                    {country.summary}
                  </p>
                  <p className="col-span-2 mt-1.5 text-small tabular-nums">
                    {programs(country.programCount)} ·{' '}
                    {pointsRange(country.minPoints, country.maxPoints)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="max-w-180 text-body text-muted-foreground">
            Program counts and IB point ranges come from our program database, which is still being
            updated for 2027 entry.
          </p>
        </TextSection>

        <TextSection
          id="scoring"
          eyebrow="Understanding the IB Diploma"
          title="How IB scoring works for university admission"
        >
          <p className="max-w-180 text-body-l">
            The IB Diploma Programme awards up to{' '}
            <strong className="font-semibold">45 points</strong>: 42 from six subject grades (7
            points max each) plus up to 3 bonus points from Theory of Knowledge (TOK) and the
            Extended Essay (EE). Universities evaluate IB applications based on several factors:
          </p>
          <CardGrid
            columns={3}
            cards={[
              {
                title: 'Total IB points',
                text: 'Your overall score out of 45. Most universities set minimum thresholds (typically 24–38+).'
              },
              {
                title: 'HL subject requirements',
                text: 'Specific Higher Level subjects with minimum grades (e.g., Math HL 6+ for Engineering).'
              },
              {
                title: 'Country-specific rules',
                text: 'Each country has its own conversion system, application portal, and deadlines for IB students.'
              }
            ]}
          />
          <div className="flex max-w-180 flex-col gap-3">
            <h3 className="text-h3">Common HL subject requirements by field</h3>
            <PlainList
              large
              items={[
                ['Engineering', 'Math HL, Physics/Chemistry HL'],
                ['Medicine', 'Chemistry HL, Biology HL'],
                ['Economics/Business', 'Math HL preferred'],
                ['Humanities/Law', 'Relevant humanities at HL']
              ].map(([field, subjects]) => (
                <Fragment key={field}>
                  <strong className="font-semibold">{field}:</strong> {subjects}
                </Fragment>
              ))}
            />
          </div>
        </TextSection>

        <TextSection
          id="fields"
          eyebrow="By field of study"
          title="Average IB requirements by academic field"
          intro="Explore programs by field of study to see typical IB point requirements."
        >
          <ul className="grid gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3">
            {fields.map((field) => (
              <li key={field.id}>
                <Link
                  href={`/programs/search?fields=${field.id}`}
                  className={`${cardLink} grid h-full min-h-18 grid-cols-[2.25rem_minmax(0,1fr)_1.25rem] items-center gap-x-3 px-4 py-3.5`}
                >
                  <SmallTile icon={fieldIcon(field.name)} />
                  <span className="flex min-w-0 flex-col">
                    <span className="text-[0.9375rem] leading-[1.375rem] font-semibold">
                      {field.name}
                    </span>
                    <span className="text-small font-normal text-muted-foreground tabular-nums">
                      {programs(field.programCount)}
                      {field.avgPoints !== null && ` · average ${field.avgPoints} IB points`}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    size={20}
                    strokeWidth={1.75}
                    className="text-ink-3"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </TextSection>

        <TextSection id="faq" eyebrow="FAQ" title="Frequently asked questions">
          <QuestionsPanel items={faqs} className="max-w-210" />
        </TextSection>
      </article>

      <LimeBand
        id="hub-cta"
        heading="Ready to find your match?"
        explore={{ href: '/programs/search', label: 'Explore programs' }}
      >
        <p className="text-body-l">
          Discover university programs that match your IB profile. Search by IB points, subject
          requirements, country, and field of study.
        </p>
        <p className="text-body">100% free for students. No credit card required.</p>
      </LimeBand>
    </main>
  )
}
