import { draftMode } from 'next/headers'
import type { NextRequest } from 'next/server'
import { isPreviewKey } from '@/lib/new-ui'

/**
 * GET /api/preview?key=... - turns the new design on for this browser (rebranding task 0.1).
 *
 * The right key enables Draft Mode and sends the browser home. The preview lasts until the
 * browser closes, "Exit" or the next deploy. A missing or wrong key, or no key configured, is a
 * 404. The redirect target is fixed, never taken from the request.
 */
export async function GET(request: NextRequest) {
  if (!isPreviewKey(request.nextUrl.searchParams.get('key'))) {
    return new Response(null, { status: 404 })
  }

  const draft = await draftMode()
  draft.enable()
  return new Response(null, { status: 303, headers: { Location: '/' } })
}
