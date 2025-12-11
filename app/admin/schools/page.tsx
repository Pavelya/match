/**
 * Admin Schools List Page
 *
 * Displays all IB schools in a table with:
 * - Tier badges (VIP/Regular)
 * - Subscription status
 * - Coordinator and student counts
 * - Edit and delete actions
 */

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus, Crown, GraduationCap, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SchoolDeleteButton } from '@/components/admin/schools/SchoolDeleteButton'

export default async function SchoolsPage() {
  const schools = await prisma.iBSchool.findMany({
    orderBy: { name: 'asc' },
    include: {
      country: true,
      _count: {
        select: {
          coordinators: true,
          students: true
        }
      }
    }
  })

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">IB Schools</h1>
          <p className="mt-2 text-muted-foreground">Manage IB schools and their coordinators.</p>
        </div>
        <Link
          href="/admin/schools/new"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add School
        </Link>
      </div>

      {/* Schools Table */}
      {schools.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center">
          <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No schools yet</h3>
          <p className="text-muted-foreground mb-6">Get started by adding your first IB school.</p>
          <Link
            href="/admin/schools/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add School
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border bg-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  School
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Location
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Tier
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Members
                </th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {schools.map((school) => (
                <tr key={school.id} className="hover:bg-muted/30">
                  {/* School Name */}
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/schools/${school.id}`}
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {school.name}
                    </Link>
                  </td>

                  {/* Location */}
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    <span className="mr-1">{school.country.flagEmoji}</span>
                    {school.city}, {school.country.name}
                  </td>

                  {/* Tier Badge */}
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full',
                        school.subscriptionTier === 'VIP'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {school.subscriptionTier === 'VIP' && <Crown className="h-3 w-3" />}
                      {school.subscriptionTier}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                        school.subscriptionStatus === 'ACTIVE'
                          ? 'bg-green-100 text-green-700'
                          : school.subscriptionStatus === 'INACTIVE'
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-red-100 text-red-700'
                      )}
                    >
                      {school.subscriptionStatus}
                    </span>
                  </td>

                  {/* Members */}
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {school._count.coordinators} coordinator
                    {school._count.coordinators !== 1 ? 's' : ''}, {school._count.students} student
                    {school._count.students !== 1 ? 's' : ''}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/schools/${school.id}/edit`}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <SchoolDeleteButton
                        schoolId={school.id}
                        schoolName={school.name}
                        hasCoordinators={school._count.coordinators > 0}
                        hasStudents={school._count.students > 0}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
