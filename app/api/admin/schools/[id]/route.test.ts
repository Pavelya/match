import { beforeEach, describe, expect, it, vi } from 'vitest'

// An IBSchool row must never hold an inline base64 logo; see the note in
// ../route.test.ts. These tests pin down how the edit route turns the logo
// field into what it stores.

const { prismaMock, uploadMock } = vi.hoisted(() => ({
  prismaMock: {
    user: { findUnique: vi.fn() },
    country: { findUnique: vi.fn() },
    iBSchool: { findUnique: vi.fn(), findFirst: vi.fn(), update: vi.fn() }
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

const ID = 'school-1'
const BASE64_LOGO = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD'
const STORAGE_URL = 'https://example.supabase.co/storage/v1/object/public/university-images/s.jpeg'

function patch(body: Record<string, unknown>) {
  return PATCH(
    new Request(`http://localhost/api/admin/schools/${ID}`, {
      method: 'PATCH',
      body: JSON.stringify(body)
    }),
    { params: Promise.resolve({ id: ID }) }
  )
}

function storedData() {
  return prismaMock.iBSchool.update.mock.calls[0]?.[0]?.data
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.user.findUnique.mockResolvedValue({ role: 'PLATFORM_ADMIN' })
  prismaMock.iBSchool.findUnique.mockResolvedValue({ id: ID, logo: null })
  prismaMock.iBSchool.findFirst.mockResolvedValue(null)
  prismaMock.iBSchool.update.mockImplementation(async ({ data }) => ({ id: ID, ...data }))
  uploadMock.mockResolvedValue(STORAGE_URL)
})

describe('PATCH /api/admin/schools/[id] — logo', () => {
  it('uploads a new base64 logo and stores its URL', async () => {
    const res = await patch({ logo: BASE64_LOGO })

    expect(res.status).toBe(200)
    expect(uploadMock).toHaveBeenCalledWith(BASE64_LOGO, `school-${ID}-logo`)
    expect(storedData()).toEqual({ logo: STORAGE_URL })
  })

  it('refuses with 502 and writes nothing when the upload fails', async () => {
    uploadMock.mockRejectedValue(new Error('exceed_egress_quota'))

    const res = await patch({ logo: BASE64_LOGO, name: 'Renamed' })

    expect(res.status).toBe(502)
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })

  // The edit form sends the stored logo back on every save.
  it('leaves an unchanged logo alone', async () => {
    prismaMock.iBSchool.findUnique.mockResolvedValue({ id: ID, logo: STORAGE_URL })

    const res = await patch({ logo: STORAGE_URL, city: 'Prague' })

    expect(res.status).toBe(200)
    expect(uploadMock).not.toHaveBeenCalled()
    expect(storedData()).toEqual({ city: 'Prague' })
  })

  it('stores a URL as given', async () => {
    const res = await patch({ logo: ` ${STORAGE_URL} ` })

    expect(res.status).toBe(200)
    expect(uploadMock).not.toHaveBeenCalled()
    expect(storedData()).toEqual({ logo: STORAGE_URL })
  })

  it('clears the logo when sent empty', async () => {
    prismaMock.iBSchool.findUnique.mockResolvedValue({ id: ID, logo: STORAGE_URL })

    const res = await patch({ logo: '' })

    expect(res.status).toBe(200)
    expect(storedData()).toEqual({ logo: null })
  })

  it('uploads nothing for a request it refuses', async () => {
    const res = await patch({ logo: BASE64_LOGO, city: ' ' })

    expect(res.status).toBe(400)
    expect(uploadMock).not.toHaveBeenCalled()
    expect(prismaMock.iBSchool.update).not.toHaveBeenCalled()
  })
})
