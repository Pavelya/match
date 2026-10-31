import type { ReactNode } from 'react'
import { Eye, Pencil, School, Unlink } from 'lucide-react'
import { checkboxClasses } from '@/components/explore/checkbox'
import { FieldMessage } from '@/components/ds/Field'
import { IconTile } from '@/components/ds/IconTile'
import { cn } from '@/lib/utils'

/*
 * What a school's invitation shows (rebranding 4.3, board "D4.16 School invitation", approved 19
 * October 2026): the school in a panel without its flag (D2.5), what its coordinators can access,
 * with "You can unlink at any time in Settings." added, and the consent box. The new-account card
 * on /auth and the dialog on School invitations share them. Not a client module.
 */

export interface InvitedSchool {
  name: string
  /** "Krakow, Poland" */
  place: string
}

/** The school, in a panel on the paper */
export function SchoolPanel({ school }: { school: InvitedSchool }) {
  return (
    <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-x-3.5 rounded-card border border-border bg-background px-4 py-3.5">
      <IconTile icon={School} tone="brand" />
      <div className="flex min-w-0 flex-col">
        <p className="text-[0.9375rem] leading-[1.375rem] font-semibold [overflow-wrap:anywhere]">
          {school.name}
        </p>
        <p className="text-small font-normal text-muted-foreground">{school.place}</p>
      </div>
    </div>
  )
}

const ACCESS = [
  { icon: Eye, text: 'View your academic profile (courses, grades, TOK/EE)' },
  { icon: Eye, text: 'View your program matches and saved programs' },
  { icon: Pencil, text: 'Help manage your academic data' }
]

/** Today's three lines, and the way back */
export function AccessList({ heading, intro }: { heading?: ReactNode; intro?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      {heading}
      {intro && <p className="text-body text-muted-foreground">{intro}</p>}
      <ul className="flex flex-col gap-1.5">
        {ACCESS.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className="grid grid-cols-[1.125rem_minmax(0,1fr)] items-start gap-x-2.5 text-body text-foreground"
          >
            <Icon
              aria-hidden="true"
              size={18}
              strokeWidth={1.75}
              className="mt-[3px] text-muted-foreground"
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <p className="grid grid-cols-[1.125rem_minmax(0,1fr)] items-start gap-x-2.5 text-body text-muted-foreground">
        <Unlink aria-hidden="true" size={18} strokeWidth={1.75} className="mt-[3px]" />
        <span>You can unlink at any time in Settings.</span>
      </p>
    </div>
  )
}

export const REFUSED = 'Tick the box to accept the invitation.'

/**
 * The consent box, at the start of its sentence. Pressing accept without the tick gives it D2.2's
 * error edge and says why; nothing greys out.
 */
export function ConsentBox({
  id,
  school,
  checked,
  refused,
  onCheckedChange,
  inputRef
}: {
  id: string
  school: string
  checked: boolean
  refused: boolean
  onCheckedChange: (checked: boolean) => void
  inputRef?: React.Ref<HTMLInputElement>
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label
        className={cn(
          'press-lg grid cursor-pointer grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-x-3 rounded-[0.75rem] border',
          'has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring',
          refused
            ? 'border-2 border-gap bg-card px-[0.9375rem] py-[0.8125rem]'
            : checked
              ? 'border-primary bg-brand-soft px-4 py-3.5'
              : 'border-line-2 bg-card px-4 py-3.5 hover:border-line-3 active:border-line-3 active:bg-muted'
        )}
      >
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onCheckedChange(event.target.checked)}
          aria-invalid={refused || undefined}
          aria-describedby={refused ? `${id}-message` : undefined}
          className={cn(checkboxClasses, 'mt-0.5 focus-visible:outline-none')}
        />
        <span className="text-body">
          I understand and consent to <strong className="font-semibold">{school}</strong>{' '}
          coordinators accessing my account data as described above.
        </span>
      </label>
      {refused && (
        <FieldMessage id={`${id}-message`} tone="error" className="font-medium">
          {REFUSED}
        </FieldMessage>
      )}
    </div>
  )
}
