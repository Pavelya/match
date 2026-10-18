import type { CountryGuide } from '@/lib/guides/types'

/** Study in Belgium with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-belgium-with-ib-diploma',
  countryCode: 'BE',
  exploreCountryId: 'cmkx382fh000ki604tru6p706',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Belgium with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for university admission in Belgium, using only official government and institutional sources. It is written exclusively for IB Diploma students and IB Coordinators.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Belgium recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'Belgium officially recognizes the **International Baccalaureate (IB) Diploma** as a valid secondary school qualification for university admission.'
        },
        {
          type: 'paragraph',
          text: 'Belgium has **three linguistic communities**, each with its own education system. Recognition rules differ between the **Flemish Community** and the **French Community**.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Flemish Community',
              text: 'The IB Diploma is **automatically recognized as equivalent** to the Flemish certificate of secondary education. No application is needed.'
            },
            {
              title: 'French Community',
              text: '**No equivalence is needed.** The Fédération Wallonie-Bruxelles lists school-leaving certificates issued by the International Baccalaureate among those that give access to higher education without one, provided your school is authorised by the IB.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Flanders.be — Foreign diplomas automatically recognised in Flanders',
          href: 'https://www.vlaanderen.be/en/working-enterprise-and-investment/working/working-in-flanders-with-a-foreign-diploma/foreign-diplomas-that-are-automatically-recognised-in-flanders'
        },
        {
          label: 'Study in Flanders — Admission requirements',
          href: 'https://www.studyinflanders.be/practical-information/admission-requirements'
        },
        {
          label: 'Wallonie-Bruxelles Campus — Equivalence of qualification',
          href: 'https://www.studyinbelgium.be/en/bachelors-degree-studies-french-speaking-belgium-equivalence-qualification'
        }
      ]
    },
    {
      label: 'Equivalence',
      heading: 'Do IB students need a Belgian secondary diploma?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          paragraphs: [
            'IB students **do not need a Belgian secondary diploma** (CESS or Flemish equivalent) to apply to Belgian universities.',
            'The IB Diploma is accepted as a **standalone secondary qualification**.'
          ]
        },
        {
          type: 'caution',
          text: "**French Community: no equivalence.** The French Community's equivalence service lists school-leaving certificates issued by the International Baccalaureate among those that **need no equivalence** for access to higher education. Your school must be authorised by the IB. Other foreign certificates need an equivalence, applied for between 15 November and 15 July before the academic year."
        }
      ],
      sources: [
        {
          label: 'Flanders.be — Foreign diplomas automatically recognised in Flanders',
          href: 'https://www.vlaanderen.be/en/working-enterprise-and-investment/working/working-in-flanders-with-a-foreign-diploma/foreign-diplomas-that-are-automatically-recognised-in-flanders'
        },
        {
          label: 'Fédération Wallonie-Bruxelles — European and international schools (in French)',
          href: 'https://equivalences.cfwb.be/equivalences-secondaires/equivalence/demander-une-equivalence/jai-termine-mes-etudes-secondaires/ecoles-europeennes-et-internationales'
        },
        {
          label: 'Wallonie-Bruxelles Campus — Equivalence of qualification',
          href: 'https://www.studyinbelgium.be/en/bachelors-degree-studies-french-speaking-belgium-equivalence-qualification'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'University admission system in Belgium',
      blocks: [
        {
          type: 'caution',
          text: 'Belgium does **not** use a centralized national admissions platform.'
        },
        {
          type: 'paragraph',
          text: 'Admission is organized by:'
        },
        {
          type: 'list',
          items: [
            '**Individual universities** within each linguistic community',
            'The **Flemish Community** (automatic IB recognition, direct application to universities)',
            'The **French Community** (no equivalence needed for the IB Diploma, direct application to universities)'
          ]
        },
        {
          type: 'paragraph',
          text: 'There is **no national IB cut-off score**. Each university defines its own admission criteria based on the IB Diploma.'
        }
      ],
      sources: [
        {
          label: 'KU Leuven — Admission and application',
          href: 'https://www.kuleuven.be/english/apply'
        },
        {
          label: 'VUB — Studying at VUB',
          href: 'https://www.vub.be/en/studying-vub'
        }
      ]
    },
    {
      label: 'Grade evaluation',
      heading: 'IB grade evaluation in Belgium',
      blocks: [
        {
          type: 'paragraph',
          text: 'Belgian universities evaluate IB results **independently**.'
        },
        {
          type: 'paragraph',
          text: 'Common practices include:'
        },
        {
          type: 'list',
          items: [
            'Using **total IB score (24–45)** for baseline assessment',
            'Reviewing **HL subject grades** for program-specific prerequisites',
            'Applying **institution-specific criteria** (not standardized across Belgium)'
          ]
        },
        {
          type: 'caution',
          text: 'There is **no official Belgium-wide IB grade conversion table**.'
        }
      ],
      sources: [
        {
          label: 'KU Leuven — Admission and application',
          href: 'https://www.kuleuven.be/english/apply'
        },
        {
          label: 'Individual university IB policies (e.g., KU Leuven, ULB, Ghent, VUB)'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Entrance exams and restricted programs',
      blocks: [
        {
          type: 'answer',
          line: 'Required for some programs',
          paragraphs: [
            'Most undergraduate programs in Belgium do **not** require entrance exams. However, certain competitive fields have **mandatory entrance examinations**.'
          ]
        },
        {
          type: 'subheading',
          text: 'Medicine, Dentistry & Veterinary Medicine'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Flemish Community',
              text: 'Mandatory **toelatingsexamen** (entrance exam) for Medicine, Dentistry and Veterinary Medicine, conducted in Dutch. It tests knowledge of the sciences and generic competencies, and places go to the best-ranked candidates. The 2027 exams are on **2 July** (Medicine), **3 July** (Dentistry) and **4 July** (Veterinary Medicine); registration runs from 1 March to 17 May 2027.'
            },
            {
              title: 'French Community',
              text: "Mandatory **concours d'entrée** (competitive exam) for Medicine and Dentistry, organized by ARES. Covers chemistry, biology, physics and mathematics, plus reasoning and communication. The 2027 date had not been published when this page was updated; in 2026 the concours was held once, on 27 August, with registration from 18 May to 5 July. Veterinary Medicine also has an admission exam or competitive test."
            }
          ]
        },
        {
          type: 'subheading',
          text: 'Civil Engineering (French Community)'
        },
        {
          type: 'paragraph',
          text: "A **mathematics entrance examination** is required for Civil Engineering (Sciences de l'Ingénieur) programs in the French Community."
        }
      ],
      sources: [
        {
          label: 'Study in Flanders — Admission requirements',
          href: 'https://www.studyinflanders.be/practical-information/admission-requirements'
        },
        {
          label:
            'Flanders.be — Entrance exams for medicine, dentistry and veterinary medicine (in Dutch)',
          href: 'https://www.vlaanderen.be/toelatingsexamens'
        },
        {
          label: 'ARES — Key dates of the Medicine and Dentistry concours (in French)',
          href: 'https://mesetudes.be/concoursmd/tout-savoir-sur-le-concours-dentree-en-medecine-et-dentisterie/dates-cles'
        },
        {
          label: 'Wallonie-Bruxelles Campus — Equivalence of qualification (admission exams)',
          href: 'https://www.studyinbelgium.be/en/bachelors-degree-studies-french-speaking-belgium-equivalence-qualification'
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
              title: 'Dutch',
              text: 'Required for programs in the **Flemish Community** (KU Leuven, Ghent, VUB, etc.)'
            },
            {
              title: 'French',
              text: 'Required for programs in the **French Community** (ULB, UCLouvain, ULiège, etc.)'
            },
            {
              title: 'English',
              text: "Available for select **English-taught programs**, mostly at master's level"
            }
          ]
        },
        {
          type: 'paragraph',
          text: "IB English does **not automatically waive** language requirements. KU Leuven, for example, exempts only applicants whose previous diploma comes from an English-taught programme in Australia, English-speaking Canada, Ireland, New Zealand, the United Kingdom or the United States. The University of Antwerp exempts holders of an International Baccalaureate who passed English as Language 1 (grade 5 or higher) or at Level A (grade 3 or higher). Study in Flanders gives B2 as the usual level for English-taught programmes and for most Dutch-taught Bachelor's programmes."
        }
      ],
      sources: [
        {
          label: 'Study in Flanders',
          href: 'https://www.studyinflanders.be/'
        },
        {
          label: 'KU Leuven — English proficiency tests',
          href: 'https://www.kuleuven.be/english/apply/language-requirements/english-proficiency-tests'
        },
        {
          label: "University of Antwerp — Admission requirements for academic bachelor's",
          href: 'https://www.uantwerpen.be/en/study/admission-and-enrolment/admission/academic-bachelor/admission-requirements/'
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
                'Community-regulated admission',
                'IB Diploma widely accepted',
                'Low tuition fees for EU citizens'
              ],
              after: '**Examples:** KU Leuven, Ghent, ULB, UCLouvain, VUB'
            },
            {
              title: 'Private / specialized institutions',
              items: [
                'Independent admission criteria',
                'Tuition fees usually higher',
                'IB acceptance varies by institution'
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
          text: 'Typical application requirements:'
        },
        {
          type: 'documents',
          items: [
            'IB Diploma or predicted grades',
            'Academic transcripts',
            'Passport or ID',
            'Language proficiency certificate (if required)',
            'Motivation letter (some programs)'
          ]
        }
      ],
      sources: [
        {
          label: 'KU Leuven — Admission and application',
          href: 'https://www.kuleuven.be/english/apply'
        },
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
          text: 'Typical timeline across Belgian universities:'
        },
        {
          type: 'timeline',
          steps: [
            {
              date: '15 November 2026',
              text: 'VUB opens applications for 2027–2028. Each university sets its own dates.'
            },
            {
              date: '1 March – 17 May 2027',
              text: 'Registration for the Flemish entrance exams in Medicine, Dentistry and Veterinary Medicine'
            },
            {
              date: 'Spring–summer 2027',
              text: 'University application deadlines. For 2026–2027, VUB closed on 31 March for non-EEA citizens and on 31 July for EEA citizens; KU Leuven sets a deadline per programme.'
            },
            {
              date: '2–4 July 2027',
              text: 'Flemish entrance exams: Medicine on 2 July, Dentistry on 3 July, Veterinary Medicine on 4 July'
            },
            {
              date: 'Late summer 2027',
              text: 'French Community concours in Medicine and Dentistry. The 2027 date had not been published when this page was updated; in 2026 it was held once, on 27 August.'
            },
            {
              date: 'September 2027',
              text: 'The academic year begins. In 2026 it began on 14 September at VUB and 16 September at KU Leuven.'
            }
          ]
        },
        {
          type: 'caution',
          text: "Deadlines vary by university and community. Always check the specific university's admission calendar."
        }
      ],
      sources: [
        {
          label: 'VUB — When can you apply?',
          href: 'https://www.vub.be/en/studying-vub/apply-and-enrol-vub/admission-requirements-and-deadlines/when-can-you-apply'
        },
        {
          label: 'KU Leuven — Application windows',
          href: 'https://icts.kuleuven.be/apps/tuitionfees/application-windows'
        },
        {
          label:
            'Flanders.be — Entrance exams for medicine, dentistry and veterinary medicine (in Dutch)',
          href: 'https://www.vlaanderen.be/toelatingsexamens'
        },
        {
          label: 'ARES — Key dates of the Medicine and Dentistry concours (in French)',
          href: 'https://mesetudes.be/concoursmd/tout-savoir-sur-le-concours-dentree-en-medecine-et-dentisterie/dates-cles'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Is the IB Diploma recognized in Belgium?',
        answer:
          'Yes. Flanders automatically recognises the IB Diploma as equivalent to the Flemish certificate of secondary education. The French Community lists school-leaving certificates issued by the International Baccalaureate among those that need no equivalence for access to higher education, provided your school is authorised by the IB.',
        source: {
          label: 'Flanders.be — Foreign diplomas automatically recognised in Flanders',
          href: 'https://www.vlaanderen.be/en/working-enterprise-and-investment/working/working-in-flanders-with-a-foreign-diploma/foreign-diplomas-that-are-automatically-recognised-in-flanders'
        }
      },
      {
        question: 'Do IB students need a Belgian secondary diploma?',
        answer:
          'No. The IB Diploma is accepted as a standalone qualification. Recognition is automatic in the Flemish Community, and the French Community does not require an equivalence to the CESS for IB school-leaving certificates.',
        source: {
          label: 'Wallonie-Bruxelles Campus — Equivalence of qualification',
          href: 'https://www.studyinbelgium.be/en/bachelors-degree-studies-french-speaking-belgium-equivalence-qualification'
        }
      },
      {
        question: 'Are entrance exams required in Belgium for IB students?',
        answer:
          'For most programs, no. Medicine and Dentistry require an entrance exam or competitive test in both communities, and so does Veterinary Medicine. In the Flemish Community the 2027 exams are on 2 July (Medicine), 3 July (Dentistry) and 4 July (Veterinary Medicine), with registration from 1 March to 17 May 2027. Civil Engineering requires a mathematics admission exam in the French Community.',
        source: {
          label: 'Flanders.be — Entrance exams for medicine, dentistry and veterinary medicine',
          href: 'https://www.vlaanderen.be/toelatingsexamens'
        }
      },
      {
        question: 'What languages can IB students study in at Belgian universities?',
        answer:
          'Programs are offered in Dutch (Flemish Community), French (French Community), and some in English. Language proficiency is required in the language of instruction.',
        source: {
          label: 'Study in Flanders',
          href: 'https://www.studyinflanders.be/'
        }
      },
      {
        question: 'Is there a national IB cut-off score for Belgium?',
        answer:
          'No. There is no national minimum IB score. Each university sets its own admission criteria, though most require the full IB Diploma (minimum 24 points).',
        source: {
          label: 'KU Leuven — Admission and application',
          href: 'https://www.kuleuven.be/english/apply'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Belgian admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Belgian university programs that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
