/**
 * Supabase Storage Utilities
 *
 * Functions for uploading and managing images in Supabase Storage.
 */

import { getSupabaseClient, STORAGE_BUCKETS } from './client'
import { logger } from '@/lib/logger'

/**
 * What an upload may be (SEC-8): a photo or a logo in one of four raster formats, recognised by its
 * first bytes rather than by what the data URL says. The bucket is public, and Storage serves a file
 * with the type it was stored under, so an upload that called itself text/html or image/svg+xml
 * would be served as a page that runs script. The same limit as the bucket was created with.
 */
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const
export type AcceptedImageType = (typeof ACCEPTED_IMAGE_TYPES)[number]
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024

/** The accepted type these bytes are, by their signature, or null for anything else */
export function detectImageType(bytes: Buffer): AcceptedImageType | null {
  const ascii = (start: number, end: number) => bytes.subarray(start, end).toString('latin1')
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return 'image/jpeg'
  }
  if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return 'image/png'
  }
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'image/webp'
  if (ascii(4, 8) === 'ftyp' && ['avif', 'avis'].includes(ascii(8, 12))) return 'image/avif'
  return null
}

/**
 * Upload a university image to Supabase Storage
 * @param imageData - Base64 encoded image data (with or without data: prefix)
 * @param universityId - University ID for unique filename
 * @returns Public URL of the uploaded image
 */
export async function uploadUniversityImage(
  imageData: string,
  universityId: string
): Promise<string> {
  try {
    // Extract base64 data and the type the data URL claims
    let base64Data = imageData
    let claimedType: string | null = null

    if (imageData.startsWith('data:')) {
      const match = imageData.match(/^data:([^;]+);base64,(.+)$/)
      if (match) {
        claimedType = match[1].toLowerCase()
        base64Data = match[2]
      }
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, 'base64')

    // Only the four image types, by their bytes, and as they say they are (SEC-8)
    const contentType = detectImageType(buffer)
    if (!contentType || (claimedType !== null && claimedType !== contentType)) {
      throw new Error('Not an accepted image: upload a JPEG, PNG, WebP or AVIF file')
    }
    if (buffer.length > MAX_IMAGE_BYTES) {
      throw new Error('Image too large: upload one of 2 MB or less')
    }

    // Generate unique filename
    const extension = contentType.split('/')[1]
    const filename = `${universityId}-${Date.now()}.${extension}`

    // Upload to Supabase Storage. Cached for a year: the filename is unique per
    // upload, so a replaced image gets a new URL and this one never changes.
    // The default is one hour, and every re-fetch after that - by a browser or
    // by Vercel's image optimizer - is billed Supabase egress.
    const { data, error } = await getSupabaseClient()
      .storage.from(STORAGE_BUCKETS.UNIVERSITY_IMAGES)
      .upload(filename, buffer, {
        cacheControl: '31536000',
        contentType,
        upsert: true
      })

    if (error) {
      logger.error('Failed to upload image to Supabase', { error, universityId })
      throw new Error(`Failed to upload image: ${error.message}`)
    }

    // Get public URL
    const {
      data: { publicUrl }
    } = getSupabaseClient().storage.from(STORAGE_BUCKETS.UNIVERSITY_IMAGES).getPublicUrl(data.path)

    logger.info('University image uploaded to Supabase', {
      universityId,
      path: data.path,
      publicUrl
    })

    return publicUrl
  } catch (error) {
    logger.error('Error uploading university image', { error, universityId })
    throw error
  }
}

/**
 * Delete a university image from Supabase Storage
 * @param imageUrl - Public URL of the image to delete
 */
export async function deleteUniversityImage(imageUrl: string): Promise<void> {
  try {
    // Extract filename from URL
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split('/')
    const filename = pathParts[pathParts.length - 1]

    if (!filename) {
      logger.warn('Could not extract filename from image URL', { imageUrl })
      return
    }

    const { error } = await getSupabaseClient()
      .storage.from(STORAGE_BUCKETS.UNIVERSITY_IMAGES)
      .remove([filename])

    if (error) {
      logger.error('Failed to delete image from Supabase', { error, imageUrl })
      throw new Error(`Failed to delete image: ${error.message}`)
    }

    logger.info('University image deleted from Supabase', { filename })
  } catch (error) {
    logger.error('Error deleting university image', { error, imageUrl })
    throw error
  }
}

/**
 * Check if a string is a base64 image (not a URL)
 */
export function isBase64Image(str: string): boolean {
  return str.startsWith('data:image/') || /^[A-Za-z0-9+/=]+$/.test(str.substring(0, 100))
}

/**
 * Ensure storage bucket exists (call once during setup)
 */
export async function ensureStorageBucket(): Promise<void> {
  const { data: buckets, error: listError } = await getSupabaseClient().storage.listBuckets()

  if (listError) {
    logger.error('Failed to list storage buckets', { error: listError })
    throw listError
  }

  const bucketExists = buckets.some(
    (b: { name: string }) => b.name === STORAGE_BUCKETS.UNIVERSITY_IMAGES
  )

  if (!bucketExists) {
    const { error: createError } = await getSupabaseClient().storage.createBucket(
      STORAGE_BUCKETS.UNIVERSITY_IMAGES,
      {
        public: true, // Images are publicly accessible
        fileSizeLimit: 1024 * 1024 * 2 // 2MB limit
      }
    )

    if (createError) {
      logger.error('Failed to create storage bucket', { error: createError })
      throw createError
    }

    logger.info('Created storage bucket', { bucket: STORAGE_BUCKETS.UNIVERSITY_IMAGES })
  }
}
