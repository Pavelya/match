import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CircleCheck } from 'lucide-react'
import { buttonVariants } from '@/components/ds/button-variants'
import { showsNewUi } from '@/lib/new-ui'

/*
 * Where a student lands, signed out, once their account is deleted (rebranding 3.3, boards "D4.11
 * Settings" and "… · phone", approved 18 October 2026): what went, and that a new account can
 * start any time. Static, with the public header, and it reads nothing. Only the new design
 * deletes onto it; today's design goes Home, so there the address stays a 404 until release.
 * "We’re also emailing you a confirmation." is D4.18's change (rebranding 4.7): present tense,
 * since the email goes after the deletion commits and can fail without failing it (MAINT 5.24).
 */

export const metadata: Metadata = {
  title: 'Your account is deleted',
  robots: { index: false, follow: false }
}

export default async function AccountDeletedPage() {
  if (!(await showsNewUi())) notFound()

  return (
    <main className="mx-auto flex w-full max-w-[35rem] flex-col items-start gap-4 px-4 pt-12 pb-24 md:px-0 md:pt-30">
      <span
        aria-hidden="true"
        className="inline-flex size-12 items-center justify-center rounded-[0.75rem] border border-transparent bg-ok-soft text-ok"
      >
        <CircleCheck size={24} strokeWidth={2} />
      </span>
      <h1 className="text-h1">Your account is deleted</h1>
      <p className="text-body text-muted-foreground md:text-body-l">
        We’ve deleted your account, your subjects and grades, your interests and countries, and your
        shortlist. We’re also emailing you a confirmation. You can make a new account with the same
        email any time.
      </p>
      <Link href="/" className={buttonVariants()}>
        Go to Home
      </Link>
    </main>
  )
}
