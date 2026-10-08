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
   * `labelled`: icon and word under a visible "Appearance" (desktop account menu, phone Profile
   * tab). `icons`: icons only, each named for screen readers (public footer). Canvas: "Theme:
   * System, Light, Dark".
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
    <div className={cn(labelled && 'flex flex-col gap-2', className)}>
      <span
        id={`${id}-label`}
        className={labelled ? 'text-small text-muted-foreground' : 'sr-only'}
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
                'relative inline-flex cursor-pointer items-center justify-center text-muted-foreground',
                'has-checked:bg-card has-checked:text-foreground has-checked:shadow-[0_1px_2px_rgb(20_22_27/0.12)]',
                'dark:has-checked:bg-border dark:has-checked:shadow-none',
                'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring',
                // Forced colours drop backgrounds, so the choice is shown in the system highlight.
                'forced-colors:has-checked:bg-[Highlight] forced-colors:has-checked:text-[HighlightText] forced-colors:has-checked:forced-color-adjust-none',
                labelled
                  ? 'h-9.5 gap-1.5 rounded-[0.5rem] text-small has-checked:font-semibold md:h-8.5'
                  : 'h-9 w-11 rounded-full md:h-8 md:w-9'
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
