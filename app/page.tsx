'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { ResponsiveGridLayout, useContainerWidth } from 'react-grid-layout'
import type { Layout, ResponsiveLayouts } from 'react-grid-layout'
import '../styles/globals.css'

const agents = [
  { name: 'PROXY',     role: 'Orchestrator',     status: 'active', model:'haiku', desc:'Validates every input from ONEM and decides which agents to activate, in what order, and whether to skip based on cached outputs.', runs:142, tokens:'48K', uptime:'99%', tags:['routing','orchestration','cache'] },
  { name: 'TRENDYON',  role: 'Trend Scout',       status: 'idle',   model:'haiku', desc:'Monitors Instagram, YouTube Shorts and X every 48h to surface trending topics and formats.', runs:28, tokens:'12K', uptime:'100%', tags:['trends','instagram','youtube'] },
  { name: 'NARRYON',   role: 'Narrative',         status: 'idle',   model:'sonnet', desc:'Activates only on new project briefs. Writes brand story, core message, tone keywords and content pillars.', runs:6, tokens:'18K', uptime:'100%', tags:['creative','narrative','brand'] },
  { name: 'VISUYON',   role: 'Visual Production', status: 'idle',   model:'sonnet', desc:'Receives NARRYON handoff and produces visual direction brief and Replicate-ready image prompts.', runs:6, tokens:'14K', uptime:'100%', tags:['visual','replicate','prompts'] },
  { name: 'RENDERYON', role: 'Asset Pipeline',    status: 'idle',   model:'haiku', desc:'Manages all production jobs from prompt to final delivered file. Tracks versions, formats and platform export specs.', runs:18, tokens:'8K', uptime:'98%', tags:['pipeline','render','formats'] },
  { name: 'VIRYON',    role: 'Optimize & Reach',  status: 'idle',   model:'haiku', desc:'Reformats and optimizes content natively per platform. Watch time and saves are primary metrics.', runs:20, tokens:'16K', uptime:'100%', tags:['instagram','youtube','optimization'] },
  { name: 'CODEXYON',  role: 'Build & Security',  status: 'active', model:'sonnet', desc:'Handles all code, deployment, automation and security tasks. Operates in BUILD or GUARD mode.', runs:34, tokens:'82K', uptime:'99%', tags:['build','deploy','security'] },
  { name: 'FINYON',    role: 'Analytics',         status: 'idle',   model:'haiku', desc:'Runs daily cron. Reports revenue, engagement metrics, top/worst performing content and priority actions.', runs:24, tokens:'10K', uptime:'100%', tags:['analytics','revenue','metrics'] },
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
  onAgentClick,
}: {
  layouts: ResponsiveLayouts
  onLayoutChange: (_: Layout, all: ResponsiveLayouts) => void
  time: string
  date: string
  onAgentClick: (a: typeof agents[0]) => void
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
              <div className="agent-row" key={i} onClick={() => onAgentClick(a)} style={{cursor:'pointer'}}>
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
  const [selected, setSelected] = useState<typeof agents[0] | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const [popupPos, setPopupPos] = useState({x: 0, y: 0})
  const dragging = useRef(false)
  const dragOffset = useRef({x:0, y:0})

  function openPopup(a: typeof agents[0]) {
    setPopupPos({x: window.innerWidth/2 - 170, y: window.innerHeight/2 - 200})
    setSelected(a)
  }

  function startDrag(e: React.MouseEvent) {
    if((e.target as HTMLElement).closest('button')) return
    dragging.current = true
    dragOffset.current = {
      x: e.clientX - popupPos.x,
      y: e.clientY - popupPos.y
    }
    const onMove = (ev: MouseEvent) => {
      if(!dragging.current) return
      setPopupPos({
        x: ev.clientX - dragOffset.current.x,
        y: ev.clientY - dragOffset.current.y
      })
    }
    const onUp = () => {
      dragging.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

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
          <GridContent layouts={layouts} onLayoutChange={saveLayout} time={time} date={date} onAgentClick={openPopup} />
        </main>

        <footer className="footer">
          <div className="footer-left">ONEM STUDIO AI © 2026 · dashboard-v2.4</div>
          <div className="footer-right">
            <a className="footer-link" href="https://github.com/proxy42bot/onem-studio-ai">GitHub</a>
            <a className="footer-link" href="#">Docs</a>
            <span className="footer-link">● Operational</span>
          </div>
        </footer>

      {/* AGENT POPUP */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.3)',zIndex:500}}
        >
          <div
            ref={popupRef}
            onClick={e => e.stopPropagation()}
            style={{
              position:'fixed',
              top: popupPos.y, left: popupPos.x,
              width:'340px',
              background:'var(--color-surface)',
              borderRadius:'16px',
              border:'1px solid var(--color-border)',
              boxShadow:'0 8px 32px rgba(0,0,0,0.18)',
              overflow:'hidden',
              cursor:'move',
              userSelect:'none',
            }}
            onMouseDown={startDrag}
          >
            <div style={{
              padding:'16px',display:'flex',
              alignItems:'center',gap:'14px',
              borderBottom:'1px solid var(--color-border)',
              position:'relative'
            }}>
              <div style={{
                width:'80px',height:'80px',
                borderRadius:'14px',overflow:'hidden',
                flexShrink:0,border:'2px solid var(--color-border)'
              }}>
                <img
                  src={`/avatars/${selected.name.toLowerCase()}.png`}
                  alt={selected.name}
                  style={{width:'100%',height:'100%',objectFit:'cover'}}
                />
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:'18px',fontWeight:700,color:'var(--color-text)'}}>
                  {selected.name}
                </div>
                <div style={{fontSize:'10px',color:'var(--color-text-2)',textTransform:'uppercase',letterSpacing:'.08em',marginTop:'2px'}}>
                  {selected.role} · {selected.model}
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'5px',marginTop:'6px'}}>
                  <div style={{
                    width:'7px',height:'7px',borderRadius:'50%',
                    background:selected.status==='active'?'var(--color-text)':'var(--color-text-3)'
                  }}/>
                  <span style={{fontSize:'10px',color:'var(--color-text-2)'}}>{selected.status}</span>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  position:'absolute',top:'10px',right:'10px',
                  width:'22px',height:'22px',
                  background:'var(--color-surface-2)',border:'none',
                  borderRadius:'50%',cursor:'pointer',
                  color:'var(--color-text-2)',fontSize:'12px',
                  display:'flex',alignItems:'center',justifyContent:'center'
                }}
              >×</button>
            </div>
            <div style={{padding:'14px 16px',display:'flex',flexDirection:'column',gap:'12px'}}>
              <p style={{fontSize:'11px',color:'var(--color-text-2)',lineHeight:1.5}}>
                {selected.desc}
              </p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px'}}>
                {[
                  {val:selected.runs,lbl:'Runs'},
                  {val:selected.tokens,lbl:'Tokens'},
                  {val:selected.uptime,lbl:'Uptime'},
                ].map((s,i) => (
                  <div key={i} style={{
                    background:'var(--color-surface-2)',
                    borderRadius:'8px',padding:'8px',textAlign:'center'
                  }}>
                    <div style={{fontSize:'14px',fontWeight:700,color:'var(--color-text)'}}>{s.val}</div>
                    <div style={{fontSize:'8px',color:'var(--color-text-3)',textTransform:'uppercase',letterSpacing:'.06em',marginTop:'2px'}}>{s.lbl}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'4px'}}>
                {selected.tags.map((tag,i) => (
                  <span key={i} style={{
                    fontSize:'9px',background:'var(--color-surface-2)',
                    borderRadius:'99px',padding:'3px 8px',
                    color:'var(--color-text)',border:'1px solid var(--color-border)'
                  }}>{tag}</span>
                ))}
              </div>
              <button style={{
                background:'var(--color-text)',color:'var(--color-bg)',
                border:'none',borderRadius:'var(--radius-button)',
                padding:'9px',fontSize:'11px',fontWeight:500,
                cursor:'pointer',width:'100%'
              }}>
                Chat with {selected.name} →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
