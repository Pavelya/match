import 'server-only'
import { createHash, timingSafeEqual } from 'crypto'
import { draftMode } from 'next/headers'
import { env } from '@/lib/env'

/**
 * The rebranding's preview switch (rebranding task 0.1). The new design is built on `main` beside
 * today's, and this decides which one a request gets:
 *
 * - the owner opens /api/preview?key=... once, which turns on Draft Mode for that browser;
 * - on release day, NEW_UI_FOR_EVERYONE=true and a redeploy give everyone the new design.
 *
 * Draft Mode keeps static pages static: visitors get the prebuilt page, and only a browser with
 * the Draft Mode cookie renders on demand. Deleted at cleanup (R.2), with both variables.
 */

/** True once the new design is released to everyone. Emails follow this alone. */
export function newUiForEveryone(): boolean {
  return env.NEW_UI_FOR_EVERYONE === 'true'
}

/**
 * Whether this request gets the new design. A page with a new version branches on it:
 * `return (await showsNewUi()) ? <NewPage /> : <OldPage />`.
 */
export async function showsNewUi(): Promise<boolean> {
  if (newUiForEveryone()) return true
  return (await draftMode()).isEnabled
}

/**
 * Whether `key` is the preview key. False when either is missing. Both are hashed first, so
 * `timingSafeEqual` compares equal lengths and the time taken says nothing about the key.
 */
export function isPreviewKey(key: string | null | undefined): boolean {
  const expected = env.NEW_UI_PREVIEW_KEY
  if (!key || !expected) return false
  return timingSafeEqual(sha256(key), sha256(expected))
}

function sha256(value: string): Buffer {
  return createHash('sha256').update(value).digest()
}
