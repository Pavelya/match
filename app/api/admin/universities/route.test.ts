import { beforeEach, describe, expect, it, vi } from 'vitest'

// A University row must never hold an inline base64 logo; see the note in
// [id]/route.test.ts. This covers the create route's half of the rule.

const { prismaMock, uploadMock } = vi.hoisted(() => ({
  prismaMock: {
    user: { findUnique: vi.fn() },
    country: { findUnique: vi.fn() },
    university: { findFirst: vi.fn(), create: vi.fn() }
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

import { POST } from './route'

const BASE64_LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB'
const STORAGE_URL = 'https://example.supabase.co/storage/v1/object/public/university-images/y.png'

const VALID_UNIVERSITY = {
  name: 'Example University',
  description: 'A university.',
  countryId: 'country-1',
  city: 'Example City',
  classification: 'PUBLIC',
  websiteUrl: 'https://example.edu'
}

function post(body: Record<string, unknown>) {
  return POST(
    new Request('http://localhost/api/admin/universities', {
      method: 'POST',
      body: JSON.stringify(body)
    })
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.user.findUnique.mockResolvedValue({ role: 'PLATFORM_ADMIN' })
  prismaMock.country.findUnique.mockResolvedValue({ id: 'country-1' })
  prismaMock.university.findFirst.mockResolvedValue(null)
  prismaMock.university.create.mockImplementation(async ({ data }) => ({ id: 'uni-1', ...data }))
  uploadMock.mockResolvedValue(STORAGE_URL)
})

describe('POST /api/admin/universities — logo', () => {
  it('uploads a base64 logo and stores its URL', async () => {
    const res = await post({ ...VALID_UNIVERSITY, logo: BASE64_LOGO })

    expect(res.status).toBe(201)
    expect(uploadMock).toHaveBeenCalledWith(BASE64_LOGO, expect.stringMatching(/-logo$/))
    expect(prismaMock.university.create.mock.calls[0][0].data.logo).toBe(STORAGE_URL)
  })

  it('refuses with 502 and creates nothing when the upload fails', async () => {
    uploadMock.mockRejectedValue(new Error('exceed_egress_quota'))

    const res = await post({ ...VALID_UNIVERSITY, logo: BASE64_LOGO })

    expect(res.status).toBe(502)
    expect(prismaMock.university.create).not.toHaveBeenCalled()
  })

  it('creates without a logo when none is sent', async () => {
    const res = await post(VALID_UNIVERSITY)

    expect(res.status).toBe(201)
    expect(uploadMock).not.toHaveBeenCalled()
    expect(prismaMock.university.create.mock.calls[0][0].data.logo).toBeNull()
  })
})
