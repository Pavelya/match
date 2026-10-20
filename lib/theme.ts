/**
 * Theme switching for the new design (rebranding task 1.4, `04-design-system.md` §10).
 *
 * The site follows the OS by default. A manual choice is kept per device in `localStorage`, never
 * in a cookie or the database: reading a cookie in the root layout would make every page dynamic,
 * including the static country guides. The choice shows up as `data-theme` on `<html>`, which the
 * dark tokens in `app/globals.css` key on; "system" means no attribute, so the media query decides.
 */

export const THEME_STORAGE_KEY = 'ibm-theme'

export const THEME_CHOICES = ['system', 'light', 'dark'] as const

export type ThemeChoice = (typeof THEME_CHOICES)[number]

/** Anything other than a stored "light" or "dark" means following the OS. */
export function parseThemeChoice(value: string | null | undefined): ThemeChoice {
  return value === 'light' || value === 'dark' ? value : 'system'
}

/**
 * Runs in `<head>` before first paint, so a reload never flashes the wrong theme. The root layout
 * renders it for the new design only. Kept in sync with `applyThemeChoice` by the tests.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`

/** Fired on this page when the choice changes, so every switch on it stays in step. */
const CHANGE_EVENT = 'ibm-theme-change'

export function readThemeChoice(): ThemeChoice {
  try {
    return parseThemeChoice(localStorage.getItem(THEME_STORAGE_KEY))
  } catch {
    // Storage blocked (private mode, site data off): follow the OS.
    return 'system'
  }
}

export function applyThemeChoice(choice: ThemeChoice): void {
  const root = document.documentElement
  if (choice === 'system') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', choice)
}

/**
 * Applies a change of theme with every transition off until it has been drawn, so all the colours
 * change at once (D1.6), rather than the parts with a colour fade lagging 180ms behind the rest.
 * app/globals.css turns transitions off while `data-theme-switching` is on `<html>`.
 */
function applyAtOnce(choice: ThemeChoice): void {
  const root = document.documentElement
  root.setAttribute('data-theme-switching', '')
  applyThemeChoice(choice)
  // One frame is drawn in the new colours with transitions off; the next turns them back on
  requestAnimationFrame(() =>
    requestAnimationFrame(() => root.removeAttribute('data-theme-switching'))
  )
}

export function saveThemeChoice(choice: ThemeChoice): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, choice)
  } catch {
    // Still applied for this page view; it just won't be remembered.
  }
  applyAtOnce(choice)
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/**
 * Calls `onChange` when the choice changes on this page or in another tab. A change from another
 * tab is applied here too, so every open tab shows the same theme.
 */
export function subscribeToThemeChoice(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return
    applyAtOnce(readThemeChoice())
    onChange()
  }
  window.addEventListener('storage', onStorage)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onStorage)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}
