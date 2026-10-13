'use client'

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from 'react'
import {
  changeShortlistCount,
  readShortlistCount,
  subscribeToShortlistCount,
  writeShortlistCount
} from '@/lib/shortlist/count'

/*
 * The number beside Shortlist in the desktop nav (rebranding 2.5; boards "D2.12 Header" and
 * "D4.10 Shortlist"), with no read of its own: kept in this browser for the signed-in student
 * (lib/shortlist/count.ts), so the header has it on every signed-in page. Matches, Explore and
 * the Shortlist record it from the shortlist they load anyway, and Save moves it. A save made on
 * another device shows once one of those pages loads. Until a count is known, the link shows none.
 */

const ShortlistUser = createContext<string | null>(null)

/** In the signed-in frame (AppFrame): whose count the header and the pages share */
export function ShortlistCountProvider({ user, children }: { user: string; children: ReactNode }) {
  return <ShortlistUser.Provider value={user}>{children}</ShortlistUser.Provider>
}

export interface ShortlistCounter {
  /** A page that loaded the whole shortlist says how many it holds */
  record: (count: number) => void
  /** A save (+1) or removal (-1) the server confirmed */
  change: (by: number) => void
}

/** For the pages and Save. Null signed out, where there is no count. */
export function useShortlistCounter(): ShortlistCounter | null {
  const user = useContext(ShortlistUser)
  return useMemo(
    () =>
      user === null
        ? null
        : {
            record: (count) => writeShortlistCount(user, count),
            change: (by) => changeShortlistCount(user, by)
          },
    [user]
  )
}

/**
 * The count after "Shortlist", as a screen reader hears it: "Shortlist, 4 programs". None while
 * the shortlist is empty or the count unknown, and none in the server's HTML, which can't see
 * this browser's storage.
 */
export function ShortlistCount() {
  const user = useContext(ShortlistUser)
  const count = useSyncExternalStore(
    subscribeToShortlistCount,
    () => (user === null ? null : readShortlistCount(user)),
    () => null
  )
  if (!count) return null
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-transparent bg-border px-1.5 text-[0.75rem] leading-4 font-semibold text-foreground tabular-nums group-active:bg-muted">
      <span className="sr-only">, </span>
      {count}
      <span className="sr-only">{count === 1 ? ' program' : ' programs'}</span>
    </span>
  )
}
