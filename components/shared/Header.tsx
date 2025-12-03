import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-primary">
          IB Match
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/programs" className="text-sm text-muted-foreground hover:text-foreground">
            Programs
          </Link>
          <Link
            href="/universities"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Universities
          </Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/auth/signin">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
