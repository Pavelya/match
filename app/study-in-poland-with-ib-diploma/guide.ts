import type { CountryGuide } from '@/lib/guides/types'

/** Study in Poland with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-poland-with-ib-diploma',
  countryCode: 'PL',
  exploreCountryId: 'cmkpi3zsm0000ii0427n8n79h',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Poland with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for admission to Polish universities, using only official Polish government and institutional sources. Poland uses a decentralized admission system where you apply directly to each university.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Poland recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: '**International Baccalaureate (IB)** certificates are **recognised automatically** in Poland for applying to first-cycle and long-cycle studies, under Article 326a of the Law on Higher Education and Science. No nostrification or individual recognition statement is required.'
        },
        {
          type: 'paragraph',
          text: "NAWA (the National Agency for Academic Exchange), which serves as Poland's **ENIC-NARIC centre**, lists IB and EB certificates among those that do not need its individual recognition statement."
        },
        {
          type: 'paragraph',
          text: 'While the IB Diploma gives holders the **right to apply** for studies at Polish higher education institutions, each university sets its own **specific admission requirements**, including which IB subjects and levels are required for particular programmes.'
        }
      ],
      sources: [
        {
          label: 'NAWA — Applying for admission to first/long-cycle studies',
          href: 'https://nawa.gov.pl/en/recognition/recognition-for-academic-purposes/applying-for-admission-to-first-long-cycle-studies'
        },
        {
          label: 'study.gov.pl — How to Apply',
          href: 'https://study.gov.pl/how-to-apply'
        }
      ]
    },
    {
      label: 'Equivalence',
      heading: 'Do IB students need a Polish diploma?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          line: 'The IB Diploma is accepted as a standalone qualification',
          paragraphs: [
            'IB certificates are recognised automatically for applying to studies in Poland. You do not need to undergo nostrification (the standard credential evaluation process for foreign diplomas in Poland) or obtain an individual recognition statement from NAWA.'
          ]
        },
        {
          type: 'caution',
          text: '**IB Course Results holders:** If you received IB Diploma Programme Course Results rather than the full IB Diploma, contact the university directly to confirm that they give you the right to apply.'
        }
      ],
      sources: [
        {
          label: 'NAWA — Applying for admission to first/long-cycle studies',
          href: 'https://nawa.gov.pl/en/recognition/recognition-for-academic-purposes/applying-for-admission-to-first-long-cycle-studies'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'How admission works for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Poland uses a **decentralized admission system**. There is no centralized application portal — you apply **directly to each university** through its own online recruitment system. Each institution sets its own deadlines, requirements, and admission criteria.'
        },
        {
          type: 'list',
          items: [
            '**University-specific recruitment** — Each university has its own online recruitment portal (e.g., IRK at the University of Warsaw, ERK at Jagiellonian University). Create an account and submit your application through the portal of each institution.',
            '**No limit on applications** — You can apply to multiple universities and programmes simultaneously, as there is no centralized coordination system.',
            "**Admission criteria** — Admission is typically based on your IB scores converted to the university's point system. Competitive programmes (medicine, law, engineering) may have higher score thresholds or additional requirements such as entrance exams."
          ]
        }
      ],
      sources: [
        {
          label: 'study.gov.pl — How to Apply',
          href: 'https://study.gov.pl/how-to-apply'
        }
      ]
    },
    {
      label: 'Grade conversion',
      heading: 'IB to Polish grade conversion',
      blocks: [
        {
          type: 'paragraph',
          text: "Poland does not have a **single national conversion formula** for IB grades. Each university defines its own rules for converting IB scores (1–7) to its internal point or percentage system. The University of Warsaw's rules for 2027/28 are an example:"
        },
        {
          type: 'list',
          items: [
            '**Higher Level (HL) results** count in full (× 1), like the extended-level (rozszerzony) Polish Matura',
            '**Standard Level (SL) results** are multiplied by 0.6, like the basic-level (podstawowy) Polish Matura',
            "Conversion specifics vary — always check the admission rules (*zasady rekrutacji*) on each university's recruitment page"
          ]
        },
        {
          type: 'table',
          table: {
            caption: 'IB grade to percentage (University of Warsaw)',
            columns: ['IB grade', 'Percentage'],
            rows: [
              ['7', '100%'],
              ['6', '90%'],
              ['5', '75%'],
              ['4', '60%'],
              ['3', '45%'],
              ['2', '30%']
            ]
          },
          note: "These are the University of Warsaw's values; the SL multiplier is then applied. Other universities may use different values."
        }
      ],
      sources: [
        {
          label: 'University of Warsaw — Candidates with IB and EB diplomas',
          href: 'https://rekrutacja.uw.edu.pl/en/candidates-with-ib-and-eb-diplomas/'
        },
        {
          label: 'University of Warsaw — Admission rules 2027/2028 (in Polish)',
          href: 'https://rekrutacja.uw.edu.pl/akty-prawne/akty-prawne-2027-2028/'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Are entrance exams required?',
      blocks: [
        {
          type: 'paragraph',
          text: "Most Polish university programmes **do not require entrance exams** for IB students. Admission is primarily based on your IB scores, converted using the university's own formula."
        },
        {
          type: 'paragraph',
          text: 'Since July 2025, some foreign candidates must pass a university entrance exam as part of a two-stage admission. This does **not** apply to holders of the IB Diploma, whose certificates already give the right to apply.'
        },
        {
          type: 'list',
          items: [
            "**Medicine (English-taught)** — Medical universities set their own admission rules, which may include entrance exams or required HL subjects. Check each university's rules.",
            '**Art and design programmes** — May require a portfolio review or practical exam.',
            '**Most other programmes** — Admission is based on converted IB grades, with no additional entrance exams required.'
          ]
        }
      ],
      sources: [
        {
          label:
            'Ministry of Science and Higher Education — Notice on the act of 4 April 2025 (in Polish)',
          href: 'https://www.gov.pl/web/nauka/komunikat-dla-uczelni-na-temat-wybranych-rozwiazan-przyjetych-w-ustawie-z-dnia-4-kwietnia-2025-r-o-zmianie-niektorych-ustaw-w-celu-wyeliminowania-nieprawidlowosci-w-systemie-wizowym-rzeczypospolitej-polskiej'
        },
        {
          label: 'study.gov.pl — How to Apply',
          href: 'https://study.gov.pl/how-to-apply'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Polish universities offer programmes in both **Polish** and **English**. Since July 2025, candidates who are not citizens of the EU, EFTA, Switzerland or the UK must prove at least **B2** in the language their programme is taught in. The IB Diploma counts as proof for its main language.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'English',
              items: [
                '**Minimum B2 level**; the accepted certificates are listed in a 2025 ministerial regulation',
                'The IB Diploma counts as proof for its main language; universities may set a higher level'
              ]
            },
            {
              title: 'Polish',
              items: [
                'Required only for Polish-taught programmes',
                "Minimum **B2 level** — demonstrated through an official certificate or the university's own language exam",
                'Preparatory Polish language courses (**Zerówka**, 9 months) are available at many universities for students who wish to study in Polish'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'study.gov.pl — How to Apply',
          href: 'https://study.gov.pl/how-to-apply'
        },
        {
          label:
            'Ministry of Science and Higher Education — Notice on the act of 4 April 2025 (in Polish)',
          href: 'https://www.gov.pl/web/nauka/komunikat-dla-uczelni-na-temat-wybranych-rozwiazan-przyjetych-w-ustawie-z-dnia-4-kwietnia-2025-r-o-zmianie-niektorych-ustaw-w-celu-wyeliminowania-nieprawidlowosci-w-systemie-wizowym-rzeczypospolitej-polskiej'
        },
        {
          label: 'Regulation of 30 July 2025 on language certificates (PDF, in Polish)',
          href: 'https://dziennikustaw.gov.pl/D2025000104501.pdf'
        }
      ]
    },
    {
      label: 'University types',
      heading: 'Types of higher education in Poland',
      blocks: [
        {
          type: 'paragraph',
          text: 'Poland has nearly **380 higher education institutions** — both public and private. The IB Diploma is accepted at all of them. Polish higher education follows the **Bologna Process** with standardized degree cycles.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Public universities',
              items: [
                "**Bachelor's** (3–3.5 years), **Master's** (1.5–2 years), and long-cycle **Master's** (5–6 years for medicine, law, psychology)",
                'Free tuition for Polish-taught programmes for EU/EEA and Polish Charter holders',
                'Examples: Jagiellonian University, University of Warsaw, Warsaw University of Technology, AGH University of Krakow'
              ]
            },
            {
              title: 'Private universities',
              items: [
                'Offer the same degree types as public universities under the Bologna Process',
                'Tuition fees apply to all students regardless of nationality (EUR 2,000–6,000 per year on average)',
                'Their own admission timelines, set by each institution'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'study.gov.pl — How to Apply',
          href: 'https://study.gov.pl/how-to-apply'
        },
        {
          label: 'study.gov.pl — Tuition Fees',
          href: 'https://study.gov.pl/tuition-fees'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: "Documents are typically uploaded through the university's online recruitment portal. Requirements may vary by institution:"
        },
        {
          type: 'documents',
          items: [
            'IB Diploma and transcript of results',
            'Proof of identity (passport or national ID)',
            'Translations of documents that are not in Polish or English',
            'Proof of language level in the language of study (at least B2 for candidates who are not EU, EFTA, Swiss or UK citizens; the IB Diploma counts for its main language)',
            'Medical certificate confirming fitness to study (required by some programmes)',
            "Application form (submitted via the university's online recruitment portal)"
          ]
        },
        {
          type: 'caution',
          text: 'Non-EU/EEA students must also arrange a **student visa**. Apply at least 2–3 months before the academic year starts. Some universities may require an **apostille** on your IB Diploma — check directly with the institution.'
        }
      ],
      sources: [
        {
          label: 'study.gov.pl — How to Apply',
          href: 'https://study.gov.pl/how-to-apply'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'Application timeline',
      blocks: [
        {
          type: 'paragraph',
          text: 'Timelines vary by university and programme. This is a general guide for the **fall intake** (October start), which is the primary intake period:'
        },
        {
          type: 'timeline',
          steps: [
            {
              date: 'A year ahead',
              title: 'Admission rules published',
              text: 'Universities publish their admission rules well before the recruitment year. The University of Warsaw adopted its rules for 2027/28 on 20 May 2026, including how it converts IB grades.'
            },
            {
              date: 'April – July',
              title: 'Application period',
              text: 'Admission campaigns usually start in April or May and can last up to six months. Register on each university’s online recruitment portal; deadlines vary by institution and programme.'
            },
            {
              date: 'July',
              title: 'IB results',
              text: 'Add your final IB results by the university’s deadline. At the University of Warsaw, IB and EB candidates had until 14 July 2026 (14 September 2026 in the September round); its 2027 dates follow the same rules.'
            },
            {
              date: 'October',
              title: 'Academic year begins',
              text: 'The academic year starts at the beginning of October. Non-EU/EEA students should start the visa process as soon as they receive their acceptance letter.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'study.gov.pl — How to Apply',
          href: 'https://study.gov.pl/how-to-apply'
        },
        {
          label: 'University of Warsaw — Candidates with IB and EB diplomas',
          href: 'https://rekrutacja.uw.edu.pl/en/candidates-with-ib-and-eb-diplomas/'
        },
        {
          label: 'University of Warsaw — Admission rules 2027/2028 (in Polish)',
          href: 'https://rekrutacja.uw.edu.pl/akty-prawne/akty-prawne-2027-2028/'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'Is the IB Diploma recognized for university admission in Poland?',
        answer:
          'Yes. IB certificates are recognised automatically for applying to first-cycle and long-cycle studies in Poland, so you do not need an individual recognition statement from NAWA. Each university still sets its own admission requirements.',
        source: {
          label: 'NAWA — Applying for admission to first/long-cycle studies',
          href: 'https://nawa.gov.pl/en/recognition/recognition-for-academic-purposes/applying-for-admission-to-first-long-cycle-studies'
        }
      },
      {
        question: 'How are IB grades converted for Polish university admission?',
        answer:
          'There is no single national formula; each university sets its own. The University of Warsaw, for example, converts each IB grade to a percentage: 7 = 100%, 6 = 90%, 5 = 75%, 4 = 60%, 3 = 45%, 2 = 30%. Always check the admission rules for your programme.',
        source: {
          label: 'University of Warsaw — Candidates with IB and EB diplomas',
          href: 'https://rekrutacja.uw.edu.pl/en/candidates-with-ib-and-eb-diplomas/'
        }
      },
      {
        question: 'How do IB students apply to Polish universities?',
        answer:
          "Poland uses a decentralized admission system. You apply directly to each university through its own online recruitment portal. There is no central national application platform. Each institution sets its own deadlines, required documents, and admission criteria. Start by selecting a programme on the university's website and follow its recruitment instructions.",
        source: {
          label: 'study.gov.pl — How to Apply',
          href: 'https://study.gov.pl/how-to-apply'
        }
      },
      {
        question: 'Do I need to speak Polish to study in Poland?',
        answer:
          'Not necessarily; many programmes are taught in English. Since July 2025, candidates who are not citizens of the EU, EFTA, Switzerland or the UK must prove at least B2 in the language their programme is taught in, whether Polish or English.',
        source: {
          label:
            'Ministry of Science and Higher Education — Notice on the act of 4 April 2025 (in Polish)',
          href: 'https://www.gov.pl/web/nauka/komunikat-dla-uczelni-na-temat-wybranych-rozwiazan-przyjetych-w-ustawie-z-dnia-4-kwietnia-2025-r-o-zmianie-niektorych-ustaw-w-celu-wyeliminowania-nieprawidlowosci-w-systemie-wizowym-rzeczypospolitej-polskiej'
        }
      },
      {
        question: 'Is higher education in Poland free for IB students?',
        answer:
          'Full-time studies in Polish at public universities are free for Polish citizens and for foreigners who study on the same terms, including EU/EEA citizens and holders of the Karta Polaka (Polish Charter). Other international students pay fees, on average EUR 2,000 a year for first-cycle and long-cycle studies; fees range from EUR 2,000 to 6,000 a year depending on the institution and programme.',
        source: {
          label: 'study.gov.pl — Tuition Fees',
          href: 'https://study.gov.pl/tuition-fees'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Polish admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Create your free IB Match profile and discover programmes in Poland that match your IB Diploma results.'
}
