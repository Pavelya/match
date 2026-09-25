'use client'

/**
 * Sweden IB Diploma Content Component
 *
 * Official sources used:
 * - universityadmissions.se — IB studies, entry requirements, merit rating
 * - studyinsweden.se — general study guide for international students
 * - uhr.se — Swedish Council for Higher Education (credential evaluation)
 * - antagning.se — IB merit rating table and merit points (in Swedish)
 *
 * All information in this component is sourced from official Swedish government
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

// Required documents for Swedish university admission
const requiredDocuments = [
  'If your IB Diploma is awarded in the spring you apply: results made available to recipient code "UHR" through the IB Results Service',
  'If you already have your IB Diploma: scans or copies of the original diploma including results',
  'Proof of identity (passport or national ID)',
  'Proof of English proficiency (if not met through IB English courses)',
  'Pre-IB transcripts if applicable (e.g., to demonstrate Swedish language study)',
  'Any programme-specific supplementary documents (e.g., portfolio, work samples)'
]

// Merit rating conversion table, in use since the autumn 2025 admissions (antagning.se)
const meritTable = [
  { ib: '24', swedish: '13.18' },
  { ib: '25', swedish: '13.94' },
  { ib: '30', swedish: '16.70' },
  { ib: '35', swedish: '18.57' },
  { ib: '38', swedish: '19.38' },
  { ib: '40', swedish: '19.70' },
  { ib: '42', swedish: '19.90' },
  { ib: '43–45', swedish: '20.00' }
]

// FAQ data
const faqs = [
  {
    question: 'Is the IB Diploma recognized for university admission in Sweden?',
    answer:
      "Yes. The IB Diploma fulfils the general entry requirements for bachelor's studies in Sweden. Applications are submitted through the centralized portal universityadmissions.se. Both the regular and non-regular IB Diploma are accepted.",
    source: 'University Admissions in Sweden — IB Studies',
    sourceUrl:
      'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/'
  },
  {
    question: 'How are IB points converted for Swedish university admission?',
    answer:
      'Your IB total points are converted to a Swedish merit rating on a scale of 10.00–20.00, plus up to 2.5 merit points for modern languages, English and mathematics. In the table used since the autumn 2025 admissions, 24 IB points = 13.18, 35 points = 18.57, and 43–45 points = 20.00. The maximum achievable score including merit points is 22.50.',
    source: 'Antagning.se — Calculate your merit rating (in Swedish)',
    sourceUrl:
      'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
  },
  {
    question: 'What IB grades are needed for specific subject requirements?',
    answer:
      'A minimum grade of 4 is required for a course to meet a specific entry requirement. A grade 3 is accepted in Biology, Chemistry and Physics at Higher Level (HL). In mathematics, a grade 3 counts one Swedish level lower: AA HL and AI HL then meet Matematik 4, AA SL meets Matematik 3c, and AI SL meets Matematik 2a.',
    source: 'University Admissions in Sweden — IB Studies',
    sourceUrl:
      'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/'
  },
  {
    question: 'Do I need to speak Swedish to study in Sweden?',
    answer:
      "Not necessarily. Sweden offers a large number of English-taught programmes at both bachelor's and master's level. For Swedish-taught programmes, proof of Swedish language proficiency is required. English proficiency can be demonstrated through IB English courses (English A or English B HL/SL).",
    source: 'Study in Sweden — How to Apply',
    sourceUrl: 'https://studyinsweden.se/plan-your-studies/how-to-apply/'
  },
  {
    question: 'How do IB students submit their results to Swedish universities?',
    answer:
      'If you finish the IB in the spring you apply, apply in the second admissions round (University Admissions recommends this only for EU/EEA and Swiss citizens) and ask your IB coordinator to make your results available to recipient code "UHR" through the IB Results Service. For autumn 2027 the deadline is 5 July 2027. If you already have your IB Diploma, upload scans or copies of it to universityadmissions.se by the document deadline.',
    source: 'University Admissions in Sweden — Autumn semester dates',
    sourceUrl:
      'https://www.universityadmissions.se/en/key-dates-and-deadlines/autumn-semester-dates/'
  }
]

export function SwedenContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇸🇪</span>
              Official University Admission Guide for IB Students (2027)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Sweden with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for admission to Swedish
                universities
              </strong>
              , using only{' '}
              <strong>official Swedish higher-education and institutional sources</strong>. Sweden
              uses a <strong>centralized application system</strong> via universityadmissions.se for
              all university applications.
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

      {/* How Sweden Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Sweden Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                The <strong>International Baccalaureate (IB) Diploma</strong> fulfils the{' '}
                <strong>general entry requirements</strong> for bachelor&apos;s studies at Swedish
                universities. Both the regular and non-regular IB Diploma are accepted.
              </p>

              <p>
                Sweden uses a <strong>centralized application system</strong> — all applications to
                Swedish universities are submitted through{' '}
                <a
                  href="https://www.universityadmissions.se/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  universityadmissions.se
                </a>
                . This means you apply to multiple programmes through a single portal.
              </p>

              <p>
                Swedish university admissions are <strong>requirement-driven, not holistic</strong>.
                This means that missing a specific required subject will result in your application
                not being considered, regardless of your overall IB score. Meeting the specific
                entry requirements for each programme is therefore critical.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      University Admissions in Sweden — IB Studies
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://studyinsweden.se/plan-your-studies/how-to-apply/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in Sweden — How to Apply
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Merit Rating Conversion */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Merit Rating</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              IB to Swedish Merit Rating Conversion
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                IB points are converted to a{' '}
                <strong>Swedish merit rating on a scale of 10.00–20.00</strong>. Applicants can earn
                up to <strong>2.5 additional merit points</strong> for modern languages, English and
                mathematics, bringing the maximum possible score to <strong>22.50</strong>. The
                table below has been used since the autumn 2025 admissions.
              </p>

              <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">IB Points</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">
                        Swedish Merit Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {meritTable.map((row) => (
                      <tr key={row.ib}>
                        <td className="px-6 py-3 text-gray-700 font-medium">{row.ib}</td>
                        <td className="px-6 py-3 text-gray-700">{row.swedish}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 rounded-2xl bg-blue-50 p-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3">Bonus Merit Points (up to 2.5)</h4>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Modern Foreign Languages</strong> (max 1.5 pts) — Language A, Language
                      B HL or Language B SL (not Swedish or English) = 1.5 pts; Language Ab Initio =
                      0.5 pts
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>English</strong> (max 1.0 pt) — English A HL/SL = 1.0 pt; English B HL
                      = 1.0 pt; English B SL (if English is language of instruction) = 1.0 pt
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Mathematics</strong> (max 1.5 pts) — depends on your IB course and the
                      maths level the programme requires: AA HL always gives 1.5 pts, AI SL at most
                      1.0 pt. Courses you need to be eligible do not give merit points
                    </span>
                  </div>
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
                      href="https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      University Admissions in Sweden — IB Studies
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Antagning.se — Calculate your merit rating (in Swedish)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/meritpoang/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Antagning.se — Merit points for IB (in Swedish)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specific Subject Requirements */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Subject Requirements
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              IB Subject Requirements for Swedish Programmes
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Swedish universities set <strong>specific entry requirements</strong> for each
                programme. IB subjects are matched to equivalent Swedish upper secondary courses.
                Meeting these requirements is <strong>mandatory</strong> — your application will not
                be considered if you lack a required subject, even with a high overall IB score.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Minimum grade of 4</strong> in most subjects to meet specific entry
                    requirements
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Grade 3 accepted</strong> for Biology, Chemistry and Physics at{' '}
                    <strong>Higher Level (HL)</strong>
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Mathematics:</strong> AA HL meets Matematik specialisering, AI HL meets
                    Matematik 5, AA SL meets Matematik 4, and AI SL meets Matematik 3c, so AI meets
                    one level less than AA at the same level
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>A grade 3 in mathematics</strong> counts one level lower: AA HL or AI HL
                    meet Matematik 4, AA SL Matematik 3c, and AI SL Matematik 2a
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Important:</strong> Swedish admissions are requirement-driven, not
                    holistic. Missing a specific required subject means your application will{' '}
                    <strong>not be considered</strong>, regardless of your total IB points. Always
                    check the specific entry requirements for each programme before applying.
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
                      href="https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      University Admissions in Sweden — IB Studies
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
              Sweden offers a large number of programmes taught in <strong>English</strong>. For
              Swedish-taught programmes, proof of Swedish language proficiency is required.
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
                      <strong>English 6 (Level 2):</strong> English B SL with a language of
                      instruction other than English
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>English 7 (Level 3):</strong> English A1/A2 HL or SL; English B HL; or
                      English B SL with English as language of instruction
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>IELTS, TOEFL, or equivalent also accepted</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Languages className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Swedish</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Required only for Swedish-taught programmes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Svenska 3 (Level 3):</strong> Swedish A, A1, or A2 SL/HL; or
                      Norwegian/Danish A or A1 SL/HL
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Many bachelor&apos;s and most master&apos;s programmes are available entirely
                      in English
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
                    href="https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    University Admissions in Sweden — IB Studies
                  </a>
                </li>
                <li>
                  <a
                    href="https://studyinsweden.se/plan-your-studies/how-to-apply/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Sweden — How to Apply
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Application Process</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How to Apply with the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <div className="rounded-2xl bg-blue-50 p-8 border border-blue-100">
                <p className="text-gray-700">
                  All applications are submitted through Sweden&apos;s centralized portal:{' '}
                  <a
                    href="https://www.universityadmissions.se/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    universityadmissions.se
                  </a>
                  . You can apply to up to <strong>8 courses and programmes</strong> per admissions
                  round and rank them in order of preference.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Create an account</strong> on universityadmissions.se and select up to 8
                    courses and programmes ranked by preference
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Submit documents</strong> — if you graduate in the spring you apply,
                    your results go to &ldquo;UHR&rdquo; through the IB Results Service; if you
                    already have your diploma, upload scans directly
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Selection</strong> — applicants are ranked based on their merit rating
                    and any applicable bonus points
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Still in your final IB year?</strong> University Admissions advises you
                    not to apply to the first admissions round, because its selection is in April,
                    before you have final grades. EU/EEA and Swiss citizens can apply to the second
                    round instead. Non-EU/EEA citizens are advised not to, as there is not enough
                    time to get a residence permit; they can apply to the first round the following
                    year, or for a spring-semester start.
                  </span>
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
                      href="https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      University Admissions in Sweden — International Baccalaureate studies
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.universityadmissions.se/en/key-dates-and-deadlines/admission-rounds-and-spring-semester-availability/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      University Admissions in Sweden — Admissions rounds
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.universityadmissions.se/en/apply-to-bachelors/rank-your-selections-bachelors/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      University Admissions in Sweden — Rank your selections
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Högskoleprovet */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Högskoleprovet</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Swedish Scholastic Aptitude Test (Högskoleprovet)
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                The <strong>Högskoleprovet</strong> (Swedish Scholastic Aptitude Test) is an
                optional standardized test that can be used to supplement your IB merit rating:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Taken in <strong>Swedish only</strong> — most useful for students already
                    proficient in Swedish
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Swedish universities allocate places across different selection groups — your
                    Högskoleprovet score and IB merit rating are considered in{' '}
                    <strong>separate groups</strong>
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Can potentially <strong>boost your chances</strong> if your IB merit rating does
                    not reach the cutoff for a competitive programme
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
                      href="https://www.uhr.se/en/start/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Swedish Council for Higher Education (UHR)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tuition Fees */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Tuition & Fees</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tuition Fees for IB Students
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">EU/EEA Citizens</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>No tuition fees</strong> at public universities
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Includes citizens of Switzerland</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Small student union fees may apply (~SEK 50–350/semester)</span>
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
                    <span>Tuition fees apply (about SEK 80,000–320,000 a year)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Application fee of SEK 900 required via universityadmissions.se</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Swedish Institute and university scholarships are aimed mainly at
                      master&apos;s applicants
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
                    href="https://studyinsweden.se/plan-your-studies/how-to-apply/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Sweden — How to Apply
                  </a>
                </li>
                <li>
                  <a
                    href="https://studyinsweden.se/plan-your-studies/fees-costs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Sweden — Fees and costs
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.universityadmissions.se/en/key-dates-and-deadlines/admission-rounds-and-spring-semester-availability/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    University Admissions in Sweden — Admissions rounds
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
              Documents are submitted electronically through universityadmissions.se:
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
                  If your IB Diploma is awarded in the spring you apply, your IB coordinator must
                  make your results available to recipient code <strong>&ldquo;UHR&rdquo;</strong>{' '}
                  through the IB Results Service; for autumn 2027 the deadline is 5 July 2027. If
                  you already have your diploma, do <strong>not</strong> use the Results Service:
                  upload scans instead.
                </span>
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
                    href="https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    University Admissions in Sweden — IB Studies
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    University Admissions in Sweden — International Baccalaureate studies
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
              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    16 October 2026 – 15 January 2027: First Admissions Round
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    The round for international students, with all English-taught programmes. Fees
                    and documents are due by 1 February 2027, and bachelor&apos;s results are
                    published on 8 April 2027. It is for applicants who already have their IB
                    Diploma: if you are in your final year, University Admissions advises you not to
                    apply in this round.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    15 March – 15 April 2027: Second Admissions Round
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    The regular Swedish round, with fewer English-taught programmes. EU/EEA and
                    Swiss citizens finishing the IB in 2027 apply here; the application fee is due
                    by 23 April. Non-EU/EEA citizens are advised not to apply, as there is not
                    enough time to get a residence permit.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    5 July 2027: IB Results via Results Service
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Your IB coordinator makes your results available to recipient code
                    &ldquo;UHR&rdquo; through the IB Results Service.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-semibold text-gray-900">9 July 2027: Admission Results</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Second-round results are published on 9 July, and you reply by 16 July. Second
                    admissions results follow on 22 July, and the semester starts in August or
                    September.
                  </p>
                </div>
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
                    href="https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    University Admissions in Sweden — IB Studies
                  </a>
                </li>
                <li>
                  <a
                    href="https://studyinsweden.se/plan-your-studies/how-to-apply/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Sweden — How to Apply
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.universityadmissions.se/en/key-dates-and-deadlines/autumn-semester-dates/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    University Admissions in Sweden — Autumn semester dates
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.universityadmissions.se/en/key-dates-and-deadlines/admission-rounds-and-spring-semester-availability/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    University Admissions in Sweden — Admissions rounds
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
                  how IB Match evaluates Swedish admission
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
            <div className="text-4xl mb-4">🇸🇪</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in Sweden?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover Swedish university programmes that match your IB profile. Search by IB
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
                href="/programs/search?countries=cml3sz2dm000ijy04azp7yxj5"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in Sweden
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
