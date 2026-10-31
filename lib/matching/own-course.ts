/**
 * Requirements that need a course of their own (MAINT 5.18)
 *
 * Each requirement is otherwise checked against all of the student's courses on its own, so one
 * course can meet two: Manchester's MBChB asks for "Chemistry or Biology, plus another science",
 * and one Biology HL 6 met both. Requirements marked `ownCourse` are instead given different
 * courses. The assignment meets as many of them as it can, then has the highest scores, then
 * meets the most demanding ones (so what is left to find is the easier subject), then keeps as
 * many as possible on the course each would use alone; ties go to the earliest requirement and
 * course. A marked requirement left without a course is not met, and says
 * which course it would have used (`courseUsedElsewhere`).
 *
 * Programs have a handful of requirements and students six courses or so, so every assignment
 * is tried.
 */

import type {
  ORGroupRequirement,
  StudentCourse,
  SubjectMatchDetail,
  SubjectRequirement
} from './types'
import { calculateORGroupMatch, calculateSubjectMatch } from './subject-matcher'

export type Requirement = SubjectRequirement | ORGroupRequirement

function isGroup(requirement: Requirement): requirement is ORGroupRequirement {
  return 'options' in requirement
}

/** How one requirement fares against the given courses, as the matcher reports it */
export function evaluateRequirement(
  requirement: Requirement,
  courses: StudentCourse[]
): SubjectMatchDetail {
  return isGroup(requirement)
    ? calculateORGroupMatch(requirement, courses)
    : calculateSubjectMatch(requirement, courses)
}

/** The course a detail was met (or partly met) with; none when nothing was taken */
function detailCourseId(requirement: Requirement, detail: SubjectMatchDetail): string | null {
  if (detail.score === 0) return null
  return isGroup(requirement) ? (detail.matchedCourseId ?? null) : requirement.courseId
}

/** How demanding a requirement is: HL above SL, then the grade; a group's hardest option */
function demand(requirement: Requirement): number {
  const options = isGroup(requirement) ? requirement.options : [requirement]
  return Math.max(...options.map((o) => (o.level === 'HL' ? 10 : 0) + o.minimumGrade))
}

/** Scores within this are equal: sums of the same scores in another order */
const EPSILON = 1e-9

interface Choice {
  /** Index into the student's courses, or -1 for none */
  course: number
  detail: SubjectMatchDetail
}

/**
 * The details for `requirements`, in their order, when each needs a course of its own.
 * `alone` holds each one's detail against all of the student's courses, as the matcher works
 * it out without the rule.
 */
export function assignOwnCourses(
  requirements: Requirement[],
  courses: StudentCourse[],
  alone: SubjectMatchDetail[]
): SubjectMatchDetail[] {
  const aloneCourse = requirements.map((r, i) => detailCourseId(r, alone[i]))
  const demands = requirements.map(demand)

  // What each requirement can use: every course that scores, and none
  const choices: Choice[][] = requirements.map((requirement) => {
    const options: Choice[] = []
    courses.forEach((course, index) => {
      const detail = evaluateRequirement(requirement, [course])
      if (detail.score > 0) options.push({ course: index, detail })
    })
    options.push({ course: -1, detail: evaluateRequirement(requirement, []) })
    return options
  })

  let best: Choice[] | null = null
  let bestMet = -1
  let bestScore = -1
  let bestDemand = -1
  let bestKept = -1
  const current: Choice[] = []
  const used = new Set<number>()

  function search(i: number, met: number, score: number, metDemand: number, kept: number) {
    if (i === requirements.length) {
      const sameScore = Math.abs(score - bestScore) <= EPSILON
      const better =
        met > bestMet ||
        (met === bestMet && score > bestScore + EPSILON) ||
        (met === bestMet && sameScore && metDemand > bestDemand) ||
        (met === bestMet && sameScore && metDemand === bestDemand && kept > bestKept)
      if (better) {
        best = [...current]
        bestMet = met
        bestScore = score
        bestDemand = metDemand
        bestKept = kept
      }
      return
    }
    for (const choice of choices[i]) {
      if (choice.course >= 0 && used.has(choice.course)) continue
      if (choice.course >= 0) used.add(choice.course)
      current.push(choice)
      const keeps = choice.course >= 0 && courses[choice.course].courseId === aloneCourse[i] ? 1 : 0
      const isMet = choice.detail.status === 'FULL_MATCH'
      search(
        i + 1,
        met + (isMet ? 1 : 0),
        score + choice.detail.score,
        metDemand + (isMet ? demands[i] : 0),
        kept + keeps
      )
      current.pop()
      if (choice.course >= 0) used.delete(choice.course)
    }
  }
  search(0, 0, 0, 0, 0)

  const assigned: Choice[] = best ?? []
  return requirements.map((requirement, i) => {
    const choice = assigned[i]
    // Its own course: the same detail it gets alone, so nothing it reports changes
    if (choice.course >= 0 && courses[choice.course].courseId === aloneCourse[i]) return alone[i]
    if (choice.course >= 0 || aloneCourse[i] === null) return choice.detail
    const course = courses.find((c) => c.courseId === aloneCourse[i])
    return {
      ...choice.detail,
      ...(course && {
        courseUsedElsewhere: { courseId: course.courseId, courseName: course.courseName }
      })
    }
  })
}
