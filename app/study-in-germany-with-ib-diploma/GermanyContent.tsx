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
  {
    requirement: 'Two languages',
    description:
      'At level A or B, and at least one of them an advanced foreign language: Language A, or Language B at HL'
  },
  {
    requirement: 'Mathematics',
    description:
      'Analysis and Approaches or Applications and Interpretation. Since the 2021 exams, either course at SL gives access only to subjects outside mathematics, science and engineering, unless your school is on the KMK list of exceptions'
  },
  { requirement: 'One natural science', description: 'Biology, Chemistry, or Physics' },
  {
    requirement: 'One social science',
    description:
      'History, Geography, Economics, Psychology, Philosophy, Social and Cultural Anthropology, Business Management, or Global Politics'
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
  {
    period: 'Autumn 2026 – January 2027',
    description:
      'Research programs and check that your IB subjects meet the KMK conditions. Check deadlines early: universities may admit international applicants who are not treated as German applicants (in general, non-EU citizens) once a year, with 15 January as the only application date.'
  },
  {
    period: 'Spring 2027',
    description:
      'Winter-semester applications open. hochschulstart had not published its 2027/28 dates when this page was updated; in 2026 its application phase opened on 27 April.'
  },
  {
    period: 'Mid-July 2027',
    description:
      'Many universities close winter-semester applications on 15 July. At hochschulstart the 2026 deadline was 15 July for school-leaving certificates issued after 15 January 2026, and 31 May for older ones.'
  },
  {
    period: 'Late July – September 2027',
    description:
      'Offers and enrollment. In 2026 hochschulstart sent offers from 16 July to 20 August, then filled remaining places until 30 September.'
  }
]

// FAQ data
const faqs = [
  {
    question: 'Is uni-assist mandatory for IB students in Germany?',
    answer: 'No. Only universities that use uni-assist require it.',
    source: 'uni-assist',
    sourceUrl: 'https://www.uni-assist.de'
  },
  {
    question: 'Do IB students need Studienkolleg?',
    answer:
      "No, if your IB Diploma meets the KMK's subject and grade conditions. If it does not, you must pass an additional examination (the Feststellungsprüfung, for which a Studienkolleg prepares you).",
    source: 'KMK — Access to higher education',
    sourceUrl:
      'https://www.kmk.org/zab/central-office-for-foreign-education/general-information-about-recognition/publications-and-decisions/access-to-higher-education/'
  },
  {
    question: 'Can IB students study Medicine in Germany?',
    answer:
      'Yes, but places are highly competitive. EU and EEA citizens apply for Medicine, Dentistry, Veterinary Medicine and Pharmacy through hochschulstart, like German applicants. Other international applicants apply to the university directly or through uni-assist.',
    source: 'hochschulstart — International applicants (in German)',
    sourceUrl: 'https://www.hochschulstart.de/informieren-planen/internationale-bewerbende'
  },
  {
    question: 'Is German mandatory for all programs?',
    answer:
      'No. English-taught programs exist, but language proof is required. International applicants must show German proficiency at enrolment for German-taught programs.',
    source: 'hochschulstart — International applicants (in German)',
    sourceUrl: 'https://www.hochschulstart.de/informieren-planen/internationale-bewerbende'
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
              Official University Admission Guide for IB Students (2027)
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
                      href="https://www.kmk.org/zab/central-office-for-foreign-education/general-information-about-recognition/publications-and-decisions/access-to-higher-education/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      KMK — Access to higher education (includes the IB agreement)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://anabin.kmk.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      anabin — KMK recognition database
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
                      anabin — KMK recognition database
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.kmk.org/zab/central-office-for-foreign-education/general-information-about-recognition/publications-and-decisions/access-to-higher-education/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      KMK — Access to higher education (includes the IB agreement)
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
              The KMK also requires that at least one of your three{' '}
              <strong>Higher Level (HL) subjects</strong> is a language, mathematics or a natural
              science (from the 2025 exams); that all six subjects were studied for the full two
              years; and that you have at least <strong>grade 4 in all six</strong>. One grade 3 can
              be offset by a 5 in another subject at the same or a higher level, with at least 24
              points in total. These rules come from the KMK agreement on the IB Diploma (1986, as
              amended on 15 June 2023) and apply nationwide.
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/aktuell/283_Vereinb_Anerkenn_Int_Baccalaureate_Diploma-2023-06-15_Liste1-2026-03-26_Liste2-2026-05-22_ENGL.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    KMK — Agreement on the recognition of the IB Diploma (English translation, PDF)
                  </a>
                </li>
                <li>
                  <a
                    href="https://anabin.kmk.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    anabin — KMK recognition database
                  </a>
                </li>
              </ul>
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
                Germany converts your IB total into a German grade with a{' '}
                <strong>single national formula</strong>, set by the KMK.
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

            <p className="mt-6 text-gray-600">
              The KMK formula is <strong>N = 1 + 3 × (42 − P) / (42 − 24)</strong>, where P is your
              IB total including bonus points. 24 points give a German grade of 4.0, and 42 to 45
              points give 1.0. This is the grade that counts where a program selects by grade
              (Numerus Clausus).
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.kmk.org/zab/central-office-for-foreign-education/general-information-about-recognition/publications-and-decisions/access-to-higher-education/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    KMK — Access to higher education (includes the IB agreement)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.hochschulstart.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    hochschulstart
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/aktuell/283_Vereinb_Anerkenn_Int_Baccalaureate_Diploma-2023-06-15_Liste1-2026-03-26_Liste2-2026-05-22_ENGL.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    KMK — Agreement on the recognition of the IB Diploma (English translation, PDF)
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
                uni-assist
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
                    hochschulstart
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
                    href="https://www.kmk.org/zab/central-office-for-foreign-education/general-information-about-recognition/publications-and-decisions/access-to-higher-education/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    KMK — Access to higher education (includes the IB agreement)
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
                    anabin — KMK recognition database
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.uni-assist.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    uni-assist
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

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.hochschulstart.de/bewerben-beobachten/termine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    hochschulstart — Dates and deadlines (in German)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.hochschulstart.de/informieren-planen/internationale-bewerbende"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    hochschulstart — International applicants (in German)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.uni-assist.de/en/how-to-apply/plan-your-application/deadlines-processing-time/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    uni-assist — Deadlines and processing time
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
                href="/programs/search?countries=cmip2am54000j7m188af1eso7"
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
