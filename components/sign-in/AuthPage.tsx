import type { ReactNode, Ref } from 'react'
import Link from 'next/link'
import { CircleAlert } from 'lucide-react'
import { SiteLogo } from '@/components/site/SiteLogo'
import { cn } from '@/lib/utils'

/*
 * The pages under /auth in the new design (rebranding 4.3, boards "D4.2 Sign-in" and "D4.16 School
 * invitation", approved 19 October 2026): no site header, the logo, a link Home, above one card on
 * the paper. /auth draws its own chrome (D2.12) and the cookie banner stays off it (4.1). Not a
 * client module: the server pages and the client cards share these parts.
 */

export function AuthPage({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col items-center gap-5 bg-background px-4 pt-5 pb-10 md:gap-8 md:px-6 md:pt-14 md:pb-18">
      <SiteLogo href="/" label="IB Match home" />
      {children}
    </main>
  )
}

/** One card: 440px for sign-in, 520px for an invitation's consent text. Its h1 names it. */
export function AuthCard({
  labelledBy,
  wide = false,
  children
}: {
  labelledBy?: string
  wide?: boolean
  children: ReactNode
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn(
        'flex w-full flex-col gap-5 rounded-[1.25rem] border border-border bg-card p-5 md:p-8',
        wide ? 'max-w-130' : 'max-w-110'
      )}
    >
      {children}
    </section>
  )
}

/** The h1, with an eyebrow above it and a line under it when there are */
export function CardHeading({
  id,
  eyebrow,
  title,
  headingRef,
  children
}: {
  id: string
  eyebrow?: ReactNode
  title: string
  /** For a card that takes focus to its h1 when it appears, as an error does */
  headingRef?: Ref<HTMLHeadingElement>
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      {eyebrow}
      <h1
        id={id}
        ref={headingRef}
        tabIndex={headingRef ? -1 : undefined}
        className="text-h1 outline-none"
      >
        {title}
      </h1>
      {children && <p className="text-body text-muted-foreground">{children}</p>}
    </div>
  )
}

/** A failure, in words, in the card. Read out at once. */
export function AuthAlert({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-x-2.5 rounded-[0.75rem] border border-transparent bg-gap-soft px-3.5 py-3"
    >
      <CircleAlert aria-hidden="true" size={20} strokeWidth={2} className="mt-0.5 text-gap" />
      <p className="text-body text-foreground">{children}</p>
    </div>
  )
}

/** A link inside small text: "contact us", "Terms of Service" */
export const inlineLinkClass =
  'rounded-chip font-medium text-primary underline underline-offset-2 transition-colors duration-180 ease-standard hover:text-brand-hover pressed:text-brand-ink pressed:underline'

/** A link that stands on its own: "Didn't receive the email? Try again", "Sign in here" */
export const textLinkClass =
  'rounded-chip font-semibold text-primary underline underline-offset-3 transition-colors duration-180 ease-standard hover:text-brand-hover pressed:text-brand-ink pressed:underline'

/** The consent line, word for word under the button (4.5's check of D4.2) */
export function ConsentLine({ verb = 'continuing' }: { verb?: 'continuing' | 'accepting' }) {
  return (
    <p className="text-small font-normal text-muted-foreground">
      By {verb}, you agree to our{' '}
      <Link href="/terms" className={inlineLinkClass}>
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link href="/privacy" className={inlineLinkClass}>
        Privacy Policy
      </Link>
      .
    </p>
  )
}

/** "If it keeps happening, contact us." */
export function ContactUsLine() {
  return (
    <p className="text-small font-normal text-muted-foreground">
      If it keeps happening,{' '}
      <Link href="/contact" className={inlineLinkClass}>
        contact us
      </Link>
      .
    </p>
  )
}
