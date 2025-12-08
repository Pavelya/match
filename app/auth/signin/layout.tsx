import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to IB Match to find your perfect university program match.',
  robots: {
    index: true,
    follow: true
  }
}

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children
}
