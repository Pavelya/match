// IB Subject Groups - Official IB Curriculum Structure
export const IB_SUBJECT_GROUPS = [
  {
    id: 1,
    name: 'Studies in Language and Literature',
    shortName: 'Group 1',
    description: 'Language A courses',
    icon: '📚'
  },
  {
    id: 2,
    name: 'Language Acquisition',
    shortName: 'Group 2',
    description: 'Language B and ab initio courses',
    icon: '🗣️'
  },
  {
    id: 3,
    name: 'Individuals and Societies',
    shortName: 'Group 3',
    description: 'Humanities and Social Sciences',
    icon: '🌍'
  },
  {
    id: 4,
    name: 'Sciences',
    shortName: 'Group 4',
    description: 'Natural Sciences',
    icon: '🔬'
  },
  {
    id: 5,
    name: 'Mathematics',
    shortName: 'Group 5',
    description: 'Mathematics courses',
    icon: '📐'
  },
  {
    id: 6,
    name: 'The Arts',
    shortName: 'Group 6',
    description: 'Arts courses',
    icon: '🎨'
  }
] as const

export type IBSubjectGroup = (typeof IB_SUBJECT_GROUPS)[number]

// Helper function to get group info
export function getSubjectGroup(groupId: number): IBSubjectGroup | undefined {
  return IB_SUBJECT_GROUPS.find((g) => g.id === groupId)
}

// Helper to get all groups
export function getAllSubjectGroups() {
  return IB_SUBJECT_GROUPS
}
