'use client'

/**
 * Austria Content Component
 *
 * Client component containing all content sections for the Austria IB landing page.
 * Content is based on official Austrian government and educational sources.
 *
 * Official sources used:
 * - studyinaustria.at (OeAD portal for international students)
 * - studieren.univie.ac.at (University of Vienna admissions)
 * - oead.at (Austrian Agency for Education and Internationalisation)
 */

import Link from 'next/link'
import {
  CheckCircle2,
  FileText,
  Building2,
  ArrowRight,
  Search,
  ExternalLink,
  Languages,
  GraduationCap,
  AlertTriangle
} from 'lucide-react'

// Required documents for Austrian university admission
const requiredDocuments = [
  'Official IB Diploma certificate (colour scan of the original)',
  'IB transcript showing all subjects, levels (HL/SL), and grades',
  'Proof of nationality (photocopy of passport)',
  'Proof of German language proficiency (or language of instruction)',
  'Legalised translations of all documents not in German or English',
  'Any programme-specific materials (e.g., portfolio for arts programmes)'
]

// FAQ data
const faqs = [
  {
    question: 'Is the IB Diploma recognized for university admission in Austria?',
    answer:
      'Yes. The IB Diploma is recognized as a general university entrance qualification (allgemeine Universitätsreife) by Austrian universities when specific criteria are met. No Nostrifizierung (formal degree recognition) is required for university admission.',
    source: 'Study in Austria — Application and admission',
    sourceUrl: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
  },
  {
    question: 'What is the minimum IB score for Austrian universities?',
    answer:
      'A minimum of 24 IB points from six subjects is required, with at least 12 points combined from the three Higher Level subjects and no individual subject grade below 3.',
    source: 'Austrian university admission policies',
    sourceUrl: 'https://studieren.univie.ac.at/en/admission/'
  },
  {
    question: 'Is German required for studying in Austria?',
    answer:
      'Yes. Most public university programmes in Austria are taught in German, and proof of German language proficiency is required. If German is taken as Language A in the IB Diploma, this may satisfy the requirement. Otherwise, a separate language certificate is needed.',
    source: 'Study in Austria — Application and admission',
    sourceUrl: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
  },
  {
    question: 'Do IB students need to pass entrance exams in Austria?',
    answer:
      'Some competitive programmes (e.g., Medicine, Dentistry, Psychology, Business, Computer Science) require entrance exams such as the MedAT. These apply to all applicants regardless of qualification type.',
    source: 'Study in Austria — Application and admission',
    sourceUrl: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
  },
  {
    question: 'When should IB students apply to Austrian universities?',
    answer:
      'The general application deadline for the winter semester is September 5, and for the summer semester February 5. International applicants should apply well in advance as processing foreign documents may take longer.',
    source: 'Study in Austria — Application and admission',
    sourceUrl: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
  }
]

export function AustriaContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇦🇹</span>
              Official University Admission Guide for IB Students (2027)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Austria with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for admission to Austrian
                universities
              </strong>
              , using only{' '}
              <strong>official Austrian higher-education and institutional sources</strong>. The IB
              Diploma is recognized as a <strong>general university entrance qualification</strong>{' '}
              by Austrian public universities.
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

      {/* How Austria Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Austria Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Austrian public universities recognize the{' '}
                <strong>International Baccalaureate (IB) Diploma</strong> as a{' '}
                <strong>
                  general university entrance qualification (allgemeine Universitätsreife)
                </strong>
                . This means the IB Diploma is treated as equivalent to the Austrian <em>Matura</em>{' '}
                for the purposes of university admission.
              </p>

              <p>
                Unlike some foreign qualifications, the IB Diploma does{' '}
                <strong>not require Nostrifizierung</strong> (formal recognition / nostrification)
                for university admission. The Nostrifizierung process applies to the recognition of
                completed academic degrees for professional purposes, not to secondary
                school-leaving certificates like the IB Diploma.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Source
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://studyinaustria.at/en/plan-your-studies/application-and-admission"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in Austria — Application and admission
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Do IB Students Need a Nostrifizierung? */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Nostrifizierung</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Do IB Students Need a Nostrifizierung?
            </p>

            <div className="mt-8">
              <div className="rounded-2xl bg-green-50 p-8 border border-green-100">
                <p className="text-2xl font-bold text-green-800 mb-4">No.</p>
                <p className="text-gray-700">
                  IB students do <strong>not</strong> need a <em>Nostrifizierung</em> (formal
                  recognition of foreign qualifications) to apply for university admission in
                  Austria. The IB Diploma is directly recognized as a{' '}
                  <strong>general university entrance qualification</strong> when the required
                  criteria are met.
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
                      href="https://studyinaustria.at/en/plan-your-studies/application-and-admission"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in Austria — Application and admission
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IB Diploma Requirements for Austrian Universities */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Admission Requirements
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              IB Diploma Requirements for Austrian Universities
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                To be admitted to an Austrian public university with an IB Diploma, the following
                criteria must be met:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Full IB Diploma</strong> — the complete Diploma is required; an IB
                    Certificate alone is not sufficient for admission
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Minimum 24 points</strong> overall from six subjects
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>At least 3 Higher Level (HL) subjects</strong> with a combined minimum
                    of 12 points and no single HL grade below 3
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>No individual subject grade below 3</strong> (in exceptional cases, a
                    grade 2 in an SL subject may be acceptable if compensated by higher SL grades)
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Core components</strong> completed: Extended Essay (EE), Theory of
                    Knowledge (TOK), and CAS
                  </span>
                </div>
              </div>

              <div className="mt-2 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://studyinaustria.at/en/plan-your-studies/application-and-admission"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in Austria — Application and admission
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://studieren.univie.ac.at/en/admission/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      University of Vienna — Admission procedure
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subject Group Requirements */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Subject Groups</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Required IB Subject Groups
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Austrian universities require the six IB subjects to cover specific academic areas.
                Your subject selection must include:
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-5 border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">Group 1</p>
                  <p className="text-sm text-gray-600">
                    Studies in Language and Literature (Language A)
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-5 border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">Group 2</p>
                  <p className="text-sm text-gray-600">
                    Language Acquisition (or a second Group 1 language)
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-5 border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">Group 3</p>
                  <p className="text-sm text-gray-600">
                    Individuals and Societies (e.g., History, Economics, Psychology)
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-5 border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">Group 4</p>
                  <p className="text-sm text-gray-600">
                    Sciences (e.g., Biology, Chemistry, Physics)
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-5 border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">Group 5</p>
                  <p className="text-sm text-gray-600">Mathematics (required)</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-5 border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">Group 6</p>
                  <p className="text-sm text-gray-600">
                    The Arts (or an additional subject from Groups 1–5)
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Subject-specific requirements:</strong> Competitive programmes such as
                    Medicine, Engineering, or Computer Science may require specific HL subjects
                    (e.g., Biology HL, Chemistry HL, Mathematics HL, Physics HL).
                  </span>
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Source
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://studyinaustria.at/en/plan-your-studies/application-and-admission"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in Austria — Application and admission
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Requirements for IB Students */}
      <section className="bg-gray-50 py-16 sm:py-24">
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
                German proficiency is required for most programmes.
              </p>
            </div>

            <p className="mt-6 text-gray-600">
              The majority of programmes at Austrian public universities are taught in{' '}
              <strong>German</strong>. A growing number of programmes are also offered in English.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">German</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Required for the vast majority of programmes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      If German is taken as <strong>Language A</strong> in the IB, this may suffice
                      as proof
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Otherwise, a language certificate (B2–C1 CEFR) or 4+ years of German study is
                      needed
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Languages className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">English</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Required for English-taught programmes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      If English is taken as <strong>Language A</strong> in the IB, this typically
                      fulfils the requirement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Otherwise, IELTS, TOEFL, or equivalent may be required</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Source
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://studyinaustria.at/en/plan-your-studies/application-and-admission"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Austria — Application and admission
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Entrance Exams and Restricted Programmes */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Entrance Exams</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Entrance Exams and Restricted Programmes
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Some Austrian university programmes have{' '}
                <strong>additional admission restrictions</strong> beyond the general IB Diploma
                requirements. These apply equally to all applicants regardless of qualification
                type:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Medicine and Dentistry</strong> — require the{' '}
                    <strong>MedAT entrance exam</strong>, a national standardised test
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Psychology, Business, Computer Science, Biology</strong> — may require
                    entrance exams or selection processes
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Architecture and Arts</strong> — may require portfolio submissions or
                    aptitude tests
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Application deadlines for programmes with entrance exams can be{' '}
                    <strong>up to 6 months before</strong> the start of the semester. Check the
                    specific university&apos;s website well in advance.
                  </span>
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Source
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://studyinaustria.at/en/plan-your-studies/application-and-admission"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in Austria — Application and admission
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public vs Private Institutions */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Institution Types</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Public vs Private Institutions for IB Students
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
                    <span>22 public universities (Universitäten)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>IB Diploma recognized as entrance qualification</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Low tuition fees (often ~€363/semester for EU/EEA students)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Some programmes have additional entrance exams</span>
                  </li>
                </ul>
              </div>

              {/* Universities of Applied Sciences & Private */}
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">FH & Private Universities</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Fachhochschulen (Universities of Applied Sciences) and private universities
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Often have their own entrance exams or selection procedures</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Application deadlines and requirements may differ significantly</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Always check the institution&apos;s official admissions info</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Source
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://studyinaustria.at/en/plan-your-studies/application-and-admission"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Austria — Application and admission
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents for IB Students */}
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

            <div className="mt-6 rounded-2xl bg-amber-50 p-6 border border-amber-100">
              <p className="text-amber-800 text-sm flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Foreign documents must be presented in the original and legalised. Documents not
                  in German or English require <strong>legalised translations</strong>. Translations
                  done abroad also require legalisation.
                </span>
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
                    href="https://studyinaustria.at/en/plan-your-studies/application-and-admission"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Austria — Application and admission
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Timeline and Process */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Timeline</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Application Timeline and Process
            </p>

            <div className="mt-8 rounded-2xl bg-blue-50 p-8 border border-blue-100">
              <p className="text-gray-700">
                Applications are made{' '}
                <strong>directly to each university&apos;s admissions office</strong>. There is no
                centralised application portal for all Austrian universities.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Winter Semester (October start)</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Application deadline: <strong>September 5</strong>. The winter semester runs
                    from October to the end of January.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Summer Semester (March start)</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Application deadline: <strong>February 5</strong>. The summer semester runs from
                    March to the end of June.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Apply early</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Submit your application as early as possible — reviewing foreign documents takes
                    longer and may delay processing
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Source
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://studyinaustria.at/en/plan-your-studies/application-and-admission"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Austria — Application and admission
                  </a>
                </li>
                <li>
                  <a
                    href="https://oead.at/en/to-austria/entry-and-residence"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    OeAD — Entry and residence
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
                  <p className="mt-2 text-gray-600 faq-answer">{faq.answer}</p>
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
                  how IB Match evaluates Austrian admission
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
            <div className="text-4xl mb-4">🇦🇹</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in Austria?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover Austrian university programmes that match your IB profile. Search by IB
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
                href="/programs/search?country=AT"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in Austria
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
