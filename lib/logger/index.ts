type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogData {
  level: LogLevel
  message: string
  data?: Record<string, unknown>
  timestamp: string
}

// ============================================
// SANITIZATION UTILITIES
// ============================================

/**
 * Redact an ID to show only first 4 characters
 * Example: "cm3abc123def456ghi789jkl" → "cm3a..."
 */
export function redactId(id: string | null | undefined): string {
  if (!id || typeof id !== 'string') return '[none]'
  if (id.length <= 8) return '***'
  return `${id.slice(0, 4)}...`
}

/**
 * Redact an email to hide the local part
 * Example: "john.doe@example.com" → "***@example.com"
 */
export function redactEmail(email: string | null | undefined): string {
  if (!email || typeof email !== 'string') return '[none]'
  const atIndex = email.indexOf('@')
  if (atIndex === -1) return '***'
  return `***@${email.slice(atIndex + 1)}`
}

// Fields that should be redacted in logs
const SENSITIVE_FIELDS = new Set([
  'email',
  'password',
  'token',
  'secret',
  'apiKey',
  'api_key',
  'authorization',
  'cookie',
  'sessionToken',
  'session_token',
  'accessToken',
  'access_token',
  'refreshToken',
  'refresh_token',
  'creditCard',
  'credit_card',
  'ssn',
  'phone'
])

// Fields that contain IDs which should be partially redacted
const ID_FIELDS = new Set(['userId', 'user_id', 'studentId', 'student_id', 'id', 'profileId'])

/**
 * Recursively sanitize log data to remove/redact sensitive information
 */
function sanitizeLogData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase()

    // Check for sensitive fields - redact completely
    if (SENSITIVE_FIELDS.has(key) || SENSITIVE_FIELDS.has(lowerKey)) {
      sanitized[key] = '[REDACTED]'
      continue
    }

    // Check for ID fields - partially redact
    if (ID_FIELDS.has(key) || ID_FIELDS.has(lowerKey) || lowerKey.endsWith('id')) {
      if (typeof value === 'string') {
        sanitized[key] = redactId(value)
        continue
      }
    }

    // Check for email-like fields
    if (lowerKey.includes('email')) {
      if (typeof value === 'string') {
        sanitized[key] = redactEmail(value)
        continue
      }
    }

    // Recursively sanitize nested objects
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = sanitizeLogData(value as Record<string, unknown>)
      continue
    }

    // Sanitize arrays
    if (Array.isArray(value)) {
      sanitized[key] = value.map((item) => {
        if (item && typeof item === 'object') {
          return sanitizeLogData(item as Record<string, unknown>)
        }
        return item
      })
      continue
    }

    // Keep other values as-is
    sanitized[key] = value
  }

  return sanitized
}

// ============================================
// LOGGER CLASS
// ============================================

// Simple logger compatible with Next.js Edge runtime
class Logger {
  private context: Record<string, unknown>

  constructor(context: Record<string, unknown> = {}) {
    this.context = context
  }

  private log(level: LogLevel, message: string, data?: Record<string, unknown>) {
    // Sanitize data in production to prevent sensitive data leakage
    const mergedData = { ...this.context, ...data }
    const sanitizedData =
      process.env.NODE_ENV === 'production' ? sanitizeLogData(mergedData) : mergedData

    const logData: LogData = {
      level,
      message,
      data: sanitizedData,
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
