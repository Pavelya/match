/**
 * Redirect from old landing/students path to main page
 *
 * This redirect preserves SEO value from any existing links
 * and ensures a smooth transition after the page restructure.
 */

import { redirect } from 'next/navigation'

export default function StudentLandingRedirect() {
  redirect('/')
}
