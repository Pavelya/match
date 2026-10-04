import type { RefreshFile } from '../lib/refresh'

/**
 * Johannes Kepler University Linz: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts johannes-kepler-university-linz
 */
const refresh: RefreshFile = {
  university: 'Johannes Kepler University Linz',
  entryYear: 2027,
  checkedOn: '2026-10-03',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmkjgdm3f0001jo046uzcut5k',
      status: 'current',
      name: 'Artificial Intelligence',
      description:
        "Bachelor's Degree in Artificial Intelligence.\n\nAutonomous vehicles, healthcare robots, intelligent household appliances, autonomous irrigation and fertilizer systems, smart digital assistants: Artificial Intelligence is finding its way into our everyday lives. Be at the forefront to help shape the great digital revolution.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.jku.at/en/degree-programs/types-of-degree-programs/bachelors-and-diploma-degree-programs/ba-artificial-intelligence/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.jku.at/en/degree-programs/types-of-degree-programs/bachelors-and-diploma-degree-programs/ba-artificial-intelligence/',
        'https://www.jku.at/en/degree-programs/prospective-students/general-university-entrance-qualifications/',
        'https://www.jku.at/en/degree-programs/prospective-students/register-to-enroll/bachelors-degree-diploma-degree/',
        'https://www.bmwet.gv.at/bmafjgvat/wissenschaft/anerkennung/universit%C3%A4tsreife.html'
      ],
      notes:
        'Content 4.8b: JKU asks for a general university entrance qualification (such as the Austrian Matura) and English at B2; the Austrian science ministry states that a properly obtained IB Diploma is one. JKU publishes no IB points figure or subject, so 24, the Diploma, under 4.8a\'s approved policy. Its Admissions Office may set supplementary examinations where a foreign qualification differs substantially; none is named for the IB. Checked, none required: the stored maths, science and English rows had no source. The pages name no intake (winter semester: EU/EEA by 5 September, non-EU 6 February to 31 March), so stamped 2026. Taught in Linz, with Vienna and Bregenz options. Renamed from "Bachelor\'s Degree in Artificial Intelligence (BSc)".'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkjgmll1000kjo04rkb26npv',
      status: 'current',
      name: 'Biological Chemistry',
      description:
        'Can human beings be cloned? What does having a metabolic disorder mean? Biochemistry allows you to explore the building blocks of life. You learn the terminiology used in two major disciplines and work as a solution-oriented facilitator at the interface of biology and chemistry.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 24,
      programUrl:
        'https://www.jku.at/en/degree-programs/types-of-degree-programs/bachelors-and-diploma-degree-programs/ba-biological-chemistry/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.jku.at/en/degree-programs/types-of-degree-programs/bachelors-and-diploma-degree-programs/ba-biological-chemistry/',
        'https://www.jku.at/en/degree-programs/prospective-students/general-university-entrance-qualifications/',
        'https://www.jku.at/en/degree-programs/prospective-students/register-to-enroll/bachelors-degree-diploma-degree/',
        'https://www.bmwet.gv.at/bmafjgvat/wissenschaft/anerkennung/universit%C3%A4tsreife.html'
      ],
      notes:
        "Content 4.8b: JKU asks for a general university entrance qualification (such as the Austrian Matura) and English at B2; the Austrian science ministry states that a properly obtained IB Diploma is one. JKU publishes no IB points figure or subject, so 24, the Diploma, under 4.8a's approved policy. Its Admissions Office may set supplementary examinations where a foreign qualification differs substantially; none is named for the IB. Checked, none required: the stored maths, science and English rows had no source. The pages name no intake (winter semester: EU/EEA by 5 September, non-EU 6 February to 31 March), so stamped 2026. A dual degree: JKU's Bachelor of Science and the University of South Bohemia's Bakalář (Bc.); the first year is in Linz, the second in České Budějovice. Renamed from the long form that listed both degrees."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkjjxtge0001ky04c3mpyt4z',
      status: 'current',
      name: 'International Business Administration',
      description:
        "Bachelor's Degree in International Business Administration.\n\nGlobally connected cycles. World-wide networking and cross-border action. Understanding business practices and honing intercultural skills. Study International Business Administration and acquire expertise to become an experienced professional.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.jku.at/en/degree-programs/types-of-degree-programs/bachelors-and-diploma-degree-programs/ba-international-business-administration/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.jku.at/en/degree-programs/types-of-degree-programs/bachelors-and-diploma-degree-programs/ba-international-business-administration/',
        'https://www.jku.at/en/degree-programs/types-of-degree-programs/bachelors-and-diploma-degree-programs/ba-international-business-administration/admission/',
        'https://www.jku.at/en/degree-programs/prospective-students/general-university-entrance-qualifications/',
        'https://www.jku.at/en/degree-programs/prospective-students/register-to-enroll/bachelors-degree-diploma-degree/',
        'https://www.bmwet.gv.at/bmafjgvat/wissenschaft/anerkennung/universit%C3%A4tsreife.html'
      ],
      notes:
        'Content 4.8b: JKU asks for a general university entrance qualification (such as the Austrian Matura) and English at C1; the Austrian science ministry states that a properly obtained IB Diploma is one. JKU publishes no IB points figure or subject, so 24, the Diploma, under 4.8a\'s approved policy. Its Admissions Office may set supplementary examinations where a foreign qualification differs substantially; none is named for the IB. Checked, none required: the stored maths, science and English rows had no source. An admissions procedure takes at most 80 students: an application video, then an online interview on set chapters of Fundamentals of Business and one of five companies. The rules for 2026/2027 applied (registration 4 March to 6 May 2026); a new procedure is expected from spring 2027, so stamped 2026. Duration corrected from 2 years: 6 semesters, 180 ECTS, with a mandatory semester abroad. Renamed from "Bachelor\'s Degree in International Business Administration".'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkjt603h0001l1044cv2744v',
      status: 'current',
      name: 'Transformation Studies. Art x Science',
      description:
        "Bachelor's Degree in Transformation Studies. Art x Science. \n\nDigitalization, social upheaval, climate change. As we face grave challenges and crises on a daily basis, how can we make sure our actions continue to initiate positive globally-effective change processes? We need new approaches and new expertise and as part of a new and unique Bachelor's degree program, Transformation Studies. Art x Science, this is what YOU will generate!",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.jku.at/en/degree-programs/types-of-degree-programs/bachelors-and-diploma-degree-programs/ba-transformation-studies-art-x-science/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.jku.at/en/degree-programs/types-of-degree-programs/bachelors-and-diploma-degree-programs/ba-transformation-studies-art-x-science/',
        'https://www.jku.at/en/degree-programs/prospective-students/general-university-entrance-qualifications/',
        'https://www.jku.at/en/degree-programs/prospective-students/register-to-enroll/bachelors-degree-diploma-degree/',
        'https://www.bmwet.gv.at/bmafjgvat/wissenschaft/anerkennung/universit%C3%A4tsreife.html'
      ],
      notes:
        'Content 4.8b: JKU asks for a general university entrance qualification (such as the Austrian Matura) and English at B2; the Austrian science ministry states that a properly obtained IB Diploma is one. JKU publishes no IB points figure or subject, so 24, the Diploma, under 4.8a\'s approved policy. Its Admissions Office may set supplementary examinations where a foreign qualification differs substantially; none is named for the IB. Checked, none required: the stored maths, science and English rows had no source. The page states the programme begins in winter semester 2027/28 with applications in January 2027, so stamped 2027. Joint with the University of Applied Arts Vienna, which runs an admissions procedure in English that must be passed; its details are due in autumn 2026. Taught in Linz and Vienna. Renamed from "Bachelor\'s Degree in Transformation Studies. Art x Science (BA)".'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkjgqin8000vjo04yr8y9yyu',
      status: 'current',
      name: 'Chemistry and Chemical Technology',
      description:
        "Chemistry and Chemical Technology (CCT) Bachelor's Degree Program\n\nSustainable materials, clean energy, new drugs. The Bachelor's degree program in Chemistry and Chemical Technology introduces you to molecules, innovative technologies, and chemical processes that are transforming our world.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.jku.at/en/degree-programs/types-of-degree-programs/bachelors-and-diploma-degree-programs/ba-chemistry-and-chemical-technology/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.jku.at/en/degree-programs/types-of-degree-programs/bachelors-and-diploma-degree-programs/ba-chemistry-and-chemical-technology/',
        'https://www.jku.at/en/degree-programs/prospective-students/general-university-entrance-qualifications/',
        'https://www.jku.at/en/degree-programs/prospective-students/register-to-enroll/bachelors-degree-diploma-degree/',
        'https://www.bmwet.gv.at/bmafjgvat/wissenschaft/anerkennung/universit%C3%A4tsreife.html'
      ],
      notes:
        'Content 4.8b: JKU asks for a general university entrance qualification (such as the Austrian Matura) and English at B2; the Austrian science ministry states that a properly obtained IB Diploma is one. JKU publishes no IB points figure or subject, so 24, the Diploma, under 4.8a\'s approved policy. Its Admissions Office may set supplementary examinations where a foreign qualification differs substantially; none is named for the IB. Checked, none required: the stored maths, science and English rows had no source. The pages name no intake (winter semester: EU/EEA by 5 September, non-EU 6 February to 31 March), so stamped 2026. Renamed from "Chemistry and Chemical Technology (CCT) Bachelor\'s Degree Program (BSc)"; JKU titles it Technical Chemistry: Chemistry and Chemical Technology (CCT).'
    }
  ]
}

export default refresh
