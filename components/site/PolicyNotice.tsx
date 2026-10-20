'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { CircleAlert, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ds/Button'
import { useToast } from '@/components/ds/Toast'
import { cookieChoiceMade, subscribeToCookieChoice } from '@/lib/cookie-choice'
import { BottomPanel, focusMain, useStepFooterShown } from './bottom-panel'
import {
  ACCEPT_FAILURE_WORDS,
  acceptFailure,
  updatedDocuments,
  type AcceptFailure,
  type PolicyUpdate
} from './policy-notice-words'

/*
 * "We’ve updated our policies" in the new design (rebranding 4.6, board "D2.16 Policy update
 * banner", approved 20 October 2026). Today's ReconsentBanner keeps showing in today's design.
 * The student layout's existing check decides whether it renders; AppFrame loads it only then.
 * The cookie banner's panel and place (BottomPanel), one at a time: it waits for a cookie choice,
 * then rises once the banner has faded out. It waits while a page shows the steps' footer, too.
 * Remind me later, and accepting, close it until the next full load, as today.
 */

const TITLE_ID = 'policy-notice-title'
/** The cookie banner's fade out, before this one rises in its place */
const AFTER_COOKIE_BANNER = 180

export function PolicyNotice({ update }: { update: PolicyUpdate }) {
  const router = useRouter()
  const pathname = usePathname()
  const toast = useToast()
  const stepFooter = useStepFooterShown()
  const cookieDone = useSyncExternalStore(subscribeToCookieChoice, cookieChoiceMade, () => false)

  const [ready, setReady] = useState(false)
  const [closed, setClosed] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [accepting, setAccepting] = useState(false)
  const [failure, setFailure] = useState<AcceptFailure | null>(null)
  const panel = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!cookieDone) return
    const timer = window.setTimeout(() => setReady(true), AFTER_COOKIE_BANNER)
    return () => window.clearTimeout(timer)
  }, [cookieDone])

  // Out: a 180ms fade, then gone
  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(() => setClosed(true), 180)
    return () => window.clearTimeout(timer)
  }, [leaving])

  if (closed || !ready || stepFooter) return null

  function close() {
    // Focus inside goes to the page's content, never to the top of the document
    if (panel.current?.contains(document.activeElement)) focusMain()
    setLeaving(true)
  }

  async function accept() {
    setAccepting(true)
    setFailure(null)
    let status = 0
    try {
      const response = await fetch('/api/consent/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      status = response.status
    } catch {
      // Offline: a plain failure
    }
    if (status >= 200 && status < 300) {
      close()
      toast({ tone: 'ok', message: 'You’ve accepted the updated policies.' })
      router.refresh()
      return
    }
    // The button keeps focus, so Enter tries again
    setFailure(acceptFailure(status))
    setAccepting(false)
  }

  const { documents, verb } = updatedDocuments(update)

  return (
    <BottomPanel labelledBy={TITLE_ID} leaving={leaving} panelRef={panel}>
      <div className="flex flex-col gap-1">
        <h2 id={TITLE_ID} className="text-h3">
          We’ve updated our policies
        </h2>
        <p className="text-body text-muted-foreground">
          Our{' '}
          {documents.map((document, i) => (
            <span key={document.href}>
              {i > 0 && ' and '}
              <a
                href={document.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-chip font-semibold whitespace-nowrap text-primary underline underline-offset-3 transition-colors duration-180 ease-standard hover:text-brand-hover pressed:text-brand-ink pressed:underline"
              >
                {document.title}
                <span className="sr-only"> (opens in a new tab)</span>
                <ExternalLink
                  aria-hidden="true"
                  size={14}
                  strokeWidth={2}
                  className="ml-1.25 inline-block align-[-2px]"
                />
              </a>
            </span>
          ))}{' '}
          {verb} been updated. Please review and accept to continue using IB Match.
        </p>
      </div>
      {failure && (
        <div
          role="alert"
          className="grid grid-cols-[1.125rem_minmax(0,1fr)] items-start gap-x-2.5 rounded-control border border-transparent bg-gap-soft px-3 py-2.5 text-body text-foreground"
        >
          <CircleAlert aria-hidden="true" size={18} strokeWidth={2} className="mt-0.75 text-gap" />
          <p>
            {ACCEPT_FAILURE_WORDS[failure]}
            {failure === 'signedOut' && (
              <>
                {' '}
                <a
                  href={`/auth/signin?callbackUrl=${encodeURIComponent(pathname ?? '/student')}`}
                  className="rounded-chip font-semibold underline underline-offset-3"
                >
                  Sign in again
                </a>{' '}
                to accept.
              </>
            )}
          </p>
        </div>
      )}
      {/* A phone: the button full width, Remind me later under it */}
      <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3">
        <Button
          loading={accepting}
          loadingLabel="Accepting…"
          onClick={accept}
          className="max-md:h-12 max-md:w-full"
        >
          I accept the updated policies
        </Button>
        <Button
          variant="link"
          disabled={accepting}
          onClick={close}
          className="underline data-disabled:text-ink-3"
        >
          Remind me later
        </Button>
      </div>
    </BottomPanel>
  )
}
