import { getCorePoints } from '@/lib/ib/core-points'
import { checkDiploma } from '@/lib/ib/diploma'
import { MAX_FIELDS } from './draft'
import { FIRST_RUN_PATH } from './first-run'
import { chosenSubjects, type EditorCourse, type SubjectRow } from './subject-editor'

/*
 * The Academic page after first run (rebranding 3.3; boards "D4.11 Academic profile" and "D4.11
 * Academic profile · phone", approved 18 October 2026): a summary in three panels, each opening
 * its own screen, which saves with Save changes and goes back to the summary. Pure, so the words
 * and rules are tested; Academic.tsx only draws them.
 */

/** Academic is first run's address: before grades it is first run (3.1) */
export const ACADEMIC_PATH = FIRST_RUN_PATH

export type AcademicScreen = 'interests' | 'countries' | 'subjects'

const SCREENS: readonly AcademicScreen[] = ['interests', 'countries', 'subjects']

/** Each screen has its own address, so Back and a reload keep it: ?edit=interests */
export const SCREEN_PARAM = 'edit'

export function readScreen(params: { get(name: string): string | null }): AcademicScreen | null {
  const value = params.get(SCREEN_PARAM)
  return SCREENS.find((screen) => screen === value) ?? null
}

export function academicHref(screen: AcademicScreen | null): string {
  return screen ? `${ACADEMIC_PATH}?${SCREEN_PARAM}=${screen}` : ACADEMIC_PATH
}

/** What each screen changes, as its title, its toasts and the leave dialog name it */
const WHAT: Record<AcademicScreen, string> = {
  interests: 'interests',
  countries: 'countries',
  subjects: 'subjects and grades'
}

/** "Update your interests · IB Match", or "Academic profile · IB Match" on the summary */
export function academicTitle(screen: AcademicScreen | null): string {
  return screen ? `Update your ${WHAT[screen]} · IB Match` : 'Academic profile · IB Match'
}

/** Back on Academic after Save changes (D2.9), with See matches */
export const savedMessage = (screen: AcademicScreen) =>
  `Your ${WHAT[screen]} are saved, and your matches are updated.`

/** Save changes failed: the student stays, with the change, and Try again */
export const failedMessage = (screen: AcademicScreen) => `Couldn’t save your ${WHAT[screen]}.`

/** "Leave without saving?" (D2.10) */
export const leaveText = (screen: AcademicScreen) =>
  `Your changes to your ${WHAT[screen]} aren’t saved yet. If you leave, your profile stays as it was.`

/** The names of the chosen ones, in the reference list's order */
export function namesInOrder(all: { id: string; name: string }[], ids: string[]): string[] {
  const chosen = new Set(ids)
  return all.filter((item) => chosen.has(item.id)).map((item) => item.name)
}

export function sameChoice(a: string[], b: string[]): boolean {
  const set = new Set(a)
  return set.size === new Set(b).size && b.every((id) => set.has(id))
}

export interface SubjectLine {
  name: string
  level: 'SL' | 'HL'
  grade: number
  /** What a screen reader hears after the name: "Higher Level, grade 6" */
  said: string
}

/** The six subjects in their rows' order, the order of the IB groups (D3.6) */
export function subjectLines(rows: SubjectRow[], courses: EditorCourse[]): SubjectLine[] {
  return chosenSubjects(rows, courses).map(({ courseName, level, grade }) => ({
    name: courseName,
    level,
    grade,
    said: `${level === 'HL' ? 'Higher Level' : 'Standard Level'}, grade ${grade}`
  }))
}

/** Under the total: "36 from subjects, 2 core points" */
export function totalDetail(rows: SubjectRow[], tok: string | null, ee: string | null): string {
  const fromSubjects = rows.reduce((sum, row) => sum + (row.grade ?? 0), 0)
  const core = getCorePoints(tok, ee)
  if (typeof core !== 'number') return `${fromSubjects} from subjects`
  return `${fromSubjects} from subjects, ${core} core point${core === 1 ? '' : 's'}`
}

/**
 * A saved profile the IB's rules stop (3 of 156 profiles on 18 October 2026): the first reason,
 * in the subject editor's words, for the subjects panel. Null for a diploma the IB awards.
 */
export function savedProfileProblem(
  rows: SubjectRow[],
  tok: string | null,
  ee: string | null,
  courses: EditorCourse[]
): string | null {
  return checkDiploma(chosenSubjects(rows, courses), tok, ee).reasons[0] ?? null
}

/** The Interests panel's count: "2 of 5" */
export const interestsCount = (n: number) => `${n} of ${MAX_FIELDS}`

/** The Countries panel's count: "3 countries", and none beside Open to anywhere */
export const countriesCount = (n: number, anywhere: boolean) =>
  anywhere ? '' : `${n} ${n === 1 ? 'country' : 'countries'}`

/** What a screen's footer says, and whether Save changes can go on */
export interface ScreenStatus {
  text: string
  count?: number
  detail?: string
  notice?: boolean
  strong?: boolean
  ready: boolean
}

const NO_CHANGES = 'No changes to save yet'
const NOT_SAVED = 'Not saved yet'

/**
 * Interests (D4.11): "2 of 5 chosen" over "No changes to save yet", Save changes waiting; after a
 * change, "3 of 5 chosen" over "Not saved yet". A box at the limit says why it didn't tick.
 */
export function interestsStatus(
  chosen: string[],
  saved: string[],
  refused: string | null
): ScreenStatus {
  const changed = !sameChoice(chosen, saved)
  const ready = changed && chosen.length > 0
  if (refused) return { text: refused, notice: true, ready }
  if (chosen.length === 0) return { text: 'Choose at least one field', ready: false }
  return {
    count: chosen.length,
    text: ` of ${MAX_FIELDS} chosen`,
    detail: changed ? NOT_SAVED : NO_CHANGES,
    strong: changed,
    ready
  }
}

/** Countries (D4.11): "3 chosen", or "Every country", over whether there is a change to save */
export function countriesStatus(
  chosen: string[],
  anywhere: boolean,
  saved: { countries: string[]; anywhere: boolean }
): ScreenStatus {
  const changed = anywhere !== saved.anywhere || (!anywhere && !sameChoice(chosen, saved.countries))
  const detail = changed ? NOT_SAVED : NO_CHANGES
  if (anywhere) return { text: 'Every country', detail, strong: true, ready: changed }
  if (chosen.length === 0) return { text: 'Choose a country, or Open to anywhere', ready: false }
  return { count: chosen.length, text: ' chosen', detail, strong: changed, ready: changed }
}
