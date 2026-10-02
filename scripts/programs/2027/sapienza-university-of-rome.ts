import type { RefreshFile } from '../lib/refresh'

/**
 * Sapienza University of Rome: requirements for 2027 entry.
 *
 * Exported from the database on 2026-10-02 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts sapienza-university-of-rome
 */
const refresh: RefreshFile = {
  university: 'Sapienza University of Rome',
  entryYear: 2027,
  checkedOn: '2026-10-02',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmnxgdt00017mrm0xxq6vdv',
      status: 'current',
      name: 'Applied Computer Science and Artificial Intelligence',
      description:
        "The Bachelor's Degree Program in Applied Computer Science and Artificial Intelligence trains professionals in computer science with specialized skills in artificial intelligence and in the main areas of applied computing. Graduates in Applied Computer Science and Artificial Intelligence will acquire a solid foundational education, enabling them to keep pace with technological advancements, alongside advanced technical training that facilitates a smooth transition into the Information and Communication Technology (ICT) job market. Graduates … meet the requirements for admission to postgraduate studies, both in the field of computer science and in other scientific disciplines.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33502',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/accepted_qualifications_2026_06_26.pdf',
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/academic_requirements_movein_2026-2027_web_20260608.pdf',
        'https://corsidilaurea.uniroma1.it/en/course/33502'
      ],
      notes:
        "Content 4.8: Admission (class L-31, admission test) is by entry test: SAT above 960/1600, or for non-EU applicants CEnT-S above zero and for EU applicants English TOLC-I 18/50. Pre-selection minimum GPA 75/100. Checked, none required: Sapienza names no school subject (the stored rows had no source and are removed). Sapienza's accepted-qualifications list (26 June 2026) repeats MUR's IB rule: at least 24 points in six subjects, 12 at HL, with TOK, CAS and EE passed. That is the only IB figure it publishes, so 24 is stored (was 34). The pre-selection GPA minimum applies to non-EU applicants through MoveIn and Sapienza publishes no IB conversion for it; the stored 34 was that minimum scaled to 45. English B2 is required; the IB waives the certificate. Sapienza's pre-selection requirements and course catalogue describe 2026-27 (the catalogue is being updated; 2027-28 calls are published from late June), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmnxgvu000d7mrm6jyelyr4',
      status: 'current',
      name: 'Bioinformatics',
      description:
        'The Degree Course in Bioinformatics is a three-year degree program entirely taught in English. The objective of the Degree Course is to train qualified figures with a background in bioinformatics, biomolecular, pharmaceutical, and information technology (IT) scientific research that synergistically integrates i) a solid set of theoretical skills in basic scientific disciplines; ii) extensive skills in the biomolecular, technological-applicative, and IT fields; iii) critical scientific assessment, competences, information, and communication skills. Graduates in Bioinformatics will have a solid multi- and transdisciplinary scientific cultural background and a strong foundation in the reference areas (e.g., biochemistry, genetics, molecular biology, medicinal chemistry, and computer science)….',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33455',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/accepted_qualifications_2026_06_26.pdf',
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/academic_requirements_movein_2026-2027_web_20260608.pdf',
        'https://corsidilaurea.uniroma1.it/en/course/33455'
      ],
      notes:
        "Content 4.8: Admission is by entry test (CEnT-S above zero; English TOLC is no longer accepted). Pre-selection minimum GPA 75/100. Checked, none required: Sapienza names no school subject (the stored rows had no source and are removed). Sapienza's accepted-qualifications list (26 June 2026) repeats MUR's IB rule: at least 24 points in six subjects, 12 at HL, with TOK, CAS and EE passed. That is the only IB figure it publishes, so 24 is stored (was 34). The pre-selection GPA minimum applies to non-EU applicants through MoveIn and Sapienza publishes no IB conversion for it; the stored 34 was that minimum scaled to 45. English B2 is required; the IB waives the certificate. Sapienza's pre-selection requirements and course catalogue describe 2026-27 (the catalogue is being updated; 2027-28 calls are published from late June), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmnxhff000t7mrmtr9v8kdj',
      status: 'current',
      name: 'Business Sciences',
      description:
        'The BSc in Business Sciences programme offers a fundamental multidisciplinary education aimed at understanding the functioning of modern business organizations and financial systems, as well as the main connotations of the environmental context. Graduates will be equipped to provide consultancy, and managerial and entrepreneurial activities in private and public organizations, which operate in real and financial markets. Students who graduate from the Business Sciences programme will develop adequate skills in economic, managerial, financial and legal disciplines, developing appropriate methods for the analysis and critical interpretation of business structures and dynamics.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33437',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/accepted_qualifications_2026_06_26.pdf',
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/academic_requirements_movein_2026-2027_web_20260608.pdf',
        'https://corsidilaurea.uniroma1.it/en/course/33437'
      ],
      notes:
        "Content 4.8: Admission is by entry test: SAT 960 or higher, or CEnT-S 18/55. Pre-selection minimum GPA 80/100. Sapienza says a solid mathematical background is \"strongly required\" and gives preference to scientific or quantitative school studies, without naming a subject or grade. Checked, none required: Sapienza names no school subject (the stored rows had no source and are removed). Sapienza's accepted-qualifications list (26 June 2026) repeats MUR's IB rule: at least 24 points in six subjects, 12 at HL, with TOK, CAS and EE passed. That is the only IB figure it publishes, so 24 is stored (was 36). The pre-selection GPA minimum applies to non-EU applicants through MoveIn and Sapienza publishes no IB conversion for it; the stored 36 was that minimum scaled to 45. English B2 is required; the IB waives the certificate. Sapienza's pre-selection requirements and course catalogue describe 2026-27 (the catalogue is being updated; 2027-28 calls are published from late June), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmnxibc001h7mrmfasjjk97',
      status: 'current',
      name: 'Classics',
      description:
        'The Programme provides a solid and thorough grounding in the knowledge of the ancient world. Particular focus is given to the languages and literature of Greece and Rome, ancient history, classical archaeology and the legacy of the Classics in medieval, modern and contemporary culture. Adopting a rigorous yet comprehensive approach, the Programme considers not only languages and literature, but also the cultural, anthropological, and reception aspects of ancient civilisations. Making the most of its location in Rome, the Programme offers opportunities for field trips, museum visits and library workshops.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33528',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/accepted_qualifications_2026_06_26.pdf',
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/academic_requirements_movein_2026-2027_web_20260608.pdf',
        'https://corsidilaurea.uniroma1.it/en/course/33528'
      ],
      notes:
        "Content 4.8: Admission is by entry test: SAT, or English TOLC-E / English Test HUM. Pre-selection minimum GPA 75/100. Checked, none required: Sapienza names no school subject (the stored rows had no source and are removed). Sapienza's accepted-qualifications list (26 June 2026) repeats MUR's IB rule: at least 24 points in six subjects, 12 at HL, with TOK, CAS and EE passed. That is the only IB figure it publishes, so 24 is stored (was 34). The pre-selection GPA minimum applies to non-EU applicants through MoveIn and Sapienza publishes no IB conversion for it; the stored 34 was that minimum scaled to 45. English B2 is required; the IB waives the certificate. Sapienza's pre-selection requirements and course catalogue describe 2026-27 (the catalogue is being updated; 2027-28 calls are published from late June), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmnxhx000177mrmk6vczsur',
      status: 'current',
      name: 'Economics and Finance',
      description:
        'The BSc in Economics and Finance (class L-33) programme aims to equip students with the economic knowledge, qualitative and quantitative tools, and critical skills required to understand the mechanisms that govern economic phenomena. Students enrolled in the programme will learn to analyze the functioning of economic and financial markets, process and interpret statistical data, [and] learn to forecast… the future dynamics of economic and financial variables…. Furthermore, the programme offers a solid foundation for further academic studies. The BSc in Economics and Finance offers four different training paths (one in English and three in Italian)…',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33438',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/accepted_qualifications_2026_06_26.pdf',
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/academic_requirements_movein_2026-2027_web_20260608.pdf',
        'https://corsidilaurea.uniroma1.it/en/course/33438'
      ],
      notes:
        "Content 4.8: Admission is by entry test: SAT 960 or higher, or CEnT-S above zero. Pre-selection minimum GPA 80/100. Sapienza says a solid mathematical background is \"strongly required\" and gives preference to scientific or quantitative school studies, without naming a subject or grade; the stored critical Maths AA HL 6 is removed. Checked, none required: Sapienza names no school subject (the stored rows had no source and are removed). Sapienza's accepted-qualifications list (26 June 2026) repeats MUR's IB rule: at least 24 points in six subjects, 12 at HL, with TOK, CAS and EE passed. That is the only IB figure it publishes, so 24 is stored (was 36). The pre-selection GPA minimum applies to non-EU applicants through MoveIn and Sapienza publishes no IB conversion for it; the stored 36 was that minimum scaled to 45. English B2 is required; the IB waives the certificate. Sapienza's pre-selection requirements and course catalogue describe 2026-27 (the catalogue is being updated; 2027-28 calls are published from late June), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmnxins001p7mrm6upaxtd7',
      status: 'current',
      name: 'Global Humanities',
      description:
        'The Degree in Global Humanities aims at providing students with knowledge and competences in the fields of humanities and social sciences privileging a global and transcultural perspective. It is characterized by flexible curricula, carefully planned and devised to preserve the interdisciplinary and complementary structure of the study plans. The curricula are organized around the following disciplines: history, sociology, anthropology, arts, literatures, law, economics, health. The Degree is open to Italian and international students interested in studying and expanding their knowledge on the complex historical processes affecting the global transformation of contemporary societies… in a renewed transnational perspective….',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33537',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/accepted_qualifications_2026_06_26.pdf',
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/academic_requirements_movein_2026-2027_web_20260608.pdf',
        'https://corsidilaurea.uniroma1.it/en/course/33537'
      ],
      notes:
        "Content 4.8: Admission is by entry test: SAT, or English Test HUM (English TOLC-E only for earlier takers); scores below 960 SAT or 12/30 HUM bring additional learning requirements (OFA). Pre-selection minimum GPA 70/100. Checked, none required: Sapienza names no school subject (the stored rows had no source and are removed). Sapienza's accepted-qualifications list (26 June 2026) repeats MUR's IB rule: at least 24 points in six subjects, 12 at HL, with TOK, CAS and EE passed. That is the only IB figure it publishes, so 24 is stored (was 32). The pre-selection GPA minimum applies to non-EU applicants through MoveIn and Sapienza publishes no IB conversion for it; the stored 32 was that minimum scaled to 45. Unlike Sapienza's other English bachelor's, Global Humanities requires a B2 English certificate (IELTS, TOEFL iBT, Cambridge and others) from every applicant and lists no IB waiver. Sapienza's pre-selection requirements and course catalogue describe 2026-27 (the catalogue is being updated; 2027-28 calls are published from late June), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmnxj0h001x7mrmv3z3ocgi',
      status: 'current',
      name: 'Molecular Biology, Medicinal Chemistry and Computer Science for Pharmaceutical Applications',
      description:
        'The Degree Course in Molecular Biology, Medicinal Chemistry and Computer Science for Pharmaceutical Applications is a three-year degree program entirely taught in English. The objective of the Degree Course is to train qualified figures with a preparation in biomolecular, pharmaceutical and information technology research that integrates in a synergistic manner: i) a solid set of theoretical skills in basic scientific disciplines; ii) broad competences in molecular biology, medicinal chemistry, and applicative technological and IT fields; iii) critical scientific evaluation skills and abilities in information and communication. The combination of these skills is aimed at training graduates capable of successfully facing the challenges posed by the growing needs of the universe of biologically active compounds (drugs, nutraceuticals, cosmeceuticals)…',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33457',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/accepted_qualifications_2026_06_26.pdf',
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/academic_requirements_movein_2026-2027_web_20260608.pdf',
        'https://corsidilaurea.uniroma1.it/en/course/33457'
      ],
      notes:
        "Content 4.8: Admission is by entry test: SAT (from 1 January 2025) or CEnT-S, either above zero. Pre-selection minimum GPA 60/100. Checked, none required: Sapienza names no school subject (the stored rows had no source and are removed). Sapienza's accepted-qualifications list (26 June 2026) repeats MUR's IB rule: at least 24 points in six subjects, 12 at HL, with TOK, CAS and EE passed. That is the only IB figure it publishes, so 24 is stored (was 27). The pre-selection GPA minimum applies to non-EU applicants through MoveIn and Sapienza publishes no IB conversion for it; the stored 27 was that minimum scaled to 45. English B2 is required; the IB waives the certificate. Sapienza's pre-selection requirements and course catalogue describe 2026-27 (the catalogue is being updated; 2027-28 calls are published from late June), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmnxjjr002d7mrmp207rwqy',
      status: 'current',
      name: 'Sustainable Building Engineering',
      description:
        'The degree aims to provide the students with the knowledge and skills needed to ensure a sustainable future for both existing and new buildings. The main purpose of this degree is to update traditional civil engineering skills with a particular focus on sustainable development.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33482',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/accepted_qualifications_2026_06_26.pdf',
        'https://www.uniroma1.it/sites/default/files/field_file_allegati/academic_requirements_movein_2026-2027_web_20260608.pdf',
        'https://corsidilaurea.uniroma1.it/en/course/33482'
      ],
      notes:
        "Content 4.8: Admission requires a 12-year school diploma and an entry test (SAT or CEnT-S above zero). Pre-selection minimum GPA 80/100. Checked, none required: Sapienza names no school subject (the stored rows had no source and are removed). Sapienza's accepted-qualifications list (26 June 2026) repeats MUR's IB rule: at least 24 points in six subjects, 12 at HL, with TOK, CAS and EE passed. That is the only IB figure it publishes, so 24 is stored (was 36). The pre-selection GPA minimum applies to non-EU applicants through MoveIn and Sapienza publishes no IB conversion for it; the stored 36 was that minimum scaled to 45. English B2 is required; the IB waives the certificate. Sapienza's pre-selection requirements and course catalogue describe 2026-27 (the catalogue is being updated; 2027-28 calls are published from late June), so checked for 2026."
    }
  ]
}

export default refresh
