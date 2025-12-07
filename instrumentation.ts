/**
 * Next.js Instrumentation
 *
 * This file runs when the server starts, before any requests are handled.
 * Used to warm caches so the first user doesn't experience cold start delays.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  // Only run on Node.js runtime (not Edge)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Dynamic import to avoid issues during build
    const { logger } = await import('./lib/logger')

    logger.info('Instrumentation: Warming caches...')

    try {
      // Import and warm the programs cache
      const { warmProgramsCache } = await import('./lib/matching/program-cache')
      await warmProgramsCache()

      logger.info('Instrumentation: Programs cache warmed successfully')
    } catch (error) {
      // Don't crash the server if cache warming fails
      logger.error('Instrumentation: Failed to warm cache', { error })
    }
  }
}
