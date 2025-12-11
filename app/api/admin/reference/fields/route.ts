/**
 * Admin API: Fields of Study
 *
 * GET - List all fields of study
 * POST - Create a new field of study
 */

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const fields = await prisma.fieldOfStudy.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            programs: true,
            interestedStudents: true
          }
        }
      }
    })

    return NextResponse.json(fields)
  } catch (error) {
    logger.error('Error fetching fields of study', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { name, iconName, description } = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    // Check for duplicate
    const existing = await prisma.fieldOfStudy.findUnique({
      where: { name }
    })

    if (existing) {
      return NextResponse.json({ error: 'Field with this name already exists' }, { status: 409 })
    }

    const field = await prisma.fieldOfStudy.create({
      data: {
        name: name.trim(),
        iconName: iconName?.trim() || null,
        description: description?.trim() || null
      }
    })

    // Invalidate cache so student pages see the new field
    revalidateTag('fields-of-study', { expire: 0 })

    return NextResponse.json(field, { status: 201 })
  } catch (error) {
    logger.error('Error creating field of study', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
