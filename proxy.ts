import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(_request: NextRequest) {
  const requestId = crypto.randomUUID()
  const response = NextResponse.next()
  response.headers.set('x-request-id', requestId)
  return response
}

// Configure which routes to run proxy on
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
