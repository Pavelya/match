export default function ReferenceDataPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Reference Data Management</h1>
        <p className="mt-2 text-muted-foreground">
          Manage fields of study, countries, and IB courses used throughout the platform.
        </p>
      </div>

      {/* Placeholder sections for each data type */}
      <div className="space-y-8">
        {/* Fields of Study Section */}
        <section className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Fields of Study</h2>
          <div className="rounded-lg border border-dashed border-muted-foreground/25 p-8 text-center">
            <p className="text-muted-foreground">
              Field of Study CRUD interface will be implemented in task 3.1.1
            </p>
          </div>
        </section>

        {/* Countries Section */}
        <section className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Countries</h2>
          <div className="rounded-lg border border-dashed border-muted-foreground/25 p-8 text-center">
            <p className="text-muted-foreground">
              Country CRUD interface will be implemented in task 3.1.1
            </p>
          </div>
        </section>

        {/* IB Courses Section */}
        <section className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">IB Courses</h2>
          <div className="rounded-lg border border-dashed border-muted-foreground/25 p-8 text-center">
            <p className="text-muted-foreground">
              IB Course CRUD interface will be implemented in task 3.1.1
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
