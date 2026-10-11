/** Countries as a sentence names them: "the UK", "the Netherlands" */
const IN_PROSE: Record<string, string> = {
  'United Kingdom': 'the UK',
  'United States': 'the USA',
  Netherlands: 'the Netherlands',
  'United Arab Emirates': 'the UAE',
  'Czech Republic': 'the Czech Republic',
  Philippines: 'the Philippines'
}

export function inProse(country: string): string {
  return IN_PROSE[country] ?? country
}
