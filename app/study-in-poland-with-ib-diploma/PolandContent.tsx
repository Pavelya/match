'use client'

/**
 * Poland IB Diploma Content Component
 *
 * Official sources used:
 * - nawa.gov.pl — National Agency for Academic Exchange (ENIC-NARIC centre)
 * - study.gov.pl — official government portal for international students
 *
 * All information in this component is sourced from official Polish government
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

// Required documents for Polish university admission
const requiredDocuments = [
  'IB Diploma and transcript of results',
  'Proof of identity (passport or national ID)',
  'Certified translation of the IB Diploma into Polish (if required by the institution)',
  'Certificate of language proficiency (Polish B2 for Polish-taught, or English B2 for English-taught programmes)',
  'Medical certificate confirming fitness to study (required by some programmes)',
  "Application form (submitted via the university's online recruitment portal)"
]

// Application timeline steps
const timelineSteps = [
  {
    period: 'January – March: Research and Preparation',
    description:
      "Identify your preferred universities and programmes. Check each university's recruitment website for specific IB conversion rules, deadlines, and documentation requirements."
  },
  {
    period: 'April – June: Application Period',
    description:
      'Most Polish universities open their online recruitment portals between April and June. Submit your application, upload documents, and pay any registration fees. Deadlines vary by institution — some close as early as May, others in July.'
  },
  {
    period: 'July – August: Admission Results',
    description:
      'Universities announce admission decisions. Admitted students receive a conditional or final acceptance letter. If you have not yet received your IB Diploma, you may submit a letter of predicted results and provide the final diploma later.'
  },
  {
    period: 'September – October: Enrolment',
    description:
      'Complete enrolment formalities including document submission, student ID issuance, and orientation. Non-EU/EEA students should account for visa processing time (apply at least 2–3 months before the start of the academic year).'
  }
]

// FAQ data
const faqs = [
  {
    question: 'Is the IB Diploma recognized for university admission in Poland?',
    answer:
      'Yes. The IB Diploma issued by the International Baccalaureate Organisation in Geneva is recognized by operation of law in Poland. It is treated as equivalent to the Polish Matura, and holders can apply directly to Polish universities without nostrification or any additional recognition procedure.',
    source: 'NAWA — Recognition for Academic Purposes',
    sourceUrl: 'https://nawa.gov.pl/en/recognition/recognition-for-academic-purposes'
  },
  {
    question: 'How are IB grades converted for Polish university admission?',
    answer:
      'There is no single national conversion formula. Each Polish university sets its own rules for converting IB grades (1–7 scale) to percentages or points equivalent to the Polish Matura. Higher Level (HL) subjects are typically treated as extended-level Matura and given higher weighting, while Standard Level (SL) subjects correspond to basic-level Matura. Always check the specific faculty admission requirements.',
    source: 'study.gov.pl — How to Apply',
    sourceUrl: 'https://study.gov.pl/how-to-apply'
  },
  {
    question: 'How do IB students apply to Polish universities?',
    answer:
      "Poland uses a decentralized admission system. You apply directly to each university through its own online recruitment portal. There is no central national application platform. Each institution sets its own deadlines, required documents, and admission criteria. Start by selecting a programme on the university's website and follow its recruitment instructions.",
    source: 'study.gov.pl — How to Apply',
    sourceUrl: 'https://study.gov.pl/how-to-apply'
  },
  {
    question: 'Do I need to speak Polish to study in Poland?',
    answer:
      "Not necessarily. Polish universities offer over 900 programmes taught in English. For English-taught programmes, you typically need to demonstrate at least B2 English proficiency (e.g., IELTS 5.5–6.5, depending on the university). For Polish-taught programmes, you must prove Polish language proficiency at minimum B2 level, usually through a certificate or the university's own language exam.",
    source: 'study.gov.pl — How to Apply',
    sourceUrl: 'https://study.gov.pl/how-to-apply'
  },
  {
    question: 'Is higher education in Poland free for IB students?',
    answer:
      'Full-time studies in Polish at public universities are free for Polish citizens, EU/EEA citizens, and holders of the Karta Polaka (Polish Charter). All other international students pay tuition fees, which average EUR 2,000–3,000 per year for undergraduate programmes. Scholarships are available through NAWA and individual universities.',
    source: 'study.gov.pl — Tuition Fees',
    sourceUrl: 'https://study.gov.pl/tuition-fees'
  }
]

export function PolandContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇵🇱</span>
              Official University Admission Guide for IB Students (2026)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Poland with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for admission to Polish
                universities
              </strong>
              , using only <strong>official Polish government and institutional sources</strong>.
              Poland uses a <strong>decentralized admission system</strong> where you apply directly
              to each university.
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

      {/* How Poland Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Poland Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                The <strong>International Baccalaureate (IB) Diploma</strong> issued by the IBO in
                Geneva is <strong>recognized by operation of law</strong> in Poland. This means it
                is <strong>automatically accepted</strong> as equivalent to the Polish Matura
                (school-leaving certificate) for university admission — no nostrification or
                additional administrative recognition is required.
              </p>

              <p>
                This automatic recognition has been in effect since <strong>March 31, 2015</strong>,
                under the Polish Act on the Education System (Article 93). NAWA (the National Agency
                for Academic Exchange), which serves as Poland&apos;s{' '}
                <strong>ENIC-NARIC centre</strong>, confirms the recognition status of IB diplomas.
              </p>

              <p>
                While the IB Diploma gives holders the <strong>right to apply</strong> for studies
                at Polish higher education institutions, each university sets its own{' '}
                <strong>specific admission requirements</strong>, including which IB subjects and
                levels are required for particular programmes.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://nawa.gov.pl/en/recognition/recognition-for-academic-purposes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      NAWA — Recognition for Academic Purposes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://study.gov.pl/how-to-apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      study.gov.pl — How to Apply
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
              Do IB Students Need a Polish Diploma?
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
                      The IB Diploma is recognized by operation of law as equivalent to the Polish
                      Matura. You do not need to undergo nostrification (the standard credential
                      evaluation process for foreign diplomas in Poland). This exemption applies to
                      all IB diplomas issued by the IBO in Geneva.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>IB Certificate holders:</strong> If you received IB Diploma Programme
                    Course Results (certificates) rather than the full IB Diploma, you may need to
                    undergo nostrification. Contact the university directly to confirm eligibility.
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
                      href="https://nawa.gov.pl/en/recognition/recognition-for-academic-purposes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      NAWA — Recognition for Academic Purposes
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
                  Poland uses a <strong>decentralized admission system</strong>. There is no
                  centralized application portal — you apply{' '}
                  <strong>directly to each university</strong> through its own online recruitment
                  system. Each institution sets its own deadlines, requirements, and admission
                  criteria.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>University-specific recruitment</strong> — Each university has its own
                    online recruitment portal (e.g., IRK at the University of Warsaw, ERK at
                    Jagiellonian University). Create an account and submit your application through
                    the portal of each institution.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>No limit on applications</strong> — You can apply to multiple
                    universities and programmes simultaneously, as there is no centralized
                    coordination system.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Admission criteria</strong> — Admission is typically based on your IB
                    scores converted to the university&apos;s point system. Competitive programmes
                    (medicine, law, engineering) may have higher score thresholds or additional
                    requirements such as entrance exams.
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
                      href="https://study.gov.pl/how-to-apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      study.gov.pl — How to Apply
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
              IB to Polish Grade Conversion
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Poland does not have a <strong>single national conversion formula</strong> for IB
                grades. Each university defines its own rules for converting IB scores (1–7) to its
                internal point or percentage system.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Higher Level (HL) subjects</strong> are typically treated as equivalent
                    to the extended-level (rozszerzony) Polish Matura and receive higher weighting
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Standard Level (SL) subjects</strong> generally correspond to
                    basic-level (podstawowy) Polish Matura
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Conversion specifics vary — always check the admission rules (
                    <em>zasady rekrutacji</em>) on each university&apos;s recruitment page
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-blue-50 p-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Common Conversion Approaches (examples)
                </h4>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">
                          IB Grade
                        </th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">
                          Typical % (HL)
                        </th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">
                          Typical % (SL)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">7</td>
                        <td className="px-6 py-3 text-gray-700">100%</td>
                        <td className="px-6 py-3 text-gray-700">100%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">6</td>
                        <td className="px-6 py-3 text-gray-700">90%</td>
                        <td className="px-6 py-3 text-gray-700">85–90%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">5</td>
                        <td className="px-6 py-3 text-gray-700">75%</td>
                        <td className="px-6 py-3 text-gray-700">70%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">4</td>
                        <td className="px-6 py-3 text-gray-700">60%</td>
                        <td className="px-6 py-3 text-gray-700">50%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">3</td>
                        <td className="px-6 py-3 text-gray-700">45%</td>
                        <td className="px-6 py-3 text-gray-700">30%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">2</td>
                        <td className="px-6 py-3 text-gray-700">30%</td>
                        <td className="px-6 py-3 text-gray-700">10%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  Values shown are illustrative and based on University of Warsaw Faculty of
                  Economic Sciences conversion. Each faculty and university may use different
                  values.
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
                      href="https://study.gov.pl/how-to-apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      study.gov.pl — How to Apply
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
                Most Polish university programmes <strong>do not require entrance exams</strong> for
                IB students. Admission is primarily based on your IB scores, converted using the
                university&apos;s own formula.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Medicine (English-taught)</strong> — Many medical universities require
                    entrance exams or accept international tests such as UCAT, BMAT, or MCAT.
                    Specific IB HL subjects (Biology, Chemistry) are typically required at minimum
                    scores.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Art and design programmes</strong> — May require a portfolio review or
                    practical exam.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Most other programmes</strong> — Admission is based on converted IB
                    grades, with no additional entrance exams required.
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
                      href="https://study.gov.pl/how-to-apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      study.gov.pl — How to Apply
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
              Polish universities offer programmes in both <strong>Polish</strong> and{' '}
              <strong>English</strong>. There are over{' '}
              <strong>900 English-taught programmes</strong> available across the country.
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
                      <strong>Minimum B2 level</strong> required (IELTS 5.5–6.5, TOEFL iBT 72–94, or
                      Cambridge FCE/CAE depending on the university)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      IB English A or English B courses may satisfy English requirements — verify
                      with the institution
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Medical programmes may require higher English scores (e.g., IELTS 6.5 or
                      above)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Languages className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Polish</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Required only for Polish-taught programmes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Minimum <strong>B2 level</strong> — demonstrated through an official
                      certificate or the university&apos;s own language exam
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Preparatory Polish language courses (<strong>Zerówka</strong>, 9 months) are
                      available at many universities for students who wish to study in Polish
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
                    href="https://study.gov.pl/how-to-apply"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    study.gov.pl — How to Apply
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
              Types of Higher Education in Poland
            </p>

            <p className="mt-6 text-gray-600">
              Poland has nearly <strong>380 higher education institutions</strong> — both public and
              private. The IB Diploma is accepted at all of them. Polish higher education follows
              the <strong>Bologna Process</strong> with standardized degree cycles.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
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
                    <span>
                      <strong>Bachelor&apos;s</strong> (3–3.5 years), <strong>Master&apos;s</strong>{' '}
                      (1.5–2 years), and long-cycle <strong>Master&apos;s</strong> (5–6 years for
                      medicine, law, psychology)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Free tuition for Polish-taught programmes for EU/EEA and Polish Charter
                      holders
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Examples: Jagiellonian University, University of Warsaw, Warsaw University of
                      Technology, AGH University of Krakow
                    </span>
                  </li>
                </ul>
              </div>

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
                    <span>
                      Offer the same degree types as public universities under the Bologna Process
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Tuition fees apply to all students regardless of nationality (EUR 2,000–6,000
                      per year on average)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Often more flexible admission timelines and may offer rolling admissions
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
                    href="https://study.gov.pl/how-to-apply"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    study.gov.pl — How to Apply
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
              Documents are typically uploaded through the university&apos;s online recruitment
              portal. Requirements may vary by institution:
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
                  Non-EU/EEA students must also arrange a <strong>student visa</strong>. Apply at
                  least 2–3 months before the academic year starts. Some universities may require an{' '}
                  <strong>apostille</strong> on your IB Diploma — check directly with the
                  institution.
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
                    href="https://study.gov.pl/how-to-apply"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    study.gov.pl — How to Apply
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

            <p className="mt-6 text-gray-600">
              Timelines vary by university and programme. This is a general guide for the{' '}
              <strong>fall intake</strong> (October start), which is the primary intake period:
            </p>

            <div className="mt-8 space-y-6">
              {timelineSteps.map((step, index) => (
                <div key={step.period} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    {index < timelineSteps.length - 1 && (
                      <div className="mt-2 h-full w-px bg-blue-200" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-semibold text-gray-900">{step.period}</h3>
                    <p className="mt-1 text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Source
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://study.gov.pl/how-to-apply"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    study.gov.pl — How to Apply
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

            <div className="mt-8 space-y-8">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-b border-gray-200 pb-8 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-3 text-gray-600 faq-answer">{faq.answer}</p>
                  <p className="mt-2 text-sm text-gray-500">
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

            {/* Internal link block (MANDATORY) */}
            <div className="mt-8 rounded-xl bg-blue-50 p-6 border border-blue-100">
              <p className="text-gray-700">
                Learn{' '}
                <Link href="/how-it-works" className="text-blue-600 font-medium hover:underline">
                  how IB Match evaluates Polish admission
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
            <p className="text-4xl mb-4">🇵🇱</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Explore Polish Universities?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Create your free IB Match profile and discover programmes in Poland that match your IB
              Diploma results.
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
                href="/programs/search?countries=cmkpi3zsm0000ii0427n8n79h"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="h-4 w-4" />
                Explore Programs in Poland
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
