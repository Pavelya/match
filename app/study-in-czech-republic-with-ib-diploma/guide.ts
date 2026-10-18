import type { CountryGuide } from '@/lib/guides/types'

/** Study in Czech Republic with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-czech-republic-with-ib-diploma',
  countryCode: 'CZ',
  exploreCountryId: 'cmko3od7u0007jv04y7a2v8hh',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Czech Republic with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for admission to Czech universities, using only official Czech government and institutional sources. The Czech Republic has a decentralized admission system where each university manages its own applications.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How the Czech Republic recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'With the entry into force of the amendment to the Higher Education Act, **IB diplomas are excluded** under the conditions set out in Section 48(4)(c) from the category of foreign secondary school documents that are assessed during the admission procedure and for which an assessment fee is collected.'
        },
        {
          type: 'answer',
          line: 'Automatic acceptance since March 1, 2025',
          paragraphs: [
            'If applicants submit an IB diploma **after March 1, 2025**, the document will be **automatically accepted by the faculty** in the admission procedure without an assessment fee being charged. No separate nostrification or diploma assessment is needed.'
          ]
        },
        {
          type: 'paragraph',
          text: 'The Czech Republic uses a **decentralized admission system** — each university (and often each faculty within a university) manages its own admissions independently. There is no centralized application portal.'
        }
      ],
      sources: [
        {
          label: 'Charles University — Diploma Recognition',
          href: 'https://cuni.cz/UKEN-593.html'
        },
        {
          label: 'Study in Czechia — How to Apply (recognition of previous education)',
          href: 'https://studyin.gov.cz/plan-your-studies/how-to-apply/'
        }
      ]
    },
    {
      label: 'Equivalence',
      heading: 'IB Diploma and Czech Maturita equivalence',
      blocks: [
        {
          type: 'answer',
          line: 'IB Diploma accepted directly',
          paragraphs: [
            'The IB Diploma is **standalone sufficient** for Czech university admission. You do **not** need a Czech secondary diploma or any additional credential evaluation. Under the 2025 amendment, faculties automatically accept IB diplomas without a separate assessment process.'
          ]
        },
        {
          type: 'paragraph',
          text: 'Universities with **institutional accreditation** (such as Charles University, Czech Technical University, and Masaryk University) may also recognize foreign education directly as part of their admission procedure. However, since the 2025 amendment, this step is no longer necessary for IB Diploma holders.'
        }
      ],
      sources: [
        {
          label: 'Charles University — Diploma Recognition',
          href: 'https://cuni.cz/UKEN-593.html'
        },
        {
          label: 'Study in Czechia — How to Apply (recognition of previous education)',
          href: 'https://studyin.gov.cz/plan-your-studies/how-to-apply/'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'How university admission works',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Czech Republic has a **decentralized admission system**. Each university — and often each faculty within a university — sets its own admission criteria, deadlines, and entrance exam requirements.'
        },
        {
          type: 'list',
          items: [
            '**Apply directly** to each university/faculty through their online application portal',
            '**Multiple applications** — you may apply to several universities and faculties simultaneously',
            '**Deadlines vary** — most faculties set application deadlines between February and April',
            '**Admission criteria differ** — some faculties require entrance exams, others use IB scores, motivation letters, or interviews'
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Czechia — How to Apply',
          href: 'https://studyin.gov.cz/plan-your-studies/how-to-apply/'
        }
      ]
    },
    {
      label: 'Grade evaluation',
      heading: 'How IB scores are assessed',
      blocks: [
        {
          type: 'paragraph',
          text: 'There is **no official national IB-to-Czech grade conversion table**. Each university and faculty evaluates IB scores according to its own criteria. Some key points:'
        },
        {
          type: 'list',
          items: [
            '**Total IB score** is commonly used as a benchmark, and competitive programmes may set a minimum',
            "**Subject-level grades** may be required — e.g., HL Biology and HL Chemistry for Medicine at Charles University's Second Faculty of Medicine",
            "Some faculties offer **entrance exam waivers** for IB students meeting specific score thresholds. For its English-taught General Medicine programme, Charles University's Second Faculty of Medicine asked for at least 35 points (achieved or predicted), with 19 from HL Biology, HL Chemistry and Maths or Physics, and waived the exam for at most 25 IB, EB and BS applicants in 2026"
          ]
        },
        {
          type: 'note',
          text: "**Always check faculty requirements:** Since there is no standardized conversion, you should always check the specific admission requirements on the website of each faculty you are applying to. Contact the faculty's study department or international office for details on how IB scores are evaluated."
        }
      ],
      sources: [
        {
          label:
            'Charles University, Second Faculty of Medicine — Exemption from Entrance Examination',
          href: 'https://www.lf2.cuni.cz/en/applicants/how-to-apply/exemption-from-entrance-examination'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Entrance exams for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Many Czech public universities require **entrance exams** as part of the admission process. The format and content vary by faculty and programme:'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Medicine',
              items: [
                'Written tests in Biology, Chemistry, and Physics',
                'Some faculties include logic tests or interviews',
                "IB exam waivers exist at some faculties (e.g., Charles University's Second Faculty of Medicine — 35 points with strong HL sciences)"
              ]
            },
            {
              title: 'Engineering & IT',
              items: [
                'Mathematics exam is commonly required',
                'Logic and academic aptitude tests at some faculties',
                'HL Mathematics strongly recommended'
              ]
            }
          ]
        },
        {
          type: 'caution',
          text: '**Important:** Entrance exam requirements vary significantly between faculties. Some programmes (especially in humanities or social sciences) may waive entrance exams entirely or use alternative selection methods such as motivation letters, portfolios, or interviews. Always verify with the specific faculty.'
        }
      ],
      sources: [
        {
          label: 'Study in Czechia — How to Apply (Entrance Exams)',
          href: 'https://studyin.gov.cz/plan-your-studies/how-to-apply/'
        },
        {
          label:
            'Charles University, Second Faculty of Medicine — Exemption from Entrance Examination',
          href: 'https://www.lf2.cuni.cz/en/applicants/how-to-apply/exemption-from-entrance-examination'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Czech universities offer programmes in both **Czech** and **English**. The language of instruction determines both the tuition fees and the proficiency requirements.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Czech',
              items: [
                'The university checks whether your **Czech** is good enough',
                'The level and accepted documents are set by each university',
                '**Tuition-free** at public universities for Czech-taught programmes',
                'Many universities offer **Czech courses** for international students, including year-long courses'
              ]
            },
            {
              title: 'English',
              items: [
                '**Proof of English** usually required for English-taught programmes',
                'The level and accepted documents are set by each university',
                '**Tuition fees apply** for English-taught programmes',
                'Wide selection of English-taught programmes available'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Czechia — How to Apply',
          href: 'https://studyin.gov.cz/plan-your-studies/how-to-apply/'
        }
      ]
    },
    {
      label: 'University types',
      heading: 'Public vs private universities',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'Public universities',
              items: [
                'Public and state institutions among the **more than 50** universities and higher education institutions in Czechia',
                '**Tuition-free** for Czech-taught programmes (all nationalities)',
                'Entrance exams are common, especially for competitive programmes',
                'Includes Charles University, Czech Technical University, Masaryk University'
              ]
            },
            {
              title: 'Private universities',
              items: [
                'Tuition fees apply for all programmes',
                'Often offer more English-taught programmes',
                'Must be accredited by the Czech National Accreditation Bureau'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Czechia — Universities in Czechia',
          href: 'https://studyin.gov.cz/plan-your-studies/universities/'
        },
        {
          label: 'Study in Czechia — Learn Czech and study tuition-free',
          href: 'https://studyin.gov.cz/plan-your-studies/learn-czech-study-tuition-free/'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Documents are submitted directly to each university/faculty. Requirements may vary, but the following are typically needed:'
        },
        {
          type: 'documents',
          items: [
            'Completed online application form (submitted to each faculty individually)',
            'Official IB Diploma and transcript of results',
            'Proof of identity (passport or national ID)',
            'Proof of English proficiency for English-taught programmes (the level and accepted documents are set by each university)',
            'Application fee (usually several hundred CZK, up to around CZK 1,000; some programmes charge more)',
            'Programme-specific documents (e.g., portfolio, motivation letter, CV)'
          ]
        },
        {
          type: 'note',
          text: '**Since March 2025:** IB Diploma holders no longer need nostrification or an assessment in the admission procedure. Faculties accept the IB Diploma without charging an assessment fee.'
        }
      ],
      sources: [
        {
          label: 'Study in Czechia — How to Apply',
          href: 'https://studyin.gov.cz/plan-your-studies/how-to-apply/'
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
              date: 'February – April',
              title: 'Application deadlines',
              text: "Many applications for programmes starting in September close between February and April, but some deadlines are earlier or later. Apply through each university's online system."
            },
            {
              date: 'Spring – Early Summer',
              title: 'Entrance exams',
              text: 'If required, entrance exams, interviews or portfolio assessments take place in spring or early summer.'
            },
            {
              date: 'June – July',
              title: 'Admission decisions',
              text: 'Results are usually shared through the online application system, by e-mail or by letter, by the end of June. The letter tells you how to enrol.'
            },
            {
              date: 'July – September',
              title: 'Enrolment & visa',
              text: 'Accepted students enrol and, if applicable, apply for a student visa at the Czech embassy. Non-EU students should start the visa process immediately upon acceptance.'
            }
          ]
        },
        {
          type: 'caution',
          text: '**Deadlines vary by faculty.** Always check the exact application deadline on the website of each faculty you are applying to. Some faculties have deadlines as early as November, while others accept applications until April or later.'
        }
      ],
      sources: [
        {
          label: 'Study in Czechia — How to Apply',
          href: 'https://studyin.gov.cz/plan-your-studies/how-to-apply/'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Is the IB Diploma recognized for university admission in the Czech Republic?',
        answer:
          'Yes. Since March 1, 2025, IB diplomas are excluded from the category of foreign secondary school documents that require assessment during the admission procedure, under the amendment to the Higher Education Act (Section 48(4)(c)). If submitted after March 1, 2025, the IB diploma is automatically accepted by the faculty without an assessment fee being charged.',
        source: {
          label: 'Charles University — Diploma Recognition',
          href: 'https://cuni.cz/UKEN-593.html'
        }
      },
      {
        question: 'Do IB students need to take entrance exams for Czech universities?',
        answer:
          'It depends on the programme and faculty. Some programmes require an entrance exam, interview, portfolio assessment or talent exam; others assess your application on your documents alone. Each faculty sets its own requirements.',
        source: {
          label: 'Study in Czechia — How to Apply',
          href: 'https://studyin.gov.cz/plan-your-studies/how-to-apply/'
        }
      },
      {
        question: 'Are Czech university programmes free for international students?',
        answer:
          'Czech-taught degree programmes at public and state universities are tuition-free, regardless of nationality. Programmes taught in English or another foreign language charge tuition fees, which each university sets.',
        source: {
          label: 'Study in Czechia — Learn Czech and study tuition-free',
          href: 'https://studyin.gov.cz/plan-your-studies/learn-czech-study-tuition-free/'
        }
      },
      {
        question: 'How do IB students apply to Czech universities?',
        answer:
          'The Czech Republic uses a decentralized system — each university manages its own admissions. You apply directly to each faculty through their online application system. Application deadlines are typically between February and April. You may apply to multiple universities and faculties simultaneously; each application is usually submitted and paid for separately.',
        source: {
          label: 'Study in Czechia — How to Apply',
          href: 'https://studyin.gov.cz/plan-your-studies/how-to-apply/'
        }
      },
      {
        question: 'What language do I need to study in the Czech Republic?',
        answer:
          'For Czech-taught programmes, you may need to prove your Czech; for English-taught programmes, universities usually require proof of English. The exact level and accepted documents are set by each university and programme.',
        source: {
          label: 'Study in Czechia — How to Apply',
          href: 'https://studyin.gov.cz/plan-your-studies/how-to-apply/'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Czech admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Czech university programmes that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
