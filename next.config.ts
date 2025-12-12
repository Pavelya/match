import type { NextConfig } from 'next'

/**
 * Security headers to protect against common web vulnerabilities
 */
const securityHeaders = [
  {
    // Prevent clickjacking by disallowing iframe embedding
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    // Prevent MIME type sniffing
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    // Control referrer information sent with requests
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    // Enable browser XSS filter (legacy, but still useful for older browsers)
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    // Restrict browser features that aren't needed
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  },
  {
    // Enforce HTTPS (1 year, including subdomains)
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    // Content Security Policy - protect against XSS and data injection
    key: 'Content-Security-Policy',
    value: [
      // Default: only allow same-origin
      "default-src 'self'",
      // Scripts: self + inline for Next.js hydration + eval for development
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Styles: self + inline for styled-jsx and CSS-in-JS
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: self + Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + Google (avatars) + Supabase (university images) + data URIs + blob for image processing
      "img-src 'self' https://*.googleusercontent.com https://*.supabase.co data: blob:",
      // Connect: self + API endpoints + Algolia + Upstash
      "connect-src 'self' https://*.algolia.net https://*.algolianet.com https://*.upstash.io",
      // Frame ancestors: none (equivalent to X-Frame-Options: DENY)
      "frame-ancestors 'none'",
      // Form actions: self only
      "form-action 'self'",
      // Base URI: self only
      "base-uri 'self'",
      // Upgrade insecure requests in production
      'upgrade-insecure-requests'
    ].join('; ')
  }
]

const nextConfig: NextConfig = {
  // Turbopack is default in Next.js 16
  // React Compiler will be enabled when available

  // Security headers for all routes
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: securityHeaders
      }
    ]
  },

  // Allow external images from Google (for user avatars) and Supabase (for university images)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/**'
      }
    ]
  }
}

export default nextConfig
