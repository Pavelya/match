import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-lg font-bold">IB Match</h3>
            <p className="text-sm text-muted-foreground">
              Connecting IB students with their dream university programs
            </p>
          </div>

          {/* For Students */}
          <div>
            <h4 className="mb-4 font-semibold">For Students</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/programs" className="hover:text-foreground">
                  Browse Programs
                </Link>
              </li>
              <li>
                <Link href="/universities" className="hover:text-foreground">
                  Universities
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-foreground">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          {/* For Schools */}
          <div>
            <h4 className="mb-4 font-semibold">For Schools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/for-schools" className="hover:text-foreground">
                  IB Coordinators
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {currentYear} IB Match. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
