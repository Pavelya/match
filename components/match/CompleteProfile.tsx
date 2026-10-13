import { GraduationCap } from 'lucide-react'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { EmptyState } from '@/components/ds/EmptyState'
import { APP_PLACES } from '@/components/site/nav'
import type { ProfileStep } from '@/lib/matching/match-groups'

/**
 * "Complete your academic profile" (rebranding 2.2, board "D2.11 Empty and error states"; F6 in
 * 03-flows.md): first run's steps with the saved ones ticked, on Matches and, from 2.5, on the
 * Shortlist, for a student without subjects and grades.
 */
export function CompleteProfile({ steps }: { steps: ProfileStep[] }) {
  const choicesSaved = steps.filter((s) => s.name !== 'Subjects and grades').every((s) => s.done)
  return (
    <EmptyState
      icon={GraduationCap}
      tone="brand"
      title="Complete your academic profile"
      steps={steps}
      actions={
        <>
          <ButtonLink href={APP_PLACES.academic.href}>
            {choicesSaved ? 'Add subjects and grades' : 'Get started'}
          </ButtonLink>
          <ButtonLink href={APP_PLACES.explore.href} variant="secondary">
            Explore programs
          </ButtonLink>
        </>
      }
      meta="About 2 minutes. You can change it any time."
    >
      Add your six IB subjects and grades, and we’ll match you with programs in your fields and
      countries.
    </EmptyState>
  )
}
