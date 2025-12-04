import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function OnboardingPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to IB Match!</CardTitle>
        <CardDescription>
          Let&apos;s set up your profile to find the perfect university programs for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Onboarding wizard coming soon...</p>
      </CardContent>
    </Card>
  )
}
