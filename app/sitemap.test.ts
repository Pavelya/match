import { beforeEach, describe, expect, it, vi } from 'vitest'

// University pages in the sitemap (MAINT 5.17): only those with programs, each dated by the later
// of its own change and its newest program's, since the page lists them.

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    academicProgram: { findMany: vi.fn() },
    university: { findMany: vi.fn() }
  }
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))

import sitemap from './sitemap'

const BASE = 'https://www.ibmatch.com'

describe('sitemap', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv('NEXT_PUBLIC_BASE_URL', BASE)
    prismaMock.academicProgram.findMany.mockResolvedValue([
      { id: 'p1', universityId: 'u1', updatedAt: new Date('2026-09-01') },
      { id: 'p2', universityId: 'u1', updatedAt: new Date('2026-10-05') },
      { id: 'p3', universityId: 'u2', updatedAt: new Date('2026-08-01') }
    ])
    // The database returns only universities with programs; u3 has none, so it isn't here
    prismaMock.university.findMany.mockResolvedValue([
      { id: 'u1', updatedAt: new Date('2026-07-01') },
      { id: 'u2', updatedAt: new Date('2026-10-10') }
    ])
  })

  function universityEntries(entries: Awaited<ReturnType<typeof sitemap>>) {
    return entries.filter((entry) => entry.url.startsWith(`${BASE}/universities/`))
  }

  it('lists each university with programs, dated by the later of its own and its newest program', async () => {
    const entries = universityEntries(await sitemap())

    expect(entries).toEqual([
      {
        url: `${BASE}/universities/u1`,
        lastModified: new Date('2026-10-05'),
        changeFrequency: 'monthly',
        priority: 0.7
      },
      {
        url: `${BASE}/universities/u2`,
        lastModified: new Date('2026-10-10'),
        changeFrequency: 'monthly',
        priority: 0.7
      }
    ])
  })

  it('asks only for universities with programs, and only their ids and dates', async () => {
    const entries = await sitemap()

    expect(prismaMock.university.findMany).toHaveBeenCalledWith({
      where: { programs: { some: {} } },
      select: { id: true, updatedAt: true }
    })
    expect(entries.some((entry) => entry.url.endsWith('/universities/u3'))).toBe(false)
  })

  it('keeps the program entries as they were', async () => {
    const entries = await sitemap()

    expect(entries.find((entry) => entry.url === `${BASE}/programs/p2`)).toEqual({
      url: `${BASE}/programs/p2`,
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'weekly',
      priority: 0.8
    })
  })
})
