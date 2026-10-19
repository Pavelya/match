import type { CountryGuide } from '@/lib/guides/types'

/** Study in Portugal with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-portugal-with-ib-diploma',
  countryCode: 'PT',
  exploreCountryId: 'cmkmqs3460000jv04civv7ipu',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Portugal with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for admission to Portuguese universities and polytechnics, using only official Portuguese government and institutional sources. Portugal operates a binary higher education system with universities and polytechnics, and international students apply through the Concurso Especial para Estudantes Internacionais.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Portugal recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'The **International Baccalaureate (IB) Diploma** is recognized in Portugal through a **formal equivalency process** managed by the **Direção-Geral da Educação (DGE)** — the Directorate-General for Education. This process grants equivalency between foreign secondary education qualifications and Portuguese secondary education (*ensino secundário*).'
        },
        {
          type: 'paragraph',
          text: 'The equivalency is regulated by **Decreto-Lei n.º 227/2005, of 28 December**. The DGE is specifically responsible for processing IB Diploma equivalencies, as confirmed in their official FAQ. The process is **free of charge** and can be initiated **at any time** — there is no specific deadline.'
        },
        {
          type: 'paragraph',
          text: "Portugal is reorganising its education agencies in 2026, and the DGE says its work is passing to a new institute, **EduQA, I.P.** Check the DGE's page for the current contact before you apply."
        },
        {
          type: 'paragraph',
          text: 'You need the equivalence for the **national competition**. The **special competition for international students** accepts any qualification that gives access to higher education in the country where it was issued, without a Portuguese equivalence.'
        }
      ],
      sources: [
        {
          label: 'DGE — Equivalências Estrangeiras',
          href: 'https://www.dge.mec.pt/equivalencias-estrangeiras'
        },
        {
          label: 'DGE — FAQ: Equivalence of Foreign Qualifications (English)',
          href: 'https://www.dge.mec.pt/faq-equivalence-foreign-qualifications'
        },
        {
          label: 'DGE — Transition to EduQA, I.P. (in Portuguese)',
          href: 'https://www.dge.mec.pt/noticias/transicao-para-o-eduqa-ip'
        },
        {
          label: 'DGES/IES — Special competition for international students (in Portuguese)',
          href: 'https://www.dges.gov.pt/pt/pagina/concurso-especial-para-estudantes-internacionais?plid=593'
        }
      ]
    },
    {
      label: 'Equivalence',
      heading: 'Do IB students need a Portuguese diploma?',
      blocks: [
        {
          type: 'answer',
          line: 'Equivalency needed for the national competition — and it is free',
          paragraphs: [
            'To apply through the national competition, you need a **formal equivalency** of your IB Diploma to Portuguese secondary education. The process is **free of charge**, has **no deadline**, and has a reference processing time of **30 days** after all documents are submitted. You do not need a Portuguese diploma — the IB Diploma is the basis for obtaining equivalency.'
          ]
        },
        {
          type: 'list',
          items: [
            '**Where to apply:** At any public school in Portugal, or directly to the DGE by post if you live outside Portugal (Avenida 24 de Julho, 140, 1399-025 Lisbon)',
            '**Documents needed:** IB Diploma and transcript, legalised with the Hague Apostille or by a consulate, with an official translation into Portuguese',
            '**Grade conversion:** Final grades are converted using tables established by Portarias 224/2006 and 699/2006. For the national competition, the certificate states your final grade on the 0–200 scale'
          ]
        }
      ],
      sources: [
        {
          label: 'DGE — FAQ: Equivalence of Foreign Qualifications (English)',
          href: 'https://www.dge.mec.pt/faq-equivalence-foreign-qualifications'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'How admission works for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Portugal uses a **mixed admission system**. There is a **national general competition** (concurso nacional de acesso) for Portuguese and EU applicants, plus a **special competition for international students** (Concurso Especial) where each university manages its own admission process under the framework of Decreto-Lei 36/2014. The national competition is run by the **Instituto para o Ensino Superior (IES, I.P.)**, which replaced the Directorate-General for Higher Education (DGES) in October 2025; its pages are still at dges.gov.pt.'
        },
        {
          type: 'list',
          items: [
            '**Concurso Especial (International Students)** — Students without Portuguese or EU/EEA nationality apply directly to each university or polytechnic. Requirements, deadlines, places and selection criteria are set by each institution.',
            '**Concurso Nacional (General Competition)** — EU/EEA students with an equivalence certificate apply through the national system. It requires entrance exams (Provas de Ingresso), which suitable IB exams can replace.',
            '**Multiple applications allowed** — You can apply to multiple universities. In the national competition, you can rank up to six institution/programme pairs in order of preference.'
          ]
        }
      ],
      sources: [
        {
          label: 'DGES/IES — Acesso ao Ensino Superior (in Portuguese)',
          href: 'https://www.dges.gov.pt/pt/pagina/acesso-ao-ensino-superior'
        },
        {
          label: 'DGES/IES — The DGES concludes its institutional cycle (in Portuguese)',
          href: 'https://www.dges.gov.pt/en/noticia/direcao-geral-do-ensino-superior-conclui-ciclo-institucional'
        }
      ]
    },
    {
      label: 'Grade conversion',
      heading: 'How IB grades are assessed',
      blocks: [
        {
          type: 'paragraph',
          text: 'Portugal uses a **0–20 grading scale** for secondary and higher education. When the DGE grants equivalency for IB qualifications, final grades are converted using tables established in **Portarias 224/2006** and **699/2006**. The passing grade is 10 out of 20.'
        },
        {
          type: 'list',
          items: [
            '**DGE equivalency** — Grades from the IB Diploma are converted to the Portuguese 0–20 scale as part of the formal equivalency process',
            '**National competition** — Candidates are ranked by an application grade for each institution/programme pair, and must reach the minimum set for each entrance exam and for the application grade',
            '**Concurso Especial** — Universities under the international student competition may use their own criteria to evaluate IB scores, which may differ from the DGE conversion tables'
          ]
        },
        {
          type: 'table',
          table: {
            caption: 'Portuguese grading scale reference',
            columns: ['Portuguese grade (0–20)', 'Classification'],
            rows: [
              ['18–20', 'Excellent (Excelente)'],
              ['16–17', 'Very Good (Muito Bom)'],
              ['14–15', 'Good (Bom)'],
              ['10–13', 'Satisfactory (Suficiente)'],
              ['0–9', 'Fail (below the pass mark of 10)']
            ]
          },
          note: 'Conversion of IB grades to the Portuguese scale is determined by the DGE using the tables in Portarias 224/2006 and 699/2006. Contact the DGE or the specific university for exact conversion details.'
        }
      ],
      sources: [
        {
          label: 'DGE — Equivalências Estrangeiras (includes links to Portarias)',
          href: 'https://www.dge.mec.pt/equivalencias-estrangeiras'
        },
        {
          label: 'ENIC-NARIC Portugal — Portuguese grading scale (in Portuguese)',
          href: 'https://www.dges.gov.pt/pt/pagina/escala-de-classificacao-portuguesa-0?plid=374'
        },
        {
          label: 'DGES/IES — National competition (in Portuguese)',
          href: 'https://www.dges.gov.pt/pt/pagina/informacao-geral-publico?plid=593'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Are entrance exams required?',
      blocks: [
        {
          type: 'paragraph',
          text: "Whether entrance exams are required depends on your **admission route and programme**. Portugal's public universities use **Provas de Ingresso** (national entrance exams) as a key component of the national general competition. Each programme lists the exams it requires."
        },
        {
          type: 'list',
          items: [
            '**Concurso Especial (International Students)** — Each institution sets its own selection criteria, which may include its own tests. Requirements vary by institution and programme.',
            '**National General Competition** — IB students can replace the Provas de Ingresso with IB exams that the National Access Commission (CNAES) lists as equivalent (*exames homólogos*). For 2026–27 its list includes, for example, IB Biology SL or HL for Biology and Geology. The list is updated every year by 31 May, and exams taken since 2022 count for five years.',
            '**Medicine and competitive programmes** — Check the entrance exams and minimum grades each programme sets. In the national competition you must reach the minimum for each exam as well as for the application grade.',
            '**Private universities** — Run their own institutional competitions, which also list entrance exams that foreign exams can replace.'
          ]
        }
      ],
      sources: [
        {
          label: 'DGES/IES — Students with foreign secondary education (in Portuguese)',
          href: 'https://www.dges.gov.pt/pt/pagina/substituicao-de-provas-de-ingresso-por-exames-estrangeiros?plid=593'
        },
        {
          label: 'CNAES — Deliberation 619/2026 on foreign exams (PDF, in Portuguese)',
          href: 'https://files.diariodarepublica.pt/2s/2026/05/103000000/0015000170.pdf'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Programmes are taught in **Portuguese** or in **English**. Each institution sets its own language requirements as part of its autonomy over the conditions of entry, so check the level and the certificates your programme accepts.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Portuguese',
              items: [
                'Required for Portuguese-taught programmes',
                'The level and accepted certificates are set by each institution',
                'Preparatory Portuguese courses are available at many universities for international students'
              ]
            },
            {
              title: 'English',
              items: [
                'Required for English-taught programmes',
                'The accepted tests and scores are set by each institution',
                'IB English A or English B courses may satisfy English requirements — verify with the institution'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'DGES/IES — Portuguese Higher Education System',
          href: 'https://www.dges.gov.pt/en/pagina/portuguese-higher-education-system'
        }
      ]
    },
    {
      label: 'University types',
      heading: 'Types of higher education in Portugal',
      blocks: [
        {
          type: 'paragraph',
          text: 'Portugal operates a **binary higher education system** consisting of **universities** and **polytechnics**, both public and private. The IB Diploma is accepted at all accredited institutions. The system follows the **Bologna Process** with standardized degree cycles.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Universities',
              items: [
                'Focus on **research** and creation of knowledge. Offer **Licenciatura** (3–4 years), **Mestrado** (1.5–2 years), and **Doutoramento** (PhD)',
                "Some offer **integrated Master's** (5–6 years for Medicine, Architecture, etc.)",
                'Examples: University of Lisbon, University of Porto, University of Coimbra, NOVA University of Lisbon'
              ]
            },
            {
              title: 'Polytechnics',
              items: [
                'Focus on **applied research** and practical professional training. Offer **Licenciatura** and **Mestrado** degrees',
                'Also offer **CTeSP** (professional higher technical courses) — short-cycle programmes linked to the 1st cycle',
                'Tuition at public institutions is generally lower than at private institutions. International students may pay differentiated fees.'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'DGES/IES — Portuguese Higher Education System',
          href: 'https://www.dges.gov.pt/en/pagina/portuguese-higher-education-system'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: "Documents are typically submitted through the university's application portal. Requirements may vary by institution and admission route:"
        },
        {
          type: 'documents',
          items: [
            'IB Diploma and transcript of results',
            'Proof of identity (passport or national ID)',
            'For the national competition: a certificate of equivalence to Portuguese secondary education, giving your final grade on the 0–200 scale',
            'For the equivalence: documents legalised with the Hague Apostille or by a consulate, with an official translation into Portuguese',
            'Proof of language proficiency, if the institution asks for it'
          ]
        },
        {
          type: 'caution',
          text: 'Non-EU/EEA students must also arrange a **student visa**; start as soon as you are admitted. Documents may need to be authenticated with the **Hague Apostille** and translated into Portuguese. Contact the Portuguese embassy or consulate in your country for visa details.'
        }
      ],
      sources: [
        {
          label: 'DGE — FAQ: Equivalence of Foreign Qualifications (English)',
          href: 'https://www.dge.mec.pt/faq-equivalence-foreign-qualifications'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'Application timeline for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: "The 2027 national competition calendar is not yet published. The dates below are 2026's."
        },
        {
          type: 'timeline',
          steps: [
            {
              date: 'Any time',
              title: 'Equivalence (national competition only)',
              text: 'If you will apply through the national competition, request equivalence of your IB Diploma. There is no deadline, it is free, and the reference processing time is 30 days after all documents are in. The special competition for international students does not need it.'
            },
            {
              date: 'Set by each institution',
              title: 'Special competition for international students',
              text: 'Each university or polytechnic sets its own application period every year and announces it on its website at least three months in advance. Apply through the institution directly.'
            },
            {
              date: 'Late July – early August',
              title: 'National competition, 1st phase',
              text: 'In 2026, applications ran from 20 July to 6 August. Applicants replacing entrance exams with foreign exams, such as IB exams, had to apply by 29 July. Results were published on 23 August.'
            },
            {
              date: 'Late August – September',
              title: '2nd phase and enrolment',
              text: 'In 2026, the second phase ran from 24 August to 20 September, with results on 30 September. Non-EU/EEA students also need a student visa, so start that as soon as you are admitted.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'DGES/IES — National competition calendar 2026 (in Portuguese)',
          href: 'https://www.dges.gov.pt/pt/pagina/calendario-concurso-nacional-de-acesso-0?plid=593'
        },
        {
          label: 'DGES/IES — Special competition for international students (in Portuguese)',
          href: 'https://www.dges.gov.pt/pt/pagina/concurso-especial-para-estudantes-internacionais?plid=593'
        },
        {
          label: 'DGE — FAQ: Equivalence of Foreign Qualifications (English)',
          href: 'https://www.dge.mec.pt/faq-equivalence-foreign-qualifications'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'Is the IB Diploma recognized for university admission in Portugal?',
        answer:
          'Yes. Under Decree-Law 227/2005, the IB Diploma can be made equivalent to Portuguese secondary education, which you need for the national competition. The equivalence is free, can be requested at any time, and the Directorate-General for Education (DGE) is responsible for IB qualifications.',
        source: {
          label: 'DGE — FAQ: Equivalence of Foreign Qualifications',
          href: 'https://www.dge.mec.pt/faq-equivalence-foreign-qualifications'
        }
      },
      {
        question: 'How do international IB students apply to Portuguese universities?',
        answer:
          'Students without Portuguese or EU/EEA nationality usually apply through the special competition for international students (Decree-Law 36/2014). You apply to each institution directly, and each sets its own places, deadlines and selection criteria. A qualification that gives access to higher education in the country where it was issued is enough to apply.',
        source: {
          label: 'DGES/IES — Special competition for international students (in Portuguese)',
          href: 'https://www.dges.gov.pt/pt/pagina/concurso-especial-para-estudantes-internacionais?plid=593'
        }
      },
      {
        question: 'Do IB students need to take Portuguese entrance exams (Provas de Ingresso)?',
        answer:
          'In the national competition, yes, but you can replace them with IB exams that the National Access Commission (CNAES) lists as equivalent, such as IB Biology SL or HL for Biology and Geology. You also need a certificate of equivalence of your IB Diploma. In the special competition for international students, each institution sets its own selection criteria.',
        source: {
          label: 'DGES/IES — Students with foreign secondary education (in Portuguese)',
          href: 'https://www.dges.gov.pt/pt/pagina/substituicao-de-provas-de-ingresso-por-exames-estrangeiros?plid=593'
        }
      },
      {
        question: 'What language proficiency is required to study in Portugal?',
        answer:
          'Each institution sets its own language requirements, as part of its autonomy over the conditions of entry to its programmes. Check the level and the certificates your programme accepts, for Portuguese-taught and English-taught programmes alike.',
        source: {
          label: 'DGES/IES — Portuguese Higher Education System',
          href: 'https://www.dges.gov.pt/en/pagina/portuguese-higher-education-system'
        }
      },
      {
        question: 'What is the difference between universities and polytechnics in Portugal?',
        answer:
          "Portugal operates a binary higher education system. Universities focus on research and academic knowledge, offering Licenciatura (Bachelor's, 3–4 years), Mestrado (Master's, 1.5–2 years), and Doutoramento (PhD). Polytechnics emphasize applied research and practical professional training, offering Licenciatura and Mestrado degrees. Both types accept IB Diploma holders.",
        source: {
          label: 'DGES/IES — Portuguese Higher Education System',
          href: 'https://www.dges.gov.pt/en/pagina/portuguese-higher-education-system'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Portuguese admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Create your free IB Match profile to discover programmes at Portuguese universities and polytechnics that match your IB Diploma subjects and scores.'
}
