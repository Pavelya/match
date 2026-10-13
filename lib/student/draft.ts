/*
 * What a first-run step may save (rebranding 3.1): the interests, or the countries or "Open to
 * anywhere". Checked here, apart from the route, so the rules are tested on their own.
 */

/** Today's limit on fields (FieldSelector), kept by the new step (D2.6) */
export const MAX_FIELDS = 5

const ID = /^[A-Za-z0-9_-]{1,64}$/

type Draft =
  | { step: 'interests'; fields: string[] }
  | { step: 'countries'; countries: string[]; anywhere: boolean }

/** The body as a draft, or why it isn't one */
export function readDraft(body: unknown): Draft | string {
  if (!body || typeof body !== 'object') return 'Invalid request'
  const data = body as Record<string, unknown>
  const ids = (value: unknown) =>
    Array.isArray(value) && value.every((id) => typeof id === 'string' && ID.test(id))
      ? [...new Set(value as string[])]
      : null

  if (data.step === 'interests') {
    const fields = ids(data.fields)
    if (!fields || fields.length === 0) return 'Choose at least one field'
    if (fields.length > MAX_FIELDS) return `Choose up to ${MAX_FIELDS} fields`
    return { step: 'interests', fields }
  }
  if (data.step === 'countries') {
    const countries = ids(data.countries)
    if (!countries || countries.length > 100) return 'Invalid countries'
    if (typeof data.anywhere !== 'boolean') return 'Invalid request'
    // Countries and "Open to anywhere" are never saved together (preference-validator.ts)
    if (data.anywhere && countries.length > 0) return 'Choose countries or Open to anywhere'
    if (!data.anywhere && countries.length === 0) return 'Choose a country, or Open to anywhere'
    return { step: 'countries', countries, anywhere: data.anywhere }
  }
  return 'Invalid request'
}
