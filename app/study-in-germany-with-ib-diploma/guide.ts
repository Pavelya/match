import type { CountryGuide } from '@/lib/guides/types'

/** Study in Germany with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-germany-with-ib-diploma',
  countryCode: 'DE',
  exploreCountryId: 'cmip2am54000j7m188af1eso7',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Germany with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for university admission in Germany, using only official public sources. It is written exclusively for IB Diploma students and IB Coordinators.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Germany recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'Germany officially recognizes the **International Baccalaureate (IB) Diploma** as a foreign secondary school qualification that can grant **direct university access (*Hochschulzugang*)**.'
        },
        {
          type: 'paragraph',
          text: 'The legal recognition framework is defined by the **Standing Conference of the Ministers of Education and Cultural Affairs (KMK)** and published in the national Anabin database.'
        }
      ],
      sources: [
        {
          label: 'KMK — Access to higher education (includes the IB agreement)',
          href: 'https://www.kmk.org/zab/central-office-for-foreign-education/general-information-about-recognition/publications-and-decisions/access-to-higher-education/'
        },
        {
          label: 'anabin — KMK recognition database',
          href: 'https://anabin.kmk.org'
        }
      ]
    },
    {
      label: 'Studienkolleg',
      heading: 'Do IB students need Studienkolleg?',
      blocks: [
        {
          type: 'answer',
          word: 'Usually no',
          paragraphs: [
            "IB students **do not need to attend Studienkolleg** if their IB Diploma subject combination meets Germany's official university entrance requirements.",
            'If the required IB subjects are **missing**, Studienkolleg may be required before university admission.'
          ]
        }
      ],
      sources: [
        {
          label: 'anabin — KMK recognition database',
          href: 'https://anabin.kmk.org'
        },
        {
          label: 'KMK — Access to higher education (includes the IB agreement)',
          href: 'https://www.kmk.org/zab/central-office-for-foreign-education/general-information-about-recognition/publications-and-decisions/access-to-higher-education/'
        }
      ]
    },
    {
      label: 'Subject requirements',
      heading: 'IB subject requirements for Germany',
      blocks: [
        {
          type: 'paragraph',
          text: 'Germany applies **nationwide subject requirements** for IB-based university access. The IB Diploma must include:'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Two languages',
              text: 'At level A or B, and at least one of them an advanced foreign language: Language A, or Language B at HL'
            },
            {
              title: 'Mathematics',
              text: 'Analysis and Approaches or Applications and Interpretation. Since the 2021 exams, either course at SL gives access only to subjects outside mathematics, science and engineering, unless your school is on the KMK list of exceptions'
            },
            {
              title: 'One natural science',
              text: 'Biology, Chemistry, or Physics'
            },
            {
              title: 'One social science',
              text: 'History, Geography, Economics, Psychology, Philosophy, Social and Cultural Anthropology, Business Management, or Global Politics'
            }
          ]
        },
        {
          type: 'paragraph',
          text: 'The KMK also requires that at least one of your three **Higher Level (HL) subjects** is a language, mathematics or a natural science (from the 2025 exams); that all six subjects were studied for the full two years; and that you have at least **grade 4 in all six**. One grade 3 can be offset by a 5 in another subject at the same or a higher level, with at least 24 points in total. These rules come from the KMK agreement on the IB Diploma (1986, as amended on 15 June 2023) and apply nationwide.'
        }
      ],
      sources: [
        {
          label: 'KMK — Agreement on the recognition of the IB Diploma (English translation, PDF)',
          href: 'https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/aktuell/283_Vereinb_Anerkenn_Int_Baccalaureate_Diploma-2023-06-15_Liste1-2026-03-26_Liste2-2026-05-22_ENGL.pdf'
        },
        {
          label: 'anabin — KMK recognition database',
          href: 'https://anabin.kmk.org'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'University admission system in Germany',
      blocks: [
        {
          type: 'caution',
          text: 'Germany converts your IB total into a German grade with a **single national formula**, set by the KMK.'
        },
        {
          type: 'paragraph',
          text: 'Admission is based on:'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Formal recognition',
              text: 'Recognition of the IB Diploma'
            },
            {
              title: 'Subject requirements',
              text: 'Fulfillment of subject requirements'
            },
            {
              title: 'Grade conversion',
              text: 'Conversion into the German scale'
            },
            {
              title: 'Numerus Clausus',
              text: 'Program-specific selection criteria'
            }
          ]
        },
        {
          type: 'paragraph',
          text: 'The KMK formula is **N = 1 + 3 × (42 − P) / (42 − 24)**, where P is your IB total including bonus points. 24 points give a German grade of 4.0, and 42 to 45 points give 1.0. The grade is set to one decimal and not rounded, so 37 points give 1.8 and 36 give 2.0. This is the grade that counts where a program selects by grade (Numerus Clausus).'
        }
      ],
      sources: [
        {
          label: 'KMK — Access to higher education (includes the IB agreement)',
          href: 'https://www.kmk.org/zab/central-office-for-foreign-education/general-information-about-recognition/publications-and-decisions/access-to-higher-education/'
        },
        {
          label: 'hochschulstart',
          href: 'https://www.hochschulstart.de'
        },
        {
          label: 'KMK — Agreement on the recognition of the IB Diploma (English translation, PDF)',
          href: 'https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/aktuell/283_Vereinb_Anerkenn_Int_Baccalaureate_Diploma-2023-06-15_Liste1-2026-03-26_Liste2-2026-05-22_ENGL.pdf'
        },
        {
          label: 'KMK — Overall grade for foreign certificates (PDF, in German)',
          href: 'https://www.kmk.org/fileadmin/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/GesNot05.pdf'
        }
      ]
    },
    {
      label: 'uni-assist',
      heading: 'uni-assist and IB applications in Germany',
      blocks: [
        {
          type: 'paragraph',
          text: 'uni-assist is an **application processing service**, not a recognition authority.'
        },
        {
          type: 'paragraph',
          text: 'Some German universities require IB students to apply through **uni-assist**, which:'
        },
        {
          type: 'list',
          items: [
            'Collects application documents',
            'Verifies formal completeness',
            'Converts IB grades into the German grading scale',
            'Issues a **VPD (Vorprüfungsdokumentation)**'
          ]
        },
        {
          type: 'paragraph',
          text: 'uni-assist applies **Anabin / KMK rules**, but does not define them. Universities make the final admission decision.'
        }
      ],
      sources: [
        {
          label: 'uni-assist',
          href: 'https://www.uni-assist.de'
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
          line: 'Language proficiency is usually required'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'German-taught programs',
              text: '**C1 German** required (TestDaF or DSH)',
              after:
                'Your IB counts only where a university says so: TUM accepts German A at Higher Level.'
            },
            {
              title: 'English-taught programs',
              text: 'English certification may still be required'
            }
          ]
        },
        {
          type: 'paragraph',
          text: "Language requirements are set by individual universities. English-taught bachelor's programs are few: in winter 2025/26, 439 of Germany's 11,767 first-degree programs (3.7%) were taught mainly in English."
        }
      ],
      sources: [
        {
          label: 'hochschulstart',
          href: 'https://www.hochschulstart.de'
        },
        {
          label: 'KMK — Proof of German for foreign certificates (PDF, in German)',
          href: 'https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/Zugang-auslaendischer-Bildungsnachweis-Deutschkenntnisse_16_12_2020.pdf'
        },
        {
          label: 'HRK — Statistics on study programs, winter 2025/26 (PDF, in German)',
          href: 'https://www.hrk.de/fileadmin/redaktion/hrk/02-Dokumente/02-03-Studium/02-03-01-Studium-Studienreform/HRK_Statistik_BA_MA_UEbrige_WiSe_2025_26.pdf'
        },
        {
          label: 'TUM — Applicants with an International Baccalaureate Diploma',
          href: 'https://www.tum.de/en/studies/application/application-info-portal/applicants-with-international-baccalaureate'
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
                'Strict application of Anabin rules',
                'NC applies to many programs',
                'Language certification required'
              ]
            },
            {
              title: 'Private universities',
              items: [
                'Independent admission procedures',
                'The KMK subject conditions usually still apply',
                'Tuition fees usually apply'
              ],
              after:
                '**Example:** [Frankfurt School — IB Diploma requirements (PDF)](https://www.frankfurt-school.de/cms/fallback/de/dam/jcr:11afb288-73ae-4c59-a1ea-bbd78884bfcf/2025_Requirements%20IB%20Diploma.pdf)'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'KMK — Access to higher education (includes the IB agreement)',
          href: 'https://www.kmk.org/zab/central-office-for-foreign-education/general-information-about-recognition/publications-and-decisions/access-to-higher-education/'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Anabin, uni-assist, and required documents',
      blocks: [
        {
          type: 'paragraph',
          text: 'Typical required documents for IB students:'
        },
        {
          type: 'documents',
          items: [
            'IB Diploma or predicted grades',
            'Academic transcripts',
            'Passport or ID',
            'Subject confirmation (per Anabin)',
            'uni-assist VPD (if required by the university)'
          ]
        }
      ],
      sources: [
        {
          label: 'anabin — KMK recognition database',
          href: 'https://anabin.kmk.org'
        },
        {
          label: 'uni-assist',
          href: 'https://www.uni-assist.de'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'Application timeline for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Typical timeline for Germany:'
        },
        {
          type: 'timeline',
          steps: [
            {
              date: 'Autumn 2026 – January 2027',
              text: 'Research programs and check that your IB subjects meet the KMK conditions. Check deadlines early: universities may admit international applicants who are not treated as German applicants (in general, non-EU citizens) once a year, with 15 January as the only application date.'
            },
            {
              date: 'Spring 2027',
              text: 'Winter-semester applications open. hochschulstart had not published its 2027/28 dates when this page was updated; in 2026 its application phase opened on 27 April.'
            },
            {
              date: 'Mid-July 2027',
              text: 'Many universities close winter-semester applications on 15 July. At hochschulstart the 2026 deadline was 15 July for school-leaving certificates issued after 15 January 2026, and 31 May for older ones.'
            },
            {
              date: 'Late July – September 2027',
              text: 'Offers and enrollment. In 2026 hochschulstart sent offers from 16 July to 20 August, then filled remaining places until 30 September.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'hochschulstart — Dates and deadlines (in German)',
          href: 'https://www.hochschulstart.de/bewerben-beobachten/termine'
        },
        {
          label: 'hochschulstart — International applicants (in German)',
          href: 'https://www.hochschulstart.de/informieren-planen/internationale-bewerbende'
        },
        {
          label: 'uni-assist — Deadlines and processing time',
          href: 'https://www.uni-assist.de/en/how-to-apply/plan-your-application/deadlines-processing-time/'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Is uni-assist mandatory for IB students in Germany?',
        answer: 'No. Only universities that use uni-assist require it.',
        source: {
          label: 'uni-assist',
          href: 'https://www.uni-assist.de'
        }
      },
      {
        question: 'Do IB students need Studienkolleg?',
        answer:
          "No, if your IB Diploma meets the KMK's subject and grade conditions. If it does not, you must pass an additional examination (the Feststellungsprüfung, for which a Studienkolleg prepares you).",
        source: {
          label: 'KMK — Access to higher education',
          href: 'https://www.kmk.org/zab/central-office-for-foreign-education/general-information-about-recognition/publications-and-decisions/access-to-higher-education/'
        }
      },
      {
        question: 'Can IB students study Medicine in Germany?',
        answer:
          'Yes, but places are highly competitive. EU and EEA citizens apply for Medicine, Dentistry, Veterinary Medicine and Pharmacy through hochschulstart, like German applicants. Other international applicants apply to the university directly or through uni-assist.',
        source: {
          label: 'hochschulstart — International applicants (in German)',
          href: 'https://www.hochschulstart.de/informieren-planen/internationale-bewerbende'
        }
      },
      {
        question: 'Is German mandatory for all programs?',
        answer:
          'No. English-taught programs exist, but language proof is required. International applicants must show German proficiency at enrolment for German-taught programs. Nationally, the IB counts as that proof only in its bilingual German version (GIB); otherwise each university decides, and TUM, for example, accepts only German A at Higher Level.',
        source: {
          label: 'KMK — Proof of German for foreign certificates (PDF, in German)',
          href: 'https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/Zugang-auslaendischer-Bildungsnachweis-Deutschkenntnisse_16_12_2020.pdf'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates German admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover German university programs that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
