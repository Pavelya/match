import { beforeEach, describe, expect, it, vi } from 'vitest'

// An IBSchool row must never hold an inline base64 logo: the coordinator
// dashboard and the Stripe webhook read the whole row (MAINT 5.11). This covers
// the create route's half of the rule; [id]/route.test.ts covers the edit route.

const { prismaMock, uploadMock } = vi.hoisted(() => ({
  prismaMock: {
    user: { findUnique: vi.fn() },
    country: { findUnique: vi.fn() },
    iBSchool: { findFirst: vi.fn(), create: vi.fn() }
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
const STORAGE_URL = 'https://example.supabase.co/storage/v1/object/public/university-images/s.png'

const VALID_SCHOOL = {
  name: 'Example School',
  countryId: 'country-1',
  city: 'Example City',
  subscriptionTier: 'REGULAR'
}

function post(body: Record<string, unknown>) {
  return POST(
    new Request('http://localhost/api/admin/schools', {
      method: 'POST',
      body: JSON.stringify(body)
    })
  )
}

function createdLogo() {
  return prismaMock.iBSchool.create.mock.calls[0][0].data.logo
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.user.findUnique.mockResolvedValue({ role: 'PLATFORM_ADMIN' })
  prismaMock.country.findUnique.mockResolvedValue({ id: 'country-1' })
  prismaMock.iBSchool.findFirst.mockResolvedValue(null)
  prismaMock.iBSchool.create.mockImplementation(async ({ data }) => ({ id: 'school-1', ...data }))
  uploadMock.mockResolvedValue(STORAGE_URL)
})

describe('POST /api/admin/schools — logo', () => {
  it('uploads a base64 logo and stores its URL', async () => {
    const res = await post({ ...VALID_SCHOOL, logo: BASE64_LOGO })

    expect(res.status).toBe(201)
    expect(uploadMock).toHaveBeenCalledWith(
      BASE64_LOGO,
      expect.stringMatching(/^temp-\d+-school-logo$/)
    )
    expect(createdLogo()).toBe(STORAGE_URL)
  })

  it('refuses with 502 and creates nothing when the upload fails', async () => {
    uploadMock.mockRejectedValue(new Error('exceed_egress_quota'))

    const res = await post({ ...VALID_SCHOOL, logo: BASE64_LOGO })

    expect(res.status).toBe(502)
    expect(prismaMock.iBSchool.create).not.toHaveBeenCalled()
  })

  it('stores a URL as given', async () => {
    const res = await post({ ...VALID_SCHOOL, logo: ` ${STORAGE_URL} ` })

    expect(res.status).toBe(201)
    expect(uploadMock).not.toHaveBeenCalled()
    expect(createdLogo()).toBe(STORAGE_URL)
  })

  it('stores no logo when none is sent', async () => {
    const res = await post({ ...VALID_SCHOOL, logo: '' })

    expect(res.status).toBe(201)
    expect(uploadMock).not.toHaveBeenCalled()
    expect(createdLogo()).toBeNull()
  })

  it('uploads nothing for a request it refuses', async () => {
    prismaMock.iBSchool.findFirst.mockResolvedValue({ id: 'school-0' })

    const res = await post({ ...VALID_SCHOOL, logo: BASE64_LOGO })

    expect(res.status).toBe(409)
    expect(uploadMock).not.toHaveBeenCalled()
  })
})
