'use client'

/**
 * Australia Content Component
 *
 * Client component containing all content sections for the Australia IB landing page.
 * Content is based on official sources as specified in the SEO materials document.
 */

import Link from 'next/link'
import {
  CheckCircle2,
  FileText,
  Building2,
  ArrowRight,
  Search,
  ExternalLink,
  BookOpen
} from 'lucide-react'

// IBAS to ATAR conversion table data (valid to May 2026)
const ibasAtarConversionData = [
  { ibas: '45.75', atar: '99.95' },
  { ibas: '45.00', atar: '99.85' },
  { ibas: '43.00', atar: '98.90' },
  { ibas: '40.00', atar: '96.30' },
  { ibas: '38.00', atar: '94.25' }
]

// Required documents
const requiredDocuments = [
  'IB Diploma results or predicted grades',
  'Academic transcripts',
  'Passport or ID',
  'Evidence of meeting prerequisites (if required)',
  'Evidence of English proficiency (if required)'
]

// Application timeline
const timelineSteps = [
  { period: 'Mid-year to early spring', description: 'Applications open' },
  { period: 'Late year', description: 'Main offer rounds' },
  { period: 'After IB results release', description: 'Conditions confirmed' }
]

// FAQ data
const faqs = [
  {
    question: 'How is the IB diploma recognized in Australia?',
    answer:
      'It is accepted as a senior secondary qualification and assessed via IBAS–ATAR or IB-based selection rules set by universities and admissions centres.',
    source: 'https://ibaustralasia.org/university-entrance/'
  },
  {
    question: 'Do IB students get an ATAR in Australia?',
    answer: 'No. They receive an IBAS that converts to an ATAR-equivalent rank.',
    source: 'https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants'
  },
  {
    question: 'How does IBAS convert to ATAR for 2026?',
    answer:
      'Using the official conversion schedule valid for IB exams from November 2022 to May 2026.',
    source:
      'https://ibaustralasia.org/2026-ib-diploma-conversion-to-atar-equivalent-ibas-available/'
  },
  {
    question: 'Are entrance exams required in Australia for IB students?',
    answer: 'Usually no, but some programs require additional selection steps.',
    source: 'https://www.curtin.edu.au/study/applying/ib-diploma/'
  },
  {
    question: 'Is English required for university in Australia for IB students?',
    answer: "Yes. English requirements depend on the university's policy.",
    source:
      'https://www.sydney.edu.au/study/applying/how-to-apply/international-students/english-language-requirements.html'
  }
]

export function AustraliaContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇦🇺</span>
              Official University Admission Guide for IB Students (2026)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Australia with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for university admission in
                Australia
              </strong>
              , using only official admissions-centre, university, and IB Australasia sources. It is
              written exclusively for <strong>IB Diploma students and IB Coordinators</strong>.
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

      {/* How Australia Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Australia Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Australia recognizes the <strong>International Baccalaureate (IB) Diploma</strong>{' '}
                as an accepted senior secondary qualification for entry to Australian universities.
              </p>

              <p>
                Admission decisions are made by universities, often using state-based admissions
                centres that compare IB results with ATAR-based applicants.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ibaustralasia.org/university-entrance/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://ibaustralasia.org/university-entrance/
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Do IB Students Get an ATAR in Australia? */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">ATAR Equivalent</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Do IB Students Get an ATAR in Australia?
            </p>

            <div className="mt-8">
              <div className="rounded-2xl bg-amber-50 p-8 border border-amber-100">
                <p className="text-2xl font-bold text-amber-800 mb-4">No.</p>
                <p className="text-gray-700">
                  IB students do <strong>not</strong> receive a standard ATAR. Instead, their IB
                  results are converted into an <strong>ATAR-equivalent rank</strong> (often called
                  a <em>combined rank</em> or <em>notional ATAR</em>) for selection purposes.
                </p>
              </div>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Source
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How IB Scores Are Converted in Australia (IBAS–ATAR) */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Grade Conversion</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How IB Scores Are Converted in Australia (IBAS–ATAR)
            </p>

            {/* What is IBAS Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                What is IBAS?
              </h3>
              <p className="text-gray-600 mb-6">
                <strong>IBAS (IB Admissions Score)</strong> is a fine-grained score derived from the
                IB Diploma result to allow fair comparison with ATAR-based applicants.
              </p>

              <p className="text-gray-600 mb-6">
                For the <strong>2026 intake</strong>, the official conversion applies to IB
                examinations <strong>from November 2022 to May 2026</strong>.
              </p>

              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ibaustralasia.org/2026-ib-diploma-conversion-to-atar-equivalent-ibas-available/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://ibaustralasia.org/2026-ib-diploma-conversion-to-atar-equivalent-ibas-available/
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* IBAS–ATAR Conversion Table */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Example IBAS–ATAR Conversions (valid to May 2026)
              </h3>
              <p className="text-gray-600 mb-6">
                The following are <strong>examples only</strong>. Admissions centres use the full
                official conversion tables.
              </p>

              <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 overflow-hidden max-w-sm">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        IB Admissions Score (IBAS)
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                        Notional ATAR
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {ibasAtarConversionData.map((row) => (
                      <tr key={row.ibas} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-700">{row.ibas}</td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-semibold text-blue-700">
                            {row.atar}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Source
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://vtac.edu.au/guides/quickstart/ib-students"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://vtac.edu.au/guides/quickstart/ib-students
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Admission System in Australia */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Admission System</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              University Admission System in Australia
            </p>

            <div className="mt-8 rounded-2xl bg-amber-50 p-8 border border-amber-100">
              <p className="text-gray-700">
                Australia does <strong>not</strong> have a single national admissions authority.
              </p>
            </div>

            <p className="mt-6 text-gray-600">Admission is handled through:</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Universities directly</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>State admissions centres</strong> (e.g. UAC, VTAC)
                </span>
              </div>
            </div>

            <p className="mt-6 text-gray-600">
              Universities may also apply <strong>prerequisites</strong>,{' '}
              <strong>adjustment factors</strong>, or <strong>program-specific criteria</strong>.
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Source
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://ibaustralasia.org/university-entrance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://ibaustralasia.org/university-entrance/
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Entrance Exams and Restricted Programs */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Entrance Exams</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Entrance Exams and Restricted Programs
            </p>

            <div className="mt-8">
              <div className="rounded-2xl bg-green-50 p-8 border border-green-100">
                <p className="text-2xl font-bold text-green-800 mb-4">Usually no.</p>
                <p className="text-gray-700">
                  Most undergraduate programs in Australia do <strong>not</strong> require national
                  entrance exams. Some programs may require additional selection steps such as{' '}
                  <strong>interviews</strong>, <strong>portfolios</strong>,{' '}
                  <strong>auditions</strong>, or <strong>tests</strong>, depending on the course.
                </p>
              </div>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Source Example
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.curtin.edu.au/study/applying/ib-diploma/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.curtin.edu.au/study/applying/ib-diploma/
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Requirements for IB Students */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Language Requirements
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Language Requirements for IB Students
            </p>

            <div className="mt-8 rounded-2xl bg-amber-50 p-8 border border-amber-100">
              <p className="text-2xl font-bold text-amber-800 mb-4">
                Yes, English language requirements may apply.
              </p>
            </div>

            <p className="mt-6 text-gray-600">
              Universities decide individually whether IB English satisfies English requirements or
              whether another test is required.
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Source Example
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.sydney.edu.au/study/applying/how-to-apply/international-students/english-language-requirements.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.sydney.edu.au/study/applying/how-to-apply/international-students/english-language-requirements.html
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Public vs Private Universities */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">University Types</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Public vs Private Universities for IB Students
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Public Universities */}
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Public Universities</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Main destination for IB students</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Use IBAS–ATAR or IB-based assessment</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Program prerequisites and English rules apply</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm">
                  <strong>Source:</strong>{' '}
                  <a
                    href="https://ibaustralasia.org/university-entrance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://ibaustralasia.org/university-entrance/
                  </a>
                </p>
              </div>

              {/* Private Universities */}
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Private Universities</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Independent admission processes</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Requirements vary by institution</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Tuition fees usually apply</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Documentation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Required Documents for IB Students
            </p>

            <p className="mt-6 text-gray-600">Typical requirements include:</p>

            <div className="mt-8 rounded-2xl bg-gray-50 p-8 border border-gray-200">
              <ul className="space-y-4">
                {requiredDocuments.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-gray-700">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Source Example
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.curtin.edu.au/study/applying/ib-diploma/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.curtin.edu.au/study/applying/ib-diploma/
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Timeline */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Timeline</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Application Timeline for IB Students
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Timelines vary by university and state, but typically:
            </p>

            <div className="mt-8 space-y-4">
              {timelineSteps.map((step, index) => (
                <div
                  key={step.period}
                  className="flex items-center gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm"
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

            <div className="mt-6 rounded-2xl bg-amber-50 p-6 border border-amber-100">
              <p className="text-amber-800">
                ⚠️ Always check the admissions centre or university calendar.
              </p>
            </div>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Source
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 sm:py-24">
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
                  className="rounded-xl bg-gray-50 p-6 border border-gray-200"
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
                  how IB Match evaluates Australian admission
                </Link>{' '}
                requirements for your profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-4xl mb-4">🇦🇺</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in Australia?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover Australian university programs that match your IB profile. Search by IB
              points, subject requirements, and field of study.
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
                href="/programs/search?country=AU"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in Australia
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
