'use client'

import { useCallback, useEffect, useState } from 'react'
import { useToast, type ToastOptions } from '@/components/ds/Toast'
import { useShortlistCounter } from '@/components/site/shortlist-count'

/*
 * Saving to the shortlist, honestly (rebranding 2.2, audit 4.1). Save shows "Saving…" while the
 * server answers and "Saved" only once it confirms; a failure goes back and says so in a toast
 * with "Try again". Removing offers "Undo". Toast copy from "D2.9 Toast". Signed out, Save is a
 * link to sign-in that comes back to the program page with ?save=1, which saves it and says so
 * (2.4, `saveAfterSignIn`). Every change the server confirms moves the count beside Shortlist in
 * the nav, and a list that holds the whole shortlist sets it (2.5).
 */

interface ShortlistOptions {
  /** The ids given are the whole shortlist (Explore), so the nav count can be set from them */
  whole?: boolean
  /** On the Shortlist itself, "Saved" needs no "View shortlist" */
  onShortlist?: boolean
}

export interface ShortlistProgram {
  id: string
  /** "Computer Science": what the toasts name */
  name: string
}

export const SHORTLIST_HREF = '/student/saved'

export function useShortlist(
  initialIds: readonly string[] = [],
  { whole = false, onShortlist = false }: ShortlistOptions = {}
) {
  const toast = useToast()
  const counter = useShortlistCounter()
  const [saved, setSaved] = useState<ReadonlySet<string>>(() => new Set(initialIds))
  const [pending, setPending] = useState<ReadonlySet<string>>(() => new Set())

  const mark = useCallback(
    (setter: typeof setSaved | typeof setPending, id: string, on: boolean) =>
      setter((current) => {
        if (current.has(id) === on) return current
        const next = new Set(current)
        if (on) next.add(id)
        else next.delete(id)
        return next
      }),
    []
  )

  /**
   * Save or remove one program, then say how it went. A toast's action runs it again. Back from
   * sign-in, the messages say so too.
   */
  const change = useCallback(
    async function change(
      program: ShortlistProgram,
      to: 'save' | 'remove',
      afterSignIn = false
    ): Promise<void> {
      mark(setPending, program.id, true)
      let ok = false
      try {
        const response =
          to === 'save'
            ? await fetch('/api/students/saved-programs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ programId: program.id })
              })
            : await fetch(`/api/students/saved-programs/${encodeURIComponent(program.id)}`, {
                method: 'DELETE'
              })
        // Not found, on removing, means it is already off the shortlist
        ok = response.ok || (to === 'remove' && response.status === 404)
      } catch {
        ok = false
      }
      mark(setPending, program.id, false)
      if (ok) {
        mark(setSaved, program.id, to === 'save')
        counter?.change(to === 'save' ? 1 : -1)
      }

      if (to === 'save') {
        toast(
          ok
            ? savedToast(program, afterSignIn, !onShortlist)
            : {
                tone: 'gap',
                message: afterSignIn
                  ? `Signed in, but ${program.name} wasn’t saved.`
                  : `Couldn’t save ${program.name}.`,
                action: { label: 'Try again', onClick: () => void change(program, 'save') }
              }
        )
      } else {
        toast(
          ok
            ? {
                tone: 'info',
                message: 'Removed from your shortlist.',
                action: { label: 'Undo', onClick: () => void change(program, 'save') }
              }
            : {
                tone: 'gap',
                message: `Couldn’t remove ${program.name}.`,
                action: { label: 'Try again', onClick: () => void change(program, 'remove') }
              }
        )
      }
    },
    [counter, mark, onShortlist, toast]
  )

  // The whole shortlist came with the page: the nav count is its size
  const initialCount = initialIds.length
  useEffect(() => {
    if (whole) counter?.record(initialCount)
  }, [counter, whole, initialCount])

  /** The list's own copy of the shortlist, replaced when the list loads again: the whole of it */
  const reset = useCallback(
    (ids: readonly string[]) => {
      setSaved(new Set(ids))
      counter?.record(ids.length)
    },
    [counter]
  )

  const toggle = useCallback(
    (program: ShortlistProgram) => {
      if (pending.has(program.id)) return
      void change(program, saved.has(program.id) ? 'remove' : 'save')
    },
    [change, pending, saved]
  )

  /** Back from sign-in with ?save=1: saves the program, unless it is on the shortlist already */
  const saveAfterSignIn = useCallback(
    (program: ShortlistProgram) => {
      if (saved.has(program.id)) toast(savedToast(program, true, !onShortlist))
      else void change(program, 'save', true)
    },
    [change, onShortlist, saved, toast]
  )

  return {
    isSaved: (id: string) => saved.has(id),
    isSaving: (id: string) => pending.has(id),
    toggle,
    reset,
    saveAfterSignIn
  }
}

function savedToast(
  program: ShortlistProgram,
  afterSignIn: boolean,
  viewAction: boolean
): ToastOptions {
  return {
    tone: 'ok',
    message: afterSignIn
      ? `Signed in. ${program.name} is on your shortlist.`
      : 'Saved to your shortlist.',
    ...(viewAction && { action: { label: 'View shortlist', href: SHORTLIST_HREF } })
  }
}
