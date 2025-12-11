/**
 * Admin API: Universities
 *
 * GET - List all universities with country relation and counts
 * POST - Create a new university
 *
 * Security: Requires PLATFORM_ADMIN role
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
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

    const universities = await prisma.university.findMany({
      orderBy: { name: 'asc' },
      include: {
        country: true,
        _count: {
          select: {
            programs: true,
            agents: true
          }
        }
      }
    })

    return NextResponse.json(universities)
  } catch (error) {
    logger.error('Error fetching universities', { error })
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

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'University name is required' }, { status: 400 })
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 })
    }

    if (!countryId || typeof countryId !== 'string') {
      return NextResponse.json({ error: 'Country is required' }, { status: 400 })
    }

    if (!city || typeof city !== 'string' || city.trim().length === 0) {
      return NextResponse.json({ error: 'City is required' }, { status: 400 })
    }

    // Validate classification
    const validClassifications = ['PUBLIC', 'PRIVATE']
    if (!classification || !validClassifications.includes(classification)) {
      return NextResponse.json(
        { error: 'Classification must be PUBLIC or PRIVATE' },
        { status: 400 }
      )
    }

    if (!websiteUrl || typeof websiteUrl !== 'string' || websiteUrl.trim().length === 0) {
      return NextResponse.json({ error: 'Website URL is required' }, { status: 400 })
    }

    // Verify country exists
    const country = await prisma.country.findUnique({
      where: { id: countryId }
    })

    if (!country) {
      return NextResponse.json({ error: 'Invalid country selected' }, { status: 400 })
    }

    // Check for duplicate university name (case-insensitive)
    const existingUniversity = await prisma.university.findFirst({
      where: {
        name: {
          equals: name.trim(),
          mode: 'insensitive'
        }
      }
    })

    if (existingUniversity) {
      return NextResponse.json(
        { error: 'A university with this name already exists' },
        { status: 409 }
      )
    }

    // Create the university
    const university = await prisma.university.create({
      data: {
        name: name.trim(),
        abbreviatedName: abbreviatedName?.trim() || null,
        description: description.trim(),
        countryId,
        city: city.trim(),
        classification,
        studentPopulation: studentPopulation ? parseInt(studentPopulation, 10) : null,
        logo: logo?.trim() || null,
        image: image?.trim() || null,
        websiteUrl: websiteUrl.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null
      },
      include: {
        country: true
      }
    })

    logger.info('University created', {
      universityId: university.id,
      universityName: university.name
    })

    return NextResponse.json(university, { status: 201 })
  } catch (error) {
    logger.error('Error creating university', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
