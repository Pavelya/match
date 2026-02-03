import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <svg
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>We&apos;ve sent you a secure link to access IB Match</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Click the link in the email to continue. If you&apos;re new, your account will be
            created automatically. The link expires in 15 minutes.
          </p>
          <p className="text-xs text-muted-foreground">
            Don&apos;t see it? Check your spam folder.
          </p>
          <div className="pt-4">
            <Link href="/auth/signin" className="text-sm text-primary hover:underline">
              Didn&apos;t receive the email? Try again
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
