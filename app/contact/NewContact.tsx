import Link from 'next/link'
import { Lock, Mail } from 'lucide-react'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { EmptyState } from '@/components/ds/EmptyState'
import { ContactForm } from '@/components/contact/islands'
import { inlineLinkClass, textLinkClass } from '@/components/sign-in/AuthPage'
import { TextBody, TextHero } from '@/components/text-page/TextPage'

/*
 * Contact in the new design (rebranding 4.3, boards "D4.14 Text pages" and "… · phone", approved
 * 19 October 2026): the form in a 720px panel with the other ways to reach us beside it, under the
 * chrome its layout draws from the session. Signed out, "Sign in to contact us", whose Sign in
 * returns here. The same reads as today: the session and the student's name.
 */
export function NewContact({ signedIn, userName }: { signedIn: boolean; userName: string | null }) {
  return (
    <>
      <TextHero title="Contact us" intro="Have a question or need help? We’re here for you." />
      <TextBody>
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[45rem_minmax(0,1fr)] lg:items-start lg:gap-x-20">
          {signedIn ? (
            <ContactForm userName={userName} />
          ) : (
            <EmptyState
              icon={Lock}
              tone="brand"
              title="Sign in to contact us"
              live={false}
              actions={
                <ButtonLink href={`/auth/signin?callbackUrl=${encodeURIComponent('/contact')}`}>
                  Sign in
                </ButtonLink>
              }
            >
              <p>
                Please sign in to submit a support request. This helps us respond to you more
                quickly.
              </p>
              <p className="mt-1 text-small font-normal">
                Or email us directly at{' '}
                <a href="mailto:support@ibmatch.com" className={inlineLinkClass}>
                  support@ibmatch.com
                </a>
                .
              </p>
            </EmptyState>
          )}
          <aside aria-labelledby="other-ways" className="flex flex-col gap-2.5 lg:sticky lg:top-24">
            <h2 id="other-ways" className="text-h3">
              Other ways to reach us
            </h2>
            <p className="flex items-center gap-2.5 text-body">
              <Mail
                aria-hidden="true"
                size={18}
                strokeWidth={1.75}
                className="shrink-0 text-muted-foreground"
              />
              <a href="mailto:support@ibmatch.com" className={textLinkClass}>
                support@ibmatch.com
              </a>
            </p>
            <p className="text-body text-muted-foreground">
              Check our{' '}
              <Link href="/faqs" className={textLinkClass}>
                FAQs
              </Link>{' '}
              for quick answers to common questions.
            </p>
          </aside>
        </div>
      </TextBody>
    </>
  )
}
