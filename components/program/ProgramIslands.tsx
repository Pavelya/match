'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SaveToggle } from '@/components/ds/SaveToggle'
import { useShortlist, type ShortlistProgram } from '@/components/match/use-shortlist'
import type { FitPart } from '@/lib/matching/match-why'

/*
 * The program page's two interactive parts for a signed-in student (rebranding 2.4, board "D4.8
 * Program page"). Everything else on the page is server HTML. Loaded through
 * components/detail/islands.tsx, so today's design downloads none of it.
 */

export interface ProgramSaveProps {
  program: ShortlistProgram
  /** On the shortlist when the page was built */
  saved: boolean
}

/**
 * Save (D2.1), and the save a visitor asked for before signing in: sign-in returns here with
 * ?save=1, the program is saved, D2.9's toast says so, and the address drops ?save=1 so a reload
 * doesn't save twice. Replacing the address in place, not through the router, keeps the page
 * from loading again.
 */
export function ProgramSave({ program, saved }: ProgramSaveProps) {
  const shortlist = useShortlist(saved ? [program.id] : [])
  const { saveAfterSignIn } = shortlist
  const asked = useRef(false)

  useEffect(() => {
    const url = new URL(window.location.href)
    if (asked.current || url.searchParams.get('save') !== '1') return
    asked.current = true
    url.searchParams.delete('save')
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
    saveAfterSignIn(program)
  }, [program, saveAfterSignIn])

  return (
    <SaveToggle
      saved={shortlist.isSaved(program.id)}
      saving={shortlist.isSaving(program.id)}
      onToggle={() => shortlist.toggle(program)}
      programName={program.name}
    />
  )
}

export interface FitWorkingProps {
  score: number
  parts: FitPart[]
  sentence: string
}

/**
 * "How the fit is worked out": the fit score from "Why this match" (D3.2), with its parts and
 * what lowered it, behind a button, so the percentage is never the page's headline.
 */
export function FitWorking({ score, parts, sentence }: FitWorkingProps) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="flex flex-col gap-2 border-t border-border pt-1">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-11 items-center justify-between gap-2 rounded-chip text-left text-body font-semibold"
      >
        How the fit is worked out
        <ChevronDown
          aria-hidden="true"
          size={16}
          strokeWidth={2}
          className={cn(
            'shrink-0 text-muted-foreground transition-transform duration-180 ease-standard',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div
          id={id}
          className="flex flex-col gap-3 rounded-[0.75rem] bg-muted p-3.5 transition-opacity duration-240 ease-standard starting:opacity-0 motion-reduce:duration-240! md:p-4"
        >
          <div className="flex items-baseline justify-between">
            <span className="text-label text-muted-foreground">Fit score</span>
            <span className="font-[family-name:var(--font-newsreader)] text-[2rem]/9 font-medium tabular-nums">
              {score}%
            </span>
          </div>
          {parts.map((part) => (
            <div key={part.label} className="flex flex-col gap-1">
              <div className="flex justify-between gap-2 text-small font-normal tabular-nums">
                <span>
                  <strong className="font-semibold">{part.label}</strong>{' '}
                  <span className="text-muted-foreground">{part.calc}</span>
                </span>
                <span className="font-semibold">{part.value}</span>
              </div>
              <div aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-border">
                <div
                  className="h-1.5 rounded-full bg-primary"
                  style={{ width: `${part.percent}%` }}
                />
              </div>
            </div>
          ))}
          <p className="border-t border-border pt-2.5 text-small/5 font-normal tabular-nums">
            {sentence}
          </p>
          <p className="text-small/5 font-normal text-muted-foreground">
            Fit orders programs within a status. It isn’t a chance of admission.{' '}
            <Link
              href="/how-it-works"
              className="font-semibold text-primary underline-offset-3 hover:underline"
            >
              How ranking works
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
