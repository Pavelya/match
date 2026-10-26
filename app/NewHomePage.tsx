import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { GuideLinks, GuidesHubLink } from '@/components/home/GuideLinks'
import { LimeBand } from '@/components/home/LimeBand'
import { MatchesPreview } from '@/components/home/MatchesPreview'
import { SeasonSlot } from '@/components/site/SeasonSlot'
import { containerClass } from '@/components/site/styles'
import { COUNTRY_GUIDES } from '@/lib/programs/country-guides'
import { cn } from '@/lib/utils'

/*
 * Home in the new design (rebranding 4.1, boards "D4.1 Home" and "D4.1 Home · phone", approved
 * 18 October 2026), inside the header and footer the root layout draws (1.5). Prebuilt, and it
 * reads nothing: the preview's programs and the guides come from code. Server components only,
 * so the page sends no JavaScript of its own. The metadata and JSON-LD stay in page.tsx, shared
 * with today's page; the hero paragraph and the four IB points carry the classes its speakable
 * selectors name.
 */

const container = cn(containerClass, 'px-4 md:px-6')
const sectionHead = 'flex max-w-3xl flex-col gap-3.5'
const serifFigure = 'font-[family-name:var(--font-newsreader)] font-medium'

const STEPS = [
  {
    title: 'Choose your fields',
    text: 'Pick up to five study areas, from Engineering to the Arts.'
  },
  {
    title: 'Choose your countries',
    text: `Stay close to home or look across all ${COUNTRY_GUIDES.length} countries. Or choose Open to anywhere.`
  },
  {
    title: 'Add your subjects and grades',
    text: 'Six subjects at Higher or Standard Level, predicted or final grades, TOK and the Extended Essay. We work out your total.'
  }
]

const IB_POINTS = [
  {
    title: 'Higher and Standard Level aren’t the same',
    // compareLevels in lib/matching/subject-matcher.ts
    text: 'A Higher Level grade meets a Standard Level requirement. A Standard Level grade never meets a Higher Level one, and your matches follow the same rule.'
  },
  {
    title: 'TOK and the Extended Essay count',
    text: 'Your two core grades add their points to your total, from the IB’s own table, just as universities read them.'
  },
  {
    title: 'Every match shows why',
    text: 'See which requirements you meet, which are within reach and what’s missing, subject by subject.'
  },
  {
    title: 'Your grades, entered once',
    text: 'No more checking university websites one by one. Your matches are ready as soon as you finish.'
  }
]

export function NewHomePage() {
  return (
    <main>
      <Hero />
      <Steps />
      <IbPoints />
      <Guides />
      <FounderNote />
      <FinalBand />
    </main>
  )
}

function Hero() {
  return (
    <section
      className={cn(
        container,
        // Two columns from 1280px; below, the preview follows the words
        'grid gap-8 pt-7 pb-12 md:gap-12 md:pt-18 md:pb-24',
        'items-center xl:grid-cols-[minmax(0,1fr)_35rem] xl:gap-18'
      )}
    >
      <div className="flex min-w-0 flex-col gap-5 md:gap-6">
        <p className="inline-flex min-h-8 items-center self-start rounded-full border border-border bg-card px-3.5 py-1.5 text-small text-muted-foreground">
          Started by a former IB student who wished this existed
        </p>
        <h1 className="text-display-xl">
          Find your perfect{' '}
          {/* A lime bar under the letters, not a marker behind them: light letters on lime
              are 1.1:1 in dark (04-design-system.md §1). In season, a drawing hangs from the bar
              under "match" (D1.7), so the word has a span of its own. */}
          <span className="lime-bar">
            university{' '}
            <span className="relative">
              match
              <SeasonSlot slot="hero" />
            </span>
          </span>
        </h1>
        <p className="hero-description max-w-xl text-body-l text-muted-foreground">
          Use your predicted IB grades to find university programs that match your profile. IB Match
          understands the IB: Higher and Standard Level, TOK and the Extended Essay, and how it all
          adds up.
        </p>
        <div className="flex flex-col gap-2.5 md:flex-row md:flex-wrap md:gap-3">
          <ButtonLink href="/student" size="lg" className="gap-2.5">
            Get my matches
            <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
          </ButtonLink>
          <ButtonLink href="/programs/search" variant="secondary" size="lg">
            Explore programs
          </ButtonLink>
        </div>
        <ul className="flex flex-col gap-2 text-body text-muted-foreground md:flex-row md:gap-6">
          <li className="inline-flex items-center gap-2">
            <Check aria-hidden="true" size={16} strokeWidth={2.4} className="shrink-0 text-ok" />
            Free for students
          </li>
          <li className="inline-flex items-center gap-2">
            <Check aria-hidden="true" size={16} strokeWidth={2.4} className="shrink-0 text-ok" />
            Universities in {COUNTRY_GUIDES.length} countries
          </li>
        </ul>
      </div>
      <MatchesPreview />
    </section>
  )
}

function Steps() {
  return (
    // Today's page has the anchor, so a link to /#how-it-works keeps working
    <section
      id="how-it-works"
      aria-labelledby="home-steps"
      className="border-y border-border bg-card"
    >
      <div className={cn(container, 'flex flex-col gap-8 py-14 md:gap-12 md:py-22')}>
        <div className={sectionHead}>
          <h2 id="home-steps" className="text-display-l">
            Your matches in three steps
          </h2>
          <p className="text-body-l text-muted-foreground">
            Sign in with Google or an email link, then tell us three things. Each step is saved as
            you go.
          </p>
        </div>
        <ol className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-2.5 border-t-2 border-current pt-5">
              <span
                aria-hidden="true"
                className={cn(serifFigure, 'text-[2.5rem]/11 text-primary tabular-nums')}
              >
                {i + 1}
              </span>
              <h3 className="text-h3">{step.title}</h3>
              <p className="text-body text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function IbPoints() {
  return (
    <section
      aria-labelledby="home-ib"
      className={cn(container, 'flex flex-col gap-8 py-14 md:gap-12 md:py-24')}
    >
      <div className={sectionHead}>
        <h2 id="home-ib" className="text-display-l">
          Built for the IB Diploma
        </h2>
        <p className="text-body-l text-muted-foreground">
          Generic university search tools don’t understand the details of the IB. IB Match is built
          around them.
        </p>
      </div>
      <ul className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {IB_POINTS.map((point) => (
          <li key={point.title} className="flex flex-col gap-2.5 border-t border-line-2 pt-5">
            <h3 className="feature-title text-h3">{point.title}</h3>
            <p className="feature-description text-body text-muted-foreground">{point.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Guides() {
  return (
    <section aria-labelledby="home-guides" className="border-y border-border bg-card">
      <div className={cn(container, 'flex flex-col gap-6 py-14 md:gap-8 md:py-20')}>
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between md:gap-6">
          <div className={sectionHead}>
            <h2 id="home-guides" className="text-display-l">
              Country guides
            </h2>
            <p className="text-body-l text-muted-foreground">
              How universities in each country read the IB Diploma, for 2027 entry.
            </p>
          </div>
          <GuidesHubLink />
        </div>
        <GuideLinks />
      </div>
    </section>
  )
}

function FounderNote() {
  return (
    <section
      aria-labelledby="home-founder"
      className={cn(
        container,
        'flex flex-col gap-8 py-14 md:py-24 lg:grid lg:grid-cols-[minmax(0,1fr)_22.5rem] lg:items-end lg:gap-24'
      )}
    >
      <div className="flex min-w-0 flex-col gap-5">
        <h2 id="home-founder" className="text-display-l">
          A note from the founder
        </h2>
        <span
          aria-hidden="true"
          className={cn(serifFigure, 'block h-10 text-[4.5rem]/[4.5rem] text-primary')}
        >
          “
        </span>
        <p className="text-body-l text-foreground md:text-[1.25rem]/8">
          I started IB Match because I remember how overwhelming the university search was during my
          own IB years. Generic search tools didn’t understand that my HL Physics meant something
          different than just “Physics”. I wanted to create the tool I wished I had.
        </p>
        <p className="text-body-l text-muted-foreground">
          We’re still growing our database and improving every day. If you don’t find your perfect
          match yet, check back soon, or tell us which universities you’d like to see added.
        </p>
        <p className="text-body">
          <strong className="font-semibold">Tal</strong>
          <span className="text-muted-foreground">, IB Diploma graduate</span>
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 rounded-card border border-border bg-card px-6 py-5">
          <p className="text-h3">Free for students</p>
          <p className="text-body text-muted-foreground">
            We have no plans to charge students. There is nothing to pay to see your matches.
          </p>
        </div>
        <div className="flex flex-col gap-1 rounded-card border border-border bg-card px-6 py-5">
          <p className="text-h3">New programs added regularly</p>
          <p className="text-body text-muted-foreground">
            Missing a university?{' '}
            <Link
              href="/contact"
              className="rounded-chip font-semibold text-primary underline underline-offset-3 transition-colors duration-180 ease-standard hover:text-brand-hover pressed:text-brand-ink pressed:underline"
            >
              Tell us which one
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

function FinalBand() {
  return (
    <LimeBand
      id="home-cta"
      heading="Ready to find your match?"
      explore={{ href: '/programs/search', label: 'Explore programs' }}
    >
      <p className="text-body-l">
        Browse programs freely, then sign in for matches built from your IB profile, and keep the
        ones you like on your shortlist.
      </p>
    </LimeBand>
  )
}
