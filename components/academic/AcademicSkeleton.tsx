import { cn } from '@/lib/utils'
import { LoadingRegion, Skeleton } from '@/components/ds/Skeleton'
import { AcademicHeading } from './AcademicHeading'
import { panelClass } from './AcademicSummary'

/*
 * The Academic page while the server reads the profile (rebranding 3.3, "D4.11 Academic
 * profile"): the heading is real, and the three panels are D2.8 skeletons, the same boxes, with
 * no shimmer. The route's loading state, so it is drawn on the server and prefetched with the
 * link; it reads nothing.
 */

function Rows() {
  return (
    <div>
      {[0, 1, 2].map((row) => (
        <span key={row} className="block h-[2.625rem] border-b border-border" />
      ))}
    </div>
  )
}

function SmallPanel() {
  return (
    <div
      className={cn(panelClass, 'flex h-[14.375rem] flex-col gap-4 p-4 md:px-6 md:pt-5 md:pb-6')}
    >
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-8 w-[70%]" />
      <Skeleton className="h-8 w-[55%]" />
      <Skeleton className="h-11 w-35" />
    </div>
  )
}

export function AcademicSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4 px-4 pt-5 pb-16 md:gap-6 md:px-6 md:pt-10 md:pb-24">
      <AcademicHeading />
      <LoadingRegion label="Loading your profile" className="flex flex-col gap-4">
        <div className={cn(panelClass, 'flex flex-col gap-4 p-4 md:px-6 md:pt-5 md:pb-6')}>
          <Skeleton className="h-5 w-45" />
          <Skeleton className="h-13 w-35" />
          <Skeleton className="h-3.5 w-55" />
          <div className="grid grid-cols-1 border-t border-border md:grid-cols-2 md:gap-x-8">
            {/* Six rows: one column on a phone, two of three on desktop */}
            <Rows />
            <Rows />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SmallPanel />
          <SmallPanel />
        </div>
      </LoadingRegion>
    </div>
  )
}
