import { Redis } from '@upstash/redis'
import { env } from '@/lib/env'

// Singleton Redis client for serverless environments
// Uses Upstash REST API (no persistent connections needed)
let redisInstance: Redis | null = null

export function getRedisClient(): Redis {
  if (!redisInstance) {
    if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
      throw new Error(
        'Redis credentials not found. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in your .env file.'
      )
    }

    redisInstance = new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN
    })
  }

  return redisInstance
}

// Export singleton instance
export const redis = getRedisClient()
