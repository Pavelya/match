import type { CountryGuide } from '@/lib/guides/types'

/** Study in France with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-france-with-ib-diploma',
  countryCode: 'FR',
  exploreCountryId: 'cmip2am54000m7m189mi8faj3',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in France with the IB Diploma',
  intro:
    "This guide explains how the International Baccalaureate (IB) Diploma is used for university admission in France, using only official French government and institutional sources. France has no automatic recognition of the IB: each institution reviews your application. Public university degrees are mostly taught in French, so English-taught bachelor's are found at selective schools that run their own admissions.",
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How France recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: "The French **Ministry of Education** describes the IB as **a private diploma awarded by the International Baccalaureate Organization**. It does **not** give an automatic right of entry to French universities: the institution's admissions committee examines each application."
        },
        {
          type: 'paragraph',
          text: 'In practice, the IB Diploma is treated like any other foreign secondary school diploma. There is **no legal equivalence** between foreign diplomas and French ones. Each institution sets its own admission criteria and decides whether your diploma meets them when you apply.'
        },
        {
          type: 'paragraph',
          text: "This is not a barrier in itself: the English-taught bachelor's in IB Match are designed for applicants with international diplomas, and several, such as Sciences Po and École polytechnique, name the IB Diploma explicitly."
        }
      ],
      sources: [
        {
          label:
            'Ministry of Education (Eduscol) — FAQ on the French International Baccalaureate, January 2024 (PDF, in French)',
          href: 'https://eduscol.education.gouv.fr/sites/default/files/document/foire-au-question-baccalaureat-francais-international-bfi-101928.pdf'
        },
        {
          label: 'Service-Public.fr — Having a diploma obtained abroad recognized in France',
          href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F463?lang=en'
        }
      ]
    },
    {
      label: 'Equivalence',
      heading: 'Do IB students need a French diploma?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          line: 'But there is no automatic equivalence either',
          paragraphs: [
            'You apply with the IB Diploma itself; you do not need the French baccalauréat or an equivalence decision. An institution may ask for an **attestation of comparability** from ENIC-NARIC France, which compares a foreign diploma with the French system. It is not compulsory and has no legal value: the institution makes the final decision. The request costs €20 to have the file examined and €100 for the assessment.'
          ]
        }
      ],
      sources: [
        {
          label: 'Service-Public.fr — Having a diploma obtained abroad recognized in France',
          href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F463?lang=en'
        },
        {
          label: 'Service-Public.fr — Request a certificate of comparability of a foreign diploma',
          href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/R38515?lang=en'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'How admission works for IB students',
      blocks: [
        {
          type: 'caution',
          text: "France has **three routes into a first-year bachelor's**, and which one you use depends on the programme and your nationality. For the English-taught programmes most IB students look at, the usual route is the school's own application."
        },
        {
          type: 'list',
          items: [
            "**The school's own application** — École polytechnique, Sciences Po's international pathway, the Écoles Centrales and the business schools take IB applicants on their own websites, usually in several rounds, with an interview for those shortlisted",
            "**Parcoursup** — the national platform for first-year programmes, used by EU students, by holders of the French baccalauréat, and for selective programmes; some English-taught bachelor's also take applications here",
            '**The preliminary admission request (DAP)** — required of students from outside the EU who want a first-year licence at a public university; filed between 1 October and 15 December',
            "**“Études en France”** — if you live in one of the 75 countries it covers, Campus France's online procedure also manages your application through to the student visa"
          ]
        }
      ],
      sources: [
        {
          label: 'Campus France — How to apply in an institute of higher education',
          href: 'https://www.campusfrance.org/en/application-higher-education-france'
        },
        {
          label: 'Campus France — The “Études en France” procedure',
          href: 'https://www.campusfrance.org/en/application-etudes-en-france-procedure'
        },
        {
          label: 'École polytechnique — Bachelor admissions criteria and procedure (example)',
          href: 'https://programmes.polytechnique.edu/en/bachelor/admissions/admissions-criteria-and-procedure'
        }
      ]
    },
    {
      label: 'Grade evaluation',
      heading: 'How IB scores are assessed in France',
      blocks: [
        {
          type: 'answer',
          line: 'No national conversion and few published minimums',
          paragraphs: [
            "France has **no official IB-to-French grade conversion**. The English-taught bachelor's in IB Match publish no minimum IB score: they read your whole school record, predicted grades and written work, then interview the strongest applicants."
          ]
        },
        {
          type: 'list',
          items: [
            '**Sciences Po** marks your final or predicted results, your academic record and written pieces, sets a minimum each year after reviewing applications, and has **no subject requirements**',
            '**École polytechnique** sets no minimum grade but expects a strong average, with **Mathematics at Higher Level** (preferably Analysis and Approaches) and another science at Higher Level',
            'Where no minimum is published, IB Match shows **24 points**, the Diploma itself, and the program page lists what the school looks for'
          ]
        }
      ],
      sources: [
        {
          label: 'Sciences Po — International undergraduate admissions (2027 intake)',
          href: 'https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/'
        },
        {
          label: 'École polytechnique — Bachelor of Science FAQ',
          href: 'https://programmes.polytechnique.edu/en/bachelor/admissions/faq'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Entrance exams for IB students',
      blocks: [
        {
          type: 'answer',
          line: 'No national exam — but expect an interview',
          paragraphs: [
            "There is no national entrance exam for IB students. Most English-taught bachelor's shortlist on the application and then hold an **interview**, usually online and in English. Some add their own tests."
          ]
        },
        {
          type: 'list',
          items: [
            '**Interviews:** École polytechnique (about 50 minutes, remote, in English) and Sciences Po (about 25 minutes, including commenting on an image) interview shortlisted applicants',
            '**School tests:** some programmes set an online mathematics test, aptitude tests or an English assessment before the interview; each program page in IB Match says which'
          ]
        }
      ],
      sources: [
        {
          label: 'École polytechnique — Bachelor admissions criteria and procedure',
          href: 'https://programmes.polytechnique.edu/en/bachelor/admissions/admissions-criteria-and-procedure'
        },
        {
          label: 'Sciences Po — International undergraduate admissions',
          href: 'https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Language requirements depend on whether you apply to a **French-taught** or an **English-taught** programme.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'French',
              items: [
                'Needed for most **public university licences**, which are taught in French',
                'Through the DAP, **level B2** is required, shown by the **DELF B2**, the **DALF** or the **TCF**',
                'For the 2027 intake, the TCF must be taken before 15 February 2027'
              ]
            },
            {
              title: 'English',
              items: [
                'Required for **English-taught programmes**, usually at **B2 or C1** (École polytechnique and Sciences Po ask for C1)',
                'Shown by **IELTS**, **TOEFL** or **Cambridge**; most schools waive the test if your last years of school were taught in English',
                '**No French needed at entry**; many programmes teach French alongside'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Campus France — First year French university admission procedures (2027/2028)',
          href: 'https://www.australie.campusfrance.org/first-year-french-university-admission-procedures'
        },
        {
          label: 'Sciences Po — Language requirements for international applicants',
          href: 'https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/language-requirements/'
        }
      ]
    },
    {
      label: 'University types',
      heading: 'Types of institutions in France',
      blocks: [
        {
          type: 'paragraph',
          text: 'French higher education has public universities, public grandes écoles and private schools. The IB Diploma is accepted by all of them, but fees and the language of teaching differ widely.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Public institutions',
              items: [
                "**Universities** charge national fees for a bachelor's: **€178 a year** for EU, EEA and Swiss students and **€2,902** for others in 2026-2027",
                'Most university licences are taught in French',
                "**Grandes écoles** set their own fees for their English-taught bachelor's: École polytechnique's, for example, costs €15,900 a year for EU students and €19,600 for others (2027 intake)"
              ]
            },
            {
              title: 'Private institutions',
              items: [
                'About 21% of students in France attend a private institution',
                "Business schools offer many English-taught bachelor's (BBA, BSc), sometimes across several countries",
                'Fees are usually about **€6,000 to €18,000 or more** a year'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Campus France — Tuition fees in France',
          href: 'https://www.campusfrance.org/en/tuition-fees-France'
        },
        {
          label: 'École polytechnique — Bachelor tuition fees (example)',
          href: 'https://programmes.polytechnique.edu/en/bachelor/costs-and-funding/tuition-fees'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Documents go to each school or platform you apply through. Requirements vary, but typically include:'
        },
        {
          type: 'documents',
          items: [
            'School transcripts for the last two or three years, with IB predicted grades',
            'IB Diploma results, once available (offers are usually conditional until then)',
            'Personal statement or motivation letter, and a CV',
            'One or two academic references (many schools ask for them)',
            'English test score (IELTS, TOEFL or Cambridge), unless your schooling was in English',
            'Passport or national ID, and an application fee (typically €80 to €150)'
          ]
        }
      ],
      sources: [
        {
          label: 'École polytechnique — Bachelor admissions criteria and procedure',
          href: 'https://programmes.polytechnique.edu/en/bachelor/admissions/admissions-criteria-and-procedure'
        },
        {
          label: 'Sciences Po — International undergraduate admissions',
          href: 'https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'Application timeline for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Each school sets its own rounds, so there is no single calendar. For September 2027 entry, the main dates are:'
        },
        {
          type: 'timeline',
          steps: [
            {
              date: 'September – October 2026',
              text: "Most English-taught bachelor's open their first application round. École polytechnique's first round ran from 17 September to 20 October 2026; ESSEC's first deadline is 28 October 2026."
            },
            {
              date: '1 October – 15 December 2026',
              text: 'Applicants from outside the EU who want a first-year licence at a French public university file the preliminary admission request (DAP): online through "Études en France" if they live in one of the countries it covers, otherwise at the French embassy.'
            },
            {
              date: 'November 2026 – April 2027',
              text: "Further rounds at most schools, with interviews. Sciences Po's international deadlines are 4 November 2026, 13 January 2027 and 1 March 2027; universities answer DAP applicants by 30 April 2027."
            },
            {
              date: 'January – April 2027',
              text: 'Parcoursup, the national platform for first-year programmes: register between January and March 2027 and confirm your choices in April. The main admission phase runs from June to July 2027.'
            },
            {
              date: 'September 2027',
              text: 'Classes start. Students from outside the EU apply for a student visa once admitted, through "Études en France" where it applies.'
            }
          ]
        },
        {
          type: 'caution',
          text: "Early rounds often fill places first. Always check each school's admissions page for its own deadlines."
        }
      ],
      sources: [
        {
          label: 'Campus France — Parcoursup and DAP timetables for 2027-2028',
          href: 'https://www.campusfrance.org/en/application-higher-education-france'
        },
        {
          label: 'Sciences Po — Calendar for the 2027 intake',
          href: 'https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/'
        },
        {
          label: 'ESSEC Global BBA — Application deadlines, intake 2027',
          href: 'https://www.essec.edu/en/program/global-bba-international/'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Is the IB Diploma recognized for university admission in France?',
        answer:
          'Yes, as a foreign secondary school diploma, but not automatically. The French Ministry of Education describes the IB as a private diploma awarded by the International Baccalaureate Organization that does not give an automatic right of entry to French universities: each institution examines the application. There is no legal equivalence between foreign diplomas and the French baccalauréat.',
        source: {
          label:
            'Ministry of Education (Eduscol) — FAQ on the French International Baccalaureate (PDF, in French)',
          href: 'https://eduscol.education.gouv.fr/sites/default/files/document/foire-au-question-baccalaureat-francais-international-bfi-101928.pdf'
        }
      },
      {
        question: "Can I study for a bachelor's degree in English in France?",
        answer:
          "Yes, but mostly outside the public universities. Their three-year licences are taught in French. English-taught bachelor's that IB students can enter in the first year are offered by selective schools such as École polytechnique, Sciences Po, Université PSL and the Écoles Centrales, by Toulouse School of Management at Université Toulouse Capitole, and by private business schools. Campus France lists programmes taught in English.",
        source: {
          label: 'Campus France — Programmes taught in English',
          href: 'https://taughtie.campusfrance.org/tiesearch/'
        }
      },
      {
        question: 'Do IB students apply through Parcoursup?',
        answer:
          "It depends on the programme and your nationality. Parcoursup handles first-year programmes for EU students and for selective programmes. Students from outside the EU who want a first-year licence at a university file a preliminary admission request (DAP) between October and December. Most English-taught bachelor's, including those at Polytechnique, Sciences Po and the business schools, take applications from IB students on their own websites.",
        source: {
          label: 'Campus France — How to apply in an institute of higher education',
          href: 'https://www.campusfrance.org/en/application-higher-education-france'
        }
      },
      {
        question: 'Do I need to speak French to study in France with the IB?',
        answer:
          'Not for English-taught programmes, which ask for English instead, usually at B2 or C1. For a French-taught licence at a public university through the DAP, applicants need French at B2, shown by the DELF or DALF or by the TCF, which must be taken before mid-February.',
        source: {
          label: 'Campus France — First year French university admission procedures',
          href: 'https://www.australie.campusfrance.org/first-year-french-university-admission-procedures'
        }
      },
      {
        question: 'How much does a bachelor’s degree cost in France?',
        answer:
          "At public universities, a bachelor's costs €178 a year for EU, EEA and Swiss students and €2,902 for other students in 2026-2027. Schools that run their own bachelor's, public grandes écoles and private business schools alike, charge more: Campus France gives about €6,000 to €18,000 or more a year for private schools.",
        source: {
          label: 'Campus France — Tuition fees in France',
          href: 'https://www.campusfrance.org/en/tuition-fees-France'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates French admission](/how-it-works) requirements for your profile.'
  },
  closing:
    "Discover English-taught bachelor's in France that match your IB profile. Search by IB points, subject requirements, and field of study."
}
