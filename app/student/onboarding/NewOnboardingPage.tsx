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
import { NewOnboarding } from './NewOnboarding'

/**
 * First run and the academic profile's steps in the new design (rebranding 3.1). It reads what
 * today's page reads: the student's profile, once, now a select, and the cached fields,
 * countries and IB courses. A first run opens at the first step not yet saved; a finished one,
 * reached from Academic, opens at step 1, as today. The address may carry where Save was pressed
 * and the program waiting (lib/student/first-run.ts).
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

  const firstRun = !hasGrades(profile)
  const step: FirstRunStep = firstRun ? firstUnsavedStep(profile) : 1
  const { returnTo, waiting } = readFirstRun({
    get: (name) => {
      const value = searchParams[name]
      return typeof value === 'string' ? value : null
    }
  })

  return (
    <NewOnboarding
      firstRun={firstRun}
      step={step}
      kept={firstRun ? keptLine(step) : null}
      fields={fields.map((field) => ({
        id: field.id,
        name: field.name,
        description: field.description ?? ''
      }))}
      countries={countries.map((country) => ({ id: country.id, name: country.name }))}
      courses={courses}
      initial={{
        fields: profile?.preferredFields.map((f) => f.id) ?? [],
        countries: profile?.preferredCountries.map((c) => c.id) ?? [],
        anywhere: profile?.openToAllLocations ?? false,
        courseSelections:
          profile?.courses.map((c) => ({
            courseId: c.ibCourse.id,
            courseName: c.ibCourse.name,
            level: c.level as 'HL' | 'SL',
            grade: c.grade
          })) ?? [],
        tokGrade: profile?.tokGrade ?? null,
        eeGrade: profile?.eeGrade ?? null
      }}
      returnTo={returnTo}
      waiting={waiting}
    />
  )
}
