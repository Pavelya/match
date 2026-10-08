'use client'

/**
 * France IB Diploma Content Component
 *
 * Official sources used:
 * - eduscol.education.gouv.fr — Ministry of Education (status of the IB in France)
 * - service-public.gouv.fr — the French administration's portal (recognition of foreign diplomas)
 * - campusfrance.org — Campus France, the government agency for international students
 *   (application routes, the DAP calendar and its French requirement, tuition fees)
 * - polytechnique.edu, sciencespo.fr — two institutions' own admission pages (examples)
 *
 * The ministry's own pages (enseignementsup-recherche.gouv.fr), parcoursup.gouv.fr and
 * france-education-international.fr refuse scripted requests, so their content is cited through
 * the Campus France and service-public pages that repeat it.
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

// Required documents for the English-taught bachelor's IB students apply to
const requiredDocuments = [
  'School transcripts for the last two or three years, with IB predicted grades',
  'IB Diploma results, once available (offers are usually conditional until then)',
  'Personal statement or motivation letter, and a CV',
  'One or two academic references (many schools ask for them)',
  'English test score (IELTS, TOEFL or Cambridge), unless your schooling was in English',
  'Passport or national ID, and an application fee (typically €80 to €150)'
]

// Application timeline for the 2027 intake
const timelineSteps = [
  {
    period: 'September – October 2026',
    description:
      "Most English-taught bachelor's open their first application round. École polytechnique's first round ran from 17 September to 20 October 2026; ESSEC's first deadline is 28 October 2026."
  },
  {
    period: '1 October – 15 December 2026',
    description:
      'Applicants from outside the EU who want a first-year licence at a French public university file the preliminary admission request (DAP): online through "Études en France" if they live in one of the countries it covers, otherwise at the French embassy.'
  },
  {
    period: 'November 2026 – April 2027',
    description:
      "Further rounds at most schools, with interviews. Sciences Po's international deadlines are 4 November 2026, 13 January 2027 and 1 March 2027; universities answer DAP applicants by 30 April 2027."
  },
  {
    period: 'January – April 2027',
    description:
      'Parcoursup, the national platform for first-year programmes: register between January and March 2027 and confirm your choices in April. The main admission phase runs from June to July 2027.'
  },
  {
    period: 'September 2027',
    description:
      'Classes start. Students from outside the EU apply for a student visa once admitted, through "Études en France" where it applies.'
  }
]

// FAQ data
const faqs = [
  {
    question: 'Is the IB Diploma recognized for university admission in France?',
    answer:
      'Yes, as a foreign secondary school diploma, but not automatically. The French Ministry of Education describes the IB as a private diploma awarded by the International Baccalaureate Organization that does not give an automatic right of entry to French universities: each institution examines the application. There is no legal equivalence between foreign diplomas and the French baccalauréat.',
    source:
      'Ministry of Education (Eduscol) — FAQ on the French International Baccalaureate (PDF, in French)',
    sourceUrl:
      'https://eduscol.education.gouv.fr/sites/default/files/document/foire-au-question-baccalaureat-francais-international-bfi-101928.pdf'
  },
  {
    question: "Can I study for a bachelor's degree in English in France?",
    answer:
      "Yes, but mostly outside the public universities. Their three-year licences are taught in French. English-taught bachelor's that IB students can enter in the first year are offered by selective schools such as École polytechnique, Sciences Po, Université PSL and the Écoles Centrales, by Toulouse School of Management at Université Toulouse Capitole, and by private business schools. Campus France lists programmes taught in English.",
    source: 'Campus France — Programmes taught in English',
    sourceUrl: 'https://taughtie.campusfrance.org/tiesearch/'
  },
  {
    question: 'Do IB students apply through Parcoursup?',
    answer:
      "It depends on the programme and your nationality. Parcoursup handles first-year programmes for EU students and for selective programmes. Students from outside the EU who want a first-year licence at a university file a preliminary admission request (DAP) between October and December. Most English-taught bachelor's, including those at Polytechnique, Sciences Po and the business schools, take applications from IB students on their own websites.",
    source: 'Campus France — How to apply in an institute of higher education',
    sourceUrl: 'https://www.campusfrance.org/en/application-higher-education-france'
  },
  {
    question: 'Do I need to speak French to study in France with the IB?',
    answer:
      'Not for English-taught programmes, which ask for English instead, usually at B2 or C1. For a French-taught licence at a public university through the DAP, applicants need French at B2, shown by the DELF or DALF or by the TCF, which must be taken before mid-February.',
    source: 'Campus France — First year French university admission procedures',
    sourceUrl:
      'https://www.australie.campusfrance.org/first-year-french-university-admission-procedures'
  },
  {
    question: 'How much does a bachelor’s degree cost in France?',
    answer:
      "At public universities, a bachelor's costs €178 a year for EU, EEA and Swiss students and €2,902 for other students in 2026-2027. Schools that run their own bachelor's, public grandes écoles and private business schools alike, charge more: Campus France gives about €6,000 to €18,000 or more a year for private schools.",
    source: 'Campus France — Tuition fees in France',
    sourceUrl: 'https://www.campusfrance.org/en/tuition-fees-France'
  }
]

export function FranceContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇫🇷</span>
              Official University Admission Guide for IB Students (2027)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in France with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for university admission in
                France
              </strong>
              , using only <strong>official French government and institutional sources</strong>.
              France has <strong>no automatic recognition</strong> of the IB: each institution
              reviews your application. Public university degrees are mostly taught in French, so
              English-taught bachelor&apos;s are found at selective schools that run their own
              admissions.
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

      {/* How France Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How France Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                The French <strong>Ministry of Education</strong> describes the IB as{' '}
                <strong>
                  a private diploma awarded by the International Baccalaureate Organization
                </strong>
                . It does <strong>not</strong> give an automatic right of entry to French
                universities: the institution&apos;s admissions committee examines each application.
              </p>

              <p>
                In practice, the IB Diploma is treated like any other foreign secondary school
                diploma. There is <strong>no legal equivalence</strong> between foreign diplomas and
                French ones. Each institution sets its own admission criteria and decides whether
                your diploma meets them when you apply.
              </p>

              <p>
                This is not a barrier in itself: the English-taught bachelor&apos;s in IB Match are
                designed for applicants with international diplomas, and several, such as Sciences
                Po and École polytechnique, name the IB Diploma explicitly.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://eduscol.education.gouv.fr/sites/default/files/document/foire-au-question-baccalaureat-francais-international-bfi-101928.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Ministry of Education (Eduscol) — FAQ on the French International
                      Baccalaureate, January 2024 (PDF, in French)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.service-public.gouv.fr/particuliers/vosdroits/F463?lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Service-Public.fr — Having a diploma obtained abroad recognized in France
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Do IB Students Need a French Diploma? */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Equivalence</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Do IB Students Need a French Diploma?
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <div className="rounded-2xl bg-amber-50 p-8 border border-amber-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      No — but there is no automatic equivalence either
                    </h3>
                    <p className="mt-2 text-gray-600">
                      You apply with the IB Diploma itself; you do not need the French baccalauréat
                      or an equivalence decision. An institution may ask for an{' '}
                      <strong>attestation of comparability</strong> from ENIC-NARIC France, which
                      compares a foreign diploma with the French system. It is not compulsory and
                      has no legal value: the institution makes the final decision. The request
                      costs €20 to have the file examined and €100 for the assessment.
                    </p>
                  </div>
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
                      href="https://www.service-public.gouv.fr/particuliers/vosdroits/F463?lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Service-Public.fr — Having a diploma obtained abroad recognized in France
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.service-public.gouv.fr/particuliers/vosdroits/R38515?lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Service-Public.fr — Request a certificate of comparability of a foreign
                      diploma
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
              <div className="rounded-2xl bg-amber-50 p-8 border border-amber-100">
                <p className="text-gray-700">
                  France has <strong>three routes into a first-year bachelor&apos;s</strong>, and
                  which one you use depends on the programme and your nationality. For the
                  English-taught programmes most IB students look at, the usual route is the
                  school&apos;s own application.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The school&apos;s own application</strong> — École polytechnique,
                    Sciences Po&apos;s international pathway, the Écoles Centrales and the business
                    schools take IB applicants on their own websites, usually in several rounds,
                    with an interview for those shortlisted
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Parcoursup</strong> — the national platform for first-year programmes,
                    used by EU students, by holders of the French baccalauréat, and for selective
                    programmes; some English-taught bachelor&apos;s also take applications here
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The preliminary admission request (DAP)</strong> — required of students
                    from outside the EU who want a first-year licence at a public university; filed
                    between 1 October and 15 December
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>&ldquo;Études en France&rdquo;</strong> — if you live in one of the 75
                    countries it covers, Campus France&apos;s online procedure also manages your
                    application through to the student visa
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
                      href="https://www.campusfrance.org/en/application-higher-education-france"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Campus France — How to apply in an institute of higher education
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.campusfrance.org/en/application-etudes-en-france-procedure"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Campus France — The &ldquo;Études en France&rdquo; procedure
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://programmes.polytechnique.edu/en/bachelor/admissions/admissions-criteria-and-procedure"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      École polytechnique — Bachelor admissions criteria and procedure (example)
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
              How IB Scores Are Assessed in France
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <div className="rounded-2xl bg-amber-50 p-8 border border-amber-100">
                <p className="text-2xl font-bold text-amber-800 mb-4">
                  No national conversion and few published minimums.
                </p>
                <p className="text-gray-700">
                  France has <strong>no official IB-to-French grade conversion</strong>. The
                  English-taught bachelor&apos;s in IB Match publish no minimum IB score: they read
                  your whole school record, predicted grades and written work, then interview the
                  strongest applicants.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Sciences Po</strong> marks your final or predicted results, your
                    academic record and written pieces, sets a minimum each year after reviewing
                    applications, and has <strong>no subject requirements</strong>
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>École polytechnique</strong> sets no minimum grade but expects a strong
                    average, with <strong>Mathematics at Higher Level</strong> (preferably Analysis
                    and Approaches) and another science at Higher Level
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Where no minimum is published, IB Match shows <strong>24 points</strong>, the
                    Diploma itself, and the program page lists what the school looks for
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
                      href="https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Sciences Po — International undergraduate admissions (2027 intake)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://programmes.polytechnique.edu/en/bachelor/admissions/faq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      École polytechnique — Bachelor of Science FAQ
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
              Entrance Exams for IB Students
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <div className="rounded-2xl bg-amber-50 p-8 border border-amber-100">
                <p className="text-2xl font-bold text-amber-800 mb-4">
                  No national exam — but expect an interview.
                </p>
                <p className="text-gray-700">
                  There is no national entrance exam for IB students. Most English-taught
                  bachelor&apos;s shortlist on the application and then hold an{' '}
                  <strong>interview</strong>, usually online and in English. Some add their own
                  tests.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Interviews:</strong> École polytechnique (about 50 minutes, remote, in
                    English) and Sciences Po (about 25 minutes, including commenting on an image)
                    interview shortlisted applicants
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>School tests:</strong> some programmes set an online mathematics test,
                    aptitude tests or an English assessment before the interview; each program page
                    in IB Match says which
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
                      href="https://programmes.polytechnique.edu/en/bachelor/admissions/admissions-criteria-and-procedure"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      École polytechnique — Bachelor admissions criteria and procedure
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Sciences Po — International undergraduate admissions
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
              Language requirements depend on whether you apply to a <strong>French-taught</strong>{' '}
              or an <strong>English-taught</strong> programme.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">French</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Needed for most <strong>public university licences</strong>, which are taught
                      in French
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Through the DAP, <strong>level B2</strong> is required, shown by the{' '}
                      <strong>DELF B2</strong>, the <strong>DALF</strong> or the{' '}
                      <strong>TCF</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>For the 2027 intake, the TCF must be taken before 15 February 2027</span>
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
                      Required for <strong>English-taught programmes</strong>, usually at{' '}
                      <strong>B2 or C1</strong> (École polytechnique and Sciences Po ask for C1)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Shown by <strong>IELTS</strong>, <strong>TOEFL</strong> or{' '}
                      <strong>Cambridge</strong>; most schools waive the test if your last years of
                      school were taught in English
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>No French needed at entry</strong>; many programmes teach French
                      alongside
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
                    href="https://www.australie.campusfrance.org/first-year-french-university-admission-procedures"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Campus France — First year French university admission procedures (2027/2028)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/language-requirements/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Sciences Po — Language requirements for international applicants
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
              Types of Institutions in France
            </p>

            <p className="mt-6 text-gray-600">
              French higher education has public universities, public grandes écoles and private
              schools. The IB Diploma is accepted by all of them, but fees and the language of
              teaching differ widely.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Public Institutions</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Universities</strong> charge national fees for a bachelor&apos;s:{' '}
                      <strong>€178 a year</strong> for EU, EEA and Swiss students and{' '}
                      <strong>€2,902</strong> for others in 2026-2027
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Most university licences are taught in French</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Grandes écoles</strong> set their own fees for their English-taught
                      bachelor&apos;s: École polytechnique&apos;s, for example, costs €15,900 a year
                      for EU students and €19,600 for others (2027 intake)
                    </span>
                  </li>
                </ul>
              </div>

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
                    <span>About 21% of students in France attend a private institution</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Business schools offer many English-taught bachelor&apos;s (BBA, BSc),
                      sometimes across several countries
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Fees are usually about <strong>€6,000 to €18,000 or more</strong> a year
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
                    href="https://www.campusfrance.org/en/tuition-fees-France"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Campus France — Tuition fees in France
                  </a>
                </li>
                <li>
                  <a
                    href="https://programmes.polytechnique.edu/en/bachelor/costs-and-funding/tuition-fees"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    École polytechnique — Bachelor tuition fees (example)
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
              Documents go to each school or platform you apply through. Requirements vary, but
              typically include:
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

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                Official Sources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://programmes.polytechnique.edu/en/bachelor/admissions/admissions-criteria-and-procedure"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    École polytechnique — Bachelor admissions criteria and procedure
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Sciences Po — International undergraduate admissions
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

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Each school sets its own rounds, so there is no single calendar. For September 2027
              entry, the main dates are:
            </p>

            <div className="mt-8 space-y-4">
              {timelineSteps.map((step, index) => (
                <div
                  key={step.period}
                  className="flex items-center gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
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
                ⚠️ Early rounds often fill places first. Always check each school&apos;s admissions
                page for its own deadlines.
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
                    href="https://www.campusfrance.org/en/application-higher-education-france"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Campus France — Parcoursup and DAP timetables for 2027-2028
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Sciences Po — Calendar for the 2027 intake
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.essec.edu/en/program/global-bba-international/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    ESSEC Global BBA — Application deadlines, intake 2027
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
                  how IB Match evaluates French admission
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
            <div className="text-4xl mb-4">🇫🇷</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in France?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover English-taught bachelor&apos;s in France that match your IB profile. Search
              by IB points, subject requirements, and field of study.
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
                href="/programs/search?countries=cmip2am54000m7m189mi8faj3"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in France
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
