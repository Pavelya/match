import 'server-only'
import { unstable_cache } from 'next/cache'
import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'
import { scheduleFromRows } from './pick'
import { ALL_OFF_KEY, SEASON_TAG, dayOf, type SeasonWindow } from './seasons'

/*
 * The seasons' schedule for the root layout (rebranding 6.1), read for the new design only. Cached
 * with no time limit under SEASON_TAG, as lib/reference-data.ts caches its lists, so it is one
 * small query each time the cache fills, which is after the admin saves, never per visit. A static
 * page keeps the tag, so a save renders it again on its next visit. Draft Mode skips the cache, so
 * the preview reads it on each of the owner's views.
 */

const readSchedule = unstable_cache(
  async (): Promise<SeasonWindow[]> => {
    const rows = await prisma.seasonalTheme.findMany({
      where: { OR: [{ key: ALL_OFF_KEY }, { enabled: true }] },
      select: { key: true, enabled: true, startsOn: true, endsOn: true }
    })
    // Plain strings, which the cache keeps as they are (it would turn a Date into a string)
    return scheduleFromRows(rows, dayOf(new Date()))
  },
  [SEASON_TAG],
  { tags: [SEASON_TAG] }
)

/** The windows for the head script. A failed read means no season, and is not cached. */
export async function seasonSchedule(): Promise<SeasonWindow[]> {
  try {
    return await readSchedule()
  } catch (error) {
    logger.warn('Seasonal themes: schedule not read, no season shown', { error })
    return []
  }
}
