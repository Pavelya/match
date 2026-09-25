'use client'

/**
 * Spain Content Component
 *
 * Client component for the Spain IB landing page.
 * Follows design patterns from /how-it-works and /ib-university-requirements
 */

import Link from 'next/link'
import {
  GraduationCap,
  CheckCircle2,
  FileText,
  Building2,
  ArrowRight,
  Search,
  Scale,
  BookOpen,
  ExternalLink
} from 'lucide-react'

// Access grade from the average IB subject grade (Orden EFD/550/2025, annex III.a):
// 5 + 5 × (average − 2) / (7 − 2), which for the IB is the average plus 3
const gradeConversionData = [
  { ibAverage: '7.0', accessGrade: '10.0' },
  { ibAverage: '6.5', accessGrade: '9.5' },
  { ibAverage: '6.0', accessGrade: '9.0' },
  { ibAverage: '5.0', accessGrade: '8.0' },
  { ibAverage: '4.0', accessGrade: '7.0' }
]

// Subjects Madrid's public universities can weight (2026–27 admission agreement, annex)
const subjectWeightings = [
  {
    field: 'Sciences and engineering',
    subjects: 'Matemáticas II, Física, Química, Biología, Tecnología e Ingeniería II'
  },
  {
    field: 'Social sciences',
    subjects:
      'Matemáticas Aplicadas a las Ciencias Sociales II, Empresa y Diseño de Modelos de Negocio, Geografía'
  },
  { field: 'Humanities', subjects: 'Historia del Arte, Latín II, Griego II' },
  { field: 'Arts and design', subjects: 'Dibujo Artístico II, Dibujo Técnico II, Diseño' }
]

// UNEDasiss required documents (EU, agreement and IB systems)
const requiredDocuments = [
  'Certified copy of your school transcripts for the last two years before university',
  'Certified copy of the document that gives you access to university: your IB Diploma and results',
  'Passport or national ID',
  'Payment of the UNEDasiss fee (applications are processed only once paid)'
]

// Application timeline (UNEDasiss 2026 dates; the 2027 dates are not yet published)
const timelineSteps = [
  {
    period: 'From 4 February',
    description:
      'The UNEDasiss online application opens, and stays open until 1 December. Apply at least six weeks before your university deadline.'
  },
  {
    period: 'Mid-March to late April',
    description:
      'Register for the May PCE exams. In 2026 registration ran from 16 March to 28 April.'
  },
  {
    period: 'Late May',
    description:
      'PCE exams: 25–29 May 2026 in Spain. A September session followed on 2–8 September 2026.'
  },
  {
    period: 'Early July',
    description:
      'Apply to public universities. The 2026 deadline for international students was 7 July. Apply even if your accreditation is not ready: missing documents were accepted until 31 July.'
  }
]

// FAQ data
const faqs = [
  {
    question: 'Do predicted IB grades work for Spain?',
    answer:
      'Not for the access grade, which UNEDasiss calculates from your final IB subject grades. If you have not finished the IB by the admission deadline, send your latest school transcripts with your application and the missing documents when you have them.',
    source: 'UNEDasiss — Key dates (in Spanish)',
    sourceUrl: 'https://unedasiss.uned.es/fechas_clave'
  },
  {
    question: 'Can IB students study Medicine in Spain?',
    answer:
      "Yes, but places are highly competitive. For 2026–27, the cut-off for Medicine at Madrid's public universities was between 12.8 and 13.1 out of 14.",
    source: 'Comunidad de Madrid — Cut-off grades 2026–27 (PDF, in Spanish)',
    sourceUrl: 'https://www.comunidad.madrid/docs/2026-07/notas-de-corte-dum-2026-27.pdf'
  },
  {
    question: 'Is Spanish language required?',
    answer:
      'It depends on the university. Each university sets its own language requirements, and UNEDasiss can add a language certificate to your accreditation when a university asks for one.',
    source: 'UNEDasiss — Types of international students (in Spanish)',
    sourceUrl: 'https://unedasiss.uned.es/publico_destino'
  },
  {
    question: 'Is UNEDasiss required for private universities?',
    answer:
      'Usually. UNEDasiss says IB students need its accreditation to enter a Spanish university. Private universities run their own admissions, so confirm what each one asks for.',
    source: 'UNEDasiss — Types of international students (in Spanish)',
    sourceUrl: 'https://unedasiss.uned.es/publico_destino'
  }
]

export function SpainContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇪🇸</span>
              Official University Admission Guide for IB Students (2027)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Spain with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for university admission in
                Spain
              </strong>
              , using only official public sources. It is written exclusively for{' '}
              <strong>IB Diploma students and IB Coordinators</strong>.
            </p>

            <p className="mt-4 text-sm text-gray-500">Last updated for the 2027 intake</p>

            <div className="mt-10 flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-x-8">
              <div className="flex items-center gap-x-2 text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>IB Diploma only</span>
              </div>
              <div className="flex items-center gap-x-2 text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Official sources</span>
              </div>
              <div className="flex items-center gap-x-2 text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>2027 intake</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Spain Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Spain Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Spanish law lets holders of the{' '}
                <strong>International Baccalaureate (IB) Diploma</strong> enter university without
                taking the Spanish university access exam and without having their diploma
                homologated to the Spanish <em>Bachillerato</em>.
              </p>

              <p>
                The exemption is set by the Education Act (Ley Orgánica 2/2006, additional provision
                33). <strong>Orden EFD/550/2025</strong>, published in the{' '}
                <strong>Spanish Official State Gazette</strong>, sets how IB grades convert to the
                Spanish scale for admissions from 2025–26 onwards.
              </p>

              <p>
                <strong>UNEDasiss</strong>, a service of the Spanish public distance-learning
                university UNED, calculates your access grade and issues the accreditation that
                universities use in their admissions.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.boe.es/buscar/act.php?id=BOE-A-2025-10777"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      BOE — Orden EFD/550/2025 (in Spanish)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://unedasiss.uned.es/publico_destino"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      UNEDasiss — Types of international students (in Spanish)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Do IB Students Need to Take Selectividad? */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Entrance Exams</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Do IB Students Need to Take Selectividad?
            </p>

            <div className="mt-8">
              <div className="rounded-2xl bg-green-50 p-8 border border-green-100">
                <p className="text-2xl font-bold text-green-800 mb-4">No.</p>
                <p className="text-gray-700">
                  IB Diploma holders are <strong>exempt from the university access exam</strong>{' '}
                  (the PAU, formerly EvAU or EBAU, known as <em>Selectividad</em>). The exemption
                  comes from the law and applies nationwide.
                </p>
                <p className="mt-4 text-gray-700">
                  To raise your admission grade above 10, you can still take optional subject exams.
                  See the extra points section below.
                </p>
              </div>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.boe.es/buscar/act.php?id=BOE-A-2024-11858"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      BOE — Real Decreto 534/2024 on university access (in Spanish)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.comunidad.madrid/educacion/acceso-universidad-estudios-extranjeros"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Comunidad de Madrid — University access with foreign studies (in Spanish)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How IB Scores Are Converted in Spain (5–14 Scale) */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Grade Conversion</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How IB Scores Are Converted in Spain (5–14 Scale)
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Spain uses a <strong>two-step score</strong>. UNEDasiss converts your IB grades into
              an access grade out of 10, and universities can add up to 4 points for weighted
              subjects.
            </p>

            {/* Base Score Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Scale className="h-5 w-5 text-blue-600" />
                Access Grade (5–10)
              </h3>
              <p className="text-gray-600 mb-6">
                UNEDasiss averages the grades of the subjects on your IB results and converts the
                average with the formula in Orden EFD/550/2025:{' '}
                <strong>access grade = 5 + 5 × (average − 2) ÷ 5</strong>. For the IB, that is your
                average plus 3. Your total out of 45 is not used.
              </p>

              <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 overflow-hidden max-w-sm">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Average IB Subject Grade
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                        Access Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {gradeConversionData.map((row) => (
                      <tr key={row.ibAverage} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-700">{row.ibAverage}</td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-semibold text-blue-700">
                            {row.accessGrade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subject Weighting Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Subject Weighting Bonus (+0 to +4)
              </h3>
              <p className="text-gray-600 mb-6">
                Universities add the grades of up to two subjects, each multiplied by{' '}
                <strong>0.1 or 0.2</strong> (<em>ponderaciones</em>) depending on how relevant the
                subject is to the degree.
              </p>

              <div className="rounded-2xl bg-blue-50 p-6 mb-6">
                <p className="text-center text-lg font-semibold text-gray-900">
                  Access Grade (5–10) + Weighted Subjects (up to +4) ={' '}
                  <span className="text-blue-600">Maximum 14</span>
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.boe.es/buscar/act.php?id=BOE-A-2025-10777"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      BOE — Orden EFD/550/2025 (in Spanish)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://universitats.gencat.cat/ca/preinscripcions/ponderacions/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Universities of Catalonia — Weightings (in Catalan)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How IB Subjects Increase Your Admission Score */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Subject Weightings</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Subjects Increase Your Admission Score
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              The weighted subjects are <strong>Spanish Bachillerato subjects</strong>. Each public
              university publishes a table of which subjects count for each degree and whether they
              weigh 0.1 or 0.2. Catalonia has already published its tables for 2027.
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Subjects Madrid&apos;s public universities can weight (2026–27), grouped by area:
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {subjectWeightings.map((item) => (
                  <div
                    key={item.field}
                    className="rounded-xl bg-gray-50 p-6 border border-gray-200"
                  >
                    <p className="font-semibold text-gray-900">{item.field}</p>
                    <p className="mt-1 text-sm text-gray-600">{item.subjects}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://universitats.gencat.cat/ca/preinscripcions/ponderacions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Universities of Catalonia — Weightings (in Catalan)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.comunidad.madrid/docs/2026-06/acuerdo-universidades-2026-2027.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Madrid public universities — Admission agreement 2026–27 (PDF, in Spanish)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get the Extra Points */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Extra Points</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How to Get the Extra Points: Recognition vs PCE Exams
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Option 1 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Option 1: Recognition of IB Subjects
                  </h3>
                </div>
                <p className="text-gray-600">
                  UNEDasiss can recognise IB subjects as equivalent to Spanish ones, so you do not
                  sit PCE exams in them. Not every university accepts recognised subjects, and only
                  subjects finished in the current or the two previous school years count.
                </p>
                <p className="mt-4 text-sm">
                  <strong>Source:</strong>{' '}
                  <a
                    href="https://unedasiss.uned.es/faqs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    UNEDasiss — FAQ (in Spanish)
                  </a>
                </p>
              </div>

              {/* Option 2 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Option 2: PCE Exams</h3>
                </div>
                <p className="text-gray-600">
                  Students may take UNED&apos;s <strong>PCE exams</strong> (specific competence
                  tests) in the subjects a university weights. There is a May–June session and a
                  September session.
                </p>
                <div className="mt-4 text-sm space-y-1">
                  <p>
                    <strong>Sources:</strong>
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <a
                        href="https://unedasiss.uned.es/examenes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        UNEDasiss — Exams (in Spanish)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://unedasiss.uned.es/fechas_clave"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        UNEDasiss — Key dates (in Spanish)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public vs Private Universities */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">University Types</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Public vs Private Universities for IB Students
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Public Universities */}
              <div className="rounded-2xl bg-gray-50 p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Public Universities</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Score-based admission</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Cut-off grades (<em>Nota de Corte</em>)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>UNEDasiss accreditation required</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm">
                  <strong>Source:</strong>{' '}
                  <a
                    href="https://www.comunidad.madrid/educacion/acceso-universidad-estudios-extranjeros"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Comunidad de Madrid — University access with foreign studies (in Spanish)
                  </a>
                </p>
              </div>

              {/* Private Universities */}
              <div className="rounded-2xl bg-gray-50 p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Private Universities</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Their own admission procedures</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Ask each one whether it needs the UNEDasiss accreditation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNEDasiss Documents Required */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Documentation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              UNEDasiss Documents Required for IB Students
            </p>

            <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
              <ul className="space-y-4">
                {requiredDocuments.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-gray-700">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              <strong>Source:</strong>{' '}
              <a
                href="https://unedasiss.uned.es/paso_3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                UNEDasiss — Prepare your documents (in Spanish)
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* UNEDasiss Application Timeline */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Timeline</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              UNEDasiss Application Timeline
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              UNEDasiss has not yet published its 2027 dates. The steps below follow its 2026
              calendar:
            </p>

            <div className="mt-8 space-y-4">
              {timelineSteps.map((step, index) => (
                <div
                  key={step.period}
                  className="flex items-center gap-4 rounded-xl bg-gray-50 p-6 border border-gray-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{step.period}</p>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-gray-600">
              <strong>Source:</strong>{' '}
              <a
                href="https://unedasiss.uned.es/fechas_clave"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                UNEDasiss — Key dates (in Spanish)
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">FAQ</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions (IB Only)
            </p>

            <div className="mt-8 space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-xl bg-white p-6 shadow-sm border border-gray-200"
                >
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                  <p className="mt-3 text-sm">
                    <span className="text-gray-500">Source:</span>{' '}
                    <a
                      href={faq.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {faq.source}
                    </a>
                  </p>
                </div>
              ))}
            </div>

            {/* Internal Link */}
            <div className="mt-8 rounded-xl bg-blue-50 p-6 border border-blue-100">
              <p className="text-gray-700">
                Learn{' '}
                <Link href="/how-it-works" className="text-blue-600 font-medium hover:underline">
                  how IB Match calculates your admission score
                </Link>{' '}
                for Spanish universities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-4xl mb-4">🇪🇸</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in Spain?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover Spanish university programs that match your IB profile. Search by IB points,
              subject requirements, and field of study.
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
                href="/programs/search?countries=cmip2am54000o7m185new43of"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in Spain
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
