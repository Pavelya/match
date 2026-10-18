import type { CountryGuide } from '@/lib/guides/types'

/** Study in Canada with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-canada-with-ib-diploma',
  countryCode: 'CA',
  exploreCountryId: 'cmip2am54000i7m188uy34pym',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Canada with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for university admission in Canada, using only official public and institutional sources. It is written exclusively for IB Diploma students and IB Coordinators.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Canada recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'Canada officially recognizes the **International Baccalaureate (IB) Diploma** as a valid secondary school qualification for university admission.'
        },
        {
          type: 'paragraph',
          text: 'There is **no federal education authority** in Canada. Recognition and admission rules are defined **by provinces and individual universities**, all of which publicly accept the IB Diploma for undergraduate admission.'
        }
      ],
      sources: [
        {
          label: 'Universities Canada',
          href: 'https://www.univcan.ca/'
        },
        {
          label: 'Public university admission pages'
        }
      ]
    },
    {
      label: 'High school diploma',
      heading: 'Do IB students need a Canadian high school diploma?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          paragraphs: [
            'IB students **do not need a Canadian provincial high school diploma** (e.g., Ontario Secondary School Diploma) to apply to Canadian universities.',
            'The IB Diploma is accepted as a **standalone secondary qualification**.'
          ]
        }
      ],
      sources: [
        {
          label: 'University admission policies (e.g., UBC, Toronto, McGill)'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'University admission system in Canada',
      blocks: [
        {
          type: 'caution',
          text: 'Canada does **not** use a centralized national admissions platform.'
        },
        {
          type: 'paragraph',
          text: 'Admission is handled:'
        },
        {
          type: 'list',
          items: [
            'By **individual universities**',
            'According to **provincial frameworks**',
            'Using **institution-defined academic criteria**'
          ]
        },
        {
          type: 'paragraph',
          text: 'There is **no national IB cut-off score** or centralized conversion system.'
        }
      ],
      sources: [
        {
          label: 'Provincial education authorities'
        },
        {
          label: 'University admission offices'
        }
      ]
    },
    {
      label: 'Grade evaluation',
      heading: 'IB grade evaluation and conversion',
      blocks: [
        {
          type: 'paragraph',
          text: 'Canadian universities evaluate IB results **independently**.'
        },
        {
          type: 'paragraph',
          text: 'Common practices include:'
        },
        {
          type: 'list',
          items: [
            'Using **total IB score (24–45)** for baseline assessment',
            'Reviewing **HL subject grades** for program relevance',
            'Applying **internal grade conversions** (not public, not standardized)'
          ]
        },
        {
          type: 'paragraph',
          text: 'Some universities also grant **advanced standing or transfer credit** for high IB HL grades.'
        },
        {
          type: 'caution',
          text: 'There is **no official Canada-wide IB grade conversion table**.'
        }
      ],
      sources: [
        {
          label: 'Individual university IB policies (e.g., UBC, McGill, University of Toronto)'
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
          type: 'cards',
          cards: [
            {
              title: 'English-speaking universities',
              text: 'Proof of **English proficiency** required'
            },
            {
              title: 'French-speaking universities',
              text: '**French proficiency** required (e.g., Québec)'
            }
          ]
        },
        {
          type: 'paragraph',
          text: 'IB English does **not automatically waive** language requirements in all cases. Requirements are defined per university.'
        }
      ],
      sources: [
        {
          label: 'University language policy pages'
        },
        {
          label: 'Provincial regulations (Québec)'
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
                'Primary destination for IB students',
                'Province-regulated',
                'IB Diploma widely accepted'
              ]
            },
            {
              title: 'Private universities',
              items: [
                'Independent admission criteria',
                'Tuition fees usually higher',
                'IB acceptance varies by institution'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Universities Canada',
          href: 'https://www.univcan.ca/'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Typical application requirements:'
        },
        {
          type: 'documents',
          items: [
            'IB Diploma or predicted grades',
            'Academic transcripts',
            'Personal statement or essays',
            'Language proficiency results (if required)',
            'Letters of recommendation (some programs)'
          ]
        }
      ],
      sources: [
        {
          label: 'Individual university admission checklists'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'Application timeline for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Dates for September 2027 entry at three large universities:'
        },
        {
          type: 'timeline',
          steps: [
            {
              date: 'Late September – early October 2026',
              text: 'Applications open for September 2027 entry (U of T: late September; UBC: early October)'
            },
            {
              date: '7–15 November 2026',
              text: "Early dates: U of T's recommended early application date is 7 November; UBC's deadline to be considered for its International Scholars awards is 15 November"
            },
            {
              date: '15 January 2027',
              text: 'Application deadline at UBC, U of T, and McGill (for applicants at schools outside Canada). Some programs set other dates'
            },
            {
              date: 'January – June 2027',
              text: 'Admission decisions: U of T releases them from January to late May; UBC decides on high school applicants on a rolling basis until June'
            },
            {
              date: 'May – June 2027',
              text: "Accept your offer by the date in your offer letter (UBC's are 1 May or 1 June)"
            },
            {
              date: 'July 2027',
              text: "Final IB results released. Send them as your offer requires: UBC's deadline for final results from schools outside Canada is 25 July 2027, unless your letter says otherwise"
            }
          ]
        },
        {
          type: 'caution',
          text: 'Deadlines vary significantly by province and university.'
        }
      ],
      sources: [
        {
          label: 'UBC — Dates and deadlines',
          href: 'https://you.ubc.ca/applying-ubc/dates-deadlines/'
        },
        {
          label: 'University of Toronto — Dates and deadlines',
          href: 'https://future.utoronto.ca/deadlines'
        },
        {
          label: 'McGill — Fall 2027 application deadline',
          href: 'https://www.mcgill.ca/importantdates/channels/event/application-deadline-fall-2027-admission-undergraduate-programs-applicants-studying-or-who-last-370820'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Do Canadian universities accept predicted IB grades?',
        answer: 'Yes. Offers are typically conditional on final IB results.',
        source: {
          label: 'University admission policies'
        }
      },
      {
        question: 'Is there a national IB admission score for Canada?',
        answer: 'No. Each university evaluates IB results independently.',
        source: {
          label: 'Universities Canada'
        }
      },
      {
        question: 'Can IB students study Medicine in Canada?',
        answer: 'Yes, but Medicine is a graduate-entry program requiring a prior degree.',
        source: {
          label: 'Canadian medical school admission frameworks'
        }
      },
      {
        question: 'Is English or French mandatory?',
        answer: 'Yes. Language requirements depend on the institution and province.',
        source: {
          label: 'University language policies'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Canadian admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Canadian university programs that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
