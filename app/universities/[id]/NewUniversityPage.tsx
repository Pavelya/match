import Link from 'next/link'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ds/button-variants'
import { CardLink } from '@/components/ds/Card'
import { Breadcrumbs } from '@/components/detail/Breadcrumbs'
import { Facts, type Fact } from '@/components/detail/Facts'
import { HeroImage } from '@/components/detail/HeroImage'
import { ReadMore } from '@/components/detail/islands'
import type { Crumb } from '@/components/detail/trail'
import { ProgramsByField } from '@/components/university/ProgramsByField'
import { signInTo } from '@/lib/explore/query'
import { countryGuide } from '@/lib/programs/country-guides'
import { descriptionClamp } from '@/lib/programs/description'
import { formatRate } from '@/lib/programs/ib-minimum'
import {
  alsoKnownAs,
  displayUrl,
  placeName,
  plural,
  programsByField,
  telHref
} from '@/lib/universities/details'

export interface UniversityPageData {
  id: string
  name: string
  abbreviatedName: string | null
  description: string
  city: string
  classification: 'PUBLIC' | 'PRIVATE'
  studentPopulation: number | null
  image: string | null
  imageCredit: string | null
  websiteUrl: string
  email: string | null
  phone: string | null
  admitRate: number | null
  internationalAdmitRate: number | null
  admitRateYear: number | null
  country: { code: string; name: string }
  programs: {
    id: string
    name: string
    degreeType: string
    duration: string
    minIBPoints: number | null
    campusCity: string | null
    fieldOfStudy: { name: string }
  }[]
}

/**
 * The university page in the new design (rebranding 2.4, boards "D4.9 University page" and "D4.9
 * University page · phone", approved 12 October 2026): the program page's frame, then every
 * program by field, with Contact and the country's guide beside them. No fit here: "See which ones
 * you qualify for" opens Explore with the name typed, which returns exactly its programs, and
 * Explore works out the fit. The page reads its one query, as today, with four more columns.
 */
export function NewUniversityPage({
  university,
  trail,
  signedIn
}: {
  university: UniversityPageData
  trail: Crumb[]
  signedIn: boolean
}) {
  const groups = programsByField(university.programs)
  const guide = countryGuide(university.country.code)
  const aka = alsoKnownAs(university.name, university.abbreviatedName)
  const image = university.image || null
  const wide = image ? undefined : 'lg:col-span-2 lg:max-w-190'

  const explore = `/programs/search?${new URLSearchParams({ q: university.name })}`
  const fitLink = signedIn
    ? { text: 'See which ones you qualify for', href: explore }
    : { text: 'Sign in to see which ones you qualify for', href: signInTo(explore) }

  const facts: Fact[] = [
    { label: 'Type', value: university.classification === 'PUBLIC' ? 'Public' : 'Private' },
    ...(university.studentPopulation
      ? [{ label: 'Students', value: university.studentPopulation.toLocaleString('en-US') }]
      : []),
    { label: 'On IB Match', value: plural(university.programs.length, 'program') }
  ]
  if (university.admitRate !== null) {
    facts.push({
      label: 'Admit rate',
      value: formatRate(university.admitRate),
      notes: [
        university.admitRateYear
          ? `First-year applicants, fall ${university.admitRateYear}`
          : 'First-year applicants',
        ...(university.internationalAdmitRate === null
          ? []
          : [`${formatRate(university.internationalAdmitRate)} of international applicants`])
      ]
    })
  }

  const contact = [
    {
      label: 'Website',
      text: displayUrl(university.websiteUrl),
      href: university.websiteUrl
    },
    ...(university.email
      ? [{ label: 'Email', text: university.email, href: `mailto:${university.email}` }]
      : []),
    ...(university.phone
      ? [{ label: 'Phone', text: university.phone, href: telHref(university.phone) }]
      : [])
  ]

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-4 pt-3 pb-16 md:px-6 md:pt-5 md:pb-24">
      <Breadcrumbs trail={trail} />

      <div
        className={cn(
          'grid grid-cols-1 gap-y-5',
          image ? 'mt-3' : 'mt-5',
          // The program page's grid: 572 + 48 + 572 for the hero, 784 + 48 + 360 below it
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
          <h1 className="text-h1">{university.name}</h1>
          <p className="text-body text-muted-foreground md:text-body-l">
            {placeName(university.city, university.country.name)}
            {aka && ` · also known as ${aka}`}
          </p>
        </div>

        <div className={cn('min-w-0 lg:col-start-1 lg:row-start-2 lg:mt-6', wide)}>
          <Facts facts={facts} />
        </div>

        <div className="grid grid-cols-2 gap-2.5 md:flex md:flex-wrap md:gap-3 lg:col-start-1 lg:row-start-3 lg:mt-6">
          <a
            href={university.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ className: 'max-md:px-3' })}
          >
            Official website
            <ExternalLink aria-hidden="true" size={16} strokeWidth={2} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            href="#programs"
            className={buttonVariants({ variant: 'secondary', className: 'max-md:px-3' })}
          >
            See its programs
          </a>
        </div>

        <div className="flex min-w-0 flex-col gap-5 lg:col-span-2 lg:col-start-1 lg:row-start-5 lg:mt-10 lg:gap-10">
          {university.description && (
            <section aria-labelledby="about" className="flex flex-col gap-2.5 md:gap-3">
              <h2 id="about" className="text-h2">
                About the university
              </h2>
              <ReadMore clamp={descriptionClamp(university.description)}>
                {university.description}
              </ReadMore>
            </section>
          )}

          <section aria-labelledby="programs" className="flex flex-col gap-3.5 md:gap-4">
            <div className="flex flex-col gap-1">
              <h2 id="programs" className="scroll-mt-4 text-h2">
                Programs on IB Match
              </h2>
              <p className="flex flex-col items-start text-body text-muted-foreground tabular-nums md:block">
                <span>
                  {plural(university.programs.length, 'program')} in{' '}
                  {plural(groups.length, 'field')}
                </span>
                <span aria-hidden="true" className="max-md:hidden">
                  {' · '}
                </span>
                <Link
                  href={fitLink.href}
                  className="inline-flex min-h-8 items-center rounded-chip font-semibold text-primary underline-offset-3 hover:underline pressed:text-brand-ink pressed:underline md:inline md:min-h-0"
                >
                  {fitLink.text}
                </Link>
              </p>
            </div>
            <ProgramsByField groups={groups} universityCity={university.city} />
          </section>
        </div>

        <aside
          aria-label="Contact and country guide"
          className="flex min-w-0 flex-col gap-4 lg:col-start-3 lg:row-start-5 lg:mt-10 lg:self-start"
        >
          <section
            aria-labelledby="contact"
            className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 lg:gap-3.5 lg:p-6"
          >
            <h2 id="contact" className="text-h3">
              Contact
            </h2>
            <dl className="flex flex-col gap-2.5 lg:gap-3">
              {contact.map((item) => (
                <div key={item.label} className="flex min-w-0 flex-col gap-0.5">
                  <dt className="text-label text-muted-foreground">{item.label}</dt>
                  <dd className="text-body [overflow-wrap:anywhere]">
                    <a
                      href={item.href}
                      className="rounded-chip text-primary underline underline-offset-3 pressed:text-brand-ink pressed:underline"
                    >
                      {item.text}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {guide && (
            <CardLink
              href={guide.href}
              className="grid grid-cols-[minmax(0,1fr)_20px] items-center gap-x-3 gap-y-0 p-4 lg:px-6 lg:py-5"
            >
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-label text-muted-foreground">Country guide</span>
                <span className="text-h3 underline-offset-3 group-hover/card:underline">
                  {guide.title}
                </span>
                <span className="text-small font-normal text-muted-foreground">
                  How universities there read the IB: admission, grades, documents and the timeline.
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                size={20}
                strokeWidth={2}
                className="text-muted-foreground"
              />
            </CardLink>
          )}
        </aside>
      </div>
    </div>
  )
}
