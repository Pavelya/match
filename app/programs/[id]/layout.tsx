import { notFound } from 'next/navigation'
import { showsNewUi } from '@/lib/new-ui'
import { getProgram } from './program'

/**
 * Today's design answers a missing program with Next's bare 404, outside the programs header, as
 * it always has. A 404 thrown in a layout skips the segment's own not-found page, which only the
 * new design uses (rebranding 2.4), and reaches the root's. The program is the request's one
 * read, shared with the page and its metadata. Deleted at cleanup (R.2).
 */
export default async function ProgramLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  if (!(await showsNewUi()) && !(await getProgram((await params).id))) notFound()
  return children
}
