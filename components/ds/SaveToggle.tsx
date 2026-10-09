'use client'

import Link from 'next/link'
import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SaveToggleProps {
  /** True only once the server has confirmed the save (rebranding 2.2). */
  saved: boolean
  saving?: boolean
  onToggle?: () => void
  /** "Computer Science, University of Toronto": the icon's name, the same in every state. */
  programName: string
  /** `word` on the program page, `icon` on cards and rows. */
  variant?: 'word' | 'icon'
  /** Signed out: Save is a link to sign-in, which saves the program on return. */
  signInHref?: string
  className?: string
}

/**
 * Save, Saving…, Saved. aria-pressed carries the state; a failed save goes back to "Save" and the
 * caller shows a toast. Canvas: "D2.1 Button", Save toggle.
 */
export function SaveToggle({
  saved,
  saving = false,
  onToggle,
  programName,
  variant = 'word',
  signInHref,
  className
}: SaveToggleProps) {
  const word = variant === 'word'
  const iconSize = word ? 18 : 20
  const classes = cn(
    'inline-flex shrink-0 items-center justify-center rounded-control border text-body',
    'transition-[color,background-color,border-color] duration-180 ease-standard',
    word
      ? 'h-11 min-w-[118px] gap-2 px-4 font-medium'
      : 'size-11 border-transparent not-aria-busy:hover:bg-muted',
    word &&
      !saved &&
      'border-line-2 bg-card text-foreground not-aria-busy:hover:border-line-3 not-aria-busy:hover:bg-muted',
    word && saved && 'border-primary bg-brand-soft font-semibold text-brand-ink',
    !word && (saved ? 'text-primary' : 'text-foreground'),
    saving && 'text-muted-foreground',
    className
  )

  if (signInHref) {
    return (
      <Link
        href={signInHref}
        className={classes}
        aria-label={word ? undefined : `Sign in to save ${programName}`}
      >
        <Bookmark aria-hidden="true" size={iconSize} strokeWidth={1.75} />
        {word && 'Save'}
      </Link>
    )
  }

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-busy={saving || undefined}
      aria-label={word ? undefined : `Save ${programName}`}
      className={classes}
      onClick={() => {
        // Clicks wait while the server answers.
        if (!saving) onToggle?.()
      }}
    >
      <Bookmark
        aria-hidden="true"
        size={iconSize}
        strokeWidth={1.75}
        fill={saved ? 'currentColor' : 'none'}
        className={cn(saving && 'opacity-50')}
      />
      {word && (saving ? 'Saving…' : saved ? 'Saved' : 'Save')}
    </button>
  )
}
