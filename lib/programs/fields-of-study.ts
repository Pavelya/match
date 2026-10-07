/**
 * One home per discipline in the fields of study (content task 8.1)
 *
 * Field matching is exact (`lib/matching/field-matcher.ts`): a program matches a student only
 * when its one field is among the fields the student picked. On 6 October 2026 the field
 * descriptions named the same discipline under two fields (Economics under Business & Economics
 * and Social Sciences; Computer Science under its own field and Engineering; Environmental
 * Science under Natural Sciences and Environmental Studies), and programs followed suit: 81
 * programs named Economics were filed under Business & Economics, 15 under Social Sciences and 4
 * under Arts & Humanities. A student who picked only Business & Economics matched none of the 19.
 *
 * This file is the rule. Every discipline below has one home field, the descriptions name each
 * discipline once, and a program's field follows from its name:
 *
 *   - **One discipline** goes to its home: "Economics" is Business & Economics.
 *   - **A compound** goes to its last discipline, the head of the phrase: "Biomedical
 *     Engineering" is Engineering, "Economic History" is History, "Mathematical Finance" is
 *     Finance. In "X of Y", "X for Y", "X in Y" and "X at Y" the head is X: "Psychology of
 *     Education" is Psychology.
 *   - **A joint degree** goes to its first-named discipline: "Mathematics and Economics" is
 *     Mathematics, "Economics and Mathematics" is Economics. Adjectives joined by "and" modify
 *     what follows: "Electrical and Computer Engineering" is one discipline.
 *   - Degree titles that name no subject are skipped ("Bachelor of Science in"), and a subject
 *     in brackets counts only when nothing outside them names one: "Bachelor of Engineering
 *     Honours (Software Engineering)" is Software, "Data Science (Okanagan)" is Data Science.
 *   - `SPECIAL_CASES` and `KEPT` are the exceptions the owner approved.
 *
 * The inventory, `scripts/programs/field-inventory.ts`, applies the rule to the stored catalogue
 * with aggregates and lists every program filed elsewhere. A program whose name names no
 * discipline here ("Innovation and Technology") is left where it is.
 */

export const FIELD_NAMES = [
  'Architecture',
  'Arts & Humanities',
  'Business & Economics',
  'Computer Science',
  'Education',
  'Engineering',
  'Environmental Studies',
  'Law',
  'Media',
  'Medicine & Health',
  'Natural Sciences',
  'Social Sciences'
] as const

export type FieldName = (typeof FIELD_NAMES)[number]

/**
 * What a student reads under each field in onboarding. Each names disciplines of its own field
 * only (`fields-of-study.test.ts` checks), so no discipline appears under two fields.
 */
export const FIELD_DESCRIPTIONS: Record<FieldName, string> = {
  Architecture: 'Architecture, Landscape Architecture, Urban Planning, Design',
  'Arts & Humanities': 'History, Philosophy, Literature, Languages, Fine Arts, Music, Film',
  'Business & Economics': 'Economics, Business, Finance, Accounting, Marketing',
  'Computer Science': 'Software, AI, Data Science, Cybersecurity',
  Education: 'Teaching, Early Childhood, Physical Education',
  Engineering: 'Mechanical, Electrical, Civil, Aerospace, Computer Engineering',
  'Environmental Studies':
    'Environmental Science, Sustainability, Climate, Conservation, Agriculture',
  Law: 'International Law, Corporate Law, Criminal Justice',
  Media: 'Journalism, Communication, Digital Media',
  'Medicine & Health': 'Medicine, Nursing, Pharmacy, Dentistry, Public Health, Biomedical Sciences',
  'Natural Sciences': 'Mathematics, Statistics, Physics, Chemistry, Biology, Earth Sciences',
  'Social Sciences':
    'Psychology, Sociology, Politics, International Relations, Anthropology, Geography'
}

export interface Discipline {
  name: string
  field: FieldName
  /**
   * How a program name says it: regular-expression fragments matched case-insensitively at
   * the start of a word, to the end of that word, so `econom` matches Economics, Economic and
   * Econometrics. Use only letters, spaces, `-`, `?`, `\b` and groups: the inventory runs the
   * same fragments in Postgres.
   */
  stems: string[]
  /** Counts only in a part of a name that names nothing else ("Science"). */
  weak?: boolean
}

export const DISCIPLINES: Discipline[] = [
  // Architecture
  { name: 'Architecture', field: 'Architecture', stems: ['architect'] },
  { name: 'Landscape Architecture', field: 'Architecture', stems: ['landscape'] },
  {
    name: 'Urban Planning',
    field: 'Architecture',
    stems: ['urban planning', '(?:city|spatial|town|regional) planning', 'planning\\b']
  },
  { name: 'Design', field: 'Architecture', stems: ['design\\b'] },
  { name: 'Surveying', field: 'Architecture', stems: ['surveying'] },

  // Arts & Humanities
  { name: 'History', field: 'Arts & Humanities', stems: ['histor', 'archaeolog'] },
  { name: 'Philosophy', field: 'Arts & Humanities', stems: ['philosoph'] },
  {
    name: 'Literature',
    field: 'Arts & Humanities',
    stems: [
      'literat',
      'english\\b',
      'classics\\b',
      'classical (?:studies|civilisation)',
      'ancient studies',
      'anglo-saxon'
    ]
  },
  {
    name: 'Languages',
    field: 'Arts & Humanities',
    stems: ['languages?\\b', 'linguist', 'translation']
  },
  {
    name: 'Fine Arts',
    field: 'Arts & Humanities',
    stems: [
      'fine arts?\\b',
      'visual arts?\\b',
      'art\\b',
      'liberal arts(?: and sciences?)?',
      'humanities'
    ]
  },
  {
    name: 'Music',
    field: 'Arts & Humanities',
    stems: ['music', 'drama\\b', 'theat(?:re|er)', 'perform(?:ing|ative) arts?\\b', 'dance\\b']
  },
  {
    name: 'Cultural Studies',
    field: 'Arts & Humanities',
    stems: ['(?:african|american|asian|middle eastern|scandinavian|medieval) studies']
  },
  { name: 'Film', field: 'Arts & Humanities', stems: ['film'] },
  { name: 'Theology', field: 'Arts & Humanities', stems: ['theolog', 'religio', 'divinity'] },

  // Business & Economics
  { name: 'Economics', field: 'Business & Economics', stems: ['econom'] },
  {
    name: 'Business',
    field: 'Business & Economics',
    stems: [
      'business(?: engineering)?',
      'commerce',
      'management',
      'entrepreneur',
      'tourism',
      'hospitality'
    ]
  },
  { name: 'Finance', field: 'Business & Economics', stems: ['financ'] },
  { name: 'Accounting', field: 'Business & Economics', stems: ['accounting', 'accountancy'] },
  { name: 'Marketing', field: 'Business & Economics', stems: ['marketing'] },
  { name: 'Actuarial Science', field: 'Business & Economics', stems: ['actuar'] },

  // Computer Science
  {
    name: 'Computer Science',
    field: 'Computer Science',
    stems: [
      'computer science',
      'computing',
      'computational science',
      'informatics',
      'information (?:systems|security|technology)',
      'communication systems',
      'web development'
    ]
  },
  {
    name: 'Software',
    field: 'Computer Science',
    stems: ['software(?: engineering)?', 'informatics engineering']
  },
  {
    name: 'AI',
    field: 'Computer Science',
    stems: ['artificial intelligence', 'ai\\b', 'machine learning']
  },
  { name: 'Data Science', field: 'Computer Science', stems: ['data science', 'data analytics'] },
  {
    name: 'Cybersecurity',
    field: 'Computer Science',
    stems: ['cyber(?: ?security engineering)?', 'network security']
  },
  { name: 'Bioinformatics', field: 'Computer Science', stems: ['bioinformatics'] },

  // Education
  { name: 'Teaching', field: 'Education', stems: ['educat', 'teach', 'pedagog'] },
  { name: 'Early Childhood', field: 'Education', stems: ['early childhood'] },

  // Engineering
  {
    name: 'Engineering',
    field: 'Engineering',
    stems: [
      'engineer',
      'bioengineer',
      'chemical engineering',
      'engineering physics',
      'materials science',
      'mechatronic',
      'aeronaut',
      'construction'
    ]
  },
  { name: 'Mechanical', field: 'Engineering', stems: ['mechanical'] },
  { name: 'Electrical', field: 'Engineering', stems: ['electrical', 'electronic'] },
  { name: 'Aerospace', field: 'Engineering', stems: ['aerospace'] },
  { name: 'Computer Engineering', field: 'Engineering', stems: ['computer engineering'] },

  // Environmental Studies
  {
    name: 'Environmental Science',
    field: 'Environmental Studies',
    stems: [
      'environment\\b',
      'environmental (?:science|stud|management|policy|change|technology)',
      'natural resource'
    ]
  },
  {
    name: 'Sustainability',
    field: 'Environmental Studies',
    stems: ['sustainability', 'sustainable development']
  },
  { name: 'Climate', field: 'Environmental Studies', stems: ['climate'] },
  { name: 'Conservation', field: 'Environmental Studies', stems: ['conservation'] },
  {
    name: 'Agriculture',
    field: 'Environmental Studies',
    stems: ['agricultur', 'agronom', 'horticultur', 'forest']
  },
  { name: 'Marine Science', field: 'Environmental Studies', stems: ['marine', 'ocean science'] },

  // Law
  {
    name: 'Law',
    field: 'Law',
    stems: ['laws?\\b', 'legal', 'jurisprud', '(?:criminal|international) justice', 'llb\\b']
  },

  // Media
  { name: 'Journalism', field: 'Media', stems: ['journalis'] },
  { name: 'Communication', field: 'Media', stems: ['communication'] },
  { name: 'Digital Media', field: 'Media', stems: ['media\\b', 'broadcast'] },

  // Medicine & Health
  { name: 'Medicine', field: 'Medicine & Health', stems: ['medic'] },
  { name: 'Nursing', field: 'Medicine & Health', stems: ['nursing'] },
  { name: 'Pharmacy', field: 'Medicine & Health', stems: ['pharma'] },
  { name: 'Dentistry', field: 'Medicine & Health', stems: ['dentist', 'dental'] },
  { name: 'Public Health', field: 'Medicine & Health', stems: ['health'] },
  {
    name: 'Veterinary',
    field: 'Medicine & Health',
    stems: ['veterinar(?:y (?:biology|bioscience|medicine|science))?']
  },
  {
    name: 'Biomedical Sciences',
    field: 'Medicine & Health',
    stems: [
      'biomedic',
      'medical bio',
      'neuroscien',
      'physiolog',
      'immunolog',
      'infectio',
      'anatomy'
    ]
  },
  {
    name: 'Kinesiology',
    field: 'Medicine & Health',
    stems: ['kinesiolog', 'sports?\\b', 'nutrition', 'physiotherap', 'optometr']
  },

  // Natural Sciences
  {
    name: 'Mathematics',
    field: 'Natural Sciences',
    stems: ['mathematics', 'mathematical sciences?\\b', 'maths?\\b']
  },
  { name: 'Statistics', field: 'Natural Sciences', stems: ['statistic'] },
  { name: 'Physics', field: 'Natural Sciences', stems: ['physics', 'astro', 'atmospher'] },
  { name: 'Chemistry', field: 'Natural Sciences', stems: ['chemi'] },
  {
    name: 'Biology',
    field: 'Natural Sciences',
    stems: [
      'biolog',
      'biochem',
      'bioscien',
      'biotech',
      'microbiolog',
      'genetic',
      'zoolog',
      'botan',
      'ecolog',
      'evolution',
      'life sciences?\\b',
      'molecular'
    ]
  },
  {
    name: 'Earth Sciences',
    field: 'Natural Sciences',
    stems: ['earth\\b', 'geolog', 'geoscien', 'geophysic', 'planetary']
  },
  { name: 'Natural Sciences', field: 'Natural Sciences', stems: ['natural sciences?\\b'] },
  { name: 'Science', field: 'Natural Sciences', stems: ['sciences?\\b'], weak: true },

  // Social Sciences
  { name: 'Psychology', field: 'Social Sciences', stems: ['psycholog'] },
  {
    name: 'Sociology',
    field: 'Social Sciences',
    stems: ['sociolog', 'social sciences?\\b', 'social-economic', 'social (?:policy|work)']
  },
  { name: 'Criminology', field: 'Social Sciences', stems: ['criminolog'] },
  {
    name: 'Politics',
    field: 'Social Sciences',
    stems: [
      'politic',
      'political science',
      'government',
      'governance',
      'public policy',
      'public administration',
      'policy management'
    ]
  },
  {
    name: 'International Relations',
    field: 'Social Sciences',
    stems: ['international (?:relations|affairs|studies)']
  },
  { name: 'European Studies', field: 'Social Sciences', stems: ['(?:area|european) studies'] },
  { name: 'Anthropology', field: 'Social Sciences', stems: ['anthropolog'] },
  { name: 'Geography', field: 'Social Sciences', stems: ['geograph'] },
  { name: 'Urban Studies', field: 'Social Sciences', stems: ['urban studies'] },
  { name: 'Cognitive Science', field: 'Social Sciences', stems: ['cognitive science'] }
]

/**
 * Exceptions to the general rule, approved with it. Each applies to any name it matches, so a
 * program added later follows it too.
 */
export const SPECIAL_CASES: Array<{
  test: (name: string) => boolean
  discipline: string
  why: string
}> = [
  {
    // The law degree is the professional qualification and the reason students choose it.
    test: (name) => /\bBachelor of Laws\b|\bLLB\b/i.test(name),
    discipline: 'Law',
    why: 'a double degree with a Bachelor of Laws is Law'
  },
  {
    // Philosophy, Politics and Economics in any order, with or without Sociology or Law.
    test: (name) => /\bphilosoph/i.test(name) && /\bpolitic/i.test(name) && /\beconom/i.test(name),
    discipline: 'Politics',
    why: 'Philosophy, Politics and Economics is Social Sciences'
  }
]

/**
 * Programs whose names mislead the rule, by id, with the field the owner chose (7 October
 * 2026). The inventory lists one only when it is filed elsewhere.
 */
export const KEPT: Record<string, { name: string; field: FieldName; why: string }> = {
  cmkoieoum000nl704341egkux: {
    name: 'Charles University — Sustainability in Marketing and Media Communication',
    field: 'Media',
    why: 'marketing and media communication; sustainability is its theme'
  },
  cmuw8ag7t0021047ml7nc2b99: {
    name: 'Masaryk University — English Language for Education',
    field: 'Education',
    why: 'trains English teachers'
  },
  cmuw8ag4z001y047mp31jacml: {
    name: 'Masaryk University — Culture, Media and Performative Arts',
    field: 'Arts & Humanities',
    why: 'theatre, film and media studies in the Faculty of Arts'
  },
  cmuw8afib001g047mb34zcd47: {
    name: 'Tallinn University — Liberal Arts in Social Sciences',
    field: 'Social Sciences',
    why: 'a social sciences degree; "Liberal Arts" is its format'
  },
  cmk8kr1v1004h7m8idlukuv60: {
    name: 'Erasmus University Rotterdam — Management of International Social Challenges',
    field: 'Social Sciences',
    why: 'a sociology degree, not a management one'
  },
  cmkpz2fne002j7mwxnkw76kpw: {
    name: 'Imperial College London — Biomedical Technology Ventures',
    field: 'Engineering',
    why: 'biomedical technology, not biomedical science'
  },
  cmkv8bx4m009d7mpoiliz1l16: {
    name: 'Hong Kong University of Science and Technology — Dual Degree Program in Technology & Management',
    field: 'Engineering',
    why: 'an engineering degree paired with a business one'
  },
  cmkv8bpjl00557mpof078t0p5: {
    name: 'Hong Kong University of Science and Technology — BBA in Information Systems',
    field: 'Business & Economics',
    why: 'a business degree (BBA)'
  },
  cmk34mfrz000f7m6abosburiw: {
    name: 'University of Amsterdam — Global Arts, Culture and Politics',
    field: 'Arts & Humanities',
    why: 'a humanities degree; politics is one of its themes'
  },
  cmkx2t3070016le04jrw8jdoc: {
    name: 'Jagiellonian University — East European Studies: Languages and Discourses',
    field: 'Arts & Humanities',
    why: 'languages and discourse of the region'
  },
  cmly6g8p5000g7mpggbg450jy: {
    name: 'Georgia Institute of Technology — Computational Media',
    field: 'Computer Science',
    why: 'a computing degree'
  },
  cmk6q81hp007z7mpm8fvyne8b: {
    name: 'University of Waterloo — Global Business and Digital Arts',
    field: 'Arts & Humanities',
    why: 'digital arts and design in the Faculty of Arts'
  },
  cmm7gxnnl001xi204o4xzpufe: {
    name: 'Linnaeus University — Visual Communication +Change',
    field: 'Architecture',
    why: 'a design degree, filed with Design'
  }
}

const BY_NAME = new Map(DISCIPLINES.map((d) => [d.name, d]))

/** A discipline named in a text, and where. */
export interface DisciplineMatch {
  discipline: Discipline
  index: number
  length: number
}

const STEMS = DISCIPLINES.flatMap((discipline) =>
  discipline.stems.map((stem) => ({ discipline, regex: new RegExp(`\\b(?:${stem})`, 'gi') }))
)

/**
 * The disciplines a text names, left to right. Where two overlap, the one that starts first
 * wins, then the longer: "Computer Engineering" is one match, not two.
 */
export function findDisciplines(text: string): DisciplineMatch[] {
  const all: DisciplineMatch[] = []
  for (const { discipline, regex } of STEMS) {
    for (const m of text.matchAll(regex)) {
      const rest = /^[\p{L}-]*/u.exec(text.slice(m.index + m[0].length))![0]
      all.push({ discipline, index: m.index, length: m[0].length + rest.length })
    }
  }
  all.sort((a, b) => a.index - b.index || b.length - a.length)
  const kept: DisciplineMatch[] = []
  let end = -1
  for (const m of all) {
    if (m.index < end) continue
    kept.push(m)
    end = m.index + m.length
  }
  return kept
}

/** Degree titles that name no subject: "Bachelor of Science (Hons)". */
const GENERIC_TITLE =
  /\b(?:Bachelor|Master)(?:'s|’s)?(?: Programme| Program)? (?:of|in) (?:Arts and Sciences|Applied Science|Science|Arts|Engineering)\b(?: \(Hons\)| Honours)?/gi
/** The rest of any other title: "Bachelor of Laws" names Laws. */
const TITLE_WORDS =
  /\b(?:(?:Double |International )?Bachelor|Master)(?:'s|’s)?(?: Programme| Program)?(?: (?:of|in))?\b/gi
const BRACKETS = /\(([^)]*)\)/g
/** Where a joint degree's disciplines divide; "and" and "&" are captured. */
const SEPARATOR = /\s*(?:,|;|\/|\+|:|\s[-–—]\s|(\band\b|&)|\bwith\b)\s*/i
/** A lone adjective before "and" modifies what follows: "Electrical and Computer Engineering". */
const ADJECTIVE =
  /^(?!(?:music|logic|rhetoric|arabic|ethics?)$)\p{L}+(?:al|ic|able|ible|ive|ary|ous)$/iu
/** "Psychology of Education" is Psychology: the head comes before these. */
const HEAD_ENDS = /\s(?:of|for|in|at)\s/i

function splitParts(text: string): string[] {
  // split() with a capturing group interleaves each part with the "and" that follows it.
  const pieces = text.split(SEPARATOR)
  const parts: string[] = []
  let pending = ''
  for (let i = 0; i < pieces.length; i += 2) {
    const part = pieces[i]?.trim()
    if (!part) continue
    if (pieces[i + 1] && ADJECTIVE.test(part)) {
      pending += `${part} `
      continue
    }
    parts.push(pending + part)
    pending = ''
  }
  if (pending) parts.push(pending.trim())
  return parts
}

/** The last match, preferring strong ones; null when there is none. */
function last(matches: DisciplineMatch[], weak: boolean): Discipline | null {
  return matches.filter((m) => !!m.discipline.weak === weak).at(-1)?.discipline ?? null
}

/** The discipline a part of a name is about: its head. */
function headOf(part: string): Discipline | null {
  const before = findDisciplines(part.split(HEAD_ENDS)[0])
  const whole = findDisciplines(part)
  return last(before, false) ?? last(whole, false) ?? last(before, true) ?? last(whole, true)
}

/** Why a name's home is what it is. */
export interface Home {
  discipline: Discipline
  field: FieldName
  /** What each part of the name is about, first-named first. */
  named: Discipline[]
  /** Set when a special case decided. */
  rule?: string
}

/**
 * The field a program belongs in, from its name. Null when the name names no discipline, or
 * only "Science": nothing is said about those.
 */
export function homeOf(name: string): Home | null {
  const untitled = name.replace(GENERIC_TITLE, ' ').replace(TITLE_WORDS, ' ')
  const bracketed = [...untitled.matchAll(BRACKETS)].map((m) => m[1])
  for (const text of [untitled.replace(BRACKETS, ' '), ...bracketed]) {
    const named = splitParts(text)
      .map(headOf)
      .filter((d): d is Discipline => d !== null)
    if (named.length === 0) continue
    if (named.every((d) => d.weak)) return null
    const special = SPECIAL_CASES.find((s) => s.test(name))
    const discipline = special ? BY_NAME.get(special.discipline)! : named[0]
    return { discipline, field: discipline.field, named, rule: special?.why }
  }
  return null
}

/**
 * The same discipline as a Postgres regular expression, for `name ~* pattern`. `\m` and `\M`
 * are Postgres's start and end of a word.
 */
export function postgresPattern(discipline: Discipline): string {
  return `\\m(?:${discipline.stems.join('|').replaceAll('\\b', '\\M')})`
}

/** A program filed outside the field the rule gives it. */
export interface Outlier {
  id: string
  name: string
  university: string
  field: string
  /** Where the rule, or the owner, files it. */
  home: FieldName
  /**
   * `single`: it names one field's disciplines. `joint-other`: a joint degree filed under
   * another of its disciplines. `joint-none`: filed under none of them. `special`: a special
   * case decided. `kept`: the owner keeps it in another field than it is filed under.
   */
  kind: 'single' | 'joint-other' | 'joint-none' | 'special' | 'kept'
  reason: string
}

/** Check stored programs against the rule. */
export function findOutliers(
  programs: Array<{ id: string; name: string; field: string; university: string }>,
  kept: typeof KEPT = KEPT
): { outliers: Outlier[]; kept: string[] } {
  const outliers: Outlier[] = []
  const keptIds: string[] = []
  for (const p of programs) {
    const owner = kept[p.id]
    if (owner) {
      if (owner.field === p.field) keptIds.push(p.id)
      else outliers.push({ ...p, home: owner.field, kind: 'kept', reason: owner.why })
      continue
    }
    const home = homeOf(p.name)
    if (!home || home.field === p.field) continue
    const fields = new Set(home.named.filter((d) => !d.weak).map((d) => d.field))
    const kind = home.rule
      ? 'special'
      : fields.size <= 1
        ? 'single'
        : fields.has(p.field as FieldName)
          ? 'joint-other'
          : 'joint-none'
    const reason = home.rule ?? home.named.map((d) => d.name).join(' + ')
    outliers.push({ ...p, home: home.field, kind, reason })
  }
  return { outliers, kept: keptIds }
}
