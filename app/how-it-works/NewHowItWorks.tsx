import { BookOpen, Funnel, Globe, GraduationCap, Lock } from 'lucide-react'
import { StatusBadge, type MatchStatus } from '@/components/ds/StatusBadge'
import { LimeBand } from '@/components/home/LimeBand'
import { CardGrid, PlainList, TextHero, TextSection } from '@/components/text-page/TextPage'

/*
 * How it works in the new design (rebranding 4.3, boards "D4.14 Text pages" and "… · phone",
 * approved 19 October 2026): today's words in sentence case, on the text-page template. It
 * describes what the new design shows: today's "Match categories" (Safety, Match, Reach,
 * Unlikely) are the V10 categories the new design dropped, so they become "What each status
 * means", in D2.7's badges, defined as the cards decide them (04 §9). "f(x) = result" stays, in
 * Geist: Geist Mono goes with NoAISection.tsx. Prebuilt, and no JavaScript of its own; the
 * metadata and JSON-LD stay in page.tsx.
 */

const WEIGHTS = [
  {
    name: 'Academic match',
    weight: '60%',
    text: 'How well your IB points and subjects meet program requirements'
  },
  {
    name: 'Location match',
    weight: '30%',
    text: 'Whether the program is in one of your preferred countries'
  },
  {
    name: 'Field match',
    weight: '10%',
    text: 'Whether the program is in one of your preferred study areas'
  }
]

const STATUSES: { status: MatchStatus; label: string; text: string }[] = [
  {
    status: 'meets',
    label: 'Meets all requirements',
    text: 'Your points, and every subject and grade the program names.'
  },
  {
    status: 'close',
    label: 'Within reach',
    text: 'Up to 3 points short, one subject a grade short, or both.'
  },
  {
    status: 'gap',
    label: 'Missing a requirement',
    text: 'A subject you don’t take, a subject at SL where HL is needed, a grade 2 or more short, or 4 or more points short.'
  }
]

const listPanel = 'rounded-card border border-border bg-card'
const listRow = 'px-5 py-3.5 not-first:border-t not-first:border-border'

export function NewHowItWorks() {
  return (
    <main>
      <article>
        <TextHero
          eyebrow="Under the hood"
          title="Built smart, engineered for IB"
          intro="Curious how we match you with university programs? Here’s a peek behind the curtain at the technology that powers your personalized recommendations."
          ticks={['Fast, accurate matching', 'Transparent algorithm', 'Privacy-first design']}
        />

        <TextSection
          id="database"
          eyebrow="Program database"
          title="1,000+ programs, instant results"
          intro="We maintain a growing database of university programs from around the world, each with detailed IB-specific admission requirements. Search through them all in milliseconds."
        >
          <CardGrid
            columns={4}
            cards={[
              {
                title: 'Curated program data',
                text: 'Each program lists its IB requirements in the same format — minimum points, required subjects, and grade thresholds — so programs are easy to compare.'
              },
              {
                title: 'Blazing fast search',
                text: 'Powered by Algolia, the same search infrastructure used by Stripe, Slack, and Medium. Results in under 50 milliseconds.'
              },
              {
                title: 'Typo tolerance',
                text: 'Misspell “psychology” as “psycology”? No problem. Our search understands what you mean and finds the right programs.'
              },
              {
                title: 'Real-time sync',
                text: 'When we add new programs or update requirements, your search results update instantly.'
              }
            ]}
          />
        </TextSection>

        <TextSection
          id="engine"
          eyebrow="Matching engine"
          title="Three-factor compatibility scoring"
          intro="Every program gets a fit score from 0 to 100%, from a weighted formula that puts what matters most first: your academic fit. Your matches are grouped by status, which says whether you meet each requirement; the score orders programs within each group, and you’ll find it under “Why this match”."
        >
          <div className="grid items-start gap-7 lg:grid-cols-2 lg:gap-8">
            <div className="flex min-w-0 flex-col gap-3">
              <h3 className="text-h3">How we score</h3>
              <ul className={listPanel}>
                {WEIGHTS.map(({ name, weight, text }) => (
                  <li
                    key={name}
                    className={`${listRow} grid grid-cols-[minmax(0,1fr)_auto] gap-x-4`}
                  >
                    <span className="flex flex-col text-[0.9375rem] leading-[1.375rem]">
                      <span className="font-semibold">{name}</span>
                      <span className="text-muted-foreground">{text}</span>
                    </span>
                    <span className="text-[1.25rem] leading-7 font-semibold tabular-nums">
                      {weight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <h3 className="text-h3">What each status means</h3>
              <p className="text-body text-muted-foreground">
                Each match shows one, from your subjects, grades and points:
              </p>
              <ul className={listPanel}>
                {STATUSES.map(({ status, label, text }) => (
                  <li
                    key={status}
                    className={`${listRow} flex flex-col gap-2 md:flex-row md:items-start md:gap-4`}
                  >
                    <span className="md:w-54 md:shrink-0">
                      <StatusBadge status={status} className="whitespace-nowrap">
                        {label}
                      </StatusBadge>
                    </span>
                    <span className="text-body">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-h3">What we check</h3>
            <PlainList
              items={[
                'Total IB points vs minimum requirements',
                'HL/SL subject matches with grade thresholds',
                'Critical subject requirements (must-haves)',
                'Near-miss detection for close matches'
              ]}
            />
          </div>
        </TextSection>

        <TextSection
          id="filters"
          eyebrow="Filter system"
          title="Find exactly what you’re looking for"
          intro="Not sure where to start? Use our filters to narrow down programs by location, field of study, and IB requirements. The more specific you are, the better your matches."
        >
          <CardGrid
            columns={4}
            cards={[
              {
                icon: Globe,
                title: 'Countries',
                text: 'From the UK to Canada, Netherlands to Australia — find programs in your dream destinations.'
              },
              {
                icon: BookOpen,
                title: 'Fields of study',
                text: 'Engineering, Medicine, Business, Arts, Sciences — we cover all major academic disciplines.'
              },
              {
                icon: GraduationCap,
                title: 'IB points range',
                text: 'Filter by minimum IB points required. Find programs that match your predicted or final scores.'
              },
              {
                icon: Funnel,
                title: 'Smart combinations',
                text: 'All filters work together. Study Medicine in Canada? Engineering in the UK? Just select and search.'
              }
            ]}
          />
        </TextSection>

        <TextSection
          id="stack"
          eyebrow="Technology stack"
          title="Built with industry-leading tools"
          intro="We use the same technologies trusted by the world’s best companies. This means fast, reliable, and secure experiences for every student."
        >
          <CardGrid
            columns={3}
            cards={[
              {
                title: 'Next.js 16',
                text: 'Modern React framework for lightning-fast page loads and smooth navigation.'
              },
              {
                title: 'PostgreSQL',
                text: 'Enterprise-grade database trusted by companies like Instagram and Spotify.'
              },
              {
                title: 'Algolia Search',
                text: 'Industry-leading search infrastructure — the same tech behind Stripe and Slack.'
              },
              {
                title: 'Redis Caching',
                text: 'In-memory data store for instant results. Your matches load in milliseconds.'
              },
              {
                title: 'Global Edge Network',
                text: 'Deployed worldwide for low latency. Fast access wherever you are.'
              },
              {
                title: 'GDPR Compliant',
                text: 'Privacy-first design. Your data is encrypted, protected, and never sold.'
              }
            ]}
          />
          <p className="flex items-center gap-2.5 text-body text-muted-foreground">
            <Lock aria-hidden="true" size={18} strokeWidth={1.75} className="shrink-0" />
            Your data is encrypted at rest and in transit
          </p>
        </TextSection>

        <TextSection
          id="no-ai"
          eyebrow="f(x) = result"
          title="No AI. Just good old-fashioned math."
          intro={
            <>
              While everyone’s training LLMs and chasing the AI hype, we’re doing something
              different: <strong className="font-semibold text-foreground">math that works</strong>.
              Our matching algorithm is deterministic, transparent, and explainable.
            </>
          }
          surface
        >
          <CardGrid
            columns={4}
            onPaper
            cards={[
              {
                title: 'Deterministic results',
                text: 'Same input always gives the same output. No randomness, no surprises.'
              },
              {
                title: 'Fully explainable',
                text: 'Every match can be explained step-by-step. See exactly why you got each score.'
              },
              {
                title: 'No black boxes',
                text: 'Our algorithm is rules-based, not a neural network. Predictable and trustworthy.'
              },
              {
                title: 'No hallucinations',
                text: 'AI can make things up. Math doesn’t. Your matches are based on real data.'
              }
            ]}
          />
          {/* Set like Home's founder note (D4.1) */}
          <figure className="flex max-w-180 flex-col gap-3 rounded-card border border-border bg-background p-5 md:px-8 md:py-7">
            <span
              aria-hidden="true"
              className="block h-10 font-[family-name:var(--font-newsreader)] text-[4.5rem]/[4.5rem] font-medium text-primary"
            >
              “
            </span>
            <blockquote>
              <p className="font-[family-name:var(--font-newsreader)] text-[1.375rem]/[1.875rem] font-medium md:text-[1.625rem]/[2.125rem]">
                We believe students deserve to understand <em>why</em> they got matched with a
                program. Not ‘the AI thinks so’ — but clear, logical reasons they can verify
                themselves.
              </p>
            </blockquote>
            <figcaption className="text-body text-muted-foreground">— The IB Match Team</figcaption>
          </figure>
        </TextSection>
      </article>

      <LimeBand
        id="how-it-works-cta"
        heading="Ready to find your match?"
        explore={{ href: '/programs/search', label: 'Explore programs' }}
      >
        <p className="text-body-l">
          Now that you know how it works, why not give it a try? Enter your IB profile and discover
          programs that fit you.
        </p>
        <p className="text-body">100% free for students. No credit card required.</p>
      </LimeBand>
    </main>
  )
}
