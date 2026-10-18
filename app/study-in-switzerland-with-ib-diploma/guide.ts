import type { CountryGuide } from '@/lib/guides/types'

/** Study in Switzerland with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-switzerland-with-ib-diploma',
  countryCode: 'CH',
  exploreCountryId: 'cmip2am54000n7m18y3pq0qy5',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Switzerland with the IB Diploma',
  intro:
    "This guide explains how the International Baccalaureate (IB) Diploma is used for admission to Swiss universities, using only official Swiss higher-education and institutional sources. Switzerland's system is decentralized, meaning that universities determine their own admission policies for foreign qualifications, including the IB Diploma.",
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Switzerland recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: "Swiss universities accept the **International Baccalaureate (IB) Diploma** as a **foreign upper secondary school-leaving certificate** for university admission when it meets each institution's academic criteria and subject requirements."
        },
        {
          type: 'paragraph',
          text: 'Swiss universities evaluate foreign qualifications individually within the framework of general university entry criteria outlined by **Swissuniversities**, the umbrella body for Swiss universities and coordination of admission policies.'
        }
      ],
      sources: [
        {
          label: 'Swissuniversities — Admission requirements by country',
          href: 'https://www.swissuniversities.ch/en/topics/studying/admission-to-universities/countries-1'
        }
      ]
    },
    {
      label: 'Swiss Maturity',
      heading: 'Do IB students need a Swiss Maturity?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          paragraphs: [
            'IB students do **not** need a Swiss *Maturität* (Swiss maturity certificate) to apply to Swiss universities. The IB Diploma is recognized as **equivalent to upper secondary school leaving** by universities and can be used to satisfy the basic admission entitlement and academic eligibility.'
          ]
        }
      ],
      sources: [
        {
          label: 'anerkennung.swiss — Studying in Switzerland',
          href: 'https://www.anerkennung.swiss/en/info/studying'
        }
      ]
    },
    {
      label: 'Admission requirements',
      heading: 'University admission requirements in Switzerland',
      blocks: [
        {
          type: 'paragraph',
          text: 'Swiss universities set **their own admission requirements** for foreign qualifications, including the IB Diploma. There is **no single national admission authority** for university entry; instead, each public university defines how IB results fulfill entry criteria.'
        },
        {
          type: 'paragraph',
          text: "For example, the **University of Basel** states that an upper secondary school-leaving certificate (such as the IB Diploma) is considered for bachelor's studies and evaluated using the institution's regulations."
        }
      ],
      sources: [
        {
          label: 'anerkennung.swiss — Studying in Switzerland',
          href: 'https://www.anerkennung.swiss/en/info/studying'
        },
        {
          label: 'University of Basel — IB Diploma admission',
          href: 'https://www.unibas.ch/en/Studies/Before-My-Studies/Application-Admission/Admission/Admission-to-the-bachelor-s-degree-program/Admission-to-bachelor-s-studies-with-foreign-educational-qualifications/Admission-with-the-International-Baccalaureate-Diploma-IB.html'
        }
      ]
    },
    {
      label: 'Score expectations',
      heading: 'Subject and score expectations for IB students',
      blocks: [
        {
          type: 'caution',
          text: 'There is **no national IB score conversion table** in Switzerland like some other countries have.'
        },
        {
          type: 'paragraph',
          text: 'Instead:'
        },
        {
          type: 'list',
          items: [
            'For 2026/27, most universities require at least **32 out of 42 IB points** (without bonus points), six subjects from set categories, and three at Higher Level, one of them mathematics or a natural science',
            '**ETH Zurich and EPFL require 38 points**, with mathematics and a natural science at Higher Level. EPFL also asks for at least 6 in mathematics and physics, and since 2025 caps first-year places at 3,000, selecting applicants with foreign qualifications by their grades',
            'Specific requirements vary by institution and by degree program. swissuniversities revises its list every year; the 2027/28 rules had not been published when this page was updated'
          ]
        }
      ],
      sources: [
        {
          label: 'University of Basel — IB Diploma admission',
          href: 'https://www.unibas.ch/en/Studies/Before-My-Studies/Application-Admission/Admission/Admission-to-the-bachelor-s-degree-program/Admission-to-bachelor-s-studies-with-foreign-educational-qualifications/Admission-with-the-International-Baccalaureate-Diploma-IB.html'
        },
        {
          label: 'swissuniversities — International Baccalaureate (2026/27)',
          href: 'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'answer',
          word: 'Yes',
          line: 'Language proficiency is required'
        },
        {
          type: 'paragraph',
          text: 'Since Swiss universities teach in **German, French, or English** depending on location and program:'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'German',
              text: 'German-taught programs require **German proficiency** (often B2 or C1 CEFR; the University of Zurich asks for C1)'
            },
            {
              title: 'French',
              text: 'French-taught programs require **French proficiency** (often B2 or better)'
            },
            {
              title: 'English',
              text: 'Some English-taught programs require **IELTS, TOEFL**, or equivalent'
            }
          ]
        },
        {
          type: 'paragraph',
          text: 'Language criteria are set by each university and must be met in addition to the IB academic requirements.'
        }
      ],
      sources: [
        {
          label: "University of Zurich — Admission to a Bachelor's program",
          href: 'https://www.uzh.ch/en/studies/application/bachelor.html'
        }
      ]
    },
    {
      label: 'Admission exams',
      heading: 'Admission exams and selection procedures',
      blocks: [
        {
          type: 'paragraph',
          text: 'Swiss universities may apply **additional selection procedures** for competitive programs such as medicine or engineering:'
        },
        {
          type: 'list',
          items: [
            'Some institutions require **entrance examinations** if academic credentials do not fully meet entry conditions',
            'Others may require **portfolio submissions** for arts programs',
            '**Medicine** is open only to Swiss citizens and holders of a Swiss residence permit. Applicants pre-register with swissuniversities by 15 February, and Basel, Bern, Fribourg, Zurich, USI and ETH Zurich allocate places by an aptitude test (EMS) on the Friday of calendar week 27, in early July'
          ]
        },
        {
          type: 'paragraph',
          text: 'These are set by individual universities.'
        }
      ],
      sources: [
        {
          label: 'Swissuniversities — Admission requirements by country',
          href: 'https://www.swissuniversities.ch/en/topics/studying/admission-to-universities/countries-1'
        },
        {
          label: 'swissuniversities — Applying to medical school',
          href: 'https://www.swissuniversities.ch/en/service/applying-to-medical-school'
        },
        {
          label: 'swissuniversities — Admission with numerus clausus (in German)',
          href: 'https://www.swissuniversities.ch/service/anmeldung-zum-medizinstudium/zulassungsverfahren-mit-numerus-clausus'
        }
      ]
    },
    {
      label: 'Institution types',
      heading: 'Public vs private institutions for IB students',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'Public universities',
              items: [
                'Cantonal universities, ETH/EPFL',
                'Define own admission rules for foreign qualifications',
                'Admission criteria must be met per program'
              ]
            },
            {
              title: 'Private institutions',
              items: [
                'Also accept the IB Diploma',
                'Rules may vary significantly',
                "Always check the institution's official admissions info"
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'swissuniversities',
          href: 'https://www.swissuniversities.ch/en/topics/studying/admission-to-universities/countries-1'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Typical requirements include:'
        },
        {
          type: 'documents',
          items: [
            'Official IB Diploma certificate (or predicted grades if applying before results)',
            'Academic transcripts showing subjects and level (HL/SL)',
            'Proof of language proficiency (German, French, or English, as required)',
            'Identification (passport)',
            'Any programme-specific materials (e.g., portfolio for arts)'
          ]
        },
        {
          type: 'caution',
          text: 'Universities may require **certified translations** and attestations if original documents are not in the language of instruction.'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'Application timeline and process',
      blocks: [
        {
          type: 'caution',
          text: 'Switzerland does **not** operate a centralized application portal for all universities. Each institution has its **own application system and deadlines**.'
        },
        {
          type: 'timeline',
          steps: [
            {
              date: 'Fall intake',
              time: 'September',
              text: 'Most Swiss universities have their main intake in September'
            },
            {
              date: 'University-specific deadlines',
              text: 'Each university publishes its own deadlines. At the University of Zurich, for example, applications for the fall semester run from 1 January to 30 April (earlier for applicants who need a visa), and for Medicine from 1 January to 28 February, after registering with swissuniversities by 15 February.'
            },
            {
              date: 'Apply directly',
              text: 'Applicants should consult the official admissions page of each target university for exact dates and timelines'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'anerkennung.swiss — Studying in Switzerland',
          href: 'https://www.anerkennung.swiss/en/info/studying'
        },
        {
          label: 'University of Zurich — Application deadlines',
          href: 'https://www.uzh.ch/en/studies/application/deadlines.html'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'How is the IB diploma recognized in Switzerland?',
        answer:
          'Swiss universities accept the IB Diploma as a foreign upper secondary qualification, evaluated institution-by-institution. swissuniversities publishes the IB rules of each university.',
        source: {
          label: 'swissuniversities — International Baccalaureate',
          href: 'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate'
        }
      },
      {
        question: 'Do IB students need a Swiss Maturity?',
        answer: 'No; the IB Diploma can serve as an equivalent admission qualification.',
        source: {
          label: 'anerkennung.swiss (SERI) — Studying in Switzerland',
          href: 'https://www.anerkennung.swiss/en/info/studying'
        }
      },
      {
        question: 'Is there a national IB score conversion in Switzerland?',
        answer:
          'No. Each university sets its own IB criteria. For 2026/27, most require at least 32 of 42 points (without bonus points) and three subjects at Higher Level, one of them mathematics or a natural science; ETH Zurich and EPFL require 38. The 2027/28 rules had not been published when this page was updated.',
        source: {
          label: 'swissuniversities — International Baccalaureate',
          href: 'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate'
        }
      },
      {
        question: 'Can IB students study medicine in Switzerland?',
        answer:
          'Only if you hold Swiss citizenship or a Swiss residence permit: swissuniversities states that other applicants cannot be admitted to medical studies because places are limited. Eligible applicants pre-register with swissuniversities by 15 February. Basel, Bern, Fribourg, Zurich, USI and ETH Zurich then allocate places by an aptitude test (EMS), held on the Friday of calendar week 27, in early July.',
        source: {
          label: 'swissuniversities — Applying to medical school',
          href: 'https://www.swissuniversities.ch/en/service/applying-to-medical-school'
        }
      },
      {
        question: 'Is German or French required?',
        answer:
          'Yes, for programs taught in those languages. Swiss universities require proficiency in the language of instruction; the University of Zurich, for example, asks for German at C1 level. English-taught programs require English proficiency.',
        source: {
          label: "University of Zurich — Admission to a Bachelor's program",
          href: 'https://www.uzh.ch/en/studies/application/bachelor.html'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Swiss admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Swiss university programs that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
