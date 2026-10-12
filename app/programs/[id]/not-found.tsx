import NextNotFound from 'next/dist/client/components/builtin/not-found'
import { NotFoundPanel } from '@/components/detail/NotFoundPanel'
import { showsNewUi } from '@/lib/new-ui'

/**
 * A program that isn't there: removed when its university stopped offering it, or a link that is
 * incomplete. The new design gives it a page of its own (rebranding 2.4, board "D4.8 Program
 * page", not found), inside the programs header. Today's design never reaches it (layout.tsx
 * sends its 404 to the root's, as before); its branch is Next's own message all the same. Either
 * way the page answers 404.
 */
export default async function ProgramNotFound() {
  if (!(await showsNewUi())) return <NextNotFound />
  return (
    <NotFoundPanel title="We can’t find that program">
      It may have been removed when its university stopped offering it, or the link may be
      incomplete. Search for it by name or university, or explore every program.
    </NotFoundPanel>
  )
}
