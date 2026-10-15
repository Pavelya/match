'use client'

import { useMemo } from 'react'
import {
  CircleAlert,
  CircleCheck,
  Info,
  Lightbulb,
  NotebookPen,
  type LucideIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Segmented } from '@/components/ds/Segmented'
import { SubjectPicker } from '@/components/ds/SubjectPicker'
import { CORE_GRADES } from '@/lib/ib/core-points'
import {
  ROW_LABELS,
  coreLine,
  coreMessage,
  higherLevelLine,
  ibConditions,
  listLabel,
  pickerGroups,
  type EditorCourse,
  type EditorTarget,
  type Level,
  type SubjectRow,
  type SubjectsState
} from '@/lib/student/subject-editor'

/*
 * The subject editor (rebranding 3.2; boards "D3.6 Subject editor" and "D4.5 First run, step 3",
 * approved 14 October 2026), for first run's step 3 and for editing later. Six rows, one per IB
 * group, each the subject picker (D2.3), then the level and the predicted grade as radio groups
 * (D2.4); the diploma checks under them; then TOK and the Extended Essay. Desktop: each subject on
 * one line in the 880px column, under a header that names the columns once, and the core in a
 * second panel. Phone: the controls stack. The total and Finish are the page's footer. It replaces
 * SubjectSelectorDialog, DetailedGradesInput, QuickScoreInput and StepIndicator.
 */

const LEVELS = [
  { value: 'SL', label: 'SL' },
  { value: 'HL', label: 'HL' }
] as const
const GRADES = [1, 2, 3, 4, 5, 6, 7].map((n) => ({ value: n, label: n }))
const CORE = CORE_GRADES.map((g) => ({ value: g as string, label: g }))

/** The desktop columns: the field, the level (104px) and seven grades of 44px (344px) */
const COLUMNS = 'md:grid md:grid-cols-[minmax(0,1fr)_6.5rem_21.5rem] md:gap-x-3'

const CHECKS_ID = 'subject-checks'

/** Moves focus to what Finish is waiting for, in the middle of the screen, clear of the footer */
export function focusEditorTarget(target: EditorTarget) {
  const radios = (id: string) => {
    const set = document.getElementById(id)
    return (
      set?.querySelector<HTMLElement>('input:checked') ?? set?.querySelector<HTMLElement>('input')
    )
  }
  const element =
    'row' in target
      ? target.part === 'subject'
        ? document.getElementById(`subject-${target.row}`)
        : radios(`${target.part}-${target.row}`)
      : 'core' in target
        ? radios(`core-${target.core}`)
        : document.getElementById(CHECKS_ID)
  if (!element) return
  element.focus({ preventScroll: true })
  element.scrollIntoView({ block: 'center' })
}

export function ProfileEditor({
  courses,
  value,
  onChange
}: {
  courses: EditorCourse[]
  value: SubjectsState
  onChange: (next: SubjectsState) => void
}) {
  const names = useMemo(() => new Map(courses.map((c) => [c.id, c.name])), [courses])
  const higher = higherLevelLine(value.rows)
  const conditions = ibConditions(value, courses)
  const hasChecks = Boolean(higher) || conditions.length > 0

  const setRow = (index: number, change: Partial<SubjectRow>) =>
    onChange({
      ...value,
      rows: value.rows.map((row, i) => (i === index ? { ...row, ...change } : row))
    })

  return (
    <>
      <fieldset
        aria-labelledby="subjects-heading"
        aria-describedby={hasChecks ? CHECKS_ID : undefined}
        className="m-0 flex min-w-0 flex-col border-0 p-0 md:rounded-[0.875rem] md:border md:border-border md:bg-card"
      >
        <div className={cn(COLUMNS, 'md:items-end md:px-4 md:pt-3.5 md:pb-2.5')}>
          <h3
            id="subjects-heading"
            className="mb-1 text-[0.9375rem]/[1.375rem] font-semibold md:mb-0"
          >
            Your six subjects
          </h3>
          <span aria-hidden="true" className="hidden text-small text-muted-foreground md:block">
            Level
          </span>
          <span aria-hidden="true" className="hidden text-small text-muted-foreground md:block">
            Predicted grade
          </span>
        </div>
        {value.rows.map((row, index) => (
          <SubjectRowEditor
            key={index}
            index={index}
            row={row}
            name={row.courseId ? (names.get(row.courseId) ?? ROW_LABELS[index]) : ROW_LABELS[index]}
            courses={courses}
            rows={value.rows}
            onChange={(change) => setRow(index, change)}
          />
        ))}
      </fieldset>

      {hasChecks && (
        <div id={CHECKS_ID} tabIndex={-1} className="flex flex-col gap-3.5 outline-none">
          {higher && (
            <CheckLine
              icon={higher.tone === 'ok' ? CircleCheck : higher.tone === 'gap' ? CircleAlert : Info}
              className={cn(
                higher.tone === 'info' && 'text-muted-foreground',
                higher.tone === 'gap' && 'font-medium text-gap',
                higher.tone === 'ok' && '[&_svg]:text-ok'
              )}
            >
              {higher.text}
            </CheckLine>
          )}
          {conditions.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-[0.9375rem]/[1.375rem] font-semibold">
                With these grades, the IB wouldn’t award the diploma:
              </p>
              <ul className="flex flex-col gap-1.5">
                {conditions.map((condition) => (
                  <li key={condition}>
                    <CheckLine icon={CircleAlert} className="font-medium text-gap">
                      {condition}
                    </CheckLine>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <CoreGrades
        tok={value.tok}
        ee={value.ee}
        onChange={(change) => onChange({ ...value, ...change })}
      />
    </>
  )
}

function CheckLine({
  icon: Icon,
  className,
  children
}: {
  icon: LucideIcon
  className?: string
  children: string
}) {
  return (
    <p className={cn('flex items-start gap-2.5 text-[0.9375rem]/[1.375rem]', className)}>
      <Icon aria-hidden="true" size={18} strokeWidth={2} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </p>
  )
}

/**
 * One subject: the field, labelled by its group, then Level and Predicted grade, named with the
 * subject ("Level, Physics"). Both wait for a subject and have no default. Picking another subject
 * keeps the level and grade. A chosen 1 turns red, as an E does: the IB awards no diploma with it.
 */
function SubjectRowEditor({
  index,
  row,
  name,
  courses,
  rows,
  onChange
}: {
  index: number
  row: SubjectRow
  name: string
  courses: EditorCourse[]
  rows: SubjectRow[]
  onChange: (change: Partial<SubjectRow>) => void
}) {
  const groups = useMemo(() => pickerGroups(courses, rows, index), [courses, rows, index])
  const empty = row.courseId === null
  return (
    <div
      className={cn(
        COLUMNS,
        'flex flex-col gap-2 border-t border-border py-4 md:items-end md:px-4 md:py-3.5'
      )}
    >
      <SubjectPicker
        id={`subject-${index}`}
        label={<span className="text-muted-foreground">{ROW_LABELS[index]}</span>}
        groups={groups}
        value={row.courseId}
        onValueChange={(courseId) => onChange({ courseId })}
        firstGroup={listLabel(index + 1)}
        // On a phone the open list brings its field up under the 56px header (D4.5)
        className="scroll-mt-[4.5rem]"
      />
      <Segmented
        id={`level-${index}`}
        legend={`Level, ${name}`}
        hideLegend
        options={LEVELS}
        value={row.level}
        onValueChange={(level: Level) => onChange({ level })}
        disabled={empty}
      />
      <Segmented
        id={`grade-${index}`}
        legend={`Predicted grade, ${name}`}
        hideLegend
        variant="separate"
        optionWidth={44}
        options={GRADES}
        value={row.grade}
        onValueChange={(grade) => onChange({ grade })}
        disabled={empty}
        invalid={row.grade === 1}
      />
    </div>
  )
}

const CORE_PARTS = [
  { key: 'tok', name: 'Theory of Knowledge', icon: Lightbulb },
  { key: 'ee', name: 'Extended Essay', icon: NotebookPen }
] as const

/**
 * The core: TOK and the Extended Essay, A to E. An E fails the diploma: D2.4's message under the
 * first E, which describes both when both are E. The line under them says what the core adds.
 */
function CoreGrades({
  tok,
  ee,
  onChange
}: {
  tok: string | null
  ee: string | null
  onChange: (change: { tok?: string; ee?: string }) => void
}) {
  const message = coreMessage(tok, ee)
  const line = coreLine(tok, ee)
  return (
    <section
      aria-labelledby="core-heading"
      className="flex flex-col gap-3.5 border-t border-border pt-4 md:rounded-[0.875rem] md:border md:bg-card md:px-4 md:py-3.5"
    >
      <h3 id="core-heading" className="text-[0.9375rem]/[1.375rem] font-semibold">
        The core
      </h3>
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-6">
        {CORE_PARTS.map(({ key, name, icon: Icon }) => {
          const grade = key === 'tok' ? tok : ee
          const here = message?.under === key
          return (
            <Segmented
              key={key}
              id={`core-${key}`}
              legend={
                <span className="flex items-center gap-2.5 text-[0.9375rem]/[1.375rem] font-medium">
                  <span className="inline-flex size-8 items-center justify-center rounded-[0.5rem] border border-transparent bg-muted text-muted-foreground">
                    <Icon aria-hidden="true" size={18} strokeWidth={1.75} />
                  </span>
                  {name}
                </span>
              }
              variant="separate"
              stretch
              options={CORE}
              value={grade}
              onValueChange={(g) => onChange({ [key]: g })}
              error={here ? message.text : undefined}
              invalid={grade === 'E'}
              describedBy={
                message && !here && grade === 'E' ? `core-${message.under}-message` : undefined
              }
            />
          )
        })}
      </div>
      {line && (
        <p className="border-t border-border pt-3 text-small text-muted-foreground tabular-nums">
          {line}
        </p>
      )}
    </section>
  )
}
