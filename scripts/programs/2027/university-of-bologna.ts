import type { RefreshFile } from '../lib/refresh'

/**
 * University of Bologna: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-bologna
 */
const refresh: RefreshFile = {
  university: 'University of Bologna',
  entryYear: 2027,
  checkedOn: '2026-10-02',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmcwedo002f7mdnjvmwjht7',
      status: 'current',
      name: 'Biology of Human and Environmental Health',
      description:
        'The Universities of Padua and Bologna jointly offer an innovative, multidisciplinary degree program. The first two years in Padua cover topics like cellular biology, genetics, bioinformatics, biostatistics, and physiology. The third year focuses on biological bases of diseases or environmental influences on human health.',
      field: 'Natural Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://apply.unipd.it/courses/course/207-biology-human-and-environmental-health',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf',
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf',
        'https://apply.unipd.it/courses/course/207-biology-human-and-environmental-health',
        'https://corsi.unibo.it/1cycle/HumanEnvironmentalHealth/how-to-enrol',
        'https://www.unipd.it/en/corsi-di-laurea/biology-human-and-environmental-health'
      ],
      notes:
        "Content 4.8: a joint first-cycle degree of Padua and Bologna (class L-13, 3 years, English): two years in Padua, then Human Health (Padua) or Environmental Health (Bologna). Bologna's page sends applicants to Padua, whose application page is for academic year 2027/2028: non-EU applicants 7 January - 7 March 2027, EU and EU-equated 9 March - 9 April 2027, studies from 1 October 2027. Selection is a ranking on the CISIA CEnT-S test (first macro-period November 2026 - January 2027, e.g. 26 November and 17 December 2026); 75 places for EU candidates and non-EU residents in Italy; English B2. The programme URL is now Padua's application page. Checked, none required: no school subject is required or scored (the stored rows had no source and are removed). MUR's procedures for international students, valid for 2026-27 and 2027-28 (Annex 1, section 6), admit the IB Diploma with at least 24 points in six subjects, 12 of them at HL, and TOK, EE and CAS passed, and neither university publishes another IB figure, so 24 is stored (was 28)."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmcwdd2001r7mdn41d7dj4y',
      status: 'current',
      name: 'Building Construction Engineering',
      description:
        'English-language programme focused on construction to train engineers with an international experience. The programme prepares you for a global career and gives access to various second-cycle degree programmes.',
      field: 'Engineering',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsi.unibo.it/1cycle/Building/overview',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf',
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf',
        'https://corsi.unibo.it/1cycle/Building/how-to-enrol',
        'https://corsi.unibo.it/1cycle/Building/overview'
      ],
      notes:
        "Content 4.8: Building Construction Engineering (Ravenna) admits on the CISIA CEnT-S test (which replaced English TOLC-I); in the first 2026/27 selection, 150 places for non-EU citizens abroad and 30 for Italian and EU citizens. Checked, none required: no school subject is required or scored (the stored rows had no source and are removed). Bologna admits foreign qualifications under the MUR circular; MUR's procedures for international students, valid for 2026-27 and 2027-28 (Annex 1, section 6), admit the IB Diploma with at least 24 points in six subjects, 12 of them at HL, and TOK, EE and CAS passed, and Bologna publishes no other IB figure, so 24 is stored (was 28). Bologna's admission page describes 2026/27 (the 2027/28 call is not out), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmcwaaw00017mdn5v5iu6ll',
      status: 'current',
      name: 'Business and Economics (CLaBE)',
      description:
        'The Course is a 1st cycle degree – 3 year Bachelor degree - entirely taught in English, forming graduates qualified for market oriented managerial or consultant positions within an international setting. The course provides students with management abilities in different areas, enabling them to address international issues. It is an international programme for both Italian and foreign students.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsi.unibo.it/1cycle/CLaBE/overview',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf',
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf',
        'https://corsi.unibo.it/1cycle/CLaBE/how-to-enrol',
        'https://corsi.unibo.it/1cycle/CLaBE/overview'
      ],
      notes:
        "Content 4.8: CLaBE admits on the SAT General test: 190 places in 2026/27, 32 reserved for non-EU citizens abroad; first selection 10 February - 4 May 2026. Checked, none required: no school subject is required or scored (the stored rows had no source and are removed). Bologna admits foreign qualifications under the MUR circular; MUR's procedures for international students, valid for 2026-27 and 2027-28 (Annex 1, section 6), admit the IB Diploma with at least 24 points in six subjects, 12 of them at HL, and TOK, EE and CAS passed, and Bologna publishes no other IB figure, so 24 is stored (was 28). Bologna's admission page describes 2026/27 (the 2027/28 call is not out), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmcwasx000b7mdn2cheyim9',
      status: 'current',
      name: 'Economics and Finance',
      description:
        'An international undergraduate degree course entirely taught in English. Its goal is to provide the quantitative and qualitative tools to analyse modern economic and financial systems. On completion of the programme, students will learn and practice economic reasoning tools to formulate and evaluate economic advice and policy, for both the private and the public sector.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsi.unibo.it/1cycle/EconomicsFinance/overview',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf',
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf',
        'https://corsi.unibo.it/1cycle/EconomicsFinance/how-to-enrol',
        'https://corsi.unibo.it/1cycle/EconomicsFinance/overview'
      ],
      notes:
        "Content 4.8: Economics and Finance admits on the SAT General test: 130 places in 2026/27, 40 reserved for non-EU citizens abroad. Checked, none required: no school subject is required or scored (the stored rows had no source and are removed). Bologna admits foreign qualifications under the MUR circular; MUR's procedures for international students, valid for 2026-27 and 2027-28 (Annex 1, section 6), admit the IB Diploma with at least 24 points in six subjects, 12 of them at HL, and TOK, EE and CAS passed, and Bologna publishes no other IB figure, so 24 is stored (was 30). Bologna's admission page describes 2026/27 (the 2027/28 call is not out), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmcwb9u000l7mdndcezck3w',
      status: 'current',
      name: 'Economics of Tourism and Cities',
      description:
        'The course offers an economical and managerial approach to the analysis of tourism industries, smart cities and complex interactions between tourism and urban systems. It provides students with the cultural and technical profile required to join, as a manager or professional, private and public enterprises in the contexts of touristic industries and smart cities.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsi.unibo.it/1cycle/clet/overview',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf',
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf',
        'https://corsi.unibo.it/1cycle/clet/how-to-enrol',
        'https://corsi.unibo.it/1cycle/clet/overview'
      ],
      notes:
        "Content 4.8: Economics of Tourism and Cities (Rimini) admits on the SAT (Reading and Writing, and Maths): 120 places in 2026/27, 50 reserved for non-EU citizens abroad. Checked, none required: no school subject is required or scored (the stored rows had no source and are removed). Bologna admits foreign qualifications under the MUR circular; MUR's procedures for international students, valid for 2026-27 and 2027-28 (Annex 1, section 6), admit the IB Diploma with at least 24 points in six subjects, 12 of them at HL, and TOK, EE and CAS passed, and Bologna publishes no other IB figure, so 24 is stored (was 26). Bologna's admission page describes 2026/27 (the 2027/28 call is not out), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmcwc7600157mdnxogfhcps',
      status: 'current',
      name: 'Economics, Politics and Social Sciences',
      description:
        'The programme offers a multidisciplinary approach to contemporary problems through economic, political, legal and managerial studies. It provides sound quantitative training enabling you to interpret economic, political and social phenomena. You can graduate either in economics or in politics.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsi.unibo.it/1cycle/EconomicsPoliticsSocialSciences/overview',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf',
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf',
        'https://corsi.unibo.it/1cycle/EconomicsPoliticsSocialSciences/how-to-enrol',
        'https://corsi.unibo.it/1cycle/EconomicsPoliticsSocialSciences/overview'
      ],
      notes:
        "Content 4.8: Economics, Politics and Social Sciences admits on the SAT General test: 125 places in 2026/27. Checked, none required: no school subject is required or scored (the stored rows had no source and are removed). Bologna admits foreign qualifications under the MUR circular; MUR's procedures for international students, valid for 2026-27 and 2027-28 (Annex 1, section 6), admit the IB Diploma with at least 24 points in six subjects, 12 of them at HL, and TOK, EE and CAS passed, and Bologna publishes no other IB figure, so 24 is stored (was 26). Bologna's admission page describes 2026/27 (the 2027/28 call is not out), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmcwcnf001f7mdnaidwrqra',
      status: 'current',
      name: 'European Studies',
      description:
        'This international, multidisciplinary, multilingual European programme was developed, within the framework of Una Europa, by four universities (University of Bologna, KU Leuven, Universidad Complutense de Madrid and Uniwersytet Jagielloński w Krakowie) and mobility partners. Its main focus is a compulsory mobility period abroad to foster the possibility of an international career.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 28,
      programUrl: 'https://corsi.unibo.it/1cycle/EuropeanStudies/overview',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://ghum.kuleuven.be/EN/baes/apply',
        'https://corsi.unibo.it/1cycle/EuropeanStudies/how-to-enrol',
        'https://corsi.unibo.it/1cycle/EuropeanStudies/overview'
      ],
      notes:
        'Content 4.8: the Una Europa joint Bachelor of Arts in European Studies (BAES); Bologna is a start university, and as for Complutense\'s BAES (content 4.7) the only application route is KU Leuven, the coordinator. KU Leuven assesses "capacity and suitability" on a reading and writing assignment, a video pitch and an English test (TOEFL iBT 90, IELTS 6.5, CAE/CPE 176, PTE 59 or ITACE C1). Checked, none required: no school subject is named. No IB points figure is published: the stored 28 is kept, unverified. Both pages describe 2026-27 (deadline 1 April 2026); KU Leuven says 2027-2028 applications open in fall 2026, so checked for 2026. Degree corrected to Bachelor of Arts, as BAES is stored for Complutense.'
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmcwdv500237mdntztgh6lc',
      status: 'current',
      name: 'Genomics',
      description:
        'The programme provides theoretical and practical basis for applying IT, mathematical and statistical skills to the analysis of genomic, and multi-omic, data. The international and multidisciplinary environment, together with numerous practical activities are distinctive elements of the course. Training is completed by the curricular internship, in university or external facilities, in Italy or abroad.',
      field: 'Natural Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsi.unibo.it/1cycle/Genomics/overview',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf',
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf',
        'https://corsi.unibo.it/1cycle/Genomics/how-to-enrol',
        'https://corsi.unibo.it/1cycle/Genomics/overview'
      ],
      notes:
        "Content 4.8: Genomics admits on the SAT or the Italian TOLC-I: 60 places in 2026/27, 12 reserved for non-EU citizens abroad. Bologna asks for fundamentals of mathematics, logic and sciences and B2 English, assessed through the test (with additional learning requirements, OFA, if it is not passed). Checked, none required: no school subject is required or scored (the stored rows had no source and are removed). Bologna admits foreign qualifications under the MUR circular; MUR's procedures for international students, valid for 2026-27 and 2027-28 (Annex 1, section 6), admit the IB Diploma with at least 24 points in six subjects, 12 of them at HL, and TOK, EE and CAS passed, and Bologna publishes no other IB figure, so 24 is stored (was 30). Bologna's admission page describes 2026/27 (the 2027/28 call is not out), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmcwd0a001l7mdn16ub1gvv',
      status: 'current',
      name: 'International Studies',
      description:
        "The peculiarity of this Bachelor's programme is its interdisciplinary approach, which allows to gain a complete comprehension of a complex and interconnected world. Students deal with qualified professors and have access to stimulating opportunities: exchange programs, traineeships and language courses, experiences necessary to work in an international environment.",
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsi.unibo.it/1cycle/InternationalStudies/overview',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf',
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf',
        'https://corsi.unibo.it/1cycle/InternationalStudies/how-to-enrol',
        'https://corsi.unibo.it/1cycle/InternationalStudies/overview'
      ],
      notes:
        "Content 4.8: International Studies (Forlì) admits on the Italian TOLC-E with a B2 English certificate (minimum TOLC-E 8/36) or on the SAT: 180 places in 2026/27. Checked, none required: no school subject is required or scored (the stored rows had no source and are removed). Bologna admits foreign qualifications under the MUR circular; MUR's procedures for international students, valid for 2026-27 and 2027-28 (Annex 1, section 6), admit the IB Diploma with at least 24 points in six subjects, 12 of them at HL, and TOK, EE and CAS passed, and Bologna publishes no other IB figure, so 24 is stored (was 26). Bologna's admission page describes 2026/27 (the 2027/28 call is not out), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkmcwbqr000v7mdn955cdr50',
      status: 'current',
      name: 'Management and Economics',
      description:
        'The programme is a multidisciplinary project aimed at developing a solid preparation in the economic and managerial field with an international perspective. It provides solid statistical-mathematical, legal, economic and managerial basis necessary to develop the skills required to promote the growth of companies operating in global markets. Key features: international perspective + data analysis.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://corsi.unibo.it/1cycle/Management/programme',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf',
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf',
        'https://corsi.unibo.it/1cycle/Management/how-to-enrol',
        'https://corsi.unibo.it/1cycle/Management/overview'
      ],
      notes:
        "Content 4.8: Management and Economics admits on the SAT test; first selection 10 February - 4 May 2026. Checked, none required: no school subject is required or scored (the stored rows had no source and are removed). Bologna admits foreign qualifications under the MUR circular; MUR's procedures for international students, valid for 2026-27 and 2027-28 (Annex 1, section 6), admit the IB Diploma with at least 24 points in six subjects, 12 of them at HL, and TOK, EE and CAS passed, and Bologna publishes no other IB figure, so 24 is stored (was 28). Bologna's admission page describes 2026/27 (the 2027/28 call is not out), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20. Degree stored as "Combined Bachelor and Master".
    {
      id: 'cmkmcweu6002p7mdn4pj9brno',
      status: 'current',
      name: 'Medicine and Surgery',
      description:
        "The students develop a comprehensive vision of Medicine's potential by incorporating health promotion, disease prevention, treatment, and rehabilitation into their practice. The use of English language facilitates access to medical literature and international meetings. Graduates are able to communicate better with foreign patients, and to interact with colleagues from different countries.",
      field: 'Medicine & Health',
      degree: "Single-Cycle Master's Degree",
      duration: '6 years',
      minIBPoints: 24,
      programUrl: 'https://corsi.unibo.it/singlecycle/MedicineAndSurgery/overview',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf',
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf',
        'https://corsi.unibo.it/singlecycle/MedicineAndSurgery/how-to-enrol',
        'https://corsi.unibo.it/singlecycle/MedicineAndSurgery/overview'
      ],
      notes:
        "Content 4.8: Medicine and Surgery (English) admits on the national IMAT (2026/27 sitting 29 September 2026; sixty questions on general knowledge, logic, biology, chemistry, physics and maths): 140 places for Italian, EU and EU-equivalent applicants and 20 for non-EU citizens abroad. The IMAT tests the sciences; no school subject is required. Checked, none required: no school subject is required or scored (the stored rows had no source and are removed). Bologna admits foreign qualifications under the MUR circular; MUR's procedures for international students, valid for 2026-27 and 2027-28 (Annex 1, section 6), admit the IB Diploma with at least 24 points in six subjects, 12 of them at HL, and TOK, EE and CAS passed, and Bologna publishes no other IB figure, so 24 is stored (was 36). Bologna's admission page describes 2026/27 (the 2027/28 call is not out), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20. Degree stored as "Combined Bachelor and Master".
    {
      id: 'cmkmcwfeh00337mdnrehur07p',
      status: 'current',
      name: 'Pharmacy',
      description:
        'Unique in the Italian context for its catalogue of courses and for being a degree programme taught entirely in English, the international title of Pharmacist is spendable throughout the EU, offering the opportunity to operate in an international dimension to work in the supply chain of pharmaceuticals and health care products. The programme includes a curricular internship and possible experience abroad.',
      field: 'Medicine & Health',
      degree: "Single-Cycle Master's Degree",
      duration: '5 years',
      minIBPoints: 24,
      programUrl: 'https://corsi.unibo.it/singlecycle/Pharmacy-Rimini/overview',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf',
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf',
        'https://corsi.unibo.it/singlecycle/Pharmacy-Rimini/how-to-enrol',
        'https://corsi.unibo.it/singlecycle/Pharmacy-Rimini/overview'
      ],
      notes:
        "Content 4.8: Pharmacy (Rimini, English) admits on the CISIA CEnT-S test (which replaced English TOLC-F): 100 places in 2026/27. Checked, none required: no school subject is required or scored (the stored rows had no source and are removed). Bologna admits foreign qualifications under the MUR circular; MUR's procedures for international students, valid for 2026-27 and 2027-28 (Annex 1, section 6), admit the IB Diploma with at least 24 points in six subjects, 12 of them at HL, and TOK, EE and CAS passed, and Bologna publishes no other IB figure, so 24 is stored (was 32). Bologna's admission page describes 2026/27 (the 2027/28 call is not out), so checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-20. Degree stored as "Combined Bachelor and Master".
    {
      id: 'cmkmcwfys003h7mdnjt610o1n',
      status: 'current',
      name: 'Veterinary Medicine',
      description:
        "The Master's Degree in Veterinary Medicine, taught in English, offers a comprehensive and globally oriented education for future veterinarians. Combining evidence-based theoretical knowledge with hands-on training, the programme prepares students for careers in clinical practice, animal production, veterinary public health and biomedical research at international levels with a One Health approach.",
      field: 'Medicine & Health',
      degree: "Single-Cycle Master's Degree",
      duration: '5 years',
      minIBPoints: 24,
      programUrl: 'https://corsi.unibo.it/singlecycle/VeterinaryMedicine/overview',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Allegato_1-Circolare_2026_2027.pdf',
        'https://universitaly-private.cineca.it/uploads/universitaly-pubblico/Circolare_2026-2027_studenti_internazionali.pdf',
        'https://corsi.unibo.it/singlecycle/VeterinaryMedicine/how-to-enrol',
        'https://corsi.unibo.it/singlecycle/VeterinaryMedicine/overview'
      ],
      notes:
        "Content 4.8: Veterinary Medicine (English) has national restricted access through the IMAT; passing it also meets the B2 English requirement. 5 places for non-EU citizens abroad in 2026/27. Checked, none required: no school subject is required or scored (the stored rows had no source and are removed). Bologna admits foreign qualifications under the MUR circular; MUR's procedures for international students, valid for 2026-27 and 2027-28 (Annex 1, section 6), admit the IB Diploma with at least 24 points in six subjects, 12 of them at HL, and TOK, EE and CAS passed, and Bologna publishes no other IB figure, so 24 is stored (was 34). Bologna's admission page describes 2026/27 (the 2027/28 call is not out), so checked for 2026."
    }
  ]
}

export default refresh
