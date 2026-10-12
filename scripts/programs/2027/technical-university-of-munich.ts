import type { RefreshFile } from '../lib/refresh'
import type { RequirementDef } from '../lib/requirements-diff'

/**
 * Technical University of Munich: requirements for 2027 entry.
 *
 * Exported from the database on 2026-10-07 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Exported on 7 October 2026 for content task 8.1, to re-file programs under the fields of
 * study: every program here is unchecked, so only a changed `field` is written. Phase 7 (Germany)
 * decides how these programs are checked.
 *
 * Content 7, Part B1 (12 October 2026): checked under the German model the owner chose on 12 October
 * 2026 (docs/tasks/content-2027/germany-model-decision.md). minIBPoints is 24, the KMK's floor: its IB agreement
 * recognises the Diploma with a 4 or better in all six subjects. Rows only for real requirements: a KMK science and a
 * KMK social science on every program that admits on the KMK conditions; maths AA or AI at HL on maths, science and
 * technical programs (the Bavarian recognition office's list, ZASt, March 2026; the borderline calls are in each
 * program's notes); German A at HL on German-taught programs (TUM: "only an IB with German A as Higher Level is
 * recognized as proof of German language skills"); German A or B at HL, not critical, for Aerospace and Information
 * Engineering. Each description ends with how TUM decides, from the program's page and its statute. The template
 * rows of January 2026 (36/38 points, German B HL 5 on every program) had no TUM source and are gone.
 *
 * Stamped 2026: TUM's pages and statutes name no intake. The SIT joint degrees are stamped 2027 (TUM Asia: "Next
 * intake September 2027"); after the apply they move to the Singapore Institute of Technology (decision 8). Geodesy
 * and Geoinformation is closed to new applicants and reported as discontinued; Bioeconomics (decision 7) is not added,
 * as its page says "New applications are only possible for Bioeconomy".
 *
 * Dry run: npx tsx scripts/programs/refresh.ts technical-university-of-munich
 */

/** Read on 12 October 2026. */
const IB_PAGE =
  'https://www.tum.de/en/studies/application/application-info-portal/applicants-with-international-baccalaureate'
const LANGUAGE_PAGE =
  'https://www.tum.de/en/studies/application/application-info-portal/admission-requirements/language-certificates'
const KMK_AGREEMENT =
  'https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/aktuell/283_Vereinb_Anerkenn_Int_Baccalaureate_Diploma-2023-06-15_Liste1__2026-03-26_Liste2-2026-05-22.pdf'
/** The Bavarian recognition office's IB sheet (March 2026), which names the subjects that need maths at HL. */
const ZAST =
  'https://cms-cdn.lmu.de/media/lmu/downloads/studium/internationale-studierende/merkblatt-ib.pdf'
const SOURCES = [IB_PAGE, LANGUAGE_PAGE, KMK_AGREEMENT, ZAST]

const TUM_ASIA_CHE = 'https://tum-asia.edu.sg/undergraduate-studies/chemical-engineering/'
const TUM_ASIA_EDDE =
  'https://tum-asia.edu.sg/undergraduate-studies/electronics-and-data-engineering/'
const SALZBURG_ADMISSION =
  'https://www.plus.ac.at/studium/vor-dem-studium-3/zulassungsvoraussetzungen/bachelorstudium/?lang=en'
const SALZBURG_PROGRAM =
  'https://www.plus.ac.at/studium/studienangebot/bachelors-degree-programmes/engineering/?lang=en'
const LMU_BIOINFORMATICS =
  'https://www.lmu.de/de/studium/studienangebot/alle-studienfaecher-und-studiengaenge/bioinformatik-bachelor-hauptfach-2855.html'
const LMU_BIOINFORMATICS_NC =
  'https://www.bio.ifi.lmu.de/studium/studiengaenge_bioinformatik/bachelor/'

/** KMK 1a: Biology, Chemistry or Physics. */
const KMK_SCIENCE: RequirementDef = {
  courses: ['BIO', 'CHEM', 'PHYS'],
  level: 'SL',
  grade: 4,
  critical: true
}
/** KMK 1a: the agreement's eight social sciences. */
const KMK_SOCIAL_SCIENCE: RequirementDef = {
  courses: ['HIST', 'GEOG', 'ECON', 'PSYCH', 'PHIL', 'ANTHRO', 'BUS-MGMT', 'GLOB-POL'],
  level: 'SL',
  grade: 4,
  critical: true
}
/** KMK footnote 3: maths at SL opens only subjects outside maths, science and engineering. */
const MATHS_HL: RequirementDef = {
  courses: ['MATH-AA', 'MATH-AI'],
  level: 'HL',
  grade: 4,
  critical: true
}
/** TUM: "only an IB with German A as Higher Level is recognized as proof of German language skills". */
const GERMAN_A_HL: RequirementDef = {
  courses: ['GER-LIT', 'GER-LL'],
  level: 'HL',
  grade: 4,
  critical: true
}
/** TUM's language page, Aerospace and Information Engineering only: German B HL counts too, as do A2 certificates. */
const GERMAN_A_OR_B_HL: RequirementDef = {
  courses: ['GER-LIT', 'GER-LL', 'GER-B'],
  level: 'HL',
  grade: 4,
  critical: false
}

const NOTES =
  "Content 7 (Part B1, 12 October 2026): German model (a), owner, 12 October 2026. minIBPoints 24: the KMK's IB agreement (as amended 15 June 2023) recognises the Diploma with a 4 or better in all six subjects; TUM's IB page applies it, through a uni-assist VPD or a ZASt notification. Rows: a KMK science and a KMK social science (critical). Not modelled: the KMK's HL rule (a language, maths or a science at HL), the grade-3 offset, the language pair, and the 348 schools whose maths SL counts as HL. The stored 36/38 and the German B HL 5, Maths HL 5 and Physics HL 5 rows came from the January 2026 field templates (commit fe15f2d) and had no TUM source. Stamped 2026: the program page, the IB page and the statute name no intake (TUM's dates page lists winter semester 2027/28 lecture dates, not requirements). The description ends with how TUM decides: update it when TUM amends the statute."

const SIT_NOTES =
  "Content 7 (Part B1, 12 October 2026): joint degree of TUM and the Singapore Institute of Technology, taught in Singapore and applied for through SIT's portal. TUM Asia's program page states the IB conditions (the KMK's, with maths at HL) and the next intake, September 2027, so stamped 2027. minIBPoints 24 and the KMK rows as for TUM. After the apply it moves to SIT (decision 8)."

const EMS_NOTES =
  "Content 7 (Part B1, 12 October 2026): joint degree with the University of Salzburg, applied for and enrolled at Salzburg under Austrian rules. Checked, none required: Salzburg accepts the IB Diploma (24) for EU and EEA applicants, sets no numerus clausus, and asks for German at B2, which the description says. Stamped 2026: Salzburg's pages name no intake."

/** A program's description, ending with how TUM decides. */
const described = (text: string, closing: string) => `${text}\n\n${closing}`

const refresh: RefreshFile = {
  university: 'Technical University of Munich',
  entryYear: 2027,
  checkedOn: '2026-10-12',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraesrw00017mjvod7hjlpw',
      status: 'current',
      name: 'Aerospace',
      description: described(
        'Start your personal "Mission Earth" with the Bachelor\'s Program Aerospace. This study degree program of 6 semesters (3 years) is fully taught in English and is the ideal entry to the global topic of aeronautics and astronautics.',
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 50% and your grades in maths (×3), English and a science or computer science (×2) at 50%. A score of 80 or more admits you, 70 or less does not, and in between you are invited to an interview. On TUM's formula, with 6s in those subjects, an IB total of 36 or more passes outright, and 30 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in English, and TUM checks your English in the aptitude assessment. TUM also asks for basic German: German A or B at HL, or a certificate such as Goethe-Zertifikat A2."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Garching',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/aerospace-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_OR_B_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/aerospace-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/user_upload_87/gi32rab/Aerospace_BA_EFV_Neufassung_270524.PDF',
        ...SOURCES
      ],
      notes:
        NOTES +
        " Maths HL: a technical subject in the Bavarian recognition office's list (ZASt, March 2026: \"Technische Fächer\"). Aptitude assessment from the statute: 50% converted grade, 50% subject grades (maths (×3), English and a science or computer science (×2)); pass 80, refused at or below 70; second stage an interview. The paragraph's IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points. German: TUM's language page accepts German B HL, DSH-1, TestDaF 3, Goethe or ÖSD A2 or telc A2 for this program only; not critical, as an A2 certificate is a short route."
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafc5s00en7mjvgyl1icl5',
      status: 'current',
      name: 'Agricultural Sciences and Horticultural Sciences',
      description: described(
        "The bachelor's program in Agricultural Sciences and Horticultural Sciences deals with processes of plant and animal production, and associated fundamentals relating to the natural sciences, economics, and ecology.",
        "How TUM decides: open admission. Every applicant whose IB meets Germany's conditions is admitted, with no selection. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Freising',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/agricultural-and-horticultural-sciences-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/agricultural-and-horticultural-sciences-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL, for the owner: agricultural sciences are not in the Bavarian recognition office\'s list (ZASt, March 2026, "a selection"); filed with the natural sciences it names (environmental, nutrition).'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmkrafx5400ux7mjvkm022v0s',
      status: 'current',
      name: 'Architecture',
      description: described(
        "The bachelor's degree program in Architecture provides a sound foundation in the knowledge and techniques required for the fields in which modern architects work today.",
        "How TUM decides: an aptitude assessment with a test. Everyone takes a 90-minute written and drawing test, set mostly in German. TUM adds half your IB total, converted to a German grade, to half your test score: a score of 70 or more out of 100 admits you, and 69 or less does not. On TUM's formula, an IB total of 38 brings 44 points, so you would need 51 of 100 in the test (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/architecture-bachelor-of-arts-ba',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/architecture-bachelor-of-arts-ba',
        'https://www.tum.de/fileadmin/w00bfo/www/Studium/Studienangebot/Lesbare_Fassung/Bachelor/Architektur_BA_EFV_Lesb._Fassung_09042026.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        " Maths HL: architecture, a technical subject in the Bavarian recognition office's list (ZASt, March 2026). Aptitude assessment from the statute: 50% converted grade, 50% test; 70 or more passes, 69 or fewer fails. The test score needed is calculated."
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafful00hh7mjvs129xbi0',
      status: 'current',
      name: 'Biochemistry',
      description: described(
        "The bachelor's program in Biochemistry links chemistry and biology as well as traversing the interface between chemistry, biology, and medicine.",
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 50% and your grades in maths (×2), English and your best science (×2) at 30%, and relevant training or extra qualifications at 20%. A score of 95 or more admits you, 66 or less does not, and in between you are invited to an interview. On TUM's formula, with 6s in those subjects and no relevant training or extra qualifications, no IB total passes outright, so expect an interview, and 37 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Garching',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/biochemistry-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/biochemistry-bachelor-of-science-bsc',
        'https://portal.mytum.de/archiv/kompendium_rechtsangelegenheiten/eignungsfeststellungssatzungen/2010-13-EfV-Satzg-BA-Biochemie-FINAL-1-04-10.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science in the Bavarian recognition office\'s list (ZASt, March 2026: "Mathematik und Naturwissenschaften"). Aptitude assessment from the statute: 50% converted grade, 30% subject grades (maths (×2), English and your best science (×2)), 20% relevant training or extra qualifications; pass 95, refused at or below 66; second stage an interview. The paragraph\'s IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points.'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafufk00st7mjv4mz4qism',
      status: 'current',
      name: 'Bioeconomy',
      description: described(
        "In light of the climate crisis, scarcity of raw materials, and changing consumer behavior, the shift towards a sustainable resource and technology management is imperative. Students of the Bachelor's program in Bioeconomy learn to shape the social and economic transformation towards sustainability.",
        'How TUM decides: an aptitude recommendation. Taking part is compulsory, but its result does not affect admission: with a high enough score from your grades you are admitted straight away, and otherwise after an interview. Teaching is mainly in English; some modules may be in German.'
      ),
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Straubing',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/bioeconomy-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/bioeconomy-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/w00bfo/www/Studium/Studienangebot/Lesbare_Fassung/Bachelor/Bioeconomy_BA_SOV_22042025.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL, for the owner: bioeconomy joins natural sciences and economics, and is not in the Bavarian recognition office\'s list (ZASt, March 2026). Aptitude recommendation (SOV): the statute says its result "hat keine Auswirkung auf den Hochschulzugang".'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafqrz00pz7mjvlsevgslu',
      status: 'current',
      name: 'Bioinformatics',
      description: described(
        "Health, pharma, and biotechnology are of outstanding social and economic importance – and they rely on the systematic processing of biological data. Students on the Bachelor's degree program in Bioinformatics learn to analyze this data and to make it applicable.",
        'How it is decided: places are limited (a local numerus clausus) and allocated by LMU, which runs the program with TUM and enrolls students for both. LMU publishes no cut-off on its program pages. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/bioinformatics-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/bioinformatics-bachelor-of-science-bsc',
        LMU_BIOINFORMATICS,
        LMU_BIOINFORMATICS_NC,
        ...SOURCES
      ],
      notes:
        NOTES +
        " Maths HL: computer science, a technical subject in the Bavarian recognition office's list (ZASt, March 2026). Local NC at LMU since winter semester 2022/23 (LMU Bioinformatics pages); taught mostly in German."
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraeyh300477mjvlwgz7j4m',
      status: 'current',
      name: 'Brewing and Beverage Technology',
      description: described(
        "The Bachelor's program Brewing and Beverage Technology deals with the engineering, biological, technological and biochemical processes of beverage production and brewing.",
        "How TUM decides: open admission. Every applicant whose IB meets Germany's conditions is admitted, with no selection. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Freising',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/brewing-and-beverage-technology-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/brewing-and-beverage-technology-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a technical subject in the Bavarian recognition office\'s list (ZASt, March 2026: "Technische Fächer").'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafem200gj7mjvkq16j80p',
      status: 'current',
      name: 'Chemical Biotechnology',
      description: described(
        "Chemical biotechnology is key in the sustainable and resource-conserving design of goods and value chains. Students of the Bachelor's degree program in Chemical Biotechnology learn to understand and analyze biogenic materials, tools, and processes and to put them to use for industrial purposes.",
        "How TUM decides: open admission. Every applicant whose IB meets Germany's conditions is admitted, with no selection. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Straubing',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/chemical-biotechnology-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/chemical-biotechnology-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science in the Bavarian recognition office\'s list (ZASt, March 2026: "Mathematik und Naturwissenschaften").'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraewab002j7mjv7xrwzyom',
      status: 'current',
      name: 'Chemical Engineering',
      description: described(
        "The bachelor's program in Chemical Engineering traverses the interface between the natural sciences and engineering.",
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 50% and your grades in maths (×3) and your best science (×2) at 50%. A score of 80 or more admits you, 64 or less does not, and in between you are invited to an interview. On TUM's formula, with 6s in those subjects, an IB total of 36 or more passes outright, and 26 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Garching',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/chemical-engineering-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/chemical-engineering-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/w00bfo/www/Studium/Studienangebot/Lesbare_Fassung/Bachelor/Chemieingenieurwesen_BA_EFV_21122023.PDF',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a technical subject in the Bavarian recognition office\'s list (ZASt, March 2026: "Technische Fächer"). Aptitude assessment from the statute: 50% converted grade, 50% subject grades (maths (×3) and your best science (×2)); pass 80, refused at or below 64; second stage an interview. The paragraph\'s IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points.'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Engineering (B.Eng.)".
    {
      id: 'cmkraexci003d7mjvujybfiyj',
      status: 'current',
      name: 'Chemical Engineering (Joint Degree with SIT)',
      description: described(
        'Jointly awarded by TUM and Singapore Institute of Technology (SIT), the Bachelor of Engineering with Honours in Chemical Engineering is a four-year degree program. This joint degree equips students with relevant Industry 4.0 skillsets to thrive in the local and global chemical industry.',
        "How it is decided: you apply through the Singapore Institute of Technology's portal, from mid-January to mid-March, for the September 2027 intake. TUM Asia, which teaches the program with SIT, applies Germany's IB conditions, with maths at HL. Teaching is in English, in Singapore."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      campusCity: 'Singapore',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/chemical-engineering-bachelor-of-engineering-beng',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2027,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/chemical-engineering-bachelor-of-engineering-beng',
        TUM_ASIA_CHE,
        KMK_AGREEMENT
      ],
      notes:
        SIT_NOTES +
        ' Maths HL: TUM Asia\'s IB conditions for the joint degree ("1 Mathematics subject in HL").'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafddd00fl7mjv9uyk4bkg',
      status: 'current',
      name: 'Chemistry',
      description: described(
        "The bachelor's degree in Chemistry offers a well founded education in a broad range of chemical disciplines.",
        'How TUM decides: an aptitude recommendation. Taking part is compulsory, but its result does not affect admission: with a high enough score from your grades you are admitted straight away, and otherwise after an interview. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Garching',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/chemistry-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/chemistry-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science in the Bavarian recognition office\'s list (ZASt, March 2026: "Mathematik und Naturwissenschaften"). Aptitude recommendation (SOV): the statute says its result "hat keine Auswirkung auf den Hochschulzugang".'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraev4l001p7mjvftousj62',
      status: 'current',
      name: 'Civil Engineering',
      description: described(
        "Whether it's climate-friendly construction, sustainable mobility, or attractive living spaces – the challenges of our time cannot be met without outstanding civil engineers. In this program, students learn to develop safe, economical, and sustainable structures and infrastructures.",
        "How TUM decides: open admission. Every applicant whose IB meets Germany's conditions is admitted, with no selection. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/civil-engineering-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/civil-engineering-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a technical subject in the Bavarian recognition office\'s list (ZASt, March 2026: "Technische Fächer").'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraetys000v7mjvetnfie2y',
      status: 'current',
      name: 'Electrical Engineering and Information Technology',
      description: described(
        'Industry 4.0, chip design or AI – innovations to solve key challenges are unthinkable without Electrical Engineering and Information Technology. Students on the course learn to develop, design and manufacture devices, equipment and systems according to the specific requirements.',
        "How TUM decides: open admission. Every applicant whose IB meets Germany's conditions is admitted, with no selection. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/electrical-engineering-and-information-technology-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/electrical-engineering-and-information-technology-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a technical subject in the Bavarian recognition office\'s list (ZASt, March 2026: "Technische Fächer").'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Engineering (B.Eng.)".
    {
      id: 'cmkraezlf00517mjvalf8bv2n',
      status: 'current',
      name: 'Electronics and Data Engineering (Joint Degree with SIT)',
      description: described(
        'Jointly awarded by TUM and Singapore Institute of Technology (SIT), the Bachelor of Engineering with Honours in Electronics and Data Engineering is a four-year degree programme. This programme is aimed to equip students with the necessary skills and competencies in the emerging digital workforce.',
        "How it is decided: you apply through the Singapore Institute of Technology's portal, from mid-January to mid-March, for the September 2027 intake. TUM Asia, which teaches the program with SIT, applies Germany's IB conditions, with maths at HL. Teaching is in English, in Singapore."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      campusCity: 'Singapore',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/electronics-and-data-engineering-bachelor-of-engineering-beng',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2027,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/electronics-and-data-engineering-bachelor-of-engineering-beng',
        TUM_ASIA_EDDE,
        KMK_AGREEMENT
      ],
      notes:
        SIT_NOTES +
        ' Maths HL: TUM Asia\'s IB conditions for the joint degree ("1 Mathematics subject in HL").'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf0pq005v7mjvjcpc13si',
      status: 'current',
      name: 'Engineering and Materials Science',
      description: described(
        'The optimal use of materials and the development of new ones are essential to develop products that meet increasing demands in terms of performance, functionality, and sustainability. Students of the program learn to investigate, develop, and use innovative materials in line with these requirements.',
        'How it is decided: you apply to and enroll at the University of Salzburg, which runs this joint degree with TUM, under Austrian rules. Salzburg accepts the IB Diploma, has no numerus clausus, and asks for German at B2.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/engineering-and-materials-science-bachelor-of-science-bsc',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/engineering-and-materials-science-bachelor-of-science-bsc',
        SALZBURG_ADMISSION,
        SALZBURG_PROGRAM
      ],
      notes:
        EMS_NOTES +
        ' No KMK rows: applied for and enrolled at the University of Salzburg, under Austrian rules.'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf1rd006p7mjvyf84y4iy',
      status: 'current',
      name: 'Engineering Science',
      description: described(
        "The Bachelor's program in Engineering Science conveys broad foundational knowledge of the discipline as well as thorough knowledge of mathematics and the natural sciences.",
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 65% and your grades in maths (×2), German, English and each science you took (computer science included) at 35%. A score of 82 or more admits you, 74 or less does not, and in between you are invited to an interview. On TUM's formula, with 6s in those subjects, an IB total of 37 or more passes outright, and 33 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Garching',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/engineering-science-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/engineering-science-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/user_upload_87/gi32rab/Ingenieurwiss._Eng._Sc._BA_EFV_Neufassung_270524.PDF',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a technical subject in the Bavarian recognition office\'s list (ZASt, March 2026: "Technische Fächer"). Aptitude assessment from the statute: 65% converted grade, 35% subject grades (maths (×2), German, English and each science you took (computer science included)); pass 82, refused at or below 74; second stage an interview. The paragraph\'s IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points.'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf2vm007j7mjv16rwrwxm',
      status: 'current',
      name: 'Environmental Engineering',
      description: described(
        "The bachelor's degree program in Environmental Engineering combines a profound education in the engineering and natural sciences with interdisciplinary skills focused on the environment.",
        "How TUM decides: open admission. Every applicant whose IB meets Germany's conditions is admitted, with no selection. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/environmental-engineering-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/environmental-engineering-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a technical subject in the Bavarian recognition office\'s list (ZASt, March 2026: "Technische Fächer").'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafh2a00if7mjvf6p1vm4h',
      status: 'current',
      name: 'Food Chemistry',
      description: described(
        "The bachelor's program in Food Chemistry is devoted to the development of strategies that meet the increasing need for healthy food and food security. The program also combines knowledge of the natural sciences with the life sciences.",
        'How TUM decides: an aptitude recommendation. Taking part is compulsory, but its result does not affect admission: with a high enough score from your grades you are admitted straight away, and otherwise after an interview. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Freising',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/food-chemistry-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/food-chemistry-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science in the Bavarian recognition office\'s list (ZASt, March 2026: "Mathematik und Naturwissenschaften"). Aptitude recommendation (SOV): the statute says its result "hat keine Auswirkung auf den Hochschulzugang".'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf410008d7mjvqrect2we',
      status: 'current',
      name: 'Food Technology',
      description: described(
        "The Bachelor's program Food Technology deals with the engineering, biological, technological and biochemical processes of the entire value chain in food production. In addition, economic aspects are covered.",
        "How TUM decides: open admission. Every applicant whose IB meets Germany's conditions is admitted, with no selection. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Freising',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/food-technology-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/food-technology-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a technical subject in the Bavarian recognition office\'s list (ZASt, March 2026: "Technische Fächer").'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafvt900tv7mjvsbjcq384',
      status: 'current',
      name: 'Forest Science and Resource Management',
      description: described(
        'The program aims to teach students how to make sustainable use of resources, with reference to the example of the forest and wood as a renewable resource. In addition to well-founded specialist knowledge, this demands a comprehensive understanding of systems and extensive methodological competencies',
        "How TUM decides: open admission. Every applicant whose IB meets Germany's conditions is admitted, with no selection. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Freising',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/forest-science-and-resource-management-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/forest-science-and-resource-management-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL, for the owner: forest science is not in the Bavarian recognition office\'s list (ZASt, March 2026, "a selection"); filed with the environmental sciences it names.'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    // Content 7 B1, 12 October 2026: TUM's page says "The Bachelor's program in Geodesy and Geoinformation is
    // being transitioned into the new Bachelor's program in Geodesy and Earth Observation. New applications are only
    // possible for Geodesy and Earth Observation." Reported for the owner (rule 3); its successor is added below.
    {
      id: 'cmkraf55100977mjvrgd95dl7',
      status: 'discontinued',
      name: 'Geodesy and Geoinformation',
      description:
        "The bachelor's program in Geodesy deals with the documentation of the anthroposphere through the use of surveys conducted at ground level, from the air and from outer space, as well as with the processing and representation of geoinformation.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/geodesy-and-geoinformation-bachelor-of-science-bsc',
      requirements: [],
      checkedFor: null,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/geodesy-and-geoinformation-bachelor-of-science-bsc'
      ],
      notes:
        'Discontinued: replaced by Geodesy and Earth Observation (taught in English). For the owner to delete.'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafkpc00l97mjvo5pe8bgy',
      status: 'current',
      name: 'Geosciences',
      description: described(
        "The Bachelor's program in Geoscience is a joint program of the Technical University of Munich and Ludwig-Maximilians-University Munich. In addition to comprehensive knowledge of the fundamentals, the program offers students the opportunity to specialize.",
        "How TUM decides: open admission. Every applicant whose IB meets Germany's conditions is admitted, with no selection. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/geosciences-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/geosciences-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science in the Bavarian recognition office\'s list (ZASt, March 2026: "Mathematik und Naturwissenschaften").'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraflx500m77mjvcizhsjhp',
      status: 'current',
      name: 'Health Science',
      description: described(
        "The interdisciplinary Bachelor's program in Health Science considers human health in the context of the health system and current research conducted from a biomedical, psychological, and social perspective.",
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 50% and your grades in German, English, your best science (×2) and your best social science (×2) at 50%. A score of 74 or more admits you, 59 or less does not, and in between you are invited to an interview. On TUM's formula, with 6s in those subjects, an IB total of 32 or more passes outright (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/health-sciences-bachelor-of-science-bsc',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/health-sciences-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/user_upload_87/gi32rab/Gesundheitswissenschaft_Neufassung_EFV_130522.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        " No maths HL: the Bavarian recognition office's list (ZASt, March 2026) opens medicine and health with maths SL. Aptitude assessment from the statute: 50% converted grade, 50% subject grades (German, English, your best science (×2) and your best social science (×2)); pass 74, refused at or below 59; second stage an interview. The paragraph's IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points."
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafs0700qx7mjv0plo7uz7',
      status: 'current',
      name: 'Informatics',
      description: described(
        "The bachelor's program in Informatics cultivates solid theoretical, practical and technical skills. The program therefore offers the best qualification for working in a field that is constantly changing.",
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 65% and your grades in maths (×3), German, English and your best science or computer science (×2) at 35%. A score of 84 or more admits you, 72 or less does not, and in between you are invited to a written test. On TUM's formula, with 6s in those subjects, an IB total of 38 or more passes outright, and 31 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Garching',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/informatics-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/informatics-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/user_upload_87/gi32rab/BA_Informatik_Lesb.F._EfV_03.09.24.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        " Maths HL: computer science, a technical subject in the Bavarian recognition office's list (ZASt, March 2026). Aptitude assessment from the statute: 65% converted grade, 35% subject grades (maths (×3), German, English and your best science or computer science (×2)); pass 84, refused at or below 72; second stage a written test. The paragraph's IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points."
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf66v00a17mjv2hehx1zw',
      status: 'current',
      name: 'Information Engineering (Heilbronn)',
      description: described(
        "The Bachelor's program in Information Engineering at TUM Campus Heilbronn conveys the knowledge and skills necessary to design holistic IT systems from the sensor to the business model.",
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 65% and your grades in maths (×3), English and your best science or computer science at 35%. A score of 73 or more admits you, 59 or less does not, and in between you are invited to an interview. On TUM's formula, with 6s in those subjects, an IB total of 32 or more passes outright, and 25 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in English, and TUM checks your English in the aptitude assessment. TUM also asks for basic German: German A or B at HL, or a certificate such as Goethe-Zertifikat A2."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Heilbronn',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/information-engineering-at-tum-campus-heilbronn-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_OR_B_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/information-engineering-at-tum-campus-heilbronn-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/user_upload_87/gi32rab/Information_Engineering_BA-Lesb._EFV_04.04.24.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        " Maths HL: a technical subject in the Bavarian recognition office's list (ZASt, March 2026: \"Technische Fächer\"). Aptitude assessment from the statute: 65% converted grade, 35% subject grades (maths (×3), English and your best science or computer science); pass 73, refused at or below 59; second stage an interview. The paragraph's IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points. German: TUM's language page accepts German B HL, DSH-1, TestDaF 3, Goethe or ÖSD A2 or telc A2 for this program only; not critical, as an A2 certificate is a short route."
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraft8300rv7mjvhqn9ym9x',
      status: 'current',
      name: 'Information Systems',
      description: described(
        "The bachelor's program in Information Systems combines informatics and business administration.",
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 65% and your grades in maths (×3), German, English, economics and law, and your best science or computer science (×2) at 35%. A score of 84 or more admits you, 72 or less does not, and in between you are invited to a written test. On TUM's formula, with 6s in those subjects, an IB total of 38 or more passes outright, and 31 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Garching',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/information-systems-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/information-systems-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/user_upload_87/gi32rab/BA_Wirtschaftsinformatik_Lesb._F._EfV__03.09.24.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        " Maths HL: computer science, a technical subject in the Bavarian recognition office's list (ZASt, March 2026). Aptitude assessment from the statute: 65% converted grade, 35% subject grades (maths (×3), German, English, economics and law, and your best science or computer science (×2)); pass 84, refused at or below 72; second stage a written test. The paragraph's IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points."
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafyet00vx7mjvdvewu738',
      status: 'current',
      name: 'Landscape Architecture and Landscape Planning',
      description: described(
        "The interdisciplinary Bachelor's program in Landscape Architecture and Landscape Planning is devoted to the interpretation, development and design of landscapes.",
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 55% and your grades in German or English (×2) and one of biology, social studies, geography or art (×3) at 30%, and relevant activities outside school at 15%. A score of 72 or more admits you, below 55 does not, and in between you are invited to an interview. On TUM's formula, with 6s in those subjects and no relevant activities outside school, an IB total of 38 or more passes outright, and 28 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/landscape-architecture-and-landscape-planning-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/landscape-architecture-and-landscape-planning-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/w00bfo/www/Studium/Studienangebot/Lesbare_Fassung/Bachelor/Landschaftsarchitektur_und_Landschaftsplanung_BA_EFV_02052025.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        " Maths HL, for the owner: landscape architecture is not named in the Bavarian recognition office's list (ZASt, March 2026), which names architecture as a technical subject. Aptitude assessment from the statute: 55% converted grade, 30% subject grades (German or English (×2) and one of biology, social studies, geography or art (×3)), 15% relevant activities outside school; pass 72, refused below 55; second stage an interview. The paragraph's IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points."
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafi9z00jd7mjvalmmrus1',
      status: 'current',
      name: 'Life Sciences Biology',
      description: described(
        'The aim of the degree program is a comprehensive understanding of systems – from the biomolecule to the ecosystem – and extensive methodological expertise.',
        'How TUM decides: an aptitude recommendation. Taking part is compulsory, but its result does not affect admission: with a high enough score from your grades you are admitted straight away, and otherwise after an interview. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Freising',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/life-sciences-biology-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/life-sciences-biology-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/user_upload_87/gi32rab/FPSO/Life_Sciences_Biologie_SOV_17042019.PDF',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science in the Bavarian recognition office\'s list (ZASt, March 2026: "Mathematik und Naturwissenschaften"). Aptitude recommendation (SOV): the statute says its result "hat keine Auswirkung auf den Hochschulzugang".'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafjhq00kb7mjvtnqab6d1',
      status: 'current',
      name: 'Life Sciences Nutrition',
      description: described(
        "Organic, vegan or personalized nutrition? How can nutrition promote health and prevent diseases such as obesity, diabetes, or cancer? In the Life Sciences Nutrition Bachelor's degree program, you will learn about the influence of different foods on our body and how they control it.",
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 50% and your grades in maths and your best science (biology, chemistry or physics) at 50%. A score of 88 or more admits you, 65 or less does not, and in between you are invited to an online test. On TUM's formula, with 6s in those subjects, an IB total of 41 or more passes outright, and 27 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Freising',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/life-sciences-nutrition-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/life-sciences-nutrition-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/w00bfo/www/Studium/Studienangebot/Lesbare_Fassung/Bachelor/Life_Sciences_Ernaehrung_BA_EfV__20052021.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: nutrition science ("Haushalts- und Ernährungswissenschaften") is a natural science in the Bavarian recognition office\'s list (ZASt, March 2026). Aptitude assessment from the statute: 50% converted grade, 50% subject grades (maths and your best science (biology, chemistry or physics)); pass 88, refused at or below 65; second stage an online test. The paragraph\'s IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points.'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf8iv00bt7mjvzegh4yv8',
      status: 'current',
      name: 'Management and Data Science',
      description: described(
        'Data-driven technologies, such as AI and the Internet of Things, deeply transform virtually all areas of business and the society. The Bachelor in Management and Data Science provides a flexible toolkit to holistically incorporate and use data-driven innovations for managerial decision-making.',
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 65% and your grades in maths (×2), computer science or your best science (×2), and English at 35%. A score of 88 or more admits you, 66 or less does not, and in between you are invited to an interview. On TUM's formula, with 6s in those subjects, an IB total of 40 or more passes outright, and 29 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in English, and TUM checks your English in the aptitude assessment."
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Heilbronn',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/management-and-data-science',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/management-and-data-science',
        'https://www.tum.de/fileadmin/w00bfo/www/Satzungen/Fachpruefungs-_und_Studienordnungen/Management_and_Data_Science_BA_EFV_04042024.PDF',
        ...SOURCES
      ],
      notes:
        NOTES +
        " No maths HL: economics and business, which the Bavarian recognition office's list (ZASt, March 2026) opens with maths SL. Aptitude assessment from the statute: 65% converted grade, 35% subject grades (maths (×2), computer science or your best science (×2), and English); pass 88, refused at or below 66; second stage an interview. The paragraph's IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points."
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf9qc00cr7mjvrwr4248a',
      status: 'current',
      name: 'Management and Technology (Munich)',
      description: described(
        "The Bachelor's program in Management and Technology combines management courses with a specialization in technology.",
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 65% and your grades in maths (×2), computer science or your best science (×2), and German or English at 35%. A score of 88 or more admits you, 66 or less does not, and in between you are invited to a written test. On TUM's formula, with 6s in those subjects, an IB total of 40 or more passes outright, and 29 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German and English (the Computer Engineering specialization is entirely in English). TUM checks your English in the aptitude assessment and asks for no German certificate."
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/management-and-technology-bachelor-of-science-bsc',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/management-and-technology-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/w00bfo/www/Studium/Studienangebot/Lesbare_Fassung/Bachelor/Management_and_Technology_BA_EFV_14042026.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' No maths HL, for the owner: business administration with a technology focus; the Bavarian recognition office\'s list (ZASt, March 2026) opens economics with maths SL but lists "Wirtschaft und Ingenieurwesen" as technical. Aptitude assessment from the statute: 65% converted grade, 35% subject grades (maths (×2), computer science or your best science (×2), and German or English); pass 88, refused at or below 66; second stage a written test. The paragraph\'s IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points. Language: "German or English"; no German row.'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafn5500n57mjv0xaqswn4',
      status: 'current',
      name: 'Mathematics',
      description: described(
        "The Bachelor's program in Mathematics offers students a sound vocational education and training as well as their first chance to specialize within the discipline.",
        'How TUM decides: an aptitude recommendation. Taking part is compulsory, but its result does not affect admission: with a high enough score from your grades you are admitted straight away, and otherwise after an interview. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Garching',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/mathematics-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/mathematics-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/user_upload_87/gi32rab/Mathematik_BA_SOV_FINAL_12022018.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science in the Bavarian recognition office\'s list (ZASt, March 2026: "Mathematik und Naturwissenschaften"). Aptitude recommendation (SOV): the statute says its result "hat keine Auswirkung auf den Hochschulzugang".'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafpjy00p17mjv0q71v557',
      status: 'current',
      name: 'Molecular Biotechnology',
      description: described(
        "The bachelor's program in Molecular Biotechnology is devoted to the production and construction of natural as well as artificial biomolecules. In addition, it combines the basics of natural science with content from biology, biochemistry, and biotechnology.",
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 50% and your grades in maths (×2), your best science (×2) and your other sciences at 50%. A score of 92 or more admits you, 74 or less does not, and in between you are invited to an online test. On TUM's formula, with 6s in those subjects, no IB total passes outright, so expect an online test, and 32 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Freising',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/molecular-biotechnology-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/molecular-biotechnology-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/user_upload_87/gi32rab/Molekulare_Biotechnologie_BA_EFV_Neufassung_270524.PDF',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science in the Bavarian recognition office\'s list (ZASt, March 2026: "Mathematik und Naturwissenschaften"). Aptitude assessment from the statute: 50% converted grade, 50% subject grades (maths (×2), your best science (×2) and your other sciences); pass 92, refused at or below 74; second stage an online test. The paragraph\'s IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points.'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf7b200av7mjvdtq0hn1s',
      status: 'current',
      name: 'Pharmaceutical Bioprocess Engineering',
      description: described(
        'Pharmaceutical Bioprocess Engineering combines scientific and engineering fundamentals for biotechnological production in the pharmaceutical industry and related fields.',
        "How TUM decides: open admission. Every applicant whose IB meets Germany's conditions is admitted, with no selection. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Freising',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/pharmaceutical-bioprocess-engineering-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/pharmaceutical-bioprocess-engineering-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a technical subject in the Bavarian recognition office\'s list (ZASt, March 2026: "Technische Fächer").'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafoci00o37mjvbzb3ulla',
      status: 'current',
      name: 'Physics',
      description: described(
        "The Bachelor's program in Physics provides a wide-ranging general education in the discipline and enables students to pursue their first individual specialization.",
        "How TUM decides: open admission. Every applicant whose IB meets Germany's conditions is admitted, with no selection. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Garching',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/physics-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/physics-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science in the Bavarian recognition office\'s list (ZASt, March 2026: "Mathematik und Naturwissenschaften").'
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafzoe00wx7mjvx031klij',
      status: 'current',
      name: 'Political Science',
      description: described(
        "The Bachelor's degree program in Political Science offers a comprehensive grounding in political science with the opportunity to specialize in focus areas at the interface of politics and technology.",
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 60% and your grades in German, English, maths, a social science, and a science or computer science at 40%. A score of 80 or more admits you; everyone else is invited to an interview. On TUM's formula, with 6s in those subjects, an IB total of 36 or more passes outright (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German, and TUM also checks your English in the aptitude assessment. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/political-science-bachelor-of-science-bsc',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/political-science-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/w00bfo/www/Studium/Studienangebot/Lesbare_Fassung/Bachelor/Politikwissenschaft_BA_EFV_210224.PDF',
        ...SOURCES
      ],
      notes:
        NOTES +
        " No maths HL: a social science, which the Bavarian recognition office's list (ZASt, March 2026) opens with maths SL. Aptitude assessment from the statute: 60% converted grade, 40% subject grades (German, English, maths, a social science, and a science or computer science); pass 80, no first-stage refusal; second stage an interview. The paragraph's IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points."
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafay900dp7mjvwfclpsah',
      status: 'current',
      name: 'Sustainable Management and Technology',
      description: described(
        'The societal interest in sustainability-oriented business grows with a changed consumer awareness and new environmental agreements. It is important for companies to master this trend towards regenerative products and this change to a climate-neutral and sustainable resource and technology management',
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 65% and your grades in maths (×2), your best science (×2) and English at 35%. A score of 88 or more admits you, 66 or less does not, and in between you are invited to an interview. On TUM's formula, with 6s in those subjects, an IB total of 40 or more passes outright, and 29 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in English, and TUM checks your English in the aptitude assessment."
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Straubing',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/sustainable-management-and-technology-bachelor-of-science-bsc',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/sustainable-management-and-technology-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/w00bfo/www/Studium/Studienangebot/Lesbare_Fassung/Bachelor/Sustainable_Managment_and_Technology_BA_EfV_17032026.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        " No maths HL: economics and business, which the Bavarian recognition office's list (ZASt, March 2026) opens with maths SL. Aptitude assessment from the statute: 65% converted grade, 35% subject grades (maths (×2), your best science (×2) and English); pass 88, refused at or below 66; second stage an interview. The paragraph's IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points."
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Education (B.Ed.)".
    {
      id: 'cmkrag0l300xl7mjvy5pb28d2',
      status: 'current',
      name: 'Teaching at Academic Secondary Schools (Scientific Education)',
      description: described(
        "This Bachelor's degree program is specifically designed for students aiming to become teachers at German academic secondary schools.",
        "How TUM decides: open admission. Every applicant whose IB meets Germany's conditions is admitted, with no selection. Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Education',
      degree: 'Bachelor of Education',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/teaching-at-academic-secondary-schools-scientific-education-bachelor-of-education-bed',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/teaching-at-academic-secondary-schools-scientific-education-bachelor-of-education-bed',
        ...SOURCES
      ],
      notes:
        NOTES +
        " Maths HL, for the owner: teacher training is not in the Bavarian recognition office's list (ZASt, March 2026); this program trains teachers of maths and the sciences."
    },
    // Content 7 B1, 12 October 2026: new. Replaces Geodesy and Geoinformation.
    {
      status: 'new',
      name: 'Geodesy and Earth Observation',
      description: described(
        'Whether it’s land use, environmental risk management, or space exploration: spatial data are required for a wide range of societal, scientific, and economic applications. This program provides the skills needed to acquire, analyse, and apply geoinformation using modern technologies.',
        'How TUM decides: an aptitude recommendation. Taking part is compulsory, but its result does not affect admission: with a high enough score from your grades you are admitted straight away, and otherwise after an interview. Teaching is in English.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/geodesy-and-earth-observation-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/geodesy-and-earth-observation-bachelor-of-science-bsc',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science in the Bavarian recognition office\'s list (ZASt, March 2026: "Mathematik und Naturwissenschaften"). Aptitude recommendation (SOV): the statute says its result "hat keine Auswirkung auf den Hochschulzugang".'
    },
    // Content 7 B1, 12 October 2026: new. Offered for winter semester entry; not stored before.
    {
      status: 'new',
      name: 'Sustainable Engineering for Materials and Processes',
      description: described(
        'Sustainability starts with the foundations of our industry – materials and production processes. The English-taught Bachelor’s program Sustainable Engineering for Materials and Processes (B.Sc.) trains experts who rethink materials and manufacturing: resource-efficient, recyclable, and future-ready.',
        'How TUM decides: an aptitude recommendation. Taking part is compulsory, but its result does not affect admission: with a high enough score from your grades you are admitted straight away, and otherwise after an interview. Teaching is mainly in English; some modules may be in German.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Straubing',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/sustainable-engineering-for-materials-and-processes-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/sustainable-engineering-for-materials-and-processes-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/w00bfo/www/Studium/Studienangebot/Lesbare_Fassung/Bachelor/Sustainable_Engineering_for_Materials_and_Processes_BA_SOV_17022026.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a technical subject in the Bavarian recognition office\'s list (ZASt, March 2026: "Technische Fächer"). Aptitude recommendation (SOV): the statute says its result "hat keine Auswirkung auf den Hochschulzugang".'
    },
    // Content 7 B1, 12 October 2026: new. Offered for winter semester entry; not stored before.
    {
      status: 'new',
      name: 'Mechanical Engineering',
      description: described(
        'Mechanical and plant engineering is a pillar of the German economy and one of its key drivers of innovation. Students of the Mechanical Engineering program learn to develop innovative and sustainable technical solutions in mechanical engineering based on natural sciences and engineering.',
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 65% and your grades in maths (×3), German and your best science or computer science (×2) at 35%. A score of 72 or more admits you, 64 or less does not, and in between you are invited to an interview. On TUM's formula, with 6s in those subjects, an IB total of 32 or more passes outright, and 28 or below is turned down (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: 'Garching',
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/mechanical-engineering-bachelor-of-science-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/mechanical-engineering-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/user_upload_87/gi32rab/Maschinenwesen_BA_Neuefassung_EFV_2024-014_21.02.2024.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        ' Maths HL: a technical subject in the Bavarian recognition office\'s list (ZASt, March 2026: "Technische Fächer"). Aptitude assessment from the statute: 65% converted grade, 35% subject grades (maths (×3), German and your best science or computer science (×2)); pass 72, refused at or below 64; second stage an interview. The paragraph\'s IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points.'
    },
    // Content 7 B1, 12 October 2026: new. Offered for winter semester entry; not stored before.
    {
      status: 'new',
      name: 'Sport Science',
      description: described(
        'The interdisciplinary Bachelor’s degree program in Sport Science is dedicated to the holistic understanding of the human body in the context of physical activity and sport.',
        "How TUM decides: an aptitude assessment. TUM's score out of 100 weights your IB total, converted to a German grade, at 50% and your grades in maths (×3), sport (×2), German, English and your best science (×2) at 50%. A score of 74 or more admits you, 59 or less does not, and in between you are invited to an interview. On TUM's formula, with 6s in those subjects, an IB total of 32 or more passes outright (our calculation from TUM's rules, not a figure TUM publishes). Teaching is in German and English. Your IB proves your German only with German A at HL; otherwise TUM asks for a certificate such as DSH-2, TestDaF with 4 in all four parts, or telc Deutsch C1 Hochschule."
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/sport-science-bachelor-of-science-bsc',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE, GERMAN_A_HL],
      checkedFor: 2026,
      sources: [
        'https://www.tum.de/en/studies/degree-programs/detail/sport-science-bachelor-of-science-bsc',
        'https://www.tum.de/fileadmin/user_upload_87/gi32rab/Sportwissenschaft_BA_Neufassung_EFV_130522.pdf',
        ...SOURCES
      ],
      notes:
        NOTES +
        " No maths HL: the Bavarian recognition office's list (ZASt, March 2026) opens sport with maths SL. Aptitude assessment from the statute: 50% converted grade, 50% subject grades (maths (×3), sport (×2), German, English and your best science (×2)); pass 74, refused at or below 59; second stage an interview. The paragraph's IB figures are calculated: KMK grade truncated, IB subject grades on Annex 2 formula 3 (7 = 100, 4 = 40), no extra points."
    }
  ]
}

export default refresh
