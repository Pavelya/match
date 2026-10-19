import type { CountryGuide } from '@/lib/guides/types'

/** Study in Denmark with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-denmark-with-ib-diploma',
  countryCode: 'DK',
  exploreCountryId: 'cmkxwd9ui0000lg04p0t1gmln',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Denmark with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for admission to Danish universities, using only official Danish higher-education and institutional sources. Denmark uses a centralized application system via optagelse.dk for all university applications.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Denmark recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: "The **International Baccalaureate (IB) Diploma** satisfies the **general entry requirements** for Danish undergraduate programmes, including Bachelor's, Professional Bachelor's, and Academy Profession degrees. A minimum of **24 IB points** is required."
        },
        {
          type: 'paragraph',
          text: 'Your IB qualification must be on a level with a Danish upper secondary school leaving certificate. You can verify whether your qualification is recognized using the official entry requirements checker at [ufsn.dk/recognition/entry](https://ufsn.dk/recognition/entry).'
        },
        {
          type: 'paragraph',
          text: "In addition to the general entry requirements, individual programmes have **specific entry requirements** — these typically include particular subjects at certain levels (A-level/HL, B-level/SL, or C-level) and minimum grades. You must check each programme's specific requirements before applying."
        }
      ],
      sources: [
        {
          label: 'Study in Denmark — How to Apply',
          href: 'https://studyindenmark.dk/study-options/how-to-apply'
        },
        {
          label: 'UFSN — International Qualifications for Entry',
          href: 'https://ufsn.dk/recognition/entry'
        },
        {
          label:
            'Danish Agency for Higher Education and Science — Admission of IB students (in Danish)',
          href: 'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/regler-og-raad/internationale-eksaminer/vejledning-om-ib/optagelse-af-ib-elever/'
        }
      ]
    },
    {
      label: 'Equivalence',
      heading: 'Do IB students need a Danish diploma?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          line: 'The IB Diploma is accepted as a standalone qualification',
          paragraphs: [
            'The IB Diploma is recognized as equivalent to a Danish upper secondary school leaving certificate for admission purposes. You do not need to obtain a separate Danish diploma or undergo a formal credential evaluation process.'
          ]
        },
        {
          type: 'caution',
          text: "**IB Certificate holders:** With Diploma Programme Course Results (formerly the IB Certificate) of at least 18 points and at least grade 3 in all six subjects, you can apply to Academy Profession and Professional Bachelor's programmes. University Bachelor's programmes also require supplementary courses or an IB retake."
        }
      ],
      sources: [
        {
          label: 'Study in Denmark — How to Apply',
          href: 'https://studyindenmark.dk/study-options/how-to-apply'
        },
        {
          label:
            'Danish Agency for Higher Education and Science — Admission of IB students (in Danish)',
          href: 'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/regler-og-raad/internationale-eksaminer/vejledning-om-ib/optagelse-af-ib-elever/'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'How admission works for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Denmark uses a **centralized application system**. All applications to Danish higher education are submitted through [optagelse.dk](https://www.optagelse.dk/higher-education.shtml). You can apply to up to **8 programmes** and rank them by preference. The Coordinated Admission system (KOT) ensures you receive at most one offer — at your highest possible priority.'
        },
        {
          type: 'list',
          items: [
            '**Quota 1** — Applicants are assessed primarily on their converted grade point average (GPA). IB grades are converted to the Danish 7-point scale.',
            '**Quota 2** — Considers other qualifications in addition to grades, such as work experience, motivation, and relevant activities. Assessed individually by each institution.',
            'IB applicants who apply by **March 15** are **automatically considered in both Quota 1 and Quota 2** if their GPA can be converted to the Danish scale.'
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Denmark — How to Apply',
          href: 'https://studyindenmark.dk/study-options/how-to-apply'
        },
        {
          label: 'Optagelse.dk — Apply for Higher Education',
          href: 'https://www.optagelse.dk/higher-education.shtml'
        }
      ]
    },
    {
      label: 'Grade conversion',
      heading: 'IB to Danish grade conversion',
      blocks: [
        {
          type: 'paragraph',
          text: 'IB grades are converted to the **Danish 7-point grading scale (7-trinsskalaen)** for use in Quota 1 admission. The Danish Agency for Higher Education and Science publishes the conversion tables, and institutions apply them to your application.'
        },
        {
          type: 'list',
          items: [
            'Your **IB total points** are converted to a Danish grade point average. Single subject grades are converted separately where a programme sets a minimum grade in a subject; an IB 3 becomes 02, the Danish pass grade',
            'The **1.08 bonus** for applying within two years of graduating was abolished from the 2020 admissions',
            'The tables are normally updated **every three years**. Since 2024 there are two IB tables: one for 2020–2022 graduates, whose Covid-era grades were unusually high, and one for all other years'
          ]
        },
        {
          type: 'table',
          table: {
            caption: 'The Danish 7-point scale',
            columns: ['Danish grade', 'Description', 'ECTS equivalent'],
            rows: [
              ['12', 'Excellent', 'A'],
              ['10', 'Very Good', 'B'],
              ['7', 'Good', 'C'],
              ['4', 'Fair', 'D'],
              ['02', 'Adequate', 'E'],
              ['00', 'Inadequate', 'Fx'],
              ['-3', 'Unacceptable', 'F']
            ]
          }
        }
      ],
      sources: [
        {
          label: 'Study in Denmark — How to Apply',
          href: 'https://studyindenmark.dk/study-options/how-to-apply'
        },
        {
          label:
            'Danish Agency for Higher Education and Science — IB conversion tables (in Danish)',
          href: 'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/regler-og-raad/internationale-eksaminer/vejledning-om-ib/baggrunden-for-ib-omregningsskalaer-for-karaktergennemsnit/'
        },
        {
          label:
            'Ministry of Higher Education and Science — 1.08 bonus abolished, July 2020 (in Danish)',
          href: 'https://ufm.dk/aktuelt/pressemeddelelser/2020/juli/karakterkravene-til-de-videregaaende-uddannelser-falder/'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Are entrance exams required?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Most Danish university programmes **do not require entrance exams** for IB students. Admission is primarily based on your converted GPA (Quota 1) or a holistic assessment (Quota 2).'
        },
        {
          type: 'list',
          items: [
            '**Some programmes have admission tests** — often in creative fields (arts, architecture, design) or specific professional programmes. The University of Southern Denmark fills Quota 2 for most of its programmes through its own test, uniTEST, which assesses academic ability rather than subject knowledge; Quota 1 there still goes by GPA',
            'Programmes with admission tests have the same **March 15 deadline**',
            'If you do not meet specific subject requirements, you may be able to take a **supplementary course** (offered only in Danish) to become eligible, though this will not increase your GPA score'
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Denmark — How to Apply',
          href: 'https://studyindenmark.dk/study-options/how-to-apply'
        },
        {
          label: 'University of Southern Denmark — Admission test',
          href: 'https://www.sdu.dk/en/uddannelse/bachelor/bachelor-admission/admission-requirements/admission-test'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Denmark offers more than **600 English-taught programmes**. Language requirements depend on the language of instruction.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'English',
              items: [
                '**English B (minimum):** IELTS 6.5, TOEFL 79–93 (iBT), or Cambridge CAE',
                '**English A (some programmes):** IELTS 7.0, TOEFL 94–101 (iBT), or Cambridge CPE',
                'IB English A or English B courses may satisfy English requirements — check with the institution'
              ]
            },
            {
              title: 'Danish',
              items: [
                'Required only for Danish-taught programmes',
                'Must pass **Studieprøven** (Danish as a Foreign Language test) or **Danskprøve 2**; some programmes require **Danskprøve 3**',
                'International students can take **Danish lessons for free** — allowing you to start in an English-taught programme and continue in Danish later'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Denmark — Language Requirements',
          href: 'https://studyindenmark.dk/study-options/how-to-apply/language-requirements'
        },
        {
          label: 'Study in Denmark — How to Apply',
          href: 'https://studyindenmark.dk/study-options/how-to-apply'
        }
      ]
    },
    {
      label: 'University types',
      heading: 'Types of higher education in Denmark',
      blocks: [
        {
          type: 'paragraph',
          text: 'Danish higher education is offered across five types of institutions. All are publicly funded, and the IB Diploma is accepted at each type.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Research universities',
              items: [
                "Offer **Bachelor's** (3 years), **Master's** (2 years), and **PhD** programmes",
                'Research-based teaching and academic focus',
                'Examples: University of Copenhagen, Aarhus University, DTU, CBS'
              ]
            },
            {
              title: 'University colleges & academies',
              items: [
                "**University Colleges** offer Professional Bachelor's degrees (3½–4 years) with mandatory work placements",
                '**Business Academies** offer Academy Profession degrees (2–2½ years) with top-up options',
                '**Artistic HEIs** and **Maritime schools** also accept IB qualifications'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Denmark — What Can I Study?',
          href: 'https://studyindenmark.dk/study-options/what-can-i-study'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Documents are uploaded electronically through optagelse.dk. You must also print, sign, and send a signature page to each institution:'
        },
        {
          type: 'documents',
          items: [
            'IB Diploma and transcript of results',
            'Proof of identity (passport or national ID)',
            'Proof of English proficiency (IELTS, TOEFL, or Cambridge — if not met through IB English courses)',
            'Signed signature page from optagelse.dk (printed, signed by hand, and sent to the institution)',
            'Proof of Danish language proficiency (only for Danish-taught programmes)',
            'Any programme-specific supplementary documents (e.g., portfolio, work samples)'
          ]
        },
        {
          type: 'caution',
          text: "If you are completing your IB Diploma in the year of application, your IB coordinator must register you with IBNET's “result service” to allow universities online access to your results. Check with your coordinator before the deadline."
        }
      ],
      sources: [
        {
          label: 'Study in Denmark — How to Apply',
          href: 'https://studyindenmark.dk/study-options/how-to-apply'
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
              date: '1 February 2027',
              title: 'Application portal opens',
              text: 'The centralized application portal optagelse.dk opens for the coming academic year. Create your account and begin your application.'
            },
            {
              date: '15 March 2027',
              time: '12:00 noon CET',
              title: 'Application deadline for IB students',
              text: 'All applicants with an IB Diploma — whether from a school in Denmark or abroad — must apply by 15 March. This deadline also applies to Quota 2 applicants and programmes with admission tests.'
            },
            {
              date: '5 July 2027',
              time: '12:00 noon CET',
              title: 'Final edits',
              text: 'You can edit and change your priority order, delete applications, and upload additional documents on optagelse.dk until this date.'
            },
            {
              date: '28 July 2027',
              title: 'Admission results',
              text: 'You will receive an answer to your application. If not admitted, you can apply for vacant study places by contacting institutions directly.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Denmark — How to Apply',
          href: 'https://studyindenmark.dk/study-options/how-to-apply'
        },
        {
          label: 'Optagelse.dk — Apply for Higher Education',
          href: 'https://www.optagelse.dk/higher-education.shtml'
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
              title: 'EU/EEA/Swiss citizens',
              items: [
                '**No tuition fees** at public institutions',
                'Also free for exchange programme students',
                'Students with permanent or certain temporary residence permits are also exempt'
              ]
            },
            {
              title: 'Non-EU/EEA citizens',
              items: [
                'Tuition fees apply — amounts vary by institution and programme',
                'Residence permit application fee applies',
                'Government scholarships available for highly qualified non-EU/EEA students'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Denmark — Tuition Fees',
          href: 'https://studyindenmark.dk/study-options/tuition-fees-and-scholarships'
        },
        {
          label: 'Study in Denmark — Scholarships',
          href: 'https://studyindenmark.dk/study-options/scholarships'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Is the IB Diploma recognized for university admission in Denmark?',
        answer:
          "Yes. The IB Diploma satisfies the general entry requirements for Danish undergraduate programmes (Bachelor's, Professional Bachelor's, and Academy Profession degrees). A minimum of 24 IB points is required.",
        source: {
          label:
            'Danish Agency for Higher Education and Science — Admission of IB students (in Danish)',
          href: 'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/regler-og-raad/internationale-eksaminer/vejledning-om-ib/optagelse-af-ib-elever/'
        }
      },
      {
        question: 'How are IB grades converted for Danish university admission?',
        answer:
          'Your IB total is converted to a grade point average on the Danish 7-point scale, using a table from the Danish Agency for Higher Education and Science. The Agency normally updates its tables every three years; since 2024 there are two IB tables, one for 2020–2022 graduates and one for all other years. The former 1.08 bonus for starting quickly was abolished in 2020.',
        source: {
          label:
            'Danish Agency for Higher Education and Science — IB conversion tables (in Danish)',
          href: 'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/regler-og-raad/internationale-eksaminer/vejledning-om-ib/baggrunden-for-ib-omregningsskalaer-for-karaktergennemsnit/'
        }
      },
      {
        question: 'How do IB students apply to Danish universities?',
        answer:
          'All applications are submitted through the centralized portal optagelse.dk. IB applicants must apply by 15 March 2027, 12:00 noon CET. You can apply for up to 8 programmes and rank them by preference. The Coordinated Admission system (KOT) ensures you receive at most one offer.',
        source: {
          label: 'Study in Denmark — How to Apply',
          href: 'https://studyindenmark.dk/study-options/how-to-apply'
        }
      },
      {
        question: 'Do I need to speak Danish to study in Denmark?',
        answer:
          "Not necessarily. Denmark offers many English-taught programmes. For English-taught programmes, you need English proficiency comparable to Danish 'English B' (approximately IELTS 6.5). For Danish-taught programmes, you must pass 'Studieprøven' (Danish as a Foreign Language test). International students can take Danish lessons for free.",
        source: {
          label: 'Study in Denmark — Language Requirements',
          href: 'https://studyindenmark.dk/study-options/how-to-apply/language-requirements'
        }
      },
      {
        question: 'Is higher education in Denmark free for IB students?',
        answer:
          'It depends on your nationality. Higher education is free for EU/EEA and Swiss citizens. All other students must pay tuition fees, which are set by individual institutions. Government scholarships are available for non-EU/EEA students.',
        source: {
          label: 'Study in Denmark — Tuition Fees',
          href: 'https://studyindenmark.dk/study-options/tuition-fees-and-scholarships'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Danish admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Danish university programmes that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
