/**
 * Where the count beside Shortlist in the nav is kept (rebranding 2.5): this browser's storage,
 * for the signed-in student it belongs to, as the theme is (lib/theme.ts). No page reads it from
 * the database. The pages that load the whole shortlist anyway record its size, and each save
 * or removal the server confirms moves it. Another account in the same browser never sees it.
 * Where storage is blocked, the count lives as long as the tab.
 */

const KEY = 'shortlist-count'

interface Stored {
  user: string
  count: number
}

/** What this tab last wrote, for a browser that blocks storage */
let written: Stored | null = null
const listeners = new Set<() => void>()

export function readShortlistCount(user: string): number | null {
  let stored = written
  try {
    const raw = localStorage.getItem(KEY)
    stored = raw ? (JSON.parse(raw) as Stored) : null
  } catch {
    // Storage blocked, or a value this code didn't write: this tab's own count
  }
  return stored?.user === user && Number.isInteger(stored.count) ? stored.count : null
}

export function writeShortlistCount(user: string, count: number): void {
  written = { user, count: Math.max(0, count) }
  try {
    localStorage.setItem(KEY, JSON.stringify(written))
  } catch {
    // Kept for this tab only
  }
  listeners.forEach((listener) => listener())
}

/** A confirmed save (+1) or removal (-1); nothing while the count is unknown */
export function changeShortlistCount(user: string, by: number): void {
  const count = readShortlistCount(user)
  if (count !== null) writeShortlistCount(user, count + by)
}

/** Changes from this tab, and from the student's other tabs */
export function subscribeToShortlistCount(listener: () => void): () => void {
  listeners.add(listener)
  window.addEventListener('storage', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}
