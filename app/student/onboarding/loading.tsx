import { Loader2 } from 'lucide-react'

export default function OnboardingLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground">Preparing your onboarding...</p>
      </div>
    </div>
  )
}
