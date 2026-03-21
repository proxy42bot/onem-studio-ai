'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const [theme, setTheme] = useState('dark')
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-current',
      collapsed ? 'var(--sidebar-col)' : 'var(--sidebar-width)'
    )
  }, [collapsed])

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
    <aside className={`sb${collapsed ? ' collapsed' : ''}`} id="sb">
      <div className="sb-top">
        <div className="sb-top-row">
          <div className="logo-box"><span>ON</span></div>
          <div className="sb-brand">
            <div className="sname">ONEM STUDIO AI</div>
            <div className="ssub">Studio Dashboard</div>
          </div>
        </div>
        <button
          className="toggle-btn"
          onClick={() => setCollapsed(c => !c)}
        >
          {collapsed ? '›' : '‹ collapse'}
        </button>
      </div>
      <nav className="sb-nav">
        <div className="nl">Studio</div>
        <Link className={`ni${pathname==='/'?' active':''}`} href="/" data-label="Dashboard">
          <span className="ni-icon">⊞</span>
          <span className="ni-label">Dashboard</span>
        </Link>
        <Link className={`ni${pathname==='/agents'?' active':''}`} href="/agents" data-label="Agents">
          <span className="ni-icon">⬡</span>
          <span className="ni-label">Agents</span>
        </Link>
        <Link className={`ni${pathname==='/projects'?' active':''}`} href="/projects" data-label="Projects">
          <span className="ni-icon">◈</span>
          <span className="ni-label">Projects</span>
        </Link>
        <div className="nl">Content</div>
        <Link className={`ni${pathname==='/pipeline'?' active':''}`} href="/pipeline" data-label="Pipeline">
          <span className="ni-icon">⟶</span>
          <span className="ni-label">Pipeline</span>
        </Link>
        <Link className={`ni${pathname==='/assets'?' active':''}`} href="/assets" data-label="Assets">
          <span className="ni-icon">◧</span>
          <span className="ni-label">Assets</span>
        </Link>
        <Link className={`ni${pathname==='/analytics'?' active':''}`} href="/analytics" data-label="Analytics">
          <span className="ni-icon">↗</span>
          <span className="ni-label">Analytics</span>
        </Link>
        <div className="nl">System</div>
        <Link className={`ni${pathname==='/settings'?' active':''}`} href="/settings" data-label="Settings">
          <span className="ni-icon">⚙</span>
          <span className="ni-label">Settings</span>
        </Link>
        <Link className="ni" href="/alerts" data-label="Alerts" style={{position:'relative'}}>
          <span className="ni-icon">⚠</span>
          <span className="ni-label">Alerts</span>
          <span className="nbadge">2</span>
          <span className="ni-dot"></span>
        </Link>
      </nav>
      <div className="sb-foot">
        <button className="theme-btn" onClick={toggleTheme}>
          <span style={{fontSize:'14px',flexShrink:0}}>{theme==='light'?'☀':'☾'}</span>
          <span className="theme-btn-label">{theme==='light'?'Light mode':'Dark mode'}</span>
        </button>
        <div className="frow">
          <div className="fav"><span>ON</span></div>
          <div className="f-info">
            <div className="fname">ONEM</div>
            <div className="frole">Founder</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
