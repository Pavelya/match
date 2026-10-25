/**
 * Admin Seasonal Themes Page (rebranding 6.1)
 *
 * When each season's decoration shows in the new design, with no code change and no deploy.
 * Lists every season built in code (lib/seasons/seasons.ts) with its switch, its dates and a
 * Preview link, and the "All seasonal decorations off" switch. Staff areas keep today's design.
 */

import { Sparkles } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/admin/shared'
import { SeasonalThemesClient } from '@/components/admin/seasonal-themes/SeasonalThemesClient'
import { prisma } from '@/lib/prisma'
import { ALL_OFF_KEY, SEASONS, dayOf } from '@/lib/seasons/seasons'

export default async function AdminSeasonalThemesPage() {
  // The admin layout has checked the role. A season without a row is off, with no dates.
  const rows = await prisma.seasonalTheme.findMany({
    select: { key: true, enabled: true, startsOn: true, endsOn: true }
  })
  const row = (key: string) => rows.find((r) => r.key === key)

  return (
    <PageContainer maxWidth="3xl">
      <PageHeader
        title="Seasonal Themes"
        icon={Sparkles}
        description="Small drawings in four places of the new design, for a few days around a holiday: beside the logo, in Home's headline, in the lime band on Home and the country guides, and on the 404 page. No words, and nothing else changes."
      />

      <SeasonalThemesClient
        allOff={row(ALL_OFF_KEY)?.enabled ?? false}
        seasons={SEASONS.map((season) => {
          const saved = row(season.key)
          return {
            key: season.key,
            name: season.name,
            usualWindow: season.usualWindow,
            enabled: saved?.enabled ?? false,
            startsOn: saved?.startsOn ? dayOf(saved.startsOn) : null,
            endsOn: saved?.endsOn ? dayOf(saved.endsOn) : null
          }
        })}
      />
    </PageContainer>
  )
}
