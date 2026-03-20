'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label:'Dashboard', href:'/', section:'Studio' },
  { label:'Agents', href:'/agents', section:'Studio' },
  { label:'Projects', href:'/projects', section:'Studio' },
  { label:'Pipeline', href:'/pipeline', section:'Content' },
  { label:'Assets', href:'/assets', section:'Content' },
  { label:'Analytics', href:'/analytics', section:'Content' },
  { label:'Settings', href:'/settings', section:'System' },
  { label:'Alerts', href:'/alerts', section:'System', badge:2 },
]
const NAV_SECTIONS = ['Studio','Content','System']

export default function Sidebar() {
  const pathname = usePathname()
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem('onem-theme')
    if (saved) {
      setTheme(saved)
      document.documentElement.setAttribute('data-theme', saved)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('onem-theme', next)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-box">
          <span className="logo-box-placeholder">ON</span>
        </div>
        <div className="studio-name">ONEM STUDIO AI</div>
        <div className="studio-sub">Studio Dashboard</div>
      </div>

      <nav className="sidebar-nav">
        {NAV_SECTIONS.map(section => (
          <div key={section}>
            <div className="nav-section-label">{section}</div>
            {NAV_ITEMS.filter(i => i.section===section).map(item => (
              <Link key={item.href} href={item.href} style={{
                display:'flex', alignItems:'center', gap:'8px',
                padding:'8px 10px', borderRadius:'10px',
                cursor:'pointer', textDecoration:'none',
                transition:'all 150ms ease',
                background: pathname===item.href ? 'var(--color-surface-2)' : 'transparent',
                color: pathname===item.href ? 'var(--color-text)' : 'var(--color-text-2)',
                fontWeight: pathname===item.href ? 500 : 400,
                fontSize:'12px',
              }}>
                <div style={{
                  width:'6px', height:'6px', borderRadius:'50%',
                  flexShrink:0,
                  background: item.label==='Alerts' ? '#E03E3E' :
                    pathname===item.href ? 'var(--color-text)' : 'var(--color-text-3)'
                }}/>
                {item.label}
                {item.badge && (
                  <span style={{
                    marginLeft:'auto',
                    background:'#E03E3E', color:'#fff',
                    borderRadius:'99px', padding:'1px 6px',
                    fontSize:'9px', fontWeight:700
                  }}>{item.badge}</span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="founder-row">
          <div className="founder-avatar"><span>ON</span></div>
          <div>
            <div className="founder-name">ONEM</div>
            <div className="founder-role">Founder</div>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          style={{
            display:'flex', alignItems:'center', gap:'8px',
            padding:'8px 10px', borderRadius:'10px',
            cursor:'pointer', width:'100%',
            background:'transparent', border:'none',
            color:'var(--color-text-2)', fontSize:'12px',
            marginTop:'8px'
          }}
        >
          <span style={{fontSize:'14px'}}>
            {theme === 'light' ? '☀' : '☾'}
          </span>
          {theme === 'light' ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </aside>
  )
}
