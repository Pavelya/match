type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogData {
  level: LogLevel
  message: string
  data?: Record<string, unknown>
  timestamp: string
}

// Simple logger compatible with Next.js Edge runtime
class Logger {
  private context: Record<string, unknown>

  constructor(context: Record<string, unknown> = {}) {
    this.context = context
  }

  private log(level: LogLevel, message: string, data?: Record<string, unknown>) {
    const logData: LogData = {
      level,
      message,
      data: { ...this.context, ...data },
      timestamp: new Date().toISOString()
    }

    // In development, use pretty printing
    if (process.env.NODE_ENV !== 'production') {
      const emoji = {
        debug: '🐛',
        info: 'ℹ️',
        warn: '⚠️',
        error: '❌'
      }[level]

      // eslint-disable-next-line no-console
      console.log(`${emoji} [${level.toUpperCase()}] ${message}`, logData.data)
    } else {
      // In production, use structured JSON logging
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(logData))
    }
  }

  debug(message: string, data?: Record<string, unknown>) {
    if (process.env.NODE_ENV !== 'production') {
      this.log('debug', message, data)
    }
  }

  info(message: string | Record<string, unknown>, msgOrData?: string | Record<string, unknown>) {
    const [msg, data] =
      typeof message === 'string'
        ? [message, msgOrData as Record<string, unknown>]
        : [msgOrData as string, message]
    this.log('info', msg, data)
  }

  warn(message: string, data?: Record<string, unknown>) {
    this.log('warn', message, data)
  }

  error(message: string | Record<string, unknown>, msgOrData?: string | Record<string, unknown>) {
    const [msg, data] =
      typeof message === 'string'
        ? [message, msgOrData as Record<string, unknown>]
        : [msgOrData as string, message]
    this.log('error', msg, data)
  }

  child(context: Record<string, unknown>) {
    return new Logger({ ...this.context, ...context })
  }
}

// Create default logger instance
const logger = new Logger()

// Create child logger with context
export function createLogger(context: Record<string, unknown>) {
  return logger.child(context)
}

// Export default logger
export { logger }
