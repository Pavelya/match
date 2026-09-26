import { describe, expect, it } from 'vitest'
import { planPair, type RequirementRow, type StudentCourseRow } from './course-merge'

const KEEP = 'geog'
const RETIRE = 'geo'

const student = (
  id: string,
  studentProfileId: string,
  ibCourseId: string,
  grade = 6
): StudentCourseRow => ({ id, studentProfileId, ibCourseId, level: 'HL', grade })

const requirement = (
  id: string,
  programId: string,
  ibCourseId: string,
  overrides: Partial<RequirementRow> = {}
): RequirementRow => ({
  id,
  programId,
  orGroupId: 'g1',
  ibCourseId,
  requiredLevel: 'HL',
  minGrade: 6,
  isCritical: true,
  ...overrides
})

describe('planPair — students', () => {
  it('repoints a student who has only the retired course', () => {
    const plan = planPair({
      keepId: KEEP,
      retireId: RETIRE,
      students: [student('s1', 'alice', RETIRE), student('s2', 'bob', KEEP)],
      requirements: [],
      choices: {}
    })
    expect(plan.studentRepoint.map((s) => s.id)).toEqual(['s1'])
    expect(plan.studentCollisions).toEqual([])
  })

  it('holds a student with both courses until the owner chooses', () => {
    const kept = student('s1', 'carol', KEEP, 6)
    const retired = student('s2', 'carol', RETIRE, 4)
    const undecided = planPair({
      keepId: KEEP,
      retireId: RETIRE,
      students: [kept, retired],
      requirements: [],
      choices: {}
    })
    expect(undecided.studentRepoint).toEqual([])
    expect(undecided.studentCollisions).toEqual([{ kept, retired, choice: null }])

    const decided = planPair({
      keepId: KEEP,
      retireId: RETIRE,
      students: [kept, retired],
      requirements: [],
      choices: { carol: 'retired' }
    })
    expect(decided.studentCollisions[0].choice).toBe('retired')
  })
})

describe('planPair — program requirements', () => {
  it('deletes a retired option that repeats a kept one in the same OR group', () => {
    const plan = planPair({
      keepId: KEEP,
      retireId: RETIRE,
      students: [],
      requirements: [requirement('r1', 'oxford', KEEP), requirement('r2', 'oxford', RETIRE)],
      choices: {}
    })
    expect(plan.requirementDelete.map((r) => r.id)).toEqual(['r2'])
    expect(plan.requirementRepoint).toEqual([])
  })

  it('repoints a retired row that differs in any way, or sits in another program or group', () => {
    const plan = planPair({
      keepId: KEEP,
      retireId: RETIRE,
      students: [],
      requirements: [
        requirement('k', 'oxford', KEEP),
        requirement('grade', 'oxford', RETIRE, { minGrade: 5 }),
        requirement('level', 'oxford', RETIRE, { requiredLevel: 'SL' }),
        requirement('flag', 'oxford', RETIRE, { isCritical: false }),
        requirement('group', 'oxford', RETIRE, { orGroupId: 'g2' }),
        requirement('alone', 'oxford', RETIRE, { orGroupId: null }),
        requirement('elsewhere', 'cambridge', RETIRE)
      ],
      choices: {}
    })
    expect(plan.requirementDelete).toEqual([])
    expect(plan.requirementRepoint.map((r) => r.id)).toEqual([
      'grade',
      'level',
      'flag',
      'group',
      'alone',
      'elsewhere'
    ])
  })

  it('treats two standalone rows with the same values as duplicates', () => {
    const plan = planPair({
      keepId: KEEP,
      retireId: RETIRE,
      students: [],
      requirements: [
        requirement('k', 'tum', KEEP, { orGroupId: null }),
        requirement('r', 'tum', RETIRE, { orGroupId: null })
      ],
      choices: {}
    })
    expect(plan.requirementDelete.map((r) => r.id)).toEqual(['r'])
  })
})
