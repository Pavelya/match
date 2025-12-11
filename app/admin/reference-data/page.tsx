import { ReferenceDataClient } from '@/components/admin/reference/ReferenceDataClient'

export default function ReferenceDataPage() {
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Reference Data Management</h1>
        <p className="mt-2 text-muted-foreground">
          Manage fields of study, countries, and IB courses used throughout the platform.
        </p>
      </div>

      {/* Reference Data Client (handles all CRUD operations) */}
      <div className="rounded-xl border bg-card p-6">
        <ReferenceDataClient />
      </div>
    </div>
  )
}
