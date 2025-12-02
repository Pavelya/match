import { z } from 'zod'

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // NextAuth
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NEXTAUTH_URL: z.string().url().optional(),

  // Email (Resend)
  RESEND_API_KEY: z.string().optional(),

  // Redis (Upstash)
  UPSTASH_REDIS_URL: z.string().url().optional(),
  UPSTASH_REDIS_TOKEN: z.string().optional(),

  // Search (Algolia)
  ALGOLIA_APP_ID: z.string().optional(),
  ALGOLIA_API_KEY: z.string().optional(),
  NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: z.string().optional(),

  // Payments (Stripe)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),

  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
})

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((err) => `  - ${err.path.join('.')}: ${err.message}`)
      throw new Error(
        `❌ Invalid environment variables:\n${missingVars.join('\n')}\n\nPlease check your .env file.`
      )
    }
    throw error
  }
}

// Export validated environment variables with TypeScript types
export const env = parseEnv()

// Type-safe access to environment variables
export type Env = z.infer<typeof envSchema>
