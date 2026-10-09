/**
 * IB course names as the new cards show them (rebranding 2.1, owner, 9 October 2026). Chips
 * are short on a phone: "Maths AA HL 7 · you 6", not "Mathematics: Analysis and Approaches
 * HL 7 · you 6". Keyed by the stored `IBCourse.name`; a course not listed keeps its name, so a
 * new or renamed course shows in full rather than wrongly. Board D3.1 confirms the list.
 *
 * Production, 9 October 2026: 55 courses; these are the ones longer than a chip can carry.
 */
const SHORT_NAMES: Record<string, string> = {
  'English A: Language & Literature': 'English A Lang & Lit',
  'English A: Literature': 'English A Lit',
  'French A: Language & Literature': 'French A Lang & Lit',
  'French A: Literature': 'French A Lit',
  'German A: Language & Literature': 'German A Lang & Lit',
  'German A: Literature': 'German A Lit',
  'Mandarin A: Language & Literature': 'Mandarin A Lang & Lit',
  'Mandarin A: Literature': 'Mandarin A Lit',
  'Spanish A: Language & Literature': 'Spanish A Lang & Lit',
  'Spanish A: Literature': 'Spanish A Lit',
  'Mathematics: Analysis and Approaches': 'Maths AA',
  'Mathematics: Applications and Interpretation': 'Maths AI',
  'Environmental Systems and Societies': 'ESS',
  'Sports, Exercise and Health Science': 'SEHS',
  'Social and Cultural Anthropology': 'Anthropology'
}

/** "Maths AA" for "Mathematics: Analysis and Approaches"; any other name as it is. */
export function shortCourseName(name: string): string {
  return SHORT_NAMES[name] ?? name
}
