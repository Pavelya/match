'use client'

/**
 * Denmark IB Diploma Content Component
 *
 * Official sources used:
 * - studyindenmark.dk — official government portal for international students
 * - optagelse.dk — centralized Danish application portal (KOT system)
 * - ufsn.dk — Danish Agency for Higher Education and Science
 *
 * All information in this component is sourced from official Danish government
 * and educational institution portals listed above.
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

// Required documents for Danish university admission
const requiredDocuments = [
  'IB Diploma and transcript of results',
  'Proof of identity (passport or national ID)',
  'Proof of English proficiency (IELTS, TOEFL, or Cambridge — if not met through IB English courses)',
  'Signed signature page from optagelse.dk (printed, signed by hand, and sent to the institution)',
  'Proof of Danish language proficiency (only for Danish-taught programmes)',
  'Any programme-specific supplementary documents (e.g., portfolio, work samples)'
]

// Application timeline steps
const timelineSteps = [
  {
    period: 'February 1: Application Portal Opens',
    description:
      'The centralized application portal optagelse.dk opens for the coming academic year. Create your account and begin your application.'
  },
  {
    period: 'March 15, 12:00 noon CET: Application Deadline for IB Students',
    description:
      'All applicants with an IB Diploma — whether from a school in Denmark or abroad — must apply by March 15. This deadline also applies to Quota 2 applicants and programmes with admission tests.'
  },
  {
    period: 'July 5, 12:00 noon CET: Final Edits',
    description:
      'You can edit and change your priority order, delete applications, and upload additional documents on optagelse.dk until this date.'
  },
  {
    period: 'July 28: Admission Results',
    description:
      'You will receive an answer to your application. If not admitted, you can apply for vacant study places by contacting institutions directly.'
  }
]

// FAQ data
const faqs = [
  {
    question: 'Is the IB Diploma recognized for university admission in Denmark?',
    answer:
      "Yes. The IB Diploma satisfies the general entry requirements for Danish undergraduate programmes (Bachelor's, Professional Bachelor's, and Academy Profession degrees). A minimum of 24 IB points is required.",
    source: 'Study in Denmark — How to Apply',
    sourceUrl: 'https://studyindenmark.dk/study-options/how-to-apply'
  },
  {
    question: 'How are IB grades converted for Danish university admission?',
    answer:
      'IB grades are converted to the Danish 7-point grading scale. The conversion table is published annually by the Danish Ministry of Higher Education and Science around March 1. A GPA bonus multiplier of 1.08 is applied in Quota 1 if you apply within two years of completing your IB Diploma.',
    source: 'Study in Denmark — How to Apply',
    sourceUrl: 'https://studyindenmark.dk/study-options/how-to-apply'
  },
  {
    question: 'How do IB students apply to Danish universities?',
    answer:
      'All applications are submitted through the centralized portal optagelse.dk. IB applicants must apply by March 15, 12:00 noon CET. You can apply for up to 8 programmes and rank them by preference. The Coordinated Admission system (KOT) ensures you receive at most one offer.',
    source: 'Study in Denmark — How to Apply',
    sourceUrl: 'https://studyindenmark.dk/study-options/how-to-apply'
  },
  {
    question: 'Do I need to speak Danish to study in Denmark?',
    answer:
      "Not necessarily. Denmark offers over 500 English-taught programmes. For English-taught programmes, you need English proficiency comparable to Danish 'English B' (approximately IELTS 6.5). For Danish-taught programmes, you must pass 'Studieprøven' (Danish as a Foreign Language test). International students can take Danish lessons for free.",
    source: 'Study in Denmark — Language Requirements',
    sourceUrl: 'https://studyindenmark.dk/study-options/how-to-apply/language-requirements'
  },
  {
    question: 'Is higher education in Denmark free for IB students?',
    answer:
      'It depends on your nationality. Higher education is free for EU/EEA and Swiss citizens. All other students must pay tuition fees, which are set by individual institutions. Government scholarships are available for non-EU/EEA students.',
    source: 'Study in Denmark — Tuition Fees',
    sourceUrl: 'https://studyindenmark.dk/study-options/tuition-fees-and-scholarships'
  }
]

export function DenmarkContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇩🇰</span>
              Official University Admission Guide for IB Students (2026)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Denmark with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for admission to Danish
                universities
              </strong>
              , using only{' '}
              <strong>official Danish higher-education and institutional sources</strong>. Denmark
              uses a <strong>centralized application system</strong> via optagelse.dk for all
              university applications.
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

      {/* How Denmark Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Denmark Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                The <strong>International Baccalaureate (IB) Diploma</strong> satisfies the{' '}
                <strong>general entry requirements</strong> for Danish undergraduate programmes,
                including Bachelor&apos;s, Professional Bachelor&apos;s, and Academy Profession
                degrees. A minimum of <strong>24 IB points</strong> is required.
              </p>

              <p>
                Your IB qualification must be on a level with a Danish upper secondary school
                leaving certificate. You can verify whether your qualification is recognized using
                the official entry requirements checker at{' '}
                <a
                  href="https://ufsn.dk/recognition/entry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  ufsn.dk/recognition/entry
                </a>
                .
              </p>

              <p>
                In addition to the general entry requirements, individual programmes have{' '}
                <strong>specific entry requirements</strong> — these typically include particular
                subjects at certain levels (A-level/HL, B-level/SL, or C-level) and minimum grades.
                You must check each programme&apos;s specific requirements before applying.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://studyindenmark.dk/study-options/how-to-apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in Denmark — How to Apply
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ufsn.dk/recognition/entry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      UFSN — International Qualifications for Entry
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equivalence / Local Diploma */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Equivalence</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Do IB Students Need a Danish Diploma?
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <div className="rounded-2xl bg-green-50 p-8 border border-green-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      No — the IB Diploma is accepted as a standalone qualification
                    </h3>
                    <p className="mt-2 text-gray-600">
                      The IB Diploma is recognized as equivalent to a Danish upper secondary school
                      leaving certificate for admission purposes. You do not need to obtain a
                      separate Danish diploma or undergo a formal credential evaluation process.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>IB Certificate holders:</strong> If you received an IB Certificate
                    (Diploma Programme Course Results) rather than the full IB Diploma, you may
                    still be considered if you achieved at least 18 points, a minimum grade of 3 in
                    all six subjects, and have completed supplementary courses. Contact the
                    institution directly.
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
                      href="https://studyindenmark.dk/study-options/how-to-apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in Denmark — How to Apply
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission System */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Admission System</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Admission Works for IB Students
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <div className="rounded-2xl bg-blue-50 p-8 border border-blue-100">
                <p className="text-gray-700">
                  Denmark uses a <strong>centralized application system</strong>. All applications
                  to Danish higher education are submitted through{' '}
                  <a
                    href="https://www.optagelse.dk/higher-education.shtml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    optagelse.dk
                  </a>
                  . You can apply to up to <strong>8 programmes</strong> and rank them by
                  preference. The Coordinated Admission system (KOT) ensures you receive at most one
                  offer — at your highest possible priority.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Quota 1</strong> — Applicants are assessed primarily on their converted
                    grade point average (GPA). IB grades are converted to the Danish 7-point scale.
                    A <strong>1.08 multiplier bonus</strong> is applied if you apply within two
                    years of completing your IB Diploma.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Quota 2</strong> — Considers other qualifications in addition to grades,
                    such as work experience, motivation, and relevant activities. Assessed
                    individually by each institution.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    IB applicants who apply by <strong>March 15</strong> are{' '}
                    <strong>automatically considered in both Quota 1 and Quota 2</strong> if their
                    GPA can be converted to the Danish scale.
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://studyindenmark.dk/study-options/how-to-apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in Denmark — How to Apply
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.optagelse.dk/higher-education.shtml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Optagelse.dk — Apply for Higher Education
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Evaluation */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Grade Conversion</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              IB to Danish Grade Conversion
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                IB grades are converted to the{' '}
                <strong>Danish 7-point grading scale (7-trinsskalaen)</strong> for use in Quota 1
                admission. The official conversion table is published annually by the Danish
                Ministry of Higher Education and Science around <strong>March 1</strong>.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Each IB subject grade (1–7) is converted to the Danish scale on a per-subject
                    basis, and an overall GPA is calculated
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    A <strong>bonus multiplier of 1.08</strong> is applied to your GPA in Quota 1 if
                    you apply within <strong>two years</strong> of completing your IB Diploma
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    The conversion table may change slightly from year to year — always check the
                    latest version before applying
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-blue-50 p-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3">The Danish 7-Point Scale</h4>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">
                          Danish Grade
                        </th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">
                          ECTS Equivalent
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">12</td>
                        <td className="px-6 py-3 text-gray-700">Excellent</td>
                        <td className="px-6 py-3 text-gray-700">A</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">10</td>
                        <td className="px-6 py-3 text-gray-700">Very Good</td>
                        <td className="px-6 py-3 text-gray-700">B</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">7</td>
                        <td className="px-6 py-3 text-gray-700">Good</td>
                        <td className="px-6 py-3 text-gray-700">C</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">4</td>
                        <td className="px-6 py-3 text-gray-700">Fair</td>
                        <td className="px-6 py-3 text-gray-700">D</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">02</td>
                        <td className="px-6 py-3 text-gray-700">Adequate</td>
                        <td className="px-6 py-3 text-gray-700">E</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">00</td>
                        <td className="px-6 py-3 text-gray-700">Inadequate</td>
                        <td className="px-6 py-3 text-gray-700">Fx</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">-3</td>
                        <td className="px-6 py-3 text-gray-700">Unacceptable</td>
                        <td className="px-6 py-3 text-gray-700">F</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Source
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://studyindenmark.dk/study-options/how-to-apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in Denmark — How to Apply
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrance Exams */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Entrance Exams</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Are Entrance Exams Required?
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Most Danish university programmes <strong>do not require entrance exams</strong> for
                IB students. Admission is primarily based on your converted GPA (Quota 1) or a
                holistic assessment (Quota 2).
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Some programmes have admission tests</strong> — these are typically in
                    creative fields (arts, architecture, design) or specific professional programmes
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Programmes with admission tests have the same <strong>March 15 deadline</strong>
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    If you do not meet specific subject requirements, you may be able to take a{' '}
                    <strong>supplementary course</strong> (offered only in Danish) to become
                    eligible, though this will not increase your GPA score
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Source
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://studyindenmark.dk/study-options/how-to-apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in Denmark — How to Apply
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Requirements */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Language Requirements
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Language Requirements for IB Students
            </p>

            <p className="mt-6 text-gray-600">
              Denmark offers over <strong>500 English-taught programmes</strong>. Language
              requirements depend on the language of instruction.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">English</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>English B (minimum):</strong> IELTS 6.5, TOEFL 79–93 (iBT), or
                      Cambridge CAE
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>English A (some programmes):</strong> IELTS 7.0, TOEFL 94–101 (iBT),
                      or Cambridge CPE
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      IB English A or English B courses may satisfy English requirements — check
                      with the institution
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Languages className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Danish</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Required only for Danish-taught programmes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Must pass <strong>Studieprøven</strong> (Danish as a Foreign Language test) or{' '}
                      <strong>Danskprøve 2</strong>; some programmes require{' '}
                      <strong>Danskprøve 3</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      International students can take <strong>Danish lessons for free</strong> —
                      allowing you to start in an English-taught programme and continue in Danish
                      later
                    </span>
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
                    href="https://studyindenmark.dk/study-options/how-to-apply/language-requirements"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Denmark — Language Requirements
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* University Types */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">University Types</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Types of Higher Education in Denmark
            </p>

            <p className="mt-6 text-gray-600">
              Danish higher education is offered across five types of institutions. All are publicly
              funded, and the IB Diploma is accepted at each type.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Research Universities</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Offer <strong>Bachelor&apos;s</strong> (3 years),{' '}
                      <strong>Master&apos;s</strong> (2 years), and <strong>PhD</strong> programmes
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Research-based teaching and academic focus</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Examples: University of Copenhagen, Aarhus University, DTU, CBS</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    University Colleges &amp; Academies
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>University Colleges</strong> offer Professional Bachelor&apos;s
                      degrees (3½–4 years) with mandatory work placements
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Business Academies</strong> offer Academy Profession degrees (2–2½
                      years) with top-up options
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Artistic HEIs</strong> and <strong>Maritime schools</strong> also
                      accept IB qualifications
                    </span>
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
                    href="https://studyindenmark.dk/study-options/what-can-i-study"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Denmark — What Can I Study?
                  </a>
                </li>
              </ul>
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

            <p className="mt-6 text-gray-600">
              Documents are uploaded electronically through optagelse.dk. You must also print, sign,
              and send a signature page to each institution:
            </p>

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
                  If you are completing your IB Diploma in the year of application, your IB
                  coordinator must register you with IBNET&apos;s &ldquo;result service&rdquo; to
                  allow universities online access to your results. Check with your coordinator
                  before the deadline.
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
                    href="https://studyindenmark.dk/study-options/how-to-apply"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Denmark — How to Apply
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
              Application Timeline
            </p>

            <div className="mt-8 space-y-4">
              {timelineSteps.map((step, index) => (
                <div
                  key={step.period}
                  className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{step.period}</p>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Source
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://studyindenmark.dk/study-options/how-to-apply"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Denmark — How to Apply
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tuition Fees */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Tuition &amp; Fees</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tuition Fees for IB Students
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">EU/EEA/Swiss Citizens</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>No tuition fees</strong> at public institutions
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Also free for exchange programme students</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Students with permanent or certain temporary residence permits are also exempt
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Non-EU/EEA Citizens</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Tuition fees apply — amounts vary by institution and programme</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Residence permit application fee applies</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Government scholarships available for highly qualified non-EU/EEA students
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://studyindenmark.dk/study-options/tuition-fees-and-scholarships"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Denmark — Tuition Fees
                  </a>
                </li>
                <li>
                  <a
                    href="https://studyindenmark.dk/study-options/scholarships"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Denmark — Scholarships
                  </a>
                </li>
              </ul>
            </div>
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
                <div key={faq.question} className="rounded-xl bg-white p-6 border border-gray-200">
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
                  how IB Match evaluates Danish admission
                </Link>{' '}
                requirements for your profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-4xl mb-4">🇩🇰</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in Denmark?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover Danish university programmes that match your IB profile. Search by IB points,
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
                href="/programs/search?country=DK"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in Denmark
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
