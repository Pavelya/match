/**
 * Coordinator Root Page
 *
 * Redirects to the coordinator dashboard.
 * This ensures /coordinator always goes to /coordinator/dashboard.
 */

import { redirect } from 'next/navigation'

export default function CoordinatorRootPage() {
  redirect('/coordinator/dashboard')
}
