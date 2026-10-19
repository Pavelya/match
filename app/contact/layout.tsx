import { auth } from '@/lib/auth/config'
import { SessionChrome } from '@/components/site/SessionChrome'
import { showsNewUi } from '@/lib/new-ui'

/**
 * Contact reads the session in the new design (rebranding 4.3, board "D4.14 Text pages"), so a
 * signed-in student gets the signed-in header, as /universities does since 2.4. The page reads the
 * session on every view already; this is the sign-in cookie, with no database read. Today's design
 * keeps the page exactly as it is.
 */
export default async function ContactLayout({ children }: { children: React.ReactNode }) {
  if (!(await showsNewUi())) return children
  return <SessionChrome session={await auth()}>{children}</SessionChrome>
}
