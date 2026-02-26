'use client'

/**
 * IB University Requirements — Country Catalog Content
 *
 * Catalog hub for students to find country-specific IB Diploma admission guides.
 * Design language matches the country landing pages (blue-600 accent, rounded-2xl cards,
 * gray-50/white alternating sections).
 */

import Link from 'next/link'
import {
  ArrowRight,
  Search,
  Globe,
  GraduationCap,
  TrendingUp,
  Briefcase,
  Settings,
  Stethoscope,
  Laptop,
  Scale,
  Palette,
  Microscope,
  Users,
  Building,
  Sprout,
  BookOpen,
  Tv,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'

interface Stats {
  totalPrograms: number
  minPoints: number
  maxPoints: number
  avgPoints: number
  countriesCount: number
}

interface Country {
  id: string
  name: string
  code: string
  flagEmoji: string
  programCount: number
  minPoints: number
  maxPoints: number
  avgPoints: number
  guideSlug: string | null
  guideSummary: string | null
}

interface Field {
  id: string
  name: string
  iconName: string | null
  description: string | null
  programCount: number
  avgPoints: number
}

interface Props {
  stats: Stats
  countries: Country[]
  fields: Field[]
}

// Map field names to lucide icons
const getFieldIcon = (fieldName: string) => {
  const iconMap: Record<string, typeof GraduationCap> = {
    'Business & Economics': Briefcase,
    Engineering: Settings,
    'Medicine & Health': Stethoscope,
    'Computer Science': Laptop,
    Law: Scale,
    'Arts & Humanities': Palette,
    'Natural Sciences': Microscope,
    'Social Sciences': Users,
    Architecture: Building,
    'Environmental Studies': Sprout,
    Education: BookOpen,
    Educaton: BookOpen,
    Media: Tv
  }
  return iconMap[fieldName] || GraduationCap
}

const faqs = [
  {
    question: 'Which countries accept the IB Diploma for university admission?',
    answer:
      'The IB Diploma is recognized by universities in over 100 countries worldwide. Each country has its own process for evaluating IB scores — some convert them to local equivalents (e.g., UCAS Tariff in the UK, ATAR in Australia, CAO points in Ireland), while others accept IB points directly. Use the country guides above to find the specific rules for your target country.'
  },
  {
    question: 'How do universities convert IB scores to local grading systems?',
    answer:
      'Conversion methods vary significantly. The UK uses UCAS Tariff points, Ireland converts to CAO points, Sweden maps to the Swedish grade scale, Australia converts to an ATAR, and Germany evaluates against Allgemeine Hochschulreife requirements. Our country guides explain each system with official conversion tables and sources.'
  },
  {
    question: 'What IB points do I need for university?',
    answer:
      'Requirements range from 24 to 45 points depending on the program, institution, and country. Competitive programs at top universities typically require 38–45 points, while less selective programs may accept 24–30 points. Many programs also require specific subjects at Higher Level (HL) with minimum grades.'
  },
  {
    question: 'Do I need specific Higher Level (HL) subjects?',
    answer:
      'Many universities require specific subjects at HL with minimum grades. For example, Engineering programs often require Math HL (grade 5–6+), Medicine typically requires Chemistry HL and Biology HL, and Economics programs prefer Math HL. Requirements vary by country and institution — check our country guides for details.'
  },
  {
    question: 'Do I need to take entrance exams as an IB student?',
    answer:
      'This depends on the country and program. In many European countries (UK, Germany, Sweden), no entrance exams are required for IB students. However, some countries have specific tests — for example, Ireland requires HPAT for Medicine, Spain requires the PCE exam for grade conversion, and some competitive programs in Hong Kong may have interviews.'
  }
]

export function RequirementsContent({ stats, countries, fields }: Props) {
  const countriesWithGuides = countries.filter((c) => c.guideSlug)
  const countriesWithoutGuides = countries.filter((c) => !c.guideSlug)

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <Globe className="h-4 w-4 mr-2" />
              Updated for 2026 Intake
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              IB Diploma Admission Rules <span className="text-blue-600">by Country</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Every country evaluates the IB Diploma differently. Find{' '}
              <strong>official recognition rules</strong>, <strong>grade conversion systems</strong>
              , and <strong>application processes</strong> for your target country — all sourced
              from government and institutional portals.
            </p>

            {/* Compact Stats Badges */}
            <div className="mt-10 flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-x-8">
              <div className="flex items-center gap-x-2 text-sm text-gray-600">
                <Globe className="h-4 w-4 text-blue-600" />
                <span>
                  <strong>{stats.countriesCount}</strong> countries
                </span>
              </div>
              <div className="flex items-center gap-x-2 text-sm text-gray-600">
                <GraduationCap className="h-4 w-4 text-blue-600" />
                <span>
                  <strong suppressHydrationWarning>{stats.totalPrograms.toLocaleString()}</strong>{' '}
                  programs
                </span>
              </div>
              <div className="flex items-center gap-x-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span>
                  <strong>
                    {stats.minPoints}–{stats.maxPoints}
                  </strong>{' '}
                  IB points range
                </span>
              </div>
            </div>

            {/* Quick Jump */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#country-guides"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                Browse Country Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/programs/search"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Search All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Country Guides Grid */}
      <section id="country-guides" className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Country Guides</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Detailed IB Admission Guides
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              In-depth guides with official recognition rules, grade conversion tables, application
              deadlines, and document requirements.
            </p>
          </div>

          {/* Countries with dedicated guides */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {countriesWithGuides.map((country) => (
              <Link
                key={country.id}
                href={`/study-in-${country.guideSlug}-with-ib-diploma`}
                className="group relative rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{country.flagEmoji}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors mt-1" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {country.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 leading-snug">{country.guideSummary}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-blue-700 font-medium">
                    {country.programCount} programs
                  </span>
                  <span>
                    {country.minPoints}–{country.maxPoints} IB pts
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Countries without guides yet */}
          {countriesWithoutGuides.length > 0 && (
            <>
              <div className="mx-auto max-w-3xl text-center mt-16 mb-8">
                <h3 className="text-xl font-semibold text-gray-900">More Countries</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Detailed guides coming soon. Browse programs by country in the meantime.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {countriesWithoutGuides.map((country) => (
                  <Link
                    key={country.id}
                    href={`/programs/search?countries=${country.id}`}
                    className="group flex items-center gap-4 rounded-xl bg-white p-4 border border-gray-200 hover:border-gray-300 transition-all duration-200"
                  >
                    <span className="text-2xl flex-shrink-0">{country.flagEmoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        {country.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {country.programCount} programs · Avg {country.avgPoints} IB pts
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* How IB Scoring Works — condensed */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Understanding the IB Diploma
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How IB Scoring Works for University Admission
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                The IB Diploma Programme awards up to <strong>45 points</strong>: 42 from six
                subject grades (7 points max each) plus up to 3 bonus points from Theory of
                Knowledge (TOK) and the Extended Essay (EE). Universities evaluate IB applications
                based on several factors:
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-gray-50 p-6 border border-gray-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 mb-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">Total IB Points</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Your overall score out of 45. Most universities set minimum thresholds
                    (typically 24–38+).
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-6 border border-gray-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 mb-3">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">HL Subject Requirements</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Specific Higher Level subjects with minimum grades (e.g., Math HL 6+ for
                    Engineering).
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-6 border border-gray-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 mb-3">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">Country-Specific Rules</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Each country has its own conversion system, application portal, and deadlines
                    for IB students.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-blue-50 p-6 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Common HL Subject Requirements by Field
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Engineering:</strong> Math HL, Physics/Chemistry HL
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Medicine:</strong> Chemistry HL, Biology HL
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Economics/Business:</strong> Math HL preferred
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Humanities/Law:</strong> Relevant humanities at HL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Field of Study Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-base font-semibold leading-7 text-blue-600">By Field of Study</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Average IB Requirements by Academic Field
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Explore programs by field of study to see typical IB point requirements.
            </p>
          </div>

          <div className="grid max-w-xl grid-cols-1 gap-4 lg:max-w-none lg:grid-cols-3">
            {fields.slice(0, 12).map((field) => {
              const IconComponent = getFieldIcon(field.name)
              return (
                <Link
                  key={field.id}
                  href={`/programs/search?fields=${field.id}`}
                  className="group flex items-center gap-4 rounded-xl bg-white p-5 border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {field.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {field.programCount} programs · Avg {field.avgPoints} IB pts
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">FAQ</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </p>

            <div className="mt-8 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl bg-white p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600 faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover university programs that match your IB profile. Search by IB points, subject
              requirements, country, and field of study.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                Get Started — It&apos;s Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/programs/search"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Search All Programs
              </Link>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              100% free for students. No credit card required.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
