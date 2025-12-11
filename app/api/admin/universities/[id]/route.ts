/**
 * Admin API: University by ID
 *
 * GET - Get single university with full details
 * PATCH - Update university (name, contact info, etc.)
 * DELETE - Delete university (fails if has programs)
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

    const university = await prisma.university.findUnique({
      where: { id },
      include: {
        country: true,
        agents: {
          include: {
            user: {
              select: { id: true, email: true, name: true, image: true }
            }
          }
        },
        _count: {
          select: {
            programs: true,
            agents: true
          }
        }
      }
    })

    if (!university) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 })
    }

    return NextResponse.json(university)
  } catch (error) {
    logger.error('Error fetching university', { error })
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

    // Check university exists
    const existingUniversity = await prisma.university.findUnique({
      where: { id }
    })

    if (!existingUniversity) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 })
    }

    const body = await request.json()
    const {
      name,
      abbreviatedName,
      description,
      countryId,
      city,
      classification,
      studentPopulation,
      logo,
      image,
      websiteUrl,
      email,
      phone
    } = body

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {}

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json({ error: 'Invalid university name' }, { status: 400 })
      }
      // Check for duplicate name (excluding current university)
      const duplicateName = await prisma.university.findFirst({
        where: {
          name: { equals: name.trim(), mode: 'insensitive' },
          id: { not: id }
        }
      })
      if (duplicateName) {
        return NextResponse.json(
          { error: 'A university with this name already exists' },
          { status: 409 }
        )
      }
      updateData.name = name.trim()
    }

    if (abbreviatedName !== undefined) {
      updateData.abbreviatedName = abbreviatedName?.trim() || null
    }

    if (description !== undefined) {
      if (typeof description !== 'string' || description.trim().length === 0) {
        return NextResponse.json({ error: 'Invalid description' }, { status: 400 })
      }
      updateData.description = description.trim()
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

    if (classification !== undefined) {
      const validClassifications = ['PUBLIC', 'PRIVATE']
      if (!validClassifications.includes(classification)) {
        return NextResponse.json(
          { error: 'Classification must be PUBLIC or PRIVATE' },
          { status: 400 }
        )
      }
      updateData.classification = classification
    }

    if (studentPopulation !== undefined) {
      updateData.studentPopulation = studentPopulation ? parseInt(studentPopulation, 10) : null
    }

    if (logo !== undefined) {
      updateData.logo = logo?.trim() || null
    }

    if (image !== undefined) {
      updateData.image = image?.trim() || null
    }

    if (websiteUrl !== undefined) {
      if (typeof websiteUrl !== 'string' || websiteUrl.trim().length === 0) {
        return NextResponse.json({ error: 'Invalid website URL' }, { status: 400 })
      }
      updateData.websiteUrl = websiteUrl.trim()
    }

    if (email !== undefined) {
      updateData.email = email?.trim() || null
    }

    if (phone !== undefined) {
      updateData.phone = phone?.trim() || null
    }

    const university = await prisma.university.update({
      where: { id },
      data: updateData,
      include: {
        country: true
      }
    })

    logger.info('University updated', {
      universityId: university.id,
      updatedFields: Object.keys(updateData)
    })

    return NextResponse.json(university)
  } catch (error) {
    logger.error('Error updating university', { error })
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

    // Check university exists
    const university = await prisma.university.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            programs: true,
            agents: true
          }
        }
      }
    })

    if (!university) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 })
    }

    // Prevent deletion if university has programs
    if (university._count.programs > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete university with ${university._count.programs} program(s). Remove programs first.`
        },
        { status: 409 }
      )
    }

    // Prevent deletion if university has agents
    if (university._count.agents > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete university with ${university._count.agents} agent(s). Remove agents first.`
        },
        { status: 409 }
      )
    }

    await prisma.university.delete({
      where: { id }
    })

    logger.info('University deleted', {
      universityId: id,
      universityName: university.name
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error deleting university', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
