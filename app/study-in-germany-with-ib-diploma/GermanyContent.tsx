'use client'

/**
 * Germany Content Component
 *
 * Client component for the Germany IB landing page.
 * Follows design patterns from /how-it-works and Spain landing page
 */

import Link from 'next/link'
import {
  CheckCircle2,
  FileText,
  Building2,
  ArrowRight,
  Search,
  BookOpen,
  ExternalLink,
  Languages
} from 'lucide-react'

// IB Subject requirements
const subjectRequirements = [
  { requirement: 'Two languages', description: 'At least two language subjects required' },
  { requirement: 'Mathematics', description: 'AA or AI, depending on field of study' },
  { requirement: 'One natural science', description: 'Biology, Chemistry, or Physics' },
  {
    requirement: 'One social/humanities subject',
    description: 'History, Geography, Economics, etc.'
  }
]

// Required documents
const requiredDocuments = [
  'IB Diploma or predicted grades',
  'Academic transcripts',
  'Passport or ID',
  'Subject confirmation (per Anabin)',
  'uni-assist VPD (if required by the university)'
]

// Application timeline
const timelineSteps = [
  { period: 'December–January', description: 'Program research' },
  { period: 'February–March', description: 'Applications open' },
  { period: 'July', description: 'NC results and offers' },
  { period: 'August–October', description: 'Enrollment' }
]

// FAQ data
const faqs = [
  {
    question: 'Is uni-assist mandatory for IB students in Germany?',
    answer: 'No. Only universities that use uni-assist require it.',
    source: 'https://www.uni-assist.de'
  },
  {
    question: 'Do IB students need Studienkolleg?',
    answer: 'No, if IB subject requirements are fulfilled.',
    source: 'https://anabin.kmk.org'
  },
  {
    question: 'Can IB students study Medicine in Germany?',
    answer: 'Yes, but subject requirements and NC thresholds are very high.',
    source: 'https://www.hochschulstart.de'
  },
  {
    question: 'Is German mandatory for all programs?',
    answer: 'No. English-taught programs exist, but language proof is required.',
    source: 'https://www.hochschulstart.de'
  }
]

export function GermanyContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇩🇪</span>
              Official University Admission Guide for IB Students (2026)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Germany with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for university admission in
                Germany
              </strong>
              , using only official public sources. It is written exclusively for{' '}
              <strong>IB Diploma students and IB Coordinators</strong>.
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

      {/* How Germany Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Germany Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Germany officially recognizes the{' '}
                <strong>International Baccalaureate (IB) Diploma</strong> as a foreign secondary
                school qualification that can grant{' '}
                <strong>
                  direct university access (<em>Hochschulzugang</em>)
                </strong>
                .
              </p>

              <p>
                The legal recognition framework is defined by the{' '}
                <strong>
                  Standing Conference of the Ministers of Education and Cultural Affairs (KMK)
                </strong>{' '}
                and published in the national Anabin database.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.kmk.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.kmk.org
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://anabin.kmk.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://anabin.kmk.org
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Do IB Students Need Studienkolleg? */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Studienkolleg</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Do IB Students Need Studienkolleg?
            </p>

            <div className="mt-8">
              <div className="rounded-2xl bg-green-50 p-8 border border-green-100">
                <p className="text-2xl font-bold text-green-800 mb-4">Usually no.</p>
                <p className="text-gray-700">
                  IB students <strong>do not need to attend Studienkolleg</strong> if their IB
                  Diploma subject combination meets Germany&apos;s official university entrance
                  requirements.
                </p>
                <p className="mt-4 text-gray-700">
                  If the required IB subjects are <strong>missing</strong>, Studienkolleg may be
                  required before university admission.
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
                      href="https://anabin.kmk.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://anabin.kmk.org
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.kmk.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.kmk.org
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IB Subject Requirements for Germany */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Subject Requirements
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              IB Subject Requirements for Germany
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Germany applies <strong>nationwide subject requirements</strong> for IB-based
              university access. The IB Diploma must include:
            </p>

            <div className="mt-8 space-y-4">
              {subjectRequirements.map((item) => (
                <div
                  key={item.requirement}
                  className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.requirement}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-gray-600">
              Certain fields (Medicine, Engineering, Natural Sciences) require{' '}
              <strong>specific Higher Level (HL) subjects</strong>. These rules are defined by the
              KMK and apply to all public universities.
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Source
              </h4>
              <a
                href="https://anabin.kmk.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                https://anabin.kmk.org
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* University Admission System in Germany */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Admission System</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              University Admission System in Germany
            </p>

            <div className="mt-8 rounded-2xl bg-amber-50 p-8 border border-amber-100">
              <p className="text-gray-700">
                Germany does <strong>not</strong> use a centralized IB points conversion system.
              </p>
            </div>

            <p className="mt-6 text-gray-600">Admission is based on:</p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-6 border border-gray-200">
                <p className="font-semibold text-gray-900">Formal Recognition</p>
                <p className="mt-1 text-sm text-gray-600">Recognition of the IB Diploma</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-6 border border-gray-200">
                <p className="font-semibold text-gray-900">Subject Requirements</p>
                <p className="mt-1 text-sm text-gray-600">Fulfillment of subject requirements</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-6 border border-gray-200">
                <p className="font-semibold text-gray-900">Grade Conversion</p>
                <p className="mt-1 text-sm text-gray-600">Conversion into the German scale</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-6 border border-gray-200">
                <p className="font-semibold text-gray-900">Numerus Clausus</p>
                <p className="mt-1 text-sm text-gray-600">Program-specific selection criteria</p>
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
                    href="https://www.kmk.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.kmk.org
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.hochschulstart.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.hochschulstart.de
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* uni-assist and IB Applications */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">uni-assist</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              uni-assist and IB Applications in Germany
            </p>

            <div className="mt-8 rounded-2xl bg-blue-50 p-8 border border-blue-100">
              <p className="text-gray-800 font-medium">
                uni-assist is an <strong>application processing service</strong>, not a recognition
                authority.
              </p>
            </div>

            <p className="mt-6 text-gray-600">
              Some German universities require IB students to apply through{' '}
              <strong>uni-assist</strong>, which:
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Collects application documents</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Verifies formal completeness</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Converts IB grades into the German grading scale</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  Issues a <strong>VPD (Vorprüfungsdokumentation)</strong>
                </span>
              </div>
            </div>

            <p className="mt-6 text-gray-600">
              uni-assist applies <strong>Anabin / KMK rules</strong>, but does not define them.
              Universities make the final admission decision.
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Source
              </h4>
              <a
                href="https://www.uni-assist.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                https://www.uni-assist.de
              </a>
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
                Yes, language proficiency is usually required.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">German-taught programs</h3>
                </div>
                <p className="text-gray-600">
                  <strong>C1 German</strong> required (TestDaF or DSH)
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <Languages className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">English-taught programs</h3>
                </div>
                <p className="text-gray-600">English certification may still be required</p>
              </div>
            </div>

            <p className="mt-6 text-gray-600">
              Language requirements are set by individual universities.
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.hochschulstart.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.hochschulstart.de
                  </a>
                </li>
                <li className="text-gray-500">University admission pages</li>
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
                    <span>Strict application of Anabin rules</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>NC applies to many programs</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Language certification required</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm">
                  <strong>Source:</strong>{' '}
                  <a
                    href="https://www.kmk.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.kmk.org
                  </a>
                </p>
              </div>

              {/* Private Universities */}
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
                    <span>Independent admission procedures</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Subject rules may be more flexible</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Tuition fees usually apply</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anabin, uni-assist, and Required Documents */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Documentation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Anabin, uni-assist, and Required Documents
            </p>

            <p className="mt-6 text-gray-600">Typical required documents for IB students:</p>

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
                    href="https://anabin.kmk.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://anabin.kmk.org
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.uni-assist.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.uni-assist.de
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

            <p className="mt-6 text-lg leading-8 text-gray-600">Typical timeline for Germany:</p>

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

            <p className="mt-6 text-sm text-gray-600">
              <strong>Source:</strong>{' '}
              <a
                href="https://www.hochschulstart.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://www.hochschulstart.de
              </a>
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
                      href={faq.source}
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
                  how IB Match evaluates German admission
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
            <div className="text-4xl mb-4">🇩🇪</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in Germany?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover German university programs that match your IB profile. Search by IB points,
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
                href="/programs/search?country=DE"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in Germany
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
