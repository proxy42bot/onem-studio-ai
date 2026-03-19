'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { ResponsiveGridLayout, useContainerWidth } from 'react-grid-layout'
import type { Layout, ResponsiveLayouts } from 'react-grid-layout'
import '../styles/globals.css'

const agents = [
  { name: 'PROXY',     role: 'Orchestrator',     status: 'active' },
  { name: 'TRENDYON',  role: 'Trend Scout',       status: 'idle'   },
  { name: 'NARRYON',   role: 'Narrative',         status: 'idle'   },
  { name: 'VISUYON',   role: 'Visual Production', status: 'idle'   },
  { name: 'RENDERYON', role: 'Asset Pipeline',    status: 'idle'   },
  { name: 'VIRYON',    role: 'Optimize & Reach',  status: 'idle'   },
  { name: 'CODEXYON',  role: 'Build & Security',  status: 'active' },
  { name: 'FINYON',    role: 'Analytics',         status: 'idle'   },
]

const alerts = [
  { type: 'warn', agent: 'FINYON',  msg: 'No revenue channels configured.' },
  { type: 'warn', agent: 'VISUYON', msg: 'No asset storage configured.'    },
  { type: 'info', agent: 'VISUYON', msg: 'Replicate API key needed.'        },
  { type: 'info', agent: 'PROXY',   msg: 'Dashboard deployment in progress.' },
]

const activity = [
  { time: '14:13', agent: 'CODEXYON', action: 'BUILD — Dashboard v2.2 deployed'                  },
  { time: '13:42', agent: 'PROXY',    action: 'RESTORE — Identity loaded from GLOBAL_RULES v1.4' },
  { time: '12:18', agent: 'CODEXYON', action: 'GUARD — GitHub token refreshed'                   },
  { time: '11:05', agent: 'PROXY',    action: 'ROUTE — Pipeline idle, no new inputs'             },
  { time: '10:30', agent: 'FINYON',   action: 'REPORT — Daily analytics complete'                },
]

const tasks = [
  { text: 'Deploy dashboard v2.2',   done: true  },
  { text: 'GitHub token refresh',    done: true  },
  { text: 'Upload studio logo',      done: false },
  { text: 'Configure Replicate API', done: false },
  { text: 'Set revenue channels',    done: false },
]

const pipelineSteps = [
  { name: 'TREND', state: 'done'    },
  { name: 'NARR',  state: 'done'    },
  { name: 'VISU',  state: 'active'  },
  { name: 'REND',  state: 'pending' },
  { name: 'VIR',   state: 'pending' },
  { name: 'CODE',  state: 'pending' },
  { name: 'FIN',   state: 'pending' },
]

const DEFAULT_LAYOUTS: ResponsiveLayouts = {
  lg: [
    { i: 'stats',    x: 0, y: 0,  w: 12, h: 3,  minW: 6, minH: 2 },
    { i: 'agents',   x: 0, y: 3,  w: 4,  h: 10, minW: 2, minH: 4 },
    { i: 'weather',  x: 4, y: 3,  w: 2,  h: 4,  minW: 2, minH: 3 },
    { i: 'clock',    x: 6, y: 3,  w: 2,  h: 4,  minW: 2, minH: 3 },
    { i: 'tasks',    x: 8, y: 3,  w: 4,  h: 6,  minW: 2, minH: 4 },
    { i: 'pipeline', x: 4, y: 7,  w: 8,  h: 4,  minW: 4, minH: 3 },
    { i: 'alerts',   x: 0, y: 13, w: 5,  h: 5,  minW: 3, minH: 3 },
    { i: 'activity', x: 5, y: 13, w: 7,  h: 5,  minW: 4, minH: 3 },
  ],
}

function DragHandle() {
  return (
    <div className="drag-handle" style={{
      position: 'absolute', top: 12, right: 12,
      display: 'grid', gridTemplateColumns: 'repeat(2, 4px)', gap: '3px',
    }}>
      {[0,1,2,3].map(i => (
        <span key={i} style={{
          width: 4, height: 4,
          background: 'var(--color-text-2)',
          borderRadius: '50%', display: 'block',
        }} />
      ))}
    </div>
  )
}

function GridContent({
  layouts,
  onLayoutChange,
  time,
  date,
}: {
  layouts: ResponsiveLayouts
  onLayoutChange: (_: Layout, all: ResponsiveLayouts) => void
  time: string
  date: string
}) {
  const { width, containerRef, mounted } = useContainerWidth()

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} style={{ width: '100%' }}>
      {mounted && (
        <ResponsiveGridLayout
          width={width}
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
          rowHeight={40}
          margin={[12, 12]}
          containerPadding={[0, 0]}
          onLayoutChange={onLayoutChange}
          dragConfig={{ enabled: true, handle: '.drag-handle', bounded: false }}
          resizeConfig={{ enabled: true, handles: ['se'] }}
        >
          {/* STATS */}
          <div key="stats" className="widget">
            <div className="widget-label">System Metrics</div>
            <DragHandle />
            <div className="stats-row">
              {[
                { val: '2 / 8', lbl: 'Agents Online'  },
                { val: '1',     lbl: 'Projects'        },
                { val: 'LIVE',  lbl: 'Pipeline'        },
                { val: '0',     lbl: 'Content Pieces'  },
                { val: '2',     lbl: 'Alerts'          },
              ].map((s, i) => (
                <div className="stat-col" key={i}>
                  <div className="stat-val" style={
                    s.lbl === 'Alerts' ? { color: '#E03E3E' } :
                    s.val === 'LIVE'   ? { fontSize: '20px', paddingTop: '6px' } : {}
                  }>{s.val}</div>
                  <div className="stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AGENTS */}
          <div key="agents" className="widget">
            <div className="widget-label">Agent Matrix</div>
            <DragHandle />
            {agents.map((a, i) => (
              <div className="agent-row" key={i}>
                <div className="agent-avatar" />
                <div style={{ flex: 1 }}>
                  <div className="agent-name">{a.name}</div>
                  <div className="agent-role">{a.role}</div>
                </div>
                <div className="agent-status-dot" style={{
                  background: a.status === 'active' ? 'var(--color-text)' : 'var(--color-text-3)',
                }} />
              </div>
            ))}
          </div>

          {/* WEATHER */}
          <div key="weather" className="widget">
            <div className="widget-label">Weather · San Pedro GG</div>
            <DragHandle />
            <div className="weather-temp">24°</div>
            <div className="weather-desc">Partly cloudy</div>
            <div className="weather-desc" style={{ marginTop: '2px', fontSize: '10px' }}>San Pedro GG · MX</div>
          </div>

          {/* CLOCK */}
          <div key="clock" className="widget">
            <div className="widget-label">Time · CST</div>
            <DragHandle />
            <div className="clock-time">{time}</div>
            <div className="clock-date">{date}</div>
          </div>

          {/* TASKS */}
          <div key="tasks" className="widget">
            <div className="widget-label">Tasks</div>
            <DragHandle />
            {tasks.map((t, i) => (
              <div className="task-row" key={i}>
                <div className={`task-check${t.done ? ' done' : ''}`} />
                <div className={`task-text${t.done ? ' done' : ''}`}>{t.text}</div>
              </div>
            ))}
          </div>

          {/* PIPELINE */}
          <div key="pipeline" className="widget">
            <div className="widget-label">Pipeline Status</div>
            <DragHandle />
            <div className="pipeline-steps">
              {pipelineSteps.map((s, i) => (
                <div key={i} style={{ display: 'contents' }}>
                  <div className="p-step">
                    <div className={`p-dot ${s.state}`} />
                    <div className={`p-name${s.state === 'active' ? ' active' : ''}`}>{s.name}</div>
                  </div>
                  {i < pipelineSteps.length - 1 && <div className="p-line" />}
                </div>
              ))}
            </div>
          </div>

          {/* ALERTS */}
          <div key="alerts" className="widget">
            <div className="widget-label">Alerts</div>
            <DragHandle />
            {alerts.map((a, i) => (
              <div className={`alert-item ${a.type}`} key={i}>
                <div className="alert-type">{a.type}</div>
                <div className="alert-msg"><strong>{a.agent}</strong> — {a.msg}</div>
              </div>
            ))}
          </div>

          {/* ACTIVITY */}
          <div key="activity" className="widget">
            <div className="widget-label">Activity Log</div>
            <DragHandle />
            {activity.map((a, i) => (
              <div className="act-row" key={i}>
                <div className="act-time">{a.time}</div>
                <div className="act-agent">{a.agent}</div>
                <div className="act-action">{a.action}</div>
              </div>
            ))}
          </div>

        </ResponsiveGridLayout>
      )}
    </div>
  )
}

export default function Dashboard() {
  const [theme,   setTheme]   = useState('light')
  const [time,    setTime]    = useState('')
  const [date,    setDate]    = useState('')
  const [layouts, setLayouts] = useState<ResponsiveLayouts>(DEFAULT_LAYOUTS)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Monterrey' }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'America/Monterrey' }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('onem-dashboard-layout')
      if (saved) setLayouts(JSON.parse(saved))
    } catch {}
  }, [])

  const saveLayout = useCallback((_: Layout, all: ResponsiveLayouts) => {
    setLayouts(all)
    try { localStorage.setItem('onem-dashboard-layout', JSON.stringify(all)) } catch {}
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <div className="app-shell" data-theme={theme}>

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-box">
            <span className="logo-box-placeholder">ON</span>
          </div>
          <div className="studio-name">ONEM STUDIO AI</div>
          <div className="studio-sub">Studio Dashboard</div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Studio</div>
          <a className="nav-item active" href="#"><div className="nav-dot" style={{ background: 'var(--color-text)' }} />Dashboard</a>
          <a className="nav-item" href="#"><div className="nav-dot" style={{ background: 'var(--color-text-3)' }} />Agents</a>
          <a className="nav-item" href="#"><div className="nav-dot" style={{ background: 'var(--color-text-3)' }} />Projects</a>
          <div className="nav-section-label">Content</div>
          <a className="nav-item" href="#"><div className="nav-dot" style={{ background: 'var(--color-text-3)' }} />Pipeline</a>
          <a className="nav-item" href="#"><div className="nav-dot" style={{ background: 'var(--color-text-3)' }} />Assets</a>
          <a className="nav-item" href="#"><div className="nav-dot" style={{ background: 'var(--color-text-3)' }} />Analytics</a>
          <div className="nav-section-label">System</div>
          <a className="nav-item" href="#"><div className="nav-dot" style={{ background: 'var(--color-text-3)' }} />Settings</a>
          <a className="nav-item" href="#">
            <div className="nav-dot" style={{ background: '#E03E3E' }} />
            Alerts
            <span className="nav-badge">2</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="founder-row">
            <div className="founder-avatar"><span>ON</span></div>
            <div>
              <div className="founder-name">ONEM</div>
              <div className="founder-role">Founder</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="main-area">

        <header className="topbar">
          <div className="topbar-title">Dashboard</div>
          <div className="topbar-right">
            <span className="badge live">● LIVE</span>
            <span className="badge">v1.4</span>
            <span className="badge">{time} CST</span>
            <span className="theme-icon">{theme === 'light' ? '☀' : '☾'}</span>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode" />
          </div>
        </header>

        <main className="content-area">
          <GridContent layouts={layouts} onLayoutChange={saveLayout} time={time} date={date} />
        </main>

        <footer className="footer">
          <div className="footer-left">ONEM STUDIO AI © 2026 · dashboard-v2.2</div>
          <div className="footer-right">
            <a className="footer-link" href="https://github.com/proxy42bot/onem-studio-ai">GitHub</a>
            <a className="footer-link" href="#">Docs</a>
            <span className="footer-link">● Operational</span>
          </div>
        </footer>

      </div>
    </div>
  )
}
