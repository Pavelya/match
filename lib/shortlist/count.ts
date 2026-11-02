/**
 * Where the count beside Shortlist in the nav is kept (rebranding 2.5): this page's memory, for
 * the signed-in student it belongs to. Never the browser's storage, as the Cookie Policy says
 * (MAINT 5.49), and no page reads it from the database. The pages that load the whole shortlist
 * anyway record its size, and each save or removal the server confirms moves it. It survives
 * moving between pages; a reload or a new tab starts with no count. Another account in the same
 * tab never sees it.
 */

interface Written {
  user: string
  count: number
}

let written: Written | null = null
const listeners = new Set<() => void>()

export function readShortlistCount(user: string): number | null {
  return written?.user === user ? written.count : null
}

export function writeShortlistCount(user: string, count: number): void {
  written = { user, count: Math.max(0, count) }
  listeners.forEach((listener) => listener())
}

/** Once the account is deleted (MAINT 5.25): nothing of the student's is left in this tab */
export function clearShortlistCount(): void {
  written = null
  listeners.forEach((listener) => listener())
}

/** A confirmed save (+1) or removal (-1); nothing while the count is unknown */
export function changeShortlistCount(user: string, by: number): void {
  const count = readShortlistCount(user)
  if (count !== null) writeShortlistCount(user, count + by)
}

export function subscribeToShortlistCount(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
