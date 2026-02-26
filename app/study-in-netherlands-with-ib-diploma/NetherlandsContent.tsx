'use client'

/**
 * Netherlands IB Diploma Content Component
 *
 * Official sources used:
 * - studyinnl.org — Nuffic's official portal for international students (Study in NL)
 * - nuffic.nl — Dutch organisation for internationalisation in education (NARIC)
 * - studielink.nl — national online application and enrolment portal
 *
 * All information in this component is sourced from official Dutch government
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

// Required documents for Dutch university admission
const requiredDocuments = [
  'IB Diploma and transcript of results (final — predicted grades are generally not accepted)',
  'Proof of identity (valid passport or national ID)',
  'Proof of English proficiency (IELTS, TOEFL, Cambridge — if not met through IB English courses)',
  'Nuffic credential evaluation or diploma comparison (institution may arrange this on your behalf)',
  'Proof of Dutch language proficiency (only for Dutch-taught programmes)',
  'Programme-specific supplementary documents (e.g., portfolio, motivation letter, CV)'
]

// Application timeline steps
const timelineSteps = [
  {
    period: 'October–December: Research Programmes',
    description:
      "Identify programmes via the Studyfinder at studyinnl.org. Check each institution's website for specific entry requirements, deadlines, and whether Studielink registration applies to international students."
  },
  {
    period: 'January 15: Numerus Fixus Deadline',
    description:
      'Application deadline for Numerus Fixus programmes (23:59 CET). You can apply to a maximum of two Numerus Fixus programmes. Selection takes place between January 15 and April 15.'
  },
  {
    period: 'April 15: Numerus Fixus Results',
    description:
      'You receive your ranking number via Studielink. If offered a place, you must accept within two weeks. Unaccepted places are assigned to the next applicant in line.'
  },
  {
    period: 'May 1: Regular Programme Deadline',
    description:
      'General application deadline for non-Numerus Fixus programmes. Some institutions have earlier deadlines — always verify with your chosen institution.'
  },
  {
    period: 'September: Academic Year Begins',
    description:
      'The Dutch academic year typically starts in September. Some programmes also offer a February start.'
  }
]

// FAQ data
const faqs = [
  {
    question: 'Is the IB Diploma recognized for university admission in the Netherlands?',
    answer:
      'Yes. Nuffic (the Dutch NARIC) has determined that the IB Diploma is equivalent to the Dutch VWO diploma (Voorbereidend Wetenschappelijk Onderwijs), which is the qualification required for admission to Dutch research universities (WO). The IB Career-related Programme (CP) is comparable to the HAVO diploma with vocational subjects.',
    source: 'Nuffic — International Baccalaureate',
    sourceUrl: 'https://www.nuffic.nl/en/education-systems/international-baccalaureate'
  },
  {
    question: 'How do IB students apply to Dutch universities?',
    answer:
      'Most applications to Dutch higher education institutions go through Studielink (studielink.nl), the national online enrolment portal. You create an account, select your programme, and submit your application. Some institutions may also require a separate direct application. Check with your chosen institution whether Studielink applies to international applicants.',
    source: 'Study in NL — How to Apply',
    sourceUrl: 'https://www.studyinnl.org/plan-your-stay/how-to-apply'
  },
  {
    question: 'What is a Numerus Fixus programme and how does it affect IB students?',
    answer:
      'Numerus Fixus programmes have a limited number of places. If more students apply than there are places, a selection procedure takes place. The application deadline for Numerus Fixus programmes is 15 January (23:59 CET). You can apply to a maximum of two Numerus Fixus programmes per academic year. Medicine, Dentistry, Dental Hygiene, and Physiotherapy are further restricted to one application per programme.',
    source: 'Study in NL — How to Apply',
    sourceUrl: 'https://www.studyinnl.org/plan-your-stay/how-to-apply'
  },
  {
    question: 'Do I need to speak Dutch to study in the Netherlands?',
    answer:
      "Not necessarily. The Netherlands offers a large number of English-taught programmes, especially at the Master's level but increasingly at Bachelor's level too. For English-taught programmes, you need to demonstrate English proficiency through tests such as IELTS, TOEFL, or Cambridge. For Dutch-taught programmes, you must demonstrate Dutch language proficiency.",
    source: 'Study in NL — Admission Requirements',
    sourceUrl: 'https://www.studyinnl.org/plan-your-stay/admission-requirements'
  },
  {
    question: 'What are tuition fees for IB students in the Netherlands?',
    answer:
      'EU/EEA students pay the statutory tuition fee (wettelijk collegegeld), which is set annually by the Dutch government. Non-EU/EEA students pay the institutional tuition fee, which is set by each institution individually and is typically higher. Various scholarships are available, including the Holland Scholarship for non-EU/EEA students.',
    source: 'Study in NL — Finances',
    sourceUrl: 'https://www.studyinnl.org/finances'
  }
]

export function NetherlandsContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇳🇱</span>
              Official University Admission Guide for IB Students (2026)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in the Netherlands with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for admission to Dutch
                universities
              </strong>
              , using only{' '}
              <strong>official Dutch higher-education and institutional sources</strong>. The
              Netherlands uses a <strong>decentralized admission system</strong> with applications
              submitted through Studielink.
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

      {/* How the Netherlands Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How the Netherlands Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                <strong>Nuffic</strong>, the Dutch organisation for internationalisation in
                education and the <strong>NARIC centre</strong> for the Netherlands, has determined
                that the <strong>IB Diploma</strong> is equivalent to the Dutch{' '}
                <strong>VWO diploma</strong> (Voorbereidend Wetenschappelijk Onderwijs —
                pre-university education). This means IB Diploma holders are eligible for admission
                to Dutch <strong>research universities (WO)</strong>.
              </p>

              <p>
                The IB Career-related Programme (CP) is comparable to the Dutch{' '}
                <strong>HAVO diploma</strong> with vocational subjects, which provides access to{' '}
                <strong>universities of applied sciences (HBO)</strong>.
              </p>

              <p>
                While Nuffic provides the official equivalence advice, the{' '}
                <strong>final decision on admission</strong> rests with each individual institution.
                Institutions may set additional requirements beyond the general equivalence, such as
                specific subjects at Higher Level or minimum IB scores.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.nuffic.nl/en/education-systems/international-baccalaureate"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Nuffic — International Baccalaureate
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nuffic.nl/en/education-systems/international-baccalaureate/level-of-the-ib-diplomas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Nuffic — Level of the IB Diplomas
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
              Do IB Students Need a Dutch Diploma?
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <div className="rounded-2xl bg-green-50 p-8 border border-green-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      No — the IB Diploma is equivalent to the Dutch VWO diploma
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Nuffic officially considers the IB Diploma equivalent to the VWO diploma for
                      university admission purposes. You do not need to obtain a separate Dutch
                      diploma. Dutch institutions can obtain free advice from Nuffic regarding your
                      diploma level, so you typically do not need to apply for a paid credential
                      evaluation yourself.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Programme-specific requirements:</strong> While the IB Diploma provides
                    general access, individual programmes may require specific subjects at Higher
                    Level (HL) with minimum grades. Always check the programme&apos;s specific entry
                    requirements on the institution&apos;s website.
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
                      href="https://www.studyinnl.org/plan-your-stay/checking-your-diploma"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in NL — Checking Your Diploma
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
                  The Netherlands uses a <strong>decentralized admission system</strong>. Each
                  institution sets its own entry requirements and admission criteria. Most
                  applications are submitted through{' '}
                  <a
                    href="https://www.studielink.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Studielink
                  </a>
                  , the national online enrolment portal. Some institutions may use a different
                  registration method for international students — always check with your chosen
                  institution first.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Regular programmes</strong> — Application deadline is generally{' '}
                    <strong>1 May</strong> for a September start. Some institutions have earlier
                    deadlines, particularly for non-EU/EEA students.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Numerus Fixus programmes</strong> — Programmes with a limited number of
                    places (e.g., Medicine, Psychology). The deadline is{' '}
                    <strong>15 January (23:59 CET)</strong>. A selection procedure determines
                    admission based on criteria set by the institution.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    You can apply to a maximum of <strong>two Numerus Fixus programmes</strong> per
                    academic year. For Medicine, Dentistry, Dental Hygiene, and Physiotherapy, you
                    are limited to <strong>one application per programme</strong>.
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
                      href="https://www.studyinnl.org/plan-your-stay/how-to-apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in NL — How to Apply
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.studielink.nl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Studielink — National Enrolment Portal
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
                The Netherlands does not have a single, official IB-to-Dutch grade conversion table.
                Each institution evaluates IB scores according to its own criteria. However, the IB
                1–7 grading scale is well understood by Dutch universities, and many publish
                specific IB score requirements for their programmes.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Institutions typically set <strong>minimum IB total scores</strong> and may
                    require specific <strong>HL subject grades</strong> for particular programmes
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Predicted grades are generally not accepted</strong> — most institutions
                    require final IB results for admission decisions
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Nuffic provides information on how <strong>IB grades and study results</strong>{' '}
                    compare to the Dutch system, which institutions use as a reference
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
                      href="https://www.nuffic.nl/en/education-systems/international-baccalaureate"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Nuffic — International Baccalaureate
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
                Dutch universities <strong>generally do not require entrance exams</strong> for IB
                students. Admission is based on your IB Diploma, subject requirements, and grades.
                However, there are important exceptions:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Numerus Fixus selection</strong> — For programmes with limited places,
                    the institution decides the selection criteria. This may include motivation
                    letters, CVs, aptitude tests, or interviews — depending on the programme
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Arts and creative programmes</strong> — may require portfolio
                    submissions, auditions, or practical assessments
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Language tests</strong> — if your IB English courses do not meet the
                    institution&apos;s requirements, you may need to provide separate English
                    proficiency test results (IELTS, TOEFL, or Cambridge)
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
                      href="https://www.studyinnl.org/plan-your-stay/how-to-apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study in NL — How to Apply
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
              The Netherlands is one of the most English-friendly countries in continental Europe
              for higher education. Language requirements depend on the language of instruction.
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
                      Accepted tests: <strong>IELTS, TOEFL iBT, Cambridge</strong> (B2 First, C1
                      Advanced, C2 Proficiency), <strong>LanguageCert, Pearson PTE, TOEIC</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Required scores vary by institution and programme — check directly with the
                      institution
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      IB English A or English B courses may satisfy English requirements — verify
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
                  <h3 className="text-lg font-semibold text-gray-900">Dutch</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Required only for Dutch-taught programmes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      IB Dutch A (SL/HL) or Dutch B (HL) may qualify for exemption or partial
                      exemption from Dutch language requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Typically assessed through the{' '}
                      <strong>Staatsexamen Nederlands als Tweede Taal (NT2)</strong>
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
                    href="https://www.studyinnl.org/plan-your-stay/admission-requirements"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in NL — Admission Requirements
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
              Types of Higher Education in the Netherlands
            </p>

            <p className="mt-6 text-gray-600">
              Dutch higher education is organized into two main types. The IB Diploma provides
              access to both, though the standard equivalence to VWO specifically targets research
              universities.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Research Universities (WO)
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Offer <strong>Bachelor&apos;s</strong> (3 years),{' '}
                      <strong>Master&apos;s</strong> (1–2 years), and <strong>PhD</strong>{' '}
                      programmes
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>IB Diploma (≡ VWO)</strong> is the standard entry qualification
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      14 research universities, including University of Amsterdam, TU Delft, Leiden
                      University, and Utrecht University
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
                    Universities of Applied Sciences (HBO)
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Offer <strong>Bachelor&apos;s</strong> (4 years) and some{' '}
                      <strong>Master&apos;s</strong> programmes with a practical focus
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      IB Diploma holders are also eligible for HBO programmes (HAVO level is the
                      minimum requirement)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      36+ institutions, including The Hague University, Amsterdam University of
                      Applied Sciences, and Fontys
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
                    href="https://www.studyinnl.org/plan-your-stay/admission-requirements"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in NL — Admission Requirements
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
              Document requirements vary by institution and programme. The following are commonly
              required for IB Diploma holders applying to Dutch universities:
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
                  Some Dutch universities (e.g., University of Amsterdam) may exempt IB students
                  from submitting a prior education file if your results are sent directly from the
                  IBO. Check with your chosen institution whether they accept direct digital results
                  from the IBO.
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
                    href="https://www.studyinnl.org/plan-your-stay/how-to-apply"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in NL — How to Apply
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
                    href="https://www.studyinnl.org/plan-your-stay/how-to-apply"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study in NL — How to Apply
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
                  how IB Match evaluates Dutch admission
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
            <div className="text-4xl mb-4">🇳🇱</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in the Netherlands?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover Dutch university programmes that match your IB profile. Search by IB points,
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
                href="/programs/search?countries=cmip2am54000l7m18yuyj0icq"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in the Netherlands
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
