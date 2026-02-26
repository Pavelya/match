'use client'

/**
 * Portugal IB Diploma Content Component
 *
 * Official sources used:
 * - dge.mec.pt — Direção-Geral da Educação (equivalency of foreign qualifications)
 * - dges.gov.pt — Direção-Geral do Ensino Superior (higher education access, NARIC centre)
 * - dge.mec.pt/faq-equivalence-foreign-qualifications — DGE FAQ on equivalency process
 *
 * All information in this component is sourced from official Portuguese government
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

// Required documents for Portuguese university admission
const requiredDocuments = [
  'IB Diploma and transcript of results',
  'Proof of identity (passport or national ID)',
  'DGE equivalency certificate (equivalência de habilitações)',
  'Certified translations of documents into Portuguese (if not already in Portuguese, English, French, or Spanish)',
  'Hague Apostille on academic documents (for Hague Convention member countries)',
  'Proof of language proficiency (Portuguese or English, depending on programme)'
]

// Application timeline steps
const timelineSteps = [
  {
    period: 'Anytime: DGE Equivalency',
    description:
      'Apply for equivalency of your IB Diploma through the DGE. There is no deadline — the process can be initiated at any time. Submit your application to a public school or directly to the DGE (if living outside Portugal). The process is free and typically takes 30 days after all documents are submitted.'
  },
  {
    period: 'January – March: Research and Preparation',
    description:
      'Identify your preferred universities and programmes. Check whether you need to apply via the Concurso Especial (international student competition) or another admission route. Gather required documents and arrange translations and apostilles.'
  },
  {
    period: 'March – July: Application Period',
    description:
      "Most universities open their international student application windows between March and July, with multiple phases. Submit your application through the university's own portal. Deadlines vary by institution and phase — some close as early as March, others remain open until July or later."
  },
  {
    period: 'July – September: Admission Results and Enrolment',
    description:
      'Universities announce admission decisions in waves. Admitted students complete enrolment, including document verification and fee payment. Non-EU/EEA students must apply for a student visa at least 2–3 months before the academic year starts (typically September).'
  }
]

// FAQ data
const faqs = [
  {
    question: 'Is the IB Diploma recognized for university admission in Portugal?',
    answer:
      'Yes. The IB Diploma is recognized in Portugal through a formal equivalency process managed by the Direção-Geral da Educação (DGE). Under Decreto-Lei 227/2005, IB Diploma holders can obtain equivalency to Portuguese secondary education (ensino secundário), which then qualifies them to apply for higher education. The process is free of charge and can be requested at any time.',
    source: 'DGE — Equivalências Estrangeiras',
    sourceUrl: 'https://www.dge.mec.pt/equivalencias-estrangeiras'
  },
  {
    question: 'How do international IB students apply to Portuguese universities?',
    answer:
      'International students (non-EU/non-Portuguese nationals) apply through the Concurso Especial para Estudantes Internacionais, a special competition established by Decreto-Lei 36/2014. Each university manages its own admission under this framework, setting specific deadlines and requirements. EU/EEA students may apply through the national general competition (concurso nacional de acesso) or other special competitions.',
    source: 'DGES — Acesso ao Ensino Superior',
    sourceUrl: 'https://www.dges.gov.pt/pt/pagina/acesso-ao-ensino-superior'
  },
  {
    question: 'Do IB students need to take Portuguese entrance exams (Provas de Ingresso)?',
    answer:
      'It depends on the admission route. Students applying through the national general competition (concurso nacional de acesso) typically need to take Provas de Ingresso. International students applying through the Concurso Especial may not need national exams — universities may use IB scores directly or administer their own admission tests. Requirements vary by institution and programme.',
    source: 'DGES — Acesso ao Ensino Superior',
    sourceUrl: 'https://www.dges.gov.pt/pt/pagina/acesso-ao-ensino-superior'
  },
  {
    question: 'What language proficiency is required to study in Portugal?',
    answer:
      "For Portuguese-taught programmes, proficiency in Portuguese is required, typically at B1–B2 level. For the growing number of English-taught programmes (especially at Master's level), English proficiency at B2 level is generally required (e.g., IELTS 6.0–6.5, Cambridge B2 First). IB English A or B courses may satisfy English requirements at some institutions — verify directly.",
    source: 'DGES — Portuguese Higher Education System',
    sourceUrl: 'https://www.dges.gov.pt/en/pagina/portuguese-higher-education-system'
  },
  {
    question: 'What is the difference between universities and polytechnics in Portugal?',
    answer:
      "Portugal operates a binary higher education system. Universities focus on research and academic knowledge, offering Licenciatura (Bachelor's, 3–4 years), Mestrado (Master's, 1.5–2 years), and Doutoramento (PhD). Polytechnics emphasize applied research and practical professional training, offering Licenciatura and Mestrado degrees. Both types accept IB Diploma holders.",
    source: 'DGES — Portuguese Higher Education System',
    sourceUrl: 'https://www.dges.gov.pt/en/pagina/portuguese-higher-education-system'
  }
]

export function PortugalContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇵🇹</span>
              Official University Admission Guide for IB Students (2026)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in Portugal with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for admission to Portuguese
                universities and polytechnics
              </strong>
              , using only <strong>official Portuguese government and institutional sources</strong>
              . Portugal operates a <strong>binary higher education system</strong> with
              universities and polytechnics, and international students apply through the{' '}
              <strong>Concurso Especial para Estudantes Internacionais</strong>.
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

      {/* How Portugal Recognizes the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Portugal Recognizes the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                The <strong>International Baccalaureate (IB) Diploma</strong> is recognized in
                Portugal through a <strong>formal equivalency process</strong> managed by the{' '}
                <strong>Direção-Geral da Educação (DGE)</strong> — the Directorate-General for
                Education. This process grants equivalency between foreign secondary education
                qualifications and Portuguese secondary education (<em>ensino secundário</em>).
              </p>

              <p>
                The equivalency is regulated by{' '}
                <strong>Decreto-Lei n.º 227/2005, of 28 December</strong>. The DGE is specifically
                responsible for processing IB Diploma equivalencies, as confirmed in their official
                FAQ. The process is <strong>free of charge</strong> and can be initiated{' '}
                <strong>at any time</strong> — there is no specific deadline.
              </p>

              <p>
                Once equivalency is granted, IB Diploma holders have the right to apply for higher
                education in Portugal, either through the national general competition or the
                special competition for international students, depending on their nationality and
                residency status.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.dge.mec.pt/equivalencias-estrangeiras"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      DGE — Equivalências Estrangeiras
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.dge.mec.pt/faq-equivalence-foreign-qualifications"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      DGE — FAQ: Equivalence of Foreign Qualifications (English)
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
              Do IB Students Need a Portuguese Diploma?
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <div className="rounded-2xl bg-amber-50 p-8 border border-amber-100">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Equivalency required — but the process is straightforward and free
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Unlike some countries where the IB Diploma is automatically accepted, Portugal
                      requires a <strong>formal equivalency process</strong> through the DGE.
                      However, this process is <strong>free of charge</strong>, has{' '}
                      <strong>no deadline</strong>, and typically takes around{' '}
                      <strong>30 days</strong> after all documents are submitted. You do not need a
                      Portuguese diploma — the IB Diploma is the basis for obtaining equivalency.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Where to apply:</strong> At any public school in Portugal, or directly
                    to the DGE by post if you live outside Portugal (Avenida 24 de Julho, 140,
                    1399-025 Lisbon)
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Documents needed:</strong> IB Diploma and transcript, with Hague
                    Apostille and official Portuguese translation (if not in Portuguese, English,
                    French, or Spanish)
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Grade conversion:</strong> Final grades are converted using tables
                    established by Portarias 224/2006 and 699/2006
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
                      href="https://www.dge.mec.pt/faq-equivalence-foreign-qualifications"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      DGE — FAQ: Equivalence of Foreign Qualifications (English)
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
                  Portugal uses a <strong>mixed admission system</strong>. There is a{' '}
                  <strong>national general competition</strong> (concurso nacional de acesso)
                  coordinated by DGES for Portuguese and EU applicants, plus a{' '}
                  <strong>special competition for international students</strong> (Concurso
                  Especial) where each university manages its own admission process under the
                  framework of Decreto-Lei 36/2014.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Concurso Especial (International Students)</strong> — Non-EU/EEA
                    students apply directly to each university through its own international
                    admission process. Requirements, deadlines, and available places are set by each
                    institution.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Concurso Nacional (General Competition)</strong> — EU/EEA students with
                    DGE equivalency may apply through the national system coordinated by DGES. This
                    route typically requires Provas de Ingresso (national entrance exams).
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Multiple applications allowed</strong> — You can apply to multiple
                    universities. In the national competition, you can rank up to six
                    institution/programme pairs in order of preference.
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
                      href="https://www.dges.gov.pt/pt/pagina/acesso-ao-ensino-superior"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      DGES — Acesso ao Ensino Superior
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
              How IB Grades Are Assessed
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Portugal uses a <strong>0–20 grading scale</strong> for secondary and higher
                education. When the DGE grants equivalency for IB qualifications, final grades are
                converted using tables established in <strong>Portarias 224/2006</strong> and{' '}
                <strong>699/2006</strong>. The passing grade is 10 out of 20.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>DGE equivalency</strong> — Grades from the IB Diploma are converted to
                    the Portuguese 0–20 scale as part of the formal equivalency process
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>University-specific weighting</strong> — For admission, universities may
                    apply their own weighting to different IB subjects, particularly for competitive
                    programmes
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Concurso Especial</strong> — Universities under the international
                    student competition may use their own criteria to evaluate IB scores, which may
                    differ from the DGE conversion tables
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-blue-50 p-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Portuguese Grading Scale Reference
                </h4>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">
                          Portuguese Grade (0–20)
                        </th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">
                          Classification
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">18–20</td>
                        <td className="px-6 py-3 text-gray-700">Excellent (Excelente)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">16–17</td>
                        <td className="px-6 py-3 text-gray-700">Very Good (Muito Bom)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">14–15</td>
                        <td className="px-6 py-3 text-gray-700">Good (Bom)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">10–13</td>
                        <td className="px-6 py-3 text-gray-700">Satisfactory (Suficiente)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-gray-700 font-medium">0–9</td>
                        <td className="px-6 py-3 text-gray-700">Fail (Insuficiente)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  Conversion of IB grades to the Portuguese scale is determined by the DGE using the
                  tables in Portarias 224/2006 and 699/2006. Contact the DGE or the specific
                  university for exact conversion details.
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
                      href="https://www.dge.mec.pt/equivalencias-estrangeiras"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      DGE — Equivalências Estrangeiras (includes links to Portarias)
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
                Whether entrance exams are required depends on your{' '}
                <strong>admission route and programme</strong>. Portugal&apos;s public universities
                use <strong>Provas de Ingresso</strong> (national entrance exams) as a key component
                of the national general competition.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Concurso Especial (International Students)</strong> — Universities may
                    accept IB scores directly, use their own admission tests, or waive entrance
                    exams entirely. Requirements vary by institution and programme.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>National General Competition</strong> — IB students applying through
                    this route typically need Provas de Ingresso. Some IB subjects may be recognized
                    as equivalent to the required entrance exams (<em>provas homólogas</em>).
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Medicine and competitive programmes</strong> — Entrance exams or
                    additional tests are commonly required regardless of admission route. Some
                    medical schools require specific IB HL subjects (Biology, Chemistry) at minimum
                    scores.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Private universities</strong> — Generally more flexible and may rely
                    more directly on IB scores without requiring national entrance exams.
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
                      href="https://www.dges.gov.pt/pt/pagina/acesso-ao-ensino-superior"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      DGES — Acesso ao Ensino Superior
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
              Most programmes are taught in <strong>Portuguese</strong>, but there is a growing
              number of <strong>English-taught programmes</strong>, especially at the Master&apos;s
              level and in fields like Business, Engineering, Computer Science, and Medicine.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Portuguese</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Required for most undergraduate programmes at public universities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Typically <strong>B1–B2 level</strong> required (university-dependent)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Preparatory Portuguese courses are available at many universities for
                      international students
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
                    <span>Required for English-taught programmes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Typically <strong>B2 level</strong> — IELTS 6.0–6.5, TOEFL iBT 80+, or
                      Cambridge B2 First/C1 Advanced
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      IB English A or English B courses may satisfy English requirements — verify
                      with the institution
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
                    href="https://www.dges.gov.pt/en/pagina/portuguese-higher-education-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    DGES — Portuguese Higher Education System
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
              Types of Higher Education in Portugal
            </p>

            <p className="mt-6 text-gray-600">
              Portugal operates a <strong>binary higher education system</strong> consisting of{' '}
              <strong>universities</strong> and <strong>polytechnics</strong>, both public and
              private. The IB Diploma is accepted at all accredited institutions. The system follows
              the <strong>Bologna Process</strong> with standardized degree cycles.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Universities</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Focus on <strong>research</strong> and creation of knowledge. Offer{' '}
                      <strong>Licenciatura</strong> (3–4 years), <strong>Mestrado</strong> (1.5–2
                      years), and <strong>Doutoramento</strong> (PhD)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Some offer <strong>integrated Master&apos;s</strong> (5–6 years for Medicine,
                      Architecture, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Examples: University of Lisbon, University of Porto, University of Coimbra,
                      NOVA University of Lisbon
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Polytechnics</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Focus on <strong>applied research</strong> and practical professional
                      training. Offer <strong>Licenciatura</strong> and <strong>Mestrado</strong>{' '}
                      degrees
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Also offer <strong>CTeSP</strong> (professional higher technical courses) —
                      short-cycle programmes linked to the 1st cycle
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Tuition at public institutions is generally lower than at private
                      institutions. International students may pay differentiated fees.
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
                    href="https://www.dges.gov.pt/en/pagina/portuguese-higher-education-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    DGES — Portuguese Higher Education System
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
              Documents are typically submitted through the university&apos;s application portal.
              Requirements may vary by institution and admission route:
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
                  least 2–3 months before the academic year starts. Documents may need to be
                  authenticated with the <strong>Hague Apostille</strong> and translated into
                  Portuguese. Contact the Portuguese embassy or consulate in your country for visa
                  details.
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
                    href="https://www.dge.mec.pt/faq-equivalence-foreign-qualifications"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    DGE — FAQ: Equivalence of Foreign Qualifications (English)
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

            <div className="mt-10 space-y-8">
              {timelineSteps.map((step, index) => (
                <div key={step.period} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    {index < timelineSteps.length - 1 && (
                      <div className="mt-2 h-full w-px bg-blue-200" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-lg font-semibold text-gray-900">{step.period}</h3>
                    <p className="mt-2 text-base leading-7 text-gray-600">{step.description}</p>
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
                    href="https://www.dges.gov.pt/pt/pagina/acesso-ao-ensino-superior"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    DGES — Acesso ao Ensino Superior
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.dge.mec.pt/equivalencias-estrangeiras"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    DGE — Equivalências Estrangeiras
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">FAQ</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </p>

            <div className="mt-10 space-y-8">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl bg-white p-8 border border-gray-200 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-3 text-base leading-7 text-gray-600 faq-answer">{faq.answer}</p>
                  <p className="mt-3 text-sm text-gray-500">
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

            {/* Internal link block */}
            <div className="mt-8 rounded-xl bg-blue-50 p-6 border border-blue-100">
              <p className="text-gray-700">
                Learn{' '}
                <Link href="/how-it-works" className="text-blue-600 font-medium hover:underline">
                  how IB Match evaluates Portuguese admission
                </Link>{' '}
                requirements for your profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-4xl mb-4">🇵🇹</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Start Your Journey to Portugal
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Create your free IB Match profile to discover programmes at Portuguese universities
              and polytechnics that match your IB Diploma subjects and scores.
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
                href="/programs/search?countries=cmkmqs3460000jv04civv7ipu"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="h-4 w-4" />
                Explore Programs in Portugal
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
