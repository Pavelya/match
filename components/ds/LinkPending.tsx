'use client'

import { useLinkStatus } from 'next/link'

/**
 * Inside a Link: while its page is on its way, marks the link so its pressed look holds until the
 * page arrives (D1.6), through the `pressed:` and `link-pressed:` variants in app/globals.css.
 * Program pages are made on request with no loading screen (2.4), so on a slow phone this is the
 * only sign the tap worked. A hidden element, so nothing shifts. Only client components use it:
 * imported by a server page, it would join that page's download in today's design as well.
 */
export function LinkPending() {
  const { pending } = useLinkStatus()
  return pending ? <span data-pending="" hidden /> : null
}
