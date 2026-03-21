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
    { i: 'agents',   x: 0, y: 0,  w: 4,  h: 10, minW: 2, minH: 4 },
    { i: 'time-weather', x: 4, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
    { i: 'tasks',    x: 8, y: 0,  w: 4,  h: 6,  minW: 2, minH: 4 },
    { i: 'pipeline', x: 4, y: 6,  w: 8,  h: 4,  minW: 4, minH: 3 },
    { i: 'alerts',   x: 0, y: 10, w: 5,  h: 5,  minW: 3, minH: 3 },
    { i: 'activity', x: 5, y: 10, w: 7,  h: 5,  minW: 4, minH: 3 },
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
          {/* AGENTS */}
          <div key="agents" className="widget">
            <div className="widget-label">Agent Matrix</div>
            <DragHandle />
            {agents.map((a, i) => (
              <div className="agent-row" key={i}>
                <div className="agent-avatar" style={{overflow:'hidden',borderRadius:'6px'}}>
                  <img
                    src={`/avatars/${a.name.toLowerCase()}.png`}
                    alt={a.name}
                    style={{width:'100%',height:'100%',objectFit:'cover'}}
                    onError={(e)=>{e.currentTarget.style.display='none'}}
                  />
                </div>
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

          {/* TIME & WEATHER */}
          <div key="time-weather" className="widget">
            <div className="widget-label">Time & Weather · San Pedro GG</div>
            <DragHandle />
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <div>
                <div style={{
                  fontSize:'36px',fontWeight:700,
                  color:'var(--color-text)',letterSpacing:'-0.02em',lineHeight:1
                }}>{time}</div>
                <div style={{fontSize:'10px',color:'var(--color-text-2)',marginTop:'4px'}}>
                  {date} · CST
                </div>
              </div>
              <div style={{borderTop:'1px solid var(--color-border)',paddingTop:'10px'}}>
                <div style={{
                  fontSize:'36px',fontWeight:700,
                  color:'var(--color-text)',letterSpacing:'-0.02em',lineHeight:1
                }}>24°</div>
                <div style={{fontSize:'10px',color:'var(--color-text-2)',marginTop:'4px'}}>
                  Partly cloudy · MX
                </div>
              </div>
            </div>
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

  return (
    <div className="main-area">

        <header className="topbar">
          <div className="topbar-left">
            <span className="topbar-title">Dashboard</span>
          </div>

          <div className="topbar-center">
            {[
              { val: '2/8',  lbl: 'agents online', danger: false },
              { val: '1',    lbl: 'projects',       danger: false },
              { val: 'LIVE', lbl: 'pipeline',       danger: false },
              { val: '0',    lbl: 'content',        danger: false },
              { val: '2',    lbl: 'alerts',         danger: true  },
            ].map((s, i) => (
              <div className="topbar-stat" key={i}>
                <span className="topbar-stat-val" style={s.danger ? { color: '#E03E3E' } : {}}>
                  {s.val}
                </span>
                <span className="topbar-stat-lbl">{s.lbl}</span>
                {i < 4 && <div className="topbar-divider" />}
              </div>
            ))}
          </div>

          <div className="topbar-right">
            <span className="badge live">● LIVE</span>
            <span className="badge">{time} CST</span>

          </div>
        </header>

        <main className="content-area">
          <GridContent layouts={layouts} onLayoutChange={saveLayout} time={time} date={date} />
        </main>

        <footer className="footer">
          <div className="footer-left">ONEM STUDIO AI © 2026 · dashboard-v2.4</div>
          <div className="footer-right">
            <a className="footer-link" href="https://github.com/proxy42bot/onem-studio-ai">GitHub</a>
            <a className="footer-link" href="#">Docs</a>
            <span className="footer-link">● Operational</span>
          </div>
        </footer>

    </div>
  )
}
