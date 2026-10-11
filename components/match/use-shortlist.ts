'use client'

import { useCallback, useState } from 'react'
import { useToast } from '@/components/ds/Toast'

/*
 * Saving to the shortlist, honestly (rebranding 2.2, audit 4.1). Save shows "Saving…" while the
 * server answers and "Saved" only once it confirms; a failure goes back and says so in a toast
 * with "Try again". Removing offers "Undo". Toast copy from "D2.9 Toast". Matches is always
 * signed in; the signed-out Save, which signs in and saves on the way back, comes with the first
 * signed-out card (2.3, 2.4).
 */

export interface ShortlistProgram {
  id: string
  /** "Computer Science": what the toasts name */
  name: string
}

export const SHORTLIST_HREF = '/student/saved'

export function useShortlist(initialIds: readonly string[] = []) {
  const toast = useToast()
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

  /** Save or remove one program, then say how it went. A toast's action runs it again. */
  const change = useCallback(
    async function change(program: ShortlistProgram, to: 'save' | 'remove'): Promise<void> {
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
      if (ok) mark(setSaved, program.id, to === 'save')

      if (to === 'save') {
        toast(
          ok
            ? {
                tone: 'ok',
                message: 'Saved to your shortlist.',
                action: { label: 'View shortlist', href: SHORTLIST_HREF }
              }
            : {
                tone: 'gap',
                message: `Couldn’t save ${program.name}.`,
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
    [mark, toast]
  )

  /** The list's own copy of the shortlist, replaced when the list loads again */
  const reset = useCallback((ids: readonly string[]) => setSaved(new Set(ids)), [])

  const toggle = useCallback(
    (program: ShortlistProgram) => {
      if (pending.has(program.id)) return
      void change(program, saved.has(program.id) ? 'remove' : 'save')
    },
    [change, pending, saved]
  )

  return {
    isSaved: (id: string) => saved.has(id),
    isSaving: (id: string) => pending.has(id),
    toggle,
    reset
  }
}
