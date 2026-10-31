import {
  ArrowRight,
  CalendarClock,
  Coffee,
  ExternalLink,
  Heart,
  Mail,
  Search,
  Server,
  Zap,
  type LucideIcon
} from 'lucide-react'
import { buttonVariants } from '@/components/ds/button-variants'
import { ExternalAnchor } from '@/components/guide/RichText'
import { LimeBand, onLimeInkButton } from '@/components/home/LimeBand'
import { inlineLinkClass } from '@/components/sign-in/AuthPage'
import { ProgramSuggestion } from '@/components/support/islands'
import { CardGrid, SmallTile, TextHero, TextSection } from '@/components/text-page/TextPage'
import { cn } from '@/lib/utils'

/*
 * Support us in the new design (rebranding 4.3, boards "D4.14 Text pages" and "… · phone",
 * approved 19 October 2026): every section of today's page, in its words with the content style
 * applied (sentence case, no exclamation marks, no emoji, no "perfect"). Ko-fi, Calendly and every
 * outside link say they open a new tab. Prebuilt; the metadata and JSON-LD stay in page.tsx.
 *
 * Wording settled in the legal review (docs/legal-review/claims.md, MAINT 7.4): no "where your
 * support goes" split, "covers…" lines, "most popular" tier, "non-profit", "non-commercial",
 * "forever" or "100%", because none of them was true or checkable.
 */

const KOFI = 'https://ko-fi.com/ibmatch'

/** Said to a screen reader after an outside link's words */
function NewTab() {
  return <span className="sr-only"> (opens in a new tab)</span>
}

const AUDIENCES: {
  title: string
  icon: LucideIcon
  text: string
  cta: string
  href: string
  external: boolean
}[] = [
  {
    title: 'Students',
    icon: Coffee,
    text: 'We keep IB Match completely free for you. If the platform helped you find your path, consider buying us a coffee as a thank you.',
    cta: 'Every coffee counts',
    href: KOFI,
    external: true
  },
  {
    title: 'IB Coordinators',
    icon: CalendarClock,
    text: 'Your schools use our platform to guide students through university selection. Help us grow our database and build features that support your work.',
    cta: 'Schedule a call with us',
    href: 'https://calendly.com/ibmatch/feedback-call-with-ib-coordinator',
    external: true
  },
  {
    title: 'Universities',
    icon: Mail,
    text: 'Invest in the next generation of students. Partner with us or sponsor development to help students discover your programs.',
    cta: 'Contact us for partnerships',
    href: 'mailto:support@ibmatch.com',
    external: false
  }
]

const TIERS = [
  { amount: '$5', label: 'Buy us a coffee' },
  { amount: '$15', label: 'Show your love' },
  { amount: '$50', label: 'Fuel our growth' }
]

const card =
  'flex h-full flex-col rounded-card border bg-card p-5 text-foreground transition-colors duration-180 ease-standard hover:bg-muted'

export function NewSupportUs() {
  return (
    <main>
      <article>
        <TextHero
          eyebrow="Community-powered project"
          title="Help us keep IB Match free for all students"
          intro="IB Match was started by Tal, an IB Diploma graduate, and is built together with Pavel. It is free for students, and we have no plans to charge them. Your support helps pay for hosting, the database, search and email."
          ticks={['Free for students', 'An independent project']}
          actions={
            <a
              href={KOFI}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: 'lg', className: 'max-md:w-full' })}
            >
              Support on Ko-fi
              <NewTab />
              <ExternalLink aria-hidden="true" size={18} strokeWidth={2} />
            </a>
          }
        />

        <TextSection
          id="why"
          eyebrow="Why support us?"
          title="An independent project with real costs"
          intro="We don’t show ads, sell your data, or charge students. Schools can subscribe to extra coordinator features. Running a platform that serves students worldwide still comes with real expenses."
        >
          <CardGrid
            columns={4}
            cards={[
              {
                icon: Server,
                title: 'Infrastructure costs',
                text: 'Hosting, databases, and CDN services cost money. As our user base grows, so do these costs.'
              },
              {
                icon: Search,
                title: 'Search & matching',
                text: 'Our matching algorithm and search APIs require ongoing investment to give students fast results.'
              },
              {
                icon: Zap,
                title: 'Continuous improvement',
                text: 'We’re constantly adding new universities, improving the algorithm, and building features you request.'
              },
              {
                icon: Heart,
                title: 'Free for students',
                text: 'We believe every IB student deserves access to quality university guidance, regardless of their financial situation.'
              }
            ]}
          />
        </TextSection>

        <TextSection
          id="who"
          eyebrow="Who can help?"
          title="Support comes in many forms"
          intro="Whether you’re a student who found your match, a coordinator guiding the next generation, or a university looking to connect with IB talent — there’s a way for you to help."
        >
          <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
            {AUDIENCES.map(({ title, icon, text, cta, href, external }) => (
              <li key={title}>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className={cn(card, 'gap-2.5 border-border')}
                >
                  <SmallTile icon={icon} />
                  <h3 className="text-h3">{title}</h3>
                  <p className="text-body text-muted-foreground">{text}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-body font-semibold text-primary">
                    {cta}
                    {external ? (
                      <>
                        <ExternalLink aria-hidden="true" size={16} strokeWidth={2} />
                        <NewTab />
                      </>
                    ) : (
                      <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </TextSection>

        <TextSection
          id="suggest"
          eyebrow="Help us grow"
          title="Suggest a program"
          intro="Know a university program that should be on IB Match? Tell us about it. Your suggestion helps other IB students discover more opportunities."
        >
          <ProgramSuggestion />
          <p className="max-w-180 text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">Community-powered:</strong> your
            recommendation could help other IB students find programs that fit them.
          </p>
        </TextSection>

        <TextSection
          id="give"
          eyebrow="Make a difference"
          title="Choose your level of support"
          intro="Donations help pay for hosting, the database, search and email. Every amount helps."
        >
          <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
            {TIERS.map(({ amount, label }) => (
              <li key={amount}>
                <a
                  href={KOFI}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(card, 'gap-1.5 border-border')}
                >
                  <span className="font-[family-name:var(--font-newsreader)] text-[2.125rem] leading-10 font-medium tabular-nums">
                    {amount}
                  </span>
                  <span className="text-h3">{label}</span>
                  <NewTab />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex max-w-210 flex-col gap-1.5 rounded-card border border-border bg-card p-5">
            <h3 className="text-h3">Become a monthly supporter</h3>
            <p className="text-body text-muted-foreground">
              Monthly donations help us plan ahead and build new features with confidence.
            </p>
            <p className="mt-1 text-body">
              <ExternalAnchor
                href={KOFI}
                label="Set up monthly support on Ko-fi"
                className="font-semibold"
              />
            </p>
          </div>
          <p className="text-body text-muted-foreground">
            For sponsorship or partnership inquiries, contact us at{' '}
            <a href="mailto:support@ibmatch.com" className={inlineLinkClass}>
              support@ibmatch.com
            </a>
            .
          </p>
        </TextSection>
      </article>

      <LimeBand
        id="support-cta"
        heading="Every contribution makes a difference"
        actions={
          <a href={KOFI} target="_blank" rel="noopener noreferrer" className={onLimeInkButton}>
            Support on Ko-fi
            <NewTab />
            <ExternalLink aria-hidden="true" size={18} strokeWidth={2} />
          </a>
        }
      >
        <p className="text-body-l">
          Thank you for considering supporting IB Match. Together, we’re helping IB students around
          the world find the right university.
        </p>
        <p className="text-body">Can’t donate? Share IB Match with a friend who might need it.</p>
      </LimeBand>
    </main>
  )
}
