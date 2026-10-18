import type { CardStatus, ChipKind } from '@/lib/matching/match-status'

/*
 * The three matches in Home's preview (rebranding 4.1, board "D4.1 Home"): real programs with
 * their requirements as stored on 18 October 2026, each checked for 2027 entry, for D3.1's student
 * (38 points; English A: Literature SL 6, Spanish B SL 6, Economics HL 6, Physics HL 6,
 * Mathematics: Analysis and Approaches HL 6, Chemistry SL 6). Fixed here, so Home reads nothing;
 * check them at each content refresh. lib/matching/match-status.test.ts runs the matcher over the
 * same requirements, so the words stay the ones a real card would show.
 */

export interface PreviewMatch {
  initials: string
  name: string
  university: string
  country: string
  status: CardStatus
  badge: string
  chips: { kind: ChipKind; label: string }[]
}

export const PREVIEW_POINTS = 38

export const PREVIEW_MATCHES: readonly PreviewMatch[] = [
  {
    initials: 'UE',
    name: 'Computer Science BSc (Hons)',
    university: 'University of Edinburgh',
    country: 'United Kingdom',
    status: 'meets',
    badge: 'Meets all requirements',
    chips: [
      { kind: 'met', label: '38 / 34 points' },
      { kind: 'met', label: 'Maths AA HL 6' },
      { kind: 'met', label: 'English A Lit SL 5' }
    ]
  },
  {
    initials: 'ICL',
    name: 'Economics, Finance and Data Science',
    university: 'Imperial College London',
    country: 'United Kingdom',
    status: 'close',
    badge: 'Within reach · 1 point, 1 grade',
    chips: [
      { kind: 'close', label: '38 / 39 points' },
      { kind: 'close', label: 'Maths AA HL 7 · you 6' }
    ]
  },
  {
    initials: 'TCD',
    name: 'Computer Science, Linguistics and a Language',
    university: 'Trinity College Dublin',
    country: 'Ireland',
    status: 'gap',
    badge: 'Needs Spanish B HL',
    chips: [
      { kind: 'gap', label: 'Spanish B HL 5 or 5 others · you SL' },
      { kind: 'met', label: '38 / 34 points' },
      { kind: 'met', label: 'English A Lit SL 4' },
      { kind: 'met', label: 'Maths AA HL 5' }
    ]
  }
]
