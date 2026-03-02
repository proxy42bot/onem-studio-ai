import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ONEM STUDIO AI — System Dashboard',
  description: 'Creative agency orchestrated by Proxy',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
