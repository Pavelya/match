/**
 * Admin API: IB Schools
 *
 * GET - List all schools with country relation and counts
 * POST - Create a new IB school
 *
 * Security: Requires PLATFORM_ADMIN role
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { applyRateLimit } from '@/lib/rate-limit'
import { uploadUniversityImage, isBase64Image } from '@/lib/supabase/storage'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rateLimited = await applyRateLimit('api', session.user.id)
    if (rateLimited) return rateLimited

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const schools = await prisma.iBSchool.findMany({
      orderBy: { name: 'asc' },
      include: {
        country: true,
        _count: {
          select: {
            coordinators: true,
            students: true
          }
        }
      }
    })

    return NextResponse.json(schools)
  } catch (error) {
    logger.error('Error fetching schools', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rateLimited = await applyRateLimit('api', session.user.id)
    if (rateLimited) return rateLimited

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'PLATFORM_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { name, countryId, city, subscriptionTier, logo, websiteUrl, email, phone } = body

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'School name is required' }, { status: 400 })
    }

    if (!countryId || typeof countryId !== 'string') {
      return NextResponse.json({ error: 'Country is required' }, { status: 400 })
    }

    if (!city || typeof city !== 'string' || city.trim().length === 0) {
      return NextResponse.json({ error: 'City is required' }, { status: 400 })
    }

    // Validate subscription tier
    const validTiers = ['VIP', 'REGULAR']
    if (!subscriptionTier || !validTiers.includes(subscriptionTier)) {
      return NextResponse.json(
        { error: 'Subscription tier must be VIP or REGULAR' },
        { status: 400 }
      )
    }

    // Verify country exists
    const country = await prisma.country.findUnique({
      where: { id: countryId }
    })

    if (!country) {
      return NextResponse.json({ error: 'Invalid country selected' }, { status: 400 })
    }

    // Check for duplicate school name (case-insensitive)
    const existingSchool = await prisma.iBSchool.findFirst({
      where: {
        name: {
          equals: name.trim(),
          mode: 'insensitive'
        }
      }
    })

    if (existingSchool) {
      return NextResponse.json({ error: 'A school with this name already exists' }, { status: 409 })
    }

    // Handle logo - base64 is uploaded to Supabase Storage and stored as its URL,
    // as university logos are (MAINT 5.11). The coordinator dashboard and the
    // Stripe webhook read the whole school row, so an inline logo would move with
    // every one of those reads. The school has no id yet, hence the temp key.
    let logoToSave: string | null = null
    if (logo && typeof logo === 'string' && logo.length > 0) {
      if (isBase64Image(logo)) {
        try {
          logoToSave = await uploadUniversityImage(logo, `temp-${Date.now()}-school-logo`)
          logger.info('Uploaded school logo to Supabase', { logoUrl: logoToSave })
        } catch (uploadError) {
          logger.error('Supabase logo upload failed; refusing to store inline base64', {
            error: uploadError instanceof Error ? uploadError.message : String(uploadError)
          })
          return NextResponse.json(
            { error: 'Logo upload failed. The school was not created. Please try again.' },
            { status: 502 }
          )
        }
      } else {
        // Assume it's already a URL
        logoToSave = logo.trim()
      }
    }

    // Create the school
    // VIP schools: ACTIVE status (full access free)
    // REGULAR schools: INACTIVE status (freemium until they subscribe)
    const school = await prisma.iBSchool.create({
      data: {
        name: name.trim(),
        countryId,
        city: city.trim(),
        subscriptionTier,
        subscriptionStatus: subscriptionTier === 'VIP' ? 'ACTIVE' : 'INACTIVE',
        logo: logoToSave,
        websiteUrl: websiteUrl?.trim() || null,
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        isVerified: false
      },
      include: {
        country: true
      }
    })

    logger.info('School created', {
      schoolId: school.id,
      schoolName: school.name,
      tier: school.subscriptionTier
    })

    return NextResponse.json(school, { status: 201 })
  } catch (error) {
    logger.error('Error creating school', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
