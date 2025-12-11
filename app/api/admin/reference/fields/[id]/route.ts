/**
 * Admin API: Field of Study by ID
 *
 * PATCH - Update a field of study
 * DELETE - Delete a field of study (with validation)
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
    const { name, iconName, description } = body

    // Check if field exists
    const existing = await prisma.fieldOfStudy.findUnique({
      where: { id }
    })

    if (!existing) {
      return NextResponse.json({ error: 'Field not found' }, { status: 404 })
    }

    // Check for duplicate name (if name is being changed)
    if (name && name !== existing.name) {
      const duplicate = await prisma.fieldOfStudy.findUnique({
        where: { name }
      })
      if (duplicate) {
        return NextResponse.json({ error: 'Field with this name already exists' }, { status: 409 })
      }
    }

    const field = await prisma.fieldOfStudy.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(iconName !== undefined && { iconName: iconName?.trim() || null }),
        ...(description !== undefined && { description: description?.trim() || null })
      }
    })

    // Invalidate cache so student pages see the update
    revalidateTag('fields-of-study', { expire: 0 })

    return NextResponse.json(field)
  } catch (error) {
    logger.error('Error updating field of study', { error })
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

    // Check if field exists and has references
    const field = await prisma.fieldOfStudy.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            programs: true,
            interestedStudents: true
          }
        }
      }
    })

    if (!field) {
      return NextResponse.json({ error: 'Field not found' }, { status: 404 })
    }

    // Prevent deletion if referenced
    if (field._count.programs > 0 || field._count.interestedStudents > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete field that is referenced by programs or students',
          references: {
            programs: field._count.programs,
            students: field._count.interestedStudents
          }
        },
        { status: 409 }
      )
    }

    await prisma.fieldOfStudy.delete({
      where: { id }
    })

    // Invalidate cache so student pages see the deletion
    revalidateTag('fields-of-study', { expire: 0 })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error deleting field of study', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
