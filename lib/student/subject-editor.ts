import { getCorePoints, CORE_FAILING_MESSAGE } from '@/lib/ib/core-points'
import {
  calculateTotalPoints,
  checkHigherLevelCount,
  DIPLOMA_SUBJECT_COUNT,
  otherFailingConditions,
  type NamedDiplomaCourse
} from '@/lib/ib/diploma'
import type { PickerGroup } from '@/components/ds/picker-filter'

/*
 * The subject editor's rules (rebranding 3.2; boards "D3.6 Subject editor" and "D4.5 First run,
 * step 3", approved 14 October 2026): six rows, one per IB group, any subject in any row, then TOK
 * and the Extended Essay. What the footer says, what Finish needs and what Save and exit keeps.
 * Pure, so the rules are tested; ProfileEditor and first run only draw them.
 */

export type Level = 'SL' | 'HL'

/** One row: nothing is chosen until the student chooses it, and a row counts once all three are */
export interface SubjectRow {
  courseId: string | null
  level: Level | null
  grade: number | null
}

export interface SubjectsState {
  rows: SubjectRow[]
  tok: string | null
  ee: string | null
}

export interface EditorCourse {
  id: string
  name: string
  /** The IB group, 1 to 6 */
  group: number
}

/** A saved subject, as the profile holds it */
export interface SavedSubject {
  courseId: string
  level: Level
  grade: number
}

/** The rows' labels. The last takes any subject: 130 of 152 students fill it with another (D3.6). */
export const ROW_LABELS = [
  'Group 1 · Language and literature',
  'Group 2 · Language acquisition',
  'Group 3 · Individuals and societies',
  'Group 4 · Sciences',
  'Group 5 · Mathematics',
  'Group 6 · The arts, or another subject'
] as const

/** The groups in the subject list (D2.3) */
const LIST_LABELS: Record<number, string> = {
  1: 'Group 1 · Language and literature',
  2: 'Group 2 · Language acquisition',
  3: 'Group 3 · Individuals and societies',
  4: 'Group 4 · Sciences',
  5: 'Group 5 · Mathematics',
  6: 'Group 6 · The arts'
}

export const listLabel = (group: number) => LIST_LABELS[group] ?? `Group ${group}`

export const IN_YOUR_SUBJECTS = 'In your subjects'

const EMPTY_ROW: SubjectRow = { courseId: null, level: null, grade: null }

export const isComplete = (row: SubjectRow) =>
  row.courseId !== null && row.level !== null && row.grade !== null

/**
 * Where a saved profile's subjects go: each in its own group's row, then a second subject from one
 * group in row 6, else in the first empty row (D3.6).
 */
export function placeSubjects(saved: SavedSubject[], courses: EditorCourse[]): SubjectRow[] {
  const rows: SubjectRow[] = Array.from({ length: DIPLOMA_SUBJECT_COUNT }, () => EMPTY_ROW)
  const groupOf = new Map(courses.map((course) => [course.id, course.group]))
  const rest: SavedSubject[] = []

  for (const subject of saved.slice(0, DIPLOMA_SUBJECT_COUNT)) {
    const at = (groupOf.get(subject.courseId) ?? 0) - 1
    if (at >= 0 && at < DIPLOMA_SUBJECT_COUNT && rows[at].courseId === null) {
      rows[at] = { ...subject }
    } else {
      rest.push(subject)
    }
  }
  for (const subject of rest) {
    const last = DIPLOMA_SUBJECT_COUNT - 1
    const at = rows[last].courseId === null ? last : rows.findIndex((row) => row.courseId === null)
    rows[at] = { ...subject }
  }
  return rows
}

/**
 * The list for row `index`: every subject, grouped as the IB groups them; the row's own group
 * comes first in the picker (`firstGroup`). A subject in another row is greyed, "In your
 * subjects", and can't be picked twice (D2.3).
 */
export function pickerGroups(
  courses: EditorCourse[],
  rows: SubjectRow[],
  index: number
): PickerGroup[] {
  const taken = new Set(
    rows.filter((_, i) => i !== index).flatMap((row) => (row.courseId ? [row.courseId] : []))
  )
  const groups = new Map<number, PickerGroup>()
  for (const course of courses) {
    const group = groups.get(course.group) ?? { label: listLabel(course.group), options: [] }
    group.options.push({
      value: course.id,
      label: course.name,
      ...(taken.has(course.id) && { disabled: true, note: IN_YOUR_SUBJECTS })
    })
    groups.set(course.group, group)
  }
  return [...groups.entries()].sort(([a], [b]) => a - b).map(([, group]) => group)
}

/** The complete rows, named, as the diploma rules and the profile API take them */
export function chosenSubjects(
  rows: SubjectRow[],
  courses: EditorCourse[]
): (NamedDiplomaCourse & SavedSubject)[] {
  const names = new Map(courses.map((course) => [course.id, course.name]))
  return rows.filter(isComplete).map((row) => ({
    courseId: row.courseId!,
    courseName: names.get(row.courseId!) ?? '',
    level: row.level!,
    grade: row.grade!
  }))
}

const sum = (rows: SubjectRow[]) =>
  rows.filter(isComplete).reduce((total, row) => total + row.grade!, 0)

const points = (n: number) => `${n} point${n === 1 ? '' : 's'}`
const corePointsWord = (n: number) => `${n} core point${n === 1 ? '' : 's'}`

/** Everything is in: six complete rows and both core grades */
export function isWhole(state: SubjectsState): boolean {
  return state.rows.every(isComplete) && state.tok !== null && state.ee !== null
}

/** The line under the subjects about Higher Level, from the first level chosen (D3.6) */
export function higherLevelLine(
  rows: SubjectRow[]
): { tone: 'info' | 'ok' | 'gap'; text: string } | null {
  const levelled = rows.filter((row) => row.courseId !== null && row.level !== null)
  if (levelled.length === 0) return null
  const hl = levelled.filter((row) => row.level === 'HL').length
  if (levelled.length < DIPLOMA_SUBJECT_COUNT) {
    return { tone: 'info', text: `${hl} at Higher Level so far. The diploma needs 3 or 4.` }
  }
  const problem = checkHigherLevelCount(
    levelled.map((row) => ({ level: row.level!, grade: row.grade ?? 0 }))
  )
  if (problem) return { tone: 'gap', text: problem }
  return {
    tone: 'ok',
    text: `${hl} at Higher Level, ${DIPLOMA_SUBJECT_COUNT - hl} at Standard Level`
  }
}

/** The IB's other failing conditions, once everything is in (lib/ib/diploma.ts words) */
export function ibConditions(state: SubjectsState, courses: EditorCourse[]): string[] {
  if (!isWhole(state)) return []
  return otherFailingConditions(chosenSubjects(state.rows, courses), state.tok, state.ee)
}

/** The line under TOK and the EE: what the core is worth, or nothing when an E fails it */
export function coreLine(tok: string | null, ee: string | null): string | null {
  const core = getCorePoints(tok, ee)
  if (core === 'failing') return null
  if (core === null) return 'Together they add up to 3 points to your total.'
  return `${corePointsWord(core)} from TOK ${tok} and EE ${ee}`
}

/** D2.4's message for an E, under the first core grade that has one */
export function coreMessage(tok: string | null, ee: string | null) {
  if (tok === 'E') return { under: 'tok' as const, text: CORE_FAILING_MESSAGE }
  if (ee === 'E') return { under: 'ee' as const, text: CORE_FAILING_MESSAGE }
  return null
}

/** What to move focus to when Finish is pressed before it can go on */
export type EditorTarget =
  { row: number; part: 'subject' | 'level' | 'grade' } | { core: 'tok' | 'ee' } | { checks: true }

/** What is still missing, in the order of the page */
function missing(state: SubjectsState, courses: EditorCourse[]) {
  const names = new Map(courses.map((course) => [course.id, course.name]))
  const left: { text: string; target: EditorTarget }[] = []
  state.rows.forEach((row, i) => {
    if (row.courseId === null) {
      left.push({ text: `Add your Group ${i + 1} subject`, target: { row: i, part: 'subject' } })
      return
    }
    const name = names.get(row.courseId) ?? 'this subject'
    if (row.level === null) {
      const what = row.grade === null ? 'a level and grade' : 'a level'
      left.push({ text: `Add ${what} for ${name}`, target: { row: i, part: 'level' } })
    } else if (row.grade === null) {
      left.push({ text: `Add a grade for ${name}`, target: { row: i, part: 'grade' } })
    }
  })
  if (state.tok === null && state.ee === null) {
    left.push({ text: 'Add your TOK and EE grades', target: { core: 'tok' } })
  } else if (state.tok === null) {
    left.push({ text: 'Add your TOK grade', target: { core: 'tok' } })
  } else if (state.ee === null) {
    left.push({ text: 'Add your Extended Essay grade', target: { core: 'ee' } })
  }
  return left
}

export type FooterLine =
  /** "4 of 6 subjects", over "So far 24 points" */
  | { kind: 'count'; done: number; soFar: string | null }
  /** "Add your Group 6 subject", over "So far 32 points" */
  | { kind: 'left'; text: string; soFar: string | null }
  /** "Total 38 points", over "36 from subjects, 2 core points" or the total before the changes */
  | { kind: 'total'; total: number; detail: string }
  /** A check Finish can't pass, with Lucide Info */
  | { kind: 'reason'; text: string }

export interface EditorFooter {
  line: FooterLine
  /** Finish (or Save changes) can go on */
  ready: boolean
  /** Where pressing it early moves focus */
  target: EditorTarget | null
}

function equalRows(a: SubjectsState, b: SubjectsState): boolean {
  return (
    a.tok === b.tok &&
    a.ee === b.ee &&
    a.rows.length === b.rows.length &&
    a.rows.every(
      (row, i) =>
        row.courseId === b.rows[i].courseId &&
        row.level === b.rows[i].level &&
        row.grade === b.rows[i].grade
    )
  )
}

const totalOf = (state: SubjectsState, courses: EditorCourse[]) =>
  calculateTotalPoints(chosenSubjects(state.rows, courses), state.tok, state.ee)

/**
 * The footer's line and whether Finish can go on (D3.6, 14 states). A failed check takes the
 * line's place: the Higher Level count, an E in the core, then the IB's other conditions. Until
 * everything is in, the count and "So far", or the one thing left. After first run (`saved`,
 * the profile as it was opened) the button is Save changes, which waits for a change.
 */
export function editorFooter(
  state: SubjectsState,
  courses: EditorCourse[],
  saved: SubjectsState | null = null
): EditorFooter {
  const verb = saved ? 'save' : 'finish'
  const reason = (text: string, target: EditorTarget): EditorFooter => ({
    line: { kind: 'reason', text },
    ready: false,
    target
  })

  const hl = higherLevelLine(state.rows)
  if (hl?.tone === 'gap') return reason(hl.text, { checks: true })

  const failing = coreMessage(state.tok, state.ee)
  if (failing) {
    const which =
      state.tok === 'E' && state.ee === 'E'
        ? 'TOK and Extended Essay grades'
        : state.tok === 'E'
          ? 'a TOK grade'
          : 'an Extended Essay grade'
    return reason(`To ${verb}, choose ${which} from A to D.`, { core: failing.under })
  }

  if (isWhole(state)) {
    if (ibConditions(state, courses).length > 0) {
      return reason('With these grades, the IB wouldn’t award the diploma.', { checks: true })
    }
    const total = totalOf(state, courses)!
    const fromSubjects = sum(state.rows)
    const detail = `${fromSubjects} from subjects, ${corePointsWord(total - fromSubjects)}`
    if (!saved) return { line: { kind: 'total', total, detail }, ready: true, target: null }
    if (equalRows(state, saved)) {
      return {
        line: { kind: 'total', total, detail: 'No changes to save yet' },
        ready: false,
        target: null
      }
    }
    const before = totalOf(saved, courses)
    return {
      line: {
        kind: 'total',
        total,
        detail: before === null ? detail : `Was ${before} before your changes`
      },
      ready: true,
      target: null
    }
  }

  const core = getCorePoints(state.tok, state.ee)
  const sofar = sum(state.rows) + (typeof core === 'number' ? core : 0)
  const done = state.rows.filter(isComplete).length
  const soFar = done > 0 || typeof core === 'number' ? `So far ${points(sofar)}` : null
  const left = missing(state, courses)
  if (left.length === 1) {
    return {
      line: { kind: 'left', text: left[0].text, soFar },
      ready: false,
      target: left[0].target
    }
  }
  return { line: { kind: 'count', done, soFar }, ready: false, target: left[0]?.target ?? null }
}

/** What Save and exit keeps (D4.5): each complete row and the core, without a total */
export function subjectsDraft(state: SubjectsState) {
  return {
    step: 'subjects' as const,
    courses: state.rows
      .filter(isComplete)
      .map((row) => ({ courseId: row.courseId!, level: row.level!, grade: row.grade! })),
    tokGrade: state.tok,
    eeGrade: state.ee
  }
}

/** Nothing to keep: no complete row and no core grade */
export function isBlank(state: SubjectsState): boolean {
  return !state.rows.some(isComplete) && state.tok === null && state.ee === null
}
