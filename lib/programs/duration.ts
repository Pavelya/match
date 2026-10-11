/**
 * A program's length as Explore filters it (rebranding 2.3, board "D3.5 Filter toolbar"): 3 years,
 * 4 years, or 5 years or more. `AcademicProgram.duration` is text, so the search index carries
 * the bucket as a number, `durationYears`. The years before any fraction or range decide it:
 * "3.5 years" is 3, "4-5 years" and "4.5 years" are 4, "5 years (4+1)" is 5, "7 years" is 5.
 */

export type LengthYears = 3 | 4 | 5

/** The Length filter's options, in order */
export const LENGTHS: readonly { years: LengthYears; label: string }[] = [
  { years: 3, label: '3 years' },
  { years: 4, label: '4 years' },
  { years: 5, label: '5 years or more' }
]

/** The bucket for a stored duration; null when it names no whole years of 3 or more. */
export function durationYears(duration: string): LengthYears | null {
  const years = Number(duration.match(/\d+/)?.[0])
  if (!Number.isFinite(years) || years < 3) return null
  return years >= 5 ? 5 : (years as LengthYears)
}

export function isLengthYears(value: number): value is LengthYears {
  return value === 3 || value === 4 || value === 5
}
