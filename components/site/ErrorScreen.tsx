'use client'

import { useEffect, useRef, useTransition } from 'react'
import Link from 'next/link'
// Lucide's TriangleAlert, by the name today's pages import it under (components/ds/ConfirmDialog)
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ds/Button'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { IconTile } from '@/components/ds/IconTile'
import { containerClass } from './styles'
import { PublicHeader } from './PublicHeader'
import { SiteFooter } from './SiteFooter'
import { SiteFrame } from './SiteFrame'
import { ERROR_TEXT, ERROR_TITLE } from './error-words'
import { useTabTitle } from './use-tab-title'

/*
 * A page that failed while it rendered (rebranding 4.3, board "D4.15 404 and error pages",
 * approved 19 October 2026): one panel inside the chrome the page would have had, signed in or
 * out. Try again re-fetches the page and renders it in place ("Trying again…" while it works,
 * never a spinner), Home goes home, and the digest, when the server gave one, is the reference
 * for support: the id in Vercel's logs, which says nothing about the error itself. Focus moves to
 * the h1, so a screen reader announces what happened. Matches, Explore and Shortlist keep D2.11's
 * panel for a list that doesn't load; this page is for everything else.
 */

export interface PageErrorProps {
  error: Error & { digest?: string }
  /** Next's retry: refetches the segment and renders it again, in a transition */
  retry: () => void
}

interface ErrorScreenProps extends PageErrorProps {
  /**
   * The error replaced a layout that drew its own chrome (/programs, /auth, …), so the page draws
   * the public header and footer itself, as the 404 does
   */
  frame?: boolean
  /** `main` where the frame round it is a plain block, as the public frame's is */
  as?: 'main' | 'div'
}

export function ErrorScreen({ error, retry, frame = false, as = 'div' }: ErrorScreenProps) {
  if (frame) {
    return (
      <SiteFrame header={<PublicHeader />} footer={<SiteFooter />}>
        <ErrorPanel error={error} retry={retry} as="div" />
      </SiteFrame>
    )
  }
  return <ErrorPanel error={error} retry={retry} as={as} />
}

function ErrorPanel({ error, retry, as: Root }: PageErrorProps & { as: 'main' | 'div' }) {
  const [trying, startTrying] = useTransition()
  const heading = useRef<HTMLHeadingElement>(null)

  useTabTitle(ERROR_TITLE)
  useEffect(() => {
    heading.current?.focus()
  }, [])

  return (
    <Root className={`${containerClass} px-4 pt-14 pb-20 md:px-6 md:pt-22 md:pb-30`}>
      <div className="flex max-w-160 flex-col gap-4">
        <IconTile icon={AlertTriangle} tone="error" />
        <h1 ref={heading} tabIndex={-1} className="text-h1 outline-none">
          {ERROR_TITLE}
        </h1>
        <p className="text-body-l text-muted-foreground">{ERROR_TEXT}</p>
        <div className="flex flex-col gap-2.5 pt-2 md:flex-row md:gap-3">
          <Button
            size="lg"
            loading={trying}
            loadingLabel="Trying again…"
            onClick={() => startTrying(retry)}
            className="max-md:h-12 max-md:w-full max-md:text-body"
          >
            Try again
          </Button>
          <ButtonLink
            href="/"
            variant="secondary"
            size="lg"
            className="max-md:h-12 max-md:w-full max-md:text-body"
          >
            Home
          </ButtonLink>
        </div>
        <ErrorReference digest={error.digest} />
      </div>
    </Root>
  )
}

/** "If it keeps happening, contact us and quote this reference: 3048217465." */
export function ErrorReference({ digest }: { digest?: string }) {
  return (
    <p className="text-small font-normal text-muted-foreground">
      If it keeps happening,{' '}
      <Link
        href="/contact"
        className="rounded-chip font-medium text-primary underline underline-offset-2 hover:text-brand-hover pressed:text-brand-ink pressed:underline"
      >
        contact us
      </Link>
      {digest ? (
        <>
          {' '}
          and quote this reference:{' '}
          <span className="font-semibold text-foreground tabular-nums">{digest}</span>.
        </>
      ) : (
        '.'
      )}
    </p>
  )
}
