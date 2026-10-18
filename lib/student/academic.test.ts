import { describe, expect, it } from 'vitest'
import {
  academicHref,
  academicTitle,
  countriesCount,
  countriesStatus,
  failedMessage,
  interestsCount,
  interestsStatus,
  leaveText,
  namesInOrder,
  readScreen,
  sameChoice,
  savedMessage,
  savedProfileProblem,
  subjectLines,
  totalDetail
} from './academic'
import { placeSubjects, type EditorCourse } from './subject-editor'

// The Academic page's rules and words (rebranding 3.3, boards "D4.11 Academic profile",
// approved 18 October 2026), with D3.1's student: 38 points

const COURSES: EditorCourse[] = [
  { id: 'eng', name: 'English A: Literature', group: 1 },
  { id: 'spa', name: 'Spanish B', group: 2 },
  { id: 'eco', name: 'Economics', group: 3 },
  { id: 'phy', name: 'Physics', group: 4 },
  { id: 'che', name: 'Chemistry', group: 4 },
  { id: 'maa', name: 'Mathematics: Analysis and Approaches', group: 5 }
]

// In the order the profile holds them; the second science goes to the last row (D3.6)
const SAVED = [
  { courseId: 'maa', level: 'HL' as const, grade: 6 },
  { courseId: 'phy', level: 'HL' as const, grade: 6 },
  { courseId: 'eng', level: 'SL' as const, grade: 6 },
  { courseId: 'che', level: 'SL' as const, grade: 6 },
  { courseId: 'spa', level: 'SL' as const, grade: 6 },
  { courseId: 'eco', level: 'HL' as const, grade: 6 }
]

const ROWS = placeSubjects(SAVED, COURSES)

const params = (search: string) => new URLSearchParams(search)

describe('the screens’ addresses', () => {
  it('reads the screen, and nothing else', () => {
    expect(readScreen(params('edit=interests'))).toBe('interests')
    expect(readScreen(params('edit=subjects'))).toBe('subjects')
    expect(readScreen(params('edit=settings'))).toBeNull()
    expect(readScreen(params(''))).toBeNull()
  })

  it('gives each screen its own address on Academic’s', () => {
    expect(academicHref('countries')).toBe('/student/onboarding?edit=countries')
    expect(academicHref(null)).toBe('/student/onboarding')
  })
})

describe('the words', () => {
  it('titles the summary and each screen', () => {
    expect(academicTitle(null)).toBe('Academic profile · IB Match')
    expect(academicTitle('interests')).toBe('Update your interests · IB Match')
    expect(academicTitle('subjects')).toBe('Update your subjects and grades · IB Match')
  })

  it('says what was saved, what wasn’t, and what leaving loses', () => {
    expect(savedMessage('interests')).toBe(
      'Your interests are saved, and your matches are updated.'
    )
    expect(savedMessage('subjects')).toBe(
      'Your subjects and grades are saved, and your matches are updated.'
    )
    expect(failedMessage('countries')).toBe('Couldn’t save your countries.')
    expect(leaveText('subjects')).toBe(
      'Your changes to your subjects and grades aren’t saved yet. If you leave, your profile stays as it was.'
    )
  })

  it('counts fields and countries', () => {
    expect(interestsCount(2)).toBe('2 of 5')
    expect(countriesCount(3, false)).toBe('3 countries')
    expect(countriesCount(1, false)).toBe('1 country')
    expect(countriesCount(0, true)).toBe('')
  })
})

describe('the subjects panel', () => {
  it('lists the six subjects in the order of their groups, each read in full', () => {
    const lines = subjectLines(ROWS, COURSES)
    expect(lines.map((l) => l.name)).toEqual([
      'English A: Literature',
      'Spanish B',
      'Economics',
      'Physics',
      'Mathematics: Analysis and Approaches',
      'Chemistry'
    ])
    expect(lines[3]).toEqual({
      name: 'Physics',
      level: 'HL',
      grade: 6,
      said: 'Higher Level, grade 6'
    })
    expect(lines[0].said).toBe('Standard Level, grade 6')
  })

  it('says what makes up the total', () => {
    expect(totalDetail(ROWS, 'B', 'C')).toBe('36 from subjects, 2 core points')
    expect(totalDetail(ROWS, 'C', 'C')).toBe('36 from subjects, 1 core point')
    expect(totalDetail(ROWS, 'E', 'C')).toBe('36 from subjects')
  })

  it('names the first rule a saved profile breaks, in the editor’s words', () => {
    expect(savedProfileProblem(ROWS, 'B', 'C', COURSES)).toBeNull()
    const twoAtHigher = placeSubjects(
      SAVED.map((s) => (s.courseId === 'eco' ? { ...s, level: 'SL' as const } : s)),
      COURSES
    )
    expect(savedProfileProblem(twoAtHigher, 'B', 'C', COURSES)).toBe(
      'Take 3 or 4 subjects at Higher Level (you have 2).'
    )
  })
})

describe('choices', () => {
  it('puts names in the reference list’s order', () => {
    const all = [
      { id: 'ca', name: 'Canada' },
      { id: 'ie', name: 'Ireland' },
      { id: 'uk', name: 'United Kingdom' }
    ]
    expect(namesInOrder(all, ['uk', 'ca'])).toEqual(['Canada', 'United Kingdom'])
  })

  it('compares choices whatever their order', () => {
    expect(sameChoice(['a', 'b'], ['b', 'a'])).toBe(true)
    expect(sameChoice(['a'], ['a', 'b'])).toBe(false)
  })
})

describe('the interests footer', () => {
  it('waits for a change', () => {
    expect(interestsStatus(['be', 'cs'], ['cs', 'be'], null)).toEqual({
      count: 2,
      text: ' of 5 chosen',
      detail: 'No changes to save yet',
      strong: false,
      ready: false
    })
  })

  it('is ready after one', () => {
    expect(interestsStatus(['be', 'cs', 'en'], ['be', 'cs'], null)).toEqual({
      count: 3,
      text: ' of 5 chosen',
      detail: 'Not saved yet',
      strong: true,
      ready: true
    })
  })

  it('needs a field, and says why a sixth didn’t tick', () => {
    expect(interestsStatus([], ['be'], null)).toEqual({
      text: 'Choose at least one field',
      ready: false
    })
    const refused = 'You can choose up to 5. Untick one to choose Law.'
    expect(interestsStatus(['a', 'b', 'c', 'd', 'e'], ['a'], refused)).toEqual({
      text: refused,
      notice: true,
      ready: true
    })
  })
})

describe('the countries footer', () => {
  const saved = { countries: ['ca', 'ie', 'uk'], anywhere: false }

  it('waits for a change', () => {
    expect(countriesStatus(['uk', 'ca', 'ie'], false, saved)).toEqual({
      count: 3,
      text: ' chosen',
      detail: 'No changes to save yet',
      strong: false,
      ready: false
    })
  })

  it('takes Open to anywhere as a change, whatever the countries ticked', () => {
    expect(countriesStatus(['ca', 'ie', 'uk'], true, saved)).toEqual({
      text: 'Every country',
      detail: 'Not saved yet',
      strong: true,
      ready: true
    })
    expect(countriesStatus(['ca'], true, { countries: [], anywhere: true }).ready).toBe(false)
  })

  it('needs a country or Open to anywhere', () => {
    expect(countriesStatus([], false, saved)).toEqual({
      text: 'Choose a country, or Open to anywhere',
      ready: false
    })
  })
})
