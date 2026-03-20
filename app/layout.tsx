import type { Metadata } from 'next'
import '../styles/globals.css'
import Sidebar from '../components/Sidebar'
import FloatingChat from '../components/FloatingChat'

export const metadata: Metadata = {
  title: 'ONEM STUDIO AI — System Dashboard',
  description: 'Creative agency orchestrated by Proxy',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div style={{display:'flex', minHeight:'100vh'}}>
          <Sidebar />
          <div style={{
            flex:1,
            marginLeft:'var(--sidebar-width)',
            display:'flex',
            flexDirection:'column',
            minHeight:'100vh'
          }}>
            {children}
          </div>
        </div>
        <FloatingChat />
      </body>
    </html>
  )
}
