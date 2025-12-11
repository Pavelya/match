/**
 * Admin API: IB School by ID
 *
 * GET - Get single school with full details
 * PATCH - Update school (name, tier, contact info, etc.)
 * DELETE - Delete school (fails if has coordinators or students)
 *
 * Security: Requires PLATFORM_ADMIN role
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
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

    const school = await prisma.iBSchool.findUnique({
      where: { id },
      include: {
        country: true,
        coordinators: {
          include: {
            user: {
              select: { id: true, email: true, name: true, image: true }
            }
          }
        },
        _count: {
          select: {
            coordinators: true,
            students: true
          }
        }
      }
    })

    if (!school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 })
    }

    return NextResponse.json(school)
  } catch (error) {
    logger.error('Error fetching school', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
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

    // Check school exists
    const existingSchool = await prisma.iBSchool.findUnique({
      where: { id }
    })

    if (!existingSchool) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 })
    }

    const body = await request.json()
    const {
      name,
      countryId,
      city,
      subscriptionTier,
      subscriptionStatus,
      logo,
      websiteUrl,
      email,
      phone,
      isVerified
    } = body

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {}

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json({ error: 'Invalid school name' }, { status: 400 })
      }
      // Check for duplicate name (excluding current school)
      const duplicateName = await prisma.iBSchool.findFirst({
        where: {
          name: { equals: name.trim(), mode: 'insensitive' },
          id: { not: id }
        }
      })
      if (duplicateName) {
        return NextResponse.json(
          { error: 'A school with this name already exists' },
          { status: 409 }
        )
      }
      updateData.name = name.trim()
    }

    if (countryId !== undefined) {
      const country = await prisma.country.findUnique({ where: { id: countryId } })
      if (!country) {
        return NextResponse.json({ error: 'Invalid country selected' }, { status: 400 })
      }
      updateData.countryId = countryId
    }

    if (city !== undefined) {
      if (typeof city !== 'string' || city.trim().length === 0) {
        return NextResponse.json({ error: 'Invalid city' }, { status: 400 })
      }
      updateData.city = city.trim()
    }

    if (subscriptionTier !== undefined) {
      const validTiers = ['VIP', 'REGULAR']
      if (!validTiers.includes(subscriptionTier)) {
        return NextResponse.json(
          { error: 'Subscription tier must be VIP or REGULAR' },
          { status: 400 }
        )
      }
      updateData.subscriptionTier = subscriptionTier
    }

    if (subscriptionStatus !== undefined) {
      const validStatuses = ['ACTIVE', 'INACTIVE', 'CANCELLED']
      if (!validStatuses.includes(subscriptionStatus)) {
        return NextResponse.json({ error: 'Invalid subscription status' }, { status: 400 })
      }
      updateData.subscriptionStatus = subscriptionStatus
    }

    if (logo !== undefined) {
      updateData.logo = logo || null
    }

    if (websiteUrl !== undefined) {
      updateData.websiteUrl = websiteUrl?.trim() || null
    }

    if (email !== undefined) {
      updateData.email = email?.trim() || null
    }

    if (phone !== undefined) {
      updateData.phone = phone?.trim() || null
    }

    if (isVerified !== undefined) {
      updateData.isVerified = Boolean(isVerified)
    }

    const school = await prisma.iBSchool.update({
      where: { id },
      data: updateData,
      include: {
        country: true
      }
    })

    logger.info('School updated', {
      schoolId: school.id,
      updatedFields: Object.keys(updateData)
    })

    return NextResponse.json(school)
  } catch (error) {
    logger.error('Error updating school', { error })
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

    // Check school exists
    const school = await prisma.iBSchool.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            coordinators: true,
            students: true
          }
        }
      }
    })

    if (!school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 })
    }

    // Prevent deletion if school has coordinators or students
    if (school._count.coordinators > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete school with ${school._count.coordinators} coordinator(s). Remove coordinators first.`
        },
        { status: 409 }
      )
    }

    if (school._count.students > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete school with ${school._count.students} student(s). Remove students first.`
        },
        { status: 409 }
      )
    }

    await prisma.iBSchool.delete({
      where: { id }
    })

    logger.info('School deleted', {
      schoolId: id,
      schoolName: school.name
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error deleting school', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
