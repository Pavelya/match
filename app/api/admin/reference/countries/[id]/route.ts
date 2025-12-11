/**
 * Admin API: Country by ID
 *
 * PATCH - Update a country (re-generates flag if code changes)
 * DELETE - Delete a country (with validation)
 */

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { countryCodeToFlag, isValidCountryCode } from '@/lib/country-utils'
import { logger } from '@/lib/logger'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: RouteParams) {
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

    const { id } = await params
    const body = await request.json()
    const { name, code } = body

    const existing = await prisma.country.findUnique({
      where: { id }
    })

    if (!existing) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 })
    }

    // Validate and check duplicates if changing name
    if (name && name !== existing.name) {
      const duplicate = await prisma.country.findUnique({ where: { name } })
      if (duplicate) {
        return NextResponse.json(
          { error: 'Country with this name already exists' },
          { status: 409 }
        )
      }
    }

    // Validate and check duplicates if changing code
    let newCode: string | null = null
    let flagEmoji: string | null = null

    if (code && code.toUpperCase() !== existing.code) {
      const codeUpper = code.toUpperCase()

      if (!isValidCountryCode(codeUpper)) {
        return NextResponse.json(
          { error: 'Invalid country code. Must be 2 letters (ISO 3166-1 alpha-2)' },
          { status: 400 }
        )
      }

      const duplicate = await prisma.country.findUnique({ where: { code: codeUpper } })
      if (duplicate) {
        return NextResponse.json(
          { error: 'Country with this code already exists' },
          { status: 409 }
        )
      }

      // Auto-regenerate flag when code changes
      newCode = codeUpper
      flagEmoji = countryCodeToFlag(codeUpper)
    }

    const country = await prisma.country.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(newCode && { code: newCode }),
        ...(flagEmoji && { flagEmoji })
      }
    })

    // Invalidate cache so student pages see the update
    revalidateTag('countries', { expire: 0 })

    return NextResponse.json(country)
  } catch (error) {
    logger.error('Error updating country', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
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

    const { id } = await params

    const country = await prisma.country.findUnique({
      where: { id },
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

    if (!country) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 })
    }

    const totalRefs =
      country._count.universities + country._count.schools + country._count.interestedStudents

    if (totalRefs > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete country that is referenced by universities, schools, or students',
          references: {
            universities: country._count.universities,
            schools: country._count.schools,
            students: country._count.interestedStudents
          }
        },
        { status: 409 }
      )
    }

    await prisma.country.delete({
      where: { id }
    })

    // Invalidate cache so student pages see the deletion
    revalidateTag('countries', { expire: 0 })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error deleting country', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
