'use client'

import { useCallback, useEffect, useState } from 'react'
import { useToast, type ToastOptions } from '@/components/ds/Toast'
import { useShortlistCounter } from '@/components/site/shortlist-count'

/*
 * Saving to the shortlist, honestly (rebranding 2.2, audit 4.1). Save shows "Saving…" while the
 * server answers and "Saved" only once it confirms; a failure goes back and says so in a toast
 * with "Try again". Removing offers "Undo". Toast copy from "D2.9 Toast". Signed out, Save is a
 * link to sign-in that comes back to the program page with ?save=1, which saves it and says so
 * (2.4, `saveOnReturn`); without grades, to first run, which comes back the same way (3.1). Every change the server confirms moves the count beside Shortlist in
 * the nav, and a list that holds the whole shortlist sets it (2.5).
 */

interface ShortlistOptions {
  /** The ids given are the whole shortlist (Explore), so the nav count can be set from them */
  whole?: boolean
  /** On the Shortlist itself, "Saved" needs no "View shortlist" */
  onShortlist?: boolean
  /**
   * Where a save refused for want of a profile goes: first run, then back to save it (3.1). A
   * page loaded before the profile went can still offer Save; a toast's "Try again" can't help.
   */
  firstRunHref?: (program: ShortlistProgram) => string
}

/** How the student came back to a page that saves on arrival: from sign-in, or from first run */
export type SaveReturn = 'sign-in' | 'first-run'

export interface ShortlistProgram {
  id: string
  /** "Computer Science": what the toasts name */
  name: string
}

export const SHORTLIST_HREF = '/student/saved'

export function useShortlist(
  initialIds: readonly string[] = [],
  { whole = false, onShortlist = false, firstRunHref }: ShortlistOptions = {}
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
   * sign-in or first run, the messages say so too.
   */
  const change = useCallback(
    async function change(
      program: ShortlistProgram,
      to: 'save' | 'remove',
      returned?: SaveReturn
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
        if (to === 'save' && firstRunHref && (await refusedForProfile(response))) {
          window.location.assign(firstRunHref(program))
          return
        }
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
            ? savedToast(program, returned, !onShortlist)
            : {
                tone: 'gap',
                message:
                  returned === 'first-run'
                    ? `Your profile is saved, but ${program.name} wasn’t.`
                    : returned === 'sign-in'
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
    [counter, firstRunHref, mark, onShortlist, toast]
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

  /**
   * Back from sign-in or first run asking for a save: saves the program, unless it is on the
   * shortlist already
   */
  const saveOnReturn = useCallback(
    (program: ShortlistProgram, returned: SaveReturn) => {
      if (saved.has(program.id)) toast(savedToast(program, returned, !onShortlist))
      else void change(program, 'save', returned)
    },
    [change, onShortlist, saved, toast]
  )

  return {
    isSaved: (id: string) => saved.has(id),
    isSaving: (id: string) => pending.has(id),
    toggle,
    reset,
    saveOnReturn
  }
}

/** The saved-programs route's answer when the student has no profile */
async function refusedForProfile(response: Response): Promise<boolean> {
  if (response.status !== 404) return false
  const body = await response.json().catch(() => null)
  return (body as { code?: string } | null)?.code === 'PROFILE_NOT_FOUND'
}

function savedToast(
  program: ShortlistProgram,
  returned: SaveReturn | undefined,
  viewAction: boolean
): ToastOptions {
  return {
    tone: 'ok',
    message:
      returned === 'first-run'
        ? `Profile saved. ${program.name} is on your shortlist.`
        : returned === 'sign-in'
          ? `Signed in. ${program.name} is on your shortlist.`
          : 'Saved to your shortlist.',
    ...(viewAction && { action: { label: 'View shortlist', href: SHORTLIST_HREF } })
  }
}
