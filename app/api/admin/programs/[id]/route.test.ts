import { beforeEach, describe, expect, it, vi } from 'vitest'

// The edit form sends every field on each save. The PATCH must re-date a program's
// requirements (requirementsUpdatedAt, requirementsEntryYear) only when the points, the
// subjects or the entry year actually change; see lib/programs/entry-year.ts.

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    user: { findUnique: vi.fn() },
    university: { findUnique: vi.fn() },
    fieldOfStudy: { findUnique: vi.fn() },
    academicProgram: { findUnique: vi.fn(), findFirst: vi.fn(), update: vi.fn() },
    programCourseRequirement: { deleteMany: vi.fn(), createMany: vi.fn() }
  }
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'admin-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/matching/program-cache', () => ({ invalidateProgramsCache: vi.fn() }))
vi.mock('@/lib/matching', () => ({ invalidateProgramCache: vi.fn(), clearAllMatchCache: vi.fn() }))
vi.mock('@/lib/algolia/sync', () => ({
  syncProgramToAlgolia: vi.fn(),
  deleteProgramFromAlgolia: vi.fn()
}))

import { PATCH } from './route'

const STORED = {
  universityId: 'uni-1',
  minIBPoints: 38,
  requirementsEntryYear: 2026,
  courseRequirements: [
    { ibCourseId: 'chem', requiredLevel: 'HL', minGrade: 6, isCritical: true, orGroupId: null },
    { ibCourseId: 'bio', requiredLevel: 'HL', minGrade: 6, isCritical: true, orGroupId: 'g1' },
    { ibCourseId: 'phys', requiredLevel: 'HL', minGrade: 6, isCritical: true, orGroupId: 'g1' }
  ]
}

// What ProgramEditForm sends when the admin saves without touching anything.
const FORM = {
  name: 'Biology',
  description: 'A course.',
  universityId: 'uni-1',
  fieldOfStudyId: 'field-1',
  degreeType: 'Bachelor',
  duration: '3 years',
  minIBPoints: '38',
  programUrl: 'https://example.ac.uk/biology',
  requirementsEntryYear: '2026',
  courseRequirements: STORED.courseRequirements
}

function patch(body: Record<string, unknown>) {
  return PATCH(
    new Request('http://localhost/api/admin/programs/prog-1', {
      method: 'PATCH',
      body: JSON.stringify(body)
    }),
    { params: Promise.resolve({ id: 'prog-1' }) }
  )
}

function written() {
  return prismaMock.academicProgram.update.mock.calls[0][0].data
}

beforeEach(() => {
  vi.clearAllMocks()
  prismaMock.user.findUnique.mockResolvedValue({ role: 'PLATFORM_ADMIN' })
  prismaMock.academicProgram.findUnique.mockResolvedValue(STORED)
  prismaMock.academicProgram.findFirst.mockResolvedValue(null)
  prismaMock.university.findUnique.mockResolvedValue({ id: 'uni-1' })
  prismaMock.fieldOfStudy.findUnique.mockResolvedValue({ id: 'field-1' })
  prismaMock.academicProgram.update.mockImplementation(async ({ data }) => ({
    id: 'prog-1',
    ...data
  }))
})

describe('PATCH /api/admin/programs/[id] — requirement stamps', () => {
  it('keeps the stamps when only the name changes', async () => {
    const res = await patch({ ...FORM, name: 'Biological Sciences' })

    expect(res.status).toBe(200)
    expect(written().name).toBe('Biological Sciences')
    expect(written()).not.toHaveProperty('requirementsUpdatedAt')
    expect(written()).not.toHaveProperty('requirementsEntryYear')
    expect(written()).not.toHaveProperty('requirementsVerified')
  })

  it('keeps the stamps when the same requirements come back in another order', async () => {
    const res = await patch({
      ...FORM,
      courseRequirements: [...STORED.courseRequirements].reverse()
    })

    expect(res.status).toBe(200)
    expect(written()).not.toHaveProperty('requirementsUpdatedAt')
  })

  it('stamps a points change with the entry year on the form', async () => {
    const res = await patch({ ...FORM, minIBPoints: '37' })

    expect(res.status).toBe(200)
    expect(written()).toMatchObject({
      minIBPoints: 37,
      requirementsUpdatedAt: expect.any(Date),
      requirementsEntryYear: 2026,
      requirementsVerified: true
    })
  })

  it('stamps a subject change', async () => {
    const [chem, bio, phys] = STORED.courseRequirements
    const res = await patch({
      ...FORM,
      courseRequirements: [{ ...chem, minGrade: 7 }, bio, phys]
    })

    expect(res.status).toBe(200)
    expect(written().requirementsUpdatedAt).toBeInstanceOf(Date)
  })

  it('stamps a program re-checked for 2027 with nothing else changed', async () => {
    const res = await patch({ ...FORM, requirementsEntryYear: '2027' })

    expect(res.status).toBe(200)
    expect(written()).toMatchObject({
      requirementsUpdatedAt: expect.any(Date),
      requirementsEntryYear: 2027,
      requirementsVerified: true
    })
  })

  it('marks a program unchecked when its entry year is cleared', async () => {
    const res = await patch({ ...FORM, requirementsEntryYear: '' })

    expect(res.status).toBe(200)
    expect(written()).toMatchObject({ requirementsEntryYear: null, requirementsVerified: false })
  })

  it('refuses an impossible entry year before touching the requirements', async () => {
    const res = await patch({ ...FORM, minIBPoints: '37', requirementsEntryYear: '20227' })

    expect(res.status).toBe(400)
    expect(prismaMock.programCourseRequirement.deleteMany).not.toHaveBeenCalled()
    expect(prismaMock.academicProgram.update).not.toHaveBeenCalled()
  })
})
