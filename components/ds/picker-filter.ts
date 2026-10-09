/**
 * Filtering for SubjectPicker (rebranding 1.2, canvas board "D2.3 Select and subject picker").
 * Kept apart from the component so it can be tested without a browser.
 */

export interface PickerOption {
  value: string
  /** As stored, "&" included: "English A: Language & Literature". */
  label: string
  /** Shown greyed with `note` and can't be picked, but stays in the list so it keeps its shape. */
  disabled?: boolean
  /** "In your subjects" */
  note?: string
}

export interface PickerGroup {
  /** "Group 1 · Language and literature" */
  label: string
  options: PickerOption[]
}

/** Lower case without accents, so "francais" finds "Français". */
function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('en')
}

/**
 * The groups to show for `query`: every option whose name contains it anywhere ("lit" finds each
 * Literature subject and Literature and Performance), with the row's own group first and empty
 * groups left out. A blank query keeps every option.
 */
export function filterPickerGroups(
  groups: readonly PickerGroup[],
  query: string,
  firstGroup?: string
): PickerGroup[] {
  const needle = fold(query.trim())
  const ordered = firstGroup
    ? [
        ...groups.filter((group) => group.label === firstGroup),
        ...groups.filter((group) => group.label !== firstGroup)
      ]
    : [...groups]

  return ordered
    .map((group) => ({
      ...group,
      options: needle
        ? group.options.filter((option) => fold(option.label).includes(needle))
        : group.options
    }))
    .filter((group) => group.options.length > 0)
}

/**
 * Where `query` first appears in `label`, as [start, end) in `label`'s own characters, or null.
 * Lets the picker set the typed letters in bold: "<b>Fre</b>nch B".
 */
export function findMatch(label: string, query: string): [number, number] | null {
  const needle = fold(query.trim())
  if (!needle) return null
  // Fold one character at a time, so positions map back to `label` even where an accent drops.
  const folded: string[] = []
  const origin: number[] = []
  for (let i = 0; i < label.length; i++) {
    for (const char of fold(label[i])) {
      folded.push(char)
      origin.push(i)
    }
  }
  const at = folded.join('').indexOf(needle)
  if (at === -1) return null
  return [origin[at], origin[at + needle.length - 1] + 1]
}

/** "4 subjects", "1 subject", "No subjects": what the live region says after each keystroke. */
export function countLabel(count: number, noun = 'subject'): string {
  if (count === 0) return `No ${noun}s`
  return `${count} ${noun}${count === 1 ? '' : 's'}`
}
