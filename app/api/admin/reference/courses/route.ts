/**
 * Admin API: IB Courses
 *
 * GET - List all IB courses
 * POST - Create a new IB course
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

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const courses = await prisma.iBCourse.findMany({
      orderBy: [{ group: 'asc' }, { name: 'asc' }],
      include: {
        _count: {
          select: {
            studentCourses: true,
            programRequirements: true
          }
        }
      }
    })

    return NextResponse.json(courses)
  } catch (error) {
    logger.error('Error fetching IB courses', { error })
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
    const { name, code, group } = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Course code is required' }, { status: 400 })
    }

    if (!group || typeof group !== 'number' || group < 1 || group > 6) {
      return NextResponse.json({ error: 'Group must be a number between 1 and 6' }, { status: 400 })
    }

    // Check for duplicate code
    const existing = await prisma.iBCourse.findUnique({
      where: { code }
    })

    if (existing) {
      return NextResponse.json({ error: 'Course with this code already exists' }, { status: 409 })
    }

    const course = await prisma.iBCourse.create({
      data: {
        name: name.trim(),
        code: code.trim().toUpperCase(),
        group
      }
    })

    // Invalidate cache so student pages see the new course
    revalidateTag('ib-courses', { expire: 0 })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    logger.error('Error creating IB course', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
