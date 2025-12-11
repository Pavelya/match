/**
 * Admin Universities List Page
 *
 * Displays all universities in a table with:
 * - Location (flag + city, country)
 * - Classification (Public/Private)
 * - Programs count
 * - Edit and delete actions
 */

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus, Building2, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UniversityDeleteButton } from '@/components/admin/universities/UniversityDeleteButton'

export default async function UniversitiesPage() {
  const universities = await prisma.university.findMany({
    orderBy: { name: 'asc' },
    include: {
      country: true,
      _count: {
        select: {
          programs: true,
          agents: true
        }
      }
    }
  })

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Universities</h1>
          <p className="mt-2 text-muted-foreground">
            Manage universities and their academic programs.
          </p>
        </div>
        <Link
          href="/admin/universities/new"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add University
        </Link>
      </div>

      {/* Universities Table */}
      {universities.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No universities yet</h3>
          <p className="text-muted-foreground mb-6">Get started by adding your first university.</p>
          <Link
            href="/admin/universities/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add University
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border bg-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  University
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Location
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Type
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Programs
                </th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {universities.map((university) => (
                <tr key={university.id} className="hover:bg-muted/30">
                  {/* University Name */}
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/universities/${university.id}`}
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {university.name}
                    </Link>
                    {university.abbreviatedName && (
                      <span className="text-muted-foreground text-sm ml-2">
                        ({university.abbreviatedName})
                      </span>
                    )}
                  </td>

                  {/* Location */}
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    <span className="mr-1">{university.country.flagEmoji}</span>
                    {university.city}, {university.country.name}
                  </td>

                  {/* Classification */}
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                        university.classification === 'PUBLIC'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      )}
                    >
                      {university.classification}
                    </span>
                  </td>

                  {/* Programs */}
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {university._count.programs} program
                    {university._count.programs !== 1 ? 's' : ''}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/universities/${university.id}/edit`}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <UniversityDeleteButton
                        universityId={university.id}
                        universityName={university.name}
                        hasPrograms={university._count.programs > 0}
                        hasAgents={university._count.agents > 0}
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
