import { isCoreGrade, type CoreGrade } from '@/lib/ib/core-points'
import { DIPLOMA_SUBJECT_COUNT } from '@/lib/ib/diploma'

/*
 * What a first-run step may save (rebranding 3.1): the interests, or the countries or "Open to
 * anywhere"; and from step 3's Save and exit (3.2), the subjects so far and the core, without a
 * total. Checked here, apart from the route, so the rules are tested on their own.
 */

/** Today's limit on fields (FieldSelector), kept by the new step (D2.6) */
export const MAX_FIELDS = 5

const ID = /^[A-Za-z0-9_-]{1,64}$/

export interface DraftCourse {
  courseId: string
  level: 'SL' | 'HL'
  grade: number
}

type Draft =
  | { step: 'interests'; fields: string[] }
  | { step: 'countries'; countries: string[]; anywhere: boolean }
  | {
      step: 'subjects'
      courses: DraftCourse[]
      tokGrade: CoreGrade | null
      eeGrade: CoreGrade | null
    }

/** A complete subject: a course, SL or HL, and a grade from 1 to 7 */
function readCourse(value: unknown): DraftCourse | null {
  if (!value || typeof value !== 'object') return null
  const { courseId, level, grade } = value as Record<string, unknown>
  if (typeof courseId !== 'string' || !ID.test(courseId)) return null
  if (level !== 'SL' && level !== 'HL') return null
  if (typeof grade !== 'number' || !Number.isInteger(grade) || grade < 1 || grade > 7) return null
  return { courseId, level, grade }
}

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
  if (data.step === 'subjects') {
    // Only complete subjects are kept (D4.5), at most one of each
    if (!Array.isArray(data.courses) || data.courses.length > DIPLOMA_SUBJECT_COUNT) {
      return 'Invalid subjects'
    }
    const courses = data.courses.map(readCourse)
    if (courses.some((course) => course === null)) return 'Invalid subjects'
    const ids = courses.map((course) => course!.courseId)
    if (new Set(ids).size !== ids.length) return 'Each subject can be chosen once'
    const core = (value: unknown) =>
      value === null ? null : isCoreGrade(value) ? value : undefined
    const tokGrade = core(data.tokGrade)
    const eeGrade = core(data.eeGrade)
    if (tokGrade === undefined || eeGrade === undefined) return 'Invalid TOK or EE grade'
    return { step: 'subjects', courses: courses as DraftCourse[], tokGrade, eeGrade }
  }
  return 'Invalid request'
}
