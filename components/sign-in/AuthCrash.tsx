'use client'

import { useEffect, useId, useRef, useTransition } from 'react'
// Lucide's TriangleAlert, by the name today's pages import it under (components/ds/ConfirmDialog)
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ds/Button'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { IconTile } from '@/components/ds/IconTile'
import type { PageErrorProps } from '@/components/site/ErrorScreen'
import { useErrorTitle } from '@/components/site/use-error-title'
import { AuthCard, AuthPage, CardHeading } from './AuthPage'

/*
 * A page under /auth that fails while it renders (rebranding 4.3, board "D4.15 404 and error
 * pages": "the error inside sign-in"): D4.2's card with today's words from AuthErrorBoundary. Try
 * again renders the page again in place; Back to sign in starts over.
 */
export function AuthCrash({ retry }: PageErrorProps) {
  const [trying, startTrying] = useTransition()
  const id = useId()
  const heading = useRef<HTMLHeadingElement>(null)

  useErrorTitle()
  useEffect(() => {
    heading.current?.focus()
  }, [])

  return (
    <AuthPage>
      <AuthCard labelledBy={`${id}-title`}>
        <IconTile icon={AlertTriangle} tone="error" />
        <CardHeading id={`${id}-title`} title="Something went wrong" headingRef={heading}>
          We encountered an unexpected error. Please try again.
        </CardHeading>
        <div className="flex flex-col gap-2.5">
          <Button
            size="lg"
            loading={trying}
            loadingLabel="Trying again…"
            onClick={() => startTrying(retry)}
            className="w-full"
          >
            Try again
          </Button>
          <ButtonLink href="/auth/signin" variant="secondary" size="lg" className="w-full">
            Back to sign in
          </ButtonLink>
        </div>
      </AuthCard>
    </AuthPage>
  )
}
