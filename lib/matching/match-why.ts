/**
 * What "Why this match" shows (rebranding 2.2, board "D3.2 Why this match", approved 10 October
 * 2026; 04-design-system.md §9): every requirement against the student's own grades, one note on
 * what would close the gap, field and country, and the fit score with its working. Pure: it
 * reads a match result and never changes a score. The logic of the old MatchBreakdown, in words.
 *
 * The rows are the requirement checklist of "D3.4 Requirement checklist" at 14px: the status,
 * the requirement, what it needs and what the student has, why a row falls short ("One grade
 * below"), and the other courses that would count, each at its own level and grade.
 */

import type { MatchResult } from './types'
import {
  CLOSE_POINTS,
  formatRate,
  subjectFacts,
  type CardStatus,
  type ChipKind,
  type SubjectFacts
} from './match-status'
import {
  compareLevelGrades,
  formatLevelGrades,
  type LevelGrade,
  type RequirementOption
} from '@/lib/programs/requirement-groups'
import { currentEntryYear, requirementsCheck } from '@/lib/programs/entry-year'

/** An either/or lists up to eight courses in its row; more open from "All N options" (D3.2). */
export const LISTED_COURSES = 8

export interface WhyRow {
  kind: ChipKind
  /** The points, a subject, or the line for a program that names no subjects */
  type: 'points' | 'subject' | 'none'
  /** "IB Diploma points", "Maths AA", "One of 12 courses" */
  name: string
  /** "39", "HL 7", "HL 4 or SL 6", "No minimum", "None" */
  needed: string
  /** "38", "HL 6"; null for a course the student doesn't take */
  you: string | null
  /** Why it falls short, in the status colour: "One grade below" */
  reason?: string
  /** The other courses that count, or the admit rate: "or Maths AI at HL 7" */
  detail?: string
  /** A group of more than eight courses, listed by level and grade behind "All N options" */
  options?: { count: number; groups: { label: string; courses: string }[] }
}

export type WhyIntake =
  { status: 'older'; entryYear: number; currentYear: number } | { status: 'unchecked' } | null

export interface FitPart {
  /** "Academic", "Country", "Field" */
  label: string
  /** "68% × 60%" */
  calc: string
  /** Its share of the score, in points: 41 */
  value: number
  /** The bar: the part's own score, 0 to 100 */
  percent: number
}

export interface WhyThisMatch {
  rows: WhyRow[]
  /** What would close it, or why better grades can't */
  note: { kind: ChipKind; text: string }
  /** The caution line when the requirements are from an earlier intake or unchecked */
  intake: WhyIntake
  /** The program's own page, which the caution line links to */
  programUrl: string | null
  field: { kind: 'met' | 'info'; text: string }
  country: { kind: 'met' | 'info'; text: string }
  fit: { score: number; parts: FitPart[]; sentence: string }
}

export interface WhyInput {
  result: Pick<
    MatchResult,
    | 'overallScore'
    | 'academicMatch'
    | 'fieldMatch'
    | 'locationMatch'
    | 'weightsUsed'
    | 'adjustments'
  >
  /** The card's status, from deriveMatchStatus, so the note agrees with the badge */
  status: CardStatus
  studentPoints: number
  minIBPoints: number | null
  fieldName: string
  countryName: string
  /** "US": the no-minimum note speaks of US universities only for them */
  countryCode: string
  universityName: string
  admitRate: number | null
  internationalAdmitRate: number | null
  admitRateYear: number | null
  requirementsEntryYear: number | null
  programUrl: string | null
  now?: Date
}

export function whyThisMatch(input: WhyInput): WhyThisMatch {
  const { academicMatch } = input.result
  const facts = academicMatch.subjectMatches.map(subjectFacts)
  const subjects = facts.map((f) => ({ facts: f, row: subjectRow(f) }))
  const order: ChipKind[] = ['gap', 'close', 'met', 'info']
  subjects.sort((a, b) => order.indexOf(a.row.kind) - order.indexOf(b.row.kind))

  const rows: WhyRow[] = [pointsRow(input), ...subjects.map((s) => s.row)]
  if (facts.length === 0) {
    rows.push({ kind: 'info', type: 'none', name: 'Named subjects', needed: 'None', you: '–' })
  }

  const check = requirementsCheck(input.requirementsEntryYear, input.now)
  return {
    rows,
    note: note(input, facts),
    intake:
      check.status === 'older'
        ? { status: 'older', entryYear: check.entryYear, currentYear: currentEntryYear(input.now) }
        : check.status === 'unchecked'
          ? { status: 'unchecked' }
          : null,
    programUrl: input.programUrl,
    field: preference(input.result.fieldMatch, input.fieldName, 'field', 'fields'),
    country: preference(input.result.locationMatch, input.countryName, 'country', 'countries'),
    fit: fit(input, facts)
  }
}

function pointsRow(input: WhyInput): WhyRow {
  const you = String(input.studentPoints)
  if (!input.minIBPoints) {
    return {
      kind: 'info',
      type: 'points',
      name: 'IB Diploma points',
      needed: 'No minimum',
      you,
      detail: holisticDetail(input)
    }
  }
  const short = Math.max(0, input.minIBPoints - input.studentPoints)
  return {
    kind: short === 0 ? 'met' : short <= CLOSE_POINTS ? 'close' : 'gap',
    type: 'points',
    name: 'IB Diploma points',
    needed: String(input.minIBPoints),
    you
  }
}

/** "Holistic admission. MIT admitted 4.6% of first-year applicants for fall 2025." */
function holisticDetail(input: WhyInput): string {
  if (input.admitRate == null) return 'Holistic admission.'
  const year = input.admitRateYear ? ` for fall ${input.admitRateYear}` : ''
  const international =
    input.internationalAdmitRate == null
      ? ''
      : `, and ${formatRate(input.internationalAdmitRate)} of international applicants`
  return `Holistic admission. ${input.universityName} admitted ${formatRate(input.admitRate)} of first-year applicants${year}${international}.`
}

function subjectRow(facts: SubjectFacts): WhyRow {
  const { kind, gradeGap, studentLevel, studentGrade, group, option, courseCount } = facts
  const rowKind: ChipKind =
    kind === 'met' ? 'met' : kind === 'grade_short' && gradeGap === 1 ? 'close' : 'gap'
  const listed = courseCount <= LISTED_COURSES

  if (option) {
    const mine = option.courses[0]
    const others = withoutCourse(group.options, mine.id)
    let detail = !listed
      ? `Any one of ${courseCount} courses counts.`
      : others.length > 0
        ? `or ${describeOptions(others)}`
        : undefined
    // A course taken at HL counts for SL; say so where the row asks only for SL
    if (
      kind === 'met' &&
      studentLevel === 'HL' &&
      option.levelGrades.every((lg) => lg.level === 'SL')
    ) {
      detail = detail ? `${detail.replace(/\.$/, '')}. Your HL counts.` : 'Your HL counts.'
    }
    return {
      kind: rowKind,
      type: 'subject',
      name: mine.name,
      needed: formatLevelGrades(option.levelGrades),
      you: studentLevel && studentGrade ? `${studentLevel} ${studentGrade}` : '–',
      reason: reason(facts),
      detail,
      options: listed ? undefined : optionGroups(group.options, mine.id, courseCount)
    }
  }

  // Not taken: the requirement is named by its courses, or counted when there are many
  const [first, ...rest] = group.options
  if (!listed) {
    return {
      kind: 'gap',
      type: 'subject',
      name: `One of ${courseCount} courses`,
      needed: formatLevelGrades(unionLevelGrades(group.options)),
      you: null,
      reason: reason(facts),
      options: optionGroups(group.options, null, courseCount)
    }
  }
  return {
    kind: 'gap',
    type: 'subject',
    name: listCourses(first.courses.map((c) => c.name)),
    needed: formatLevelGrades(first.levelGrades),
    you: null,
    reason: reason(facts),
    detail: rest.length > 0 ? `or ${describeOptions(rest)}` : undefined
  }
}

function reason({ kind, gradeGap }: SubjectFacts): string | undefined {
  switch (kind) {
    case 'met':
      return undefined
    case 'grade_short':
      if (!gradeGap) return 'Below the grade it asks for'
      return gradeGap === 1 ? 'One grade below' : `${gradeGap} grades below`
    case 'level_short':
      return 'SL where HL is needed'
    case 'not_taken':
      return 'Not in your diploma'
  }
}

/** The group's options with one course taken out, dropping any left empty. */
function withoutCourse(options: RequirementOption[], courseId: string | null): RequirementOption[] {
  return options
    .map((o) => ({ ...o, courses: o.courses.filter((c) => c.id !== courseId) }))
    .filter((o) => o.courses.length > 0)
}

/** "Maths AI at HL 7, or Physics at HL 6" */
function describeOptions(options: RequirementOption[]): string {
  return options
    .map(
      (o) => `${listCourses(o.courses.map((c) => c.name))} at ${formatLevelGrades(o.levelGrades)}`
    )
    .join(', or ')
}

/** "Biology, Maths AI or Physics" */
function listCourses(names: string[]): string {
  if (names.length <= 1) return names[0] ?? ''
  return `${names.slice(0, -1).join(', ')} or ${names[names.length - 1]}`
}

/** Every level and grade the group accepts, for "One of 12 courses · HL 6" */
function unionLevelGrades(options: RequirementOption[]): LevelGrade[] {
  const all = new Map<string, LevelGrade>()
  for (const lg of options.flatMap((o) => o.levelGrades)) all.set(`${lg.level} ${lg.minGrade}`, lg)
  return [...all.values()].sort(compareLevelGrades)
}

/** "HL 4 or SL 6 · 19 more": the courses behind "All 25 options", by level and grade */
function optionGroups(
  options: RequirementOption[],
  mineId: string | null,
  count: number
): NonNullable<WhyRow['options']> {
  const groups = options.flatMap((o) => {
    const rest = o.courses.filter((c) => c.id !== mineId)
    if (rest.length === 0) return []
    const more = rest.length < o.courses.length
    const noun = more ? 'more' : rest.length === 1 ? 'course' : 'courses'
    return [
      {
        label: `${formatLevelGrades(o.levelGrades)} · ${rest.length} ${noun}`,
        courses: rest.map((c) => c.name).join(', ')
      }
    ]
  })
  return { count, groups }
}

function note(input: WhyInput, facts: SubjectFacts[]): WhyThisMatch['note'] {
  const pointsShort = input.minIBPoints ? Math.max(0, input.minIBPoints - input.studentPoints) : 0

  if (input.status === 'meets') {
    if (!input.minIBPoints) {
      const who =
        input.countryCode === 'US'
          ? 'US universities read the whole application'
          : 'Admission is holistic: the whole application counts'
      return {
        kind: 'info',
        text: `Meeting the requirements doesn’t secure a place. ${who}, not a points total.`
      }
    }
    return { kind: 'met', text: `You meet every requirement.${ranking(input)}` }
  }

  // Better grades can't fix a subject that isn't taken, or one taken at SL
  const blockers = facts.filter((f) => f.kind === 'not_taken' || f.kind === 'level_short')
  if (blockers.length > 0) {
    const what =
      blockers.length > 2
        ? `${blockers.length} requirements need a subject or level you don’t have`
        : blockers.map(blocker).join(' and ')
    return {
      kind: 'gap',
      text: `${capitalise(what)}, so better grades alone won’t meet ${blockers.length > 2 ? 'them' : 'this'}.`
    }
  }

  const needs: string[] = []
  if (pointsShort > 0) {
    needs.push(`${count(pointsShort)} more ${pointsShort === 1 ? 'point' : 'points'} overall`)
  }
  for (const f of facts) {
    if (f.kind !== 'grade_short' || !f.studentGrade || !f.gradeGap || !f.option) continue
    const level = f.option.levelGrades.find((lg) => lg.level === f.studentLevel)?.level ?? ''
    needs.push(`a ${f.studentGrade + f.gradeGap} in ${f.option.courses[0].name} ${level}`.trim())
  }
  return {
    kind: input.status === 'close' ? 'close' : 'gap',
    text: needs.length > 0 ? `To close it: ${joinAnd(needs)}.` : 'Some requirements aren’t met yet.'
  }
}

/** "German B isn't in your diploma", "your Chemistry is SL where HL is needed" */
function blocker(f: SubjectFacts): string {
  if (f.kind === 'level_short' && f.option) {
    return `your ${f.option.courses[0].name} is SL where HL is needed`
  }
  const courses = f.group.options.flatMap((o) => o.courses.map((c) => c.name))
  if (courses.length === 1) return `${courses[0]} isn’t in your diploma`
  if (courses.length === 2) return `neither ${courses[0]} nor ${courses[1]} is in your diploma`
  return `none of the ${courses.length} courses it accepts is in your diploma`
}

/** Why a program that meets everything still ranks lower: not one of the student's choices */
function ranking(input: WhyInput): string {
  const { fieldMatch, locationMatch } = input.result
  const otherField = !fieldMatch.isMatch && !fieldMatch.noPreferences
  const otherCountry = !locationMatch.isMatch && !locationMatch.noPreferences
  if (otherField && otherCountry) {
    return ` ${input.fieldName} and ${input.countryName} aren’t among your fields and countries, so it ranks below the programs that are.`
  }
  if (otherField) {
    return ` ${input.fieldName} isn’t one of your fields, so it ranks below the programs in your fields.`
  }
  if (otherCountry) {
    return ` ${input.countryName} isn’t one of your countries, so it ranks below the programs in your countries.`
  }
  return ''
}

function preference(
  match: { isMatch: boolean; noPreferences: boolean },
  name: string,
  one: string,
  many: string
): { kind: 'met' | 'info'; text: string } {
  if (match.isMatch) return { kind: 'met', text: `${name}, one of yours` }
  if (match.noPreferences) return { kind: 'info', text: `${name}; you’re open to every ${one}` }
  return { kind: 'info', text: `${name}, not one of your ${many}` }
}

function fit(input: WhyInput, facts: SubjectFacts[]): WhyThisMatch['fit'] {
  const { academicMatch, locationMatch, fieldMatch, weightsUsed, adjustments } = input.result
  const part = (label: string, score: number, weight: number): FitPart => ({
    label,
    calc: `${percent(score)}% × ${percent(weight)}%`,
    value: Math.round(score * weight * 100),
    percent: percent(score)
  })
  return {
    score: percent(input.result.overallScore),
    parts: [
      part('Academic', academicMatch.score, weightsUsed.academic),
      part('Country', locationMatch.score, weightsUsed.location),
      part('Field', fieldMatch.score, weightsUsed.field)
    ],
    sentence: fitSentence(input, facts, adjustments)
  }
}

/**
 * "Adds up to 81%, capped at 80% because a required subject is one grade short." The caps and
 * penalties of lib/matching/penalties.ts, in plain words rather than its reasons strings.
 */
function fitSentence(
  input: WhyInput,
  facts: SubjectFacts[],
  adjustments: MatchResult['adjustments']
): string {
  const raw = percent(adjustments.rawScore)
  const final = percent(adjustments.finalScore)
  const start = `Adds up to ${raw}%`

  if (final === raw) {
    const rates =
      !input.minIBPoints && input.admitRate != null ? ' The score doesn’t use admit rates.' : ''
    return `${start}. Nothing lowers it.${rates}`
  }
  if (final > raw) {
    return adjustments.minimumScoreGuarantee
      ? `${start}, raised to ${final}% because you meet the points requirement.`
      : `${start}, raised to ${final}% for your field and country.`
  }

  const { caps } = adjustments
  if (caps.missingCriticalSubject !== undefined && final === percent(caps.missingCriticalSubject)) {
    return `${start}, lowered to ${final}% because a required subject is missing.`
  }
  if (
    caps.missingNonCriticalSubject !== undefined &&
    final === percent(caps.missingNonCriticalSubject)
  ) {
    return `${start}, lowered to ${final}% because a subject it asks for is missing.`
  }
  if (caps.criticalNearMiss !== undefined && final === percent(caps.criticalNearMiss)) {
    const nearMiss = facts.find((f) => f.isCritical && f.kind !== 'met' && f.kind !== 'not_taken')
    const why =
      nearMiss?.kind === 'level_short'
        ? 'is at SL where HL is needed'
        : nearMiss?.gradeGap === 1
          ? 'is one grade short'
          : 'is below the grade it asks for'
    return `${start}, capped at ${final}% because a required subject ${why}.`
  }
  if (caps.unmetRequirements !== undefined && final === percent(caps.unmetRequirements)) {
    const short = input.minIBPoints ? Math.max(0, input.minIBPoints - input.studentPoints) : 0
    return short > 0
      ? `${start}, capped at ${final}% because you’re ${short} ${short === 1 ? 'point' : 'points'} short.`
      : `${start}, capped at ${final}% because a requirement isn’t met in full.`
  }
  const unmet = facts.filter((f) => f.kind !== 'met').length
  return unmet > 1
    ? `${start}, lowered to ${final}% because ${unmet} requirements aren’t met.`
    : `${start}, lowered to ${final}% because a requirement isn’t met.`
}

function percent(value: number): number {
  return Math.round(value * 100)
}

/** "one", "two", "three", then numerals */
function count(n: number): string {
  return ['zero', 'one', 'two', 'three'][n] ?? String(n)
}

/** "a, and b"; "a, b, and c" */
function joinAnd(items: string[]): string {
  if (items.length <= 2) return items.join(', and ')
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
