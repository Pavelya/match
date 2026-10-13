import { cn } from '@/lib/utils'

/*
 * The checkbox Explore's menus and sheet draw (D3.5, D2.15) and the Shortlist's "Choose
 * programs" reuses (D3.7): the line-3 edge and a brand fill. A plain module, so the Shortlist's
 * chunk takes these classes without Explore's filters. D2.6 settles the checkbox row for first run
 * (3.1).
 */
export const checkboxClasses = cn(
  'grid size-5 shrink-0 cursor-pointer appearance-none place-content-center rounded-[5px] border border-line-3 bg-card',
  "after:hidden after:-mt-[3px] after:h-[5px] after:w-2.5 after:-rotate-45 after:border-b-2 after:border-l-2 after:border-primary-foreground after:content-['']",
  'checked:border-primary checked:bg-primary checked:after:block',
  // Ticked boxes take Highlight in forced colours (D2.15)
  'forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:forced-color-adjust-none forced-colors:after:border-[HighlightText] forced-colors:checked:border-[Highlight] forced-colors:checked:bg-[Highlight]'
)
