import type { CountryGuide } from '@/lib/guides/types'

/** Study in the Netherlands with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-netherlands-with-ib-diploma',
  countryCode: 'NL',
  exploreCountryId: 'cmip2am54000l7m18yuyj0icq',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in the Netherlands with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for admission to Dutch universities, using only official Dutch higher-education and institutional sources. The Netherlands uses a decentralized admission system with applications submitted through Studielink.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How the Netherlands recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: '**Nuffic**, the Dutch organisation for internationalisation in education and the **NARIC centre** for the Netherlands, has determined that the **IB Diploma** is equivalent to the Dutch **VWO diploma** (Voorbereidend Wetenschappelijk Onderwijs — pre-university education). This means IB Diploma holders are eligible for admission to Dutch **research universities (WO)**.'
        },
        {
          type: 'paragraph',
          text: 'Nuffic compares the IB Career-related Programme (CP) certificate to at least a Dutch **HAVO diploma**, the level that gives access to **universities of applied sciences (HBO)**.'
        },
        {
          type: 'paragraph',
          text: 'While Nuffic provides the official equivalence advice, the **final decision on admission** rests with each individual institution. Institutions may set additional requirements beyond the general equivalence, such as specific subjects at Higher Level or minimum IB scores.'
        }
      ],
      sources: [
        {
          label: 'Nuffic — International Baccalaureate',
          href: 'https://www.nuffic.nl/en/education-systems/international-baccalaureate'
        },
        {
          label: 'Nuffic — Level of the IB Diplomas',
          href: 'https://www.nuffic.nl/en/education-systems/international-baccalaureate/level-of-the-ib-diplomas'
        }
      ]
    },
    {
      label: 'Equivalence',
      heading: 'Do IB students need a Dutch diploma?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          line: 'The IB Diploma is equivalent to the Dutch VWO diploma',
          paragraphs: [
            'Nuffic officially considers the IB Diploma equivalent to the VWO diploma for university admission purposes. You do not need to obtain a separate Dutch diploma. Dutch institutions can obtain free advice from Nuffic regarding your diploma level, so you typically do not need to apply for a paid credential evaluation yourself.'
          ]
        },
        {
          type: 'caution',
          text: "**Programme-specific requirements:** While the IB Diploma provides general access, individual programmes may require specific subjects at Higher Level (HL) with minimum grades. Always check the programme's specific entry requirements on the institution's website."
        }
      ],
      sources: [
        {
          label: 'Study in NL — Checking Your Diploma',
          href: 'https://www.studyinnl.org/plan-your-stay/checking-your-diploma'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'How admission works for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Netherlands uses a **decentralized admission system**. Each institution sets its own entry requirements and admission criteria. Most applications are submitted through [Studielink](https://www.studielink.nl), the national online enrolment portal. Some institutions may use a different registration method for international students — always check with your chosen institution first.'
        },
        {
          type: 'list',
          items: [
            '**Regular programmes** — Application deadline is generally **1 May** for a September start (1 May 2027 for September 2027). Some institutions have earlier deadlines, particularly for non-EU/EEA students.',
            '**Numerus Fixus programmes** — Programmes with a limited number of places (e.g., Medicine, Psychology). For 2027-2028 the deadline is **15 January 2027 (23:59 CET)**. A selection procedure determines admission based on criteria set by the institution.',
            'You can apply to a maximum of **two Numerus Fixus programmes** per academic year. For Medicine, Dentistry, Dental Hygiene, and Physiotherapy, you are limited to **one application per programme**.'
          ]
        }
      ],
      sources: [
        {
          label: 'Study in NL — How to Apply',
          href: 'https://www.studyinnl.org/plan-your-stay/how-to-apply'
        },
        {
          label: 'Studielink — National Enrolment Portal',
          href: 'https://www.studielink.nl'
        },
        {
          label: 'University of Amsterdam — Psychology admission, 2027-2028 (in Dutch)',
          href: 'https://www.uva.nl/programmas/bachelors/psychologie/toelating-en-inschrijven/toelating-selectie-en-inschrijven.html'
        }
      ]
    },
    {
      label: 'Grade evaluation',
      heading: 'How IB scores are assessed',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Netherlands does not have a single, official IB-to-Dutch grade conversion table. Each institution evaluates IB scores according to its own criteria. However, the IB 1–7 grading scale is well understood by Dutch universities, and many publish specific IB score requirements for their programmes.'
        },
        {
          type: 'list',
          items: [
            'Institutions typically set **minimum IB total scores** and may require specific **HL subject grades** for particular programmes',
            '**You can apply with predicted grades** — the University of Amsterdam, for example, asks for your latest transcript and a school statement of predicted grades, and admits you conditionally until your final results arrive by 31 August',
            'Nuffic provides information on how **IB grades and study results** compare to the Dutch system, which institutions use as a reference'
          ]
        }
      ],
      sources: [
        {
          label: 'Nuffic — International Baccalaureate',
          href: 'https://www.nuffic.nl/en/education-systems/international-baccalaureate'
        },
        {
          label: "University of Amsterdam — Applying for a Bachelor's programme",
          href: 'https://www.uva.nl/en/education/admissions/bachelors/applying-for-a-degree-programme.html'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Are entrance exams required?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Dutch universities **generally do not require entrance exams** for IB students. Admission is based on your IB Diploma, subject requirements, and grades. However, there are important exceptions:'
        },
        {
          type: 'list',
          items: [
            '**Numerus Fixus selection** — For programmes with limited places, the institution decides the selection criteria. This may include motivation letters, CVs, aptitude tests, or interviews — depending on the programme',
            '**Arts and creative programmes** — may require portfolio submissions, auditions, or practical assessments',
            "**Language tests** — if your IB English courses do not meet the institution's requirements, you may need to provide separate English proficiency test results (IELTS, TOEFL, or Cambridge)"
          ]
        }
      ],
      sources: [
        {
          label: 'Study in NL — How to Apply',
          href: 'https://www.studyinnl.org/plan-your-stay/how-to-apply'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Netherlands is one of the most English-friendly countries in continental Europe for higher education. Language requirements depend on the language of instruction.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'English',
              items: [
                'Accepted tests: **IELTS, TOEFL iBT, Cambridge** (B2 First, C1 Advanced, C2 Proficiency), **LanguageCert, Pearson PTE, TOEIC**',
                'Required scores vary by institution and programme — check directly with the institution',
                'IB English A or English B courses may satisfy English requirements — verify with the institution'
              ]
            },
            {
              title: 'Dutch',
              items: [
                'Required only for Dutch-taught programmes',
                'IB Dutch A (SL/HL) or Dutch B (HL) may qualify for exemption or partial exemption from Dutch language requirements',
                'Typically assessed through the **Staatsexamen Nederlands als Tweede Taal (NT2)**'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in NL — Admission Requirements',
          href: 'https://www.studyinnl.org/plan-your-stay/admission-requirements'
        }
      ]
    },
    {
      label: 'University types',
      heading: 'Types of higher education in the Netherlands',
      blocks: [
        {
          type: 'paragraph',
          text: 'Dutch higher education is organized into two main types. The IB Diploma provides access to both, though the standard equivalence to VWO specifically targets research universities.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Research universities (WO)',
              items: [
                "Offer **Bachelor's** (3 years), **Master's** (1–2 years), and **PhD** programmes",
                '**IB Diploma (≡ VWO)** is the standard entry qualification',
                '14 research universities, including University of Amsterdam, TU Delft, Leiden University, and Utrecht University'
              ]
            },
            {
              title: 'Universities of applied sciences (HBO)',
              items: [
                "Offer **Bachelor's** (4 years) and some **Master's** programmes with a practical focus",
                'IB Diploma holders are also eligible for HBO programmes (HAVO level is the minimum requirement)',
                '36+ institutions, including The Hague University, Amsterdam University of Applied Sciences, and Fontys'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in NL — Admission Requirements',
          href: 'https://www.studyinnl.org/plan-your-stay/admission-requirements'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Document requirements vary by institution and programme. The following are commonly required for IB Diploma holders applying to Dutch universities:'
        },
        {
          type: 'documents',
          items: [
            'Predicted IB grades and your latest school transcript if you have not graduated yet, then the IB Diploma and final results',
            'Proof of identity (valid passport or national ID)',
            'Proof of English proficiency (IELTS, TOEFL, Cambridge — if not met through IB English courses)',
            'Nuffic credential evaluation or diploma comparison (institution may arrange this on your behalf)',
            'Proof of Dutch language proficiency (only for Dutch-taught programmes)',
            'Programme-specific supplementary documents (e.g., portfolio, motivation letter, CV)'
          ]
        },
        {
          type: 'caution',
          text: "The University of Amsterdam does not ask EEA nationals applying to some of its Bachelor's programmes for a prior-education file: the IBO sends your results directly, by 31 August. Check with your chosen institution whether it accepts direct digital results from the IBO."
        }
      ],
      sources: [
        {
          label: 'Study in NL — How to Apply',
          href: 'https://www.studyinnl.org/plan-your-stay/how-to-apply'
        },
        {
          label: 'University of Amsterdam — International Baccalaureate Admissions',
          href: 'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html'
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
              date: 'From 1 October 2026',
              title: 'Research programmes and register',
              text: "Identify programmes via the Studyfinder at studyinnl.org. Check each institution's website for specific entry requirements, deadlines, and whether Studielink registration applies to international students. Studielink registration for 2027-2028 opens on 1 October 2026."
            },
            {
              date: '15 January 2027',
              title: 'Numerus Fixus deadline',
              text: 'Application deadline for Numerus Fixus programmes (23:59 CET). You can apply to a maximum of two Numerus Fixus programmes. Selection takes place between 15 January and 15 April 2027.'
            },
            {
              date: '15 April 2027',
              title: 'Numerus Fixus results',
              text: 'You receive your ranking number via Studielink. If offered a place, you must accept within two weeks. Unaccepted places are assigned to the next applicant in line.'
            },
            {
              date: '1 May 2027',
              title: 'Regular programme deadline',
              text: 'General application deadline for non-Numerus Fixus programmes. Some institutions have earlier deadlines — always verify with your chosen institution.'
            },
            {
              date: 'September 2027',
              title: 'Academic year begins',
              text: 'The Dutch academic year typically starts in September. Some programmes also offer a February start.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in NL — How to Apply',
          href: 'https://www.studyinnl.org/plan-your-stay/how-to-apply'
        },
        {
          label: 'University of Amsterdam — Psychology admission, 2027-2028 (in Dutch)',
          href: 'https://www.uva.nl/programmas/bachelors/psychologie/toelating-en-inschrijven/toelating-selectie-en-inschrijven.html'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Is the IB Diploma recognized for university admission in the Netherlands?',
        answer:
          'Yes. Nuffic (the Dutch NARIC) has determined that the IB Diploma is equivalent to the Dutch VWO diploma (Voorbereidend Wetenschappelijk Onderwijs), which is the qualification required for admission to Dutch research universities (WO). Nuffic compares the IB Career-related Programme (CP) certificate to at least a HAVO diploma.',
        source: {
          label: 'Nuffic — Level of the IB Diplomas',
          href: 'https://www.nuffic.nl/en/education-systems/international-baccalaureate/level-of-the-ib-diplomas'
        }
      },
      {
        question: 'How do IB students apply to Dutch universities?',
        answer:
          'Most applications to Dutch higher education institutions go through Studielink (studielink.nl), the national online enrolment portal. You create an account, select your programme, and submit your application. Some institutions may also require a separate direct application. Check with your chosen institution whether Studielink applies to international applicants.',
        source: {
          label: 'Study in NL — How to Apply',
          href: 'https://www.studyinnl.org/plan-your-stay/how-to-apply'
        }
      },
      {
        question: 'What is a Numerus Fixus programme and how does it affect IB students?',
        answer:
          'Numerus Fixus programmes have a limited number of places. If more students apply than there are places, a selection procedure takes place. For the 2027-2028 academic year, the application deadline for Numerus Fixus programmes is 15 January 2027 (23:59 CET). You can apply to a maximum of two Numerus Fixus programmes per academic year. Medicine, Dentistry, Dental Hygiene, and Physiotherapy are further restricted to one application per programme.',
        source: {
          label: 'Study in NL — How to Apply',
          href: 'https://www.studyinnl.org/plan-your-stay/how-to-apply'
        }
      },
      {
        question: 'Do I need to speak Dutch to study in the Netherlands?',
        answer:
          "Not necessarily. The Netherlands offers a large number of English-taught programmes, especially at the Master's level but increasingly at Bachelor's level too. For English-taught programmes, you need to demonstrate English proficiency through tests such as IELTS, TOEFL, or Cambridge. For Dutch-taught programmes, you must demonstrate Dutch language proficiency.",
        source: {
          label: 'Study in NL — Admission Requirements',
          href: 'https://www.studyinnl.org/plan-your-stay/admission-requirements'
        }
      },
      {
        question: 'What are tuition fees for IB students in the Netherlands?',
        answer:
          'EU/EEA students pay the statutory tuition fee (wettelijk collegegeld), which the Dutch government sets each year: €2,694 for 2026-2027. The 2027-2028 amount had not been published when this page was updated. Non-EU/EEA students pay the institutional tuition fee, which each institution sets and which is typically higher. Scholarships include the NL Scholarship (formerly the Holland Scholarship) of €5,000 for non-EEA students.',
        source: {
          label: 'Study in NL — Tuition fees',
          href: 'https://www.studyinnl.org/finances/tuition-fees'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Dutch admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Dutch university programmes that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
