/**
 * Admin API: Countries
 *
 * GET - List all countries
 * POST - Create a new country (auto-generates flag emoji from code)
 */

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { countryCodeToFlag, isValidCountryCode } from '@/lib/country-utils'
import { logger } from '@/lib/logger'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const countries = await prisma.country.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            universities: true,
            schools: true,
            interestedStudents: true
          }
        }
      }
    })

    return NextResponse.json(countries)
  } catch (error) {
    logger.error('Error fetching countries', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { name, code } = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Country code is required' }, { status: 400 })
    }

    const upperCode = code.toUpperCase()

    if (!isValidCountryCode(upperCode)) {
      return NextResponse.json(
        { error: 'Invalid country code. Must be 2 letters (ISO 3166-1 alpha-2)' },
        { status: 400 }
      )
    }

    // Check for duplicate name or code
    const existingByName = await prisma.country.findUnique({ where: { name } })
    if (existingByName) {
      return NextResponse.json({ error: 'Country with this name already exists' }, { status: 409 })
    }

    const existingByCode = await prisma.country.findUnique({ where: { code: upperCode } })
    if (existingByCode) {
      return NextResponse.json({ error: 'Country with this code already exists' }, { status: 409 })
    }

    // Auto-generate flag emoji from country code
    const flagEmoji = countryCodeToFlag(upperCode)

    const country = await prisma.country.create({
      data: {
        name: name.trim(),
        code: upperCode,
        flagEmoji
      }
    })

    // Invalidate cache so student pages see the new country
    revalidateTag('countries', { expire: 0 })

    return NextResponse.json(country, { status: 201 })
  } catch (error) {
    logger.error('Error creating country', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
