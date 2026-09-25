'use client'

/**
 * Israel IB Diploma Content Component
 *
 * Official sources used:
 * - studyisrael.org.il — Israeli Council for Higher Education official portal
 * - che.org.il — Council for Higher Education of Israel
 * - nite.org.il — National Institute for Testing and Evaluation (Psychometric Test)
 *
 * All information in this component is sourced from official Israeli government
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

// Required documents for Israeli university admission
const requiredDocuments = [
  'IB Diploma and transcript of results',
  'Psychometric Entrance Test (PET) scores — or SAT/ACT scores where accepted',
  'Proof of identity (passport)',
  'Proof of Hebrew proficiency (YAEL test or equivalent — for Hebrew-taught programmes)',
  'Proof of English level (for example TOEFL or IELTS results; PET takers from December 2026 take the separate AMIRNET test)',
  'Any programme-specific supplementary documents (e.g., portfolio, interview)'
]

// Application timeline steps
const timelineSteps = [
  {
    period: 'Autumn/Winter: Applications Open',
    description:
      "Most Israeli universities open their application portals in the autumn or early winter for the following academic year. Check each university's website for exact dates, as they vary by institution."
  },
  {
    period: 'December 2026 and April 2027: Psychometric Test Dates',
    description:
      'From the December 2026 sitting, the PET tests verbal and quantitative reasoning only; English is tested separately by the AMIRNET test, which you can take throughout the year. Test dates: 4–6 December 2026 and 18–19 April 2027. Register at nite.org.il.'
  },
  {
    period: 'Spring: Application Deadlines',
    description:
      'Deadlines vary by university and programme, and Medicine closes earlier. At Tel Aviv University, for 2025–26 entry to Hebrew-taught programmes, applications were due by 31 May 2025, by 10 May for Medicine and by 19 April for Dental Medicine.'
  },
  {
    period: 'April–June: Admission Decisions',
    description:
      'Universities send admission decisions on a rolling basis. Accepted students receive instructions for enrollment, visa applications, and housing arrangements.'
  },
  {
    period: 'October 2027: Academic Year Begins',
    description:
      'The 2027–28 academic year opens in October 2027. International students should arrive early for orientation, visa processing, and optional Hebrew language preparation (Ulpan).'
  }
]

// FAQ data
const faqs = [
  {
    question: 'Is the IB Diploma recognized for university admission in Israel?',
    answer:
      'Yes. Israeli universities accept the IB Diploma for admission. Tel Aviv University, for example, lists the IB among the diplomas from abroad that are equivalent to the Israeli matriculation certificate (Bagrut) for registration.',
    source: 'Tel Aviv University — General Entrance Requirements',
    sourceUrl: 'https://en-go.tau.ac.il/General-Requirements'
  },
  {
    question: 'Do IB students need to take the Psychometric Entrance Test (PET)?',
    answer:
      'In most cases, yes. Most Israeli institutions admit candidates on a combination of their matriculation average and their score in the Psychometric Entrance Test (PET), administered by NITE. From the December 2026 sitting, the PET tests verbal and quantitative reasoning only, and English is tested separately by the AMIRNET test. Scores stay on the 200–800 scale, and the change applies to admissions for the 2027–28 academic year.',
    source: 'NITE — English domain to be separated from the PET',
    sourceUrl: 'https://www.nite.org.il/news/notice-15022026/?lang=en'
  },
  {
    question: 'Do I need to speak Hebrew to study in Israel?',
    answer:
      "It depends on the programme. Programmes taught in Hebrew require Hebrew proficiency. Israeli institutions also offer Bachelor's and Master's programmes in English for international students, which ask for proof of English, for example TOEFL or IELTS results.",
    source: 'Study Israel — Planning',
    sourceUrl: 'https://studyisrael.org.il/planning/'
  },
  {
    question: 'How do IB students apply to Israeli universities?',
    answer:
      'Israel uses a decentralized application system — students apply directly to each university. There is no centralized national application portal. Each institution sets its own deadlines, requirements, and admission criteria. Applications typically open in the autumn/winter for the following academic year, with deadlines varying by university and programme.',
    source: 'Study Israel — Planning',
    sourceUrl: 'https://studyisrael.org.il/planning/'
  },
  {
    question: 'What documents do IB students need for Israeli university admission?',
    answer:
      'Required documents typically include: IB Diploma and transcript of results, Psychometric Entrance Test (PET) scores (or SAT/ACT where accepted), proof of identity (passport), proof of language proficiency (Hebrew and/or English depending on programme), and any programme-specific supplementary documents. International students also need an A/2 Student Visa and proof of financial means.',
    source: 'Study Israel — Planning',
    sourceUrl: 'https://studyisrael.org.il/planning/'
  }
]

export function IsraelContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇮🇱</span>
              Official University Admission Guide for IB Students (2027)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Israel with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for admission to Israeli
                universities
              </strong>
              , using only{' '}
              <strong>official Israeli higher-education and institutional sources</strong>. Israel
              uses a <strong>decentralized application system</strong> where students apply directly
              to each university.
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

      {/* How Israel Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Israel Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                The <strong>International Baccalaureate (IB) Diploma</strong> is accepted by Israeli
                universities for admission. Tel Aviv University, for example, lists it among the
                diplomas from abroad that are{' '}
                <strong>equivalent to the Israeli Bagrut (matriculation certificate)</strong> for
                registration, and the Technion publishes its own conversion of IB grades.
              </p>

              <p>
                In addition to the IB Diploma, most institutions require applicants to take the{' '}
                <strong>Psychometric Entrance Test (PET)</strong>, administered by the National
                Institute for Testing and Evaluation (NITE). Most institutions admit candidates on a
                combination of their matriculation average and their PET score.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://studyisrael.org.il/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study Israel — Israeli Council for Higher Education Portal
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://che.org.il/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Council for Higher Education of Israel
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://en-go.tau.ac.il/General-Requirements"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Tel Aviv University — General Entrance Requirements
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nite.org.il/two-domain-psychometric-entrance-test/higher-education-admissions/?lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      NITE — Higher Education Admissions
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
              Do IB Students Need an Israeli Bagrut?
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <div className="rounded-2xl bg-green-50 p-8 border border-green-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      No — the IB Diploma is accepted as equivalent to the Bagrut
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Israeli universities recognize the IB Diploma as an alternative to the
                      national Bagrut certificate. You do not need to sit for Bagrut exams or obtain
                      a separate Israeli secondary diploma. The university admissions office
                      assesses your IB results directly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Psychometric Test still required:</strong> While the IB Diploma replaces
                    the Bagrut for admission, the Psychometric Entrance Test (PET) is a separate
                    requirement at most universities. IB students must typically take the PET in
                    addition to submitting their IB results. SAT or ACT scores may be accepted as
                    alternatives at some institutions.
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
                      href="https://studyisrael.org.il/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study Israel — Israeli Council for Higher Education Portal
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
                  Israel uses a <strong>decentralized application system</strong>. There is no
                  centralized national portal — students apply{' '}
                  <strong>directly to each university</strong> through the institution&apos;s own
                  admissions office. Each university sets its own deadlines, criteria, and admission
                  scores.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Sekhem Score</strong> — Most universities calculate a weighted admission
                    score (called &ldquo;Sekhem&rdquo;) combining your secondary school average
                    (Bagrut or IB equivalent) and your Psychometric Entrance Test (PET) score. Each
                    institution uses its own weighting formula.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Programme-specific requirements</strong> — Competitive programmes
                    (Medicine, Law, Engineering) may have higher minimum Sekhem scores and
                    additional requirements such as interviews, supplementary exams, or specific HL
                    subject requirements.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>International programmes</strong> — English-taught degree programmes
                    often have separate application tracks for international students. These may
                    have different deadlines and may not require the PET.
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
                      href="https://studyisrael.org.il/planning/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Study Israel — Planning Your Studies
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://che.org.il/en/institutions/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      CHE — Accredited Institutions
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
                There is no single, nationally mandated IB-to-Bagrut grade conversion table in
                Israel. Each university evaluates IB grades according to its own criteria, then
                combines them with the Psychometric Entrance Test (PET) into an admission score. The
                Technion&apos;s published rules show how this works:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Each IB grade converts to the Israeli 0–100 scale: 7 = 100, 6 = 85, 5 = 70, 4 =
                    55
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Higher Level (HL) subjects</strong> count as 5 Bagrut units and Standard
                    Level subjects as 3 (4 for SL Mathematics); HL Mathematics, Physics and
                    Chemistry earn a 30-point bonus, and HL Biology, English and Computer Science 20
                    points
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Competitive programmes may require specific minimum grades in HL subjects
                    relevant to the field (e.g., HL Mathematics and HL Sciences for Engineering)
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    The resulting average is combined with your PET score, or the SAT or ACT where
                    accepted, into the admission score (Sekhem)
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
                      href="https://admissions.technion.ac.il/en/english/ib-ossd-bacs-gcse-ap-tests/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Technion — Admission of candidates with foreign matriculation diplomas
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
              The Psychometric Entrance Test (PET)
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                The <strong>Psychometric Entrance Test (PET)</strong>, known in Hebrew as
                &ldquo;ha-Psikhometri&rdquo;, is a standardized examination administered by the{' '}
                <strong>National Institute for Testing and Evaluation (NITE)</strong>. It is a key
                component of the admission process at most Israeli universities, used alongside
                secondary school results to predict academic success.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Test content:</strong> From the December 2026 sitting, a writing task
                    plus verbal and quantitative reasoning. English is tested separately by the
                    AMIRNET test, which you can take throughout the year
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Score range:</strong> 200–800, unchanged by the new format. Higher
                    scores improve admission chances
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Languages available:</strong> Hebrew, Arabic, Combined/English, Russian
                    and French, though not every language on every date
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Validity:</strong> Scores remain valid for at least seven years,
                    depending on the institution
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Alternatives:</strong> Some universities accept{' '}
                    <strong>SAT or ACT</strong> scores in place of the PET. Tel Aviv University
                    does, except for Medicine and Dental Medicine
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
                      href="https://www.nite.org.il/news/notice-15022026/?lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      NITE — English domain to be separated from the PET
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nite.org.il/two-domain-psychometric-entrance-test/?lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      NITE — The Two-domain Psychometric Test
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://en-go.tau.ac.il/General-Requirements"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Tel Aviv University — General Entrance Requirements
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
              Language proficiency is a critical factor for university admission in Israel.
              Requirements depend on whether you are applying to Hebrew-taught or English-taught
              programmes.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Hebrew</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Required for most undergraduate programmes, which are taught in Hebrew
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Proficiency demonstrated through the <strong>YAEL test</strong> (Hebrew
                      proficiency exam) or equivalent
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Ulpan</strong> (intensive Hebrew language programmes) are available at
                      most universities and nationally to help students reach the required level
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
                    <span>
                      Required for English-taught programmes. From December 2026, English is tested
                      by the AMIRNET test rather than inside the PET
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      For programmes in English, <strong>IELTS</strong> or <strong>TOEFL</strong>{' '}
                      results are commonly accepted
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
                    href="https://studyisrael.org.il/planning/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study Israel — Planning
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nite.org.il/news/notice-15022026/?lang=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    NITE — English domain to be separated from the PET
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
              Types of Higher Education in Israel
            </p>

            <p className="mt-6 text-gray-600">
              Israeli higher education is supervised by the{' '}
              <strong>Council for Higher Education (CHE)</strong>. The IB Diploma is accepted at all
              types of accredited institutions.
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
                      <strong>9 universities</strong>, all publicly funded
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Offer Bachelor&apos;s, Master&apos;s, and PhD programmes</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Examples: Hebrew University, Tel Aviv University, Technion, Weizmann
                      Institute, Ben-Gurion University
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
                    Colleges &amp; Academic Colleges
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>31 colleges</strong> and <strong>21 teacher training colleges</strong>
                      ; 41 colleges are publicly funded and 12 privately funded
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Primarily offer Bachelor&apos;s degree programmes with practical orientation
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>All accredited by the CHE and accept IB qualifications</span>
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
                    href="https://studyisrael.org.il/study-in-israel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study Israel — Institutions and Programs
                  </a>
                </li>
                <li>
                  <a
                    href="https://che.org.il/en/institutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    CHE — Accredited Institutions
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
              Since Israel uses a decentralized system, exact requirements vary by institution.
              However, the following documents are commonly required:
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
                  <strong>International students:</strong> An A/2 Student Visa is required to study
                  in Israel. You will need a formal letter of acceptance from a recognized
                  institution, proof of financial means, and a valid passport. Apply for your visa
                  at the nearest Israeli Embassy or Consulate.
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
                    href="https://studyisrael.org.il/planning/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study Israel — Planning Your Studies
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
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://studyisrael.org.il/planning/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Study Israel — Planning Your Studies
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nite.org.il/news/notice-15022026/?lang=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    NITE — English domain to be separated from the PET
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nite.org.il/two-domain-psychometric-entrance-test/?lang=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    NITE — The Two-domain Psychometric Test
                  </a>
                </li>
                <li>
                  <a
                    href="https://en-go.tau.ac.il/General-Requirements"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Tel Aviv University — General Entrance Requirements
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
                  how IB Match evaluates Israeli admission
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
            <div className="text-4xl mb-4">🇮🇱</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in Israel?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover Israeli university programmes that match your IB profile. Search by IB
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
                href="/programs/search?countries=cmj0gubzn00007mfw0qz8fv57"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in Israel
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
