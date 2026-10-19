import type { CountryGuide } from '@/lib/guides/types'

/** Study in Singapore with the IB Diploma: today's words, in the new design (rebranding 4.2) */
export const guide: CountryGuide = {
  path: '/study-in-singapore-with-ib-diploma',
  countryCode: 'SG',
  exploreCountryId: 'cmirq3xas000o7m0e4dbgs69t',
  eyebrow: 'Official university admission guide for IB students (2027)',
  title: 'Study in Singapore with the IB Diploma',
  intro:
    "This guide explains how the International Baccalaureate (IB) Diploma is used for admission to Singaporean universities, using only official Singapore higher-education and institutional sources. Singapore's system is decentralized, meaning that universities determine their own admission policies for foreign qualifications, including the IB Diploma.",
  intake: 2027,
  sections: [
    {
      label: 'Official recognition',
      heading: 'How Singapore recognizes the IB Diploma',
      blocks: [
        {
          type: 'paragraph',
          text: 'The International Baccalaureate (IB) Diploma is widely recognized for university admission in Singapore. The Ministry of Education (MOE) approves it as an alternative to the GCE A-Level curriculum for specific independent schools, and publicly funded, private, and autonomous universities accept the IB Diploma as a qualification for undergraduate programs.'
        },
        {
          type: 'paragraph',
          text: 'Major universities, including the National University of Singapore (NUS), Nanyang Technological University (NTU), Singapore Management University (SMU), and the Singapore University of Technology and Design (SUTD), all assess applicants holding the IB Diploma. Admission is highly competitive and is primarily based on actual IB Diploma results.'
        }
      ],
      sources: [
        {
          label: 'NUS IB Admissions Information',
          href: 'https://nus.edu.sg/oam/apply-to-nus/international-baccalaureate-(ib)-diploma/admissions-requirements'
        },
        {
          label: 'NTU IB Diploma Admission Guide',
          href: 'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma'
        },
        {
          label: 'SMU Undergraduate Admissions',
          href: 'https://admissions.smu.edu.sg'
        }
      ]
    },
    {
      label: 'Equivalence requirements',
      heading: 'Do I need a Singaporean local secondary diploma?',
      blocks: [
        {
          type: 'answer',
          word: 'No',
          line: 'The IB Diploma is sufficient',
          paragraphs: [
            'You do not need an additional GCE A-Level or O-Level certificate if you have an IB Diploma. The full IB Diploma is a standalone, fully accepted credential for university entry in Singapore. While the diploma itself is sufficient, you must still meet stringent specific program prerequisites, such as requiring Higher Level Mathematics or Sciences for Engineering or STEM courses.'
          ]
        }
      ]
    },
    {
      label: 'Application process',
      heading: 'How admission works in Singapore',
      blocks: [
        {
          type: 'paragraph',
          text: 'Singapore does not have a centralized university application portal for international qualifications. Applicants apply directly to each university via their respective online application portals.'
        },
        {
          type: 'list',
          items: [
            '**Decentralized Direct Application** — You must create an account, fill out application forms, and submit documents individually to each university (e.g., NUS Applicant Portal, NTU Admissions Portal).',
            '**IBO Official Transcripts** — It is mandatory to authorize the International Baccalaureate Organization (IBO) to release your official transcripts directly to the universities. For NUS, the institute code is 000690.'
          ]
        },
        {
          type: 'caution',
          text: '**Important Note on Transcripts:** Failure to grant the university direct access to official transcripts via IBO by early July will usually result in an incomplete application that will not be processed. Students are advised to arrange this with their IB coordinator before results are released.'
        }
      ]
    },
    {
      label: 'Grade evaluation',
      heading: 'How IB scores are assessed',
      blocks: [
        {
          type: 'paragraph',
          text: 'There is no official or universal minimum IB point score required for university entry across Singapore. Admission to competitive public universities is based on a holistic review of points, subject combinations, and availability of places, making entry highly competitive.'
        },
        {
          type: 'list',
          items: [
            '**Full Diploma** — NUS considers only applicants who have been awarded the IB Diploma.',
            '**No Published Grade Profile** — NTU does not publish an indicative grade profile for IB Diploma holders because too few apply to derive one.',
            '**Subject Prerequisites** — Many programs have minimum subject requirements. Where Mathematics is required, NTU accepts both Analysis and Approaches (MAA) and Applications and Interpretation (MAI).',
            '**Predicted Grades** — If you are taking the May IB examinations, you can apply using predicted results, but NUS and NTU release your outcome only after your actual results arrive in July.'
          ]
        }
      ]
    },
    {
      label: 'Entrance exams',
      heading: 'Are entrance exams required?',
      blocks: [
        {
          type: 'paragraph',
          text: 'For the vast majority of academic disciplines (Arts, Science, Engineering, Business), you **do not need to sit for a standardized university entrance exam**. The universities rely heavily on your official IB Diploma results.'
        },
        {
          type: 'list',
          items: [
            "**Medicine** — NUS and NTU require the UCAT (University Clinical Aptitude Test). NTU's Medicine programme does not accept students sitting the IB in May 2027.",
            '**Architecture & Design** — Require submission of an arts or design portfolio.',
            '**Highly Selective Programs** — May require qualitative interviews as part of the holistic admissions process (e.g., Renaissance Engineering at NTU).'
          ]
        }
      ]
    },
    {
      label: 'Language requirements',
      heading: 'Language & Mother Tongue qualifications',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'English proficiency',
              text: 'As the medium of instruction is English, proficiency is expected.',
              items: [
                'If at least three of your IB subjects are taught in a non-English language, you must submit standardized English test scores.',
                'Completing the IB DP in English often satisfies this requirement.'
              ]
            },
            {
              title: 'Mother Tongue (MTL)',
              text: 'For Singapore Citizens and Permanent Residents only:',
              items: [
                'You must fulfill the MTL requirement.',
                'This can be satisfied by a pass in IB Diploma Language A or Language B (at HL or SL) in the relevant mother tongue.'
              ]
            }
          ]
        }
      ]
    },
    {
      label: 'Higher education landscape',
      heading: 'University types in Singapore',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'Autonomous public universities',
              items: [
                'The primary institutions are NUS, NTU, SMU, SUTD, SIT, and SUSS.',
                'These receive public funding, offer comprehensive undergraduate education, and set competitive standards for IB applicants.'
              ]
            },
            {
              title: 'Private education institutions',
              items: [
                'Various private institutions offer degree programs often in partnership with overseas universities (e.g., SIM GE, Kaplan).',
                'They also accept the IB Diploma and are generally more accessible than the autonomous public universities.'
              ]
            }
          ]
        }
      ]
    },
    {
      label: 'Checklist',
      heading: 'Typical required documents',
      blocks: [
        {
          type: 'documents',
          items: [
            'Official IB Transcript (sent directly via IBO)',
            'Actual IB Diploma Results (or predicted if May exams)',
            'Passport / Identification Document',
            'Proof of English Proficiency (if required)',
            'Mother Tongue Language (MTL) verification (for SG Citizens/PRs)'
          ]
        }
      ]
    },
    {
      label: 'Timeline',
      heading: 'Application timeline (2027 intake)',
      blocks: [
        {
          type: 'timeline',
          steps: [
            {
              date: '15 October 2026',
              title: 'NTU applications open',
              text: 'NTU accepts applications from IB Diploma students for AY2027-28 from 15 October 2026 to 19 March 2027.'
            },
            {
              date: 'December 2026 – February 2027',
              title: 'NUS applications (dates to be confirmed)',
              text: 'NUS had not published its AY2027-28 dates when this page was updated. For AY2026-27, its IB window ran from 17 December 2025 to 23 February 2026.'
            },
            {
              date: '19 March 2027',
              title: 'NTU closing date',
              text: 'Applications close. Students who sat the IB in November 2026 must also enter their actual results by this date.'
            },
            {
              date: 'Early July 2027',
              title: 'May-session IB results',
              text: 'Enter your actual results within three days of release (NTU), and make sure the IB has released your official transcript to each university.'
            },
            {
              date: 'July 2027',
              title: 'Outcomes for May-session students',
              text: 'NTU releases outcomes two to three weeks after you submit actual results and makes no conditional offers before then. For AY2026-27, NUS released these outcomes from the second week of July.'
            }
          ]
        }
      ],
      sources: [
        {
          label: 'NTU — Admissions to AY2027-28 undergraduate programmes',
          href: 'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide'
        },
        {
          label: 'NTU — IB Diploma admission guide',
          href: 'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma'
        },
        {
          label: 'NUS — FAQ for IB Diploma students (AY2026-27)',
          href: 'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf?sfvrsn=37e7aa40_37'
        }
      ]
    }
  ],
  questions: {
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'Do autonomous universities in Singapore accept the IB Diploma?',
        answer:
          'Yes. Major publicly funded universities, including NUS, NTU, SMU, and SUTD, accept the IB Diploma as a qualification for undergraduate programs.',
        source: {
          label:
            'National University of Singapore (NUS) and Nanyang Technological University (NTU)',
          href: 'https://nus.edu.sg/oam/apply-to-nus/international-baccalaureate-(ib)-diploma/admissions-requirements'
        }
      },
      {
        question: 'What IB score is required for admission to NUS or NTU?',
        answer:
          'There is no published minimum score, and admission is highly competitive. NTU does not publish a grade profile for IB Diploma holders because too few apply to derive one; each programme sets minimum subject requirements instead.',
        source: {
          label: 'Nanyang Technological University (NTU)',
          href: 'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma'
        }
      },
      {
        question: 'Can I apply with predicted IB scores if I take the May exams?',
        answer:
          'Yes. May 2027 candidates can apply with predicted grades during the application window (NTU: 15 October 2026 to 19 March 2027). Outcomes come only after your actual results in July: NTU requires them within three days of release and makes no conditional offers before then. Some NTU programmes, including Medicine, do not accept May-session candidates.',
        source: {
          label: 'Nanyang Technological University (NTU)',
          href: 'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma'
        }
      },
      {
        question: 'Is the IB Diploma alone sufficient for university entry in Singapore?',
        answer:
          'Yes, the IB Diploma is sufficient and no additional local diploma is required. However, applicants must meet specific programme prerequisites (such as Mathematics or science subjects at HL) and language requirements.',
        source: {
          label: 'Nanyang Technological University (NTU)',
          href: 'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma'
        }
      },
      {
        question: 'What is the Mother Tongue Language (MTL) requirement?',
        answer:
          'The MTL requirement applies primarily to Singapore Citizens and Permanent Residents. It can be fulfilled by achieving specific grades in IB Diploma Language A or Language B (Standard or Higher Level) or other MOE-approved qualifications. International students typically fulfill English proficiency requirements instead.',
        source: {
          label: 'Singapore Management University (SMU)',
          href: 'https://admissions.smu.edu.sg'
        }
      }
    ],
    after:
      'Learn [how IB Match evaluates Singaporean admission](/how-it-works) requirements for your profile.'
  },
  closing:
    'Discover Singaporean university programs that match your IB profile. Search by IB points, subject requirements, and field of study.'
}
