'use client'

/**
 * Hong Kong IB Diploma Content Component
 *
 * Official sources used:
 * - studyinhongkong.edu.hk — official government portal for international students
 * - admissions.hku.hk — University of Hong Kong admissions
 * - join.hkust.edu.hk — HKUST admissions
 * - ugc.edu.hk — University Grants Committee
 *
 * Hong Kong is officially the Hong Kong Special Administrative Region (HKSAR)
 * of the People's Republic of China.
 *
 * All information in this component is sourced from official Hong Kong government
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

// Required documents for Hong Kong university admission
const requiredDocuments = [
  'IB Diploma and transcript of results (or predicted grades if applying before results are released)',
  'Proof of identity (passport)',
  'Proof of English proficiency (IELTS, TOEFL, or IB English course grades)',
  'Personal statement or statement of purpose',
  'Academic reference letter(s) from teachers or IB coordinator',
  'Any programme-specific supplementary documents (e.g., portfolio, audition for creative programmes)'
]

// Application timeline steps (2027 entry, from HKU and HKUST)
const timelineSteps = [
  {
    period: '23 September – 2 October 2026: Applications Open',
    description:
      'HKU opened non-JUPAS applications for 2027 entry on 23 September 2026, and HKUST opens on 2 October 2026. Create accounts on the online systems of the universities you wish to apply to.'
  },
  {
    period: '25 November 2026: First-Round Deadlines',
    description:
      "HKU's first-round deadline (noon, Hong Kong time) and HKUST's priority round both fall on 25 November. Later applications are reviewed on a rolling basis. HKU asks counsellors to enter predicted grades by 1 December 2026."
  },
  {
    period: 'November 2026 – January 2027: Interviews',
    description:
      'HKU invites shortlisted applicants to interviews between November and January. Some programmes conduct online interviews for overseas candidates.'
  },
  {
    period: 'From December 2026: Offers',
    description:
      'HKU releases first-round results from December and HKUST announces offers from late December. HKU gives three to four weeks to accept and asks for a non-refundable deposit. Conditional offers are confirmed when final IB results arrive in July 2027. Apply for a student visa as soon as you hold an offer.'
  },
  {
    period: '30 June and 25 August 2027: Applications Close',
    description:
      'HKUST closes on 30 June 2027 and HKU at noon on 25 August 2027. Other universities set their own dates.'
  }
]

// FAQ data
const faqs = [
  {
    question: 'Is the IB Diploma recognized for university admission in Hong Kong?',
    answer:
      'Yes. The IB Diploma is widely recognized by all eight UGC-funded universities and most self-financing institutions in Hong Kong SAR. IB students apply through the Non-JUPAS (direct admission) route. Each university sets its own IB requirements, which vary by institution and programme.',
    source: 'Study in Hong Kong — Admission Requirement',
    sourceUrl: 'https://www.studyinhongkong.edu.hk/en/apply-to-study/admission-requirement.php'
  },
  {
    question: 'How do IB students apply to Hong Kong universities?',
    answer:
      "IB students apply through the Non-JUPAS route, which means submitting applications directly to each university's online application system. JUPAS is reserved for local students with the Hong Kong Diploma of Secondary Education (HKDSE). There is no centralized platform — you must apply separately to each institution you are interested in.",
    source: 'Study in Hong Kong — How to Apply',
    sourceUrl: 'https://www.studyinhongkong.edu.hk/en/apply-to-study/how-to-apply.php'
  },
  {
    question: 'What IB score do I need for Hong Kong universities?',
    answer:
      "There is no single score requirement — it varies by university and programme. For 2027 entry, HKU's expected lower boundaries range from 34 to 43 points (Medicine 43, Dental Surgery 41). CUHK's general minimum is 30 points, and PolyU says its successful applicants typically scored 32 or more in recent years. Programme-specific subject requirements at Higher Level may also apply.",
    source: 'HKU Admissions — International Qualifications',
    sourceUrl: 'https://admissions.hku.hk/apply/international-qualifications'
  },
  {
    question: 'Do I need to speak Chinese to study in Hong Kong?',
    answer:
      "Not for most programmes. English is the primary medium of instruction at Hong Kong's UGC-funded universities, and many programmes are taught entirely in English. Some programmes — particularly in Chinese studies, education, or social work — may require Chinese language proficiency. Each university sets its own English requirement for IB students: HKU asks for grade 5 in English A or grade 6 in English B (HL or SL), and CUHK for grade 4 or above in an IB English subject.",
    source: 'HKU Admissions — International Qualifications',
    sourceUrl: 'https://admissions.hku.hk/apply/international-qualifications'
  },
  {
    question: 'Are there tuition fees for international IB students in Hong Kong?',
    answer:
      'Yes. Non-local students at UGC-funded universities pay higher tuition fees than local students. Tuition fees for non-local undergraduate students are set by individual institutions. Many universities offer entrance scholarships for outstanding IB students, with some covering full tuition fees for students achieving IB scores of 40 or above.',
    source: 'Study in Hong Kong — Tuition Fee and Living Expenses',
    sourceUrl:
      'https://www.studyinhongkong.edu.hk/en/hong-kong-education/tuition-fee-and-living-expenses.php'
  }
]

export function HongKongContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇭🇰</span>
              Official University Admission Guide for IB Students (2027)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Hong Kong with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for admission to
                universities in Hong Kong SAR
              </strong>
              , using only <strong>official Hong Kong government and institutional sources</strong>.
              Hong Kong uses a <strong>decentralized application system</strong> — IB students apply
              directly to each university through the Non-JUPAS route.
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

      {/* How Hong Kong Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Hong Kong Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Hong Kong, officially the{' '}
                <strong>
                  Hong Kong Special Administrative Region (HKSAR) of the People&apos;s Republic of
                  China
                </strong>
                , is a major international education hub. The{' '}
                <strong>International Baccalaureate (IB) Diploma</strong> is widely recognized by
                Hong Kong&apos;s universities as a qualification for undergraduate admission.
              </p>

              <p>
                IB Diploma holders apply through the{' '}
                <strong>Non-JUPAS (Non-Joint University Programmes Admissions System)</strong>{' '}
                route. This is the standard pathway for all students who are not sitting the local
                Hong Kong Diploma of Secondary Education (HKDSE) examination. Each university
                individually assesses IB qualifications and sets its own admission requirements.
              </p>

              <p>
                All <strong>eight UGC-funded (University Grants Committee)</strong> universities
                accept the IB Diploma, as do most self-financing degree-awarding institutions. There
                is no separate credential evaluation or equivalence process required — universities
                assess IB results directly.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.studyinhongkong.edu.hk/en/apply-to-study/admission-requirement.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in Hong Kong — Admission Requirement
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://admissions.hku.hk/apply/international-qualifications"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      HKU Admissions — International Qualifications
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
              Do IB Students Need the HKDSE?
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
                      The IB Diploma is accepted directly for Non-JUPAS admission. You do not need
                      to sit the Hong Kong Diploma of Secondary Education (HKDSE) or undergo any
                      formal credential evaluation. Universities assess your IB results directly
                      based on total score, subject grades, and Higher Level performance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>IB Certificate holders:</strong> If you received IB Diploma Programme
                    Course Results rather than the full IB Diploma, your eligibility may be limited.
                    Some universities may still consider your application on a case-by-case basis —
                    contact the institution directly.
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
                      href="https://admissions.hku.hk/apply/international-qualifications"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      HKU Admissions — International Qualifications
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
                  Hong Kong uses a <strong>decentralized application system</strong> for IB
                  students. Unlike the centralized JUPAS system (which is for HKDSE holders only),
                  IB students apply through the <strong>Non-JUPAS (direct admission) route</strong>,
                  submitting separate applications to each university they wish to attend.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Direct application</strong> — Apply through each university&apos;s
                    online portal. There is no limit on the number of universities you can apply to.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Holistic assessment</strong> — Admissions decisions are based on
                    academic performance as well as other factors including interview performance,
                    personal statements, references, and other supporting documents.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Predicted grades accepted</strong> — Most universities accept predicted
                    IB grades for initial assessment, with conditional offers confirmed upon release
                    of final results.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Satisfying minimum requirements <strong>does not guarantee admission</strong> —
                    the process is competitive and merit-based.
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
                      href="https://www.studyinhongkong.edu.hk/en/apply-to-study/how-to-apply.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in Hong Kong — How to Apply
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://join.hkust.edu.hk/admissions/international-qualifications"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      HKUST Admissions — International Qualifications
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
            <h2 className="text-base font-semibold leading-7 text-blue-600">Grade Evaluation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How IB Scores Are Assessed
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Hong Kong universities assess IB results{' '}
                <strong>directly using the IB 45-point scale</strong>. There is no official
                conversion to the local HKDSE grading system. Universities evaluate your total IB
                score, individual subject grades (especially at Higher Level), and any
                programme-specific subject requirements.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Universities set their own minimum IB score thresholds — these are{' '}
                    <strong>not standardized</strong> across institutions
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Higher Level (HL) subject grades</strong> are particularly important —
                    many programmes specify minimum HL grades in relevant subjects
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Some universities offer <strong>advanced standing or credit transfer</strong>{' '}
                    for strong IB HL performance, potentially reducing the 4-year degree to 3 years
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-blue-50 p-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Indicative IB Score Ranges by University
                </h4>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">
                          University
                        </th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">
                          Published Figure
                        </th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">
                          Competitive Programmes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">HKU</td>
                        <td className="px-6 py-3 text-gray-700">34–43 (by programme)</td>
                        <td className="px-6 py-3 text-gray-700">
                          43 (Medicine), 41 (Dental Surgery)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">CUHK</td>
                        <td className="px-6 py-3 text-gray-700">30 (general minimum)</td>
                        <td className="px-6 py-3 text-gray-700">Varies by programme</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">HKUST</td>
                        <td className="px-6 py-3 text-gray-700">28+</td>
                        <td className="px-6 py-3 text-gray-700">Higher for competitive fields</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">CityU</td>
                        <td className="px-6 py-3 text-gray-700">30+ (Advanced Standing I)</td>
                        <td className="px-6 py-3 text-gray-700">Varies by programme</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">PolyU</td>
                        <td className="px-6 py-3 text-gray-700">32+ (typical admits)</td>
                        <td className="px-6 py-3 text-gray-700">
                          Interview possible from 30 predicted
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  HKU&apos;s figures are its expected lower boundaries for 2027 entry, CUHK&apos;s
                  is its general minimum, and PolyU&apos;s describes recent admits; all three were
                  checked on the universities&apos; sites on 25 September 2026. The HKUST and CityU
                  figures date from February 2026 and could not be confirmed on their current pages.
                  Actual requirements vary by year and programme.
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
                      href="https://admissions.hku.hk/apply/international-qualifications"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      HKU Admissions — International Qualifications
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://join.hkust.edu.hk/admissions/international-qualifications"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      HKUST Admissions — International Qualifications
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://admission.cuhk.edu.hk/application/overseas-other-qualifications-non-local-international-team/requirements/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      CUHK Admissions — Requirements
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.polyu.edu.hk/study/ug/admissions/international-other-qualifications/international-other-qualifications-general"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      PolyU Admissions — International / Other Qualifications
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
                Most Hong Kong university programmes <strong>do not require entrance exams</strong>{' '}
                for IB students. Admission is primarily based on your IB scores, personal statement,
                references, and in some cases an interview.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Interviews are common</strong> for competitive programmes such as
                    Medicine, Dentistry, and Law — these may be conducted online for overseas
                    applicants
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Creative and performing arts programmes</strong> (e.g., at the Hong Kong
                    Academy for Performing Arts) may require auditions or portfolio submissions
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    No standardized university entrance exam equivalent to the HKDSE is required of
                    IB students
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
                      href="https://admissions.hku.hk/apply/international-qualifications"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      HKU Admissions — International Qualifications
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
              Hong Kong&apos;s universities use <strong>English as the primary medium</strong> of
              instruction. Most programmes are taught entirely in English, making the city highly
              accessible for IB students from around the world.
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
                      <strong>HKU:</strong> grade 5 in English A, or grade 6 in English B (HL or SL)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>CUHK:</strong> grade 4 or above in an IB English subject
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Other universities set their own grades; IELTS or TOEFL scores are also
                      accepted, with minimums that vary by institution
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Languages className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Chinese (Cantonese)</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Not required for most English-taught programmes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Some programmes in Chinese studies, education, social work, or journalism may
                      require Chinese proficiency
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      CUHK&apos;s general requirement includes grade 4 in an IB Chinese subject, but
                      IB Diploma holders may be exempted at the Faculty Dean&apos;s discretion
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
                    href="https://admissions.hku.hk/apply/international-qualifications"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    HKU Admissions — International Qualifications
                  </a>
                </li>
                <li>
                  <a
                    href="https://admission.cuhk.edu.hk/application/overseas-other-qualifications-non-local-international-team/requirements/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    CUHK Admissions — Requirements
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
              Types of Higher Education in Hong Kong
            </p>

            <p className="mt-6 text-gray-600">
              Hong Kong&apos;s higher education system includes publicly funded institutions
              overseen by the University Grants Committee (UGC) and self-financing institutions. The
              IB Diploma is accepted at both types.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">UGC-Funded Universities</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>8 publicly funded universities</strong> including HKU, CUHK, HKUST,
                      PolyU, CityU, HKBU, Lingnan, and EdUHK
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Offer <strong>4-year undergraduate degrees</strong> (Bachelor&apos;s) with
                      potential for advanced standing for strong IB performance
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Research-intensive with strong international reputations and English-medium
                      instruction
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
                    Self-Financing Institutions
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Include <strong>degree-awarding institutions</strong> such as Hong Kong
                      Metropolitan University and Hong Kong Shue Yan University
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Offer Bachelor&apos;s degrees and sub-degree programmes with professional
                      focus
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      IB Diploma requirements may be lower than UGC-funded universities — some
                      accept scores from 24 points
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
                    href="https://www.studyinhongkong.edu.hk/en/hong-kong-education/education-system.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in Hong Kong — Education System
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ugc.edu.hk/eng/ugc/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    University Grants Committee (UGC)
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
              Documents are submitted electronically through each university&apos;s online
              application portal. Requirements may vary slightly between institutions:
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
                  <strong>Non-local students:</strong> You will also need to apply for a student
                  visa. Allow at least 8–10 weeks for the visa application process after receiving
                  an offer. Check the Immigration Department of Hong Kong SAR for requirements.
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
                    href="https://admissions.hku.hk/apply/international-qualifications"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    HKU Admissions — International Qualifications
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

            <p className="mt-6 text-gray-600">
              Application timelines vary by university. Below is a general guide for Non-JUPAS
              applicants — always check individual university websites for exact dates:
            </p>

            <div className="mt-10 space-y-8">
              {timelineSteps.map((step, index) => (
                <div key={step.period} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    {index < timelineSteps.length - 1 && (
                      <div className="mt-2 h-full w-0.5 bg-blue-200" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-semibold text-gray-900">{step.period}</h3>
                    <p className="mt-1 text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://admissions.hku.hk/apply/international-qualifications"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    HKU Admissions — Important Dates
                  </a>
                </li>
                <li>
                  <a
                    href="https://join.hkust.edu.hk/admissions/international-qualifications"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    HKUST Admissions — Important Dates
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
              Frequently Asked Questions
            </p>

            <div className="mt-10 space-y-8">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl bg-gray-50 p-6 border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-3 text-gray-600 faq-answer">{faq.answer}</p>
                  <p className="mt-3 text-sm text-gray-500">
                    Source:{' '}
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

            {/* Internal link block */}
            <div className="mt-8 rounded-xl bg-blue-50 p-6 border border-blue-100">
              <p className="text-gray-700">
                Learn{' '}
                <Link href="/how-it-works" className="text-blue-600 font-medium hover:underline">
                  how IB Match evaluates Hong Kong admission
                </Link>{' '}
                requirements for your profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-5xl mb-6 block">🇭🇰</span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Explore Universities in Hong Kong?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Discover which Hong Kong university programmes match your IB Diploma profile.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-all duration-200 hover:-translate-y-0.5"
              >
                Get Started — It&apos;s Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/programs/search?countries=cmj19u8pc00007mk4doh03so8"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="h-4 w-4" />
                Explore Programs in Hong Kong
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              100% free for students. No credit card required.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
