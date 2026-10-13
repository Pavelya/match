import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

// First run's step drafts write the student's own profile once, with no read before it, and
// invalidate cached matches only for a student who has grades (rebranding 3.1).

const { prismaMock, invalidateMock } = vi.hoisted(() => ({
  prismaMock: { studentProfile: { upsert: vi.fn(), findUnique: vi.fn() } },
  invalidateMock: vi.fn(async () => undefined)
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/matching/cache', () => ({ invalidateStudentCache: invalidateMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'user-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))

import { auth } from '@/lib/auth/config'
import { readDraft } from '@/lib/student/draft'
import { PUT } from './route'

function put(body: unknown) {
  return PUT(
    new Request('http://localhost/api/students/profile/preferences', {
      method: 'PUT',
      body: JSON.stringify(body)
    }) as unknown as NextRequest
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.studentProfile.upsert.mockResolvedValue({ totalIBPoints: null })
})

describe('readDraft', () => {
  it('takes one to five fields', () => {
    expect(readDraft({ step: 'interests', fields: ['cs', 'cs', 'be'] })).toEqual({
      step: 'interests',
      fields: ['cs', 'be']
    })
    expect(readDraft({ step: 'interests', fields: [] })).toBe('Choose at least one field')
    expect(readDraft({ step: 'interests', fields: ['a', 'b', 'c', 'd', 'e', 'f'] })).toBe(
      'Choose up to 5 fields'
    )
  })

  it('takes countries or anywhere, never both and never neither', () => {
    expect(readDraft({ step: 'countries', countries: ['ca'], anywhere: false })).toEqual({
      step: 'countries',
      countries: ['ca'],
      anywhere: false
    })
    expect(readDraft({ step: 'countries', countries: [], anywhere: true })).toEqual({
      step: 'countries',
      countries: [],
      anywhere: true
    })
    expect(typeof readDraft({ step: 'countries', countries: ['ca'], anywhere: true })).toBe(
      'string'
    )
    expect(typeof readDraft({ step: 'countries', countries: [], anywhere: false })).toBe('string')
  })

  it('refuses anything else', () => {
    expect(typeof readDraft({ step: 'grades' })).toBe('string')
    expect(typeof readDraft({ step: 'interests', fields: ['<script>'] })).toBe('string')
    expect(typeof readDraft(null)).toBe('string')
  })
})

describe('PUT /api/students/profile/preferences', () => {
  it('saves the interests in one upsert, creating the profile if there is none', async () => {
    const response = await put({ step: 'interests', fields: ['cs', 'be'] })
    expect(response.status).toBe(200)
    expect(prismaMock.studentProfile.findUnique).not.toHaveBeenCalled()
    expect(prismaMock.studentProfile.upsert).toHaveBeenCalledTimes(1)
    expect(prismaMock.studentProfile.upsert).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      create: { userId: 'user-1', preferredFields: { connect: [{ id: 'cs' }, { id: 'be' }] } },
      update: { preferredFields: { set: [{ id: 'cs' }, { id: 'be' }] } },
      select: { totalIBPoints: true }
    })
    expect(invalidateMock).not.toHaveBeenCalled()
  })

  it('saves "Open to anywhere" as no countries with the flag', async () => {
    await put({ step: 'countries', countries: [], anywhere: true })
    expect(prismaMock.studentProfile.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        update: { openToAllLocations: true, preferredCountries: { set: [] } }
      })
    )
  })

  it('invalidates cached matches for a student with grades', async () => {
    prismaMock.studentProfile.upsert.mockResolvedValue({ totalIBPoints: 38 })
    await put({ step: 'countries', countries: ['ca', 'ie'], anywhere: false })
    expect(invalidateMock).toHaveBeenCalledWith('user-1')
  })

  it('refuses a bad step without writing', async () => {
    const response = await put({ step: 'countries', countries: [], anywhere: false })
    expect(response.status).toBe(400)
    expect(prismaMock.studentProfile.upsert).not.toHaveBeenCalled()
  })

  it('answers 400 for a field or country that does not exist', async () => {
    prismaMock.studentProfile.upsert.mockRejectedValue(
      Object.assign(new Error('x'), { code: 'P2025' })
    )
    const response = await put({ step: 'interests', fields: ['nope'] })
    expect(response.status).toBe(400)
  })

  it('needs a signed-in student', async () => {
    vi.mocked(auth).mockResolvedValueOnce(null as never)
    const response = await put({ step: 'interests', fields: ['cs'] })
    expect(response.status).toBe(401)
  })
})
