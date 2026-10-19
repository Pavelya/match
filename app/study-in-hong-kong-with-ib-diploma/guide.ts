import type { CountryGuide } from '@/lib/guides/types'

/** Study in Hong Kong with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-hong-kong-with-ib-diploma',
  countryCode: 'HK',
  exploreCountryId: 'cmj19u8pc00007mk4doh03so8',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Hong Kong with the IB Diploma',
  intro:
    'This guide explains how the International Baccalaureate (IB) Diploma is used for admission to universities in Hong Kong SAR, using only official Hong Kong government and institutional sources. Hong Kong uses a decentralized application system — IB students apply directly to each university through the Non-JUPAS route.',
  intake: 2027,
  sections: [
    {
      label: 'Recognition',
      heading: 'How Hong Kong recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: "Hong Kong, officially the **Hong Kong Special Administrative Region (HKSAR) of the People's Republic of China**, is a major international education hub. The **International Baccalaureate (IB) Diploma** is widely recognized by Hong Kong's universities as a qualification for undergraduate admission."
        },
        {
          type: 'paragraph',
          text: 'IB Diploma holders apply through the **Non-JUPAS (Non-Joint University Programmes Admissions System)** route. This is the standard pathway for all students who are not sitting the local Hong Kong Diploma of Secondary Education (HKDSE) examination. Each university individually assesses IB qualifications and sets its own admission requirements.'
        },
        {
          type: 'paragraph',
          text: 'All **eight UGC-funded (University Grants Committee)** universities accept the IB Diploma, as do most self-financing degree-awarding institutions. There is no separate credential evaluation or equivalence process required — universities assess IB results directly.'
        }
      ],
      sources: [
        {
          label: 'Study in Hong Kong — Admission Requirement',
          href: 'https://www.studyinhongkong.edu.hk/en/apply-to-study/admission-requirement.php'
        },
        {
          label: 'HKU Admissions — International Qualifications',
          href: 'https://admissions.hku.hk/apply/international-qualifications'
        }
      ]
    },
    {
      label: 'Equivalence',
      heading: 'Do IB students need the HKDSE?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          line: 'The IB Diploma is accepted as a standalone qualification',
          paragraphs: [
            'The IB Diploma is accepted directly for Non-JUPAS admission. You do not need to sit the Hong Kong Diploma of Secondary Education (HKDSE) or undergo any formal credential evaluation. Universities assess your IB results directly based on total score, subject grades, and Higher Level performance.'
          ]
        },
        {
          type: 'caution',
          text: '**IB Certificate holders:** If you received IB Diploma Programme Course Results rather than the full IB Diploma, your eligibility may be limited. Some universities may still consider your application on a case-by-case basis — contact the institution directly.'
        }
      ],
      sources: [
        {
          label: 'HKU Admissions — International Qualifications',
          href: 'https://admissions.hku.hk/apply/international-qualifications'
        }
      ]
    },
    {
      label: 'Admission system',
      heading: 'How admission works for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hong Kong uses a **decentralized application system** for IB students. Unlike the centralized JUPAS system (which is for HKDSE holders only), IB students apply through the **Non-JUPAS (direct admission) route**, submitting separate applications to each university they wish to attend.'
        },
        {
          type: 'list',
          items: [
            "**Direct application** — Apply through each university's online portal. There is no limit on the number of universities you can apply to.",
            '**Holistic assessment** — Admissions decisions are based on academic performance as well as other factors including interview performance, personal statements, references, and other supporting documents.',
            '**Predicted grades accepted** — Most universities accept predicted IB grades for initial assessment, with conditional offers confirmed upon release of final results.',
            'Satisfying minimum requirements **does not guarantee admission** — the process is competitive and merit-based.'
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Hong Kong — How to Apply',
          href: 'https://www.studyinhongkong.edu.hk/en/apply-to-study/how-to-apply.php'
        },
        {
          label: 'HKUST Admissions — International Qualifications',
          href: 'https://join.hkust.edu.hk/admissions/international-qualifications'
        }
      ]
    },
    {
      label: 'Grade evaluation',
      heading: 'How IB scores are assessed',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hong Kong universities assess IB results **directly using the IB 45-point scale**. There is no official conversion to the local HKDSE grading system. Universities evaluate your total IB score, individual subject grades (especially at Higher Level), and any programme-specific subject requirements.'
        },
        {
          type: 'list',
          items: [
            'Universities set their own minimum IB score thresholds — these are **not standardized** across institutions',
            '**Higher Level (HL) subject grades** are particularly important — many programmes specify minimum HL grades in relevant subjects',
            'Some universities offer **advanced standing or credit transfer** for strong IB HL performance, potentially reducing the 4-year degree to 3 years'
          ]
        },
        {
          type: 'table',
          table: {
            caption: 'Indicative IB score ranges by university',
            columns: ['University', 'Published figure', 'Competitive programmes'],
            rows: [
              ['HKU', '34–43 (by programme)', '43 (Medicine), 41 (Dental Surgery)'],
              ['CUHK', '30 (general minimum)', 'Varies by programme'],
              ['HKUST', '28+', 'Higher for competitive fields'],
              ['CityU', '30+ (Advanced Standing I)', 'Varies by programme'],
              ['PolyU', '32+ (typical admits)', 'Interview possible from 30 predicted']
            ]
          },
          note: "HKU's figures are its expected lower boundaries for 2027 entry, CUHK's is its general minimum, and PolyU's describes recent admits; all three were checked on the universities' sites on 25 September 2026. The HKUST and CityU figures date from February 2026 and could not be confirmed on their current pages. Actual requirements vary by year and programme."
        }
      ],
      sources: [
        {
          label: 'HKU Admissions — International Qualifications',
          href: 'https://admissions.hku.hk/apply/international-qualifications'
        },
        {
          label: 'HKUST Admissions — International Qualifications',
          href: 'https://join.hkust.edu.hk/admissions/international-qualifications'
        },
        {
          label: 'CUHK Admissions — Requirements',
          href: 'https://admission.cuhk.edu.hk/application/overseas-other-qualifications-non-local-international-team/requirements/'
        },
        {
          label: 'PolyU Admissions — International / Other Qualifications',
          href: 'https://www.polyu.edu.hk/study/ug/admissions/international-other-qualifications/international-other-qualifications-general'
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Are entrance exams required?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Most Hong Kong university programmes **do not require entrance exams** for IB students. Admission is primarily based on your IB scores, personal statement, references, and in some cases an interview.'
        },
        {
          type: 'list',
          items: [
            '**Interviews are common** for competitive programmes such as Medicine, Dentistry, and Law — these may be conducted online for overseas applicants',
            '**Creative and performing arts programmes** (e.g., at the Hong Kong Academy for Performing Arts) may require auditions or portfolio submissions',
            'No standardized university entrance exam equivalent to the HKDSE is required of IB students'
          ]
        }
      ],
      sources: [
        {
          label: 'HKU Admissions — International Qualifications',
          href: 'https://admissions.hku.hk/apply/international-qualifications'
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language requirements for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: "Hong Kong's universities use **English as the primary medium** of instruction. Most programmes are taught entirely in English, making the city highly accessible for IB students from around the world."
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'English',
              items: [
                '**HKU:** grade 5 in English A, or grade 6 in English B (HL or SL)',
                '**CUHK:** grade 4 or above in an IB English subject',
                'Other universities set their own grades; IELTS or TOEFL scores are also accepted, with minimums that vary by institution'
              ]
            },
            {
              title: 'Chinese (Cantonese)',
              items: [
                'Not required for most English-taught programmes',
                'Some programmes in Chinese studies, education, social work, or journalism may require Chinese proficiency',
                "CUHK's general requirement includes grade 4 in an IB Chinese subject, but IB Diploma holders may be exempted at the Faculty Dean's discretion"
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'HKU Admissions — International Qualifications',
          href: 'https://admissions.hku.hk/apply/international-qualifications'
        },
        {
          label: 'CUHK Admissions — Requirements',
          href: 'https://admission.cuhk.edu.hk/application/overseas-other-qualifications-non-local-international-team/requirements/'
        }
      ]
    },
    {
      label: 'University types',
      heading: 'Types of higher education in Hong Kong',
      blocks: [
        {
          type: 'paragraph',
          text: "Hong Kong's higher education system includes publicly funded institutions overseen by the University Grants Committee (UGC) and self-financing institutions. The IB Diploma is accepted at both types."
        },
        {
          type: 'cards',
          cards: [
            {
              title: 'UGC-funded universities',
              items: [
                '**8 publicly funded universities** including HKU, CUHK, HKUST, PolyU, CityU, HKBU, Lingnan, and EdUHK',
                "Offer **4-year undergraduate degrees** (Bachelor's) with potential for advanced standing for strong IB performance",
                'Research-intensive with strong international reputations and English-medium instruction'
              ]
            },
            {
              title: 'Self-financing institutions',
              items: [
                'Include **degree-awarding institutions** such as Hong Kong Metropolitan University and Hong Kong Shue Yan University',
                "Offer Bachelor's degrees and sub-degree programmes with professional focus",
                'IB Diploma requirements may be lower than UGC-funded universities — some accept scores from 24 points'
              ]
            }
          ]
        }
      ],
      sources: [
        {
          label: 'Study in Hong Kong — Education System',
          href: 'https://www.studyinhongkong.edu.hk/en/hong-kong-education/education-system.php'
        },
        {
          label: 'University Grants Committee (UGC)',
          href: 'https://www.ugc.edu.hk/eng/ugc/index.html'
        }
      ]
    },
    {
      label: 'Documentation',
      heading: 'Required documents for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: "Documents are submitted electronically through each university's online application portal. Requirements may vary slightly between institutions:"
        },
        {
          type: 'documents',
          items: [
            'IB Diploma and transcript of results (or predicted grades if applying before results are released)',
            'Proof of identity (passport)',
            'Proof of English proficiency (IELTS, TOEFL, or IB English course grades)',
            'Personal statement or statement of purpose',
            'Academic reference letter(s) from teachers or IB coordinator',
            'Any programme-specific supplementary documents (e.g., portfolio, audition for creative programmes)'
          ]
        },
        {
          type: 'caution',
          text: '**Non-local students:** You will also need to apply for a student visa. Allow at least 8–10 weeks for the visa application process after receiving an offer. Check the Immigration Department of Hong Kong SAR for requirements.'
        }
      ],
      sources: [
        {
          label: 'HKU Admissions — International Qualifications',
          href: 'https://admissions.hku.hk/apply/international-qualifications'
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'Application timeline for IB students',
      blocks: [
        {
          type: 'paragraph',
          text: 'Application timelines vary by university. Below is a general guide for Non-JUPAS applicants — always check individual university websites for exact dates:'
        },
        {
          type: 'timeline',
          steps: [
            {
              date: '23 September – 2 October 2026',
              title: 'Applications open',
              text: 'HKU opened non-JUPAS applications for 2027 entry on 23 September 2026, and HKUST opens on 2 October 2026. Create accounts on the online systems of the universities you wish to apply to.'
            },
            {
              date: '25 November 2026',
              title: 'First-round deadlines',
              text: "HKU's first-round deadline (noon, Hong Kong time) and HKUST's priority round both fall on 25 November. Later applications are reviewed on a rolling basis. HKU asks counsellors to enter predicted grades by 1 December 2026."
            },
            {
              date: 'November 2026 – January 2027',
              title: 'Interviews',
              text: 'HKU invites shortlisted applicants to interviews between November and January. Some programmes conduct online interviews for overseas candidates.'
            },
            {
              date: 'From December 2026',
              title: 'Offers',
              text: 'HKU releases first-round results from December and HKUST announces offers from late December. HKU gives three to four weeks to accept and asks for a non-refundable deposit. Conditional offers are confirmed when final IB results arrive in July 2027. Apply for a student visa as soon as you hold an offer.'
            },
            {
              date: '30 June and 25 August 2027',
              title: 'Applications close',
              text: 'HKUST closes on 30 June 2027 and HKU at noon on 25 August 2027. Other universities set their own dates.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'HKU Admissions — Important Dates',
          href: 'https://admissions.hku.hk/apply/international-qualifications'
        },
        {
          label: 'HKUST Admissions — Important Dates',
          href: 'https://join.hkust.edu.hk/admissions/international-qualifications'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'Is the IB Diploma recognized for university admission in Hong Kong?',
        answer:
          'Yes. The IB Diploma is widely recognized by all eight UGC-funded universities and most self-financing institutions in Hong Kong SAR. IB students apply through the Non-JUPAS (direct admission) route. Each university sets its own IB requirements, which vary by institution and programme.',
        source: {
          label: 'Study in Hong Kong — Admission Requirement',
          href: 'https://www.studyinhongkong.edu.hk/en/apply-to-study/admission-requirement.php'
        }
      },
      {
        question: 'How do IB students apply to Hong Kong universities?',
        answer:
          "IB students apply through the Non-JUPAS route, which means submitting applications directly to each university's online application system. JUPAS is reserved for local students with the Hong Kong Diploma of Secondary Education (HKDSE). There is no centralized platform — you must apply separately to each institution you are interested in.",
        source: {
          label: 'Study in Hong Kong — How to Apply',
          href: 'https://www.studyinhongkong.edu.hk/en/apply-to-study/how-to-apply.php'
        }
      },
      {
        question: 'What IB score do I need for Hong Kong universities?',
        answer:
          "There is no single score requirement — it varies by university and programme. For 2027 entry, HKU's expected lower boundaries range from 34 to 43 points (Medicine 43, Dental Surgery 41). CUHK's general minimum is 30 points, and PolyU says its successful applicants typically scored 32 or more in recent years. Programme-specific subject requirements at Higher Level may also apply.",
        source: {
          label: 'HKU Admissions — International Qualifications',
          href: 'https://admissions.hku.hk/apply/international-qualifications'
        }
      },
      {
        question: 'Do I need to speak Chinese to study in Hong Kong?',
        answer:
          "Not for most programmes. English is the primary medium of instruction at Hong Kong's UGC-funded universities, and many programmes are taught entirely in English. Some programmes — particularly in Chinese studies, education, or social work — may require Chinese language proficiency. Each university sets its own English requirement for IB students: HKU asks for grade 5 in English A or grade 6 in English B (HL or SL), and CUHK for grade 4 or above in an IB English subject.",
        source: {
          label: 'HKU Admissions — International Qualifications',
          href: 'https://admissions.hku.hk/apply/international-qualifications'
        }
      },
      {
        question: 'Are there tuition fees for international IB students in Hong Kong?',
        answer:
          'Yes. Non-local students at UGC-funded universities pay higher tuition fees than local students. Tuition fees for non-local undergraduate students are set by individual institutions. Many universities offer entrance scholarships for outstanding IB students, with some covering full tuition fees for students achieving IB scores of 40 or above.',
        source: {
          label: 'Study in Hong Kong — Tuition Fee and Living Expenses',
          href: 'https://www.studyinhongkong.edu.hk/en/hong-kong-education/tuition-fee-and-living-expenses.php'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Hong Kong admission](/how-it-works) requirements for your profile.'
  },
  closing: 'Discover which Hong Kong university programmes match your IB Diploma profile.'
}
