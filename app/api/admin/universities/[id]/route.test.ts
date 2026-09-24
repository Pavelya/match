import { beforeEach, describe, expect, it, vi } from 'vitest'

// A University row must never hold an inline base64 logo: every query that
// reads the whole row moves it, once per program when the row is joined. These
// tests pin down how the edit route turns the logo field into what it stores.

const { prismaMock, uploadMock } = vi.hoisted(() => ({
  prismaMock: {
    user: { findUnique: vi.fn() },
    university: { findUnique: vi.fn(), findFirst: vi.fn(), update: vi.fn() }
  },
  uploadMock: vi.fn()
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'admin-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
// The real client reads lib/env, which validates every variable at import.
vi.mock('@/lib/supabase/client', () => ({
  getSupabaseClient: vi.fn(),
  STORAGE_BUCKETS: { UNIVERSITY_IMAGES: 'university-images' }
}))
// Keep the real isBase64Image: what counts as base64 is part of the rule.
vi.mock('@/lib/supabase/storage', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/supabase/storage')>()),
  uploadUniversityImage: uploadMock
}))

import { PATCH } from './route'

const ID = 'uni-1'
const BASE64_LOGO = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD'
const STORAGE_URL = 'https://example.supabase.co/storage/v1/object/public/university-images/x.jpeg'

function patch(body: Record<string, unknown>) {
  return PATCH(
    new Request(`http://localhost/api/admin/universities/${ID}`, {
      method: 'PATCH',
      body: JSON.stringify(body)
    }),
    { params: Promise.resolve({ id: ID }) }
  )
}

function storedData() {
  return prismaMock.university.update.mock.calls[0]?.[0]?.data
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.user.findUnique.mockResolvedValue({ role: 'PLATFORM_ADMIN' })
  prismaMock.university.findUnique.mockResolvedValue({ id: ID, logo: null })
  prismaMock.university.update.mockImplementation(async ({ data }) => ({ id: ID, ...data }))
  uploadMock.mockResolvedValue(STORAGE_URL)
})

describe('PATCH /api/admin/universities/[id] — logo', () => {
  it('uploads a new base64 logo and stores its URL', async () => {
    const res = await patch({ logo: BASE64_LOGO })

    expect(res.status).toBe(200)
    expect(uploadMock).toHaveBeenCalledWith(BASE64_LOGO, `${ID}-logo`)
    expect(storedData()).toEqual({ logo: STORAGE_URL })
  })

  it('refuses with 502 and writes nothing when the upload fails', async () => {
    uploadMock.mockRejectedValue(new Error('exceed_egress_quota'))

    const res = await patch({ logo: BASE64_LOGO, name: 'Renamed' })

    expect(res.status).toBe(502)
    expect(prismaMock.university.update).not.toHaveBeenCalled()
  })

  // The edit form sends the stored logo back on every save. Re-uploading it
  // would store a new copy each time, and while Storage is unavailable no
  // university with an inline logo could be edited at all.
  it('leaves an unchanged logo alone, even one still stored as base64', async () => {
    prismaMock.university.findUnique.mockResolvedValue({ id: ID, logo: BASE64_LOGO })

    const res = await patch({ logo: BASE64_LOGO, city: 'Toronto' })

    expect(res.status).toBe(200)
    expect(uploadMock).not.toHaveBeenCalled()
    expect(storedData()).toEqual({ city: 'Toronto' })
  })

  it('stores a URL as given', async () => {
    const res = await patch({ logo: ` ${STORAGE_URL} ` })

    expect(res.status).toBe(200)
    expect(uploadMock).not.toHaveBeenCalled()
    expect(storedData()).toEqual({ logo: STORAGE_URL })
  })

  it('clears the logo when sent empty', async () => {
    prismaMock.university.findUnique.mockResolvedValue({ id: ID, logo: STORAGE_URL })

    const res = await patch({ logo: '' })

    expect(res.status).toBe(200)
    expect(storedData()).toEqual({ logo: null })
  })

  it('does not return the logo in the response', async () => {
    await patch({ city: 'Toronto' })

    const { select } = prismaMock.university.update.mock.calls[0][0]
    expect(select).not.toHaveProperty('logo')
    // The Algolia extension's university.update hook reads both.
    expect(select).toMatchObject({ id: true, name: true })
  })
})
