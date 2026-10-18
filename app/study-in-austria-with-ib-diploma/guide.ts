import type { CountryGuide } from '@/lib/guides/types'

/** Study in Austria with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-austria-with-ib-diploma',
  countryCode: 'AT',
  exploreCountryId: 'cmj0h9qqo00017mfw03q5slo2',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Austria with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for admission to Austrian universities, using only official Austrian higher-education and institutional sources. The IB Diploma is recognized as a general university entrance qualification by Austrian public universities.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Austria recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'Austrian public universities recognize the **International Baccalaureate (IB) Diploma** as a **general university entrance qualification (allgemeine Universitätsreife)**. This means the IB Diploma is treated as equivalent to the Austrian *Matura* for the purposes of university admission.'
        },
        {
          type: 'paragraph',
          text: 'Unlike some foreign qualifications, the IB Diploma does **not require Nostrifizierung** (formal recognition / nostrification) for university admission. The Nostrifizierung process applies to the recognition of completed academic degrees for professional purposes, not to secondary school-leaving certificates like the IB Diploma.'
        }
      ],
      sources: [
        {
          label: 'Study in Austria — Application and admission',
          href: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
        },
        {
          label: 'TU Graz — Admission with the International Baccalaureate',
          href: 'https://www.tugraz.at/en/studying-and-teaching/studying-at-tu-graz/prospective-students/registration-and-admission/admission-of-international-degree-programme-applicants/international-baccalaureate-ib'
        }
      ]
    },
    {
      label: 'Nostrifizierung',
      heading: 'Do IB students need a Nostrifizierung?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          paragraphs: [
            'IB students do **not** need a *Nostrifizierung* (formal recognition of foreign qualifications) to apply for university admission in Austria. The IB Diploma is directly recognized as a **general university entrance qualification** when the required criteria are met.'
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Austria — Application and admission',
          href: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
        },
        {
          label: 'TU Graz — Admission with the International Baccalaureate',
          href: 'https://www.tugraz.at/en/studying-and-teaching/studying-at-tu-graz/prospective-students/registration-and-admission/admission-of-international-degree-programme-applicants/international-baccalaureate-ib'
        }
      ]
    },
    {
      label: 'Admission requirements',
      heading: 'IB Diploma requirements for Austrian universities',
      blocks: [
        {
          type: 'paragraph',
          text: 'To be admitted to an Austrian public university with an IB Diploma, the following criteria must be met:'
        },
        {
          type: 'list',
          items: [
            '**Full IB Diploma** — the complete Diploma is required; an IB Certificate alone is not sufficient for admission',
            '**Minimum 24 points** overall from six subjects',
            '**At least 3 Higher Level (HL) subjects**',
            '**A foreign language and mathematics** among your subjects (the foreign language can be German)',
            '**Core components** completed: Extended Essay (EE), Theory of Knowledge (TOK), and CAS'
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Austria — Application and admission',
          href: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
        },
        {
          label: 'University of Vienna — School-leaving certificate from a school abroad',
          href: 'https://studieren.univie.ac.at/en/admission/bachelordiploma-programmes/schools-abroad/'
        },
        {
          label: 'TU Graz — Admission with the International Baccalaureate',
          href: 'https://www.tugraz.at/en/studying-and-teaching/studying-at-tu-graz/prospective-students/registration-and-admission/admission-of-international-degree-programme-applicants/international-baccalaureate-ib'
        }
      ]
    },
    {
      label: 'Subject groups',
      heading: 'Required IB subject groups',
      blocks: [
        {
          type: 'paragraph',
          text: 'An IB Diploma covers the six subject groups below. Of these, the University of Vienna and TU Graz specifically check for mathematics and a foreign language:'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Group 1',
              text: 'Studies in Language and Literature (Language A)'
            },
            {
              title: 'Group 2',
              text: 'Language Acquisition (or a second Group 1 language)'
            },
            {
              title: 'Group 3',
              text: 'Individuals and Societies (e.g., History, Economics, Psychology)'
            },
            {
              title: 'Group 4',
              text: 'Sciences (e.g., Biology, Chemistry, Physics)'
            },
            {
              title: 'Group 5',
              text: 'Mathematics (required)'
            },
            {
              title: 'Group 6',
              text: 'The Arts (or an additional subject from Groups 1–5)'
            }
          ]
        },
        {
          type: 'caution',
          text: '**Programme-specific requirements:** Some programmes add their own conditions, such as an entrance exam (see below). Check the programme page at your university.'
        }
      ],
      sources: [
        {
          label: 'Study in Austria — Application and admission',
          href: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
        },
        {
          label: 'University of Vienna — School-leaving certificate from a school abroad',
          href: 'https://studieren.univie.ac.at/en/admission/bachelordiploma-programmes/schools-abroad/'
        },
        {
          label: 'TU Graz — Admission with the International Baccalaureate',
          href: 'https://www.tugraz.at/en/studying-and-teaching/studying-at-tu-graz/prospective-students/registration-and-admission/admission-of-international-degree-programme-applicants/international-baccalaureate-ib'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'caution',
          text: 'German proficiency is required for most programmes.'
        },
        {
          type: 'paragraph',
          text: 'The majority of programmes at Austrian public universities are taught in **German**. A growing number of programmes are also offered in English.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'German',
              items: [
                'Required for the vast majority of programmes',
                'TU Graz accepts German **Language A** in the IB as proof of C1',
                "The University of Vienna needs A2 when you apply and C1 before you start a German-taught Bachelor's programme, and counts German taken as an IB subject only as A2. First-language speakers can declare C1 themselves"
              ]
            },
            {
              title: 'English',
              items: [
                'Required for English-taught programmes',
                'If English is taken as **Language A** in the IB, this typically fulfils the requirement',
                'Otherwise, IELTS, TOEFL, or equivalent may be required'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Austria — Application and admission',
          href: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
        },
        {
          label: 'University of Vienna — German language proficiency',
          href: 'https://studieren.univie.ac.at/en/admission/german-language-proficiency/'
        },
        {
          label: 'TU Graz — Admission with the International Baccalaureate',
          href: 'https://www.tugraz.at/en/studying-and-teaching/studying-at-tu-graz/prospective-students/registration-and-admission/admission-of-international-degree-programme-applicants/international-baccalaureate-ib'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Entrance exams and restricted programmes',
      blocks: [
        {
          type: 'paragraph',
          text: 'Some Austrian university programmes have **additional admission restrictions** beyond the general IB Diploma requirements. These apply equally to all applicants regardless of qualification type:'
        },
        {
          type: 'list',
          items: [
            '**Medicine and Dentistry** — require the **MedAT entrance exam**, held on the same day in Vienna, Innsbruck, Graz and Linz. The 2027 dates had not been published when this page was updated; in 2026 registration ran from 2 to 31 March and the test was on 3 July. In Human Medicine, at least 75% of places go to holders of an Austrian (or equivalent) school-leaving certificate, at least 95% to EU citizens and those with the same status, and at most 5% to non-EU applicants',
            '**Psychology, Business, Computer Science, Biology** — may require entrance exams or selection processes',
            '**Architecture and Arts** — may require portfolio submissions or aptitude tests'
          ]
        },
        {
          type: 'caution',
          text: "Application deadlines for programmes with entrance exams can be **up to 6 months before** the start of the semester. Check the specific university's website well in advance."
        }
      ],
      sources: [
        {
          label: 'Study in Austria — Application and admission',
          href: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
        },
        {
          label: 'MedAT — Admission to Medicine and Dentistry (in German)',
          href: 'https://www.medizinstudieren.at/'
        },
        {
          label: 'MedAT — Study places and quotas (in German)',
          href: 'https://www.medizinstudieren.at/studienplaetze-und-kontingentregelung/studienplaetze/'
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
                '22 public universities (Universitäten)',
                'IB Diploma recognized as entrance qualification',
                'No tuition fees for EU/EEA students within the minimum study duration plus two semesters (€363.36 a semester after that); €751.92 a semester for most other students. Everyone pays the €25.20 student union and insurance fee',
                'Some programmes have additional entrance exams'
              ]
            },
            {
              title: 'FH & private universities',
              items: [
                'Fachhochschulen (Universities of Applied Sciences) and private universities',
                'Often have their own entrance exams or selection procedures',
                'Application deadlines and requirements may differ significantly',
                "Always check the institution's official admissions info"
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Austria — Application and admission',
          href: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
        },
        {
          label: 'Study in Austria — Tuition fees',
          href: 'https://studyinaustria.at/en/tuition'
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
            'Official IB Diploma certificate (colour scan of the original)',
            'IB transcript showing all subjects, levels (HL/SL), and grades',
            'Proof of nationality (photocopy of passport)',
            'Proof of German language proficiency (or language of instruction)',
            'Legalised translations of all documents not in German or English',
            'Any programme-specific materials (e.g., portfolio for arts programmes)'
          ]
        },
        {
          type: 'caution',
          text: 'Foreign documents must be presented in the original and legalised. Documents not in German or English require **legalised translations**. Translations done abroad also require legalisation.'
        }
      ],
      sources: [
        {
          label: 'Study in Austria — Application and admission',
          href: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'Application timeline and process',
      blocks: [
        {
          type: 'paragraph',
          text: "Applications are made **directly to each university's admissions office**. There is no centralised application portal for all Austrian universities."
        },
        {
          type: 'timeline',
          steps: [
            {
              date: 'Winter Semester',
              time: 'October start',
              text: 'General application deadline: **5 September**. The winter semester runs from October to the end of January. Universities can set earlier dates: for winter 2026/27, the University of Vienna closed on 5 September 2026 for EU/EEA citizens and on 3 August 2026 for non-EU/EEA citizens. Its dates for winter 2027/28 had not been published when this page was updated.'
            },
            {
              date: 'Summer Semester',
              time: 'March start',
              text: 'General application deadline: **5 February**. The summer semester runs from March to the end of June. For summer 2027, the University of Vienna accepts applications from 16 November 2026 to 5 February 2027 (EU/EEA citizens) or to 7 January 2027 (non-EU/EEA citizens).'
            },
            {
              date: 'Apply early',
              text: 'Submit your application as early as possible — reviewing foreign documents takes longer and may delay processing'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Austria — Application and admission',
          href: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
        },
        {
          label: 'OeAD — Entry and residence',
          href: 'https://oead.at/en/to-austria/entry-and-residence'
        },
        {
          label: 'University of Vienna — Application and admission periods',
          href: 'https://studieren.univie.ac.at/en/admission/application-and-admission-periods/'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Is the IB Diploma recognized for university admission in Austria?',
        answer:
          'Yes. The IB Diploma is recognized as a general university entrance qualification (allgemeine Universitätsreife) by Austrian universities when specific criteria are met. No Nostrifizierung (formal degree recognition) is required for university admission.',
        source: {
          label: 'TU Graz — Admission with the International Baccalaureate',
          href: 'https://www.tugraz.at/en/studying-and-teaching/studying-at-tu-graz/prospective-students/registration-and-admission/admission-of-international-degree-programme-applicants/international-baccalaureate-ib'
        }
      },
      {
        question: 'What is the minimum IB score for Austrian universities?',
        answer:
          'At the University of Vienna and TU Graz, you need a full IB Diploma with at least 24 points (an IB Certificate is not enough), at least six subjects including a foreign language and mathematics, and at least three subjects at Higher Level.',
        source: {
          label: 'University of Vienna — School-leaving certificate from a school abroad',
          href: 'https://studieren.univie.ac.at/en/admission/bachelordiploma-programmes/schools-abroad/'
        }
      },
      {
        question: 'Is German required for studying in Austria?',
        answer:
          "Yes, for German-taught programmes, which are the majority at public universities. Each university sets the level. The University of Vienna needs C1 before you start a German-taught Bachelor's programme and counts German taken as an IB subject only as A2 proof; TU Graz accepts German Language A as proof of C1.",
        source: {
          label: 'University of Vienna — German language proficiency',
          href: 'https://studieren.univie.ac.at/en/admission/german-language-proficiency/'
        }
      },
      {
        question: 'Do IB students need to pass entrance exams in Austria?',
        answer:
          'Some competitive programmes (e.g., Medicine, Dentistry, Psychology, Business, Computer Science) require entrance exams such as the MedAT. These apply to all applicants regardless of qualification type.',
        source: {
          label: 'Study in Austria — Application and admission',
          href: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
        }
      },
      {
        question: 'When should IB students apply to Austrian universities?',
        answer:
          'The general application deadline is 5 September for the winter semester and 5 February for the summer semester, but programmes with entrance exams can close up to six months before the semester starts. International applicants should apply well in advance as processing foreign documents may take longer.',
        source: {
          label: 'Study in Austria — Application and admission',
          href: 'https://studyinaustria.at/en/plan-your-studies/application-and-admission'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Austrian admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Austrian university programmes that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
