/*
 * First run's country filter (rebranding 3.1, board "D4.4 First run, step 2"). A country matches
 * when its name contains what was typed anywhere, without accents, as the subject picker does
 * (components/ds/picker-filter.ts), or when the typing starts one of the short names students use
 * for it: "uk" finds the United Kingdom, which no name contains.
 */

/** Short names, in lower case, and the country each stands for */
const SHORT_NAMES: readonly (readonly [string, string])[] = [
  ['uk', 'United Kingdom'],
  ['britain', 'United Kingdom'],
  ['great britain', 'United Kingdom'],
  ['england', 'United Kingdom'],
  ['scotland', 'United Kingdom'],
  ['wales', 'United Kingdom'],
  ['us', 'United States'],
  ['usa', 'United States'],
  ['america', 'United States'],
  ['holland', 'Netherlands'],
  ['czechia', 'Czech Republic'],
  ['hk', 'Hong Kong']
]

/** Lower case without accents, so "osterreich" finds "Österreich" */
function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('en')
}

/** The countries to show for `query`, in their own order. A blank query keeps them all. */
export function filterCountries<T extends { name: string }>(
  countries: readonly T[],
  query: string
): T[] {
  const needle = fold(query.trim()).replace(/\s+/g, ' ')
  if (!needle) return [...countries]
  const named = new Set(
    SHORT_NAMES.filter(([short]) => short.startsWith(needle)).map(([, country]) => country)
  )
  return countries.filter(
    (country) => fold(country.name).includes(needle) || named.has(country.name)
  )
}
