import type { RefreshFile } from '../lib/refresh'

/**
 * Universitat de Barcelona: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-30 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts universitat-de-barcelona
 */
const refresh: RefreshFile = {
  university: 'Universitat de Barcelona',
  entryYear: 2027,
  checkedOn: '2026-09-30',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42ozix00017mbxjwnutguh',
      status: 'current',
      name: 'Biology',
      description:
        'To acquire the knowledge required to identify living beings, in their different degrees of organization and diversity: definition and origin of life, chemical structure of living beings, types and degrees of organization, genetics and inheritance mechanisms and biodiversity, evolutionary mechanisms and development. To recognize different activities undertaken by living beings and the underlying mechanisms to these tasks: metabolism, replication, transcription, translation and modification of genetic material, cell signalling, regulation and integration of physiological processes. To learn to recognise, analyse and interpret the adaptive responses of living organisms to surrounding conditions.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1031',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1031'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11002). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 36 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 10.682, above the 10 the access grade can reach, so IB applicants need weighted exam subjects to get in. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored BIO HL5, CHEM SL4, MATH-AA SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Physics, Geology and Environmental Sciences, Mathematics, Chemistry; 0.1 for General Sciences.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p16q000x7mbxr58extu9',
      status: 'current',
      name: 'Biomedical Engineering',
      description:
        'This degree course is designed to provide the student with substantial interdisciplinary training. First-year students will soon be involved in bringing together their studies in engineering, physics and mathematics with studies in biology and medicine, developing the knowledge and skills base to work in the following areas: Problem-solving procedures in the area of biomedicine, R&D procedures in the interface between engineering and biomedicine, and the professional skills required in companies, hospitals, research centres and public agencies dedicated to biomedicine.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 40,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1074',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1074'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11059). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 40 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 12.255, above the 10 the access grade can reach, so IB applicants need weighted exam subjects to get in. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored MATH-AA HL5, PHYS HL5, BIO SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Physics, Geology and Environmental Sciences, Mathematics, Chemistry, Technology and Engineering.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42ozyh00097mbxn9jwh25q',
      status: 'current',
      name: 'Biomedical Sciences',
      description:
        "The bachelor's degree in Biomedical Sciences integrates transversal knowledge from genetics, biochemistry, microbiology, physiology, cell biology and statistics, among others, to offer a global vision of the causes of pathology and the tools available for studying, diagnosing and treating it. This bachelor's degree addresses various aspects of clinical disorders from the molecular, cellular and physiological scale to their distribution in human populations to prepare professionals capable of working in different fields: Biomedical Research, Diagnosis Laboratories, Pharmaceutical Industry, and Public Health Institutes.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 40,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1090',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1090'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11006). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 40 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 11.790, above the 10 the access grade can reach, so IB applicants need weighted exam subjects to get in. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored BIO HL5, CHEM HL5, MATH-AA SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Physics, Mathematics, Chemistry.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p0cz000h7mbxprbykdm7',
      status: 'current',
      name: 'Biotechnology',
      description:
        'To become professionals with a profile that meets the demands of biotechnology companies, as well as to access a wide variety of postgraduate studies in the area. To acquire skills in the applications of biotechnology to the sustainability of production systems, waste treatment and environmental decontamination. To develop an entrepreneurial spirit by training in the basics of biotechnology project management (R&D), marketing of biotechnological products and services, and in the legal aspects.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1033',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1033'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11004). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 38 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 11.446, above the 10 the access grade can reach, so IB applicants need weighted exam subjects to get in. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored BIO HL5, CHEM HL5, MATH-AA SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Physics, Mathematics, Chemistry.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p34i001x7mbxfe7flcin',
      status: 'current',
      name: 'Business Administration and Management',
      description:
        'The general objectives are for students to acquire a comprehensive understanding of business management in all kinds of organizations, as well as knowledge of the way in which businesses interact with their environment in the broadest sense. The course aims to train versatile professionals who can start their own business and also carry out a wide range of direction and management functions in business and private and public institutions.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1072',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1072'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11033). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 9.340. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored MATH-AA/MATH-AI SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Physics, Business and Business Models, Geography, Mathematics, Mathematics for the Social Sciences, Chemistry.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p0rt000p7mbxlbscxeo1',
      status: 'current',
      name: 'Chemistry',
      description:
        "The Bachelor's Degree in Chemistry addresses the following general objectives: To instil and consolidate interest in learning about chemistry. To provide a broad and solid base of chemical knowledge, and practical skills that can be applied to solving problems of chemistry. To provide the tools and means to facilitate the acquisition of valuable skills in any field of science. To provide fundamental knowledge and skills to enable further study, in both specialized and multidisciplinary areas.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1038',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1038'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11049). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 34 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 9.234. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored CHEM HL5, MATH-AA SL4, PHYS SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Physics, Mathematics, Chemistry.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p4iq002j7mbxz7aj6cil',
      status: 'current',
      name: 'Communication and Cultural Industries',
      description:
        'Provide an interdisciplinary education in the social sciences, arts, humanities, and communication technologies. Foster a critical, analytical, and reflective capacity regarding the communicative phenomenon, coupled with a humanistic, artistic, and technical understanding of the forms, processes, and trends in the different types of communication (oral, written, visual, audiovisual, and multimedia). Facilitate a basic and comprehensive understanding of the main events and messages that shape the current communicative and cultural landscape.',
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1135',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1135'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11117). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 9.094. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for 11 subjects; 0.1 for Musical Analysis, Performing Arts, Choir and Vocal Technique.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p1li00157mbxugmjgn29',
      status: 'current',
      name: 'Informatics Engineering',
      description:
        'What you will learn: The technological, scientific and socioeconomic principles of computer engineering and a versatile knowledge base in computing, including the following: computer systems and algorithms as computational processes, program and hardware design and design applications; the impact of this field on modern society. The skills to work in either of two particular areas: computer programming in general, and innovative problem solving tools in emerging areas of the labour market.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1148',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1148'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11122). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 34 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 9.590. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored MATH-AA HL5, PHYS SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Technical Drawing, Physics, Mathematics, Chemistry, Technology and Engineering; 0.1 for General Sciences, Business and Business Models. UB now lists the degree (Enginyeria Informàtica, code 11122) as the Bachelor\'s degree in Informatics Engineering, with 2026 mentions in Computing, Data Science and AI; the stored …g1077 is the older Computer Engineering plan.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p492002h7mbx7sn0o4j8',
      status: 'current',
      name: 'Criminology',
      description:
        'To learn how to carry out a systematic analysis and scientifically describe various criminal phenomena in current society. To develop in-depth knowledge of the main objectives of criminological analysis: crime, victims and social control. To train students in the scientific explanation of crime, based on knowledge and the use of criminological theories drawn from empirical evidence and scientific consensus. To train students to apply the knowledge they have gained in the analysis and prediction of crime risks in specific social situations and contexts.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1059',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1059'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11010). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 9.516. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for General Sciences, Business and Business Models, Geography, Latin, Mathematics, Mathematics for the Social Sciences.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p2po001p7mbxt4qc6xkq',
      status: 'current',
      name: 'Dentistry',
      description:
        'To train professionals who respond to the social demands of oral health, both in terms of prevention and diagnosis and treatment, in an ethical, efficient and safe manner through: The acquisition of knowledge, skills, attitudes and competences to become professional dentists. The capacity to efficiently use advanced knowledge and technology, and to understand the essential role of patients in therapeutic decision-making.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '5 years',
      minIBPoints: 40,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1047',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1047'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11044). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 40 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 12.430, above the 10 the access grade can reach, so IB applicants need weighted exam subjects to get in. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored BIO HL6, CHEM HL5, PHYS SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Physics, Chemistry.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p3hn00237mbx2uve81n0',
      status: 'current',
      name: 'Economics',
      description:
        'The general objectives are oriented to ensure that graduates acquire a comprehensive understanding of the functioning of the economy, both from a global and an individualized or sectoral perspective. It provides the reasoning mechanisms and appropriate instruments to understand and interpret the economic situation in any territorial area. Students develop the ability to understand and explain economic reality and the interrelationship between economy and society.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1115',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1115'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11103). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 9.230. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored MATH-AA/MATH-AI SL4, ECON SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Physics, Business and Business Models, Geography, Mathematics, Mathematics for the Social Sciences, Chemistry.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p9w7004d7mbxsejc429k',
      status: 'current',
      name: 'Education (Primary)',
      description:
        'This program trains future primary school teachers, providing pedagogical knowledge and practical teaching skills. Students study child development, curriculum design, and teaching methodologies across subject areas. The curriculum includes supervised classroom practice to prepare graduates for teaching careers.',
      field: 'Education',
      degree: 'Bachelor of Education',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1026',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1026'
      ],
      notes:
        "Catalonia's 2027 weighting table lists this degree (pre-enrolment code 11014). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 8.972. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams (\"no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account\"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for 21 subjects. The stored page (…g1034) is UB's page for Biochemistry; this degree's page is …g1026. web.ub.edu answers every client with 403, so the page codes come from the search index."
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p1y9001b7mbxdt18iu9m',
      status: 'current',
      name: 'Electronic Engineering and Telecommunications',
      description:
        'This program trains professionals in the field of electronic engineering and telecommunications, providing the knowledge and skills needed to design, implement and manage electronic systems and telecommunications networks. Students gain expertise in signal processing, embedded systems, communication networks, and electronic devices essential for modern technology industries.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1037',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1037'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11017). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 8.862. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored MATH-AA HL5, PHYS HL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Physics, Mathematics, Technology and Engineering; 0.1 for Technical Drawing, Chemistry.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p513002n7mbx80cwkcwc',
      status: 'current',
      name: 'English Studies',
      description:
        'This program provides comprehensive training in English language, literature, and culture. Students develop advanced proficiency in English while studying literary works from various periods and regions of the English-speaking world. The curriculum includes linguistics, cultural studies, and literary analysis, preparing graduates for careers in education, translation, publishing, and international communication.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1008',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1008'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11021). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 24 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 5.000. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for Spanish Literature, Catalan Literature, Dramatic Literature, Greek, Latin.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p5jy002r7mbxqvdxpigf',
      status: 'current',
      name: 'Fine Arts',
      description:
        'This program provides comprehensive training in visual arts, including painting, sculpture, graphic arts, photography, and digital media. Students develop artistic skills while studying art history, theory, and contemporary practices. The curriculum encourages creative experimentation and prepares graduates for careers as professional artists, art educators, curators, and creative professionals.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1107',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1107'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11099). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 24 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 8.172. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for 10 subjects.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p8md00437mbxewt32jdn',
      status: 'current',
      name: 'Geography and Global Change',
      description:
        'This program provides comprehensive training in physical and human geography. Students study spatial patterns, environmental systems, and human-environment interactions. The curriculum combines fieldwork with GIS technology, preparing graduates for careers in urban planning, environmental management, and spatial analysis.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1124',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1124'
      ],
      notes:
        "Catalonia's 2027 weighting table lists this degree (pre-enrolment code 11108). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 5.842. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams (\"no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account\"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for Geography, Geology and Environmental Sciences, Latin, Mathematics, Mathematics for the Social Sciences; 0.1 for Biology, Artistic Drawing, Artistic Foundations, Business and Business Models, History of Music and Dance, History of Art, Greek, Cultural and Artistic Movements. The stored page (…g1018) is UB's page for Sociology; this degree's page is …g1124. web.ub.edu answers every client with 403, so the page codes come from the search index. UB replaced its Geography degree with Geography and Global Change (Geografia i Canvi Global), the only UB geography degree in the 2026 cut-offs and the 2027 table."
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p869003t7mbxejcn6aek',
      status: 'current',
      name: 'Geology',
      description:
        'This program provides training in Earth sciences, including mineralogy, petrology, paleontology, and environmental geology. Students learn to analyze geological processes and formations while developing field and laboratory skills. The curriculum prepares graduates for careers in natural resource management, environmental consulting, and research.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1043',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1043'
      ],
      notes:
        "Catalonia's 2027 weighting table lists this degree (pre-enrolment code 11032). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 6.362. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams (\"no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account\"). The stored MATH-AA SL4, BIO/CHEM/PHYS SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Physics, Geology and Environmental Sciences, Mathematics, Chemistry; 0.1 for Biology, General Sciences. The stored page (…g1027) is UB's page for Social Work; this degree's page is …g1043. web.ub.edu answers every client with 403, so the page codes come from the search index."
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p8vo00457mbxedfs84sk',
      status: 'current',
      name: 'History',
      description:
        'This program provides comprehensive training in historical research and analysis. Students study various historical periods and regions while developing critical thinking and research skills. The curriculum prepares graduates for careers in education, museums, archives, cultural heritage, and public administration.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1016',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1016'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11035). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 24 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 5.000. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for Artistic Foundations, History of Art, Greek, Latin, Cultural and Artistic Movements; 0.1 for Geography. The stored page (…g1025) is not this degree\'s in the search index; its page is …g1016. web.ub.edu answers every client with 403, so the page codes come from the search index.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p94s00477mbxz6zgo0qo',
      status: 'current',
      name: 'History of Art',
      description:
        'This program provides comprehensive training in art history and visual culture. Students study artworks from various periods and cultures while developing analytical and critical skills. The curriculum prepares graduates for careers in museums, galleries, cultural heritage management, art criticism, and education.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1017',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1017'
      ],
      notes:
        "Catalonia's 2027 weighting table lists this degree (pre-enrolment code 11034). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 24 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 5.000. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams (\"no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account\"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for 9 subjects; 0.1 for Geography. The stored page (…g1026) is UB's page for Teacher in Primary Education; this degree's page is …g1017. web.ub.edu answers every client with 403, so the page codes come from the search index."
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p3wd002b7mbxxvnib8od',
      status: 'current',
      name: 'International Business',
      description:
        'This program prepares students for careers in international business management, focusing on global markets, cross-cultural management, and international trade. Students develop skills in strategic management, international finance, and global marketing while gaining proficiency in multiple languages and understanding of diverse business environments worldwide.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1080',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1080'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11073). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 36 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 11.290, above the 10 the access grade can reach, so IB applicants need weighted exam subjects to get in. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored MATH-AA/MATH-AI SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Business and Business Models, Geography, Latin, Mathematics, Mathematics for the Social Sciences; 0.1 for Biology, Physics, Chemistry.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p4ry002l7mbx38wu8y8s',
      status: 'current',
      name: 'Law',
      description:
        'This program provides comprehensive training in legal studies, covering constitutional law, civil law, criminal law, administrative law, international law, and European Union law. Students develop analytical, argumentative, and problem-solving skills essential for legal practice. The curriculum prepares graduates for careers in law firms, public administration, judiciary, legal consultancy, and international organizations.',
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1055',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1055'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11012). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 9.736. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for Business and Business Models, Latin, Mathematics, Mathematics for the Social Sciences; 0.1 for Geography, Greek.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p5aj002p7mbxsdis2kqk',
      status: 'current',
      name: 'Linguistics',
      description:
        'This program explores the scientific study of human language, including phonetics, phonology, morphology, syntax, semantics, and pragmatics. Students learn to analyze language structure and use across different languages and contexts. The curriculum prepares graduates for careers in computational linguistics, language technology, translation, language teaching, and research.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1010',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1010'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11039). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 24 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 5.000. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for Spanish Literature, Catalan Literature, Greek, Latin; 0.1 for Dramatic Literature.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p5t8002t7mbxr635en9a',
      status: 'current',
      name: 'Marine Sciences',
      description:
        'This program provides comprehensive training in the study of oceans and marine ecosystems. Students learn about marine biology, oceanography, marine geology, and coastal management. The curriculum combines field work with laboratory research to prepare graduates for careers in marine research, environmental consulting, fisheries management, and conservation organizations.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1085',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1085'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11077). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 34 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 9.744. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored BIO HL5, CHEM SL4, MATH-AA SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, General Sciences, Physics, Geology and Environmental Sciences, Mathematics, Chemistry.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p2b2001h7mbx3ja3ttlf',
      status: 'current',
      name: 'Materials Engineering',
      description:
        'This program focuses on the study, development and application of materials across multiple industries. Students learn about the properties, processing and applications of metals, ceramics, polymers and composite materials. The curriculum combines fundamental science with engineering principles to prepare graduates for careers in manufacturing, research and development, and quality control.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1040',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1040'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11060). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 30 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 8.500. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored MATH-AA HL4, PHYS SL4, CHEM SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Physics, Mathematics, Chemistry, Technology and Engineering.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p68a00317mbx6sr6nsrt',
      status: 'current',
      name: 'Mathematics',
      description:
        'This program provides rigorous training in pure and applied mathematics. Students develop deep understanding of mathematical structures, proofs, and problem-solving techniques across areas including algebra, analysis, geometry, and probability. The curriculum prepares graduates for careers in research, finance, data science, and education.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1042',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1042'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11123). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 34 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 11.870, above the 10 the access grade can reach, so IB applicants need weighted exam subjects to get in. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored MATH-AA HL6 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Physics, Mathematics, Mathematics for the Social Sciences; 0.1 for Biology, General Sciences, Geology and Environmental Sciences, Chemistry, Technology and Engineering.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p6w0003b7mbxy5jdsb1b',
      status: 'current',
      name: 'Pharmacy',
      description:
        'This program trains professionals in pharmaceutical sciences, including drug development, pharmacology, and clinical pharmacy. Students learn about drug formulation, therapeutic interventions, and healthcare management. The curriculum prepares graduates for careers in community and hospital pharmacies, pharmaceutical industry, and research.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Pharmacy',
      duration: '5 years',
      minIBPoints: 40,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1051',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1051'
      ],
      notes:
        "Catalonia's 2027 weighting table lists this degree (pre-enrolment code 11024). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 40 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 11.034, above the 10 the access grade can reach, so IB applicants need weighted exam subjects to get in. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams (\"no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account\"). The stored BIO HL5, CHEM HL5, MATH-AA SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Physics, Mathematics, Chemistry. The stored page (…g1060) is UB's page for Philosophy; this degree's page is …g1051. web.ub.edu answers every client with 403, so the page codes come from the search index."
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p9dt00497mbxbr2xqjme',
      status: 'current',
      name: 'Philosophy',
      description:
        'This program provides rigorous training in philosophical reasoning and analysis. Students study major philosophical traditions and develop critical thinking skills applicable across disciplines. The curriculum prepares graduates for careers in education, ethics consulting, publishing, and further academic study.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1060',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1060'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 11061). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 24 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 5.000. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for Artistic Foundations, History of Art, Greek, Latin, Cultural and Artistic Movements; 0.1 for Musical Analysis, Performing Arts, General Sciences, Choir and Vocal Technique. The stored page (…g1067) is not this degree\'s in the search index; its page is …g1060. web.ub.edu answers every client with 403, so the page codes come from the search index.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p6jf00357mbx3muonxus',
      status: 'current',
      name: 'Physics',
      description:
        'This program provides comprehensive training in theoretical and experimental physics. Students develop understanding of fundamental physical principles from classical mechanics to quantum physics and relativity. The curriculum emphasizes mathematical skills and experimental techniques, preparing graduates for careers in research, technology, and industry.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1035',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1035'
      ],
      notes:
        "Catalonia's 2027 weighting table lists this degree (pre-enrolment code 11030). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 34 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 11.610, above the 10 the access grade can reach, so IB applicants need weighted exam subjects to get in. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams (\"no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account\"). The stored MATH-AA HL5, PHYS HL5 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Physics, Mathematics, Chemistry; 0.1 for Biology, Technical Drawing, Geology and Environmental Sciences, Technology and Engineering. The stored page (…g1046) is UB's page for Medicine; this degree's page is …g1035. web.ub.edu answers every client with 403, so the page codes come from the search index."
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p7x4003r7mbxxbl6af69',
      status: 'current',
      name: 'Political Science',
      description:
        'This program provides comprehensive training in political theory, comparative politics, and international relations. Students analyze political systems, institutions, and processes at local, national, and international levels. The curriculum prepares graduates for careers in government, international organizations, NGOs, and political consultancy.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1058',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1058'
      ],
      notes:
        "Catalonia's 2027 weighting table lists this degree (pre-enrolment code 11121). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 8.790. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams (\"no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account\"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for Business and Business Models, Geography, Greek, Latin, Mathematics, Mathematics for the Social Sciences; 0.1 for Artistic Foundations. The stored page (…g1048) is UB's page for Psychology; this degree's page is …g1058. web.ub.edu answers every client with 403, so the page codes come from the search index."
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p7aw003j7mbxagm8i61g',
      status: 'current',
      name: 'Psychology',
      description:
        'This program provides comprehensive training in psychological science and practice. Students study cognitive, social, developmental, and clinical psychology while developing research skills. The curriculum prepares graduates for careers in clinical settings, organizational psychology, education, and research.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1048',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1048'
      ],
      notes:
        "Catalonia's 2027 weighting table lists this degree (pre-enrolment code 11047). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 36 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 9.660. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams (\"no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account\"). The stored MATH-AA/MATH-AI SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Mathematics, Mathematics for the Social Sciences; 0.1 for Physics, Business and Business Models, Chemistry. The stored page (…g1035) is UB's page for Physics; this degree's page is …g1048. web.ub.edu answers every client with 403, so the page codes come from the search index."
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42pa5c004f7mbx8f8anar1',
      status: 'current',
      name: 'Social Work',
      description:
        'This program trains professionals to support individuals, families and communities facing social challenges. Students learn intervention techniques, social policy analysis, and community development. The curriculum includes field placements to prepare graduates for careers in social services, healthcare, and community organizations.',
      field: 'Social Sciences',
      degree: 'Bachelor of Social Work',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1027',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1027'
      ],
      notes:
        "Catalonia's 2027 weighting table lists this degree (pre-enrolment code 11051). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 7.818. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams (\"no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account\"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for General Sciences, Business and Business Models, Geography, Latin, Mathematics, Mathematics for the Social Sciences, Cultural and Artistic Movements. The stored page (…g1134) is UB's page for Bioinformatics; this degree's page is …g1027. web.ub.edu answers every client with 403, so the page codes come from the search index."
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p7ny003p7mbxyaa6i3xt',
      status: 'current',
      name: 'Sociology',
      description:
        'This program provides comprehensive training in sociological theory and research methods. Students analyze social structures, institutions, and processes while developing critical thinking and analytical skills. The curriculum prepares graduates for careers in social research, public policy, community development, and organizations.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1018',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1018'
      ],
      notes:
        "Catalonia's 2027 weighting table lists this degree (pre-enrolment code 11063). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 7.810. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams (\"no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account\"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for 10 subjects; 0.1 for Cultural and Artistic Movements. The stored page (…g1058) is UB's page for Political and Administrative Sciences; this degree's page is …g1018. web.ub.edu answers every client with 403, so the page codes come from the search index."
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk42p9n9004b7mbxhh3tv66i',
      status: 'current',
      name: 'Tourism',
      description:
        'This program provides comprehensive training in tourism management and hospitality. Students study destination management, sustainable tourism, and tourism economics while developing practical skills. The curriculum prepares graduates for careers in tourism planning, hotel management, travel agencies, and cultural tourism.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1063',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://web.ub.edu/en/web/estudis/w/bachelordegree-g1063'
      ],
      notes:
        "Catalonia's 2027 weighting table lists this degree (pre-enrolment code 11011). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 5.000. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams (\"no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account\"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for 10 subjects; 0.1 for Musical Analysis, Performing Arts. The stored page (…g1102) is UB's page for Audiovisual Communication; this degree's page is …g1063. web.ub.edu answers every client with 403, so the page codes come from the search index. Taught at CETT, a UB-affiliated centre, which can also be studied in English."
    }
  ]
}

export default refresh
