import {
  ALL_OFF_KEY,
  SEASON_KEYS,
  dayOf,
  isSeasonKey,
  type SeasonKey,
  type SeasonWindow
} from './seasons'

/*
 * Which season a page shows (rebranding 6.1). The browser decides, so static pages stay static:
 * the root layout writes the schedule into a small head script, which compares it with the
 * visitor's own date before first paint, sets `data-season` on <html> and adds that season's
 * stylesheet. A season therefore starts and ends at the visitor's midnight, and pages render again
 * only when the admin changes the schedule.
 */

/** A row of the SeasonalTheme table, as the root layout selects it. */
export interface SeasonRow {
  key: string
  enabled: boolean
  startsOn: Date | null
  endsOn: Date | null
}

/**
 * The windows the head script gets: every season switched on with both dates, earliest first,
 * none at all while "All seasonal decorations off" is on. A season that is over everywhere is
 * left out: the last time zone (UTC−12) is still on its end day until noon UTC the day after.
 */
export function scheduleFromRows(rows: readonly SeasonRow[], utcToday: string): SeasonWindow[] {
  if (rows.some((row) => row.key === ALL_OFF_KEY && row.enabled)) return []
  const lastEnd = dayOf(new Date(Date.parse(`${utcToday}T00:00:00Z`) - 86_400_000))
  const windows: SeasonWindow[] = []
  for (const row of rows) {
    if (!row.enabled || !isSeasonKey(row.key) || !row.startsOn || !row.endsOn) continue
    const startsOn = dayOf(row.startsOn)
    const endsOn = dayOf(row.endsOn)
    if (endsOn < startsOn || endsOn < lastEnd) continue
    windows.push([row.key, startsOn, endsOn])
  }
  return windows.sort((a, b) => a[1].localeCompare(b[1]) || a[0].localeCompare(b[0]))
}

/**
 * The season for `today` (the visitor's date, `YYYY-MM-DD`). `?season={key}` previews any season
 * built in code on any day, scheduled or not, even with everything switched off; otherwise the
 * first window that holds today, both ends included. Kept in step with the head script by the
 * tests, which run that script against this.
 */
export function pickSeason(
  schedule: unknown,
  today: string,
  preview: string | null
): SeasonKey | null {
  if (isSeasonKey(preview)) return preview
  if (!Array.isArray(schedule)) return null
  for (const window of schedule) {
    // The script stops at an empty entry, and a stop means no season
    if (window == null) return null
    if (!Array.isArray(window)) continue
    const [key, startsOn, endsOn] = window as unknown[]
    if (typeof startsOn !== 'string' || typeof endsOn !== 'string') continue
    if (startsOn <= today && today <= endsOn) return key as SeasonKey
  }
  return null
}

/** Inline JSON, with `<` escaped so nothing in it can close the script element. */
function inline(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

/**
 * The head script, next to THEME_SCRIPT (lib/theme.ts), for the new design only. Under 600 bytes
 * with every season scheduled (a test checks). It does what pickSeason does, then marks <html>
 * and adds `/seasons/{key}/season.css`, so outside a season nothing is downloaded. The `try` block
 * scopes its `let`, so nothing reaches the global scope.
 */
export function seasonScript(schedule: readonly SeasonWindow[]): string {
  return `try{let n=new Date(),p=x=>('0'+x).slice(-2),t=n.getFullYear()+'-'+p(n.getMonth()+1)+'-'+p(n.getDate()),c=new URLSearchParams(location.search).get('season'),d=document,l;${inline(SEASON_KEYS)}.includes(c)||(c=${inline(schedule)}.find(w=>w[1]<=t&&t<=w[2])?.[0]);if(c){d.documentElement.setAttribute('data-season',c);l=d.createElement('link');l.rel='stylesheet';l.href='/seasons/'+c+'/season.css';d.head.appendChild(l)}}catch{}`
}
