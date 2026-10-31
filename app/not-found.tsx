import type { Metadata } from 'next'
import NextNotFound from 'next/dist/client/components/builtin/not-found'
import { NotFoundPage } from '@/components/site/NotFoundPage'
import { showsNewUi } from '@/lib/new-ui'

/**
 * Every address the site doesn't have (rebranding 4.3, board "D4.15 404 and error pages"). Today's
 * design keeps Next's own message until release; either way the page is prebuilt and answers 404.
 */
export default async function NotFound() {
  if (!(await showsNewUi())) return <NextNotFound />
  return <NotFoundPage />
}

/** The tab says what happened (D4.15); today's keeps the site's own title */
export async function generateMetadata(): Promise<Metadata> {
  return (await showsNewUi()) ? { title: 'Page not found' } : {}
}
