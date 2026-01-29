'use client'

/**
 * Requirements Content Component
 *
 * Professional client component for IB Requirements landing page.
 * Matches design language of /how-it-works and /for-coordinators
 */

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  ArrowUpDown,
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
  CheckCircle2
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

type SortKey = 'name' | 'programCount' | 'minPoints' | 'maxPoints' | 'avgPoints'
type SortDirection = 'asc' | 'desc'

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
    Educaton: BookOpen, // Handle typo in DB
    Media: Tv
  }
  return iconMap[fieldName] || GraduationCap
}

export function RequirementsContent({ stats, countries, fields }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('programCount')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('desc')
    }
  }

  const sortedCountries = [...countries].sort((a, b) => {
    const aVal = a[sortKey]
    const bVal = b[sortKey]

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }

    return sortDirection === 'asc'
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number)
  })

  return (
    <>
      {/* Hero Stats Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Global Database</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              IB Admission Requirements Worldwide
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Comprehensive guide to IB Diploma university requirements across{' '}
              {stats.countriesCount} countries and {stats.totalPrograms} programs. Compare admission
              criteria, IB points, and subject requirements.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Globe className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  Countries
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="text-3xl font-bold text-gray-900">{stats.countriesCount}</p>
                  <p className="mt-2">Universities worldwide accepting IB Diploma</p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <GraduationCap className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  Programs
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="text-3xl font-bold text-gray-900" suppressHydrationWarning>
                    {stats.totalPrograms.toLocaleString()}
                  </p>
                  <p className="mt-2">IB-accepting programs in our database</p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <TrendingUp className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  IB Points Range
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.minPoints}–{stats.maxPoints}
                  </p>
                  <p className="mt-2">Average: {stats.avgPoints} IB points</p>
                </dd>
              </div>
            </dl>
          </div>

          {/* CTA */}
          <div className="mt-16 flex items-center justify-center gap-x-6">
            <Link href="/programs/search">
              <Button size="lg" className="gap-2">
                <Search className="h-5 w-5" />
                Search Programs by IB Points
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Country Breakdown Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-blue-600">By Country</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              IB Requirements by Country
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Compare IB admission requirements across universities in different countries. Click
              column headers to sort, or click a country to search programs.
            </p>
          </div>

          <div className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 bg-gray-50">
                  <TableHead className="py-4">
                    <button
                      className="flex items-center gap-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      Country
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right py-4">
                    <button
                      className="flex items-center gap-2 ml-auto font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      onClick={() => handleSort('programCount')}
                    >
                      Programs
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right py-4">
                    <button
                      className="flex items-center gap-2 ml-auto font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      onClick={() => handleSort('minPoints')}
                    >
                      Min IB
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right py-4">
                    <button
                      className="flex items-center gap-2 ml-auto font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      onClick={() => handleSort('maxPoints')}
                    >
                      Max IB
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right py-4">
                    <button
                      className="flex items-center gap-2 ml-auto font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      onClick={() => handleSort('avgPoints')}
                    >
                      Avg IB
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCountries.map((country) => (
                  <TableRow key={country.id} className="border-b border-gray-200 last:border-0">
                    <TableCell className="font-medium text-gray-900 py-4">
                      <Link
                        href={`/programs/search?country=${country.code}`}
                        className="flex items-center gap-3 hover:text-blue-600 transition-colors"
                      >
                        <span className="text-2xl">{country.flagEmoji}</span>
                        {country.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right text-gray-600 py-4">
                      {country.programCount}
                    </TableCell>
                    <TableCell className="text-right text-gray-600 py-4">
                      {country.minPoints}
                    </TableCell>
                    <TableCell className="text-right text-gray-600 py-4">
                      {country.maxPoints}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-900 py-4">
                      {country.avgPoints}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Field Breakdown Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-blue-600">By Field of Study</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              IB Requirements by Academic Field
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Average IB requirements for different academic fields. Click a field to search
              programs.
            </p>
          </div>

          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
            {fields.slice(0, 12).map((field) => {
              const IconComponent = getFieldIcon(field.name)
              return (
                <Link key={field.id} href={`/programs/search?field=${field.id}`}>
                  <div className="flex flex-col hover:bg-gray-50 p-6 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-blue-100">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <IconComponent
                        className="h-5 w-5 flex-none text-blue-600"
                        aria-hidden="true"
                      />
                      {field.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex items-center gap-2">
                        <span className="text-2xl font-semibold text-gray-900">
                          {field.avgPoints}
                        </span>
                        <span className="text-sm">IB points avg</span>
                      </p>
                      <p className="mt-2 text-sm">{field.programCount} programs</p>
                    </dd>
                  </div>
                </Link>
              )
            })}
          </dl>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Understanding Requirements
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How to Use Your IB Points for University Admission
            </p>

            <div className="mt-10 space-y-8 text-base leading-7 text-gray-600">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Understanding IB Scoring
                </h3>
                <p>
                  The International Baccalaureate Diploma Programme awards points based on your
                  performance across six subject areas plus Theory of Knowledge (TOK) and Extended
                  Essay (EE). The maximum score is 45 points:
                </p>
                <ul className="mt-4 space-y-2 list-none">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Subject Grades:</strong> 6 subjects × 7 points = 42 points maximum
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>TOK + EE:</strong> Up to 3 bonus points
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Total:</strong> 45 points maximum
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  How Universities Evaluate IB Diplomas
                </h3>
                <p>Universities assess IB applications based on multiple factors:</p>
                <ol className="mt-4 space-y-3 list-decimal list-inside">
                  <li>
                    <strong>Total IB Points:</strong> Your overall score out of 45. Most
                    universities set minimum point requirements (e.g., &quot;minimum 38
                    points&quot;).
                  </li>
                  <li>
                    <strong>Subject Requirements:</strong> Specific subjects at Higher Level (HL) or
                    Standard Level (SL) with minimum grades. For example, Engineering programs often
                    require Math HL with a grade of 6 or higher.
                  </li>
                  <li>
                    <strong>Subject Relevance:</strong> Having HL subjects related to your intended
                    field of study strengthens your application.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">HL vs SL Requirements</h3>
                <p>
                  <strong>Higher Level (HL)</strong> courses involve more depth and are typically
                  240 teaching hours, while <strong>Standard Level (SL)</strong> courses are 150
                  hours. Competitive programs often require specific subjects at HL:
                </p>
                <ul className="mt-4 space-y-2 list-none">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>STEM Programs:</strong> Math HL and/or Physics/Chemistry HL
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Medicine:</strong> Chemistry HL, Biology HL
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Economics/Business:</strong> Math HL preferred
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Humanities:</strong> Relevant humanities subjects at HL
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Use our intelligent search to discover programs that align with your IB profile,
              location preferences, and academic interests.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/programs/search">
                <Button size="lg" className="gap-2">
                  <Search className="h-5 w-5" />
                  Search Programs
                </Button>
              </Link>
              <Link href="/student/onboarding">
                <Button size="lg" variant="outline">
                  Create Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
