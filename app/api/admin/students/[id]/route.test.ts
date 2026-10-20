import type { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// An admin deletes a student with the student's own deletion, in one transaction (MAINT 5.25),
// then sends "Account deleted" in the admin's words and clears the cached matches after the
// response, which Vercel would otherwise not wait for (5.24).

const { prismaMock, deleteMock, afterQueue, sendMock, invalidateMock } = vi.hoisted(() => {
  const tx = { marker: 'tx' }
  return {
    prismaMock: {
      $transaction: vi.fn(async (run: (client: typeof tx) => Promise<unknown>) => run(tx)),
      user: { findUnique: vi.fn() }
    },
    deleteMock: vi.fn(),
    afterQueue: [] as (() => Promise<void>)[],
    sendMock: vi.fn(),
    invalidateMock: vi.fn()
  }
})

vi.mock('next/server', async (original) => ({
  ...(await original<typeof import('next/server')>()),
  after: (task: () => Promise<void>) => afterQueue.push(task)
}))
vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth/config', () => ({ auth: vi.fn(async () => ({ user: { id: 'admin-1' } })) }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit: vi.fn(async () => null) }))
vi.mock('@/lib/logger', () => ({ logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))
vi.mock('@/lib/account/delete-student', () => ({ deleteStudentAccount: deleteMock }))
vi.mock('@/lib/email/account-emails', () => ({ sendAccountDeletedEmail: sendMock }))
vi.mock('@/lib/matching/cache', () => ({ invalidateStudentCache: invalidateMock }))

import { DELETE } from './route'

const request = {} as NextRequest
const params = { params: Promise.resolve({ id: 'student-1' }) }

async function runAfter() {
  for (const task of afterQueue.splice(0)) await task()
}

beforeEach(() => {
  vi.clearAllMocks()
  afterQueue.length = 0
  prismaMock.user.findUnique.mockImplementation(async ({ where }: { where: { id: string } }) =>
    where.id === 'admin-1' ? { role: 'PLATFORM_ADMIN' } : { email: 'maya@example.com' }
  )
  deleteMock.mockResolvedValue({ email: 'maya@example.com', name: 'Maya Okafor' })
  sendMock.mockResolvedValue(true)
  invalidateMock.mockResolvedValue(undefined)
})

describe('DELETE /api/admin/students/[id]', () => {
  it('deletes the student in one transaction, then emails and clears the cache', async () => {
    const response = await DELETE(request, params)

    expect(response.status).toBe(200)
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1)
    expect(deleteMock).toHaveBeenCalledWith({ marker: 'tx' }, 'student-1')
    expect(sendMock).not.toHaveBeenCalled()

    await runAfter()
    expect(sendMock).toHaveBeenCalledWith({
      to: 'maya@example.com',
      userName: 'Maya Okafor',
      deletedBy: 'admin'
    })
    expect(invalidateMock).toHaveBeenCalledWith('student-1')
  })

  it('still answers 200 when the email or the cache fails', async () => {
    sendMock.mockRejectedValue(new Error('Resend down'))
    invalidateMock.mockRejectedValue(new Error('Redis down'))

    expect((await DELETE(request, params)).status).toBe(200)
    await expect(runAfter()).resolves.toBeUndefined()
  })

  it('sends nothing when the deletion fails', async () => {
    deleteMock.mockRejectedValue(new Error('connection lost'))

    expect((await DELETE(request, params)).status).toBe(500)
    await runAfter()
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('deletes no one who isn’t a student', async () => {
    prismaMock.user.findUnique.mockImplementation(async ({ where }: { where: { id: string } }) =>
      where.id === 'admin-1' ? { role: 'PLATFORM_ADMIN' } : null
    )

    expect((await DELETE(request, params)).status).toBe(404)
    expect(prismaMock.$transaction).not.toHaveBeenCalled()
  })
})
