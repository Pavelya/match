import type { ReactNode } from 'react'
import { FileText, Info, TriangleAlert } from 'lucide-react'
import { isNumbersOnly, numberColumns } from '@/lib/guides/guide'
import type { GuideBlock, GuideCard, GuideSource, GuideStep, GuideTable } from '@/lib/guides/types'
import { cn } from '@/lib/utils'
import { ExternalAnchor, RichText } from './RichText'

/*
 * The country guide's blocks (rebranding 4.2, boards "D4.12 Country guide" and "… · other
 * guides"). Server components: a guide sends no JavaScript of its own. Panels are surface with a
 * 1px line edge and radius 14; the two callouts have a transparent edge, which forced colours draw.
 */

const panel = 'rounded-card border border-border bg-card'
const list = 'flex list-disc flex-col gap-2.5 pl-5.5 marker:text-ink-3 [&>li]:pl-0.5'

export function GuideBlocks({ blocks }: { blocks: GuideBlock[] }) {
  return blocks.map((block, i) => <Block key={i} block={block} />)
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-body-l">
          <RichText text={block.text} />
        </p>
      )
    case 'list':
      return <Items items={block.items} className="text-body-l" />
    case 'subheading':
      return <h3 className="-mb-1 mt-2 text-h3">{block.text}</h3>
    case 'answer':
      return <Answer block={block} />
    case 'note':
      return (
        <Callout
          icon={<Info size={20} strokeWidth={2} aria-hidden="true" />}
          label="Note"
          tone="note"
        >
          <RichText text={block.text} />
        </Callout>
      )
    case 'caution':
      return (
        <Callout
          icon={<TriangleAlert size={20} strokeWidth={2} aria-hidden="true" />}
          label="Check this"
          tone="caution"
        >
          <RichText text={block.text} />
        </Callout>
      )
    case 'cards':
      return <Cards cards={block.cards} />
    case 'table':
      return (
        <>
          <Table table={block.table} />
          {block.note && <TableNote text={block.note} />}
        </>
      )
    case 'tables':
      return (
        <>
          <div className="grid items-start gap-3 lg:grid-cols-2 lg:gap-4">
            {block.tables.map((table) => (
              <Table key={table.caption} table={table} />
            ))}
          </div>
          {block.note && <TableNote text={block.note} />}
        </>
      )
    case 'timeline':
      return <Timeline steps={block.steps} />
    case 'documents':
      return (
        <ul className={panel}>
          {block.items.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3 px-4 py-3 not-first:border-t not-first:border-border md:px-5 md:py-3.5"
            >
              <FileText aria-hidden="true" size={20} className="text-muted-foreground" />
              <span className="text-body">
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      )
  }
}

function Items({ items, className }: { items: string[]; className: string }) {
  return (
    <ul className={cn(list, className)}>
      {items.map((item, i) => (
        <li key={i}>
          <RichText text={item} />
        </li>
      ))}
    </ul>
  )
}

/**
 * "No" in Newsreader, then its line in H3, then today's words. No status colour: "No" is good
 * news in Ireland and a warning in the UK. Screen readers hear "No: the IB Diploma is…".
 */
function Answer({ block }: { block: Extract<GuideBlock, { type: 'answer' }> }) {
  return (
    <div className={cn(panel, 'flex flex-col gap-2 p-5 md:px-7 md:py-6')}>
      <h3 className="flex flex-col gap-1 text-h3">
        {block.word && (
          <span className="text-h1">
            {block.word}
            {block.line && <span className="sr-only">:</span>}
          </span>
        )}
        {block.line && <span>{block.line}</span>}
      </h3>
      {block.paragraphs?.map((text) => (
        <p key={text} className="text-body-l text-muted-foreground">
          <RichText text={text} />
        </p>
      ))}
    </div>
  )
}

function Callout({
  icon,
  label,
  tone,
  children
}: {
  icon: ReactNode
  label: string
  tone: 'note' | 'caution'
  children: ReactNode
}) {
  return (
    <div
      role="note"
      aria-label={label}
      className={cn(
        'grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-x-3 rounded-card border border-transparent px-4 py-3.5 md:px-5 md:py-4',
        tone === 'note' ? 'bg-muted' : 'bg-close-soft'
      )}
    >
      <span className={cn('mt-0.5 flex', tone === 'note' ? 'text-muted-foreground' : 'text-close')}>
        {icon}
      </span>
      <p className="text-body">{children}</p>
    </div>
  )
}

function Cards({ cards }: { cards: GuideCard[] }) {
  return (
    <ul
      className={cn(
        'grid gap-3 md:gap-4',
        cards.length % 3 === 0 ? 'md:grid-cols-3' : 'md:grid-cols-2'
      )}
    >
      {cards.map((card) => (
        <li key={card.title} className={cn(panel, 'flex flex-col gap-2.5 p-5')}>
          <h3 className="text-h3">{card.title}</h3>
          {card.text && (
            <p className="text-body text-muted-foreground">
              <RichText text={card.text} />
            </p>
          )}
          {card.items && <Items items={card.items} className="text-body" />}
          {card.after && (
            <p className="text-body text-muted-foreground">
              <RichText text={card.after} />
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}

const cell = 'px-3 py-2.5 align-top md:px-4 md:py-3'

function Table({ table }: { table: GuideTable }) {
  const numbers = numberColumns(table)
  return (
    <div className={cn(panel, 'min-w-0 overflow-hidden', isNumbersOnly(table) && 'md:max-w-110')}>
      <table className="w-full border-collapse text-left">
        <caption className="caption-top border-b border-border px-3 py-3 text-left text-body font-semibold md:px-4 md:py-3.5">
          {table.caption}
        </caption>
        <thead>
          <tr>
            {table.columns.map((column, i) => (
              <th
                key={column}
                scope="col"
                className={cn(
                  cell,
                  'border-b border-border bg-muted text-label text-muted-foreground',
                  i > 0 && numbers[i] && 'text-right'
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-body">
          {table.rows.map((row, r) => (
            <tr key={r} className="not-first:border-t not-first:border-border">
              {row.map((value, i) => {
                const Cell = i === 0 ? 'th' : 'td'
                return (
                  <Cell
                    key={i}
                    scope={i === 0 ? 'row' : undefined}
                    className={cn(
                      cell,
                      i === 0 && 'font-semibold',
                      numbers[i] && 'whitespace-nowrap tabular-nums',
                      i > 0 && numbers[i] && 'text-right'
                    )}
                  >
                    <RichText text={value} />
                  </Cell>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TableNote({ text }: { text: string }) {
  return (
    <p className="-mt-1 text-body text-muted-foreground">
      <RichText text={text} />
    </p>
  )
}

function Timeline({ steps }: { steps: GuideStep[] }) {
  return (
    <ol className={panel}>
      {steps.map((step, i) => (
        <li
          key={i}
          className="flex flex-col gap-1.5 px-4 py-3.5 not-first:border-t not-first:border-border md:grid md:grid-cols-[10.5rem_minmax(0,1fr)] md:gap-x-6 md:px-5 md:py-4"
        >
          <p className="flex flex-col text-body tabular-nums">
            <span className="font-semibold">{step.date}</span>
            {/* Two words in the text, though the column stacks them */}
            {step.time && ' '}
            {step.time && <span className="text-small text-muted-foreground">{step.time}</span>}
          </p>
          <div className="flex min-w-0 flex-col gap-0.5">
            {step.title && <h3 className="text-h3">{step.title}</h3>}
            {step.text && (
              <p className="text-body text-muted-foreground">
                <RichText text={step.text} />
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

/** "Official source" or "Official sources", at the end of a section */
export function GuideSources({ sources }: { sources: GuideSource[] }) {
  return (
    <div className="mt-1 flex flex-col gap-1.5">
      <h3 className="text-label text-ink-3">
        {sources.length === 1 ? 'Official source' : 'Official sources'}
      </h3>
      <ul className="flex flex-col gap-1.5">
        {sources.map((source) =>
          source.href ? (
            <li key={source.label} className="text-body">
              <ExternalAnchor href={source.href} label={source.label} />
            </li>
          ) : (
            <li key={source.label} className="text-body text-muted-foreground">
              {source.label}
            </li>
          )
        )}
      </ul>
    </div>
  )
}
