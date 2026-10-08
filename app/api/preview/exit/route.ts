import { draftMode } from 'next/headers'

/**
 * POST /api/preview/exit - the preview bar's "Exit" (rebranding task 0.1). Turns Draft Mode off
 * and sends the browser home, to today's design. A 303, so the browser follows with a GET rather
 * than posting again.
 */
export async function POST() {
  const draft = await draftMode()
  draft.disable()
  return new Response(null, { status: 303, headers: { Location: '/' } })
}
