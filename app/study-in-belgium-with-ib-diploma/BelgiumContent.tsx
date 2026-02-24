'use client'

/**
 * Belgium Content Component
 *
 * Client component containing all content sections for the Belgium IB landing page.
 * Content is based on official sources from Flemish and French Communities.
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
  AlertTriangle
} from 'lucide-react'

// Required documents
const requiredDocuments = [
  'IB Diploma or predicted grades',
  'Academic transcripts',
  'Passport or ID',
  'Equivalence application (French Community only)',
  'Language proficiency certificate (if required)',
  'Motivation letter (some programs)'
]

// Application timeline
const timelineSteps = [
  {
    period: 'November–July',
    description: 'Equivalence applications (French Community: Nov 15 – Jul 15)'
  },
  { period: 'February–April', description: 'Application deadlines for many programs' },
  { period: 'April–August', description: 'Admission decisions communicated' },
  { period: 'July–September', description: 'Final IB results and enrollment' }
]

// FAQ data
const faqs = [
  {
    question: 'Is the IB Diploma recognized in Belgium?',
    answer:
      'Yes. In the Flemish Community it is automatically recognized as equivalent to the Flemish secondary certificate. In the French Community, an equivalence application is required.',
    source: 'NARIC-Vlaanderen / Fédération Wallonie-Bruxelles',
    sourceUrl: 'https://www.vlaanderen.be/en/naric'
  },
  {
    question: 'Do IB students need a Belgian secondary diploma?',
    answer:
      'No. The IB Diploma is accepted as a standalone qualification. In the Flemish Community, recognition is automatic. In the French Community, an equivalence to the CESS must be obtained.',
    source: 'NARIC-Vlaanderen',
    sourceUrl: 'https://www.vlaanderen.be/en/naric'
  },
  {
    question: 'Are entrance exams required in Belgium for IB students?',
    answer:
      'For most programs, no. However, Medicine and Dentistry require a mandatory entrance exam in both communities. Civil Engineering requires a math exam in the French Community.',
    source: 'Flemish and French Community regulations',
    sourceUrl: 'https://www.studyinflanders.be/practical-information/admission-requirements'
  },
  {
    question: 'What languages can IB students study in at Belgian universities?',
    answer:
      'Programs are offered in Dutch (Flemish Community), French (French Community), and some in English. Language proficiency is required in the language of instruction.',
    source: 'Study in Flanders',
    sourceUrl: 'https://www.studyinflanders.be/'
  },
  {
    question: 'Is there a national IB cut-off score for Belgium?',
    answer:
      'No. There is no national minimum IB score. Each university sets its own admission criteria, though most require the full IB Diploma (minimum 24 points).',
    source: 'University admission policies',
    sourceUrl: 'https://www.kuleuven.be/english/admissions'
  }
]

export function BelgiumContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇧🇪</span>
              Official University Admission Guide for IB Students (2026)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Belgium with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for university admission in
                Belgium
              </strong>
              , using only official government and institutional sources. It is written exclusively
              for <strong>IB Diploma students and IB Coordinators</strong>.
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

      {/* How Belgium Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Belgium Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Belgium officially recognizes the{' '}
                <strong>International Baccalaureate (IB) Diploma</strong> as a valid secondary
                school qualification for university admission.
              </p>

              <p>
                Belgium has <strong>three linguistic communities</strong>, each with its own
                education system. Recognition rules differ between the{' '}
                <strong>Flemish Community</strong> and the <strong>French Community</strong>.
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl bg-green-50 p-6 border border-green-100">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">
                    🇧🇪 Flemish Community
                  </h3>
                  <p className="text-gray-700">
                    The IB Diploma is <strong>automatically recognized as equivalent</strong> to the
                    Flemish certificate of secondary education. No application is needed.
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-6 border border-amber-100">
                  <h3 className="text-lg font-semibold text-amber-800 mb-3">🇧🇪 French Community</h3>
                  <p className="text-gray-700">
                    An <strong>equivalence application</strong> is required through the Service des
                    Équivalences of the Fédération Wallonie-Bruxelles.
                  </p>
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
                      href="https://www.vlaanderen.be/en/naric"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.vlaanderen.be/en/naric
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.studyinflanders.be/practical-information/admission-requirements"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.studyinflanders.be/practical-information/admission-requirements
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Do IB Students Need a Belgian Secondary Diploma? */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Equivalence</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Do IB Students Need a Belgian Secondary Diploma?
            </p>

            <div className="mt-8">
              <div className="rounded-2xl bg-green-50 p-8 border border-green-100">
                <p className="text-2xl font-bold text-green-800 mb-4">No.</p>
                <p className="text-gray-700">
                  IB students <strong>do not need a Belgian secondary diploma</strong> (CESS or
                  Flemish equivalent) to apply to Belgian universities.
                </p>
                <p className="mt-4 text-gray-700">
                  The IB Diploma is accepted as a{' '}
                  <strong>standalone secondary qualification</strong>.
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-amber-800 font-medium">French Community Requirement</p>
                    <p className="mt-1 text-gray-700">
                      For universities in the French Community, IB students must apply for an{' '}
                      <strong>equivalence of their diploma</strong> through the Service des
                      Équivalences (application period: November 15 – July 15).
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
                      href="https://www.vlaanderen.be/en/naric"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.vlaanderen.be/en/naric
                    </a>
                    <span className="text-gray-500"> — Flemish automatic recognition</span>
                  </li>
                  <li className="text-gray-500">
                    Service des Équivalences, Fédération Wallonie-Bruxelles — French Community
                    equivalence
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Admission System in Belgium */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Admission System</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              University Admission System in Belgium
            </p>

            <div className="mt-8 rounded-2xl bg-amber-50 p-8 border border-amber-100">
              <p className="text-gray-700">
                Belgium does <strong>not</strong> use a centralized national admissions platform.
              </p>
            </div>

            <p className="mt-6 text-gray-600">Admission is organized by:</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Individual universities</strong> within each linguistic community
                </span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  The <strong>Flemish Community</strong> (automatic IB recognition, direct
                  application to universities)
                </span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  The <strong>French Community</strong> (equivalence required before application)
                </span>
              </div>
            </div>

            <p className="mt-6 text-gray-600">
              There is <strong>no national IB cut-off score</strong>. Each university defines its
              own admission criteria based on the IB Diploma.
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.kuleuven.be/english/admissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.kuleuven.be/english/admissions
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.vub.be/en/studying-vub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.vub.be/en/studying-vub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* IB Grade Evaluation */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Grade Evaluation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              IB Grade Evaluation in Belgium
            </p>

            <div className="mt-8 rounded-2xl bg-blue-50 p-8 border border-blue-100">
              <p className="text-gray-800 font-medium">
                Belgian universities evaluate IB results <strong>independently</strong>.
              </p>
            </div>

            <p className="mt-6 text-gray-600">Common practices include:</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  Using <strong>total IB score (24–45)</strong> for baseline assessment
                </span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  Reviewing <strong>HL subject grades</strong> for program-specific prerequisites
                </span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  Applying <strong>institution-specific criteria</strong> (not standardized across
                  Belgium)
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-amber-50 p-6 border border-amber-100">
              <p className="text-amber-800 font-medium">
                ⚠️ There is <strong>no official Belgium-wide IB grade conversion table</strong>.
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
                    href="https://www.kuleuven.be/english/admissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.kuleuven.be/english/admissions
                  </a>
                </li>
                <li className="text-gray-500">
                  Individual university IB policies (e.g., KU Leuven, ULB, Ghent, VUB)
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
              <div className="rounded-2xl bg-amber-50 p-8 border border-amber-100">
                <p className="text-2xl font-bold text-amber-800 mb-4">
                  Required for some programs.
                </p>
                <p className="text-gray-700">
                  Most undergraduate programs in Belgium do <strong>not</strong> require entrance
                  exams. However, certain competitive fields have{' '}
                  <strong>mandatory entrance examinations</strong>.
                </p>
              </div>

              <div className="mt-8 space-y-6">
                {/* Medicine & Dentistry */}
                <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    🏥 Medicine & Dentistry
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
                      <p className="font-medium text-gray-900 mb-2">Flemish Community</p>
                      <p className="text-gray-600 text-sm">
                        Mandatory <strong>Toelatingsexamen Arts en Tandarts</strong> (entrance exam
                        for Medicine and Dentistry), conducted in Dutch. Covers sciences and general
                        competencies.
                      </p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
                      <p className="font-medium text-gray-900 mb-2">French Community</p>
                      <p className="text-gray-600 text-sm">
                        Mandatory <strong>concours d&apos;entrée</strong> organized by ARES. Covers
                        biology, chemistry, physics, mathematics, and communication skills.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Civil Engineering */}
                <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    🔧 Civil Engineering (French Community)
                  </h3>
                  <p className="text-gray-600">
                    A <strong>mathematics entrance examination</strong> is required for Civil
                    Engineering (Sciences de l&apos;Ingénieur) programs in the French Community.
                  </p>
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
                      href="https://www.studyinflanders.be/practical-information/admission-requirements"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.studyinflanders.be/practical-information/admission-requirements
                    </a>
                  </li>
                  <li className="text-gray-500">
                    Flemish and French Community entrance exam regulations
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

            <div className="mt-8 rounded-2xl bg-amber-50 p-8 border border-amber-100">
              <p className="text-2xl font-bold text-amber-800 mb-4">
                Yes, language proficiency is required.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Dutch</h3>
                </div>
                <p className="text-gray-600">
                  Required for programs in the <strong>Flemish Community</strong> (KU Leuven, Ghent,
                  VUB, etc.)
                </p>
              </div>

              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Languages className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">French</h3>
                </div>
                <p className="text-gray-600">
                  Required for programs in the <strong>French Community</strong> (ULB, UCLouvain,
                  ULiège, etc.)
                </p>
              </div>

              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">English</h3>
                </div>
                <p className="text-gray-600">
                  Available for select <strong>English-taught programs</strong>, mostly at
                  master&apos;s level
                </p>
              </div>
            </div>

            <p className="mt-6 text-gray-600">
              IB English does <strong>not automatically waive</strong> language requirements.
              Proficiency must be demonstrated per university policy.
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.studyinflanders.be/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.studyinflanders.be/
                  </a>
                </li>
                <li className="text-gray-500">University language policy pages</li>
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
                    <span>Primary destination for IB students</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Community-regulated admission</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>IB Diploma widely accepted</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Low tuition fees for EU citizens</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm">
                  <strong>Examples:</strong>{' '}
                  <span className="text-gray-500">KU Leuven, Ghent, ULB, UCLouvain, VUB</span>
                </p>
              </div>

              {/* Private Universities */}
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Private / Specialized Institutions
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Independent admission criteria</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Tuition fees usually higher</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>IB acceptance varies by institution</span>
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

            <p className="mt-6 text-gray-600">Typical application requirements:</p>

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
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.kuleuven.be/english/admissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.kuleuven.be/english/admissions
                  </a>
                </li>
                <li className="text-gray-500">Individual university admission checklists</li>
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
              Typical timeline across Belgian universities:
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
                ⚠️ Deadlines vary by university and community. Always check the specific
                university&apos;s admission calendar.
              </p>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              <strong>Source:</strong> University admission calendars
            </p>
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
                  how IB Match evaluates Belgian admission
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
            <div className="text-4xl mb-4">🇧🇪</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in Belgium?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover Belgian university programs that match your IB profile. Search by IB points,
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
                href="/programs/search?country=BE"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in Belgium
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
