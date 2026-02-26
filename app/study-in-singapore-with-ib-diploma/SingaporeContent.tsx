'use client'

import Link from 'next/link'
import {
  CheckCircle2,
  FileText,
  Building2,
  ArrowRight,
  Search,
  ExternalLink,
  Languages,
  AlertTriangle,
  GraduationCap
} from 'lucide-react'

const requiredDocuments = [
  'Official IB Transcript (sent directly via IBO)',
  'Actual IB Diploma Results (or predicted if May exams)',
  'Passport / Identification Document',
  'Proof of English Proficiency (if required)',
  'Mother Tongue Language (MTL) verification (for SG Citizens/PRs)'
]

const faqs = [
  {
    question: 'Do autonomous universities in Singapore accept the IB Diploma?',
    answer:
      'Yes. Major publicly funded universities, including NUS, NTU, SMU, and SUTD, accept the IB Diploma as a qualification for undergraduate programs.',
    source: 'National University of Singapore (NUS) and Nanyang Technological University (NTU)',
    sourceUrl:
      'https://nus.edu.sg/oam/apply-to-nus/international-baccalaureate-(ib)-diploma/admissions-requirements'
  },
  {
    question: 'What IB score is required for admission to NUS or NTU?',
    answer:
      'There is no universal minimum score, but admission is highly competitive. Universities conduct holistic reviews and expect a strong combination of grades, typically 5s, 6s, and 7s in Higher Level and Standard Level subjects, including good grades in EE and TOK.',
    source: 'Nanyang Technological University (NTU)',
    sourceUrl:
      'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma'
  },
  {
    question: 'Can I apply with predicted IB scores if I take the May exams?',
    answer:
      'Yes, if you are taking the May examinations, you can often apply with predicted scores for the initial application window (around December to February/March). However, actual IB results must be submitted promptly upon release in July.',
    source: 'National University of Singapore (NUS)',
    sourceUrl:
      'https://nus.edu.sg/oam/apply-to-nus/international-baccalaureate-(ib)-diploma/admissions-requirements'
  },
  {
    question: 'Is the IB Diploma alone sufficient for university entry in Singapore?',
    answer:
      'Yes, the IB Diploma is sufficient and no additional local diploma is required. However, applicants must meet specific programme prerequisites (such as Mathematics or science subjects at HL) and language requirements.',
    source: 'Nanyang Technological University (NTU)',
    sourceUrl:
      'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma'
  },
  {
    question: 'What is the Mother Tongue Language (MTL) requirement?',
    answer:
      'The MTL requirement applies primarily to Singapore Citizens and Permanent Residents. It can be fulfilled by achieving specific grades in IB Diploma Language A or Language B (Standard or Higher Level) or other MOE-approved qualifications. International students typically fulfill English proficiency requirements instead.',
    source: 'Singapore Management University (SMU)',
    sourceUrl: 'https://admissions.smu.edu.sg'
  }
]

export function SingaporeContent() {
  return (
    <article className="pb-16 flex-1">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇸🇬</span>
              Official University Admission Guide for IB Students (2026)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Singapore with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for admission to
                Singaporean universities
              </strong>
              , using only{' '}
              <strong>official Singapore higher-education and institutional sources</strong>.
              Singapore&apos;s system is <strong>decentralized</strong>, meaning that universities
              determine their own admission policies for foreign qualifications, including the IB
              Diploma.
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

      {/* 2. Recognition */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Official Recognition
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              How Singapore Recognizes the IB Diploma
            </p>
            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                The International Baccalaureate (IB) Diploma is widely recognized for university
                admission in Singapore. The Ministry of Education (MOE) approves it as an
                alternative to the GCE A-Level curriculum for specific independent schools, and
                publicly funded, private, and autonomous universities accept the IB Diploma as a
                qualification for undergraduate programs.
              </p>
              <p>
                Major universities, including the National University of Singapore (NUS), Nanyang
                Technological University (NTU), Singapore Management University (SMU), and the
                Singapore University of Technology and Design (SUTD), all assess applicants holding
                the IB Diploma. Admission is highly competitive and is primarily based on actual IB
                Diploma results.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Primary Sources
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a
                      href="https://nus.edu.sg/oam/apply-to-nus/international-baccalaureate-(ib)-diploma/admissions-requirements"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      NUS IB Admissions Information
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      NTU IB Diploma Admission Guide
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://admissions.smu.edu.sg"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SMU Undergraduate Admissions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Equivalence / Local Diploma */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Equivalence Requirements
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Do I need a Singaporean local secondary diploma?
            </p>

            <div className="mt-8 rounded-2xl bg-green-50 p-8 border border-green-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No, the IB Diploma is sufficient
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You do not need an additional GCE A-Level or O-Level certificate if you have an IB
                Diploma. The full IB Diploma is a standalone, fully accepted credential for
                university entry in Singapore. While the diploma itself is sufficient, you must
                still meet stringent specific program prerequisites, such as requiring Higher Level
                Mathematics or Sciences for Engineering or STEM courses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Admission System */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Application Process</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              How Admission Works in Singapore
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Singapore does not have a centralized university application portal for
                international qualifications. Applicants apply directly to each university via their
                respective online application portals.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Decentralized Direct Application</strong> — You must create an account,
                    fill out application forms, and submit documents individually to each university
                    (e.g., NUS Applicant Portal, NTU Admissions Portal).
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>IBO Official Transcripts</strong> — It is mandatory to authorize the
                    International Baccalaureate Organization (IBO) to release your official
                    transcripts directly to the universities. For NUS, the institute code is 000690.
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Important Note on Transcripts:</strong> Failure to grant the university
                    direct access to official transcripts via IBO by early July will usually result
                    in an incomplete application that will not be processed. Students are advised to
                    arrange this with their IB coordinator before results are released.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Grade Evaluation */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Grade Evaluation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              How IB Scores are Assessed
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                There is no official or universal minimum IB point score required for university
                entry across Singapore. Admission to competitive public universities is based on a
                holistic review of points, subject combinations, and availability of places, making
                entry highly competitive.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Strong Combination</strong> — Universities like NTU generally expect a
                    consistent combination of 5s, 6s, and 7s across all Higher Level and Standard
                    Level subjects.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Core Elements</strong> — Good grades in the Extended Essay (EE) and
                    Theory of Knowledge (TOK) are explicitly required.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Subject Prerequisites</strong> — Many programs have precise requirements
                    (e.g., Mathematics MAA or MAI at Higher Level).
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Predicted Grades</strong> — If you are taking the May IB examinations,
                    you are allowed to apply using predicted results. However, actual results must
                    be submitted promptly after their July release.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Entrance Exams */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Entrance Exams</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Are entrance exams required?
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                For the vast majority of academic disciplines (Arts, Science, Engineering,
                Business), you{' '}
                <strong>do not need to sit for a standardized university entrance exam</strong>. The
                universities rely heavily on your official IB Diploma results.
              </p>

              <div className="rounded-2xl bg-white p-6 border border-gray-200">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Medicine & Dentistry</strong> — Often require the UCAT (University
                      Clinical Aptitude Test) or specialized selection tests.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Architecture & Design</strong> — Require submission of an arts or
                      design portfolio.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Highly Selective Programs</strong> — May require qualitative
                      interviews as part of the holistic admissions process (e.g., Renaissance
                      Engineering at NTU).
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Language Requirements */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Language Requirements
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Language & Mother Tongue Qualifications
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">English Proficiency</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  As the medium of instruction is English, proficiency is expected.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      If at least three of your IB subjects are taught in a non-English language,
                      you must submit standardized English test scores.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Completing the IB DP in English often satisfies this requirement.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Languages className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Mother Tongue (MTL)</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  For Singapore Citizens and Permanent Residents only:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>You must fulfill the MTL requirement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      This can be satisfied by a pass in IB Diploma Language A or Language B (at HL
                      or SL) in the relevant mother tongue.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. University Types */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Higher Education Landscape
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              University Types in Singapore
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Autonomous Public Universities
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>The primary institutions are NUS, NTU, SMU, SUTD, SIT, and SUSS.</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      These receive public funding, offer comprehensive undergraduate education, and
                      set competitive standards for IB applicants.
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
                    Private Education Institutions
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Various private institutions offer degree programs often in partnership with
                      overseas universities (e.g., SIM GE, Kaplan).
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      They also accept the IB Diploma and are generally more accessible than the
                      autonomous public universities.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Required Documents */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Checklist</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Typical Required Documents
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <div className="rounded-2xl bg-white p-8 border border-gray-200">
                <ul className="space-y-4">
                  {requiredDocuments.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-700">
                      <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Application Timeline */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Timeline</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Application Timeline (2026 Intake)
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    December – February: Application Opens
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Application period opens for most Singaporean universities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Late February / March: Deadlines</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Main application deadline approaches (varies by program and university).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Mid-May – July: Early Outcomes</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Estimated application outcomes for early/predicted applicants.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Early July: Final IB Results</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Actual IB results released; transcripts must be accessible directly by
                    university via IBO.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  5
                </div>
                <div>
                  <p className="font-semibold text-gray-900">July – August: Final Outcomes</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Final application outcomes are officially released to candidates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">FAQ</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </p>

            <div className="mt-8 space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-xl bg-gray-50 p-6 border border-gray-200"
                >
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600 faq-answer text-sm leading-relaxed mb-3">
                    {faq.answer}
                  </p>
                  <div className="text-xs text-gray-500 flex items-center gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Source:{' '}
                    <a
                      href={faq.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-blue-600"
                    >
                      {faq.source}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-blue-50 p-6 border border-blue-100">
              <p className="text-gray-700">
                Learn{' '}
                <Link href="/how-it-works" className="text-blue-600 font-medium hover:underline">
                  how IB Match evaluates Singaporean admission
                </Link>{' '}
                requirements for your profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CTA Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-4xl mb-4">🇸🇬</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in Singapore?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover Singaporean university programs that match your IB profile. Search by IB
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
                href="/programs/search?countries=cmirq3xas000o7m0e4dbgs69t"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in Singapore
              </Link>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              100% free for students. No credit card required.
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}
