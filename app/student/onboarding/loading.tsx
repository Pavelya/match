import { PageLoader } from '@/components/ui/page-loader'

export default function OnboardingLoading() {
  // Today's design only: the new one has no spinners (rebranding Definition of done 5), and its
  // steps arrive in the server's HTML
  return (
    <div className="in-data-[ui=next]:hidden">
      <PageLoader variant="spinner" message="Preparing your onboarding..." />
    </div>
  )
}
