import type { CountryGuide } from '@/lib/guides/types'

/** Study in Sweden with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-sweden-with-ib-diploma',
  countryCode: 'SE',
  exploreCountryId: 'cml3sz2dm000ijy04azp7yxj5',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Sweden with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for admission to Swedish universities, using only official Swedish higher-education and institutional sources. Sweden uses a centralized application system via universityadmissions.se for all university applications.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Sweden recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: "The **International Baccalaureate (IB) Diploma** fulfils the **general entry requirements** for bachelor's studies at Swedish universities. Both the regular and non-regular IB Diploma are accepted."
        },
        {
          type: 'paragraph',
          text: 'Sweden uses a **centralized application system** — all applications to Swedish universities are submitted through [universityadmissions.se](https://www.universityadmissions.se/en/). This means you apply to multiple programmes through a single portal.'
        },
        {
          type: 'paragraph',
          text: 'Swedish university admissions are **requirement-driven, not holistic**. This means that missing a specific required subject will result in your application not being considered, regardless of your overall IB score. Meeting the specific entry requirements for each programme is therefore critical.'
        }
      ],
      sources: [
        {
          label: 'University Admissions in Sweden — IB Studies',
          href: 'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/'
        },
        {
          label: 'Study in Sweden — How to Apply',
          href: 'https://studyinsweden.se/plan-your-studies/how-to-apply/'
        }
      ]
    },
    {
      label: 'Merit rating',
      heading: 'IB to Swedish merit rating conversion',
      blocks: [
        {
          type: 'paragraph',
          text: 'IB points are converted to a **Swedish merit rating on a scale of 10.00–20.00**. Applicants can earn up to **2.5 additional merit points** for modern languages, English and mathematics, bringing the maximum possible score to **22.50**. The table below has been used since the autumn 2025 admissions.'
        },
        {
          type: 'table',
          table: {
            caption: 'IB points to Swedish merit rating',
            columns: ['IB points', 'Swedish merit rating'],
            rows: [
              ['24', '13.18'],
              ['25', '13.94'],
              ['30', '16.70'],
              ['35', '18.57'],
              ['38', '19.38'],
              ['40', '19.70'],
              ['42', '19.90'],
              ['43–45', '20.00']
            ]
          }
        },
        {
          type: 'subheading',
          text: 'Bonus merit points (up to 2.5)'
        },
        {
          type: 'list',
          items: [
            '**Modern Foreign Languages** (max 1.5 pts) — Language A, Language B HL or Language B SL (not Swedish or English) = 1.5 pts; Language Ab Initio = 0.5 pts',
            '**English** (max 1.0 pt) — English A HL/SL = 1.0 pt; English B HL = 1.0 pt; English B SL (if English is language of instruction) = 1.0 pt',
            '**Mathematics** (max 1.5 pts) — depends on your IB course and the maths level the programme requires: AA HL always gives 1.5 pts, AI SL at most 1.0 pt. Courses you need to be eligible do not give merit points'
          ]
        }
      ],
      sources: [
        {
          label: 'University Admissions in Sweden — IB Studies',
          href: 'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/'
        },
        {
          label: 'Antagning.se — Calculate your merit rating (in Swedish)',
          href: 'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
        },
        {
          label: 'Antagning.se — Merit points for IB (in Swedish)',
          href: 'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/meritpoang/'
        }
      ]
    },
    {
      label: 'Subject requirements',
      heading: 'IB subject requirements for Swedish programmes',
      blocks: [
        {
          type: 'paragraph',
          text: 'Swedish universities set **specific entry requirements** for each programme. IB subjects are matched to equivalent Swedish upper secondary courses. Meeting these requirements is **mandatory** — your application will not be considered if you lack a required subject, even with a high overall IB score.'
        },
        {
          type: 'list',
          items: [
            '**Minimum grade of 4** in most subjects to meet specific entry requirements',
            '**Grade 3 accepted** for Biology, Chemistry and Physics at **Higher Level (HL)**',
            '**Mathematics:** AA HL meets Matematik specialisering, AI HL meets Matematik 5, AA SL meets Matematik 4, and AI SL meets Matematik 3c, so AI meets one level less than AA at the same level',
            '**A grade 3 in mathematics** counts one level lower: AA HL or AI HL meet Matematik 4, AA SL Matematik 3c, and AI SL Matematik 2a'
          ]
        },
        {
          type: 'caution',
          text: '**Important:** Swedish admissions are requirement-driven, not holistic. Missing a specific required subject means your application will **not be considered**, regardless of your total IB points. Always check the specific entry requirements for each programme before applying.'
        }
      ],
      sources: [
        {
          label: 'University Admissions in Sweden — IB Studies',
          href: 'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Sweden offers a large number of programmes taught in **English**. For Swedish-taught programmes, proof of Swedish language proficiency is required.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'English',
              items: [
                '**English 6 (Level 2):** English B SL with a language of instruction other than English',
                '**English 7 (Level 3):** English A1/A2 HL or SL; English B HL; or English B SL with English as language of instruction',
                'IELTS, TOEFL, or equivalent also accepted'
              ]
            },
            {
              title: 'Swedish',
              items: [
                'Required only for Swedish-taught programmes',
                '**Svenska 3 (Level 3):** Swedish A, A1, or A2 SL/HL; or Norwegian/Danish A or A1 SL/HL',
                "Many bachelor's and most master's programmes are available entirely in English"
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'University Admissions in Sweden — IB Studies',
          href: 'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/'
        },
        {
          label: 'Study in Sweden — How to Apply',
          href: 'https://studyinsweden.se/plan-your-studies/how-to-apply/'
        }
      ]
    },
    {
      label: 'Application process',
      heading: 'How to apply with the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: "All applications are submitted through Sweden's centralized portal: [universityadmissions.se](https://www.universityadmissions.se/en/). You can apply to up to **8 courses and programmes** per admissions round and rank them in order of preference."
        },
        {
          type: 'list',
          items: [
            '**Create an account** on universityadmissions.se and select up to 8 courses and programmes ranked by preference',
            '**Submit documents** — if you graduate in the spring you apply, your results go to “UHR” through the IB Results Service; if you already have your diploma, upload scans directly',
            '**Selection** — applicants are ranked based on their merit rating and any applicable bonus points'
          ]
        },
        {
          type: 'caution',
          text: '**Still in your final IB year?** University Admissions advises you not to apply to the first admissions round, because its selection is in April, before you have final grades. EU/EEA and Swiss citizens can apply to the second round instead. Non-EU/EEA citizens are advised not to, as there is not enough time to get a residence permit; they can apply to the first round the following year, or for a spring-semester start.'
        }
      ],
      sources: [
        {
          label: 'University Admissions in Sweden — International Baccalaureate studies',
          href: 'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/'
        },
        {
          label: 'University Admissions in Sweden — Admissions rounds',
          href: 'https://www.universityadmissions.se/en/key-dates-and-deadlines/admission-rounds-and-spring-semester-availability/'
        },
        {
          label: 'University Admissions in Sweden — Rank your selections',
          href: 'https://www.universityadmissions.se/en/apply-to-bachelors/rank-your-selections-bachelors/'
        }
      ]
    },
    {
      label: 'Högskoleprovet',
      heading: 'Swedish Scholastic Aptitude Test (Högskoleprovet)',
      blocks: [
        {
          type: 'paragraph',
          text: 'The **Högskoleprovet** (Swedish Scholastic Aptitude Test) is an optional standardized test that can be used to supplement your IB merit rating:'
        },
        {
          type: 'list',
          items: [
            'Taken in **Swedish only** — most useful for students already proficient in Swedish',
            'Swedish universities allocate places across different selection groups — your Högskoleprovet score and IB merit rating are considered in **separate groups**',
            'Can potentially **boost your chances** if your IB merit rating does not reach the cutoff for a competitive programme'
          ]
        }
      ],
      sources: [
        {
          label: 'Swedish Council for Higher Education (UHR)',
          href: 'https://www.uhr.se/en/start/'
        }
      ]
    },
    {
      label: 'Tuition & fees',
      heading: 'Tuition fees for IB students',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'EU/EEA citizens',
              items: [
                '**No tuition fees** at public universities',
                'Includes citizens of Switzerland',
                'Small student union fees may apply (~SEK 50–350/semester)'
              ]
            },
            {
              title: 'Non-EU/EEA citizens',
              items: [
                'Tuition fees apply (about SEK 80,000–320,000 a year)',
                'Application fee of SEK 900 required via universityadmissions.se',
                "Swedish Institute and university scholarships are aimed mainly at master's applicants"
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Sweden — How to Apply',
          href: 'https://studyinsweden.se/plan-your-studies/how-to-apply/'
        },
        {
          label: 'Study in Sweden — Fees and costs',
          href: 'https://studyinsweden.se/plan-your-studies/fees-costs/'
        },
        {
          label: 'University Admissions in Sweden — Admissions rounds',
          href: 'https://www.universityadmissions.se/en/key-dates-and-deadlines/admission-rounds-and-spring-semester-availability/'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Documents are submitted electronically through universityadmissions.se:'
        },
        {
          type: 'documents',
          items: [
            'If your IB Diploma is awarded in the spring you apply: results made available to recipient code "UHR" through the IB Results Service',
            'If you already have your IB Diploma: scans or copies of the original diploma including results',
            'Proof of identity (passport or national ID)',
            'Proof of English proficiency (if not met through IB English courses)',
            'Pre-IB transcripts if applicable (e.g., to demonstrate Swedish language study)',
            'Any programme-specific supplementary documents (e.g., portfolio, work samples)'
          ]
        },
        {
          type: 'caution',
          text: 'If your IB Diploma is awarded in the spring you apply, your IB coordinator must make your results available to recipient code **“UHR”** through the IB Results Service; for autumn 2027 the deadline is 5 July 2027. If you already have your diploma, do **not** use the Results Service: upload scans instead.'
        }
      ],
      sources: [
        {
          label: 'University Admissions in Sweden — IB Studies',
          href: 'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/'
        },
        {
          label: 'University Admissions in Sweden — International Baccalaureate studies',
          href: 'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/'
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
              date: '16 October 2026 – 15 January 2027',
              title: 'First admissions round',
              text: "The round for international students, with all English-taught programmes. Fees and documents are due by 1 February 2027, and bachelor's results are published on 8 April 2027. It is for applicants who already have their IB Diploma: if you are in your final year, University Admissions advises you not to apply in this round."
            },
            {
              date: '15 March – 15 April 2027',
              title: 'Second admissions round',
              text: 'The regular Swedish round, with fewer English-taught programmes. EU/EEA and Swiss citizens finishing the IB in 2027 apply here; the application fee is due by 23 April. Non-EU/EEA citizens are advised not to apply, as there is not enough time to get a residence permit.'
            },
            {
              date: '5 July 2027',
              title: 'IB results via results service',
              text: 'Your IB coordinator makes your results available to recipient code “UHR” through the IB Results Service.'
            },
            {
              date: '9 July 2027',
              title: 'Admission results',
              text: 'Second-round results are published on 9 July, and you reply by 16 July. Second admissions results follow on 22 July, and the semester starts in August or September.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'University Admissions in Sweden — IB Studies',
          href: 'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/'
        },
        {
          label: 'Study in Sweden — How to Apply',
          href: 'https://studyinsweden.se/plan-your-studies/how-to-apply/'
        },
        {
          label: 'University Admissions in Sweden — Autumn semester dates',
          href: 'https://www.universityadmissions.se/en/key-dates-and-deadlines/autumn-semester-dates/'
        },
        {
          label: 'University Admissions in Sweden — Admissions rounds',
          href: 'https://www.universityadmissions.se/en/key-dates-and-deadlines/admission-rounds-and-spring-semester-availability/'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Is the IB Diploma recognized for university admission in Sweden?',
        answer:
          "Yes. The IB Diploma fulfils the general entry requirements for bachelor's studies in Sweden. Applications are submitted through the centralized portal universityadmissions.se. Both the regular and non-regular IB Diploma are accepted.",
        source: {
          label: 'University Admissions in Sweden — IB Studies',
          href: 'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/'
        }
      },
      {
        question: 'How are IB points converted for Swedish university admission?',
        answer:
          'Your IB total points are converted to a Swedish merit rating on a scale of 10.00–20.00, plus up to 2.5 merit points for modern languages, English and mathematics. In the table used since the autumn 2025 admissions, 24 IB points = 13.18, 35 points = 18.57, and 43–45 points = 20.00. The maximum achievable score including merit points is 22.50.',
        source: {
          label: 'Antagning.se — Calculate your merit rating (in Swedish)',
          href: 'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
        }
      },
      {
        question: 'What IB grades are needed for specific subject requirements?',
        answer:
          'A minimum grade of 4 is required for a course to meet a specific entry requirement. A grade 3 is accepted in Biology, Chemistry and Physics at Higher Level (HL). In mathematics, a grade 3 counts one Swedish level lower: AA HL and AI HL then meet Matematik 4, AA SL meets Matematik 3c, and AI SL meets Matematik 2a.',
        source: {
          label: 'University Admissions in Sweden — IB Studies',
          href: 'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/'
        }
      },
      {
        question: 'Do I need to speak Swedish to study in Sweden?',
        answer:
          "Not necessarily. Sweden offers a large number of English-taught programmes at both bachelor's and master's level. For Swedish-taught programmes, proof of Swedish language proficiency is required. English proficiency can be demonstrated through IB English courses (English A or English B HL/SL).",
        source: {
          label: 'Study in Sweden — How to Apply',
          href: 'https://studyinsweden.se/plan-your-studies/how-to-apply/'
        }
      },
      {
        question: 'How do IB students submit their results to Swedish universities?',
        answer:
          'If you finish the IB in the spring you apply, apply in the second admissions round (University Admissions recommends this only for EU/EEA and Swiss citizens) and ask your IB coordinator to make your results available to recipient code "UHR" through the IB Results Service. For autumn 2027 the deadline is 5 July 2027. If you already have your IB Diploma, upload scans or copies of it to universityadmissions.se by the document deadline.',
        source: {
          label: 'University Admissions in Sweden — Autumn semester dates',
          href: 'https://www.universityadmissions.se/en/key-dates-and-deadlines/autumn-semester-dates/'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Swedish admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Swedish university programmes that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
