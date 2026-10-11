import { auth } from '@/lib/auth/config'
import { ExploreQuestions } from '@/components/explore/ExploreQuestions'
import { catalogueSummary, chosenCount, readExplore, type ExploreQuery } from '@/lib/explore/query'
import { getCatalogueSize, searchExplore } from '@/lib/explore/search'
import { exploreViewer, qualifier } from '@/lib/explore/student'
import { SIGNED_OUT, type ExploreRow } from '@/lib/explore/types'
import { logger } from '@/lib/logger'
import { getCachedCountriesWithPrograms, getCachedFields } from '@/lib/reference-data'
import { NewExplore } from './NewExplore'

/**
 * Explore in the new design (rebranding 2.3), on the server: the list the URL asks for, with as
 * many rows as it had shown, in the HTML for everyone, as today. Signed in, one narrow read of
 * the profile says whether the student has grades (the fit column and the switch), gives the
 * shortcuts their choices, and marks what's on the shortlist. Signed out, nothing is read.
 */
export async function NewExplorePage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(searchParams)) {
    const first = Array.isArray(value) ? value[0] : value
    if (first !== undefined) params.set(key, first)
  }
  const asked = readExplore(params)

  const session = await auth()
  const userId = session?.user?.id
  const [{ viewer, student }, fields, countries] = await Promise.all([
    userId ? exploreViewer(userId) : { viewer: SIGNED_OUT, student: null },
    getCachedFields(),
    getCachedCountriesWithPrograms()
  ])
  // The switch needs grades; without them, the list without it
  const query: ExploreQuery = student ? asked.query : { ...asked.query, qualify: false }

  let list: { total: number; rows: ExploreRow[] } | null = null
  try {
    const qualifies = query.qualify && student ? await qualifier(student) : undefined
    list = await searchExplore(query, { offset: 0, length: asked.shown }, qualifies)
  } catch (error) {
    logger.error('Explore failed to load', { error })
  }

  // The catalogue's size: the list's own total when nothing narrows it, else counted hourly
  const whole = query.q === '' && chosenCount(query) === 0 && !query.qualify
  const catalogue = list && whole ? list.total : await getCatalogueSize().catch(() => null)

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-4 pt-4 pb-16 md:px-6 md:pt-10 md:pb-20">
      <NewExplore
        initial={{
          query,
          shown: asked.shown,
          total: list?.total ?? 0,
          rows: list?.rows ?? [],
          failed: list === null
        }}
        viewer={viewer}
        fields={fields.map((f) => ({ id: f.id, name: f.name }))}
        countries={countries.map((c) => ({ id: c.id, name: c.name }))}
        summary={catalogue ? catalogueSummary(catalogue, countries.length) : null}
      />
      <ExploreQuestions />
    </div>
  )
}
