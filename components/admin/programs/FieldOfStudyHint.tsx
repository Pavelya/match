/**
 * Field of Study hint (MAINT 5.16)
 *
 * The line under the field select in the admin program forms. It says which field the
 * fields-of-study rule (lib/programs/fields-of-study.ts) gives the program's name, and why the
 * rule disagrees when another field is selected. It never changes the field itself: the new
 * form pre-selects the suggestion on its own, and an admin can always keep a different field.
 */

'use client'

import type { FieldSuggestion } from '@/lib/programs/fields-of-study'

interface FieldOfStudyHintProps {
  suggestion: FieldSuggestion | null
  /** The suggested field's id, or null when no stored field has its name. */
  suggestedId: string | null
  selectedId: string
  /** True once the admin has picked the field (always, on the edit form). */
  picked: boolean
  onPick: (fieldId: string) => void
}

export function FieldOfStudyHint({
  suggestion,
  suggestedId,
  selectedId,
  picked,
  onPick
}: FieldOfStudyHintProps) {
  if (!suggestion || !suggestedId || !selectedId) return null

  if (selectedId === suggestedId) {
    if (picked) return null
    return (
      <p className="text-xs text-muted-foreground mt-1">
        Suggested from the name: {suggestion.field} ({suggestion.reason})
      </p>
    )
  }

  const field = (
    <button type="button" onClick={() => onPick(suggestedId)} className="underline font-medium">
      {suggestion.field}
    </button>
  )

  if (suggestion.kept) {
    return (
      <p className="text-xs text-amber-700 mt-1">
        The owner keeps this program under {field}: {suggestion.reason}.
      </p>
    )
  }

  return (
    <div className="text-xs mt-1 space-y-1">
      <p className="text-amber-700">
        The fields-of-study rule files this name under {field} ({suggestion.reason}). Keep your
        choice only if the name misleads it.
      </p>
      <p className="text-muted-foreground">
        A field kept on purpose stays on the field inventory&apos;s outlier list until the
        program&apos;s id is added to <code>KEPT</code> in{' '}
        <code>lib/programs/fields-of-study.ts</code> with the owner&apos;s reason.
      </p>
    </div>
  )
}
