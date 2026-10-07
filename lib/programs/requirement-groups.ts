/**
 * How a program's subject requirements read to a student (maintenance task 5.7)
 *
 * A requirement is either one course or an either/or group: rows that share an `orGroupId`.
 * The options of a group need not share a level and grade. On 30 September 2026, 436 groups
 * in 332 programs mixed them ("Mathematics at HL 5, or at SL 6"), and 183 named the same
 * course twice ("English B at HL 4 or SL 5"). The program card printed every name and then
 * the first option's level and grade under all of them.
 *
 * `groupRequirements` gives each requirement its options, and each option the levels and
 * grades it is accepted at. Courses accepted at the same levels and grades share an option,
 * so a course is named once and a level and grade is not repeated:
 *
 *   Physics HL 5, Chemistry HL 5               → Physics or Chemistry — HL 5
 *   English B HL 4, English B SL 5             → English B — HL 4 or SL 5
 *   Maths AA HL 5, AI HL 5, AA SL 6, AI SL 6   → Maths AA or Maths AI — HL 5 or SL 6
 *   Maths AA HL 5, AA SL 6, AI HL 5            → Maths AA — HL 5 or SL 6, or Maths AI — HL 5
 *
 * The program card, the program page's meta description and JSON-LD share it, and so does the
 * redesign's requirement checklist (rebranding 2.2).
 */

/** A course requirement row as the program queries select it. */
export interface RequirementRow {
  id: string
  requiredLevel: string
  minGrade: number
  orGroupId?: string | null
  ibCourse: { id: string; name: string }
}

/** A level and the minimum grade at it: "HL 5". */
export interface LevelGrade {
  level: string
  minGrade: number
}

/** Courses accepted at the same levels and grades. */
export interface RequirementOption {
  courses: { id: string; name: string }[]
  /** HL first, then the lower grade first. */
  levelGrades: LevelGrade[]
}

export interface RequirementGroup<R extends RequirementRow = RequirementRow> {
  /** The `orGroupId`, or the row's id for a requirement that stands alone. */
  key: string
  /** The rows behind it, in their stored order. */
  rows: R[]
  /** One for a requirement that stands alone; one or more for an either/or group. */
  options: RequirementOption[]
}

/**
 * Groups requirement rows into requirements, in the order each first appears. A row with no
 * `orGroupId` is a requirement of its own.
 */
export function groupRequirements<R extends RequirementRow>(rows: R[]): RequirementGroup<R>[] {
  const groups = new Map<string, R[]>()
  for (const row of rows) {
    const key = row.orGroupId || row.id
    const members = groups.get(key)
    if (members) members.push(row)
    else groups.set(key, [row])
  }
  return [...groups].map(([key, members]) => ({
    key,
    rows: members,
    options: optionsOf(members)
  }))
}

function optionsOf(rows: RequirementRow[]): RequirementOption[] {
  // Each course with every level and grade the group accepts it at.
  const byCourse = new Map<
    string,
    { course: { id: string; name: string }; levelGrades: LevelGrade[] }
  >()
  for (const row of rows) {
    const entry = byCourse.get(row.ibCourse.id) ?? {
      course: { id: row.ibCourse.id, name: row.ibCourse.name },
      levelGrades: []
    }
    const known = entry.levelGrades.some(
      (lg) => lg.level === row.requiredLevel && lg.minGrade === row.minGrade
    )
    if (!known) entry.levelGrades.push({ level: row.requiredLevel, minGrade: row.minGrade })
    byCourse.set(row.ibCourse.id, entry)
  }

  // Then courses with the same levels and grades together.
  const options = new Map<string, RequirementOption>()
  for (const { course, levelGrades } of byCourse.values()) {
    levelGrades.sort(compareLevelGrades)
    const key = formatLevelGrades(levelGrades)
    const option = options.get(key)
    if (option) option.courses.push(course)
    else options.set(key, { courses: [course], levelGrades })
  }
  return [...options.values()]
}

function compareLevelGrades(a: LevelGrade, b: LevelGrade): number {
  if (a.level !== b.level) return a.level === 'HL' ? -1 : b.level === 'HL' ? 1 : 0
  return a.minGrade - b.minGrade
}

/** The options for one course: that course with every level and grade the group accepts it at. */
export function optionsForCourse(group: RequirementGroup, courseId: string): RequirementOption[] {
  for (const option of group.options) {
    const course = option.courses.find((c) => c.id === courseId)
    if (course) return [{ courses: [course], levelGrades: option.levelGrades }]
  }
  return []
}

/** "Physics or Chemistry" */
export function formatCourses(courses: { name: string }[]): string {
  return courses.map((c) => c.name).join(' or ')
}

/** "HL 4 or SL 5" */
export function formatLevelGrades(levelGrades: LevelGrade[]): string {
  return levelGrades.map((lg) => `${lg.level} ${lg.minGrade}`).join(' or ')
}

/**
 * The whole requirement in one line: "Physics or Chemistry HL 5", "English B HL 4 or SL 5",
 * "Maths AA HL 5 or SL 6, or Maths AI HL 5".
 */
export function describeRequirement(group: RequirementGroup): string {
  return group.options
    .map((o) => `${formatCourses(o.courses)} ${formatLevelGrades(o.levelGrades)}`)
    .join(', or ')
}
