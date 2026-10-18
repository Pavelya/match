import type { CountryGuide } from '@/lib/guides/types'

/** Study in Ireland with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-ireland-with-ib-diploma',
  countryCode: 'IE',
  exploreCountryId: 'cmj0hp5uj00047mfwwoclp0i5',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Ireland with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for admission to Irish universities, using only official Irish higher-education and institutional sources. Ireland uses a centralized application system through the Central Applications Office (CAO) for undergraduate admissions.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Ireland recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'The **International Baccalaureate (IB) Diploma** is accepted as **equivalent to the Irish Leaving Certificate** for admission to Irish higher education institutions. IB scores are converted to **CAO points** using an official conversion table published annually in the CAO Entry Requirements document.'
        },
        {
          type: 'paragraph',
          text: 'The IB Diploma qualifies holders for entry into **Level 6 (Higher Certificate)**, **Level 7 (Ordinary Degree)**, and **Level 8 (Honours Degree)** courses through the CAO. A minimum IB score of **24 points** is generally required, though individual programmes may require higher scores.'
        },
        {
          type: 'paragraph',
          text: 'Additionally, applicants who achieve a grade of **4 or above in IB Higher Level Mathematics** are awarded **25 bonus points**, provided Mathematics is included in the overall award used for points calculation.'
        }
      ],
      sources: [
        {
          label: 'CAO — Entry Requirements for EU/EFTA/UK Applicants (latest edition)',
          href: 'https://www.cao.ie/euefta'
        },
        {
          label: 'CAO — Applicant Scoring',
          href: 'https://www.cao.ie/index.php?page=scoring&s=ib'
        }
      ]
    },
    {
      label: 'Equivalence',
      heading: 'Do IB students need an Irish Leaving Certificate?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          line: 'The IB Diploma is accepted as a standalone qualification',
          paragraphs: [
            'The IB Diploma is recognized as equivalent to the Irish Leaving Certificate for CAO application purposes. You do not need to obtain a separate Irish qualification or undergo a formal credential evaluation process. Your IB results are converted directly to CAO points.'
          ]
        },
        {
          type: 'caution',
          text: '**Subject-specific requirements:** Some programmes require specific subjects at certain levels. For example, Engineering programmes typically require Higher Level Mathematics, and Science programmes may require specific science subjects. Always check the individual programme requirements on the CAO or institution website.'
        }
      ],
      sources: [
        {
          label: 'CAO — Entry Requirements for EU/EFTA/UK Applicants (latest edition)',
          href: 'https://www.cao.ie/euefta'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'How admission works for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ireland uses a **centralized application system**. EU, EFTA, and UK applicants submit their applications through the [Central Applications Office (CAO)](https://www.cao.ie). You can list up to **10 Level 8** (Honours Degree) courses and **10 Level 7/6** (Ordinary Degree / Higher Certificate) courses in order of preference. Offers are made based on your **CAO points score**.'
        },
        {
          type: 'list',
          items: [
            '**Points-based admission** — Your IB score is converted to CAO points using the official conversion table. Offers are made to applicants with the highest points, working down from your first preference.',
            '**25 bonus points for HL Maths** — If you achieve a grade 4 or above in IB Higher Level Mathematics, you receive 25 additional CAO points.',
            '**Non-EU/EEA applicants** should generally apply directly to the institution rather than through the CAO, unless specifically instructed otherwise by the institution.'
          ]
        }
      ],
      sources: [
        {
          label: 'CAO — Entry Requirements for EU/EFTA/UK Applicants (latest edition)',
          href: 'https://www.cao.ie/euefta'
        },
        {
          label: 'CAO — Applicant Scoring',
          href: 'https://www.cao.ie/index.php?page=scoring&s=ib'
        }
      ]
    },
    {
      label: 'Grade conversion',
      heading: 'IB to CAO points conversion',
      blocks: [
        {
          type: 'paragraph',
          text: 'IB scores are converted to **CAO points (Irish Points Scale — IPS)** using an official conversion table. The conversion is published annually in the CAO Entry Requirements document and is based on statistical alignment between IB and Leaving Certificate results.'
        },
        {
          type: 'list',
          items: [
            'The conversion table translates your overall IB score (out of 45) to an equivalent CAO points total',
            '**25 bonus points** are added for IB Higher Level Mathematics at **grade 4 or above**, provided Maths is included in the overall award',
            'These equivalences are indicative — the exact steps between points may not be even, as they are based on statistical comparisons'
          ]
        },
        {
          type: 'table',
          table: {
            caption: 'Sample IB to CAO points conversion',
            columns: ['IB score', 'CAO points (approx.)'],
            rows: [
              ['45', '600'],
              ['42', '577'],
              ['38', '520'],
              ['34', '466'],
              ['30', '412'],
              ['24', '350']
            ]
          },
          note: 'Source: CAO Entry Requirements for EU/EFTA/UK Applicants, 2026-entry edition (Table 2). CAO had not published the 2027-entry edition by 25 September 2026, and its 2027 handbook still links to this one. The HL Mathematics bonus is added on top, to a maximum of 625. These figures are indicative — always consult the official document for the complete table.'
        }
      ],
      sources: [
        {
          label: 'CAO — Entry Requirements for EU/EFTA/UK Applicants (latest edition)',
          href: 'https://www.cao.ie/euefta'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Are entrance exams required?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Most Irish university programmes **do not require entrance exams** for IB students. Admission is primarily based on your converted CAO points score. However, there are notable exceptions.'
        },
        {
          type: 'list',
          items: [
            '**Medicine (undergraduate)** requires the **HPAT-Ireland** aptitude test in addition to meeting minimum academic entry requirements. The HPAT score is combined with your CAO points to determine eligibility.',
            '**Creative arts programmes** (e.g., Art, Design, Music, Architecture) may require a **portfolio submission** or **audition** as part of the selection process',
            '**Graduate Entry Medicine** requires the **GAMSAT** (Graduate Australian Medical School Admissions Test)'
          ]
        }
      ],
      sources: [
        {
          label: 'CAO — Entry to Medicine',
          href: 'https://www.cao.ie/index.php?page=medentry'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'The vast majority of university programmes in Ireland are taught in **English**. Some programmes at certain institutions are available in **Irish (Gaeilge)**.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'English',
              items: [
                'The CAO minimum is **English A** at grade 3 (HL) or 4 (SL), or **English B** at grade 4 (HL) or 6 (SL)',
                'Otherwise: **IELTS Academic 6.5** overall (6.0 in each band), **TOEFL iBT 90** (4.5 on the scale used from 21 January 2026), or another approved test',
                'Individual institutions may set higher thresholds — always check programme requirements'
              ]
            },
            {
              title: 'Irish (Gaeilge)',
              items: [
                'Required only for Irish-medium programmes',
                'Applicants born and fully educated outside the Republic of Ireland are **automatically exempt from the Irish language requirement** set by some universities',
                'Some teacher training and Irish-language programmes may still require Irish language proficiency'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'CAO — Entry Requirements for EU/EFTA/UK Applicants (latest edition)',
          href: 'https://www.cao.ie/euefta'
        },
        {
          label: 'CAO Handbook 2027',
          href: 'https://www2.cao.ie/handbook/handbook2027/hb.pdf'
        }
      ]
    },
    {
      label: 'University types',
      heading: 'Types of higher education in Ireland',
      blocks: [
        {
          type: 'paragraph',
          text: 'Irish higher education is provided by publicly funded institutions across several categories. The IB Diploma is accepted at all types.'
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'Universities',
              items: [
                "Offer **Bachelor's** (3–4 years), **Master's**, and **PhD** programmes",
                'Research-intensive with strong international reputation',
                'Examples: Trinity College Dublin, University College Dublin, University of Galway, University College Cork'
              ]
            },
            {
              title: 'Technological universities',
              items: [
                'Formed from mergers of Institutes of Technology — offer degrees from **Level 6 to Level 10** on the NFQ',
                'Strong focus on **industry-relevant** and **applied learning** with work placements',
                'Examples: Technological University Dublin, Munster Technological University, Atlantic Technological University'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Education in Ireland — Why Study in Ireland?',
          href: 'https://www.educationinireland.com/en/why-study-in-ireland/'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Documents are submitted as part of your CAO application or directly to institutions for non-CAO applicants:'
        },
        {
          type: 'documents',
          items: [
            'IB Diploma and transcript of results',
            'Proof of identity (valid passport or national ID)',
            'Proof of English proficiency (if not met through IB English courses)',
            'Certified English translation of any documents not in English',
            'CAO application number on all supporting documents',
            'Any programme-specific supplementary documents (e.g., portfolio, HPAT registration)'
          ]
        },
        {
          type: 'caution',
          text: 'If you are sitting the IB in May 2027, ask your IB coordinator to add “Central Applications Office (CAO)” to the institutions allowed to access your results, and give CAO your IB candidate number (3 letters and 3 numbers). CAO does not accept predicted grades or a personal statement: offers are based on final results.'
        }
      ],
      sources: [
        {
          label: 'CAO — Entry Requirements for EU/EFTA/UK Applicants (latest edition)',
          href: 'https://www.cao.ie/euefta'
        },
        {
          label: 'CAO Handbook 2027',
          href: 'https://www2.cao.ie/handbook/handbook2027/hb.pdf'
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
              date: '5 November 2026',
              time: '12:00',
              title: 'CAO applications open',
              text: 'The online application facility at cao.ie opens for 2027 entry. Create your account and begin your application early.'
            },
            {
              date: '20 January 2027',
              time: '5:00 PM',
              title: 'Discounted application deadline',
              text: 'Apply online by this date to pay the discounted application fee of €35.'
            },
            {
              date: '1 February 2027',
              time: '5:00 PM',
              title: 'Normal application deadline',
              text: 'The standard closing date for applications. The online application fee is €50. You can list up to 10 Level 8 (Honours Degree) and 10 Level 7/6 courses.'
            },
            {
              date: '1 May 2027',
              time: '5:00 PM',
              title: 'Late application deadline',
              text: 'Late online applications open on 5 March 2027 and cost €65; late paper applications cost €95. Some courses do not accept late applications.'
            },
            {
              date: '1 July 2027',
              time: '5:00 PM',
              title: 'Change of mind deadline',
              text: 'From 5 May you can change your course choices online free of charge until this date. This is particularly useful once you know your predicted IB results.'
            },
            {
              date: 'Late August 2027',
              title: 'Round One offers',
              text: 'Round One offers are issued in the week after the Leaving Certificate results; CAO confirms the exact date later. Accept your offer by the reply date on the offer notice. Further rounds follow for available places.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'CAO — Important Dates 2027',
          href: 'https://www2.cao.ie/downloads/documents/2027/CAO_Important_Dates_2027.pdf'
        },
        {
          label: 'CAO Handbook 2027',
          href: 'https://www2.cao.ie/handbook/handbook2027/hb.pdf'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions (IB only)',
    items: [
      {
        question: 'Is the IB Diploma recognized for university admission in Ireland?',
        answer:
          'Yes. The IB Diploma is accepted as equivalent to the Irish Leaving Certificate for admission to Level 6, 7, and 8 courses (Higher Certificates, Ordinary Degrees, and Honours Degrees). IB scores are converted to CAO points using an official conversion table.',
        source: {
          label: 'CAO — Entry Requirements for EU/EFTA/UK Applicants',
          href: 'https://www.cao.ie/euefta'
        }
      },
      {
        question: 'How are IB scores converted to CAO points?',
        answer:
          'IB scores are converted to the Irish Points Scale (IPS) using an official conversion table published in the CAO Entry Requirements document. The conversion is based on statistical alignment of IB and Leaving Certificate results. Additionally, 25 bonus points are awarded for IB Higher Level Mathematics at grade 4 or above.',
        source: {
          label: 'CAO — Entry Requirements for EU/EFTA/UK Applicants',
          href: 'https://www.cao.ie/euefta'
        }
      },
      {
        question: 'How do IB students apply to Irish universities?',
        answer:
          'EU, EFTA, and UK applicants apply through the Central Applications Office (CAO) at cao.ie. For 2027 entry, the normal application deadline is 1 February 2027 at 5:00 PM, with late applications accepted until 1 May 2027. You can list up to 10 Level 8 (Honours Degree) and 10 Level 7/6 courses. Non-EU/EEA applicants should generally apply directly to the institution.',
        source: {
          label: 'CAO — Important Dates 2027',
          href: 'https://www2.cao.ie/downloads/documents/2027/CAO_Important_Dates_2027.pdf'
        }
      },
      {
        question: 'Do IB students need to take entrance exams in Ireland?',
        answer:
          'Most Irish university programmes do not require entrance exams. However, undergraduate Medicine requires the HPAT-Ireland aptitude test in addition to meeting minimum academic requirements. Some creative arts programmes may require a portfolio or audition.',
        source: {
          label: 'CAO — Entry to Medicine',
          href: 'https://www.cao.ie/index.php?page=medentry'
        }
      },
      {
        question: 'Is higher education in Ireland free for IB students?',
        answer:
          'It depends on your nationality and residence. EU/EEA/Swiss/UK nationals who have lived in the EU/EEA, Switzerland, or the UK for at least three of the five years before their course starts are eligible for the Free Fees Initiative: the State pays their tuition, and they pay a student contribution of up to €2,500 a year. That is the rate for 2026/27; the 2027/28 rate had not been announced when this page was updated. Non-EU/EEA students pay full tuition fees set by each institution.',
        source: {
          label: 'HEA — Free Fees Initiative',
          href: 'https://hea.ie/funding-governance-performance/funding/student-finance/course-fees/'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Irish admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Irish university programmes that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
