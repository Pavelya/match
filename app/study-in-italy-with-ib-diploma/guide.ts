import type { CountryGuide } from '@/lib/guides/types'

/** Study in Italy with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-italy-with-ib-diploma',
  countryCode: 'IT',
  exploreCountryId: 'cmip2am54000p7m18xgfkk638',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Italy with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for university admission in Italy, using only official public sources. It is written exclusively for IB Diploma students and IB Coordinators.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Italy recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'Italy accepts the **International Baccalaureate (IB) Diploma** for access to higher education if it meets the conditions set by the **Ministry of Universities and Research (MUR)** in its procedures for international students, which cover 2026–27 and 2027–28:'
        },
        {
          type: 'list',
          items: [
            'At least **24 points in six subjects**, 12 of them at Higher Level',
            'Theory of Knowledge, the Extended Essay and CAS passed',
            'The IB started after the second-to-last year of secondary school (the 11th year in a 12-year school system)'
          ]
        },
        {
          type: 'paragraph',
          text: 'IB Diploma Programme Course Results do not give access. Each university decides on admission itself and relies on **CIMEA**, the Italian ENIC-NARIC centre, to verify foreign diplomas, including the IB.'
        }
      ],
      sources: [
        {
          label: 'MUR — Procedures for international students, Annex 1 (PDF, in Italian)',
          href: 'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf'
        },
        {
          label: 'CIMEA — Italian ENIC-NARIC centre',
          href: 'https://www.cimea.it'
        }
      ]
    },
    {
      label: 'Maturità exemption',
      heading: 'Do IB students need the Italian Maturità?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          paragraphs: [
            'IB students **do not need to obtain the Italian Maturità (Esame di Stato)**. An IB Diploma that meets the MUR conditions gives access to Italian higher education on its own.',
            "Diplomas from IB schools in Italy on the Ministry of Education's list under Law 738/1986 are equivalent to the Italian school-leaving diploma."
          ]
        }
      ],
      sources: [
        {
          label: 'MUR — Procedures for international students, Annex 1 (PDF, in Italian)',
          href: 'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'University admission system in Italy',
      blocks: [
        {
          type: 'caution',
          text: "Italy does **not** use a centralized points-based admission system. There is **no national IB score conversion table** equivalent to Spain's 14-point scale."
        },
        {
          type: 'paragraph',
          text: 'Admission decisions are made **per university and per program**, based on:'
        },
        {
          type: 'list',
          items: [
            'Recognition of the IB Diploma',
            'Program-specific academic requirements',
            'Entrance exams (for restricted programs)'
          ]
        },
        {
          type: 'paragraph',
          text: 'Non-EU students who need a visa **pre-enrol through Universitaly**. Each university sets how many places it reserves for them and its own pre-enrolment dates.'
        }
      ],
      sources: [
        {
          label: 'Universitaly — Procedures for international students (in Italian)',
          href: 'https://www.universitaly.it/it/studenti-stranieri'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Entrance exams and restricted programs',
      blocks: [
        {
          type: 'answer',
          word: 'Yes',
          line: 'Some programs require entrance exams, even for IB students'
        },
        {
          type: 'paragraph',
          text: 'Nationally restricted programs (*corsi ad accesso programmato*) include:'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Medicine and Surgery, Dentistry, Veterinary Medicine (taught in Italian)',
              text: 'Open first semester (semestre aperto): you enrol, then pass national exams in Biology, Chemistry and biochemistry, and Physics to continue'
            },
            {
              title: 'Medicine and Surgery, Dentistry, Veterinary Medicine (taught in English)',
              text: 'National admission test (IMAT)'
            },
            {
              title: 'Architecture',
              text: "Admission test set in each university's call for applications"
            },
            {
              title: 'Primary Education Sciences',
              text: "Admission test set in each university's call for applications"
            }
          ]
        },
        {
          type: 'paragraph',
          text: 'The Medicine reform (Law 26/2025) replaced the old national entrance test for Italian-taught courses from 2025–26. These requirements apply **regardless of holding an IB Diploma**.'
        }
      ],
      sources: [
        {
          label: 'MUR — Procedures for international students (PDF, in Italian)',
          href: 'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf'
        },
        {
          label: 'MUR — Registration opens for the semestre aperto 2026–27 (in Italian)',
          href: 'https://www.mur.gov.it/it/news/lunedi-13072026/medicina-al-le-iscrizioni-al-semestre-aperto'
        },
        {
          label: 'MUR — Admission test dates for 2026–27 (in Italian)',
          href: 'https://www.mur.gov.it/it/news/martedi-07072026/universita-fissate-le-date-delle-prove-dammissione-le-facolta-ad-accesso'
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
          line: 'Your language level is checked for every course'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Italian-taught programs',
              text: 'Each university tests your Italian at **B2 or higher**. A recognised Italian certificate at B2 or above exempts you from the test.'
            },
            {
              title: 'English-taught programs',
              text: 'No Italian test, but you need a **certificate in the language of the course**'
            }
          ]
        },
        {
          type: 'paragraph',
          text: 'The required level and the accepted certificates are set by each university.'
        }
      ],
      sources: [
        {
          label: 'MUR — Procedures for international students (PDF, in Italian)',
          href: 'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf'
        },
        {
          label: 'Individual university admission pages'
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
                'Diploma recognition required',
                'Entrance exams for restricted programs',
                'Language level checked for every course'
              ]
            },
            {
              title: 'Private universities',
              items: [
                'Independent admission procedures',
                'The same MUR rules on foreign diplomas',
                'Program-specific selection criteria'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Universitaly — Procedures for international students (in Italian)',
          href: 'https://www.universitaly.it/it/studenti-stranieri'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'CIMEA verification and required documents',
      blocks: [
        {
          type: 'paragraph',
          text: 'For the IB Diploma, the MUR procedures tell universities to ask for **CIMEA documents** instead of a *Dichiarazione di valore*.'
        },
        {
          type: 'paragraph',
          text: 'Typical documents:'
        },
        {
          type: 'documents',
          items: [
            'IB Diploma (IB Diploma Programme Course Results do not give access)',
            "Attestato di Corrispondenza for your IB Diploma, free from CIMEA's ARDI platform",
            'CIMEA verification of your IB Diploma (attestato di verifica)',
            'Passport or ID',
            'Proof of language level: Italian at B2 or higher for courses taught in Italian, or a certificate in the language of the course'
          ]
        }
      ],
      sources: [
        {
          label: 'MUR — Procedures for international students, Annex 1 (PDF, in Italian)',
          href: 'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf'
        },
        {
          label: 'CIMEA — ARDI platform',
          href: 'https://ardi.cimea.it'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'Application timeline',
      blocks: [
        {
          type: 'paragraph',
          text: 'The main steps for 2027–28 entry, from the MUR procedures and the 2026 calendar:'
        },
        {
          type: 'timeline',
          steps: [
            {
              date: 'Before you apply',
              text: 'Check that your IB Diploma meets the Italian conditions: at least 24 points in six subjects, 12 of them at Higher Level, with TOK, the Extended Essay and CAS passed.'
            },
            {
              date: 'Dates set by each university',
              text: 'Non-EU applicants who need a visa pre-enrol through Universitaly. Each university sets its own pre-enrolment dates and publishes them on its website.'
            },
            {
              date: 'July–September',
              text: 'Restricted programs. In 2026, registration for the Italian-taught semestre aperto ran from 13 July to 3 August, and the English-taught admission test (IMAT) was held at the end of September. The 2027 dates are not yet published.'
            },
            {
              date: 'By 31 October 2027',
              text: 'Last day to apply for a study visa for 2027–28 courses. Universities may set earlier dates.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Universitaly — Procedures for international students (in Italian)',
          href: 'https://www.universitaly.it/it/studenti-stranieri'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Are predicted IB grades accepted in Italy?',
        answer:
          'Universities assess applications themselves, so ask each one whether it accepts predicted grades. Access itself depends on the final IB Diploma: CIMEA verifies the Diploma only once it has been awarded and meets the Italian conditions.',
        source: {
          label: 'MUR — Procedures for international students, Annex 1 (PDF, in Italian)',
          href: 'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf'
        }
      },
      {
        question: 'Can IB students study Medicine in Italy?',
        answer:
          'Yes. Italian-taught Medicine, Dentistry and Veterinary Medicine now start with an open first semester (semestre aperto): you enrol, then pass national exams in Biology, Chemistry and biochemistry, and Physics to continue. English-taught programs use a national admission test (IMAT).',
        source: {
          label: 'MUR — Registration opens for the semestre aperto 2026–27 (in Italian)',
          href: 'https://www.mur.gov.it/it/news/lunedi-13072026/medicina-al-le-iscrizioni-al-semestre-aperto'
        }
      },
      {
        question: 'Is Italian mandatory for all programs?',
        answer:
          'No. For courses taught in Italian, each university tests your Italian at level B2 or higher, unless you are exempt, for example with a recognised B2 certificate. For courses taught in another language, you show a certificate in that language instead.',
        source: {
          label: 'MUR — Procedures for international students (PDF, in Italian)',
          href: 'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf'
        }
      },
      {
        question: 'Is CIMEA mandatory for IB students?',
        answer:
          "Yes, in practice. For the IB Diploma, the MUR procedures tell universities to ask for the Attestato di Corrispondenza, which is free on CIMEA's ARDI platform, and CIMEA's verification, instead of a Dichiarazione di valore.",
        source: {
          label: 'MUR — Procedures for international students, Annex 1 (PDF, in Italian)',
          href: 'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Italian admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Italian university programs that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
