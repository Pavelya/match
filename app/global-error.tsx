'use client'

import { lazy, Suspense } from 'react'
import NextGlobalError from 'next/dist/client/components/builtin/global-error'

/*
 * When the root layout itself fails (rebranding 4.3, board "D4.15 404 and error pages"): from
 * release day the bare page in components/site/BareErrorPage.tsx. It replaces the root layout, so
 * it can't ask for the preview: it follows the release flag, read when the app is built
 * (next.config.ts), and until release day Next's own page shows, as before. The flag is a constant
 * in the build, so today's builds drop the import, and this file is all today's visitors load.
 */

const BareErrorPage =
  process.env.NEW_UI_RELEASED === 'true'
    ? lazy(() =>
        import('@/components/site/BareErrorPage').then((m) => ({ default: m.BareErrorPage }))
      )
    : null

interface GlobalErrorProps {
  error: Error & { digest?: string }
  retry: () => void
}

export default function GlobalError({ error, retry }: GlobalErrorProps) {
  if (!BareErrorPage) return <NextGlobalError error={error} />
  return (
    <Suspense fallback={null}>
      <BareErrorPage error={error} retry={retry} />
    </Suspense>
  )
}
