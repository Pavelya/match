import 'dotenv/config'
import { logger, createLogger } from '@/lib/logger'

// Test basic logging
logger.info('✅ Basic logger test')
logger.debug('Debug message (only in development)')
logger.warn('Warning message')
logger.error('Error message')

// Test context logger
const userLogger = createLogger({ userId: '123', email: 'test@example.com' })
userLogger.info('User action logged')

// Test structured data
logger.info(
  {
    action: 'test',
    data: { key: 'value' },
    timestamp: new Date().toISOString()
  },
  'Structured log entry'
)

console.log('\n✅ Logger tests complete!')
