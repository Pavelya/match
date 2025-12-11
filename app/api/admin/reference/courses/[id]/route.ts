/**
 * Admin API: IB Course by ID
 *
 * PATCH - Update an IB course
 * DELETE - Delete an IB course (with validation)
 */

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
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
    const { name, code, group } = body

    const existing = await prisma.iBCourse.findUnique({
      where: { id }
    })

    if (!existing) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Validate group if provided
    if (group !== undefined && (typeof group !== 'number' || group < 1 || group > 6)) {
      return NextResponse.json({ error: 'Group must be a number between 1 and 6' }, { status: 400 })
    }

    // Check for duplicate code if changing
    if (code && code.toUpperCase() !== existing.code) {
      const duplicate = await prisma.iBCourse.findUnique({
        where: { code: code.toUpperCase() }
      })
      if (duplicate) {
        return NextResponse.json({ error: 'Course with this code already exists' }, { status: 409 })
      }
    }

    const course = await prisma.iBCourse.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(code && { code: code.trim().toUpperCase() }),
        ...(group !== undefined && { group })
      }
    })

    // Invalidate cache so student pages see the update
    revalidateTag('ib-courses', { expire: 0 })

    return NextResponse.json(course)
  } catch (error) {
    logger.error('Error updating IB course', { error })
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

    const course = await prisma.iBCourse.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            studentCourses: true,
            programRequirements: true
          }
        }
      }
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const totalRefs = course._count.studentCourses + course._count.programRequirements

    if (totalRefs > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete course that is referenced by students or program requirements',
          references: {
            students: course._count.studentCourses,
            programs: course._count.programRequirements
          }
        },
        { status: 409 }
      )
    }

    await prisma.iBCourse.delete({
      where: { id }
    })

    // Invalidate cache so student pages see the deletion
    revalidateTag('ib-courses', { expire: 0 })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error deleting IB course', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
