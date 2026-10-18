import type { CountryGuide } from '@/lib/guides/types'

/** Study in Israel with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-israel-with-ib-diploma',
  countryCode: 'IL',
  exploreCountryId: 'cmj0gubzn00007mfw0qz8fv57',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Israel with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for admission to Israeli universities, using only official Israeli higher-education and institutional sources. Israel uses a decentralized application system where students apply directly to each university.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Israel recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'The **International Baccalaureate (IB) Diploma** is accepted by Israeli universities for admission. Tel Aviv University, for example, lists it among the diplomas from abroad that are **equivalent to the Israeli Bagrut (matriculation certificate)** for registration, and the Technion publishes its own conversion of IB grades.'
        },
        {
          type: 'paragraph',
          text: 'In addition to the IB Diploma, most institutions require applicants to take the **Psychometric Entrance Test (PET)**, administered by the National Institute for Testing and Evaluation (NITE). Most institutions admit candidates on a combination of their matriculation average and their PET score.'
        }
      ],
      sources: [
        {
          label: 'Study Israel — Israeli Council for Higher Education Portal',
          href: 'https://studyisrael.org.il/'
        },
        {
          label: 'Council for Higher Education of Israel',
          href: 'https://che.org.il/en/'
        },
        {
          label: 'Tel Aviv University — General Entrance Requirements',
          href: 'https://en-go.tau.ac.il/General-Requirements'
        },
        {
          label: 'NITE — Higher Education Admissions',
          href: 'https://www.nite.org.il/two-domain-psychometric-entrance-test/higher-education-admissions/?lang=en'
        }
      ]
    },
    {
      label: 'Equivalence',
      heading: 'Do IB students need an Israeli Bagrut?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          line: 'The IB Diploma is accepted as equivalent to the Bagrut',
          paragraphs: [
            'Israeli universities recognize the IB Diploma as an alternative to the national Bagrut certificate. You do not need to sit for Bagrut exams or obtain a separate Israeli secondary diploma. The university admissions office assesses your IB results directly.'
          ]
        },
        {
          type: 'caution',
          text: '**Psychometric Test still required:** While the IB Diploma replaces the Bagrut for admission, the Psychometric Entrance Test (PET) is a separate requirement at most universities. IB students must typically take the PET in addition to submitting their IB results. SAT or ACT scores may be accepted as alternatives at some institutions.'
        }
      ],
      sources: [
        {
          label: 'Study Israel — Israeli Council for Higher Education Portal',
          href: 'https://studyisrael.org.il/'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'How admission works for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: "Israel uses a **decentralized application system**. There is no centralized national portal — students apply **directly to each university** through the institution's own admissions office. Each university sets its own deadlines, criteria, and admission scores."
        },
        {
          type: 'list',
          items: [
            '**Sekhem Score** — Most universities calculate a weighted admission score (called “Sekhem”) combining your secondary school average (Bagrut or IB equivalent) and your Psychometric Entrance Test (PET) score. Each institution uses its own weighting formula.',
            '**Programme-specific requirements** — Competitive programmes (Medicine, Law, Engineering) may have higher minimum Sekhem scores and additional requirements such as interviews, supplementary exams, or specific HL subject requirements.',
            '**International programmes** — English-taught degree programmes often have separate application tracks for international students. These may have different deadlines and may not require the PET.'
          ]
        }
      ],
      sources: [
        {
          label: 'Study Israel — Planning Your Studies',
          href: 'https://studyisrael.org.il/planning/'
        },
        {
          label: 'CHE — Accredited Institutions',
          href: 'https://che.org.il/en/institutions/'
        }
      ]
    },
    {
      label: 'Grade evaluation',
      heading: 'How IB scores are assessed',
      blocks: [
        {
          type: 'paragraph',
          text: "There is no single, nationally mandated IB-to-Bagrut grade conversion table in Israel. Each university evaluates IB grades according to its own criteria, then combines them with the Psychometric Entrance Test (PET) into an admission score. The Technion's published rules show how this works:"
        },
        {
          type: 'list',
          items: [
            'Each IB grade converts to the Israeli 0–100 scale: 7 = 100, 6 = 85, 5 = 70, 4 = 55',
            '**Higher Level (HL) subjects** count as 5 Bagrut units and Standard Level subjects as 3 (4 for SL Mathematics); HL Mathematics, Physics and Chemistry earn a 30-point bonus, and HL Biology, English and Computer Science 20 points',
            'Competitive programmes may require specific minimum grades in HL subjects relevant to the field (e.g., HL Mathematics and HL Sciences for Engineering)',
            'The resulting average is combined with your PET score, or the SAT or ACT where accepted, into the admission score (Sekhem)'
          ]
        }
      ],
      sources: [
        {
          label: 'Technion — Admission of candidates with foreign matriculation diplomas',
          href: 'https://admissions.technion.ac.il/en/english/ib-ossd-bacs-gcse-ap-tests/'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'The Psychometric Entrance Test (PET)',
      blocks: [
        {
          type: 'paragraph',
          text: 'The **Psychometric Entrance Test (PET)**, known in Hebrew as “ha-Psikhometri”, is a standardized examination administered by the **National Institute for Testing and Evaluation (NITE)**. It is a key component of the admission process at most Israeli universities, used alongside secondary school results to predict academic success.'
        },
        {
          type: 'list',
          items: [
            '**Test content:** From the December 2026 sitting, a writing task plus verbal and quantitative reasoning. English is tested separately by the AMIRNET test, which you can take throughout the year',
            '**Score range:** 200–800, unchanged by the new format. Higher scores improve admission chances',
            '**Languages available:** Hebrew, Arabic, Combined/English, Russian and French, though not every language on every date',
            '**Validity:** Scores remain valid for at least seven years, depending on the institution',
            '**Alternatives:** Some universities accept **SAT or ACT** scores in place of the PET. Tel Aviv University does, except for Medicine and Dental Medicine'
          ]
        }
      ],
      sources: [
        {
          label: 'NITE — English domain to be separated from the PET',
          href: 'https://www.nite.org.il/news/notice-15022026/?lang=en'
        },
        {
          label: 'NITE — The Two-domain Psychometric Test',
          href: 'https://www.nite.org.il/two-domain-psychometric-entrance-test/?lang=en'
        },
        {
          label: 'Tel Aviv University — General Entrance Requirements',
          href: 'https://en-go.tau.ac.il/General-Requirements'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Language proficiency is a critical factor for university admission in Israel. Requirements depend on whether you are applying to Hebrew-taught or English-taught programmes.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Hebrew',
              items: [
                'Required for most undergraduate programmes, which are taught in Hebrew',
                'Proficiency demonstrated through the **YAEL test** (Hebrew proficiency exam) or equivalent',
                '**Ulpan** (intensive Hebrew language programmes) are available at most universities and nationally to help students reach the required level'
              ]
            },
            {
              title: 'English',
              items: [
                'Required for English-taught programmes. From December 2026, English is tested by the AMIRNET test rather than inside the PET',
                'For programmes in English, **IELTS** or **TOEFL** results are commonly accepted'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study Israel — Planning',
          href: 'https://studyisrael.org.il/planning/'
        },
        {
          label: 'NITE — English domain to be separated from the PET',
          href: 'https://www.nite.org.il/news/notice-15022026/?lang=en'
        }
      ]
    },
    {
      label: 'University types',
      heading: 'Types of higher education in Israel',
      blocks: [
        {
          type: 'paragraph',
          text: 'Israeli higher education is supervised by the **Council for Higher Education (CHE)**. The IB Diploma is accepted at all types of accredited institutions.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Research universities',
              items: [
                '**9 universities**, all publicly funded',
                "Offer Bachelor's, Master's, and PhD programmes",
                'Examples: Hebrew University, Tel Aviv University, Technion, Weizmann Institute, Ben-Gurion University'
              ]
            },
            {
              title: 'Colleges & academic colleges',
              items: [
                '**31 colleges** and **21 teacher training colleges**; 41 colleges are publicly funded and 12 privately funded',
                "Primarily offer Bachelor's degree programmes with practical orientation",
                'All accredited by the CHE and accept IB qualifications'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study Israel — Institutions and Programs',
          href: 'https://studyisrael.org.il/study-in-israel/'
        },
        {
          label: 'CHE — Accredited Institutions',
          href: 'https://che.org.il/en/institutions/'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Since Israel uses a decentralized system, exact requirements vary by institution. However, the following documents are commonly required:'
        },
        {
          type: 'documents',
          items: [
            'IB Diploma and transcript of results',
            'Psychometric Entrance Test (PET) scores — or SAT/ACT scores where accepted',
            'Proof of identity (passport)',
            'Proof of Hebrew proficiency (YAEL test or equivalent — for Hebrew-taught programmes)',
            'Proof of English level (for example TOEFL or IELTS results; PET takers from December 2026 take the separate AMIRNET test)',
            'Any programme-specific supplementary documents (e.g., portfolio, interview)'
          ]
        },
        {
          type: 'caution',
          text: '**International students:** An A/2 Student Visa is required to study in Israel. You will need a formal letter of acceptance from a recognized institution, proof of financial means, and a valid passport. Apply for your visa at the nearest Israeli Embassy or Consulate.'
        }
      ],
      sources: [
        {
          label: 'Study Israel — Planning Your Studies',
          href: 'https://studyisrael.org.il/planning/'
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
              date: 'Autumn/Winter',
              title: 'Applications open',
              text: "Most Israeli universities open their application portals in the autumn or early winter for the following academic year. Check each university's website for exact dates, as they vary by institution."
            },
            {
              date: 'December 2026 and April 2027',
              title: 'Psychometric test dates',
              text: 'From the December 2026 sitting, the PET tests verbal and quantitative reasoning only; English is tested separately by the AMIRNET test, which you can take throughout the year. Test dates: 4–6 December 2026 and 18–19 April 2027. Register at nite.org.il.'
            },
            {
              date: 'Spring',
              title: 'Application deadlines',
              text: 'Deadlines vary by university and programme, and Medicine closes earlier. At Tel Aviv University, for 2025–26 entry to Hebrew-taught programmes, applications were due by 31 May 2025, by 10 May for Medicine and by 19 April for Dental Medicine.'
            },
            {
              date: 'April–June',
              title: 'Admission decisions',
              text: 'Universities send admission decisions on a rolling basis. Accepted students receive instructions for enrollment, visa applications, and housing arrangements.'
            },
            {
              date: 'October 2027',
              title: 'Academic year begins',
              text: 'The 2027–28 academic year opens in October 2027. International students should arrive early for orientation, visa processing, and optional Hebrew language preparation (Ulpan).'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study Israel — Planning Your Studies',
          href: 'https://studyisrael.org.il/planning/'
        },
        {
          label: 'NITE — English domain to be separated from the PET',
          href: 'https://www.nite.org.il/news/notice-15022026/?lang=en'
        },
        {
          label: 'NITE — The Two-domain Psychometric Test',
          href: 'https://www.nite.org.il/two-domain-psychometric-entrance-test/?lang=en'
        },
        {
          label: 'Tel Aviv University — General Entrance Requirements',
          href: 'https://en-go.tau.ac.il/General-Requirements'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Is the IB Diploma recognized for university admission in Israel?',
        answer:
          'Yes. Israeli universities accept the IB Diploma for admission. Tel Aviv University, for example, lists the IB among the diplomas from abroad that are equivalent to the Israeli matriculation certificate (Bagrut) for registration.',
        source: {
          label: 'Tel Aviv University — General Entrance Requirements',
          href: 'https://en-go.tau.ac.il/General-Requirements'
        }
      },
      {
        question: 'Do IB students need to take the Psychometric Entrance Test (PET)?',
        answer:
          'In most cases, yes. Most Israeli institutions admit candidates on a combination of their matriculation average and their score in the Psychometric Entrance Test (PET), administered by NITE. From the December 2026 sitting, the PET tests verbal and quantitative reasoning only, and English is tested separately by the AMIRNET test. Scores stay on the 200–800 scale, and the change applies to admissions for the 2027–28 academic year.',
        source: {
          label: 'NITE — English domain to be separated from the PET',
          href: 'https://www.nite.org.il/news/notice-15022026/?lang=en'
        }
      },
      {
        question: 'Do I need to speak Hebrew to study in Israel?',
        answer:
          "It depends on the programme. Programmes taught in Hebrew require Hebrew proficiency. Israeli institutions also offer Bachelor's and Master's programmes in English for international students, which ask for proof of English, for example TOEFL or IELTS results.",
        source: {
          label: 'Study Israel — Planning',
          href: 'https://studyisrael.org.il/planning/'
        }
      },
      {
        question: 'How do IB students apply to Israeli universities?',
        answer:
          'Israel uses a decentralized application system — students apply directly to each university. There is no centralized national application portal. Each institution sets its own deadlines, requirements, and admission criteria. Applications typically open in the autumn/winter for the following academic year, with deadlines varying by university and programme.',
        source: {
          label: 'Study Israel — Planning',
          href: 'https://studyisrael.org.il/planning/'
        }
      },
      {
        question: 'What documents do IB students need for Israeli university admission?',
        answer:
          'Required documents typically include: IB Diploma and transcript of results, Psychometric Entrance Test (PET) scores (or SAT/ACT where accepted), proof of identity (passport), proof of language proficiency (Hebrew and/or English depending on programme), and any programme-specific supplementary documents. International students also need an A/2 Student Visa and proof of financial means.',
        source: {
          label: 'Study Israel — Planning',
          href: 'https://studyisrael.org.il/planning/'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Israeli admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Israeli university programmes that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
