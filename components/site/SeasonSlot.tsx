/**
 * One of the four places a season may draw in (rebranding 6.1, board "D1.7 Seasonal themes"):
 * empty, hidden from screen readers, and placed by app/globals.css inside the nearest positioned
 * box, which the caller makes `relative`. It shows only in season, from the season's stylesheet.
 */
export function SeasonSlot({ slot }: { slot: 'mark' | 'hero' | 'band' | '404' }) {
  return <span aria-hidden="true" data-season-slot={slot} />
}
