/**
 * Coordinator Root Page
 *
 * Redirects to the coordinator dashboard.
 * This ensures /coordinator always goes to /coordinator/dashboard.
 */

import { redirect } from 'next/navigation'
import { requireCoordinator } from '@/lib/auth/guards'

export default async function CoordinatorRootPage() {
  await requireCoordinator()
  redirect('/coordinator/dashboard')
}
