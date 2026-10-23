import Link from 'next/link'
import { ArrowRight, ChartColumn, ExternalLink, FileText, Info, Mail, Users } from 'lucide-react'
import { Callout } from '@/components/ds/Callout'
import { buttonVariants } from '@/components/ds/button-variants'
import { LimeBand, onLimeInkButton } from '@/components/home/LimeBand'
import { textLinkClass } from '@/components/sign-in/AuthPage'
import { CardGrid, PlainList, TextHero, TextSection } from '@/components/text-page/TextPage'
import { cn } from '@/lib/utils'

/*
 * For schools in the new design (rebranding 4.3, boards "D4.17 For schools" and "… · phone",
 * approved 19 October 2026): today's words with the content style applied (sentence case, one
 * label for the one call), on the text-page template. The illustration goes. "Sign in to the
 * coordinator portal" sits beside the call, a plain link, so the page stays prebuilt with no
 * read. Everything but the band is in an <article> and the four descriptions carry
 * .feature-description, so the JSON-LD's speakable selectors in page.tsx find text.
 */

const CALENDLY = 'https://calendly.com/ibmatch/feedback-call-with-ib-coordinator'
const CALL = 'Schedule a 15-minute call'

/** Said to a screen reader after an outside link's words */
function NewTab() {
  return <span className="sr-only"> (opens in a new tab)</span>
}

const BENEFITS = [
  'Empowers students to self-serve university research using IB-specific criteria',
  'Reduces your workload by automating initial university matching',
  'Provides students with clear IB-based admission requirements',
  'Lets you focus on high-touch guidance and mental health support'
]

export function NewForCoordinators() {
  return (
    <main>
      <article>
        <TextHero
          eyebrow="Partner with us"
          title="Help your students navigate university admissions with confidence"
          intro="As an IB coordinator, you understand the unique challenges your students face. IB Match provides IB-specific university matching that speaks their language—HL, SL, predicted grades, and all."
          actions={
            <>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: 'lg', className: 'max-md:w-full' })}
              >
                {CALL}
                <NewTab />
                <ExternalLink aria-hidden="true" size={18} strokeWidth={2} />
              </a>
              <Link
                href="/auth/coordinator"
                className={cn(
                  textLinkClass,
                  'inline-flex min-h-11 items-center gap-1.5 text-body no-underline hover:underline max-md:self-start'
                )}
              >
                Sign in to the coordinator portal
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
              </Link>
            </>
          }
        />

        <TextSection
          id="story"
          title="Started by a former IB student who understands your challenges"
        >
          <div className="flex max-w-180 flex-col gap-5 text-body-l">
            <p className="text-muted-foreground">
              IB Match was started by Tal, an IB Diploma graduate who lived through the IB
              experience: the stress of predicting grades, the confusion of translating IB scores to
              university requirements, and the overwhelming task of finding the right programs. It
              is built together with Pavel.
            </p>
            <p className="text-muted-foreground">
              Now, as we build this platform, we keep both sides in mind: the student stress and
              your coordinator workload. Whether you’re managing 25 or 80 IB students, providing
              quality individual university guidance is time-intensive work.
            </p>
            <p className="font-medium">
              That’s why we want to build IB Match with coordinators as partners, not just users.
              We’re looking for coordinators who will tell us what would help.
            </p>
          </div>
        </TextSection>

        <TextSection
          id="why"
          eyebrow="Why partner with us?"
          title="Managing university guidance shouldn’t be another overwhelming task"
        >
          <div className="grid items-start gap-8">
            <div className="flex max-w-180 min-w-0 flex-col gap-4">
              <h3 className="text-h3">How IB Match helps</h3>
              <PlainList items={BENEFITS} large />
              <div className="pt-2">
                <Callout
                  icon={<Info size={20} strokeWidth={2} aria-hidden="true" />}
                  label="Note"
                  tone="note"
                >
                  <strong className="font-semibold">
                    We need coordinator expertise to build this right.
                  </strong>{' '}
                  We’re looking for experienced IB coordinators to become early partners. Your
                  insights will directly shape our platform.
                </Callout>
              </div>
            </div>
          </div>
        </TextSection>

        <TextSection
          id="dashboard"
          title="Coordinator dashboard"
          intro="The coordinator portal gives you a view of your school’s students and what they’re exploring."
        >
          <CardGrid
            columns={4}
            textClassName="feature-description"
            cards={[
              {
                icon: ChartColumn,
                title: 'School-level analytics',
                text: 'Understand student university interests and trends at a glance. Advanced analytics are on paid and VIP plans.'
              },
              {
                icon: Users,
                title: 'Student overview',
                text: 'See each linked student’s profile, matches and saved programs.'
              },
              {
                icon: Mail,
                title: 'Student invitations',
                text: 'Invite students by email and see who hasn’t accepted yet.'
              },
              {
                icon: FileText,
                title: 'Data export',
                text: 'Export your student list as a CSV (paid or VIP plan).'
              }
            ]}
          />
          <Callout
            icon={<Info size={20} strokeWidth={2} aria-hidden="true" />}
            label="Note"
            tone="note"
            className="max-w-210"
          >
            <strong className="font-semibold">Early adopter benefit:</strong> Early adopter schools
            get full access at no cost. Any school can link up to 10 students for free.
          </Callout>
        </TextSection>
      </article>

      <LimeBand
        id="coordinator-cta"
        heading="Ready to help shape IB Match?"
        actions={
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={onLimeInkButton}>
            {CALL}
            <NewTab />
            <ExternalLink aria-hidden="true" size={18} strokeWidth={2} />
          </a>
        }
      >
        <p className="text-body-l">
          We’re looking for experienced coordinators to provide feedback and help us build features
          that actually solve your challenges.
        </p>
      </LimeBand>
    </main>
  )
}
