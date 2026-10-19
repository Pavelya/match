import type { CountryGuide } from '@/lib/guides/types'

/** Study in the USA with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-usa-with-ib-diploma',
  countryCode: 'US',
  exploreCountryId: 'cmkr3nw9y00197meqfiwgyqbe',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in the USA with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for admission to US universities, using only official and institutional sources. US universities use holistic admissions and widely recognize the IB Diploma as rigorous, college-level preparation. Over 770 US universities officially recognize the IB.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How US universities recognize the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'US universities use a **holistic admissions** process. There is no single minimum IB score for admission — universities evaluate your entire application, including academic performance, essays, extracurricular activities, recommendation letters, and personal qualities.'
        },
        {
          type: 'paragraph',
          text: 'The IB Diploma is **widely recognized as rigorous, college-level preparation**. Over **770 US universities** have official IB recognition policies listed in the IBO database. Admissions officers understand the IB grading scale and value the breadth and depth of the IB curriculum.'
        },
        {
          type: 'paragraph',
          text: 'Because US application deadlines (November–January) fall **before final IB results** are released (July), universities rely heavily on **predicted grades** submitted by your school counselor. Strong predicted grades, combined with a solid transcript, are essential for competitive applications.'
        }
      ],
      sources: [
        {
          label: 'IBO — University Recognition Database',
          href: 'https://recognition.ibo.org/'
        },
        {
          label: 'EducationUSA — US Department of State',
          href: 'https://educationusa.state.gov/'
        }
      ]
    },
    {
      label: 'Holistic admissions',
      heading: 'What US universities look for',
      blocks: [
        {
          type: 'paragraph',
          text: 'Unlike many European systems that rely primarily on exam scores, US admissions are **holistic**. Your IB scores are one important factor among several:'
        },
        {
          type: 'list',
          items: [
            '**Academic record** — IB predicted/final grades, transcript, course rigor (HL vs SL choices)',
            '**Personal essay** — the Common App essay (650 words) and university-specific supplemental essays',
            '**Extracurricular activities** — leadership, community service, CAS projects, and sustained commitments',
            '**Recommendation letters** — from school counselor and 1–2 teachers',
            '**Standardized tests** — SAT/ACT (optional at many universities; some have reinstated requirements)'
          ]
        },
        {
          type: 'note',
          text: "**IB advantage:** The IB's emphasis on critical thinking, research (Extended Essay), and community engagement (CAS) aligns closely with what US universities value in holistic review. The IB Diploma is often viewed as one of the most rigorous secondary curricula, comparable to or surpassing AP coursework."
        }
      ],
      sources: [
        {
          label: 'Common Application — Apply to 1,000+ US Colleges',
          href: 'https://www.commonapp.org/'
        }
      ]
    },
    {
      label: 'College credit',
      heading: 'IB credit policies at US universities',
      blocks: [
        {
          type: 'paragraph',
          text: 'Most US universities award **college credit** for IB Higher Level (HL) exams with strong scores, similar to AP credit policies. This can allow students to skip introductory courses, graduate early, or take more advanced classes.'
        },
        {
          type: 'list',
          items: [
            '**Higher Level (HL) exams** — credit typically awarded for scores of 5, 6, or 7 (some universities require 6 or 7 only)',
            '**Standard Level (SL) exams** — generally do not receive college credit at most institutions',
            '**Full IB Diploma bonus** — some universities award additional credit for completing the full diploma (e.g., UC system: 6 extra quarter units for 30+ total)'
          ]
        },
        {
          type: 'table',
          table: {
            caption: 'Example IB credit policies',
            columns: ['University', 'IB credit policy'],
            rows: [
              [
                'University of California (UC)',
                'HL scores 5–7 = 8 quarter units each; Full diploma (30+) = 6 additional quarter units'
              ],
              [
                'University of Michigan',
                'HL scores 5–7 = course-specific credit; SL generally not credited'
              ],
              [
                'Stanford University',
                'HL scores 5+ = credit toward degree; detailed subject-by-subject evaluation'
              ],
              ['Georgetown University', 'HL scores 6–7 only = credit; no credit for SL exams']
            ]
          }
        },
        {
          type: 'caution',
          text: "IB credit policies vary significantly between institutions. Always check each university's specific policy on their admissions website or the [IBO Recognition Database](https://recognition.ibo.org/). Some highly selective universities (e.g., Harvard) no longer award credit for IB but may use scores for course placement."
        }
      ],
      sources: [
        {
          label: 'University of California — IB Credits',
          href: 'https://admission.universityofcalifornia.edu/admission-requirements/ap-exam-credits/ib-credits.html'
        },
        {
          label: 'IBO — University Recognition Database',
          href: 'https://recognition.ibo.org/'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'English proficiency for IB students',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'IB English exemptions',
              items: [
                'Many universities waive TOEFL/IELTS if English is the **language of instruction** at your IB school',
                '**IB English A** (Language and Literature) often satisfies the English proficiency requirement',
                'Some universities accept **IB English B HL** with a high score (5+) as proof of proficiency'
              ]
            },
            {
              title: 'If required',
              items: [
                'TOEFL iBT: typically **80–100+** (varies by institution)',
                'IELTS: typically **6.5–7.0+**',
                'Duolingo English Test accepted by a growing number of institutions'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'EducationUSA — US Department of State',
          href: 'https://educationusa.state.gov/'
        }
      ]
    },
    {
      label: 'Application process',
      heading: 'How to apply with the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'Most US universities accept applications through the [Common Application](https://www.commonapp.org/) (1,000+ colleges). Some universities also use the [Coalition Application](https://www.coalitionforcollegeaccess.org/apply-coalition-on-scoir), which is now submitted through Scoir, or their own portals.'
        },
        {
          type: 'subheading',
          text: 'Typical application components'
        },
        {
          type: 'documents',
          items: [
            "Common App, the Coalition Application on Scoir, or the university's own form",
            'Official high school transcript with predicted or final IB grades',
            'School counselor report and recommendation letter(s)',
            'Teacher recommendation letters (typically 1–2)',
            'Personal essay (Common App essay, 650 words)',
            'Supplemental essays (varies by university)',
            'SAT or ACT scores (optional at many universities)',
            'Official IB transcript sent from the IBO (for credit evaluation after enrollment)'
          ]
        },
        {
          type: 'caution',
          text: '**Predicted grades matter:** Since US application deadlines fall before IB results are released, your predicted IB grades (submitted by your counselor) are critical for admission decisions. Apply with the strongest predicted grades possible.'
        }
      ],
      sources: [
        {
          label: 'Common Application',
          href: 'https://www.commonapp.org/'
        }
      ]
    },
    {
      label: 'Tuition & aid',
      heading: 'Tuition fees and financial aid',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'Public universities',
              items: [
                'In-state tuition and fees: $11,950/year on average (for state residents)',
                'Out-of-state tuition and fees, which international students usually pay: $31,880/year on average',
                'IB credit can reduce time to degree, saving on tuition'
              ]
            },
            {
              title: 'Private universities',
              items: [
                'Tuition and fees: $45,000/year on average at private nonprofit colleges (before financial aid)',
                'Many offer need-based financial aid to international students',
                'Some IB-specific scholarships available at various institutions'
              ]
            }
          ]
        },
        {
          type: 'paragraph',
          text: "Figures are the College Board's published averages for 2025–26, the latest available. Individual universities charge more or less, and living costs are extra."
        }
      ],
      sources: [
        {
          label: 'EducationUSA — Funding Your US Study',
          href: 'https://educationusa.state.gov/'
        },
        {
          label: 'College Board — Trends in College Pricing',
          href: 'https://research.collegeboard.org/trends/college-pricing/highlights'
        },
        {
          label: 'College Board — BigFuture College Search',
          href: 'https://bigfuture.collegeboard.org/'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'Application timeline',
      blocks: [
        {
          type: 'timeline',
          steps: [
            {
              date: '1 August 2026',
              title: 'Common App opens',
              text: 'The 2026–27 Common App opened with more than 1,200 member colleges. Create your account, select colleges (up to 20 on the Common App), and begin working on essays and application materials.'
            },
            {
              date: 'November 2026',
              time: 'usually 1 or 15 November',
              title: 'Early Decision / Early Action',
              text: 'Early Decision is **binding** — if accepted, you must enroll. Early Action is non-binding. Decisions released in mid-December.'
            },
            {
              date: 'January 2027',
              time: 'usually 1–15 January',
              title: 'Regular Decision deadline',
              text: 'Most universities have Regular Decision deadlines in early January. Some ED II deadlines fall around January 15. Decisions released in March–April.'
            },
            {
              date: '1 May 2027',
              title: 'Decision Day',
              text: 'Commit to your chosen university by **May 1** (National College Decision Day). After enrollment, send your official IB transcript for credit evaluation.'
            },
            {
              date: 'July 2027',
              title: 'Final IB results',
              text: 'Final IB results are released. Send your official IB transcript from the IBO to your university for **credit evaluation and placement**.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Common App — 2026–27 season launch',
          href: 'https://www.commonapp.org/blog/common-app-opens-application-launch-2026-27-season'
        },
        {
          label: 'Common Application',
          href: 'https://www.commonapp.org/'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Is the IB Diploma recognized by US universities?',
        answer:
          'Yes. Over 770 US universities officially recognize the IB Diploma. US admissions are holistic — there is no single minimum IB score published, but the IB curriculum is viewed as rigorous, college-level preparation that strengthens applications.',
        source: {
          label: 'IBO — Recognition Database',
          href: 'https://recognition.ibo.org/'
        }
      },
      {
        question: 'Can I get college credit for IB courses in the USA?',
        answer:
          'Yes. Most US universities award college credit for Higher Level (HL) IB exams, typically requiring scores of 5, 6, or 7. The University of California system awards 8 quarter units per HL exam with 5+ and 6 additional units for a full diploma with 30+ total points. Standard Level (SL) exams usually do not receive credit. Policies vary by institution — always check each university directly.',
        source: {
          label: 'University of California — IB Credits',
          href: 'https://admission.universityofcalifornia.edu/admission-requirements/ap-exam-credits/ib-credits.html'
        }
      },
      {
        question: 'How do IB students apply to US universities?',
        answer:
          'Most US universities accept applications through the Common Application (commonapp.org), which supports over 1,000 colleges. IB students submit predicted grades, transcripts, essays, recommendation letters, and extracurricular information. Predicted IB scores are typically included in the school counselor report since application deadlines fall before final IB results are released.',
        source: {
          label: 'Common Application',
          href: 'https://www.commonapp.org/'
        }
      },
      {
        question: 'Do US universities require SAT/ACT for IB students?',
        answer:
          "Many US universities have adopted test-optional or test-free policies, meaning SAT/ACT scores are not required. In test-optional contexts, strong IB coursework and predicted grades can effectively strengthen your application. Some highly selective universities have reinstated the requirement — always check each university's current policy.",
        source: {
          label: 'Common Application',
          href: 'https://www.commonapp.org/'
        }
      },
      {
        question: 'What IB scores do I need for top US universities?',
        answer:
          "US universities publish no minimum IB score. Georgia Tech, for example, says there is no minimum, but that competitive applicants have mostly 6s and 7s. Admission is holistic: your predicted grades are read alongside essays, activities, recommendations and, at many universities, the SAT or ACT. A university's admit rate, published in its Common Data Set, is the best guide to how competitive it is, and IB Match shows it on each university's programs.",
        source: {
          label: 'Georgia Tech — International First-Year Admission',
          href: 'https://admission.gatech.edu/international/first-year'
        }
      },
      {
        question: 'Can I study medicine or law in the USA straight after the IB?',
        answer:
          'No. In the US, medicine and law are professional degrees that start after a bachelor’s degree. You first complete a four-year bachelor’s in any subject, taking the prerequisite courses medical or law schools ask for (sciences, for medicine), and then apply. That is why IB Match lists no US programs in Medicine or Law.',
        source: {
          label: 'EducationUSA — What is a Graduate Student?',
          href: 'https://educationusa.state.gov/your-5-steps-us-study/research-your-options/graduate/what-graduate-student'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates US admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover US university programmes that match your IB profile. Search by field of study and subject requirements; US universities set no IB points minimum.'
}
