'use client'

import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SaveSignInLink, saveToggleClasses } from './SaveSignInLink'

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

  if (signInHref) {
    return (
      <SaveSignInLink
        href={signInHref}
        programName={programName}
        variant={variant}
        className={className}
      />
    )
  }

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-busy={saving || undefined}
      aria-label={word ? undefined : `Save ${programName}`}
      className={saveToggleClasses({ word, saved, saving, className })}
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
