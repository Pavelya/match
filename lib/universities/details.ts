/**
 * What the program and university pages say about a university (rebranding 2.4, boards "D4.8
 * Program page" and "D4.9 University page"). Pure, so it is unit-tested.
 */

/** "Toronto, Canada"; the place once when city and country share a name ("Singapore"). */
export function placeName(city: string | null | undefined, country: string): string {
  return city && city !== country ? `${city}, ${country}` : country
}

/** Lower-case words, accents kept: "Växjö, Kalmar" is ["växjö", "kalmar"]. */
function words(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
}

/**
 * The short name, when it adds something: "U of T", "MIT", "LSE". Not when its words are already
 * in the name: Sciences Po's own name again, or Imperial College London's "London". Headings use
 * the full name, never this.
 */
export function alsoKnownAs(name: string, abbreviatedName: string | null): string | null {
  const short = abbreviatedName?.trim()
  if (!short) return null
  const nameWords = words(name)
  const shortWords = words(short)
  if (shortWords.length === 0) return null
  const inName = nameWords.some((_, start) =>
    shortWords.every((word, i) => nameWords[start + i] === word)
  )
  return inName ? null : short
}

/** "utoronto.ca", "sciencespo.fr/en": a website as people say it. */
export function displayUrl(url: string): string {
  try {
    const { hostname, pathname } = new URL(url)
    return `${hostname.replace(/^www\./, '')}${pathname.replace(/\/+$/, '')}`
  } catch {
    return url
  }
}

/** A phone number as a tel: link: digits and a leading plus only. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function plural(count: number, one: string, many = `${one}s`): string {
  return `${count.toLocaleString('en-US')} ${count === 1 ? one : many}`
}

export interface FieldGroup<P> {
  name: string
  /** For the field's link: "#field-computer-science" */
  anchor: string
  programs: P[]
}

/**
 * A university's programs by field, fields A–Z and programs A–Z within each (D4.9: every program,
 * where today's page shows six).
 */
export function programsByField<P extends { name: string; fieldOfStudy: { name: string } }>(
  programs: P[]
): FieldGroup<P>[] {
  const fields = new Map<string, P[]>()
  for (const program of programs) {
    const list = fields.get(program.fieldOfStudy.name)
    if (list) list.push(program)
    else fields.set(program.fieldOfStudy.name, [program])
  }
  const byName = (a: string, b: string) => a.localeCompare(b, 'en')
  return [...fields]
    .sort(([a], [b]) => byName(a, b))
    .map(([name, list]) => ({
      name,
      anchor: `field-${words(name).join('-')}`,
      programs: [...list].sort((a, b) => byName(a.name, b.name))
    }))
}
