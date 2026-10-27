/**
 * A match's status, badge and requirement chips for the new cards (rebranding 2.1,
 * `docs/UX/design-refresh-2026/04-design-system.md` §9). Pure: it reads a `MatchResult` and
 * never changes a score.
 *
 * The status is requirement-based (owner, 7 October 2026): Meets all requirements, Within
 * reach, or Missing a requirement. The V10 `category` stays unused by the UI. Scores only order
 * cards within a status and appear inside "Why this match".
 *
 * Course names are short ("Maths AA", `lib/ib/course-names.ts`). For an either/or the chip
 * names the course the student took, at every level and grade the group accepts it, as the
 * program card does (`optionsForCourse`). Short of it in a group of three or more courses, it
 * counts the others too ("Spanish B HL 5 or 5 others · you SL"). With none taken, it names the
 * group, or for a long group its first course and how many others. Copy approved on "D3.1 Match
 * card" (owner, 10 October 2026).
 */

import type {
  CourseLevel,
  IBGrade,
  MatchResult,
  ORGroupRequirement,
  SubjectMatchDetail,
  SubjectMatchKind,
  SubjectRequirement
} from './types'
import {
  describeRequirement,
  formatCourses,
  formatLevelGrades,
  groupRequirements,
  optionsForCourse,
  type RequirementGroup,
  type RequirementOption
} from '@/lib/programs/requirement-groups'
import { requirementsCheck } from '@/lib/programs/entry-year'
import { NO_IB_MINIMUM, NO_IB_MINIMUM_NOTE, formatRate } from '@/lib/programs/ib-minimum'
import { shortCourseName } from '@/lib/ib/course-names'

export { formatRate }

/** The card's status, as `StatusBadge` takes it: meets all, within reach, missing one. */
export type CardStatus = 'meets' | 'close' | 'gap'

/** A chip's look, as `RequirementChip` takes it. */
export type ChipKind = 'met' | 'close' | 'gap' | 'info'

export interface MatchChip {
  kind: ChipKind
  /** "Maths HL 7 · you 6". The icon and the spoken "Met:" or "Missing:" come from `kind`. */
  label: string
  /** Read out after the label only: " of first-year applicants" after "admits 4.6%". */
  spokenAfter?: string
  /** The "+2 met" chip, which says its kind already. */
  collapsed?: boolean
}

export interface MatchStatusInput {
  result: Pick<MatchResult, 'academicMatch' | 'fieldMatch' | 'locationMatch'>
  /** The student's total IB points. */
  studentPoints: number
  /** The program's minimum IB points; null when it names none. */
  minIBPoints: number | null
  /** "Medicine & Health", for the note when it isn't one of the student's fields. */
  fieldName: string
  /** "Germany", for the note when it isn't one of the student's countries. */
  countryName: string
  /** The intake the program's requirements were checked for. */
  requirementsEntryYear: number | null
  /**
   * The university's admit rate in percent (`University.admitRate`), for a program with no IB
   * minimum. Display only, like everything here.
   */
  admitRate?: number | null
  now?: Date
}

export interface MatchStatus {
  status: CardStatus
  /** "Meets all requirements", "Within reach · 1 point short", "Needs Biology HL and Chemistry HL" */
  badge: string
  /** Every chip: missing, then within reach, met, notes. `cardChips` fits them on a card. */
  chips: MatchChip[]
}

/** Points short that still count as within reach. */
export const CLOSE_POINTS = 3

/** Chips a card shows before met ones collapse into "+N met". */
const CARD_CHIPS = 4

/** Courses an unmet either/or names before it counts the rest: groups reach 45. */
const NAMED_COURSES = 2

const KIND_ORDER: ChipKind[] = ['gap', 'close', 'met', 'info']

/** One requirement and what the badge says it needs. */
interface Assessed {
  chip: MatchChip
  source: 'points' | 'subject'
  /** "6 more points", "Biology HL", "a 7 in Maths" */
  need: string
  /** Points short, for "Within reach · 2 points short". */
  pointsShort?: number
}

export function deriveMatchStatus(input: MatchStatusInput): MatchStatus {
  const { academicMatch, fieldMatch, locationMatch } = input.result

  const assessed: Assessed[] = []
  const points = assessPoints(input.studentPoints, input.minIBPoints)
  if (points) assessed.push(points)
  for (const facts of requirementFacts(academicMatch.subjectMatches)) {
    assessed.push(assessSubject(facts))
  }

  const notes: MatchChip[] = []
  const note = (label: string, spokenAfter?: string) =>
    notes.push(spokenAfter ? { kind: 'info', label, spokenAfter } : { kind: 'info', label })
  // A program with no minimum says why there is no points chip (content 6), first among the
  // notes, with the university's admit rate where it reports one (D2.7 change)
  if (!points) {
    if (input.admitRate == null) note(NO_IB_MINIMUM_NOTE)
    else
      note(`${NO_IB_MINIMUM} · admits ${formatRate(input.admitRate)}`, ' of first-year applicants')
  }
  if (academicMatch.subjectMatches.length === 0) note('No named subjects')
  if (!fieldMatch.isMatch && !fieldMatch.noPreferences) {
    note(`${input.fieldName} · not your field`)
  }
  if (!locationMatch.isMatch && !locationMatch.noPreferences) {
    note(`${input.countryName} · not one of your countries`)
  }
  const check = requirementsCheck(input.requirementsEntryYear, input.now)
  if (check.status === 'older') note(`Checked for ${check.entryYear} entry`)

  const chips = [
    ...KIND_ORDER.flatMap((kind) =>
      assessed.filter((a) => a.chip.kind === kind).map((a) => a.chip)
    ),
    ...notes
  ]

  const gaps = assessed.filter((a) => a.chip.kind === 'gap')
  const close = assessed.filter((a) => a.chip.kind === 'close')
  const closeSubjects = close.filter((a) => a.source === 'subject').length
  const pointsShort = close.find((a) => a.source === 'points')?.pointsShort ?? 0

  if (gaps.length === 0 && close.length === 0) {
    return { status: 'meets', badge: 'Meets all requirements', chips }
  }
  if (gaps.length === 0 && closeSubjects <= 1) {
    return { status: 'close', badge: withinReach(pointsShort, closeSubjects), chips }
  }
  return { status: 'gap', badge: `Needs ${listNeeds([...gaps, ...close])}`, chips }
}

/**
 * Every subject requirement in the chips' words, missing first, then within reach and met: the
 * compare table's Subjects row (rebranding 2.5, "D3.7 Compare table"), which shows them all
 * where a card collapses the met ones. Empty when the program names no subjects.
 */
export function subjectChips(subjectMatches: SubjectMatchDetail[]): MatchChip[] {
  const chips = requirementFacts(subjectMatches).map((facts) => assessSubject(facts).chip)
  return KIND_ORDER.flatMap((kind) => chips.filter((chip) => chip.kind === kind))
}

/**
 * The chips a card shows: at most four, problems and notes always, and the met ones that fit.
 * The rest collapse into "+N met" at the end.
 */
export function cardChips(chips: MatchChip[], max = CARD_CHIPS): MatchChip[] {
  if (chips.length <= max) return chips
  const others = chips.filter((c) => c.kind !== 'met').length
  const room = Math.max(0, max - others)
  const met = chips.filter((c) => c.kind === 'met')
  const hidden = met.length - room
  if (hidden <= 0) return chips
  const shown = new Set(met.slice(0, room))
  return [
    ...chips.filter((c) => c.kind !== 'met' || shown.has(c)),
    { kind: 'met', label: `+${hidden} met`, collapsed: true }
  ]
}

function assessPoints(studentPoints: number, minIBPoints: number | null): Assessed | null {
  // As the academic matcher: no minimum, or 0, is no points requirement.
  if (!minIBPoints) return null
  const short = Math.max(0, minIBPoints - studentPoints)
  return {
    chip: {
      kind: short === 0 ? 'met' : short <= CLOSE_POINTS ? 'close' : 'gap',
      label: `${studentPoints} / ${minIBPoints} points`
    },
    source: 'points',
    need: `${short} more ${short === 1 ? 'point' : 'points'}`,
    pointsShort: short
  }
}

/**
 * One subject requirement as the cards and "Why this match" judge it: its kind after the
 * own-level rule below, and the student's course within it.
 */
export interface SubjectFacts {
  kind: SubjectMatchKind
  gradeGap?: number
  studentLevel?: CourseLevel
  studentGrade?: IBGrade
  /** Critical to the program (the matcher's caps read it) */
  isCritical: boolean
  group: RequirementGroup
  /** The course the student took, at every level and grade the requirement accepts it */
  option?: RequirementOption
  /** Distinct courses the requirement accepts */
  courseCount: number
  /**
   * The student's course for it went to another requirement that needs a course of its own
   * (MAINT 5.18): its short name, and what that other requirement asks for ("HL 6"), the
   * same as this one's or not. `group` then holds only the courses left.
   */
  usedElsewhere?: { name: string; usedFor: string; sameNeed: boolean }
}

/**
 * What one requirement leaves out, when it needs a course of its own (MAINT 5.18,
 * "D2.7 Chip · a second subject"): the courses the student uses for the program's other such
 * requirements, so its "or …" lines and counts don't offer them again.
 */
export interface OwnCourseContext {
  exclude: Set<string>
  usedElsewhere?: SubjectFacts['usedElsewhere']
}

/**
 * Every requirement of one program, judged together: as `subjectFacts`, with what each that
 * needs a course of its own leaves out. A program without any gives the same facts as before.
 */
export function requirementFacts(subjectMatches: SubjectMatchDetail[]): SubjectFacts[] {
  const own = subjectMatches.map((d) => d.requirement.ownCourse === true)
  if (!own.some(Boolean)) return subjectMatches.map((d) => subjectFacts(d))
  const used = subjectMatches.map(usedCourseId)
  return subjectMatches.map((detail, i) => {
    if (!own[i]) return subjectFacts(detail)
    const exclude = new Set<string>()
    subjectMatches.forEach((_, j) => {
      if (j !== i && own[j] && used[j]) exclude.add(used[j])
    })
    const elsewhere = detail.courseUsedElsewhere
    let usedElsewhere: SubjectFacts['usedElsewhere']
    if (elsewhere) {
      exclude.add(elsewhere.courseId)
      // The requirement it went to: one that needs a course of its own, never an unmarked row
      // that may share it (Trinity's maths, which Maths AA HL also meets)
      const j = subjectMatches.findIndex(
        (_, k) => k !== i && own[k] && used[k] === elsewhere.courseId
      )
      const usedFor =
        j >= 0
          ? formatLevelGrades(
              optionsForCourse(groupOf(subjectMatches[j].requirement), elsewhere.courseId)[0]
                ?.levelGrades ?? []
            )
          : ''
      const need = levelsOf(withoutCourses(groupOf(detail.requirement), exclude))
      usedElsewhere = {
        name: shortCourseName(elsewhere.courseName),
        usedFor,
        sameNeed: usedFor === need
      }
    }
    if (used[i]) exclude.delete(used[i])
    return subjectFacts(detail, { exclude, usedElsewhere })
  })
}

/** The course a requirement was met or partly met with; none when nothing was taken */
function usedCourseId(detail: SubjectMatchDetail): string | null {
  if (detail.score === 0) return null
  return 'options' in detail.requirement
    ? (detail.matchedCourseId ?? null)
    : detail.requirement.courseId
}

/** The group without some courses; unchanged if that would leave none */
function withoutCourses(group: RequirementGroup, exclude: Set<string>): RequirementGroup {
  if (exclude.size === 0) return group
  const options = group.options
    .map((o) => ({ ...o, courses: o.courses.filter((c) => !exclude.has(c.id)) }))
    .filter((o) => o.courses.length > 0)
  return options.length > 0 ? { ...group, options } : group
}

/** Every level and grade a group asks for, once each: "HL 5", "HL 5 or SL 6" */
function levelsOf(group: RequirementGroup): string {
  return [...new Set(group.options.map((o) => formatLevelGrades(o.levelGrades)))].join(' or ')
}

export function subjectFacts(detail: SubjectMatchDetail, context?: OwnCourseContext): SubjectFacts {
  let kind = kindOf(detail)
  let { gradeGap } = detail
  const { studentLevel, studentGrade } = detail
  const group = withoutCourses(groupOf(detail.requirement), context?.exclude ?? new Set())
  const courseId =
    'options' in detail.requirement ? detail.matchedCourseId : detail.requirement.courseId
  const option = kind !== 'not_taken' && courseId ? optionsForCourse(group, courseId)[0] : undefined
  // An either/or can accept the course at the student's own level too ("Maths AA HL 5 or SL 7").
  // The matcher reports the option that scores best, and SL 6 for HL 5 outscores a grade short
  // at SL (MAINT_tasks.md 5.15), so judge the student at their own level. They can't meet it
  // there, or that option would have scored 1.
  const atTheirLevel = option?.levelGrades.filter((lg) => lg.level === studentLevel) ?? []
  if (kind === 'level_short' && studentGrade && atTheirLevel.length > 0) {
    kind = 'grade_short'
    gradeGap = Math.min(...atTheirLevel.map((lg) => lg.minGrade)) - studentGrade
  }
  return {
    kind,
    gradeGap,
    studentLevel,
    studentGrade,
    isCritical: detail.requirement.isCritical,
    group,
    option,
    courseCount: group.options.reduce((n, o) => n + o.courses.length, 0),
    ...(context?.usedElsewhere && { usedElsewhere: context.usedElsewhere })
  }
}

function assessSubject(facts: SubjectFacts): Assessed {
  const { kind, gradeGap, studentLevel, studentGrade, group, option, courseCount } = facts
  const named = option
    ? `${formatCourses(option.courses)} ${formatLevelGrades(option.levelGrades)}`
    : describeRequirement(group)
  const courseName = option ? formatCourses(option.courses) : named
  // Short of a group of three or more courses, the chip says the others count too
  const unmet = option && courseCount > NAMED_COURSES ? `${named} ${others(courseCount)}` : named
  // "your HL 6" only where the level isn't plain from the requirement
  const levels = (option ? [option] : group.options).flatMap((o) => o.levelGrades)
  const level =
    studentLevel && !levels.every((lg) => lg.level === studentLevel) ? `${studentLevel} ` : ''

  switch (kind) {
    case 'met':
      return {
        chip: { kind: 'met', label: level ? `${named} · your ${level}${studentGrade}` : named },
        source: 'subject',
        need: named
      }
    case 'grade_short':
      return {
        chip: {
          kind: gradeGap === 1 ? 'close' : 'gap',
          label: studentGrade ? `${unmet} · you ${level}${studentGrade}` : unmet
        },
        source: 'subject',
        need: studentGrade && gradeGap ? `a ${studentGrade + gradeGap} in ${courseName}` : named
      }
    case 'level_short':
      return {
        chip: { kind: 'gap', label: `${unmet} · you SL` },
        source: 'subject',
        need: `${courseName} HL`
      }
    case 'not_taken': {
      const courses = group.options.flatMap((o) => o.courses)
      const groupLevels = new Set(group.options.flatMap((o) => o.levelGrades.map((lg) => lg.level)))
      const atLevel = groupLevels.size === 1 ? ` ${[...groupLevels][0]}` : ''
      // The student took one, but it counts for another requirement (D2.7 Chip · a second
      // subject): "Chemistry or Physics HL 5 · Biology counts once"
      const why = facts.usedElsewhere ? `${facts.usedElsewhere.name} counts once` : 'not taken'
      if (courses.length <= NAMED_COURSES) {
        return {
          chip: { kind: 'gap', label: `${named} · ${why}` },
          source: 'subject',
          need: `${formatCourses(courses)}${atLevel}`
        }
      }
      // "French B HL 5 or 2 others"; "Why this match" lists every option. The badge puts the
      // level last: "Needs French B or 11 others at HL"
      const [first] = group.options
      const rest = others(courses.length)
      return {
        chip: {
          kind: 'gap',
          label: `${first.courses[0].name} ${formatLevelGrades(first.levelGrades)} ${rest} · ${why}`
        },
        source: 'subject',
        need: `${first.courses[0].name} ${rest}${atLevel ? ` at${atLevel}` : ''}`
      }
    }
  }
}

/** "or 5 others", for a group of six courses; only groups of three or more are counted */
function others(courseCount: number): string {
  return `or ${courseCount - 1} others`
}

/**
 * The matcher sets `kind` on every detail. One without it (a result cached before it existed)
 * falls back on `status`; a partial match then shows as missing, with no "you" values.
 */
function kindOf(detail: SubjectMatchDetail): SubjectMatchKind {
  if (detail.kind) return detail.kind
  if (detail.status === 'FULL_MATCH') return 'met'
  if (detail.status === 'NO_MATCH') return 'not_taken'
  return 'grade_short'
}

/** A requirement as `groupRequirements` reads it: one course, or an either/or's options. */
function groupOf(requirement: SubjectRequirement | ORGroupRequirement): RequirementGroup {
  const options = 'options' in requirement ? requirement.options : [requirement]
  const [group] = groupRequirements(
    options.map((o, i) => ({
      id: String(i),
      requiredLevel: o.level,
      minGrade: o.minimumGrade,
      orGroupId: 'requirement',
      ibCourse: { id: o.courseId, name: shortCourseName(o.courseName) }
    }))
  )
  return group
}

/** "Within reach · 1 point short", "Within reach · 1 grade short", "Within reach · 1 point, 1 grade" */
function withinReach(pointsShort: number, closeSubjects: number): string {
  const points = `${pointsShort} ${pointsShort === 1 ? 'point' : 'points'}`
  if (pointsShort > 0 && closeSubjects > 0) return `Within reach · ${points}, 1 grade`
  if (pointsShort > 0) return `Within reach · ${points} short`
  return 'Within reach · 1 grade short'
}

/** "Biology HL", "Biology HL and Chemistry HL", "Biology HL, Chemistry HL and 1 more" */
function listNeeds(assessed: Assessed[]): string {
  const needs = assessed.map((a) => a.need)
  if (needs.length <= 2) return needs.join(' and ')
  return `${needs[0]}, ${needs[1]} and ${needs.length - 2} more`
}
