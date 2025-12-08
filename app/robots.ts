/**
 * Robots.txt Configuration
 *
 * Controls search engine crawler access to the site.
 * - Allows crawling of public pages (programs, search)
 * - Blocks API routes and authenticated student pages
 */

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ibmatch.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/auth/error', '/auth/verify-request', '/student/']
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  }
}
