'use client'

/**
 * Switzerland Content Component
 *
 * Client component containing all content sections for the Switzerland IB landing page.
 * Content is based on official Swiss university and government sources as specified
 * in the SEO materials document.
 *
 * @see /docs/countries/switzerland-ib-seo-materials.md
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
  GraduationCap
} from 'lucide-react'

// Required documents
const requiredDocuments = [
  'Official IB Diploma certificate (or predicted grades if applying before results)',
  'Academic transcripts showing subjects and level (HL/SL)',
  'Proof of language proficiency (German, French, or English, as required)',
  'Identification (passport)',
  'Any programme-specific materials (e.g., portfolio for arts)'
]

// FAQ data
const faqs = [
  {
    question: 'How is the IB diploma recognized in Switzerland?',
    answer:
      'Swiss universities accept the IB Diploma as a foreign upper secondary qualification, evaluated institution-by-institution.',
    source: 'Swissuniversities admission info',
    sourceUrl: 'https://www.anerkennung.swiss/en/info/studying'
  },
  {
    question: 'Do IB students need a Swiss Maturity?',
    answer: 'No; the IB Diploma can serve as an equivalent admission qualification.',
    source: 'Swiss recognition guidance',
    sourceUrl: 'https://www.anerkennung.swiss/en/info/studying'
  },
  {
    question: 'Is there a national IB score conversion in Switzerland?',
    answer:
      'No; universities determine criteria such as 32/42 IB points, subject prereqs, or exams themselves.',
    source: 'University policies and Swissuniversities info',
    sourceUrl:
      'https://www.unibas.ch/en/Studies/Before-My-Studies/Application-Admission/Admission/Admission-to-the-bachelor-s-degree-program/Admission-to-bachelor-s-studies-with-foreign-educational-qualifications/Admission-with-the-International-Baccalaureate-Diploma-IB.html'
  },
  {
    question: 'Can IB students study medicine in Switzerland?',
    answer:
      'Yes, but medicine programs may have extra admissions requirements such as tests or higher entry standards set by the university.',
    source: 'Swiss university admissions policies',
    sourceUrl:
      'https://www.swissuniversities.ch/en/topics/studying/admission-to-universities/countries-1'
  },
  {
    question: 'Is German or French required?',
    answer:
      'Yes; Swiss universities generally require proficiency in the language of instruction; English-taught programs require English proficiency.',
    source: 'University language policy expectations',
    sourceUrl: 'https://www.orientation.ch/dyn/show/245488'
  }
]

export function SwitzerlandContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇨🇭</span>
              Official University Admission Guide for IB Students (2027)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Switzerland with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for admission to Swiss
                universities
              </strong>
              , using only{' '}
              <strong>official Swiss higher-education and institutional sources</strong>.
              Switzerland&apos;s system is <strong>decentralized</strong>, meaning that universities
              determine their own admission policies for foreign qualifications, including the IB
              Diploma.
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

      {/* How Switzerland Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Switzerland Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Swiss universities accept the{' '}
                <strong>International Baccalaureate (IB) Diploma</strong> as a{' '}
                <strong>foreign upper secondary school-leaving certificate</strong> for university
                admission when it meets each institution&apos;s academic criteria and subject
                requirements.
              </p>

              <p>
                Swiss universities evaluate foreign qualifications individually within the framework
                of general university entry criteria outlined by <strong>Swissuniversities</strong>,
                the umbrella body for Swiss universities and coordination of admission policies.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Source
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.swissuniversities.ch/en/topics/studying/admission-to-universities/countries-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Swissuniversities — Admission requirements by country
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Do IB Students Need a Swiss Maturity? */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Swiss Maturity</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Do IB Students Need a Swiss Maturity?
            </p>

            <div className="mt-8">
              <div className="rounded-2xl bg-green-50 p-8 border border-green-100">
                <p className="text-2xl font-bold text-green-800 mb-4">No.</p>
                <p className="text-gray-700">
                  IB students do <strong>not</strong> need a Swiss <em>Maturität</em> (Swiss
                  maturity certificate) to apply to Swiss universities. The IB Diploma is recognized
                  as <strong>equivalent to upper secondary school leaving</strong> by universities
                  and can be used to satisfy the basic admission entitlement and academic
                  eligibility.
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
                      href="https://www.anerkennung.swiss/en/info/studying"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      anerkennung.swiss — Studying in Switzerland
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Admission Requirements in Switzerland */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Admission Requirements
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              University Admission Requirements in Switzerland
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Swiss universities set <strong>their own admission requirements</strong> for foreign
                qualifications, including the IB Diploma. There is{' '}
                <strong>no single national admission authority</strong> for university entry;
                instead, each public university defines how IB results fulfill entry criteria.
              </p>

              <div className="rounded-2xl bg-blue-50 p-6 border border-blue-100">
                <p className="text-gray-800 font-medium">
                  For example, the <strong>University of Basel</strong> states that an upper
                  secondary school-leaving certificate (such as the IB Diploma) is considered for
                  bachelor&apos;s studies and evaluated using the institution&apos;s regulations.
                </p>
              </div>

              <div className="mt-2 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.anerkennung.swiss/en/info/studying"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      anerkennung.swiss — Studying in Switzerland
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.unibas.ch/en/Studies/Before-My-Studies/Application-Admission/Admission/Admission-to-the-bachelor-s-degree-program/Admission-to-bachelor-s-studies-with-foreign-educational-qualifications/Admission-with-the-International-Baccalaureate-Diploma-IB.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      University of Basel — IB Diploma admission
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subject and Score Expectations for IB Students */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Score Expectations</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Subject and Score Expectations for IB Students
            </p>

            <div className="mt-8">
              <div className="rounded-2xl bg-amber-50 p-8 border border-amber-100">
                <p className="text-amber-800 font-medium">
                  ⚠️ There is <strong>no national IB score conversion table</strong> in Switzerland
                  like some other countries have.
                </p>
              </div>

              <div className="mt-6 space-y-6 text-base leading-7 text-gray-600">
                <p>Instead:</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Universities often require a total of at least{' '}
                      <strong>32 out of 42 IB points</strong> (excluding core points) for generic
                      eligibility
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Competitive programs (e.g., science/engineering) may stipulate{' '}
                      <strong>subject prerequisites</strong> such as HL Mathematics or Natural
                      Sciences
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Specific score expectations vary by institution and by degree program
                    </span>
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
                      href="https://www.unibas.ch/en/Studies/Before-My-Studies/Application-Admission/Admission/Admission-to-the-bachelor-s-degree-program/Admission-to-bachelor-s-studies-with-foreign-educational-qualifications/Admission-with-the-International-Baccalaureate-Diploma-IB.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      University of Basel — IB Diploma admission
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.swissuniversities.ch/en/topics/studying/admission-to-universities/countries-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Swissuniversities — International Baccalaureate
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Requirements for IB Students */}
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
                Yes — language proficiency is required.
              </p>
            </div>

            <p className="mt-6 text-gray-600">
              Since Swiss universities teach in <strong>German, French, or English</strong>{' '}
              depending on location and program:
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">German</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  German-taught programs require <strong>German proficiency</strong> (often B2 or C1
                  CEFR)
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">French</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  French-taught programs require <strong>French proficiency</strong> (often B2 or
                  better)
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Languages className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">English</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Some English-taught programs require <strong>IELTS, TOEFL</strong>, or equivalent
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              Language criteria are set by each university and must be met in addition to the IB
              academic requirements.
            </p>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Source
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.orientation.ch/dyn/show/245488"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    orientation.ch — University admission with foreign qualifications
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Exams and Selection Procedures */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Admission Exams</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Admission Exams and Selection Procedures
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Swiss universities may apply <strong>additional selection procedures</strong> for
                competitive programs such as medicine or engineering:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Some institutions require <strong>entrance examinations</strong> if academic
                    credentials do not fully meet entry conditions
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Others may require <strong>portfolio submissions</strong> for arts programs
                  </span>
                </div>
              </div>

              <p>These are set by individual universities.</p>

              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Source
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.swissuniversities.ch/en/topics/studying/admission-to-universities/countries-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Swissuniversities — Admission requirements by country
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public vs Private Institutions for IB Students */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Institution Types</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Public vs Private Institutions for IB Students
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
                    <span>Cantonal universities, ETH/EPFL</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Define own admission rules for foreign qualifications</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Admission criteria must be met per program</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm">
                  <strong>Source:</strong>{' '}
                  <a
                    href="https://www.swissuniversities.ch/en/topics/studying/admission-to-universities/countries-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    swissuniversities.ch
                  </a>
                </p>
              </div>

              {/* Private Institutions */}
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Private Institutions</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Also accept the IB Diploma</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Rules may vary significantly</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Always check the institution&apos;s official admissions info</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents for IB Students */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Documentation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Required Documents for IB Students
            </p>

            <p className="mt-6 text-gray-600">Typical requirements include:</p>

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
              <p className="text-amber-800 text-sm">
                ⚠️ Universities may require <strong>certified translations</strong> and attestations
                if original documents are not in the language of instruction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Timeline and Process */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Timeline</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Application Timeline and Process
            </p>

            <div className="mt-8 rounded-2xl bg-amber-50 p-8 border border-amber-100">
              <p className="text-gray-700">
                Switzerland does <strong>not</strong> operate a centralized application portal for
                all universities. Each institution has its{' '}
                <strong>own application system and deadlines</strong>.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Fall intake (September)</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Most Swiss universities have their main intake in September
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900">University-specific deadlines</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Deadlines and processes are published directly by each university
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Apply directly</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Applicants should consult the official admissions page of each target university
                    for exact dates and timelines
                  </p>
                </div>
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
                    href="https://www.anerkennung.swiss/en/info/studying"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    anerkennung.swiss — Studying in Switzerland
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
                  how IB Match evaluates Swiss admission
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
            <div className="text-4xl mb-4">🇨🇭</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in Switzerland?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover Swiss university programs that match your IB profile. Search by IB points,
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
                href="/programs/search?country=CH"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in Switzerland
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
