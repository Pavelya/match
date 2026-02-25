'use client'

/**
 * Ireland IB Diploma Content Component
 *
 * Official sources used:
 * - cao.ie — Central Applications Office (centralized application system)
 * - cao.ie/downloads — Entry Requirements for EU/EFTA/UK Applicants (2026)
 * - educationinireland.com — official government portal for international students
 * - hea.ie — Higher Education Authority (tuition fees and student finance)
 *
 * All information in this component is sourced from official Irish government
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

// Required documents for Irish university admission
const requiredDocuments = [
  'IB Diploma and transcript of results',
  'Proof of identity (valid passport or national ID)',
  'Proof of English proficiency (if not met through IB English courses)',
  'Certified English translation of any documents not in English',
  'CAO application number on all supporting documents',
  'Any programme-specific supplementary documents (e.g., portfolio, HPAT registration)'
]

// Application timeline steps
const timelineSteps = [
  {
    period: 'November 5: CAO Application Portal Opens',
    description:
      'The online application portal at cao.ie opens for the coming academic year. Create your account and begin your application early.'
  },
  {
    period: 'February 1, 5:15 PM GMT: Normal Application Deadline',
    description:
      'The standard closing date for online applications. The application fee is €40. You can list up to 10 Level 8 (Honours Degree) and 10 Level 7/6 courses.'
  },
  {
    period: 'May 1: Late Application Deadline',
    description:
      'Late applications are accepted online until May 1 with a fee of €60. Paper late applications cost €80. Not all courses accept late applications.'
  },
  {
    period: 'July 1: Change of Mind Deadline',
    description:
      'You can change your course choices online free of charge until this date. This is particularly useful once you know your predicted or final IB results.'
  },
  {
    period: 'Mid-August: Round 1 Offers',
    description:
      'First round of CAO offers are issued. You must accept or decline your offer by the stated deadline. Subsequent rounds follow for available places.'
  }
]

// FAQ data
const faqs = [
  {
    question: 'Is the IB Diploma recognized for university admission in Ireland?',
    answer:
      'Yes. The IB Diploma is accepted as equivalent to the Irish Leaving Certificate for admission to Level 6, 7, and 8 courses (Higher Certificates, Ordinary Degrees, and Honours Degrees). IB scores are converted to CAO points using an official conversion table.',
    source: 'CAO — Entry Requirements for EU/EFTA/UK Applicants',
    sourceUrl: 'https://www2.cao.ie/downloads/documents/2026/Guidelines-EU-EFTA-UK-2026.pdf'
  },
  {
    question: 'How are IB scores converted to CAO points?',
    answer:
      'IB scores are converted to the Irish Points Scale (IPS) using an official conversion table published in the CAO Entry Requirements document. The conversion is based on statistical alignment of IB and Leaving Certificate results. Additionally, 25 bonus points are awarded for IB Higher Level Mathematics at grade 4 or above.',
    source: 'CAO — Entry Requirements for EU/EFTA/UK Applicants',
    sourceUrl: 'https://www2.cao.ie/downloads/documents/2026/Guidelines-EU-EFTA-UK-2026.pdf'
  },
  {
    question: 'How do IB students apply to Irish universities?',
    answer:
      'EU, EFTA, and UK applicants apply through the Central Applications Office (CAO) at cao.ie. The normal application deadline is February 1 at 5:15 PM GMT, with late applications accepted until May 1. You can list up to 10 Level 8 (Honours Degree) and 10 Level 7/6 courses. Non-EU/EEA applicants should generally apply directly to the institution.',
    source: 'CAO — Important Dates',
    sourceUrl: 'https://www.cao.ie/index.php?page=importantdates'
  },
  {
    question: 'Do IB students need to take entrance exams in Ireland?',
    answer:
      'Most Irish university programmes do not require entrance exams. However, undergraduate Medicine requires the HPAT-Ireland aptitude test in addition to meeting minimum academic requirements. Some creative arts programmes may require a portfolio or audition.',
    source: 'CAO — Entry to Medicine',
    sourceUrl: 'https://www.cao.ie/index.php?page=medentry'
  },
  {
    question: 'Is higher education in Ireland free for IB students?',
    answer:
      'It depends on your nationality. EU/EEA/Swiss/UK students who meet residency requirements are eligible for the Free Fees Initiative — they pay only the student contribution charge of €2,500 per year. Non-EU/EEA students pay full tuition fees, which typically range from €9,900 to €34,000 per year depending on the institution and programme.',
    source: 'HEA — Student Finance',
    sourceUrl: 'https://hea.ie/funding-governance-performance/funding/student-finance/'
  }
]

export function IrelandContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇮🇪</span>
              Official University Admission Guide for IB Students (2026)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Ireland with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for admission to Irish
                universities
              </strong>
              , using only{' '}
              <strong>official Irish higher-education and institutional sources</strong>. Ireland
              uses a <strong>centralized application system</strong> through the Central
              Applications Office (CAO) for undergraduate admissions.
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

      {/* How Ireland Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Ireland Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                The <strong>International Baccalaureate (IB) Diploma</strong> is accepted as{' '}
                <strong>equivalent to the Irish Leaving Certificate</strong> for admission to Irish
                higher education institutions. IB scores are converted to{' '}
                <strong>CAO points</strong> using an official conversion table published annually in
                the CAO Entry Requirements document.
              </p>

              <p>
                The IB Diploma qualifies holders for entry into{' '}
                <strong>Level 6 (Higher Certificate)</strong>,{' '}
                <strong>Level 7 (Ordinary Degree)</strong>, and{' '}
                <strong>Level 8 (Honours Degree)</strong> courses through the CAO. A minimum IB
                score of <strong>24 points</strong> is generally required, though individual
                programmes may require higher scores.
              </p>

              <p>
                Additionally, applicants who achieve a grade of{' '}
                <strong>4 or above in IB Higher Level Mathematics</strong> are awarded{' '}
                <strong>25 bonus points</strong>, provided Mathematics is included in the overall
                award used for points calculation.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www2.cao.ie/downloads/documents/2026/Guidelines-EU-EFTA-UK-2026.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      CAO — Entry Requirements for EU/EFTA/UK Applicants (2026)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.cao.ie/index.php?page=scoring&s=ib"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      CAO — IB Applicant Scoring
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
              Do IB Students Need an Irish Leaving Certificate?
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
                      The IB Diploma is recognized as equivalent to the Irish Leaving Certificate
                      for CAO application purposes. You do not need to obtain a separate Irish
                      qualification or undergo a formal credential evaluation process. Your IB
                      results are converted directly to CAO points.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Subject-specific requirements:</strong> Some programmes require specific
                    subjects at certain levels. For example, Engineering programmes typically
                    require Higher Level Mathematics, and Science programmes may require specific
                    science subjects. Always check the individual programme requirements on the CAO
                    or institution website.
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
                      href="https://www2.cao.ie/downloads/documents/2026/Guidelines-EU-EFTA-UK-2026.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      CAO — Entry Requirements for EU/EFTA/UK Applicants (2026)
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
                  Ireland uses a <strong>centralized application system</strong>. EU, EFTA, and UK
                  applicants submit their applications through the{' '}
                  <a
                    href="https://www.cao.ie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Central Applications Office (CAO)
                  </a>
                  . You can list up to <strong>10 Level 8</strong> (Honours Degree) courses and{' '}
                  <strong>10 Level 7/6</strong> (Ordinary Degree / Higher Certificate) courses in
                  order of preference. Offers are made based on your{' '}
                  <strong>CAO points score</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Points-based admission</strong> — Your IB score is converted to CAO
                    points using the official conversion table. Offers are made to applicants with
                    the highest points, working down from your first preference.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>25 bonus points for HL Maths</strong> — If you achieve a grade 4 or
                    above in IB Higher Level Mathematics, you receive 25 additional CAO points.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Non-EU/EEA applicants</strong> should generally apply directly to the
                    institution rather than through the CAO, unless specifically instructed
                    otherwise by the institution.
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
                      href="https://www2.cao.ie/downloads/documents/2026/Guidelines-EU-EFTA-UK-2026.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      CAO — Entry Requirements for EU/EFTA/UK Applicants (2026)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.cao.ie/index.php?page=scoring&s=ib"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      CAO — IB Applicant Scoring
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
              IB to CAO Points Conversion
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                IB scores are converted to <strong>CAO points (Irish Points Scale — IPS)</strong>{' '}
                using an official conversion table. The conversion is published annually in the CAO
                Entry Requirements document and is based on statistical alignment between IB and
                Leaving Certificate results.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    The conversion table translates your overall IB score (out of 45) to an
                    equivalent CAO points total
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>25 bonus points</strong> are added for IB Higher Level Mathematics at{' '}
                    <strong>grade 4 or above</strong>, provided Maths is included in the overall
                    award
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    These equivalences are indicative — the exact steps between points may not be
                    even, as they are based on statistical comparisons
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-blue-50 p-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Sample IB to CAO Points Conversion
                </h4>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">
                          IB Score
                        </th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">
                          CAO Points (approx.)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">45</td>
                        <td className="px-6 py-3 text-gray-700">625</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">42</td>
                        <td className="px-6 py-3 text-gray-700">566</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">38</td>
                        <td className="px-6 py-3 text-gray-700">506</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">34</td>
                        <td className="px-6 py-3 text-gray-700">465</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">30</td>
                        <td className="px-6 py-3 text-gray-700">415</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">24</td>
                        <td className="px-6 py-3 text-gray-700">360</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  Source: CAO Entry Requirements for EU/EFTA/UK Applicants (2026). These figures are
                  indicative — always consult the official document for the complete table.
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
                      href="https://www2.cao.ie/downloads/documents/2026/Guidelines-EU-EFTA-UK-2026.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      CAO — Entry Requirements for EU/EFTA/UK Applicants (2026)
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
                Most Irish university programmes <strong>do not require entrance exams</strong> for
                IB students. Admission is primarily based on your converted CAO points score.
                However, there are notable exceptions.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Medicine (undergraduate)</strong> requires the{' '}
                    <strong>HPAT-Ireland</strong> aptitude test in addition to meeting minimum
                    academic entry requirements. The HPAT score is combined with your CAO points to
                    determine eligibility.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Creative arts programmes</strong> (e.g., Art, Design, Music,
                    Architecture) may require a <strong>portfolio submission</strong> or{' '}
                    <strong>audition</strong> as part of the selection process
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Graduate Entry Medicine</strong> requires the <strong>GAMSAT</strong>{' '}
                    (Graduate Australian Medical School Admissions Test)
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
                      href="https://www.cao.ie/index.php?page=medentry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      CAO — Entry to Medicine
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
              The vast majority of university programmes in Ireland are taught in{' '}
              <strong>English</strong>. Some programmes at certain institutions are available in{' '}
              <strong>Irish (Gaeilge)</strong>.
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
                      IB students taking <strong>English A (HL or SL)</strong> at grade 4+ or{' '}
                      <strong>English B (HL)</strong> at grade 4+ typically satisfy English
                      requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Otherwise: <strong>IELTS 6.0–6.5</strong> (Academic),{' '}
                      <strong>TOEFL 80–90</strong> (iBT), or equivalent
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Individual institutions may set higher thresholds — always check programme
                      requirements
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Languages className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Irish (Gaeilge)</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Required only for Irish-medium programmes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      IB students are generally{' '}
                      <strong>exempt from the Irish language requirement</strong> that applies to
                      domestic applicants for NUI member universities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Some teacher training and Irish-language programmes may still require Irish
                      language proficiency
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
                    href="https://www2.cao.ie/downloads/documents/2026/Guidelines-EU-EFTA-UK-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    CAO — Entry Requirements for EU/EFTA/UK Applicants (2026)
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
              Types of Higher Education in Ireland
            </p>

            <p className="mt-6 text-gray-600">
              Irish higher education is provided by publicly funded institutions across several
              categories. The IB Diploma is accepted at all types.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Universities</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Offer <strong>Bachelor&apos;s</strong> (3–4 years),{' '}
                      <strong>Master&apos;s</strong>, and <strong>PhD</strong> programmes
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Research-intensive with strong international reputation</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Examples: Trinity College Dublin, University College Dublin, University of
                      Galway, University College Cork
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Technological Universities
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Formed from mergers of Institutes of Technology — offer degrees from{' '}
                      <strong>Level 6 to Level 10</strong> on the NFQ
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Strong focus on <strong>industry-relevant</strong> and{' '}
                      <strong>applied learning</strong> with work placements
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Examples: Technological University Dublin, Munster Technological University,
                      Atlantic Technological University
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
                    href="https://www.educationinireland.com/en/why-study-in-ireland/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Education in Ireland — Why Study in Ireland?
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
              Documents are submitted as part of your CAO application or directly to institutions
              for non-CAO applicants:
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
                  If you are completing your IB Diploma in the year of application, the CAO can
                  access your results directly if your IB coordinator has listed the &ldquo;Central
                  Applications Office&rdquo; as an institution with permission in the IB system.
                  Confirm this with your coordinator before the results deadline.
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
                    href="https://www2.cao.ie/downloads/documents/2026/Guidelines-EU-EFTA-UK-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    CAO — Entry Requirements for EU/EFTA/UK Applicants (2026)
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
                    href="https://www.cao.ie/index.php?page=importantdates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    CAO — Important Dates
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
                  how IB Match evaluates Irish admission
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
            <div className="text-4xl mb-4">🇮🇪</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in Ireland?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover Irish university programmes that match your IB profile. Search by IB points,
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
                href="/programs/search?country=IE"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in Ireland
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
