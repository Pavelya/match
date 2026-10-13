import type { ReactNode } from 'react'
import type { Session } from 'next-auth'
import { getAvatarInitial } from '@/lib/avatar-utils'
import { SignedInChrome, SignedOutChrome } from './chrome'

/**
 * The new design's chrome for a layout that reads the session (rebranding 1.5): the signed-in
 * header, footer and tab bar when there is one, else the public header and footer every prebuilt
 * page has. /programs and, since 2.4, /universities. The session comes from the layout, which has
 * already read it.
 */
export function SessionChrome({
  session,
  children
}: {
  session: Session | null
  children: ReactNode
}) {
  if (!session) return <SignedOutChrome>{children}</SignedOutChrome>
  return (
    <SignedInChrome
      user={{
        id: session.user?.id ?? '',
        name: session.user?.name ?? null,
        email: session.user?.email ?? null,
        image: session.user?.image ?? null,
        initial: getAvatarInitial(session.user?.email, session.user?.name)
      }}
    >
      {children}
    </SignedInChrome>
  )
}
