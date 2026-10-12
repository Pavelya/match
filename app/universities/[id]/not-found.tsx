import NextNotFound from 'next/dist/client/components/builtin/not-found'
import { NotFoundPanel } from '@/components/detail/NotFoundPanel'
import { showsNewUi } from '@/lib/new-ui'

/**
 * A university that isn't there. The new design gives it a page of its own (rebranding 2.4, board
 * "D4.9 University page", not found); today's design keeps Next's own message. Either way the
 * page answers 404.
 */
export default async function UniversityNotFound() {
  if (!(await showsNewUi())) return <NextNotFound />
  return (
    <NotFoundPanel title="We can’t find that university">
      It may no longer be on IB Match, or the link may be incomplete. Search for its programs by its
      name, or explore every program.
    </NotFoundPanel>
  )
}
