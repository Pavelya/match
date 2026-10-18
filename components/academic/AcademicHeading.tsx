/** The Academic page's h1 and what the page is for (D4.11) */
export function AcademicHeading() {
  return (
    <div className="flex flex-col gap-1.5">
      <h1 className="text-h1">Academic profile</h1>
      <p className="text-body text-muted-foreground md:text-body-l">
        Your subjects, interests and countries decide your matches. Change any of them here.
      </p>
    </div>
  )
}
