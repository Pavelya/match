import type { CountryGuide } from '@/lib/guides/types'

/** Study in Australia with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-australia-with-ib-diploma',
  countryCode: 'AU',
  exploreCountryId: 'cmip2am54000g7m18cfpnzfqb',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Australia with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for university admission in Australia, using only official admissions-centre, university, and IB Australasia sources. It is written exclusively for IB Diploma students and IB Coordinators.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Australia recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'Australia recognizes the **International Baccalaureate (IB) Diploma** as an accepted senior secondary qualification for entry to Australian universities.'
        },
        {
          type: 'paragraph',
          text: 'Admission decisions are made by universities, often using state-based admissions centres that compare IB results with ATAR-based applicants.'
        }
      ],
      sources: [
        {
          label: 'UAC — IB applicants',
          href: 'https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants'
        },
        {
          label: 'IB Schools Australasia — University entrance',
          href: 'https://ibaustralasia.org/university-entrance/'
        }
      ]
    },
    {
      label: 'ATAR equivalent',
      heading: 'Do IB students get an ATAR in Australia?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          paragraphs: [
            'IB students do **not** receive a standard ATAR. Instead, their IB results are converted into an **ATAR-equivalent rank** (often called a *combined rank* or *notional ATAR*) for selection purposes.'
          ]
        }
      ],
      sources: [
        {
          label: 'UAC — IB applicants',
          href: 'https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants'
        }
      ]
    },
    {
      label: 'Grade conversion',
      heading: 'How IB scores are converted in Australia (IBAS–ATAR)',
      blocks: [
        {
          type: 'subheading',
          text: 'What is IBAS?'
        },
        {
          type: 'paragraph',
          text: '**IBAS (IB Admissions Score)** is a fine-grained score derived from the IB Diploma result to allow fair comparison with ATAR-based applicants. It adds decimal places to your diploma score based on where your marks fall within each grade, so a diploma score of 41 might become an IBAS of 41.75.'
        },
        {
          type: 'paragraph',
          text: 'The IBAS applies to students who **sat the IB in Australia** from November 2022. If you **sat the IB outside Australia**, your ATAR-equivalent rank is based on your **whole-number diploma score** instead. The current conversion tables apply to offers made from **August 2026**, which covers entry in 2027.'
        },
        {
          type: 'subheading',
          text: 'Example conversions to an ATAR equivalent (2027 entry)'
        },
        {
          type: 'paragraph',
          text: 'The following are **examples only**. Admissions centres use the full official conversion tables.'
        },
        {
          type: 'tables',
          tables: [
            {
              caption: 'IB sat in Australia',
              columns: ['IB Admissions Score (IBAS)', 'ATAR equivalent'],
              rows: [
                ['45.75', '99.95'],
                ['45.00', '99.85'],
                ['43.00', '99.00'],
                ['40.00', '96.35'],
                ['38.00', '94.15']
              ]
            },
            {
              caption: 'IB sat outside Australia',
              columns: ['IB Diploma score', 'ATAR equivalent'],
              rows: [
                ['45', '99.95'],
                ['42', '98.65'],
                ['40', '96.85'],
                ['38', '94.65'],
                ['35', '90.75'],
                ['30', '79.30'],
                ['24', '64.60']
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'UAC — IB applicants',
          href: 'https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants'
        },
        {
          label: 'IB Schools Australasia — University entrance',
          href: 'https://ibaustralasia.org/university-entrance/'
        },
        {
          label: 'VTAC — IB students',
          href: 'https://vtac.edu.au/guides/quickstart/ib-students'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'University admission system in Australia',
      blocks: [
        {
          type: 'caution',
          text: 'Australia does **not** have a single national admissions authority.'
        },
        {
          type: 'paragraph',
          text: 'Admission is handled through:'
        },
        {
          type: 'list',
          items: ['Universities directly', '**State admissions centres** (e.g. UAC, VTAC)']
        },
        {
          type: 'paragraph',
          text: 'Universities may also apply **prerequisites**, **adjustment factors**, or **program-specific criteria**.'
        }
      ],
      sources: [
        {
          label: 'IB Schools Australasia — University entrance',
          href: 'https://ibaustralasia.org/university-entrance/'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Entrance exams and restricted programs',
      blocks: [
        {
          type: 'answer',
          word: 'Usually no',
          paragraphs: [
            'Most undergraduate programs in Australia do **not** require national entrance exams. Some programs may require additional selection steps such as **interviews**, **portfolios**, **auditions**, or **tests**, depending on the course.'
          ]
        }
      ],
      sources: [
        {
          label: 'Curtin University — Apply with an IB Diploma',
          href: 'https://www.curtin.edu.au/study/applying/ib-diploma/'
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
          line: 'English language requirements may apply'
        },
        {
          type: 'paragraph',
          text: 'Universities decide individually whether IB English satisfies English requirements or whether another test is required.'
        }
      ],
      sources: [
        {
          label: 'The University of Sydney — English language requirements',
          href: 'https://www.sydney.edu.au/study/applying/how-to-apply/international-students/english-language-requirements.html'
        }
      ]
    },
    {
      label: 'University types',
      heading: 'Public vs private universities for IB students',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'Public universities',
              items: [
                'Main destination for IB students',
                'Use IBAS–ATAR or IB-based assessment',
                'Program prerequisites and English rules apply'
              ]
            },
            {
              title: 'Private universities',
              items: [
                'Independent admission processes',
                'Requirements vary by institution',
                'Tuition fees usually apply'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'IB Schools Australasia — University entrance',
          href: 'https://ibaustralasia.org/university-entrance/'
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
            'IB Diploma results or predicted grades',
            'Academic transcripts',
            'Passport or ID',
            'Evidence of meeting prerequisites (if required)',
            'Evidence of English proficiency (if required)'
          ]
        }
      ],
      sources: [
        {
          label: 'Curtin University — Apply with an IB Diploma',
          href: 'https://www.curtin.edu.au/study/applying/ib-diploma/'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'Application timeline for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Key dates for study starting in early 2027. Dates vary by admissions centre and university; these are from UAC (NSW and ACT) and VTAC (Victoria):'
        },
        {
          type: 'timeline',
          steps: [
            {
              date: '28 September 2026',
              text: 'VTAC (Victoria) closing date for timely applications'
            },
            {
              date: '17–18 December 2026',
              text: 'November-session IB results released on 17 December; admissions centres send IBAS and ATAR equivalents the next day'
            },
            {
              date: '23 December 2026',
              text: 'Main December offer rounds at UAC (NSW and ACT) and VTAC'
            },
            {
              date: 'January 2027',
              text: 'Further offer rounds (UAC: 8 and 21 January 2027)'
            }
          ]
        },
        {
          type: 'caution',
          text: 'Always check the admissions centre or university calendar.'
        }
      ],
      sources: [
        {
          label: 'UAC — Key dates',
          href: 'https://www.uac.edu.au/key-dates'
        },
        {
          label: 'VTAC — IB students',
          href: 'https://vtac.edu.au/guides/quickstart/ib-students'
        },
        {
          label: 'IB Schools Australasia — University entrance',
          href: 'https://ibaustralasia.org/university-entrance/'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'How is the IB diploma recognized in Australia?',
        answer:
          'It is accepted as a senior secondary qualification and assessed via IBAS–ATAR or IB-based selection rules set by universities and admissions centres.',
        source: {
          label: 'IB Schools Australasia',
          href: 'https://ibaustralasia.org/university-entrance/'
        }
      },
      {
        question: 'Do IB students get an ATAR in Australia?',
        answer:
          'No. Their IB result is converted to an ATAR-equivalent rank. Students who sat the IB in Australia are ranked on their IB Admissions Score (IBAS); students who sat it elsewhere are ranked on their whole-number diploma score.',
        source: {
          label: 'UAC',
          href: 'https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants'
        }
      },
      {
        question: 'How is the IB converted to an ATAR equivalent for 2027 entry?',
        answer:
          'Using the national conversion agreed by the tertiary admissions centres for offers made from August 2026. A diploma score of 38 earned outside Australia converts to 94.65; an IBAS of 38.00 earned in Australia converts to 94.15.',
        source: {
          label: 'UAC',
          href: 'https://www.uac.edu.au/future-applicants/admission-criteria/ib-applicants'
        }
      },
      {
        question: 'Are entrance exams required in Australia for IB students?',
        answer: 'Usually no, but some programs require additional selection steps.',
        source: {
          label: 'Curtin University',
          href: 'https://www.curtin.edu.au/study/applying/ib-diploma/'
        }
      },
      {
        question: 'Is English required for university in Australia for IB students?',
        answer: "Yes. English requirements depend on the university's policy.",
        source: {
          label: 'University of Sydney',
          href: 'https://www.sydney.edu.au/study/applying/how-to-apply/international-students/english-language-requirements.html'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Australian admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Australian university programs that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
