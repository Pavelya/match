/**
 * Supabase Storage Utilities
 *
 * Functions for uploading and managing images in Supabase Storage.
 */

import { getSupabaseClient, STORAGE_BUCKETS } from './client'
import { logger } from '@/lib/logger'

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
    // Extract base64 data and content type
    let base64Data = imageData
    let contentType = 'image/jpeg' // default

    if (imageData.startsWith('data:')) {
      const match = imageData.match(/^data:([^;]+);base64,(.+)$/)
      if (match) {
        contentType = match[1]
        base64Data = match[2]
      }
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, 'base64')

    // Generate unique filename
    const extension = contentType.split('/')[1] || 'jpg'
    const filename = `${universityId}-${Date.now()}.${extension}`

    // Upload to Supabase Storage
    const { data, error } = await getSupabaseClient()
      .storage.from(STORAGE_BUCKETS.UNIVERSITY_IMAGES)
      .upload(filename, buffer, {
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
