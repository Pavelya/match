import type { CountryGuide } from '@/lib/guides/types'

/** Study in Estonia with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-estonia-with-ib-diploma',
  countryCode: 'EE',
  exploreCountryId: 'cmko29kyq0000jo04lebz00av',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Estonia with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for admission to Estonian universities, using only official Estonian higher-education and institutional sources. Estonia uses a decentralized application system where each university manages its own admissions via the shared DreamApply platform.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Estonia recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'The **International Baccalaureate (IB) Diploma** is accepted by Estonian universities as a secondary education qualification that satisfies the general entry requirements for higher education. IB Diploma holders can **apply directly** to Estonian universities — they are not required to take Estonian state examinations.'
        },
        {
          type: 'paragraph',
          text: 'Several major Estonian universities — including the University of Tartu, Tallinn University, Tallinn University of Technology, the Estonian Academy of Arts, and the Estonian University of Life Sciences — accept the IB Diploma for admission. The Estonian ENIC/NARIC centre (part of the Estonian Education and Youth Board, HARNO) is responsible for evaluating foreign educational qualifications.'
        },
        {
          type: 'caution',
          text: '**Important:** Only the full IB Diploma (stating “Diploma awarded”) is accepted. IB Course Results or partial diplomas (stating “DP Course awarded” or “IB DP Course Results”) are not sufficient for university admission.'
        }
      ],
      sources: [
        {
          label: 'Study in Estonia — General Requirements',
          href: 'https://studyinestonia.ee/general-requirements'
        },
        {
          label: 'Study in Estonia — Admission',
          href: 'https://studyinestonia.ee/study/admission'
        },
        {
          label: 'University of Tartu — Country-specific requirements',
          href: 'https://ut.ee/en/content/country-specific-requirements'
        },
        {
          label: 'Tallinn University — International Baccalaureate',
          href: 'https://www.tlu.ee/en/ib'
        }
      ]
    },
    {
      label: 'Equivalence',
      heading: 'Do IB students need an Estonian diploma?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          line: 'The IB Diploma is accepted as a standalone qualification',
          paragraphs: [
            'The IB Diploma is accepted as a qualification that certifies secondary education completion and grants access to higher education in Estonia. IB holders do not need to obtain a separate Estonian diploma or undergo nostrification.'
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Estonia — General Requirements',
          href: 'https://studyinestonia.ee/general-requirements'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'How admission works for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Estonia uses a **decentralized admission system**. Each university manages its own admissions, but most use the shared online platform [estonia.dreamapply.com](https://estonia.dreamapply.com). You can apply to **multiple universities and programmes** through a single DreamApply account.'
        },
        {
          type: 'list',
          items: [
            '**Step 1:** Find a suitable programme on studyinestonia.ee or estonia.dreamapply.com and check programme-specific requirements',
            '**Step 2:** Prepare required documents — different programmes and universities may have different requirements (documentation, English tests, entrance tests, interviews, portfolios)',
            '**Step 3:** Submit your application via estonia.dreamapply.com and pay the application fee (typically €0–120 per university, non-refundable)',
            '**Step 4:** Some universities may require certified printed copies of documents to be sent — confirm requirements with each university before the deadline'
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Estonia — How to Apply',
          href: 'https://studyinestonia.ee/how-apply'
        },
        {
          label: 'DreamApply — Estonian Universities Application Platform',
          href: 'https://estonia.dreamapply.com'
        }
      ]
    },
    {
      label: 'Grade evaluation',
      heading: 'How IB scores are assessed',
      blocks: [
        {
          type: 'paragraph',
          text: 'Estonia does not have a centralized IB-to-Estonian grade conversion table. Each university evaluates IB scores according to its own criteria. However, universities have published general minimum thresholds:'
        },
        {
          type: 'table',
          table: {
            caption: 'University-specific IB requirements',
            columns: ['University', 'Typical minimum IB score'],
            rows: [
              ['University of Tartu', 'Full IB Diploma (“IB Diploma Awarded”); programme-specific'],
              ['Tallinn University', '27 out of 45 points; EE and TOK at least D'],
              [
                'TalTech (Tallinn University of Technology)',
                'At least 60% of the highest possible grade average'
              ]
            ]
          }
        },
        {
          type: 'list',
          items: [
            'IB Diploma holders apply based on their IB scores — Estonian state examinations are not required',
            'Some universities require IB results to be sent electronically through the official IB verification system',
            'Always check programme-specific requirements as minimum scores may vary by field of study'
          ]
        }
      ],
      sources: [
        {
          label: 'Tallinn University — International Baccalaureate',
          href: 'https://www.tlu.ee/en/ib'
        },
        {
          label: 'TalTech — How to Apply',
          href: 'https://taltech.ee/en/apply'
        },
        {
          label: 'University of Tartu — Country-specific requirements',
          href: 'https://ut.ee/en/content/country-specific-requirements'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Are entrance exams required?',
      blocks: [
        {
          type: 'paragraph',
          text: 'IB Diploma holders are **not required to take Estonian state examinations** — admission is based on the IB Diploma and supporting documents. However, individual programmes may have their own additional qualifying assessments:'
        },
        {
          type: 'list',
          items: [
            '**Most programmes** do not require entrance exams for IB students — admission is based on the IB Diploma and supporting documents',
            '**Some programmes may require** interviews, written essays, portfolios, or programme-specific admission tests — especially in creative arts, architecture, and certain professional fields',
            "Check programme-specific requirements on the university's website or on DreamApply before applying"
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Estonia — General Requirements',
          href: 'https://studyinestonia.ee/general-requirements'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Estonian universities offer programmes in both **English and Estonian**. Language requirements depend on the language of instruction.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'English',
              items: [
                'Usually at least **6 in IELTS** or **72 in TOEFL iBT** (varies by university)',
                "**IB graduation documents** count as proof of English at Tallinn University, and at TalTech for Bachelor's studies",
                'At the University of Tartu, an IB Diploma completed in English meets the English requirement'
              ]
            },
            {
              title: 'Estonian',
              items: [
                'Required only for Estonian-taught programmes',
                'The required level is set by each university',
                'International degree programmes are mostly taught in English'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Estonia — General Requirements',
          href: 'https://studyinestonia.ee/general-requirements'
        },
        {
          label: 'Tallinn University — Proof of English Proficiency',
          href: 'https://www.tlu.ee/en/proof-english-proficiency'
        },
        {
          label: 'TalTech — How to Apply',
          href: 'https://taltech.ee/en/apply'
        },
        {
          label: 'University of Tartu — English language requirements',
          href: 'https://ut.ee/en/english-language-requirements'
        }
      ]
    },
    {
      label: 'University types',
      heading: 'Types of higher education in Estonia',
      blocks: [
        {
          type: 'paragraph',
          text: 'Estonian higher education is offered at two main types of institutions. The IB Diploma is accepted at both.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Research universities',
              items: [
                "Offer **Bachelor's** (3 years), **Master's** (2 years), and **PhD** programmes",
                'Research-based teaching and academic focus',
                'Examples: University of Tartu, Tallinn University, TalTech, Estonian Academy of Arts, Estonian University of Life Sciences'
              ]
            },
            {
              title: 'Professional higher education institutions',
              items: [
                "Offer **professional higher education** (3–4.5 years), awarded as a Bachelor's degree since the 2019/2020 intake",
                'Include mandatory work placements and applied learning',
                'Example: Estonian Aviation Academy'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Estonia — Qualifications',
          href: 'https://studyinestonia.ee/qualifications'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Documents are uploaded electronically through estonia.dreamapply.com. Some universities may also require certified printed copies to be sent by mail:'
        },
        {
          type: 'documents',
          items: [
            'Full IB Diploma (must state "Diploma awarded")',
            'IB transcript of results (sent electronically via IB verification system if required)',
            'Copy of passport or national ID',
            'Proof of English proficiency (IELTS, TOEFL or similar; some universities accept IB graduation documents instead)',
            'Motivation letter (required by some programmes)',
            'Application fee payment confirmation (€0–120, depending on the university)'
          ]
        },
        {
          type: 'caution',
          text: "Different programmes and universities may have different documentation requirements. Always check programme-specific requirements on the university's website or DreamApply listing before applying."
        }
      ],
      sources: [
        {
          label: 'Study in Estonia — How to Apply',
          href: 'https://studyinestonia.ee/how-apply'
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
              date: 'Autumn–Winter',
              title: 'Research programmes',
              text: 'Browse programmes on studyinestonia.ee or estonia.dreamapply.com. Check programme-specific requirements, deadlines, and application fees for each university.'
            },
            {
              date: 'November–April',
              title: 'Submit applications',
              text: "Application periods differ by university. For autumn 2027, Tallinn University accepts Bachelor's applications from 1 November 2026 to 1 March 2027. In 2026, the University of Tartu took Bachelor's applications from 2 January to 15 April, and TalTech's deadline was 1 April for non-EU citizens and 1 June for EU/EEA and Swiss citizens."
            },
            {
              date: 'April–June',
              title: 'Admission decisions',
              text: "Universities review applications and send decisions; the University of Tartu published its 2026 Bachelor's results on 1 June. Some programmes require interviews or tests. Confirm your place and begin the visa or residence permit process if needed."
            },
            {
              date: 'Late August–September',
              title: 'Academic year begins',
              text: 'In 2026, studies at the University of Tartu began on 31 August. Arrange accommodation, travel, and registration with your university before arrival.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Estonia — How to Apply',
          href: 'https://studyinestonia.ee/how-apply'
        },
        {
          label: 'Tallinn University — Application Deadlines',
          href: 'https://www.tlu.ee/en/application-deadlines'
        },
        {
          label: "University of Tartu — Bachelor's and master's studies",
          href: 'https://ut.ee/en/content/bachelors-and-masters-studies-university-tartu'
        },
        {
          label: 'TalTech — Admissions',
          href: 'https://taltech.ee/en/admissions'
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
              title: 'Bachelor & master programmes',
              items: [
                'Tuition fees range from **€1,500 to €15,000 per year** depending on the programme',
                'A few specialities cost more; **medicine, law, business** and social sciences are among the more expensive',
                'Some universities differentiate fees for EU and non-EU students'
              ]
            },
            {
              title: 'Doctoral & exchange students',
              items: [
                '**All doctoral studies** in Estonia are tuition-free',
                '**Exchange students** are exempt from tuition fees and may receive small grants',
                'Government and institutional scholarships are available for international students'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Estonia — Tuition Fees',
          href: 'https://studyinestonia.ee/tuition-fees'
        },
        {
          label: 'Study in Estonia — Scholarships',
          href: 'https://studyinestonia.ee/study/scholarships'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Is the IB Diploma recognized for university admission in Estonia?',
        answer:
          "Yes. The University of Tartu accepts the IB Diploma for Bachelor's studies, as do Tallinn University and TalTech. Only a diploma stating 'IB Diploma Awarded' qualifies; 'IB DP Course awarded' or 'IB DP Course Results' will not suffice.",
        source: {
          label: 'University of Tartu — Country-specific requirements',
          href: 'https://ut.ee/en/content/country-specific-requirements'
        }
      },
      {
        question: 'How do IB students apply to Estonian universities?',
        answer:
          'Estonia uses a decentralized admission system. Applications are submitted through the shared online platform estonia.dreamapply.com, where you can apply to multiple universities and programmes with a single account. Each university sets its own deadlines, requirements, and application fees (typically €0–120).',
        source: {
          label: 'Study in Estonia — How to Apply',
          href: 'https://studyinestonia.ee/how-apply'
        }
      },
      {
        question: 'What IB score do I need for Estonian universities?',
        answer:
          'It varies by university. Tallinn University, for example, requires at least 27 out of 45 points, six subjects (three at HL and three at SL), and at least a D in the Extended Essay and Theory of Knowledge. Always check the specific programme requirements.',
        source: {
          label: 'Tallinn University — International Baccalaureate',
          href: 'https://www.tlu.ee/en/ib'
        }
      },
      {
        question: 'Do I need to speak Estonian to study in Estonia?',
        answer:
          "Not necessarily. Estonian universities offer English-taught programmes, for which you present a certificate of English skills. The usual minimum for Bachelor's and Master's studies is 6 in IELTS or 72 in TOEFL iBT, and some institutions run their own tests. Estonian-taught programmes require Estonian.",
        source: {
          label: 'Study in Estonia — General Requirements',
          href: 'https://studyinestonia.ee/general-requirements'
        }
      },
      {
        question: 'Are there tuition fees for IB students in Estonia?',
        answer:
          'Tuition fees vary by university and programme, generally from €1,500 to €15,000 per year for Bachelor and Master programmes, with a few more expensive exceptions. Doctoral studies are tuition-free for all students. Some universities differentiate fees for EU and non-EU students.',
        source: {
          label: 'Study in Estonia — Tuition Fees',
          href: 'https://studyinestonia.ee/tuition-fees'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Estonian admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Estonian university programmes that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
