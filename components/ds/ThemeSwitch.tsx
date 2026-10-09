'use client'

import { useId, useLayoutEffect, useSyncExternalStore } from 'react'
import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react'
import {
  THEME_CHOICES,
  applyThemeChoice,
  readThemeChoice,
  saveThemeChoice,
  subscribeToThemeChoice,
  type ThemeChoice
} from '@/lib/theme'
import { cn } from '@/lib/utils'

const OPTIONS: Record<ThemeChoice, { label: string; iconOnlyLabel: string; Icon: LucideIcon }> = {
  system: { label: 'System', iconOnlyLabel: 'Match system', Icon: Monitor },
  light: { label: 'Light', iconOnlyLabel: 'Light', Icon: Sun },
  dark: { label: 'Dark', iconOnlyLabel: 'Dark', Icon: Moon }
}

/** The server can't know the stored choice, so it renders System and the client corrects it. */
const serverChoice = (): ThemeChoice => 'system'

interface ThemeSwitchProps {
  /**
   * `labelled`: icon and word under a visible "Appearance" (the account menu). `icons`: icons
   * only, each named for screen readers, with "Appearance" beside them on a phone and for screen
   * readers only from 768px (the footer). Canvas: "Theme: System, Light, Dark", "D2.13 Footer".
   */
  variant?: 'labelled' | 'icons'
  className?: string
}

/**
 * System, Light or Dark for the new design (rebranding 1.4). Native radio inputs, so arrow keys
 * move the choice and screen readers announce "radio button, 1 of 3". Placed by 1.5 and 3.3.
 */
export function ThemeSwitch({ variant = 'labelled', className }: ThemeSwitchProps) {
  const id = useId()
  const choice = useSyncExternalStore(subscribeToThemeChoice, readThemeChoice, serverChoice)
  const labelled = variant === 'labelled'

  // React's development remount clears the data-theme the head script set on <html>, so put it
  // back. In production this changes nothing.
  useLayoutEffect(() => {
    applyThemeChoice(readThemeChoice())
  }, [])

  return (
    <div
      className={cn(
        labelled ? 'flex flex-col gap-2' : 'flex items-center justify-between gap-4',
        className
      )}
    >
      <span
        id={`${id}-label`}
        className={
          labelled
            ? 'text-small text-muted-foreground'
            : 'text-body text-muted-foreground md:sr-only'
        }
      >
        Appearance
      </span>
      <div
        role="radiogroup"
        aria-labelledby={`${id}-label`}
        // The transparent border shows as the group's edge in forced colours.
        className={cn(
          'grid grid-cols-3 border border-transparent bg-muted p-0.5',
          labelled ? 'gap-[3px] rounded-control' : 'w-fit gap-0.5 rounded-full'
        )}
      >
        {THEME_CHOICES.map((value) => {
          const { label, iconOnlyLabel, Icon } = OPTIONS[value]
          return (
            <label
              key={value}
              className={cn(
                // The chosen option has a 1px line-3 edge, 3.3:1 against the track; the others a
                // transparent one, so nothing shifts when the choice moves ("D1.4 Theme · chosen
                // edge"). 44px tall below 768px, the touch size of every control ("· phone size").
                'relative inline-flex cursor-pointer items-center justify-center border border-transparent text-muted-foreground',
                'has-checked:border-line-3 has-checked:bg-card has-checked:text-foreground dark:has-checked:bg-border',
                'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring',
                // Forced colours drop backgrounds, so the choice is shown in the system highlight,
                // and would draw the transparent edges, so the other options lose theirs.
                'forced-colors:not-has-checked:border-0',
                'forced-colors:has-checked:bg-[Highlight] forced-colors:has-checked:text-[HighlightText] forced-colors:has-checked:outline-[Highlight] forced-colors:has-checked:forced-color-adjust-none',
                labelled
                  ? 'h-11 gap-1.5 rounded-[0.5rem] text-small has-checked:font-semibold md:h-8.5'
                  : 'size-11 rounded-full md:h-8 md:w-9'
              )}
            >
              <input
                type="radio"
                name={id}
                value={value}
                checked={choice === value}
                onChange={() => saveThemeChoice(value)}
                className="sr-only"
              />
              <Icon aria-hidden="true" size={labelled ? 14 : 16} strokeWidth={1.75} />
              {labelled ? label : <span className="sr-only">{iconOnlyLabel}</span>}
            </label>
          )
        })}
      </div>
    </div>
  )
}
