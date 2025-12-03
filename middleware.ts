import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { logger } from '@/lib/logger'

export function middleware(request: NextRequest) {
  const start = Date.now()
  const requestId = crypto.randomUUID()

  // Log incoming request
  logger.info(
    {
      requestId,
      method: request.method,
      url: request.url,
      userAgent: request.headers.get('user-agent')
    },
    'Incoming request'
  )

  // Clone response to add headers
  const response = NextResponse.next()
  response.headers.set('x-request-id', requestId)

  // Log response (after request completes)
  const duration = Date.now() - start
  logger.info(
    {
      requestId,
      method: request.method,
      url: request.url,
      duration: `${duration}ms`
    },
    'Request completed'
  )

  return response
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}
