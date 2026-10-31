/** Not seen for 6 months: due the inactivity notice (MAINT 7.6, lib/account/inactivity.ts) */
export function SilentLabel() {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-700"
      title="Not seen signed in for 6 months"
    >
      Silent
    </span>
  )
}
