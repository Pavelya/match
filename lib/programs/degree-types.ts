/**
 * Canonical degree types (content task 3.2)
 *
 * `AcademicProgram.degreeType` was free text: 156 spellings of 86 degrees on 26 September
 * 2026 ("Bachelor of Science", "BSc", "Bachelor of Science (B.Sc.)", "BSc (Hons)"…). This is
 * the fixed list the admin forms offer and the refresh tool enforces, and the mapping from
 * every spelling stored that day. The column is not rewritten in bulk: phase 4 normalises
 * each university's programs as it refreshes them.
 *
 * The rules, approved by the owner on 26 September 2026 with the list:
 *   - One spelling per award, written out: "BSc" and "Bachelor of Science (B.Sc.)" are
 *     "Bachelor of Science". Real awards keep their names (Master of Engineering, Bachelor of
 *     Laws, Bachelor of Kinesiology).
 *   - Honours is not part of the type; where it marks a separate program, the program name
 *     says so ("History (Honors)").
 *   - A subject is not part of the type either: "Bachelor of Science in Nursing" and
 *     "Bachelor of Science (Maritime Studies)" are "Bachelor of Science", and the program name
 *     carries the subject.
 *   - "Bachelor" and "Master" alone mean the award name is not recorded. Phase 4 replaces them
 *     where the university names one.
 *
 * A new award found in phase 4 is added here, in its group, with the owner's approval.
 */

/** How the admin programs list counts a degree. */
export type DegreeLevel = 'bachelor' | 'master' | 'combined'

export const DEGREE_TYPE_GROUPS = [
  {
    level: 'bachelor',
    label: "Bachelor's",
    types: [
      'Bachelor',
      'Bachelor of Accountancy',
      'Bachelor of Accounting and Financial Management',
      'Bachelor of Acting',
      'Bachelor of Advanced Computing',
      'Bachelor of Agricultural Science',
      'Bachelor of Agriculture',
      'Bachelor of Animal and Veterinary Bioscience',
      'Bachelor of Applied Computing',
      'Bachelor of Applied Science',
      'Bachelor of Architectural Science',
      'Bachelor of Arts',
      'Bachelor of Arts and Sciences',
      'Bachelor of Biomedical Sciences',
      'Bachelor of Biomedicine',
      'Bachelor of Biomedicine and Health',
      'Bachelor of Business',
      'Bachelor of Business Administration',
      'Bachelor of Business Studies',
      'Bachelor of Business and Law',
      'Bachelor of Chinese Medicine',
      'Bachelor of Civil Law',
      'Bachelor of Commerce',
      'Bachelor of Communication Studies',
      'Bachelor of Computer Science',
      'Bachelor of Computing',
      'Bachelor of Computing and Financial Management',
      'Bachelor of Dental Science',
      'Bachelor of Dental Surgery',
      'Bachelor of Design',
      'Bachelor of Economics',
      'Bachelor of Education',
      'Bachelor of Engineering',
      'Bachelor of Engineering Science',
      'Bachelor of Environmental Studies',
      'Bachelor of Finance',
      'Bachelor of Fine Arts',
      'Bachelor of Global Business and Digital Arts',
      'Bachelor of Health Sciences',
      'Bachelor of International Studies',
      'Bachelor of Kinesiology',
      'Bachelor of Landscape Architecture',
      'Bachelor of Laws',
      'Bachelor of Management',
      'Bachelor of Management and Organizational Studies',
      'Bachelor of Mathematical Sciences',
      'Bachelor of Mathematics',
      'Bachelor of Media and Communications',
      'Bachelor of Medical Sciences',
      'Bachelor of Medicine',
      'Bachelor of Medicine and Bachelor of Surgery',
      'Bachelor of Music',
      'Bachelor of Music Education',
      'Bachelor of Nursing',
      'Bachelor of Oral Health',
      'Bachelor of Pharmacy',
      'Bachelor of Politics, Philosophy, and Economics',
      'Bachelor of Project Management',
      'Bachelor of Psychology',
      'Bachelor of Science',
      'Bachelor of Social Sciences',
      'Bachelor of Social Work',
      'Bachelor of Theology',
      'Bachelor of Veterinary Medicine',
      'Bachelor of Veterinary Medicine and Surgery',
      'Master of Arts (Scottish undergraduate)'
    ]
  },
  {
    level: 'master',
    // UK integrated masters and continental single-cycle degrees: entered from school.
    label: "Master's (entered from school)",
    types: [
      'Master',
      'Master in Science',
      'Master of Biochemistry',
      'Master of Biology',
      'Master of Chemistry',
      'Master of Earth Sciences',
      'Master of Engineering',
      'Master of Informatics',
      'Master of Mathematics',
      'Master of Mathematics and Computer Science',
      'Master of Mathematics and Philosophy',
      'Master of Pharmacy',
      'Master of Physics',
      'Master of Physics and Philosophy',
      "Single-Cycle Master's Degree"
    ]
  },
  {
    level: 'combined',
    label: 'Double and combined degrees',
    types: [
      "Bachelor's and Doctor of Dental Medicine",
      "Bachelor's and Doctor of Medicine",
      "Bachelor's and Doctor of Veterinary Medicine",
      "Double Bachelor's Degree",
      "Integrated Bachelor's and Master's"
    ]
  }
] as const satisfies ReadonlyArray<{ level: DegreeLevel; label: string; types: readonly string[] }>

export type DegreeType = (typeof DEGREE_TYPE_GROUPS)[number]['types'][number]

export const DEGREE_TYPES: readonly DegreeType[] = DEGREE_TYPE_GROUPS.flatMap((g) => g.types)

const LEVELS = new Map<string, DegreeLevel>(
  DEGREE_TYPE_GROUPS.flatMap((g) => g.types.map((t) => [t, g.level] as const))
)

/** Every other spelling stored on 26 September 2026, and the degree it names. */
export const DEGREE_TYPE_VARIANTS: Readonly<Record<string, DegreeType>> = {
  "Bachelor's Degree": 'Bachelor',
  'Bachelor in Acting': 'Bachelor of Acting',
  BA: 'Bachelor of Arts',
  'BA (Hons)': 'Bachelor of Arts',
  'Bachelor of Arts (B.A.)': 'Bachelor of Arts',
  'Bachelor of Arts (BA)': 'Bachelor of Arts',
  'Bachelor of Arts (Education)': 'Bachelor of Arts',
  'Bachelor of Arts (Honors)': 'Bachelor of Arts',
  'Bachelor of Arts (Honours)': 'Bachelor of Arts',
  'Bachelor of Arts (Hons)': 'Bachelor of Arts',
  'Bachelor of Arts in Criminology': 'Bachelor of Arts',
  'Bachelor of Arts in Economics': 'Bachelor of Arts',
  'Bachelor of Arts in Engineering': 'Bachelor of Arts',
  'Bachelor of Arts in Social Sciences': 'Bachelor of Arts',
  'Bachelor of Arts and Science': 'Bachelor of Arts and Sciences',
  'Bachelor of Business Administration (Accountancy)': 'Bachelor of Business Administration',
  'Bachelor in Business Studies': 'Bachelor of Business Studies',
  'Bachelor of Commerce (Bilingual)': 'Bachelor of Commerce',
  'Bachelor of Computing (Honours)': 'Bachelor of Computing',
  'Bachelor of Design in Architecture': 'Bachelor of Design',
  'Bachelor of Education (B.Ed.)': 'Bachelor of Education',
  BEng: 'Bachelor of Engineering',
  'BEng (Hons)': 'Bachelor of Engineering',
  'Bachelor of Engineering (B.Eng.)': 'Bachelor of Engineering',
  'Bachelor of Engineering (Honours)': 'Bachelor of Engineering',
  'Bachelor of Engineering Honours': 'Bachelor of Engineering',
  'Bachelor of Engineering Science (BESc)': 'Bachelor of Engineering Science',
  BFA: 'Bachelor of Fine Arts',
  'Bachelor of Health Sciences (BHSc)': 'Bachelor of Health Sciences',
  'Bachelor of Law (BLaw)': 'Bachelor of Laws',
  'LLB (Hons)': 'Bachelor of Laws',
  'Bachelor of Management and Organizational Studies (BMOS)':
    'Bachelor of Management and Organizational Studies',
  'Bachelor of Medical Sciences (BMSc)': 'Bachelor of Medical Sciences',
  'Bachelor of Medicine (BMed)': 'Bachelor of Medicine',
  'BM BCh': 'Bachelor of Medicine and Bachelor of Surgery',
  'Bachelor of Medicine, Bachelor of Surgery, Bachelor of Obstetrics':
    'Bachelor of Medicine and Bachelor of Surgery',
  'MBBS/BSc': 'Bachelor of Medicine and Bachelor of Surgery',
  MBChB: 'Bachelor of Medicine and Bachelor of Surgery',
  BN: 'Bachelor of Nursing',
  BSc: 'Bachelor of Science',
  'BSc (Hons)': 'Bachelor of Science',
  'Bachelor of Science (B.Sc.)': 'Bachelor of Science',
  'Bachelor of Science (BSc)': 'Bachelor of Science',
  'Bachelor of Science (Foods and Nutrition)': 'Bachelor of Science',
  'Bachelor of Science (Honors)': 'Bachelor of Science',
  'Bachelor of Science (Honours)': 'Bachelor of Science',
  'Bachelor of Science (Maritime Studies)': 'Bachelor of Science',
  'Bachelor of Science (Stock Science and Management)': 'Bachelor of Science',
  'Bachelor of Science in Architecture': 'Bachelor of Science',
  'Bachelor of Science in Engineering': 'Bachelor of Science',
  'Bachelor of Science in Kinesiology': 'Bachelor of Science',
  'Bachelor of Science in Midwifery': 'Bachelor of Science',
  'Bachelor of Science in Nursing': 'Bachelor of Science',
  'Bachelor of Science in Nursing (BScN)': 'Bachelor of Science',
  'Bachelor of Science in Physiotherapy': 'Bachelor of Science',
  'Bachelor of Social Science': 'Bachelor of Social Sciences',
  'Bachelor of Theology (BTh)': 'Bachelor of Theology',
  'Master of Veterinary Medicine': 'Bachelor of Veterinary Medicine',
  'BVM&S': 'Bachelor of Veterinary Medicine and Surgery',
  'Bachelor + Doctor of Dental Medicine': "Bachelor's and Doctor of Dental Medicine",
  'Bachelor + Doctor of Medicine': "Bachelor's and Doctor of Medicine",
  'Bachelor + Doctor of Veterinary Medicine': "Bachelor's and Doctor of Veterinary Medicine",
  'BA & BEd (Double Degree)': "Double Bachelor's Degree",
  'BA & BEng (Double Degree)': "Double Bachelor's Degree",
  'BA & LLB (Double Degree)': "Double Bachelor's Degree",
  'BBA(Law) & LLB (Double Degree)': "Double Bachelor's Degree",
  'BEd & BSc (Double Degree)': "Double Bachelor's Degree",
  'BSocSc & LLB (Double Degree)': "Double Bachelor's Degree",
  'Bachelor of Arts (Dual Degree)': "Double Bachelor's Degree",
  'Bachelor of Arts / Bachelor of Science': "Double Bachelor's Degree",
  'Bachelor of Business Studies / Bachelor of Arts': "Double Bachelor's Degree",
  'Bachelor of Computer Science / Bachelor of Business Administration': "Double Bachelor's Degree",
  'Bachelor of Mathematics / Bachelor of Business Administration': "Double Bachelor's Degree",
  'Bachelor of Music / Bachelor of Arts': "Double Bachelor's Degree",
  'Combined Bachelor': "Double Bachelor's Degree",
  'Combined Bachelor (Honours)': "Double Bachelor's Degree",
  'Dual Degree': "Double Bachelor's Degree",
  'BEng (Hons) / MEng (Hons)': "Integrated Bachelor's and Master's",
  'BEng + MScEng (Integrated Bachelor+Master)': "Integrated Bachelor's and Master's",
  'Bachelor (Honours) + Master': "Integrated Bachelor's and Master's",
  'Bachelor of Arts in Engineering / Master in Engineering': "Integrated Bachelor's and Master's",
  MSci: 'Master in Science',
  'MA (Hons)': 'Master of Arts (Scottish undergraduate)',
  MBiochem: 'Master of Biochemistry',
  MBiol: 'Master of Biology',
  MChem: 'Master of Chemistry',
  MEarthSci: 'Master of Earth Sciences',
  MEng: 'Master of Engineering',
  'MEng (Hons)': 'Master of Engineering',
  MInf: 'Master of Informatics',
  MMath: 'Master of Mathematics',
  MMathCompSci: 'Master of Mathematics and Computer Science',
  MMathPhil: 'Master of Mathematics and Philosophy',
  MPhys: 'Master of Physics',
  MPhysPhil: 'Master of Physics and Philosophy',
  'Combined Bachelor and Master': "Single-Cycle Master's Degree"
}

const BY_LOWERCASE = new Map<string, DegreeType>([
  ...DEGREE_TYPES.map((t) => [t.toLowerCase(), t] as const),
  ...Object.entries(DEGREE_TYPE_VARIANTS).map(([v, t]) => [v.toLowerCase(), t] as const)
])

export function isDegreeType(value: string): value is DegreeType {
  return LEVELS.has(value)
}

/**
 * The canonical type for a value: a canonical type or a known spelling of one, ignoring case
 * and surrounding spaces. Null for anything else.
 */
export function canonicalDegreeType(value: string): DegreeType | null {
  return BY_LOWERCASE.get(value.trim().toLowerCase()) ?? null
}

/** The level of a stored value, through its canonical type. Null when it has none. */
export function degreeLevel(value: string): DegreeLevel | null {
  const type = canonicalDegreeType(value)
  return type ? (LEVELS.get(type) ?? null) : null
}
