import { PageLoader } from '@/components/ui/page-loader'
import { AcademicSkeleton } from '@/components/academic/AcademicSkeleton'
import { showsNewUi } from '@/lib/new-ui'

export default async function OnboardingLoading() {
  // The new design has no spinners (rebranding Definition of done 5): Academic's panels as
  // skeletons while the server reads the profile (3.3, "D4.11 Academic profile")
  if (await showsNewUi()) return <AcademicSkeleton />
  // Today's design, as it was until cleanup (R.2)
  return (
    <div className="in-data-[ui=next]:hidden">
      <PageLoader variant="spinner" message="Preparing your onboarding..." />
    </div>
  )
}
