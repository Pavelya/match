import { describe, expect, it } from 'vitest'
import {
  coreLine,
  coreMessage,
  editorFooter,
  higherLevelLine,
  ibConditions,
  isBlank,
  pickerGroups,
  placeSubjects,
  subjectsDraft,
  type EditorCourse,
  type SubjectRow,
  type SubjectsState
} from './subject-editor'

// The rules behind boards "D3.6 Subject editor" and "D4.5 First run, step 3" (14 October 2026),
// with D3.1's student: 36 from subjects, TOK B and EE C for 2 core points, 38 in all.

const COURSES: EditorCourse[] = [
  { id: 'eng-lit', name: 'English A: Literature', group: 1 },
  { id: 'fre-lit', name: 'French A: Literature', group: 1 },
  { id: 'spa-b', name: 'Spanish B', group: 2 },
  { id: 'econ', name: 'Economics', group: 3 },
  { id: 'phys', name: 'Physics', group: 4 },
  { id: 'chem', name: 'Chemistry', group: 4 },
  { id: 'maa', name: 'Mathematics: Analysis and Approaches', group: 5 },
  { id: 'music', name: 'Music', group: 6 }
]

const row = (courseId: string | null, level: 'SL' | 'HL' | null, grade: number | null) => ({
  courseId,
  level,
  grade
})
const EMPTY = row(null, null, null)

const ME: SubjectRow[] = [
  row('eng-lit', 'SL', 6),
  row('spa-b', 'SL', 6),
  row('econ', 'HL', 6),
  row('phys', 'HL', 6),
  row('maa', 'HL', 6),
  row('chem', 'SL', 6)
]
const READY: SubjectsState = { rows: ME, tok: 'B', ee: 'C' }
const at = (state: SubjectsState, i: number, r: SubjectRow): SubjectsState => ({
  ...state,
  rows: state.rows.map((x, j) => (j === i ? r : x))
})

describe('placeSubjects', () => {
  it('puts each subject in its own group’s row, a second from one group in row 6', () => {
    const rows = placeSubjects(
      [
        { courseId: 'chem', level: 'SL', grade: 6 },
        { courseId: 'phys', level: 'HL', grade: 6 },
        { courseId: 'eng-lit', level: 'SL', grade: 6 }
      ],
      COURSES
    )
    expect(rows.map((r) => r.courseId)).toEqual(['eng-lit', null, null, 'chem', null, 'phys'])
  })

  it('takes the first empty row once row 6 is taken', () => {
    const rows = placeSubjects(
      [
        { courseId: 'music', level: 'SL', grade: 5 },
        { courseId: 'eng-lit', level: 'HL', grade: 6 },
        { courseId: 'fre-lit', level: 'SL', grade: 6 }
      ],
      COURSES
    )
    expect(rows.map((r) => r.courseId)).toEqual(['eng-lit', 'fre-lit', null, null, null, 'music'])
  })
})

describe('pickerGroups', () => {
  it('greys a subject chosen in another row, never the row’s own', () => {
    const groups = pickerGroups(COURSES, ME, 3)
    expect(groups.map((g) => g.label)).toEqual([
      'Group 1 · Language and literature',
      'Group 2 · Language acquisition',
      'Group 3 · Individuals and societies',
      'Group 4 · Sciences',
      'Group 5 · Mathematics',
      'Group 6 · The arts'
    ])
    const sciences = groups[3].options
    expect(sciences.find((o) => o.value === 'phys')).toEqual({ value: 'phys', label: 'Physics' })
    expect(sciences.find((o) => o.value === 'chem')).toMatchObject({
      disabled: true,
      note: 'In your subjects'
    })
  })
})

describe('higherLevelLine', () => {
  it('waits for the first level, then counts so far', () => {
    expect(higherLevelLine([EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY])).toBeNull()
    expect(higherLevelLine([row('econ', 'HL', null), row('phys', 'HL', 6), EMPTY])).toEqual({
      tone: 'info',
      text: '2 at Higher Level so far. The diploma needs 3 or 4.'
    })
  })

  it('ticks 3 or 4 with six, and gives the helper’s message otherwise', () => {
    expect(higherLevelLine(ME)).toEqual({
      tone: 'ok',
      text: '3 at Higher Level, 3 at Standard Level'
    })
    expect(higherLevelLine(at(READY, 2, row('econ', 'SL', 6)).rows)).toEqual({
      tone: 'gap',
      text: 'Take 3 or 4 subjects at Higher Level (you have 2).'
    })
  })
})

describe('the core', () => {
  it('says what it is worth, from the matrix', () => {
    expect(coreLine(null, null)).toBe('Together they add up to 3 points to your total.')
    expect(coreLine('B', 'C')).toBe('2 core points from TOK B and EE C')
    expect(coreLine('C', 'C')).toBe('1 core point from TOK C and EE C')
    expect(coreLine('E', 'C')).toBeNull()
  })

  it('puts the E message under the first E', () => {
    expect(coreMessage('E', 'E')?.under).toBe('tok')
    expect(coreMessage('A', 'E')?.under).toBe('ee')
    expect(coreMessage('A', null)).toBeNull()
  })
})

describe('editorFooter', () => {
  const blank: SubjectsState = { rows: Array(6).fill(EMPTY), tok: null, ee: null }

  it('counts subjects, then "So far" once one row is complete', () => {
    expect(editorFooter(blank, COURSES)).toMatchObject({
      line: { kind: 'count', done: 0, soFar: null },
      ready: false,
      target: { row: 0, part: 'subject' }
    })
    const four = { ...blank, rows: [...ME.slice(0, 4), EMPTY, EMPTY] }
    expect(editorFooter(four, COURSES).line).toEqual({
      kind: 'count',
      done: 4,
      soFar: 'So far 24 points'
    })
  })

  it('names the one thing left, and adds the core to "So far"', () => {
    const g6 = { ...at(READY, 5, EMPTY) }
    expect(editorFooter(g6, COURSES)).toEqual({
      line: { kind: 'left', text: 'Add your Group 6 subject', soFar: 'So far 32 points' },
      ready: false,
      target: { row: 5, part: 'subject' }
    })
    expect(editorFooter(at(READY, 5, row('chem', 'SL', null)), COURSES).line).toMatchObject({
      text: 'Add a grade for Chemistry'
    })
    expect(editorFooter(at(READY, 5, row('chem', null, null)), COURSES)).toMatchObject({
      line: { text: 'Add a level and grade for Chemistry' },
      target: { row: 5, part: 'level' }
    })
    expect(editorFooter({ ...READY, tok: null, ee: null }, COURSES).line).toEqual({
      kind: 'left',
      text: 'Add your TOK and EE grades',
      soFar: 'So far 36 points'
    })
    expect(editorFooter({ ...READY, ee: null }, COURSES).line).toMatchObject({
      text: 'Add your Extended Essay grade'
    })
  })

  it('gives the total when everything is in and every check is met', () => {
    expect(editorFooter(READY, COURSES)).toEqual({
      line: { kind: 'total', total: 38, detail: '36 from subjects, 2 core points' },
      ready: true,
      target: null
    })
  })

  it('puts a failed check in the line’s place', () => {
    expect(editorFooter(at(READY, 2, row('econ', 'SL', 6)), COURSES)).toEqual({
      line: { kind: 'reason', text: 'Take 3 or 4 subjects at Higher Level (you have 2).' },
      ready: false,
      target: { checks: true }
    })
    expect(editorFooter({ ...READY, tok: 'E' }, COURSES)).toMatchObject({
      line: { text: 'To finish, choose a TOK grade from A to D.' },
      target: { core: 'tok' }
    })
    expect(editorFooter({ ...READY, tok: 'E', ee: 'E' }, COURSES).line).toMatchObject({
      text: 'To finish, choose TOK and Extended Essay grades from A to D.'
    })
    // An E stops Finish before everything is in
    expect(editorFooter({ ...blank, ee: 'E' }, COURSES).line).toMatchObject({
      text: 'To finish, choose an Extended Essay grade from A to D.'
    })
    const low: SubjectsState = {
      rows: [
        row('eng-lit', 'SL', 4),
        row('spa-b', 'SL', 4),
        row('econ', 'HL', 4),
        row('phys', 'HL', 3),
        row('maa', 'HL', 4),
        row('chem', 'SL', 3)
      ],
      tok: 'C',
      ee: 'D'
    }
    expect(ibConditions(low, COURSES)).toEqual([
      'Your Higher Level grades need 12 points or more (you have 11).',
      'Your total needs to be 24 or more (you have 22).'
    ])
    expect(editorFooter(low, COURSES).line).toEqual({
      kind: 'reason',
      text: 'With these grades, the IB wouldn’t award the diploma.'
    })
  })

  // MAINT 5.20: with four at Higher Level the three best count, and two at Standard Level need 5
  describe('four at Higher Level, two at Standard Level', () => {
    const four = (hl: number[], sl: number[]): SubjectsState => ({
      rows: [
        row('eng-lit', 'SL', sl[0]),
        row('spa-b', 'SL', sl[1]),
        row('econ', 'HL', hl[0]),
        row('phys', 'HL', hl[1]),
        row('maa', 'HL', hl[2]),
        row('chem', 'HL', hl[3])
      ],
      tok: 'B',
      ee: 'C'
    })
    const refused = {
      line: { kind: 'reason', text: 'With these grades, the IB wouldn’t award the diploma.' },
      ready: false,
      target: { checks: true }
    }

    it('finishes HL 7 7 6 6 with SL 4 4', () => {
      expect(ibConditions(four([7, 7, 6, 6], [4, 4]), COURSES)).toEqual([])
      expect(editorFooter(four([7, 7, 6, 6], [4, 4]), COURSES)).toEqual({
        line: { kind: 'total', total: 36, detail: '34 from subjects, 2 core points' },
        ready: true,
        target: null
      })
    })

    it('stops at 11 from the three best Higher Level grades', () => {
      const state = four([4, 4, 3, 2], [6, 6])
      expect(ibConditions(state, COURSES)).toEqual([
        'Your three best Higher Level grades need 12 points or more (you have 11).'
      ])
      expect(editorFooter(state, COURSES)).toEqual(refused)
    })

    it('stops at 4 from the two Standard Level grades', () => {
      const state = four([7, 7, 6, 6], [2, 2])
      expect(ibConditions(state, COURSES)).toEqual([
        'Your two Standard Level grades need 5 points or more (you have 4).'
      ])
      expect(editorFooter(state, COURSES)).toEqual(refused)
    })
  })

  it('after first run, waits for a change, then shows the total before it', () => {
    expect(editorFooter(READY, COURSES, READY)).toMatchObject({
      line: { kind: 'total', total: 38, detail: 'No changes to save yet' },
      ready: false
    })
    expect(editorFooter(at(READY, 3, row('phys', 'HL', 7)), COURSES, READY)).toEqual({
      line: { kind: 'total', total: 39, detail: 'Was 38 before your changes' },
      ready: true,
      target: null
    })
    expect(editorFooter({ ...READY, tok: 'E' }, COURSES, READY).line).toMatchObject({
      text: 'To save, choose a TOK grade from A to D.'
    })
  })
})

describe('subjectsDraft', () => {
  it('keeps complete rows and the core, never a row missing its level or grade', () => {
    const state = {
      rows: [ME[0], row('spa-b', 'SL', null), row('econ', null, 6), EMPTY, EMPTY, EMPTY],
      tok: 'B',
      ee: null
    }
    expect(subjectsDraft(state)).toEqual({
      step: 'subjects',
      courses: [{ courseId: 'eng-lit', level: 'SL', grade: 6 }],
      tokGrade: 'B',
      eeGrade: null
    })
    expect(isBlank(state)).toBe(false)
    expect(isBlank({ rows: [row('spa-b', 'SL', null)], tok: null, ee: null })).toBe(true)
  })
})
