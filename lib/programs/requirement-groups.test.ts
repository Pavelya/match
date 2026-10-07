import { describe, expect, it } from 'vitest'
import {
  describeRequirement,
  formatCourses,
  formatLevelGrades,
  groupRequirements,
  optionsForCourse,
  type RequirementRow
} from './requirement-groups'

const PHYSICS = { id: 'phy', name: 'Physics' }
const CHEMISTRY = { id: 'chem', name: 'Chemistry' }
const ENGLISH_B = { id: 'engb', name: 'English B' }
const MATHS_AA = { id: 'aa', name: 'Mathematics: Analysis and Approaches' }
const MATHS_AI = { id: 'ai', name: 'Mathematics: Applications and Interpretation' }

let nextId = 0
function row(
  ibCourse: { id: string; name: string },
  requiredLevel: string,
  minGrade: number,
  orGroupId: string | null = null
): RequirementRow {
  return { id: `r${nextId++}`, ibCourse, requiredLevel, minGrade, orGroupId }
}

describe('groupRequirements', () => {
  it('keeps a requirement that stands alone as one option, keyed by its row', () => {
    const physics = row(PHYSICS, 'HL', 6)
    const [group] = groupRequirements([physics])
    expect(group.key).toBe(physics.id)
    expect(group.rows).toEqual([physics])
    expect(group.options).toEqual([
      { courses: [PHYSICS], levelGrades: [{ level: 'HL', minGrade: 6 }] }
    ])
    expect(describeRequirement(group)).toBe('Physics HL 6')
  })

  it('keeps one line when every option shares a level and grade', () => {
    const [group] = groupRequirements([row(PHYSICS, 'HL', 5, 'g'), row(CHEMISTRY, 'HL', 5, 'g')])
    expect(group.options).toEqual([
      { courses: [PHYSICS, CHEMISTRY], levelGrades: [{ level: 'HL', minGrade: 5 }] }
    ])
    expect(describeRequirement(group)).toBe('Physics or Chemistry HL 5')
  })

  it('names a course once when the group lists it at two levels', () => {
    // HKUST BBA in Marketing: "English B or English B" before 5.7.
    const [group] = groupRequirements([row(ENGLISH_B, 'HL', 4, 'g'), row(ENGLISH_B, 'SL', 5, 'g')])
    expect(group.options).toEqual([
      {
        courses: [ENGLISH_B],
        levelGrades: [
          { level: 'HL', minGrade: 4 },
          { level: 'SL', minGrade: 5 }
        ]
      }
    ])
    expect(describeRequirement(group)).toBe('English B HL 4 or SL 5')
  })

  it('collapses courses that share their levels and grades', () => {
    // Edinburgh Psychology BSc: HL 5 printed under all four options before 5.7.
    const [group] = groupRequirements([
      row(MATHS_AA, 'HL', 5, 'g'),
      row(MATHS_AI, 'HL', 5, 'g'),
      row(MATHS_AA, 'SL', 6, 'g'),
      row(MATHS_AI, 'SL', 6, 'g')
    ])
    expect(group.options).toHaveLength(1)
    expect(formatCourses(group.options[0].courses)).toBe(
      'Mathematics: Analysis and Approaches or Mathematics: Applications and Interpretation'
    )
    expect(formatLevelGrades(group.options[0].levelGrades)).toBe('HL 5 or SL 6')
  })

  it('lists each option with its own levels and grades when they differ', () => {
    const [group] = groupRequirements([
      row(MATHS_AA, 'HL', 5, 'g'),
      row(MATHS_AI, 'HL', 5, 'g'),
      row(MATHS_AA, 'SL', 6, 'g')
    ])
    expect(group.options).toEqual([
      {
        courses: [MATHS_AA],
        levelGrades: [
          { level: 'HL', minGrade: 5 },
          { level: 'SL', minGrade: 6 }
        ]
      },
      { courses: [MATHS_AI], levelGrades: [{ level: 'HL', minGrade: 5 }] }
    ])
    expect(describeRequirement(group)).toBe(
      'Mathematics: Analysis and Approaches HL 5 or SL 6, or Mathematics: Applications and Interpretation HL 5'
    )
  })

  it('puts HL first and the lower grade first, whatever the stored order', () => {
    const [group] = groupRequirements([
      row(ENGLISH_B, 'SL', 6, 'g'),
      row(ENGLISH_B, 'SL', 5, 'g'),
      row(ENGLISH_B, 'HL', 4, 'g')
    ])
    expect(formatLevelGrades(group.options[0].levelGrades)).toBe('HL 4 or SL 5 or SL 6')
  })

  it('ignores a row repeated in a group', () => {
    const [group] = groupRequirements([row(PHYSICS, 'HL', 5, 'g'), row(PHYSICS, 'HL', 5, 'g')])
    expect(group.rows).toHaveLength(2)
    expect(describeRequirement(group)).toBe('Physics HL 5')
  })

  it('keeps requirements in the order each first appears', () => {
    const groups = groupRequirements([
      row(ENGLISH_B, 'HL', 4, 'lang'),
      row(PHYSICS, 'HL', 6),
      row(ENGLISH_B, 'SL', 5, 'lang'),
      row(CHEMISTRY, 'SL', 5)
    ])
    expect(groups.map((g) => g.key)).toEqual(['lang', groups[1].rows[0].id, groups[2].rows[0].id])
    expect(groups.map(describeRequirement)).toEqual([
      'English B HL 4 or SL 5',
      'Physics HL 6',
      'Chemistry SL 5'
    ])
  })
})

describe('optionsForCourse', () => {
  const [group] = groupRequirements([
    row(MATHS_AA, 'HL', 5, 'g'),
    row(MATHS_AI, 'HL', 5, 'g'),
    row(MATHS_AA, 'SL', 6, 'g')
  ])

  it('gives one course with every level and grade the group accepts it at', () => {
    expect(optionsForCourse(group, MATHS_AA.id)).toEqual([
      {
        courses: [MATHS_AA],
        levelGrades: [
          { level: 'HL', minGrade: 5 },
          { level: 'SL', minGrade: 6 }
        ]
      }
    ])
    expect(optionsForCourse(group, MATHS_AI.id)).toEqual([
      { courses: [MATHS_AI], levelGrades: [{ level: 'HL', minGrade: 5 }] }
    ])
  })

  it('gives nothing for a course outside the group', () => {
    expect(optionsForCourse(group, PHYSICS.id)).toEqual([])
  })
})
