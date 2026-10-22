/**
 * Dynamic Sitemap Generator
 *
 * Generates a sitemap.xml including:
 * - Static pages (home, search, signin)
 * - Dynamic program detail pages from database
 * - University pages that list at least one program
 *
 * This helps search engines discover all indexable content.
 *
 * `lastModified` is only ever a real date: the content date from `lib/page-dates.ts`,
 * the newest program for search, or for a university the later of its own and its newest
 * program's. Pages with no known date leave it out. Never use `new Date()` here; it would
 * tell crawlers every page changed at the last build.
 */

import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { COUNTRY_PAGES, PAGE_DATES, type DatedPage } from '@/lib/page-dates'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

  // Get all programs for dynamic routes
  const programs = await prisma.academicProgram.findMany({
    select: { id: true, universityId: true, updatedAt: true }
  })

  // A university page lists its programs, so one with none is left out
  const universities = await prisma.university.findMany({
    where: { programs: { some: {} } },
    select: { id: true, updatedAt: true }
  })

  const programUrls: MetadataRoute.Sitemap = programs.map((program) => ({
    url: `${baseUrl}/programs/${program.id}`,
    lastModified: program.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8
  }))

  // The page shows its programs, so it changes when any of them does
  const newestProgramByUniversity = new Map<string, Date>()
  for (const program of programs) {
    const newest = newestProgramByUniversity.get(program.universityId)
    if (!newest || program.updatedAt > newest) {
      newestProgramByUniversity.set(program.universityId, program.updatedAt)
    }
  }

  const universityUrls: MetadataRoute.Sitemap = universities.map((university) => {
    const newestProgram = newestProgramByUniversity.get(university.id)
    return {
      url: `${baseUrl}/universities/${university.id}`,
      lastModified:
        newestProgram && newestProgram > university.updatedAt
          ? newestProgram
          : university.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7
    }
  })

  const datedPage = (
    path: DatedPage,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number
  ): MetadataRoute.Sitemap[number] => ({
    url: path === '/' ? baseUrl : `${baseUrl}${path}`,
    lastModified: PAGE_DATES[path].modified,
    changeFrequency,
    priority
  })

  // Search results change whenever a program does
  const latestProgramUpdate = programs.reduce<Date | undefined>(
    (latest, program) => (!latest || program.updatedAt > latest ? program.updatedAt : latest),
    undefined
  )

  return [
    datedPage('/', 'monthly', 1.0),
    {
      url: `${baseUrl}/programs/search`,
      lastModified: latestProgramUpdate,
      changeFrequency: 'daily',
      priority: 0.9
    },
    datedPage('/how-it-works', 'monthly', 0.7),
    datedPage('/ib-university-requirements', 'monthly', 0.9),
    ...COUNTRY_PAGES.map((path) => datedPage(path, 'monthly', 0.8)),
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    datedPage('/for-coordinators', 'monthly', 0.8),
    {
      // No date: the text can come from the CMS, which this file does not read
      url: `${baseUrl}/faqs`,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/support-us`,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/cookies`,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/auth/signin`,
      changeFrequency: 'monthly',
      priority: 0.3
    },
    ...programUrls,
    ...universityUrls
  ]
}
