import pino from 'pino'

// Create base logger instance
const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() }
    }
  },
  // Pretty printing in development
  ...(process.env.NODE_ENV !== 'production' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
        translateTime: 'SYS:standard'
      }
    }
  })
})

// Create child logger with context
export function createLogger(context: Record<string, unknown>) {
  return logger.child(context)
}

// Export default logger
export { logger }
