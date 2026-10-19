import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  CalendarClock,
  Coffee,
  ExternalLink,
  Heart,
  Info,
  Mail,
  Search,
  Server,
  Zap,
  type LucideIcon
} from 'lucide-react'
import { Callout } from '@/components/ds/Callout'
import { buttonVariants } from '@/components/ds/button-variants'
import { ExternalAnchor } from '@/components/guide/RichText'
import { LimeBand, onLimeInkButton } from '@/components/home/LimeBand'
import { inlineLinkClass, textLinkClass } from '@/components/sign-in/AuthPage'
import { ProgramSuggestion } from '@/components/support/islands'
import { CardGrid, SmallTile, TextHero, TextSection } from '@/components/text-page/TextPage'
import { cn } from '@/lib/utils'

/*
 * Support us in the new design (rebranding 4.3, boards "D4.14 Text pages" and "… · phone",
 * approved 19 October 2026): every section of today's page, in its words with the content style
 * applied (sentence case, no exclamation marks, no emoji, no "perfect"). The allocation is a list
 * of bars in one colour with each share written beside it, so it reads without colour. Ko-fi,
 * Calendly and every outside link say they open a new tab. Prebuilt; the metadata and JSON-LD
 * stay in page.tsx.
 */

const KOFI = 'https://ko-fi.com/ibmatch'

/** Said to a screen reader after an outside link's words */
function NewTab() {
  return <span className="sr-only"> (opens in a new tab)</span>
}

const ALLOCATION = [
  { name: 'Infrastructure', text: 'Hosting, databases, CDN', share: 60 },
  { name: 'Search & APIs', text: 'Algolia, matching engine', share: 20 },
  { name: 'Development', text: 'Features, improvements', share: 15 },
  { name: 'Growth', text: 'Outreach, new universities', share: 5 }
]

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
    href: 'mailto:universities@ibmatch.com',
    external: false
  }
]

const TIERS = [
  { amount: '$5', label: 'Buy us a coffee', impact: 'Covers 1 week of email service' },
  {
    amount: '$15',
    label: 'Show your love',
    impact: 'Covers 1 month of search API',
    featured: true
  },
  { amount: '$50', label: 'Fuel our growth', impact: 'Helps add 10 new university programs' }
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
          intro="IB Match was built by an IB graduate who wished this tool existed. We’re committed to keeping it free for students — forever. Your support helps us cover infrastructure costs and continue improving the platform."
          ticks={['100% goes to platform costs', 'Non-commercial project']}
          actions={
            <>
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
              <Link
                href="#how-funds-are-used"
                className={cn(
                  textLinkClass,
                  'inline-flex min-h-11 items-center gap-1.5 self-start no-underline hover:underline'
                )}
              >
                See how funds are used
                <ArrowDown aria-hidden="true" size={16} strokeWidth={2} />
              </Link>
            </>
          }
        />

        <TextSection
          id="why"
          eyebrow="Why support us?"
          title="A non-commercial project with real costs"
          intro="IB Match is built with love, not profit motives. We don’t show ads, sell your data, or charge students. But running a platform that serves students worldwide comes with real expenses."
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
                text: 'Our matching algorithm and search APIs require ongoing investment to deliver instant results for students.'
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
          id="how-funds-are-used"
          eyebrow="Transparency"
          title="Where your support goes"
          intro="We believe in complete transparency. Here’s how donations are allocated to keep IB Match running and growing."
        >
          <ul
            aria-label="Where donations go"
            className="max-w-210 rounded-card border border-border bg-card"
          >
            {ALLOCATION.map(({ name, text, share }) => (
              <li
                key={name}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-5 py-3.5 not-first:border-t not-first:border-border md:grid-cols-[12.5rem_minmax(0,1fr)_3.5rem]"
              >
                <span className="flex flex-col">
                  <span className="text-[0.9375rem] leading-[1.375rem] font-semibold">{name}</span>
                  <span className="text-small font-normal text-muted-foreground">{text}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="col-span-2 row-start-2 h-3 overflow-hidden rounded-[0.375rem] border border-transparent bg-border md:col-span-1 md:col-start-2 md:row-start-1"
                >
                  <span
                    className="block h-full rounded-[0.375rem] bg-primary forced-colors:bg-[Highlight]"
                    style={{ width: `${share}%` }}
                  />
                </span>
                <span className="text-right text-[1.0625rem] leading-6 font-semibold tabular-nums md:col-start-3">
                  {share}%
                </span>
              </li>
            ))}
          </ul>
          <Callout
            icon={<Info size={20} strokeWidth={2} aria-hidden="true" />}
            label="Note"
            tone="note"
            className="max-w-210"
          >
            <strong className="font-semibold">Our commitment:</strong> We’re a non-profit
            initiative. No salaries, no fancy offices — just students helping students. Every
            donation goes directly to keeping the platform alive and free.
          </Callout>
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
          intro="Every contribution, no matter the size, helps us maintain and improve IB Match for students around the world."
        >
          <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
            {TIERS.map(({ amount, label, impact, featured }) => (
              <li key={amount}>
                <a
                  href={KOFI}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(card, 'gap-1.5', featured ? 'border-primary' : 'border-border')}
                >
                  {featured && (
                    <span className="inline-flex min-h-6 items-center self-start rounded-chip border border-transparent bg-brand-soft px-2 text-[0.75rem] leading-[1.125rem] font-semibold text-brand-ink">
                      Most popular
                    </span>
                  )}
                  <span className="font-[family-name:var(--font-newsreader)] text-[2.125rem] leading-10 font-medium tabular-nums">
                    {amount}
                  </span>
                  <span className="text-h3">{label}</span>
                  <span className="text-body text-muted-foreground">{impact}</span>
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
            <a href="mailto:universities@ibmatch.com" className={inlineLinkClass}>
              universities@ibmatch.com
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
