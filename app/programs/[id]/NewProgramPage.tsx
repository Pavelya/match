import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ds/button-variants'
import { CardLink } from '@/components/ds/Card'
import { SaveSignInLink } from '@/components/ds/SaveSignInLink'
import { Breadcrumbs } from '@/components/detail/Breadcrumbs'
import { Facts, type Fact } from '@/components/detail/Facts'
import { HeroImage } from '@/components/detail/HeroImage'
import { ProgramSave, ReadMore } from '@/components/detail/islands'
import type { Crumb } from '@/components/detail/trail'
import { FitAsk, FitPanel } from '@/components/program/FitPanel'
import { RequirementChecklist } from '@/components/program/RequirementChecklist'
import { APP_PLACES } from '@/components/site/nav'
import { signInTo } from '@/lib/explore/query'
import { calculateMatch } from '@/lib/matching'
import { statusAndWhy } from '@/lib/matching/match-list'
import { requirementRows } from '@/lib/matching/match-why'
import { transformProgram } from '@/lib/matching/transformers'
import { descriptionClamp, splitDescription } from '@/lib/programs/description'
import { currentEntryYear, requirementsCheck } from '@/lib/programs/entry-year'
import { formatRate } from '@/lib/programs/ib-minimum'
import { universityInitials } from '@/lib/programs/university-initials'
import { programViewer } from '@/lib/programs/viewer'
import { firstRunHref } from '@/lib/student/first-run'
import { placeName } from '@/lib/universities/details'
import type { ProgramPageData } from './program'

/**
 * The program page in the new design (rebranding 2.4, boards "D4.8 Program page" and "D4.8
 * Program page · phone", approved 12 October 2026). Everything is server HTML but Save, "Read the
 * whole description" and "How the fit is worked out".
 *
 * It reads what today's page reads, nothing more: the program (page.tsx), and signed in, one
 * narrow read of the profile with this program's place on the shortlist. The fit is worked out
 * here, from those two; no programs cache, no search.
 *
 * One order serves both sizes: on a phone the image, the title, the fit panel, the facts and Save,
 * then the requirements; from 1024px a grid puts the image beside the title and the fit panel
 * beside the requirements, where it stays in view.
 */
export async function NewProgramPage({
  program,
  trail,
  userId,
  save
}: {
  program: ProgramPageData
  trail: Crumb[]
  userId: string | null
  /** ?save=1: back from sign-in, or first run, asking to save this program */
  save: boolean
}) {
  const { university, fieldOfStudy } = program
  const { country } = university
  const path = `/programs/${program.id}`

  const viewer = userId ? await programViewer(userId, program.id) : null
  const student = viewer?.student ?? null

  // Saving needs grades (3.1). Without them, Save goes through first run and back here with
  // ?save=1, which saves it; "Add your grades" comes back too, without saving.
  const saveViaFirstRun = firstRunHref(`${path}?save=1`, {
    program: program.name,
    university: university.name
  })
  const academic = APP_PLACES.academic.href
  const addGrades = firstRunHref(path)
  // Signed in from Save without grades: on to first run, rather than a save that would fail
  if (viewer && !student && save) redirect(saveViaFirstRun)
  const fit = student
    ? statusAndWhy(
        calculateMatch({ student, program: transformProgram(program), mode: 'BALANCED' }),
        program,
        student.totalIBPoints
      )
    : null

  // Nothing to check without a minimum or a named subject (D3.4)
  const checkable = Boolean(program.minIBPoints) || program.courseRequirements.length > 0
  const rows = fit
    ? fit.why.rows
    : requirementRows({
        minIBPoints: program.minIBPoints,
        universityName: university.name,
        admitRate: university.admitRate,
        internationalAdmitRate: university.internationalAdmitRate,
        admitRateYear: university.admitRateYear,
        requirements: program.courseRequirements
      })
  const prompt =
    fit || !checkable
      ? null
      : userId
        ? { text: 'Add your grades to check these', href: addGrades }
        : { text: 'Sign in and add your grades to check these', href: signInTo(path) }

  const { about, competitive } = splitDescription(program.description)
  const image = university.image || null
  const wide = image ? undefined : 'lg:col-span-2 lg:max-w-190'

  const facts: Fact[] = [
    program.minIBPoints
      ? { label: 'IB minimum', value: program.minIBPoints }
      : {
          label: 'IB minimum',
          value: 'None',
          words: true,
          muted: true,
          notes: [
            university.admitRate === null ? (
              'Holistic admission'
            ) : (
              <>
                Admits {formatRate(university.admitRate)}
                <span className="sr-only"> of first-year applicants</span>
              </>
            )
          ]
        },
    { label: 'Length', value: program.duration },
    { label: 'Degree', value: program.degreeType, words: true },
    { label: 'Field', value: fieldOfStudy.name, words: true }
  ]

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-4 pt-3 pb-16 md:px-6 md:pt-5 md:pb-24">
      <Breadcrumbs trail={trail} />

      <div
        className={cn(
          'grid grid-cols-1 gap-y-5',
          image ? 'mt-3' : 'mt-5',
          // 572 + 48 + 572 for the hero; 784 + 48 + 360 below it. The fourth row takes what the
          // image adds beyond the title, facts and buttons, so they keep their spacing.
          'lg:mt-7 lg:grid-cols-[minmax(0,572fr)_minmax(0,164fr)_minmax(0,360fr)] lg:grid-rows-[auto_auto_auto_1fr_auto] lg:gap-x-12 lg:gap-y-0'
        )}
      >
        {image && (
          <HeroImage
            src={image}
            alt={university.name}
            credit={university.imageCredit}
            className="lg:col-span-2 lg:col-start-2 lg:row-span-4 lg:row-start-1"
          />
        )}

        <div
          className={cn(
            'flex min-w-0 flex-col gap-1.5 lg:col-start-1 lg:row-start-1 lg:gap-2 lg:pt-1',
            wide
          )}
        >
          <h1 className="text-h1">{program.name}</h1>
          <p className="text-body text-muted-foreground md:text-body-l">
            <Link
              href={`/universities/${university.id}`}
              className="rounded-chip font-medium text-foreground underline underline-offset-3 pressed:text-brand-ink pressed:underline"
            >
              {university.name}
            </Link>{' '}
            · {placeName(program.campusCity ?? university.city, country.name)}
          </p>
        </div>

        {fit ? (
          <FitPanel
            status={fit.status.status}
            badge={fit.status.badge}
            why={fit.why}
            academicHref={academic}
            className="lg:sticky lg:top-6 lg:col-start-3 lg:row-start-5 lg:mt-10 lg:self-start"
          />
        ) : (
          <FitAsk
            signedIn={userId !== null}
            href={userId ? addGrades : signInTo(path)}
            className="lg:sticky lg:top-6 lg:col-start-3 lg:row-start-5 lg:mt-10 lg:self-start"
          />
        )}

        <div className={cn('min-w-0 lg:col-start-1 lg:row-start-2 lg:mt-6', wide)}>
          <Facts facts={facts} />
        </div>

        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2.5 md:flex md:flex-wrap md:gap-3 lg:col-start-1 lg:row-start-3 lg:mt-6">
          {viewer && student ? (
            <ProgramSave
              program={{ id: program.id, name: program.name }}
              saved={viewer.saved}
              firstRunHref={saveViaFirstRun}
            />
          ) : viewer ? (
            <SaveSignInLink href={saveViaFirstRun} programName={program.name} needs="grades" />
          ) : (
            <SaveSignInLink href={signInTo(`${path}?save=1`)} programName={program.name} />
          )}
          {program.programUrl && (
            <a
              href={program.programUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ className: 'max-md:px-3.5' })}
            >
              Official program page
              <ExternalLink aria-hidden="true" size={16} strokeWidth={2} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {viewer && !student && (
            <p className="col-span-2 text-small font-normal text-muted-foreground md:basis-full">
              Add your grades first. We’ll save it when you finish.
            </p>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-5 lg:col-span-2 lg:col-start-1 lg:row-start-5 lg:mt-10 lg:gap-10">
          <section aria-labelledby="requirements" className="flex flex-col gap-3 md:gap-3.5">
            <h2 id="requirements" className="text-h2">
              Entry requirements
            </h2>
            <RequirementChecklist
              rows={rows}
              graded={fit !== null}
              prompt={prompt}
              check={requirementsCheck(program.requirementsEntryYear)}
              currentYear={currentEntryYear()}
              programUrl={program.programUrl}
            />
          </section>

          {competitive && (
            <section aria-labelledby="competitive" className="flex flex-col gap-2.5 md:gap-3">
              <h2 id="competitive" className="text-h2">
                How competitive
              </h2>
              <p className="max-w-[68ch] text-body-l whitespace-pre-line">{competitive}</p>
            </section>
          )}

          {about && (
            <section aria-labelledby="about" className="flex flex-col gap-2.5 md:gap-3">
              <h2 id="about" className="text-h2">
                About the program
              </h2>
              <ReadMore clamp={descriptionClamp(about)}>{about}</ReadMore>
            </section>
          )}

          <section aria-labelledby="university" className="flex flex-col gap-3 md:gap-3.5">
            <h2 id="university" className="text-h2">
              The university
            </h2>
            <CardLink
              href={`/universities/${university.id}`}
              className="grid max-w-160 grid-cols-[48px_minmax(0,1fr)_20px] items-center gap-x-3.5 px-4 py-3.5 md:grid-cols-[56px_minmax(0,1fr)_20px] md:gap-x-4 md:px-5 md:py-4"
            >
              {image ? (
                <Image
                  src={image}
                  alt=""
                  // Fixed size, so 1x and 2x only, the same files Matches and Explore load
                  width={56}
                  height={56}
                  className="size-12 rounded-control object-cover md:size-14"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-control border border-transparent bg-brand-soft text-[0.875rem] font-semibold tracking-[0.02em] text-brand-ink md:size-14 md:text-body"
                >
                  {universityInitials(university.name, university.abbreviatedName)}
                </span>
              )}
              <span className="flex min-w-0 flex-col">
                <span className="text-h3 break-words underline-offset-3 group-hover/card:underline">
                  {university.name}
                </span>
                <span className="text-small font-normal text-muted-foreground">
                  {placeName(university.city, country.name)} · all its programs on IB Match
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                size={20}
                strokeWidth={2}
                className="text-muted-foreground"
              />
            </CardLink>
          </section>
        </div>
      </div>
    </div>
  )
}
