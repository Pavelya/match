import { auth } from '@/lib/auth/config'
import { SessionChrome } from '@/components/site/SessionChrome'
import { showsNewUi } from '@/lib/new-ui'

/**
 * University pages read the session in the new design (rebranding 2.4, board "D4.9 University
 * page"), so a student who follows a program's university link keeps the signed-in header. The
 * page is built on each request already; this is the sign-in cookie, as /programs reads it, with
 * no database read. Today's design keeps the page exactly as it is.
 */
export default async function UniversitiesLayout({ children }: { children: React.ReactNode }) {
  if (!(await showsNewUi())) return children
  return <SessionChrome session={await auth()}>{children}</SessionChrome>
}
