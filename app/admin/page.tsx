import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth/guards'

export default async function AdminPage() {
  await requireAdmin()
  // Redirect /admin to /admin/dashboard
  redirect('/admin/dashboard')
}
