import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Turbopack is default in Next.js 16
  // React Compiler will be enabled when available

  // Allow external images from Google (for user avatars)
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
      }
    ]
  }
}

export default nextConfig
