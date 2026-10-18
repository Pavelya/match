/*
 * Settings in the new design (rebranding 3.3; boards "D4.11 Settings" and "D4.11 Settings ·
 * phone", approved 18 October 2026): the account, the school and the student's data. Pure, so
 * the words are tested; SettingsClient.tsx only draws them.
 */

/** Where a student lands, signed out, once the account is deleted: a static page of its own */
export const ACCOUNT_DELETED_PATH = '/account-deleted'

/** Today's limit on a name (app/api/students/account/update) */
export const NAME_MAX = 100

const LONG_DATE = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
})

/** "2 September 2026", as the boards write dates. In UTC, so the server and the browser agree. */
export function longDate(date: Date | string): string {
  return LONG_DATE.format(typeof date === 'string' ? new Date(date) : date)
}

/**
 * Under the school's name: "Krakow, Poland · linked through an invitation on 2 September 2026",
 * without "through an invitation" when it wasn't one, and without the date when there is none.
 */
export function schoolLine(school: {
  city: string
  country: string
  linkedAt: Date | string | null
  byInvitation: boolean
}): string {
  const where = `${school.city}, ${school.country}`
  if (!school.linkedAt) return where
  const how = school.byInvitation ? 'linked through an invitation on' : 'linked on'
  return `${where} · ${how} ${longDate(school.linkedAt)}`
}

/** The name as it saves: trimmed, and an empty one is none, as today */
export function nameToSave(text: string): string | null {
  return text.trim() || null
}

/** "Type DELETE to confirm": any case, and spaces round it don't count (D2.10) */
export function isDeleteWord(text: string): boolean {
  return text.trim().toUpperCase() === 'DELETE'
}
