import {
  getCachedCountriesWithPrograms,
  getCachedFields,
  getCachedIBCourses
} from '@/lib/reference-data'
import {
  firstUnsavedStep,
  hasGrades,
  keptLine,
  readFirstRun,
  type FirstRunStep
} from '@/lib/student/first-run'
import { firstRunProfile } from '@/lib/student/first-run-profile'
import { NewAcademic, NewOnboarding } from './NewOnboarding'

/**
 * Academic in the new design: first run before grades (rebranding 3.1), and the summary with its
 * three screens after (3.3). It reads what today's page reads: the student's profile, once, now a
 * select, and the cached fields, countries and IB courses. First run opens at the first step not
 * yet saved, and its address may carry where Save was pressed and the program waiting
 * (lib/student/first-run.ts); the summary's carries the screen open (lib/student/academic.ts).
 */
export async function NewOnboardingPage({
  userId,
  searchParams
}: {
  userId: string
  searchParams: Record<string, string | string[] | undefined>
}) {
  const [profile, fields, countries, courses] = await Promise.all([
    firstRunProfile(userId),
    getCachedFields(),
    getCachedCountriesWithPrograms(),
    getCachedIBCourses()
  ])

  const fieldList = fields.map((field) => ({
    id: field.id,
    name: field.name,
    description: field.description ?? ''
  }))
  const countryList = countries.map((country) => ({ id: country.id, name: country.name }))
  const chosen = {
    fields: profile?.preferredFields.map((f) => f.id) ?? [],
    countries: profile?.preferredCountries.map((c) => c.id) ?? [],
    anywhere: profile?.openToAllLocations ?? false,
    tokGrade: profile?.tokGrade ?? null,
    eeGrade: profile?.eeGrade ?? null
  }

  if (profile && hasGrades(profile)) {
    return (
      <NewAcademic
        fields={fieldList}
        countries={countryList}
        courses={courses}
        saved={{
          ...chosen,
          courseSelections: profile.courses.map((c) => ({
            courseId: c.ibCourse.id,
            level: c.level as 'HL' | 'SL',
            grade: c.grade
          })),
          total: profile.totalIBPoints!
        }}
      />
    )
  }

  const step: FirstRunStep = firstUnsavedStep(profile)
  const { returnTo, waiting } = readFirstRun({
    get: (name) => {
      const value = searchParams[name]
      return typeof value === 'string' ? value : null
    }
  })

  return (
    <NewOnboarding
      step={step}
      kept={keptLine(step)}
      fields={fieldList}
      countries={countryList}
      courses={courses}
      initial={{
        ...chosen,
        courseSelections:
          profile?.courses.map((c) => ({
            courseId: c.ibCourse.id,
            courseName: c.ibCourse.name,
            level: c.level as 'HL' | 'SL',
            grade: c.grade
          })) ?? []
      }}
      returnTo={returnTo}
      waiting={waiting}
    />
  )
}
