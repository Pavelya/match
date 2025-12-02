import 'dotenv/config'
import { redis } from '@/lib/redis/client'

async function testRedis() {
  try {
    // Test basic set/get
    await redis.set('test-key', 'Hello from IB Match!')
    const value = await redis.get('test-key')
    console.log('✅ Redis connected! Test value:', value)

    // Test with expiry
    await redis.set('test-ttl', 'expires in 10 seconds', { ex: 10 })
    console.log('✅ Set key with TTL')

    // Clean up
    await redis.del('test-key', 'test-ttl')
    console.log('✅ Cleanup complete')
  } catch (error) {
    console.error('❌ Redis connection failed:', error)
    process.exit(1)
  }
}

testRedis()
