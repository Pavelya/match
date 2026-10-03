import type { RefreshFile } from '../lib/refresh'

/**
 * University of Graz: requirements for 2027 entry.
 *
 * Exported from the database on 2026-10-03 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-graz
 */
const refresh: RefreshFile = {
  university: 'University of Graz',
  entryYear: 2027,
  checkedOn: '2026-10-03',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmki82yye0001ju04cquuqgaf',
      status: 'current',
      name: 'Economics',
      description:
        'Study economics using modern methods\n\nA distinctive feature of this bachelor’s programme is our use of up-to-date methods and our coverage of current topics such as bitcoin, economic effects of the coronavirus crisis and of climate change. It offers a broad-based, research-oriented training in economics, with an emphasis on learning how to think independently about these issues.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.uni-graz.at/en/studies/bachelor-programmes/economics/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://internationale-studierende.uni-graz.at/en/application-with-ib-diploma/',
        'https://www.uni-graz.at/en/studies/bachelor-programmes/economics/',
        'https://internationale-studierende.uni-graz.at/en/language-certificates/',
        'https://internationale-studierende.uni-graz.at/en/submission-deadlines/'
      ],
      notes:
        "Content 4.8b: Graz's IB page asks for six (at most seven) subjects, at least three at HL totalling at least 12, at least 24 points, no subject below 3, and two languages, a humanities subject, a science and maths, the groups every Diploma is built from. No programme names a subject: checked, none required; the stored rows had no source. Taught in German and English, so German at C1 is required: German HL, or a C1 certificate; with A2 to B2 the applicant first passes the preparatory programme's German exam (VGUH). The IB page names no year and the deadlines run to summer semester 2027 (EU/EEA 1 December 2026 to 18 January 2027), so stamped 2026. Model limits: the HL total of 12 and the German requirement. Renamed from \"Bachelor of Science BSc\", the degree, to the programme's name."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkiul5y30001kv04797of33x',
      status: 'current',
      name: 'English Studies/American Studies',
      description:
        'It’s all down to the diversity\n\nWhat makes the bachelor’s programme in English Studies/American Studies unique is its wide range of courses in linguistics and in English and North American literary and cultural studies. You will also have the opportunity to personalise your education thanks to the wide range of supplementary subjects and certificates available.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uni-graz.at/en/studies/bachelor-programmes/english-studies-american-studies/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://internationale-studierende.uni-graz.at/en/application-with-ib-diploma/',
        'https://www.uni-graz.at/en/studies/bachelor-programmes/english-studies-american-studies/',
        'https://internationale-studierende.uni-graz.at/en/language-certificates/',
        'https://internationale-studierende.uni-graz.at/en/submission-deadlines/'
      ],
      notes:
        "Content 4.8b: Graz's IB page asks for six (at most seven) subjects, at least three at HL totalling at least 12, at least 24 points, no subject below 3, and two languages, a humanities subject, a science and maths, the groups every Diploma is built from. No programme names a subject: checked, none required; the stored rows had no source. Taught in German and English, so German at C1 is required: German HL, or a C1 certificate; with A2 to B2 the applicant first passes the preparatory programme's German exam (VGUH). The IB page names no year and the deadlines run to summer semester 2027 (EU/EEA 1 December 2026 to 18 January 2027), so stamped 2026. Model limits: the HL total of 12 and the German requirement. Latin is needed before the fourth-semester course Development of English (10 hours a week at school, or a supplementary exam), and an English placement test at B2 opens the programme. Renamed to the university's title."
    }
  ]
}

export default refresh
