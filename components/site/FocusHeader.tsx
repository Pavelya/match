'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CircleCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ds/button-variants'
import type { Waiting } from '@/lib/student/first-run'
import { useExitPlan } from './first-run-exit'
import { SiteLogo } from './SiteLogo'
import { headerClass, headerRowClass } from './styles'

const HOME = '/'

/**
 * First run's focus mode header (D2.12, rebranding 3.1): the logo, not a link, and "Save and
 * exit"; no nav and no account button. The signed-in frame (AppFrame) draws it beside the usual
 * header, and app/globals.css shows it, hiding the usual header, footer and tab bar, while the
 * page carries first run's mark ([data-first-run]). So it follows the page through every client
 * navigation, which a layout, rendered once, would not.
 *
 * "Save and exit" saves the step in progress, then goes to Home (D2.12). With a program waiting
 * it asks once first, saying what is kept and what isn't (D4.3): a popover under the button on
 * desktop, a panel dropping from the header over a scrim on a phone. A failed save stays on the
 * step; the page's toast says so.
 */
export function FocusHeader() {
  const plan = useExitPlan()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [asking, setAsking] = useState<Waiting | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const button = useRef<HTMLButtonElement>(null)

  const keepGoing = useRef<HTMLButtonElement>(null)

  // Opening, the dialog would focus its first control; staying costs nothing, so Keep going
  // takes focus instead
  useEffect(() => {
    if (!asking || dialog.current?.open) return
    dialog.current?.showModal()
    keepGoing.current?.focus()
  }, [asking])

  async function saveAndExit() {
    if (saving) return
    const current = plan?.current ?? null
    setSaving(true)
    const saved = current ? await current.save() : true
    setSaving(false)
    if (!saved) return
    if (current?.waiting) setAsking(current.waiting)
    else router.push(HOME)
  }

  return (
    <header data-focus-chrome="" className={headerClass}>
      <div className={cn(headerRowClass, 'md:pr-4 lg:pr-6')}>
        <SiteLogo className="mr-auto" />
        <button
          ref={button}
          type="button"
          aria-busy={saving || undefined}
          onClick={() => void saveAndExit()}
          className={cn(
            'grid h-11 shrink-0 items-center rounded-control border border-transparent px-3 text-body font-medium text-foreground md:h-9',
            'transition-[background-color,scale] duration-180 ease-standard active:duration-120',
            'hover:bg-muted active:bg-border motion-safe:active:scale-[0.98]'
          )}
        >
          {/* Both labels share one cell, so "Saving…" keeps the button's width (D2.1) */}
          <span className={cn('col-start-1 row-start-1', saving && 'invisible')}>
            Save and exit
          </span>
          {saving && <span className="col-start-1 row-start-1">Saving…</span>}
        </button>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="first-run-exit-title"
        onClose={() => {
          setAsking(null)
          button.current?.focus()
        }}
        // A click on the backdrop lands on the dialog itself: it closes, as Keep going does
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        className={cn(
          'fixed inset-x-0 top-14 bottom-auto m-0 w-full max-w-none border-0 border-b border-border bg-card px-4 pt-5 pb-4 text-foreground shadow-overlay',
          // The scrim starts under the header, which stays clear (D4.3, phone)
          'backdrop:top-14 backdrop:bg-[rgb(20_22_27/0.42)] dark:backdrop:bg-black/60',
          'md:top-18 md:right-6 md:left-auto md:w-95 md:rounded-[0.875rem] md:border md:p-5 md:backdrop:bg-transparent',
          'transition-opacity duration-120 ease-standard starting:opacity-0'
        )}
      >
        {asking && (
          <div className="flex flex-col gap-4.5">
            <div className="grid grid-cols-[20px_minmax(0,1fr)] items-start gap-x-3 gap-y-1">
              <CircleCheck
                aria-hidden="true"
                size={20}
                strokeWidth={2}
                className="mt-0.5 text-ok"
              />
              <h2 id="first-run-exit-title" className="text-h3">
                Your choices are saved.
              </h2>
              <p className="col-start-2 text-body text-muted-foreground">
                {asking.program} isn’t on your shortlist yet. Finish your profile and we’ll add it.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 md:flex md:justify-end md:gap-2">
              <Link
                href={HOME}
                className={buttonVariants({ variant: 'secondary', className: 'max-md:h-12' })}
              >
                Exit to Home
              </Link>
              <button
                ref={keepGoing}
                type="button"
                onClick={() => dialog.current?.close()}
                className={buttonVariants({ className: 'max-md:h-12' })}
              >
                Keep going
              </button>
            </div>
          </div>
        )}
      </dialog>
    </header>
  )
}
