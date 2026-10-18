import Link from 'next/link'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { buttonBase } from '@/components/ds/button-variants'
import { MatchesPreview } from '@/components/home/MatchesPreview'
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
          Built by a former IB student who wished this existed
        </p>
        <h1 className="text-display-xl">
          Find your perfect{' '}
          {/* A lime bar under the letters, not a marker behind them: light letters on lime
              are 1.1:1 in dark (04-design-system.md §1) */}
          <span className="lime-bar">university match</span>
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
            Free for students, always
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
          <Link
            href="/ib-university-requirements"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-chip text-body font-semibold text-primary underline-offset-3 transition-colors duration-180 ease-standard hover:text-brand-hover hover:underline"
          >
            IB rules by country
            <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {COUNTRY_GUIDES.map((guide) => (
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
          I built IB Match because I remember how overwhelming the university search was during my
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
            Always: there is nothing to pay to see your matches.
          </p>
        </div>
        <div className="flex flex-col gap-1 rounded-card border border-border bg-card px-6 py-5">
          <p className="text-h3">New programs added regularly</p>
          <p className="text-body text-muted-foreground">
            Missing a university?{' '}
            <Link
              href="/contact"
              className="rounded-chip font-semibold text-primary underline underline-offset-3 transition-colors duration-180 ease-standard hover:text-brand-hover"
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

/*
 * The lime band is lime in both themes, with ink words. Dark's brand button would be 2.1:1 on it,
 * so the action is an ink button, and the focus outline is ink too. In forced colours the band
 * turns to the system's background, and its transparent edges are drawn.
 */
const onLimeButton = cn(buttonBase, 'h-13 gap-2.5 px-6 text-body-l focus-visible:outline-on-lime')

function FinalBand() {
  return (
    <section
      aria-labelledby="home-cta"
      className="border-y border-transparent bg-lime text-on-lime"
    >
      <div
        className={cn(
          container,
          'flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between md:gap-12 md:py-20'
        )}
      >
        <div className="flex max-w-160 flex-col gap-3.5">
          <h2 id="home-cta" className="text-display-l">
            Ready to find your match?
          </h2>
          <p className="text-body-l">
            Browse programs freely, then sign in for matches built from your IB profile, and keep
            the ones you like on your shortlist.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2.5 md:flex-row md:gap-3">
          <Link
            href="/student"
            className={cn(
              onLimeButton,
              // A transparent edge, which forced colours draw
              'border-transparent bg-on-lime font-semibold text-on-ink hover:opacity-80'
            )}
          >
            Get my matches
            <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
          </Link>
          <Link
            href="/programs/search"
            className={cn(
              onLimeButton,
              'border-current bg-transparent font-medium text-on-lime underline-offset-3 hover:underline'
            )}
          >
            Explore programs
          </Link>
        </div>
      </div>
    </section>
  )
}
