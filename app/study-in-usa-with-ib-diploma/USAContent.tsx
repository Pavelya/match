'use client'

/**
 * USA IB Diploma Content Component
 *
 * Official sources used:
 * - ibo.org — IB recognition database (770+ US universities)
 * - commonapp.org — centralized application platform
 * - admission.universityofcalifornia.edu — UC IB credit policies
 * - educationusa.state.gov — US Department of State student resources
 * - bigfuture.collegeboard.org — college planning and search
 *
 * All information is sourced from official portals listed above.
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

// Typical application components for US universities
const applicationComponents = [
  'Common Application or Coalition Application (online form)',
  'Official high school transcript with predicted or final IB grades',
  'School counselor report and recommendation letter(s)',
  'Teacher recommendation letters (typically 1–2)',
  'Personal essay (Common App essay, 650 words)',
  'Supplemental essays (varies by university)',
  'SAT or ACT scores (optional at many universities)',
  'Official IB transcript sent from the IBO (for credit evaluation after enrollment)'
]

// Example IB credit policies at select US universities
const creditExamples = [
  {
    university: 'University of California (UC)',
    policy: 'HL scores 5–7 = 8 quarter units each; Full diploma (30+) = 6 additional quarter units',
    source: 'admission.universityofcalifornia.edu'
  },
  {
    university: 'University of Michigan',
    policy: 'HL scores 5–7 = course-specific credit; SL generally not credited',
    source: 'umich.edu'
  },
  {
    university: 'Stanford University',
    policy: 'HL scores 5+ = credit toward degree; detailed subject-by-subject evaluation',
    source: 'stanford.edu'
  },
  {
    university: 'Georgetown University',
    policy: 'HL scores 6–7 only = credit; no credit for SL exams',
    source: 'georgetown.edu'
  }
]

// FAQ data
const faqs = [
  {
    question: 'Is the IB Diploma recognized by US universities?',
    answer:
      'Yes. Over 770 US universities officially recognize the IB Diploma. US admissions are holistic — there is no single minimum IB score published, but the IB curriculum is viewed as rigorous, college-level preparation that strengthens applications.',
    source: 'IBO — Recognition Database',
    sourceUrl: 'https://recognition.ibo.org/'
  },
  {
    question: 'Can I get college credit for IB courses in the USA?',
    answer:
      'Yes. Most US universities award college credit for Higher Level (HL) IB exams, typically requiring scores of 5, 6, or 7. The University of California system awards 8 quarter units per HL exam with 5+ and 6 additional units for a full diploma with 30+ total points. Standard Level (SL) exams usually do not receive credit. Policies vary by institution — always check each university directly.',
    source: 'University of California — IB Credits',
    sourceUrl:
      'https://admission.universityofcalifornia.edu/admission-requirements/ap-exam-credits/ib-credits.html'
  },
  {
    question: 'How do IB students apply to US universities?',
    answer:
      'Most US universities accept applications through the Common Application (commonapp.org), which supports over 1,000 colleges. IB students submit predicted grades, transcripts, essays, recommendation letters, and extracurricular information. Predicted IB scores are typically included in the school counselor report since application deadlines fall before final IB results are released.',
    source: 'Common Application',
    sourceUrl: 'https://www.commonapp.org/'
  },
  {
    question: 'Do US universities require SAT/ACT for IB students?',
    answer:
      "Many US universities have adopted test-optional or test-free policies, meaning SAT/ACT scores are not required. In test-optional contexts, strong IB coursework and predicted grades can effectively strengthen your application. Some highly selective universities have reinstated the requirement — always check each university's current policy.",
    source: 'Common Application',
    sourceUrl: 'https://www.commonapp.org/'
  },
  {
    question: 'What IB scores do I need for top US universities?',
    answer:
      'US universities do not publish minimum IB score requirements. However, successful applicants to highly selective universities (Ivy League, Stanford, MIT) typically present scores of 38–45 with strong HL grades (6s and 7s). Because admissions are holistic, essays, extracurriculars, and recommendation letters also play a significant role.',
    source: 'EducationUSA — US Department of State',
    sourceUrl: 'https://educationusa.state.gov/'
  }
]

export function USAContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-70" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-6">
              <span className="text-xl mr-2">🇺🇸</span>
              Official University Admission Guide for IB Students (2027)
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Study in the USA with the <span className="text-blue-600">IB Diploma</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This guide explains{' '}
              <strong>
                how the International Baccalaureate (IB) Diploma is used for admission to US
                universities
              </strong>
              , using only <strong>official and institutional sources</strong>. US universities use{' '}
              <strong>holistic admissions</strong> and widely recognize the IB Diploma as rigorous,
              college-level preparation. Over <strong>770 US universities</strong> officially
              recognize the IB.
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

      {/* How US Universities Recognize the IB Diploma */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recognition</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How US Universities Recognize the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                US universities use a <strong>holistic admissions</strong> process. There is no
                single minimum IB score for admission — universities evaluate your entire
                application, including academic performance, essays, extracurricular activities,
                recommendation letters, and personal qualities.
              </p>

              <p>
                The IB Diploma is{' '}
                <strong>widely recognized as rigorous, college-level preparation</strong>. Over{' '}
                <strong>770 US universities</strong> have official IB recognition policies listed in
                the IBO database. Admissions officers understand the IB grading scale and value the
                breadth and depth of the IB curriculum.
              </p>

              <p>
                Because US application deadlines (November–January) fall{' '}
                <strong>before final IB results</strong> are released (July), universities rely
                heavily on <strong>predicted grades</strong> submitted by your school counselor.
                Strong predicted grades, combined with a solid transcript, are essential for
                competitive applications.
              </p>

              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://recognition.ibo.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      IBO — University Recognition Database
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://educationusa.state.gov/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      EducationUSA — US Department of State
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Holistic Admissions */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Holistic Admissions</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What US Universities Look For
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Unlike many European systems that rely primarily on exam scores, US admissions are{' '}
                <strong>holistic</strong>. Your IB scores are one important factor among several:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Academic record</strong> — IB predicted/final grades, transcript, course
                    rigor (HL vs SL choices)
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Personal essay</strong> — the Common App essay (650 words) and
                    university-specific supplemental essays
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Extracurricular activities</strong> — leadership, community service, CAS
                    projects, and sustained commitments
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Recommendation letters</strong> — from school counselor and 1–2 teachers
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Standardized tests</strong> — SAT/ACT (optional at many universities;
                    some have reinstated requirements)
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-blue-50 p-6 border border-blue-100">
                <p className="text-gray-700 text-sm">
                  <strong>IB advantage:</strong> The IB&apos;s emphasis on critical thinking,
                  research (Extended Essay), and community engagement (CAS) aligns closely with what
                  US universities value in holistic review. The IB Diploma is often viewed as one of
                  the most rigorous secondary curricula, comparable to or surpassing AP coursework.
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
                      href="https://www.commonapp.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Common Application — Apply to 1,000+ US Colleges
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IB Credit Policies */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">College Credit</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              IB Credit Policies at US Universities
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <p>
                Most US universities award <strong>college credit</strong> for IB Higher Level (HL)
                exams with strong scores, similar to AP credit policies. This can allow students to
                skip introductory courses, graduate early, or take more advanced classes.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Higher Level (HL) exams</strong> — credit typically awarded for scores
                    of 5, 6, or 7 (some universities require 6 or 7 only)
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Standard Level (SL) exams</strong> — generally do not receive college
                    credit at most institutions
                  </span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Full IB Diploma bonus</strong> — some universities award additional
                    credit for completing the full diploma (e.g., UC system: 6 extra quarter units
                    for 30+ total)
                  </span>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">
                        University
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">
                        IB Credit Policy
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {creditExamples.map((row) => (
                      <tr key={row.university}>
                        <td className="px-6 py-3 text-gray-900 font-medium">{row.university}</td>
                        <td className="px-6 py-3 text-gray-700">{row.policy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    IB credit policies vary significantly between institutions. Always check each
                    university&apos;s specific policy on their admissions website or the{' '}
                    <a
                      href="https://recognition.ibo.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 hover:underline font-medium"
                    >
                      IBO Recognition Database
                    </a>
                    . Some highly selective universities (e.g., Harvard) no longer award credit for
                    IB but may use scores for course placement.
                  </span>
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  Official Sources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://admission.universityofcalifornia.edu/admission-requirements/ap-exam-credits/ib-credits.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      University of California — IB Credits
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://recognition.ibo.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      IBO — University Recognition Database
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
              English Proficiency for IB Students
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">IB English Exemptions</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Many universities waive TOEFL/IELTS if English is the{' '}
                      <strong>language of instruction</strong> at your IB school
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>IB English A</strong> (Language and Literature) often satisfies the
                      English proficiency requirement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Some universities accept <strong>IB English B HL</strong> with a high score
                      (5+) as proof of proficiency
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Languages className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">If Required</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      TOEFL iBT: typically <strong>80–100+</strong> (varies by institution)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>
                      IELTS: typically <strong>6.5–7.0+</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Duolingo English Test accepted by a growing number of institutions</span>
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
                    href="https://educationusa.state.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    EducationUSA — US Department of State
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Application Process</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How to Apply with the IB Diploma
            </p>

            <div className="mt-8 space-y-6 text-base leading-7 text-gray-600">
              <div className="rounded-2xl bg-blue-50 p-8 border border-blue-100">
                <p className="text-gray-700">
                  Most US universities accept applications through the{' '}
                  <a
                    href="https://www.commonapp.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Common Application
                  </a>{' '}
                  (1,000+ colleges). Some universities also use the{' '}
                  <strong>Coalition Application</strong> or their own portals.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-6">
                Typical Application Components
              </h3>

              <div className="rounded-2xl bg-white p-8 border border-gray-200">
                <ul className="space-y-4">
                  {applicationComponents.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-700">
                      <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-2xl bg-amber-50 p-6 border border-amber-100">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Predicted grades matter:</strong> Since US application deadlines fall
                    before IB results are released, your predicted IB grades (submitted by your
                    counselor) are critical for admission decisions. Apply with the strongest
                    predicted grades possible.
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
                      href="https://www.commonapp.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Common Application
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tuition Fees */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Tuition & Aid</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tuition Fees and Financial Aid
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
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
                    <span>In-state tuition: ~$10,000–$15,000/year (for US residents)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Out-of-state / international tuition: ~$25,000–$45,000/year</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>IB credit can reduce time to degree, saving on tuition</span>
                  </li>
                </ul>
              </div>

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
                    <span>Tuition: ~$50,000–$65,000/year (before financial aid)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Many offer need-based financial aid to international students</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Some IB-specific scholarships available at various institutions</span>
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
                    href="https://educationusa.state.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    EducationUSA — Funding Your US Study
                  </a>
                </li>
                <li>
                  <a
                    href="https://bigfuture.collegeboard.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    College Board — BigFuture College Search
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
              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900">August 1: Common App Opens</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Create your account, select colleges (up to 20 on the Common App), and begin
                    working on essays and application materials.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    November 1–15: Early Decision / Early Action
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Early Decision is <strong>binding</strong> — if accepted, you must enroll. Early
                    Action is non-binding. Decisions released in mid-December.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    January 1–15: Regular Decision Deadline
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Most universities have Regular Decision deadlines in early January. Some ED II
                    deadlines fall around January 15. Decisions released in March–April.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-semibold text-gray-900">May 1: Decision Day</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Commit to your chosen university by <strong>May 1</strong> (National College
                    Decision Day). After enrollment, send your official IB transcript for credit
                    evaluation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold flex-shrink-0">
                  5
                </div>
                <div>
                  <p className="font-semibold text-gray-900">July: Final IB Results</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Final IB results are released. Send your official IB transcript from the IBO to
                    your university for <strong>credit evaluation and placement</strong>.
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
                    href="https://www.commonapp.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Common Application — Deadlines and Key Dates
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
                  how IB Match evaluates US admission
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
            <div className="text-4xl mb-4">🇺🇸</div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Find Your Match in the USA?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover US university programmes that match your IB profile. Search by IB points,
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
                href="/programs/search?country=US"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Programs in the USA
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
