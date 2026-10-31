import { describe, expect, it } from 'vitest'
import { compareBestFit, type MatchItem } from '@/lib/matching/match-groups'
import { calculateMatch } from '@/lib/matching/scorer'
import { transformStudent } from '@/lib/matching/transformers'
import { bestFitOrder, fitTier, liftedOrder, liftingFilters } from './best-fit'
import { fitProgram, programFit, type FitRecord } from './fit'

// Explore's Best fit (MAINT_tasks.md 5.27, board "D3.5 Sort · best fit"): the student's fields and
// countries first, then the ones they meet, closest to their total; with the switch on, exactly
// Matches' "Best fit".

const BUSINESS = 'cmfield000000000000000001'
const CS = 'cmfield000000000000000002'
const MEDICINE = 'cmfield000000000000000003'
const UK = 'cmcountry0000000000000001'
const IE = 'cmcountry0000000000000002'
const AU = 'cmcountry0000000000000003'

const student = (countries: string[]) =>
  transformStudent({
    totalIBPoints: 38,
    tokGrade: 'B',
    eeGrade: 'B',
    courses: [
      { level: 'HL', grade: 6, ibCourse: { id: 'maths-aa', name: 'Mathematics: AA' } },
      { level: 'HL', grade: 6, ibCourse: { id: 'economics', name: 'Economics' } },
      { level: 'SL', grade: 6, ibCourse: { id: 'english-a', name: 'English A' } }
    ],
    preferredFields: [{ id: BUSINESS }, { id: CS }],
    preferredCountries: countries.map((id) => ({ id }))
  })

const STUDENT = student([UK, IE])

let next = 0
function record(
  university: string,
  name: string,
  countryId: string,
  fieldOfStudyId: string,
  minimum: number | null,
  needs?: string
): FitRecord {
  return {
    objectID: `p${next++}`,
    programName: name,
    universityId: university,
    universityName: university,
    countryId,
    fieldOfStudyId,
    ...(minimum === null ? {} : { minimumIBPoints: minimum }),
    requiredCourses: needs
      ? [
          {
            courseId: needs,
            courseName: needs,
            level: 'HL',
            minimumGrade: 5,
            isCritical: true,
            orGroupId: null
          }
        ]
      : []
  }
}

// In no order, as the search returns them
const RECORDS = [
  record('University of Sydney', 'Medicine', AU, MEDICINE, 45),
  record('Imperial College London', 'Biomaterials', UK, MEDICINE, 38),
  record('University of Toronto', 'Economics', AU, BUSINESS, 34),
  record('LSE', 'Accounting and Finance', UK, BUSINESS, 39),
  record('LSE', 'Economics and Economic History', UK, BUSINESS, 38),
  record('University of Michigan', 'Data Science', IE, CS, null),
  record('Trinity College Dublin', 'Computer Science', IE, CS, 37),
  record('University of Edinburgh', 'Business and Law', UK, BUSINESS, 37, 'english-lit'),
  record('University of Cambridge', 'Economics', UK, BUSINESS, 41),
  record('UCL', 'Information Management for Business', UK, BUSINESS, 38),
  record('University of Melbourne', 'Arts', AU, MEDICINE, 30),
  record('UCD', 'Actuarial Studies', IE, BUSINESS, 42),
  record('Imperial College London', 'Earth Science', UK, MEDICINE, 36, 'chemistry'),
  record('University of Sydney', 'Commerce', AU, BUSINESS, null)
]

const names = (records: FitRecord[]) => records.map((r) => `${r.universityName} ${r.programName}`)
const meets = (r: FitRecord) => programFit(STUDENT, fitProgram(r)).status === 'meets'

describe('fitTier', () => {
  it('puts their fields and countries first, then their fields, then their countries', () => {
    expect(fitTier(STUDENT, { countryId: UK, fieldOfStudyId: BUSINESS })).toBe(0)
    expect(fitTier(STUDENT, { countryId: AU, fieldOfStudyId: CS })).toBe(1)
    expect(fitTier(STUDENT, { countryId: UK, fieldOfStudyId: MEDICINE })).toBe(2)
    expect(fitTier(STUDENT, { countryId: AU, fieldOfStudyId: MEDICINE })).toBe(3)
  })

  it('follows the weights: each tier scores above the next on a program they meet', () => {
    const program = (countryId: string, fieldOfStudyId: string) =>
      fitProgram(record('University', 'Program', countryId, fieldOfStudyId, 30)).requirements
    const score = (countryId: string, fieldOfStudyId: string) =>
      calculateMatch({ student: STUDENT, program: program(countryId, fieldOfStudyId) }).overallScore
    const tiers = [
      score(UK, BUSINESS),
      score(AU, BUSINESS),
      score(UK, MEDICINE),
      score(AU, MEDICINE)
    ]
    expect(tiers).toEqual([...tiers].sort((a, b) => b - a))
    expect(new Set(tiers).size).toBe(4)
  })

  it('counts every country for a student open to anywhere', () => {
    const anywhere = student([])
    expect(fitTier(anywhere, { countryId: AU, fieldOfStudyId: CS })).toBe(0)
    expect(fitTier(anywhere, { countryId: AU, fieldOfStudyId: MEDICINE })).toBe(2)
  })
})

describe('bestFitOrder', () => {
  it('with the switch on: their field and country, their field, their country, the rest', () => {
    expect(names(bestFitOrder(RECORDS.filter(meets), STUDENT))).toEqual([
      // Their fields and countries, from their own 38 down, then no minimum
      'LSE Economics and Economic History',
      'UCL Information Management for Business',
      'Trinity College Dublin Computer Science',
      'University of Michigan Data Science',
      // Their fields, another country: back to 38
      'University of Toronto Economics',
      'University of Sydney Commerce',
      // Their countries, another field
      'Imperial College London Biomaterials',
      // Neither
      'University of Melbourne Arts'
    ])
  })

  it('with the switch on, is Matches’ own Best fit', () => {
    for (const who of [STUDENT, student([])]) {
      const met = RECORDS.filter((r) => programFit(who, fitProgram(r)).status === 'meets')
      const items = met.map(
        (r) =>
          ({
            id: r.objectID,
            name: r.programName,
            university: r.universityName,
            minIBPoints: r.minimumIBPoints ?? null,
            score: Math.round(
              calculateMatch({ student: who, program: fitProgram(r).requirements }).overallScore *
                100
            )
          }) as MatchItem
      )
      expect(bestFitOrder(met, who).map((r) => r.objectID)).toEqual(
        items.sort(compareBestFit(38)).map((m) => m.id)
      )
    }
  })

  it('with the switch off: in each tier the ones met, then within reach, then the rest', () => {
    const order = names(bestFitOrder(RECORDS, STUDENT))
    expect(order.slice(0, 9)).toEqual([
      'LSE Economics and Economic History',
      'UCL Information Management for Business',
      'Trinity College Dublin Computer Science',
      'University of Michigan Data Science',
      // Within reach, 1 point short before 3
      'LSE Accounting and Finance',
      'University of Cambridge Economics',
      // Missing a requirement: a subject 1 point from their total, then 4 points short
      'University of Edinburgh Business and Law',
      'UCD Actuarial Studies',
      // Their fields, another country: met first again
      'University of Toronto Economics'
    ])
    expect(order.at(-1)).toBe('University of Sydney Medicine')
  })
})

describe('the fallback switch’s one search (lifted)', () => {
  it('lifts their fields by 2 and their countries by 1, so the scores add up to the tiers', () => {
    expect(liftingFilters(STUDENT)).toEqual([
      [`fieldOfStudyId:${BUSINESS}<score=2>`, `fieldOfStudyId:${CS}<score=2>`],
      [`countryId:${UK}<score=1>`, `countryId:${IE}<score=1>`]
    ])
    // Open to anywhere: the fields alone
    expect(liftingFilters(student([]))).toEqual([
      [`fieldOfStudyId:${BUSINESS}<score=2>`, `fieldOfStudyId:${CS}<score=2>`]
    ])
  })

  it('keeps the search’s order inside each tier, statuses mixed', () => {
    const order = liftedOrder(RECORDS, STUDENT)
    expect(order.map((r) => fitTier(STUDENT, r))).toEqual(
      [...order.map((r) => fitTier(STUDENT, r))].sort()
    )
    const first = RECORDS.filter((r) => fitTier(STUDENT, r) === 0)
    expect(order.slice(0, first.length)).toEqual(first)
  })
})
