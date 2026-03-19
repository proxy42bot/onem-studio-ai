// dashboard-v2.1 — redirects root to /dashboard
import { redirect } from 'next/navigation'

export default function Page() {
  redirect('/dashboard')
}
