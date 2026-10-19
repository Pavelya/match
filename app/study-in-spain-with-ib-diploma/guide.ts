import type { CountryGuide } from '@/lib/guides/types'

/** Study in Spain with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-spain-with-ib-diploma',
  countryCode: 'ES',
  exploreCountryId: 'cmip2am54000o7m185new43of',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Spain with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for university admission in Spain, using only official public sources. It is written exclusively for IB Diploma students and IB Coordinators.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Spain recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'Spanish law lets holders of the **International Baccalaureate (IB) Diploma** enter university without taking the Spanish university access exam and without having their diploma homologated to the Spanish *Bachillerato*.'
        },
        {
          type: 'paragraph',
          text: 'The exemption is set by the Education Act (Ley Orgánica 2/2006, additional provision 33). **Orden EFD/550/2025**, published in the **Spanish Official State Gazette**, sets how IB grades convert to the Spanish scale for admissions from 2025–26 onwards.'
        },
        {
          type: 'paragraph',
          text: '**UNEDasiss**, a service of the Spanish public distance-learning university UNED, calculates your access grade and issues the accreditation that universities use in their admissions.'
        }
      ],
      sources: [
        {
          label: 'BOE — Orden EFD/550/2025 (in Spanish)',
          href: 'https://www.boe.es/buscar/act.php?id=BOE-A-2025-10777'
        },
        {
          label: 'UNEDasiss — Types of international students (in Spanish)',
          href: 'https://unedasiss.uned.es/publico_destino'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Do IB students need to take Selectividad?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          paragraphs: [
            'IB Diploma holders are **exempt from the university access exam** (the PAU, formerly EvAU or EBAU, known as *Selectividad*). The exemption comes from the law and applies nationwide.',
            'To raise your admission grade above 10, you can still take optional subject exams. See the extra points section below.'
          ]
        }
      ],
      sources: [
        {
          label: 'BOE — Real Decreto 534/2024 on university access (in Spanish)',
          href: 'https://www.boe.es/buscar/act.php?id=BOE-A-2024-11858'
        },
        {
          label: 'Comunidad de Madrid — University access with foreign studies (in Spanish)',
          href: 'https://www.comunidad.madrid/educacion/acceso-universidad-estudios-extranjeros'
        }
      ]
    },
    {
      label: 'Grade conversion',
      heading: 'How IB scores are converted in Spain (5–14 scale)',
      blocks: [
        {
          type: 'paragraph',
          text: 'Spain uses a **two-step score**. UNEDasiss converts your IB grades into an access grade out of 10, and universities can add up to 4 points for weighted subjects.'
        },
        {
          type: 'subheading',
          text: 'Access grade (5–10)'
        },
        {
          type: 'paragraph',
          text: 'UNEDasiss averages the grades of the subjects on your IB results and converts the average with the formula in Orden EFD/550/2025: **access grade = 5 + 5 × (average − 2) ÷ 5**. For the IB, that is your average plus 3. Your total out of 45 is not used.'
        },
        {
          type: 'table',
          table: {
            caption: 'Average IB subject grade to access grade',
            columns: ['Average IB subject grade', 'Access grade'],
            rows: [
              ['7.0', '10.0'],
              ['6.5', '9.5'],
              ['6.0', '9.0'],
              ['5.0', '8.0'],
              ['4.0', '7.0']
            ]
          }
        },
        {
          type: 'subheading',
          text: 'Subject weighting bonus (+0 to +4)'
        },
        {
          type: 'paragraph',
          text: 'Universities add the grades of up to two subjects, each multiplied by **0.1 or 0.2** (*ponderaciones*) depending on how relevant the subject is to the degree.'
        },
        {
          type: 'paragraph',
          text: 'Access Grade (5–10) + Weighted Subjects (up to +4) = Maximum 14'
        }
      ],
      sources: [
        {
          label: 'BOE — Orden EFD/550/2025 (in Spanish)',
          href: 'https://www.boe.es/buscar/act.php?id=BOE-A-2025-10777'
        },
        {
          label: 'Universities of Catalonia — Weightings (in Catalan)',
          href: 'https://universitats.gencat.cat/ca/preinscripcions/ponderacions/'
        }
      ]
    },
    {
      label: 'Subject weightings',
      heading: 'How subjects increase your admission score',
      blocks: [
        {
          type: 'paragraph',
          text: 'The weighted subjects are **Spanish Bachillerato subjects**. Each public university publishes a table of which subjects count for each degree and whether they weigh 0.1 or 0.2. Catalonia has already published its tables for 2027.'
        },
        {
          type: 'subheading',
          text: "Subjects Madrid's public universities can weight (2026–27), grouped by area:"
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Sciences and engineering',
              text: 'Matemáticas II, Física, Química, Biología, Tecnología e Ingeniería II'
            },
            {
              title: 'Social sciences',
              text: 'Matemáticas Aplicadas a las Ciencias Sociales II, Empresa y Diseño de Modelos de Negocio, Geografía'
            },
            {
              title: 'Humanities',
              text: 'Historia del Arte, Latín II, Griego II'
            },
            {
              title: 'Arts and design',
              text: 'Dibujo Artístico II, Dibujo Técnico II, Diseño'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Universities of Catalonia — Weightings (in Catalan)',
          href: 'https://universitats.gencat.cat/ca/preinscripcions/ponderacions/'
        },
        {
          label: 'Madrid public universities — Admission agreement 2026–27 (PDF, in Spanish)',
          href: 'https://www.comunidad.madrid/docs/2026-06/acuerdo-universidades-2026-2027.pdf'
        }
      ]
    },
    {
      label: 'Extra points',
      heading: 'How to get the extra points: recognition vs PCE exams',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'Option 1: recognition of IB subjects',
              text: 'UNEDasiss can recognise IB subjects as equivalent to Spanish ones, so you do not sit PCE exams in them. Not every university accepts recognised subjects, and only subjects finished in the current or the two previous school years count.'
            },
            {
              title: 'Option 2: PCE exams',
              text: "Students may take UNED's **PCE exams** (specific competence tests) in the subjects a university weights. There is a May–June session and a September session.",
              items: [
                '[UNEDasiss — Exams (in Spanish)](https://unedasiss.uned.es/examenes)',
                '[UNEDasiss — Key dates (in Spanish)](https://unedasiss.uned.es/fechas_clave)'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'UNEDasiss — FAQ (in Spanish)',
          href: 'https://unedasiss.uned.es/faqs'
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
                'Score-based admission',
                'Cut-off grades (*Nota de Corte*)',
                'UNEDasiss accreditation required'
              ]
            },
            {
              title: 'Private universities',
              items: [
                'Their own admission procedures',
                'Ask each one whether it needs the UNEDasiss accreditation'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Comunidad de Madrid — University access with foreign studies (in Spanish)',
          href: 'https://www.comunidad.madrid/educacion/acceso-universidad-estudios-extranjeros'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'UNEDasiss documents required for IB students',
      blocks: [
        {
          type: 'documents',
          items: [
            'Certified copy of your school transcripts for the last two years before university',
            'Certified copy of the document that gives you access to university: your IB Diploma and results',
            'Passport or national ID',
            'Payment of the UNEDasiss fee (applications are processed only once paid)'
          ]
        }
      ],
      sources: [
        {
          label: 'UNEDasiss — Prepare your documents (in Spanish)',
          href: 'https://unedasiss.uned.es/paso_3'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'UNEDasiss application timeline',
      blocks: [
        {
          type: 'paragraph',
          text: 'UNEDasiss has not yet published its 2027 dates. The steps below follow its 2026 calendar:'
        },
        {
          type: 'timeline',
          steps: [
            {
              date: 'From 4 February',
              text: 'The UNEDasiss online application opens, and stays open until 1 December. Apply at least six weeks before your university deadline.'
            },
            {
              date: 'Mid-March to late April',
              text: 'Register for the May PCE exams. In 2026 registration ran from 16 March to 28 April.'
            },
            {
              date: 'Late May',
              text: 'PCE exams: 25–29 May 2026 in Spain. A September session followed on 2–8 September 2026.'
            },
            {
              date: 'Early July',
              text: 'Apply to public universities. The 2026 deadline for international students was 7 July. Apply even if your accreditation is not ready: missing documents were accepted until 31 July.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'UNEDasiss — Key dates (in Spanish)',
          href: 'https://unedasiss.uned.es/fechas_clave'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Do predicted IB grades work for Spain?',
        answer:
          'Not for the access grade, which UNEDasiss calculates from your final IB subject grades. If you have not finished the IB by the admission deadline, send your latest school transcripts with your application and the missing documents when you have them.',
        source: {
          label: 'UNEDasiss — Key dates (in Spanish)',
          href: 'https://unedasiss.uned.es/fechas_clave'
        }
      },
      {
        question: 'Can IB students study Medicine in Spain?',
        answer:
          "Yes, but places are highly competitive. For 2026–27, the cut-off for Medicine at Madrid's public universities was between 12.8 and 13.1 out of 14.",
        source: {
          label: 'Comunidad de Madrid — Cut-off grades 2026–27 (PDF, in Spanish)',
          href: 'https://www.comunidad.madrid/docs/2026-07/notas-de-corte-dum-2026-27.pdf'
        }
      },
      {
        question: 'Is Spanish language required?',
        answer:
          'It depends on the university. Each university sets its own language requirements, and UNEDasiss can add a language certificate to your accreditation when a university asks for one.',
        source: {
          label: 'UNEDasiss — Types of international students (in Spanish)',
          href: 'https://unedasiss.uned.es/publico_destino'
        }
      },
      {
        question: 'Is UNEDasiss required for private universities?',
        answer:
          'Usually. UNEDasiss says IB students need its accreditation to enter a Spanish university. Private universities run their own admissions, so confirm what each one asks for.',
        source: {
          label: 'UNEDasiss — Types of international students (in Spanish)',
          href: 'https://unedasiss.uned.es/publico_destino'
        }
      }
    ],
    after:
      'Learn [how IB Match calculates your admission score](/how-it-works) for Spanish universities.'
  },
  closing:
    'Discover Spanish university programs that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
