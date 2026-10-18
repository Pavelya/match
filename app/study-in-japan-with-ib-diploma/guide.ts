import type { CountryGuide } from '@/lib/guides/types'

/** Study in Japan with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-japan-with-ib-diploma',
  countryCode: 'JP',
  exploreCountryId: 'cmirq3xef000p7m0eckeq4dro',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Japan with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for university admission in Japan, using only official Japanese government and institutional sources. Japan uses a decentralized admission system where each university sets its own screening process.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Japan recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Japanese **Ministry of Education, Culture, Sports, Science and Technology (MEXT)** has recognized the IB Diploma as a valid university admission qualification since **1979**.'
        },
        {
          type: 'paragraph',
          text: "Under Japan's admission requirements, IB Diploma holders are explicitly listed as eligible applicants — categorized as **“individuals who have a foreign university admission certification, such as the International Baccalaureate, Abitur, Baccalauréat, or GCE A-Level”**."
        },
        {
          type: 'paragraph',
          text: 'While MEXT provides overarching recognition, each Japanese university establishes its own admissions policies and screening processes for IB Diploma holders. Universities may evaluate IB scores comprehensively, alongside essays and interviews.'
        }
      ],
      sources: [
        {
          label: 'Study in Japan — Universities (Undergraduate) — Admission Requirements',
          href: 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/'
        },
        {
          label: 'MEXT — University entrance qualifications (in Japanese)',
          href: 'https://www.mext.go.jp/a_menu/koutou/shikaku/07111314.htm'
        },
        {
          label: 'MEXT — About the International Baccalaureate, 2013 (PDF, in Japanese)',
          href: 'https://www.mext.go.jp/b_menu/shingi/chukyo/chukyo12/shiryo/__icsFiles/afieldfile/2013/01/09/1329266_4.pdf'
        }
      ]
    },
    {
      label: 'Equivalence',
      heading: 'Do IB students need a Japanese diploma?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          line: 'The IB Diploma is accepted as a standalone qualification',
          paragraphs: [
            'The IB Diploma is recognized as equivalent to completing 12 years of formal education for university admission purposes. IB graduates do not need to obtain a Japanese high school diploma or undergo any separate credential evaluation (nostrification) process.'
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Japan — Universities (Undergraduate) — Admission Requirements',
          href: 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'How admission works for IB students',
      blocks: [
        {
          type: 'caution',
          text: 'Japan uses a **fully decentralized admission system**. There is no centralized application portal — each university manages its own application process independently.'
        },
        {
          type: 'paragraph',
          text: 'Admission for IB students typically involves:'
        },
        {
          type: 'list',
          items: [
            '**Applying directly to each university** — application forms, deadlines, and requirements vary by institution',
            '**Document screening** — universities review IB transcripts, personal statements, and recommendation letters',
            '**University-specific entrance screening** — may include interviews, essays, and/or subject tests',
            '**EJU scores** — required by many Japanese-taught programs (not typically required for English-taught programs)'
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Japan — Universities (Undergraduate)',
          href: 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/'
        },
        {
          label: 'Waseda University — Undergraduate Admissions (example)',
          href: 'https://www.waseda.jp/inst/admission/en/undergraduate/'
        }
      ]
    },
    {
      label: 'Grade evaluation',
      heading: 'How IB scores are assessed in Japan',
      blocks: [
        {
          type: 'answer',
          line: 'No national conversion table',
          paragraphs: [
            'Japan does **not** have a standardized IB-to-Japanese grade conversion. Each university determines independently how to evaluate IB Diploma results.'
          ]
        },
        {
          type: 'list',
          items: [
            'Universities may set **minimum IB point totals** for eligibility or use IB scores as part of a **holistic review**',
            'Some programs consider **individual HL subject scores**, the Extended Essay (EE), and Theory of Knowledge (TOK)',
            'IB scores are typically assessed **comprehensively alongside** interviews, essays, and other application materials'
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Japan — Universities (Undergraduate)',
          href: 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/'
        },
        {
          label: 'MEXT IB Consortium — Admissions using the IB (in Japanese)',
          href: 'https://ibconsortium.mext.go.jp/about-ib/entrance-exam/'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Entrance exams for IB students',
      blocks: [
        {
          type: 'answer',
          line: 'Depends on the program',
          paragraphs: [
            "The **Examination for Japanese University Admission (EJU)**, administered by JASSO, is used by many universities to evaluate international students' Japanese language skills and academic abilities. However, requirements vary significantly between programs."
          ]
        },
        {
          type: 'list',
          items: [
            '**Japanese-taught programs:** Many require EJU scores in Japanese as a Foreign Language plus subject tests (Science, Japan and the World, or Mathematics). The EJU is held twice yearly, in June and November (21 June and 8 November in 2026)',
            '**English-taught programs:** Generally do **not** require the EJU. IB scores and English proficiency tests (TOEFL/IELTS) are typically sufficient',
            'Some universities conduct their own **entrance examinations for international students** in addition to or instead of the EJU'
          ]
        }
      ],
      sources: [
        {
          label: 'JASSO — Examination for Japanese University Admission (EJU)',
          href: 'https://www.jasso.go.jp/en/ryugaku/eju/'
        },
        {
          label: 'JASSO — EJU schedule 2026',
          href: 'https://www.jasso.go.jp/en/ryugaku/eju/schedule.html'
        },
        {
          label: 'Study in Japan — Universities (Undergraduate)',
          href: 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Language requirements depend on whether you apply to a **Japanese-taught** or **English-taught** program.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Japanese',
              items: [
                'Required for **Japanese-taught programs**',
                'Demonstrated via the **EJU Japanese as a Foreign Language** test and/or the **JLPT** (Japanese Language Proficiency Test)',
                'The level required varies by university'
              ]
            },
            {
              title: 'English',
              items: [
                'Required for **English-taught programs**',
                'Demonstrated via **TOEFL**, **IELTS**, or equivalent — IB English A/B courses may satisfy requirements at some institutions',
                '**No Japanese needed** — English-taught programs allow students to complete their degree entirely in English'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Japan — Degree Programs in English',
          href: 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/english-programs/'
        }
      ]
    },
    {
      label: 'University types',
      heading: 'Types of universities in Japan',
      blocks: [
        {
          type: 'paragraph',
          text: 'Japanese higher education institutions are classified into three categories. The IB Diploma is accepted at all three types.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'National & public universities',
              items: [
                '**National universities (国立)** are operated by the Japanese government; **public universities (公立)** by local governments',
                'Often require EJU scores for Japanese-taught admission',
                'Generally lower tuition than private universities'
              ]
            },
            {
              title: 'Private universities',
              items: [
                'Make up the majority of Japanese universities',
                'Many list the IB as a qualification for their comprehensive (AO) or returnee admissions',
                'Independent admission processes and tuition fees'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Japan — Universities (Undergraduate) and Junior Colleges',
          href: 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/'
        },
        {
          label: 'MEXT IB Consortium — Admissions using the IB (in Japanese)',
          href: 'https://ibconsortium.mext.go.jp/about-ib/entrance-exam/'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Documents are submitted directly to each university. Requirements vary by institution, but typically include:'
        },
        {
          type: 'documents',
          items: [
            'IB Diploma and transcript of results',
            'Passport or national ID',
            'University-specific application form',
            'High school letter of recommendation',
            'Proof of Japanese proficiency (EJU score or JLPT — for Japanese-taught programs)',
            'Proof of English proficiency (TOEFL or IELTS — for English-taught programs)',
            'Personal statement or essay (varies by university)'
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Japan — Universities (Undergraduate) — Application Materials',
          href: 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'Application timeline for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Since each university sets its own deadlines, there is no single national calendar. However, the general timeline is:'
        },
        {
          type: 'timeline',
          steps: [
            {
              date: 'June & November',
              time: 'year before entry',
              text: 'The EJU is held twice a year. In 2026 the sessions were on 21 June and 8 November; applications for the November session closed on 30 July, and its results are due on 15 December 2026. Register through JASSO if your program asks for the EJU.'
            },
            {
              date: 'September – January',
              text: 'Application periods for most universities. Deadlines vary — check each university individually. English-taught programs often have September and April intakes.'
            },
            {
              date: 'October – March',
              text: 'University entrance screening, which may include document review, interviews, essays, and/or university-specific exams.'
            },
            {
              date: 'April or September',
              text: 'Academic year begins. Most Japanese universities start in April; English-taught programs may also offer September entry.'
            }
          ]
        },
        {
          type: 'caution',
          text: "Always check each university's admissions page for specific deadlines and requirements."
        }
      ],
      sources: [
        {
          label: 'Study in Japan — Timeline',
          href: 'https://www.studyinjapan.go.jp/en/planning/flow-chart/schedule.html'
        },
        {
          label: 'JASSO — EJU schedule 2026',
          href: 'https://www.jasso.go.jp/en/ryugaku/eju/schedule.html'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Is the IB Diploma recognized for university admission in Japan?',
        answer:
          'Yes. IB Diploma holders are explicitly listed as eligible to apply to Japanese universities, alongside holders of the Abitur, Baccalauréat, and GCE A-Levels.',
        source: {
          label: 'Study in Japan — Universities (Undergraduate)',
          href: 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/'
        }
      },
      {
        question: 'Do IB students need to take the EJU exam in Japan?',
        answer:
          'It depends on the program. Many Japanese-taught programs require the Examination for Japanese University Admission (EJU), which assesses Japanese language skills and academic abilities. However, English-taught degree programs generally do not require the EJU and accept IB scores directly alongside English proficiency tests.',
        source: {
          label: 'JASSO — EJU Overview',
          href: 'https://www.jasso.go.jp/en/ryugaku/eju/'
        }
      },
      {
        question: 'Can I study in Japan in English with an IB Diploma?',
        answer:
          'Yes. A growing number of Japanese universities offer degree programs taught entirely in English. These programs typically accept IB scores directly and require English proficiency evidence (TOEFL or IELTS) rather than Japanese language ability.',
        source: {
          label: 'Study in Japan — Degree Programs in English',
          href: 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/english-programs/'
        }
      },
      {
        question: 'How do Japanese universities evaluate IB scores?',
        answer:
          'There is no national IB-to-Japanese grade conversion. Each university decides how to assess IB Diploma results. Many universities list the IB as a qualification for their comprehensive (AO) or returnee admissions, and select candidates on their IB scores together with essays and interviews.',
        source: {
          label: 'MEXT IB Consortium — Admissions using the IB (in Japanese)',
          href: 'https://ibconsortium.mext.go.jp/about-ib/entrance-exam/'
        }
      },
      {
        question: 'What documents do IB students need to apply to Japanese universities?',
        answer:
          'Typical requirements include: IB Diploma and transcript, passport or ID, proof of English or Japanese proficiency, a university-specific application form, a letter of recommendation, and a personal statement or essay. Requirements vary by institution.',
        source: {
          label: 'Study in Japan — Universities (Undergraduate)',
          href: 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Japanese admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Japanese university programs that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
