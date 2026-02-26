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

// Grade conversion table data
const gradeConversionData = [
  { ibPoints: '42–45', baseScore: '10.0' },
  { ibPoints: '40', baseScore: '~9.5' },
  { ibPoints: '36', baseScore: '~8.4' },
  { ibPoints: '30', baseScore: '~6.8' },
  { ibPoints: '24', baseScore: '5.0' }
]

// Subject weighting examples
const subjectWeightings = [
  { field: 'Engineering', subjects: 'Mathematics AA, Physics' },
  { field: 'Health Sciences', subjects: 'Biology, Chemistry' },
  { field: 'Business & Economics', subjects: 'Mathematics, Economics' },
  { field: 'Humanities', subjects: 'History, Geography, Art' }
]

// UNEDassis required documents
const requiredDocuments = [
  'IB Diploma or predicted grades',
  'Academic transcripts',
  'Passport or ID',
  'Proof of payment',
  'Official IB results sent by the IBO'
]

// Application timeline
const timelineSteps = [
  { period: 'February–March', description: 'Applications open' },
  { period: 'May', description: 'PCE registration deadline' },
  { period: 'June–July', description: 'Exams and cut-off scores' },
  { period: 'July–September', description: 'Admissions' }
]

// FAQ data
const faqs = [
  {
    question: 'Do predicted IB grades work for Spain?',
    answer: 'Yes. Final enrollment requires official results.',
    source: 'https://unedasiss.uned.es'
  },
  {
    question: 'Can IB students study Medicine in Spain?',
    answer: 'Yes. Cut-off scores are often above 12.5 / 14.',
    source: 'https://www.universidades.gob.es'
  },
  {
    question: 'Is Spanish language required?',
    answer: 'Usually B2 for public universities.',
    source: 'https://www.universidades.gob.es'
  },
  {
    question: 'Is UNEDassis required for private universities?',
    answer: 'In most cases, yes.',
    source: 'https://unedasiss.uned.es'
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
              Official University Admission Guide for IB Students (2026)
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

            <p className="mt-4 text-sm text-gray-500">Last updated for the 2026 intake</p>

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
                <span>2026 intake</span>
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
                Spain officially recognizes the{' '}
                <strong>International Baccalaureate (IB) Diploma</strong> as equivalent to the
                Spanish <em>Título de Bachiller</em>. This equivalence allows IB students to access
                Spanish higher education without completing the national Spanish Bachillerato.
              </p>

              <p>
                This recognition is established in Spanish education regulations published in the{' '}
                <strong>Spanish Official State Gazette</strong>, Spain&apos;s official legal
                bulletin.
              </p>

              <p>
                The accreditation process is administered by <strong>UNEDassis</strong>, the only
                public body authorized to validate international secondary school diplomas for
                university access in Spain.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.boe.es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.boe.es
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://unedasiss.uned.es/home/acreditacion"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://unedasiss.uned.es/home/acreditacion
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
                  IB students are <strong>exempt from the general phase</strong> of the Spanish
                  university entrance examination (EvAU / Selectividad) due to the official
                  equivalence of the IB Diploma.
                </p>
                <p className="mt-4 text-gray-700">
                  This exemption is confirmed through UNEDassis accreditation and applies
                  nationwide.
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
                      href="https://unedasiss.uned.es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://unedasiss.uned.es
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.universidades.gob.es/acceso-y-admision-a-la-universidad/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.universidades.gob.es/acceso-y-admision-a-la-universidad/
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How IB Scores Are Converted in Spain (0–14 System) */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Grade Conversion</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How IB Scores Are Converted in Spain (0–14 System)
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Spain uses a <strong>two-step scoring system</strong> regulated by the Ministry of
              Universities, with score conversion performed by UNEDassis.
            </p>

            {/* Base Score Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Scale className="h-5 w-5 text-blue-600" />
                Base University Access Score (0–10)
              </h3>
              <p className="text-gray-600 mb-6">
                Your total IB Diploma score (24–45 points) is converted into a{' '}
                <strong>Base University Access Score</strong> on a 0–10 scale.
              </p>

              <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 overflow-hidden max-w-sm">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        IB Points
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                        Base Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {gradeConversionData.map((row) => (
                      <tr key={row.ibPoints} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-700">{row.ibPoints}</td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-semibold text-blue-700">
                            {row.baseScore}
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
                Universities may award up to <strong>4 additional points</strong> based on subject
                relevance (<em>ponderaciones</em>).
              </p>

              <div className="rounded-2xl bg-blue-50 p-6 mb-6">
                <p className="text-center text-lg font-semibold text-gray-900">
                  Base Score (0–10) + Weighted Subjects (up to +4) ={' '}
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
                      href="https://www.universidades.gob.es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.universidades.gob.es
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.comunidad.madrid/servicios/educacion/distrito-unico"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.comunidad.madrid/servicios/educacion/distrito-unico
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
              How IB Subjects Increase Your Admission Score
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Universities assign subject weightings of <strong>0.1 or 0.2</strong> depending on
              degree relevance.
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Typical high-weight IB subjects:
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
                    href="https://universitats.gencat.cat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://universitats.gencat.cat
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.comunidad.madrid/servicios/educacion/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.comunidad.madrid/servicios/educacion/
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
                    Option 1: IB Higher Level Recognition
                  </h3>
                </div>
                <p className="text-gray-600">
                  UNEDassis may directly recognize IB HL subjects (usually grades 5–7).
                </p>
                <p className="mt-4 text-sm">
                  <strong>Source:</strong>{' '}
                  <a
                    href="https://unedasiss.uned.es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://unedasiss.uned.es
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
                  Students may take <strong>PCE exams</strong> administered by UNED.
                </p>
                <div className="mt-4 text-sm space-y-1">
                  <p>
                    <strong>Sources:</strong>
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <a
                        href="https://unedasiss.uned.es/home/pce"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        https://unedasiss.uned.es/home/pce
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://unedasiss.uned.es/home/calendarios"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        https://unedasiss.uned.es/home/calendarios
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
                    <span>UNEDassis required</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm">
                  <strong>Source:</strong>{' '}
                  <a
                    href="https://www.universidades.gob.es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.universidades.gob.es
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
                    <span>Holistic admissions</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>UNEDassis often required for enrollment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNEDassis Documents Required */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Documentation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              UNEDassis Documents Required for IB Students
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
                href="https://unedasiss.uned.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://unedasiss.uned.es
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* UNEDassis Application Timeline */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Timeline</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              UNEDassis Application Timeline
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Typical timeline according to UNEDassis:
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
                href="https://unedasiss.uned.es/home/calendarios"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://unedasiss.uned.es/home/calendarios
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
                      href={faq.source}
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
