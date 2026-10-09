/**
 * A match's status, badge and requirement chips for the new cards (rebranding 2.1,
 * `docs/UX/design-refresh-2026/04-design-system.md` §9). Pure: it reads a `MatchResult` and
 * never changes a score.
 *
 * The status is requirement-based (owner, 7 October 2026): Meets all requirements, Within
 * reach, or Missing a requirement. The V10 `category` stays unused by the UI. Scores only order
 * cards within a status and appear inside "Why this match".
 *
 * Course names are the stored ones ("Mathematics: Analysis and Approaches"). For an either/or
 * the chip names the course the student took, at every level and grade the group accepts it,
 * as the program card does (`optionsForCourse`); with none taken, the whole group.
 */

import type {
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
  type RequirementGroup
} from '@/lib/programs/requirement-groups'
import { requirementsCheck } from '@/lib/programs/entry-year'

/** The card's status, as `StatusBadge` takes it: meets all, within reach, missing one. */
export type CardStatus = 'meets' | 'close' | 'gap'

/** A chip's look, as `RequirementChip` takes it. */
export type ChipKind = 'met' | 'close' | 'gap' | 'info'

export interface MatchChip {
  kind: ChipKind
  /** "Maths HL 7 · you 6". The icon and the spoken "Met:" or "Missing:" come from `kind`. */
  label: string
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
const CLOSE_POINTS = 3

/** Chips a card shows before met ones collapse into "+N met". */
const CARD_CHIPS = 4

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
  for (const detail of academicMatch.subjectMatches) assessed.push(assessSubject(detail))

  const notes: string[] = []
  if (academicMatch.subjectMatches.length === 0) notes.push('No named subjects')
  if (!fieldMatch.isMatch && !fieldMatch.noPreferences) {
    notes.push(`${input.fieldName} · not your field`)
  }
  if (!locationMatch.isMatch && !locationMatch.noPreferences) {
    notes.push(`${input.countryName} · not one of your countries`)
  }
  const check = requirementsCheck(input.requirementsEntryYear, input.now)
  if (check.status === 'older') notes.push(`Checked for ${check.entryYear} entry`)

  const chips = [
    ...KIND_ORDER.flatMap((kind) =>
      assessed.filter((a) => a.chip.kind === kind).map((a) => a.chip)
    ),
    ...notes.map((label): MatchChip => ({ kind: 'info', label }))
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

function assessSubject(detail: SubjectMatchDetail): Assessed {
  const kind = kindOf(detail)
  const { gradeGap, studentLevel, studentGrade } = detail
  const group = groupOf(detail.requirement)
  const courseId =
    'options' in detail.requirement ? detail.matchedCourseId : detail.requirement.courseId
  // The course the student took, at every level and grade the requirement accepts it
  const option = kind !== 'not_taken' && courseId ? optionsForCourse(group, courseId)[0] : undefined
  const named = option
    ? `${formatCourses(option.courses)} ${formatLevelGrades(option.levelGrades)}`
    : describeRequirement(group)
  const courseName = option ? formatCourses(option.courses) : named
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
          label: studentGrade ? `${named} · you ${level}${studentGrade}` : named
        },
        source: 'subject',
        need: studentGrade && gradeGap ? `a ${studentGrade + gradeGap} in ${courseName}` : named
      }
    case 'level_short':
      return {
        chip: { kind: 'gap', label: `${named} · you SL` },
        source: 'subject',
        need: `${courseName} HL`
      }
    case 'not_taken': {
      const groupLevels = new Set(group.options.flatMap((o) => o.levelGrades.map((lg) => lg.level)))
      const allCourses = formatCourses(group.options.flatMap((o) => o.courses))
      return {
        chip: { kind: 'gap', label: `${named} · not taken` },
        source: 'subject',
        need: groupLevels.size === 1 ? `${allCourses} ${[...groupLevels][0]}` : allCourses
      }
    }
  }
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
      ibCourse: { id: o.courseId, name: o.courseName }
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
