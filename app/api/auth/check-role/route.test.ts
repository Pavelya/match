import { beforeEach, describe, expect, it, vi } from 'vitest'

// The coordinator sign-in asks this route, before there is a session, whether an address is a
// student's. It must say nothing more: an unknown address, a coordinator and an admin all get the
// same answer, so the route cannot be used to find accounts or admins (MAINT 7.1 Part 3).

const { prismaMock, applyRateLimit } = vi.hoisted(() => ({
  prismaMock: { user: { findUnique: vi.fn() } },
  applyRateLimit: vi.fn()
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/rate-limit', () => ({ applyRateLimit, getClientIp: () => '203.0.113.1' }))

import { NextRequest, NextResponse } from 'next/server'
import { POST } from './route'

function ask(email: unknown) {
  return POST(
    new NextRequest('http://localhost/api/auth/check-role', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  )
}

async function answerFor(role: string | null) {
  prismaMock.user.findUnique.mockResolvedValue(role ? { role } : null)
  const res = await ask('someone@example.com')
  return { status: res.status, body: await res.json() }
}

beforeEach(() => {
  vi.clearAllMocks()
  applyRateLimit.mockResolvedValue(null)
})

describe('POST /api/auth/check-role', () => {
  it('says only whether the address is a student’s', async () => {
    expect(await answerFor('STUDENT')).toEqual({ status: 200, body: { isStudent: true } })
  })

  it('answers an unknown address, a coordinator, an agent and an admin identically', async () => {
    const answers = [
      await answerFor(null),
      await answerFor('COORDINATOR'),
      await answerFor('UNIVERSITY_AGENT'),
      await answerFor('PLATFORM_ADMIN')
    ]

    for (const answer of answers) {
      expect(answer).toEqual({ status: 200, body: { isStudent: false } })
    }
  })

  it('looks the address up in lower case, and reads only the role', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)

    await ask('Someone@Example.COM')

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'someone@example.com' },
      select: { role: true }
    })
  })

  it('is limited by IP address, before any read', async () => {
    applyRateLimit.mockResolvedValue(NextResponse.json({}, { status: 429 }))

    const res = await ask('someone@example.com')

    expect(res.status).toBe(429)
    expect(applyRateLimit).toHaveBeenCalledWith('auth', '203.0.113.1')
    expect(prismaMock.user.findUnique).not.toHaveBeenCalled()
  })

  it.each([[undefined], [''], [42]])('refuses %j with 400, before any read', async (email) => {
    const res = await ask(email)

    expect(res.status).toBe(400)
    expect(prismaMock.user.findUnique).not.toHaveBeenCalled()
  })
})
