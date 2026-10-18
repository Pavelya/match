import type { CountryGuide } from '@/lib/guides/types'

/** Study in the UK with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-uk-with-ib-diploma',
  countryCode: 'GB',
  exploreCountryId: 'cmip2am54000k7m18c5fs1ucx',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in the UK with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for university admission in the United Kingdom, using only official UCAS and UK government sources. It is written exclusively for IB Diploma students and IB Coordinators.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How the UK recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'The United Kingdom accepts the **International Baccalaureate (IB) Diploma** as a valid **Level 3 qualification** that allows applicants to apply for undergraduate study through the UK admissions system.'
        },
        {
          type: 'paragraph',
          text: 'Most UK universities list IB entry requirements alongside A-levels and other qualifications in their UCAS course listings.'
        }
      ],
      sources: [
        {
          label: 'UCAS — Official UK admissions service',
          href: 'https://www.ucas.com/'
        }
      ]
    },
    {
      label: 'UCAS application',
      heading: 'Do IB students apply through UCAS?',
      blocks: [
        {
          type: 'answer',
          word: 'Yes',
          paragraphs: [
            'IB students must apply for undergraduate degree courses through **UCAS**, the official centralized platform used by virtually all UK universities and higher-education providers.'
          ]
        },
        {
          type: 'paragraph',
          text: 'UCAS allows students to:'
        },
        {
          type: 'list',
          items: [
            'Apply to up to five courses',
            'Submit predicted grades',
            'Receive conditional and unconditional offers'
          ]
        }
      ],
      sources: [
        {
          label: 'UCAS — International student support and admissions',
          href: 'https://www.ucas.com/international/international-students/support-for-international-students/tips-for-international-applications'
        }
      ]
    },
    {
      label: 'Entry requirements',
      heading: 'UK entry requirements for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'UK universities set their own **entry requirements for IB students**.'
        },
        {
          type: 'paragraph',
          text: 'Typically, offers are expressed using:'
        },
        {
          type: 'list',
          items: [
            '**Total IB points** (e.g., 32–40+)',
            '**Specific Higher Level subject criteria**',
            '**Additional admissions test requirements** for competitive subjects'
          ]
        },
        {
          type: 'caution',
          text: 'There is **no single government-mandated minimum** for IB scores; requirements are published per course on UCAS and university sites.'
        }
      ]
    },
    {
      label: 'Grade conversion',
      heading: 'Is there a national IB grade conversion in the UK?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          paragraphs: [
            'The UK does not operate a **national grade conversion table** for the IB equivalent to A-Levels. Instead, universities interpret IB results as Level 3 qualifications and may express offers in **UCAS Tariff points** if they choose, but this is institution-specific.'
          ]
        }
      ],
      sources: [
        {
          label: 'UCAS Tariff points — official guide',
          href: 'https://www.ucas.com/applying/before-you-apply/what-and-where-to-study/entry-requirements/ucas-tariff-points'
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
          line: 'English language proficiency is required'
        },
        {
          type: 'paragraph',
          text: 'UK universities define their own English language requirements for admission. Many accept IB English at an appropriate level, but some will require an additional English proficiency test depending on the institution and program.'
        },
        {
          type: 'paragraph',
          text: 'International students must also meet the **UK student visa English requirements** as set by the UK government.'
        }
      ],
      sources: [
        {
          label: 'UK visa English requirement guidance — gov.uk',
          href: 'https://www.gov.uk/student-visa/knowledge-of-english'
        }
      ]
    },
    {
      label: 'Visa requirements',
      heading: 'Student visa requirements (international IB students)',
      blocks: [
        {
          type: 'paragraph',
          text: 'International IB students **require a UK Student visa** to study in the UK.'
        },
        {
          type: 'paragraph',
          text: 'General requirements include:'
        },
        {
          type: 'list',
          items: [
            '**Confirmation of Acceptance for Studies (CAS)** from a UK university',
            'Proof of English language ability',
            'Sufficient funds evidence',
            'Valid passport'
          ]
        }
      ],
      sources: [
        {
          label: 'Student visa requirements — gov.uk',
          href: 'https://www.gov.uk/student-visa'
        }
      ]
    },
    {
      label: 'University types',
      heading: 'Public vs private universities in the UK',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'Public universities',
              items: [
                'Most UK universities are publicly funded',
                'Participate in the UCAS admissions cycle',
                'IB Diploma widely accepted'
              ]
            },
            {
              title: 'Private & specialist providers',
              items: [
                'Also participate in UCAS',
                'May have supplementary requirements',
                'UCAS admissions apply regardless of status'
              ]
            }
          ]
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'For UK UCAS applications, IB students typically need:'
        },
        {
          type: 'documents',
          items: [
            'Predicted IB grades',
            'Academic reference',
            'Personal statement: three questions, 4,000 characters in total',
            'Final IB results (after May exams); UCAS can send IB results to universities for you'
          ]
        },
        {
          type: 'note',
          text: '**Note:** Since 2026 entry, the UCAS personal statement is three questions instead of one essay: why you want to study the course, how your studies have prepared you, and what else you have done to prepare. The 4,000-character limit is unchanged, and each answer needs at least 350 characters. New for 2027 entry, UCAS lets every applicant upload documents such as English test certificates and passport details.'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'UCAS application timeline',
      blocks: [
        {
          type: 'paragraph',
          text: '**2027 entry UCAS dates**, as published by UCAS:'
        },
        {
          type: 'timeline',
          steps: [
            {
              date: '12 May 2026',
              text: 'UCAS applications open for 2027 entry: register and start your application'
            },
            {
              date: '1 September 2026',
              text: 'Completed applications can be sent to UCAS, once your reference is attached'
            },
            {
              date: '15 October 2026',
              time: '18:00 UK time',
              text: 'Equal consideration deadline for Oxford, Cambridge, and most medicine, dentistry, and veterinary courses'
            },
            {
              date: '13 January 2027',
              time: '18:00 UK time',
              text: 'Equal consideration deadline for most undergraduate courses'
            },
            {
              date: '25 February 2027',
              text: 'UCAS Extra opens for applicants who have used all five choices and hold no offers'
            },
            {
              date: '30 June 2027',
              time: '18:00 UK time',
              text: 'Last date for applications to be sent to universities; later applications go into Clearing'
            },
            {
              date: '2 July 2027',
              text: 'UCAS Clearing opens for applicants without offers or wanting new choices'
            },
            {
              date: '23 September 2027',
              time: '18:00 UK time',
              text: 'Final UCAS deadline for 2027 entry'
            }
          ]
        },
        {
          type: 'caution',
          text: 'Deadlines can vary by course; check the official UCAS deadlines page near application time.'
        }
      ],
      sources: [
        {
          label: 'UCAS — Dates and deadlines for uni applications',
          href: 'https://www.ucas.com/applying/applying-to-university/dates-and-deadlines-for-uni-applications'
        },
        {
          label: 'UCAS — Key dates and the application journey',
          href: 'https://www.ucas.com/discover/advice-for-parents-guardians-and-carers/key-dates-and-the-application-journey'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'How is the IB diploma recognized in the UK?',
        answer:
          'It is treated as a Level 3 qualification equivalent to A-Levels for UCAS undergraduate admission.',
        source: {
          label: 'UCAS overview of admissions',
          href: 'https://www.ucas.com/international/international-students/support-for-international-students/tips-for-international-applications'
        }
      },
      {
        question: 'Do IB students apply through UCAS?',
        answer:
          'Yes, all undergraduate applications — including international IB students — are submitted through UCAS.',
        source: {
          label: 'UCAS international support page',
          href: 'https://www.ucas.com/international/international-students/support-for-international-students/tips-for-international-applications'
        }
      },
      {
        question: 'Is there a national IB conversion table in the UK?',
        answer: 'No; universities set their own entry criteria and may use Tariff points.',
        source: {
          label: 'UCAS Tariff context',
          href: 'https://www.ucas.com/applying/before-you-apply/what-and-where-to-study/entry-requirements/ucas-tariff-points'
        }
      },
      {
        question: 'Can IB students study Medicine in the UK?',
        answer:
          'Yes, but applications for medicine courses have an earlier deadline: 15 October 2026 for 2027 entry.',
        source: {
          label: 'UCAS 2027 entry deadlines',
          href: 'https://www.ucas.com/applying/applying-to-university/dates-and-deadlines-for-uni-applications'
        }
      },
      {
        question: 'Is English required for university in the UK?',
        answer: 'Yes; both university admissions and UK visas require English proficiency.',
        source: {
          label: 'UK government student visa guidance',
          href: 'https://www.gov.uk/student-visa'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates UK admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover UK university programs that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
