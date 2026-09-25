'use client'

/**
 * Italy Content Component
 *
 * Client component for the Italy IB landing page.
 * Follows design patterns from Spain and Germany landing pages
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
  ClipboardCheck,
  AlertTriangle
} from 'lucide-react'

// MUR procedures for international students, valid for 2026–27 and 2027–28
const PROCEDURES_URL = 'https://www.universitaly.it/it/studenti-stranieri'
const CIRCULAR_URL =
  'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf'
const ANNEX_1_URL =
  'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf'

// Restricted programs requiring entrance exams
const restrictedPrograms = [
  {
    name: 'Medicine and Surgery, Dentistry, Veterinary Medicine (taught in Italian)',
    exam: 'Open first semester (semestre aperto): you enrol, then pass national exams in Biology, Chemistry and biochemistry, and Physics to continue'
  },
  {
    name: 'Medicine and Surgery, Dentistry, Veterinary Medicine (taught in English)',
    exam: 'National admission test (IMAT)'
  },
  { name: 'Architecture', exam: "Admission test set in each university's call for applications" },
  {
    name: 'Primary Education Sciences',
    exam: "Admission test set in each university's call for applications"
  }
]

// Required documents
const requiredDocuments = [
  'IB Diploma (IB Diploma Programme Course Results do not give access)',
  "Attestato di Corrispondenza for your IB Diploma, free from CIMEA's ARDI platform",
  'CIMEA verification of your IB Diploma (attestato di verifica)',
  'Passport or ID',
  'Proof of language level: Italian at B2 or higher for courses taught in Italian, or a certificate in the language of the course'
]

// Application timeline
const timelineSteps = [
  {
    period: 'Before you apply',
    description:
      'Check that your IB Diploma meets the Italian conditions: at least 24 points in six subjects, 12 of them at Higher Level, with TOK, the Extended Essay and CAS passed.'
  },
  {
    period: 'Dates set by each university',
    description:
      'Non-EU applicants who need a visa pre-enrol through Universitaly. Each university sets its own pre-enrolment dates and publishes them on its website.'
  },
  {
    period: 'July–September',
    description:
      'Restricted programs. In 2026, registration for the Italian-taught semestre aperto ran from 13 July to 3 August, and the English-taught admission test (IMAT) was held at the end of September. The 2027 dates are not yet published.'
  },
  {
    period: 'By 31 October 2027',
    description:
      'Last day to apply for a study visa for 2027–28 courses. Universities may set earlier dates.'
  }
]

// FAQ data
const faqs = [
  {
    question: 'Are predicted IB grades accepted in Italy?',
    answer:
      'Universities assess applications themselves, so ask each one whether it accepts predicted grades. Access itself depends on the final IB Diploma: CIMEA verifies the Diploma only once it has been awarded and meets the Italian conditions.',
    source: 'MUR — Procedures for international students, Annex 1 (PDF, in Italian)',
    sourceUrl: ANNEX_1_URL
  },
  {
    question: 'Can IB students study Medicine in Italy?',
    answer:
      'Yes. Italian-taught Medicine, Dentistry and Veterinary Medicine now start with an open first semester (semestre aperto): you enrol, then pass national exams in Biology, Chemistry and biochemistry, and Physics to continue. English-taught programs use a national admission test (IMAT).',
    source: 'MUR — Registration opens for the semestre aperto 2026–27 (in Italian)',
    sourceUrl:
      'https://www.mur.gov.it/it/news/lunedi-13072026/medicina-al-le-iscrizioni-al-semestre-aperto'
  },
  {
    question: 'Is Italian mandatory for all programs?',
    answer:
      'No. For courses taught in Italian, each university tests your Italian at level B2 or higher, unless you are exempt, for example with a recognised B2 certificate. For courses taught in another language, you show a certificate in that language instead.',
    source: 'MUR — Procedures for international students (PDF, in Italian)',
    sourceUrl: CIRCULAR_URL
  },
  {
    question: 'Is CIMEA mandatory for IB students?',
    answer:
      "Yes, in practice. For the IB Diploma, the MUR procedures tell universities to ask for the Attestato di Corrispondenza, which is free on CIMEA's ARDI platform, and CIMEA's verification, instead of a Dichiarazione di valore.",
    source: 'MUR — Procedures for international students, Annex 1 (PDF, in Italian)',
    sourceUrl: ANNEX_1_URL
  }
]

export function ItalyContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇮🇹</span>
              Official University Admission Guide for IB Students (2027)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Italy with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for university admission in
                Italy
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

      {/* How Italy Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Italy Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Italy accepts the <strong>International Baccalaureate (IB) Diploma</strong> for
                access to higher education if it meets the conditions set by the{' '}
                <strong>Ministry of Universities and Research (MUR)</strong> in its procedures for
                international students, which cover 2026–27 and 2027–28:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    At least <strong>24 points in six subjects</strong>, 12 of them at Higher Level
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Theory of Knowledge, the Extended Essay and CAS passed</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    The IB started after the second-to-last year of secondary school (the 11th year
                    in a 12-year school system)
                  </span>
                </li>
              </ul>

              <p>
                IB Diploma Programme Course Results do not give access. Each university decides on
                admission itself and relies on <strong>CIMEA</strong>, the Italian ENIC-NARIC
                centre, to verify foreign diplomas, including the IB.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href={ANNEX_1_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      MUR — Procedures for international students, Annex 1 (PDF, in Italian)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.cimea.it"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      CIMEA — Italian ENIC-NARIC centre
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Do IB Students Need the Italian Maturità? */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Maturità Exemption</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Do IB Students Need the Italian Maturità?
            </p>

            <div className="mt-8">
              <div className="rounded-2xl bg-green-50 p-8 border border-green-100">
                <p className="text-2xl font-bold text-green-800 mb-4">No.</p>
                <p className="text-gray-700">
                  IB students{' '}
                  <strong>do not need to obtain the Italian Maturità (Esame di Stato)</strong>. An
                  IB Diploma that meets the MUR conditions gives access to Italian higher education
                  on its own.
                </p>
                <p className="mt-4 text-gray-700">
                  Diplomas from IB schools in Italy on the Ministry of Education&apos;s list under
                  Law 738/1986 are equivalent to the Italian school-leaving diploma.
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
                      href={ANNEX_1_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      MUR — Procedures for international students, Annex 1 (PDF, in Italian)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Admission System in Italy */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Admission System</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              University Admission System in Italy
            </p>

            <div className="mt-8 rounded-2xl bg-amber-50 p-8 border border-amber-100">
              <p className="text-gray-700">
                Italy does <strong>not</strong> use a centralized points-based admission system.
              </p>
              <p className="mt-4 text-gray-700">
                There is <strong>no national IB score conversion table</strong> equivalent to
                Spain&apos;s 14-point scale.
              </p>
            </div>

            <p className="mt-6 text-gray-600">
              Admission decisions are made <strong>per university and per program</strong>, based
              on:
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Recognition of the IB Diploma</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Program-specific academic requirements</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Entrance exams (for restricted programs)</span>
              </div>
            </div>

            <p className="mt-6 text-gray-600">
              Non-EU students who need a visa <strong>pre-enrol through Universitaly</strong>. Each
              university sets how many places it reserves for them and its own pre-enrolment dates.
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Source
              </h4>
              <a
                href={PROCEDURES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Universitaly — Procedures for international students (in Italian)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Entrance Exams and Restricted Programs */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Entrance Exams</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Entrance Exams and Restricted Programs
            </p>

            <div className="mt-8 rounded-2xl bg-amber-50 p-8 border border-amber-100">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-800 font-medium">
                  Yes, some programs require entrance exams, even for IB students.
                </p>
              </div>
            </div>

            <p className="mt-6 text-gray-600">
              Nationally restricted programs (<em>corsi ad accesso programmato</em>) include:
            </p>

            <div className="mt-6 space-y-4">
              {restrictedPrograms.map((program) => (
                <div
                  key={program.name}
                  className="flex items-start gap-4 rounded-xl bg-gray-50 p-6 border border-gray-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white flex-shrink-0">
                    <ClipboardCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{program.name}</p>
                    <p className="text-sm text-gray-600">{program.exam}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-gray-600">
              The Medicine reform (Law 26/2025) replaced the old national entrance test for
              Italian-taught courses from 2025–26. These requirements apply{' '}
              <strong>regardless of holding an IB Diploma</strong>.
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={CIRCULAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    MUR — Procedures for international students (PDF, in Italian)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mur.gov.it/it/news/lunedi-13072026/medicina-al-le-iscrizioni-al-semestre-aperto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    MUR — Registration opens for the semestre aperto 2026–27 (in Italian)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mur.gov.it/it/news/martedi-07072026/universita-fissate-le-date-delle-prove-dammissione-le-facolta-ad-accesso"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    MUR — Admission test dates for 2026–27 (in Italian)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Language Requirements */}
      <section className="bg-gray-50 py-16 sm:py-24">
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
                Yes, your language level is checked for every course.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Italian-taught programs</h3>
                </div>
                <p className="text-gray-600">
                  Each university tests your Italian at <strong>B2 or higher</strong>. A recognised
                  Italian certificate at B2 or above exempts you from the test.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Languages className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">English-taught programs</h3>
                </div>
                <p className="text-gray-600">
                  No Italian test, but you need a{' '}
                  <strong>certificate in the language of the course</strong>
                </p>
              </div>
            </div>

            <p className="mt-6 text-gray-600">
              The required level and the accepted certificates are set by each university.
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={CIRCULAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    MUR — Procedures for international students (PDF, in Italian)
                  </a>
                </li>
                <li className="text-gray-500">Individual university admission pages</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Public vs Private Universities */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">University Types</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Public vs Private Universities for IB Students
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Public Universities */}
              <div className="rounded-2xl bg-gray-50 p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Public Universities</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Diploma recognition required</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Entrance exams for restricted programs</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Language level checked for every course</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm">
                  <strong>Source:</strong>{' '}
                  <a
                    href={PROCEDURES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Universitaly — Procedures for international students (in Italian)
                  </a>
                </p>
              </div>

              {/* Private Universities */}
              <div className="rounded-2xl bg-gray-50 p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
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
                    <span>The same MUR rules on foreign diplomas</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Program-specific selection criteria</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CIMEA Verification and Required Documents */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Documentation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              CIMEA Verification and Required Documents
            </p>

            <p className="mt-6 text-gray-600">
              For the IB Diploma, the MUR procedures tell universities to ask for{' '}
              <strong>CIMEA documents</strong> instead of a <em>Dichiarazione di valore</em>.
            </p>

            <p className="mt-4 text-gray-600">Typical documents:</p>

            <div className="mt-6 rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
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
                    href={ANNEX_1_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    MUR — Procedures for international students, Annex 1 (PDF, in Italian)
                  </a>
                </li>
                <li>
                  <a
                    href="https://ardi.cimea.it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    CIMEA — ARDI platform
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Timeline */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Timeline</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Application Timeline
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              The main steps for 2027–28 entry, from the MUR procedures and the 2026 calendar:
            </p>

            <div className="mt-8 space-y-4">
              {timelineSteps.map((step, index) => (
                <div
                  key={step.period}
                  className="flex items-center gap-4 rounded-xl bg-gray-50 p-6 border border-gray-200"
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
                href={PROCEDURES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Universitaly — Procedures for international students (in Italian)
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
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
                  className="rounded-xl bg-white p-6 border border-gray-200 shadow-sm"
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
                  how IB Match evaluates Italian admission
                </Link>{' '}
                requirements for your profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-4xl mb-4">🇮🇹</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in Italy?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover Italian university programs that match your IB profile. Search by IB points,
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
                href="/programs/search?countries=cmip2am54000p7m18xgfkk638"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in Italy
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
