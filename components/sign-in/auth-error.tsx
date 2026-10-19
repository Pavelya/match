'use client'

import { lazy, Suspense } from 'react'
import type { PageErrorProps } from '@/components/site/ErrorScreen'
import { useSiteChrome } from '@/components/site/site-chrome'

/*
 * app/auth/error.tsx: the error inside sign-in, in D4.2's card on the paper (rebranding 4.3,
 * D4.15). Today's design throws the error on (components/site/root-error.tsx says why).
 */

const AuthCrash = lazy(() => import('./AuthCrash').then((m) => ({ default: m.AuthCrash })))

export function AuthError(props: PageErrorProps) {
  if (!useSiteChrome()) throw props.error
  return (
    <Suspense fallback={null}>
      <AuthCrash {...props} />
    </Suspense>
  )
}
