/**
 * NextAuth.js Type Extensions
 *
 * Extends the default NextAuth types to include custom fields
 * used throughout the application.
 */

import { UserRole } from '@prisma/client'
import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
      email?: string | null
      name?: string | null
      image?: string | null
    }
  }

  interface User {
    role?: UserRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: UserRole
  }
}
