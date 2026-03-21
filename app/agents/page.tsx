'use client'
import { useState, useRef } from 'react'
import StudioWidget from '../../components/StudioWidget'

const AGENTS = [
 { id:'PROXY', initials:'PX', color:'#FFFFFF', model:'haiku', status:'active',
 role:'Orchestrator', area:"PROXY's Office",
 desc:'Validates every input from ONEM and decides which agents to activate, in what order, and whether to skip based on cached outputs.',
 runs:142, tokens:'48K', uptime:'99%',
 tags:['routing','orchestration','cache','rate-limit'] },
 { id:'TRENDYON', initials:'TR', color:'#7f77dd', model:'haiku', status:'idle',
 role:'Trend Scout', area:'Viral & Reach Hub',
 desc:'Monitors Instagram, YouTube Shorts and X every 48h to surface trending topics, formats and opportunities before NARRYON briefs.',
 runs:28, tokens:'12K', uptime:'100%',
 tags:['trends','instagram','youtube','x'] },
 { id:'VIRYON', initials:'VR', color:'#3d9e3d', model:'haiku', status:'idle',
 role:'Optimize & Reach', area:'Viral & Reach Hub',
 desc:'Reformats and optimizes content natively per platform. Never cross-posts raw content. Watch time and saves are primary metrics.',
 runs:20, tokens:'16K', uptime:'100%',
 tags:['instagram','youtube','x','optimization'] },
 { id:'NARRYON', initials:'NA', color:'#E03E3E', model:'sonnet', status:'idle',
 role:'Narrative', area:'Creative Studio',
 desc:'Activates only on new project briefs. Writes brand story, core message, tone keywords, content pillars and VISUYON handoff.',
 runs:6, tokens:'18K', uptime:'100%',
 tags:['creative','narrative','brand','brief'] },
 { id:'VISUYON', initials:'VI', color:'#60B4F0', model:'sonnet', status:'idle',
 role:'Visual Production', area:'Creative Studio',
 desc:'Receives NARRYON handoff and produces visual direction brief, Replicate-ready image prompts and asset checklist.',
 runs:6, tokens:'14K', uptime:'100%',
 tags:['visual','replicate','prompts','assets'] },
 { id:'RENDERYON', initials:'RX', color:'#F5C518', model:'haiku', status:'idle',
 role:'Asset Pipeline', area:'Creative Studio',
 desc:'Manages all production jobs from prompt to final delivered file. Tracks versions, formats and platform export specs.',
 runs:18, tokens:'8K', uptime:'98%',
 tags:['pipeline','render','formats','versions'] },
 { id:'CODEXYON', initials:'CX', color:'#0A0A0A', model:'sonnet', status:'active',
 role:'Build & Security', area:'Analytics & Code Lab',
 desc:'Handles all code, deployment, automation and security tasks. Operates in BUILD or GUARD mode.',
 runs:34, tokens:'82K', uptime:'99%',
 tags:['build','deploy','security','guard','vercel'] },
 { id:'FINYON', initials:'FI', color:'#D4A017', model:'haiku', status:'idle',
 role:'Analytics', area:'Analytics & Code Lab',
 desc:'Runs daily cron. Reports revenue, engagement metrics, top/worst performing content and priority actions for ONEM.',
 runs:24, tokens:'10K', uptime:'100%',
 tags:['analytics','revenue','metrics','cron'] },
]

export default function AgentsPage() {
 const [selected, setSelected] = useState<typeof AGENTS[0] | null>(null)
 const popupRef = useRef<HTMLDivElement>(null)
 const [popupPos, setPopupPos] = useState({x: typeof window !== 'undefined' ? window.innerWidth/2 - 170 : 400, y: typeof window !== 'undefined' ? window.innerHeight/2 - 200 : 200})
 const dragging = useRef(false)
 const dragOffset = useRef({x:0, y:0})

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

 return (
 <div style={{
 display:'flex', flexDirection:'column',
 height:'100vh', overflow:'hidden',
 background:'var(--color-bg)'
 }}>

 {/* TOPBAR */}
 <header className="topbar">
 <div style={{fontSize:'13px',fontWeight:600,color:'var(--color-text)'}}>
 Agents
 </div>
 <div style={{
 display:'flex', alignItems:'center',
 position:'absolute', left:'50%',
 transform:'translateX(-50%)', gap:0
 }}>
 {[
 {val:'2/8', lbl:'online'},
 {val:'1', lbl:'projects'},
 {val:'2', lbl:'alerts', danger:true},
 ].map((s,i) => (
 <div key={i} style={{
 display:'flex', alignItems:'center', gap:'5px',
 padding:'0 12px',
 borderRight: i<2 ? '1px solid var(--color-border)' : 'none'
 }}>
 <span style={{
 fontSize:'12px', fontWeight:700,
 color: s.danger ? '#E03E3E' : 'var(--color-text)'
 }}>{s.val}</span>
 <span style={{
 fontSize:'8px', color:'var(--color-text-3)',
 textTransform:'uppercase', letterSpacing:'0.08em'
 }}>{s.lbl}</span>
 </div>
 ))}
 </div>
 </header>

 {/* CONTENT */}
 <main style={{
 flex:1, display:'flex', gap:'12px',
 padding:'12px', overflow:'hidden'
 }}>

 {/* LEFT — AGENT LIST */}
 <div style={{width:'260px', flexShrink:0, display:'flex', flexDirection:'column'}}>
 <div style={{
 fontSize:'9px', fontWeight:600, color:'var(--color-text-3)',
 letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'8px'
 }}>Agent Matrix</div>
 <div style={{
 background:'var(--color-surface)',
 borderRadius:'var(--radius-card)',
 border:'1px solid var(--color-border)',
 boxShadow:'var(--shadow-card)',
 flex:1, display:'flex', flexDirection:'column', overflow:'hidden'
 }}>
 <div style={{
 padding:'10px 14px',
 borderBottom:'1px solid var(--color-border)',
 display:'flex', alignItems:'center', justifyContent:'space-between'
 }}>
 <span style={{fontSize:'9px',fontWeight:600,color:'var(--color-text-3)',
 letterSpacing:'0.1em',textTransform:'uppercase'}}>All Agents</span>
 <span style={{fontSize:'9px',background:'var(--color-text)',
 color:'var(--color-bg)',borderRadius:'99px',
 padding:'2px 7px',fontWeight:500}}>
 2 online
 </span>
 </div>
 <div style={{flex:1, overflowY:'auto'}}>
 {AGENTS.map((a,i) => (
 <div key={i} onClick={() => setSelected(a)} style={{
 display:'flex', alignItems:'center', gap:'10px',
 padding:'9px 14px',
 borderBottom:'1px solid var(--color-border)',
 cursor:'pointer', transition:'background 120ms',
 }
 }
 onMouseEnter={e=>(e.currentTarget.style.background='var(--color-surface-2)')}
 onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
 >
 <div style={{
 width:'30px', height:'30px', borderRadius:'8px',
 overflow:'hidden', flexShrink:0,
 border:`1px solid ${a.color}60`
 }}>
 <img
 src={`/avatars/${a.id.toLowerCase()}.png`}
 alt={a.id}
 style={{width:'100%',height:'100%',objectFit:'cover'}}
 onError={(e)=>{e.currentTarget.style.display='none'}}
 />
 </div>
 <div style={{flex:1, minWidth:0}}>
 <div style={{fontSize:'11px',fontWeight:600,
 color:'var(--color-text)'}}>{a.id}</div>
 <div style={{fontSize:'9px',color:'var(--color-text-2)'}}>{a.role}</div>
 </div>
 <div style={{display:'flex',flexDirection:'column',
 alignItems:'flex-end',gap:'3px'}}>
 <span style={{fontSize:'8px',color:'var(--color-text-3)',
 background:'var(--color-surface-2)',
 borderRadius:'4px',padding:'1px 5px'}}>{a.model}</span>
 <div style={{width:'6px',height:'6px',borderRadius:'50%',
 background:a.status==='active'?'var(--color-text)':'var(--color-text-3)'}}/>
 </div>
 <span style={{fontSize:'9px',color:'var(--color-text-3)'}}>›</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* RIGHT — STUDIO WIDGET */}
 <div style={{flex:1, display:'flex', flexDirection:'column', gap:'12px', minWidth:0}}>
 <div style={{
 fontSize:'9px', fontWeight:600, color:'var(--color-text-3)',
 letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'0px'
 }}>Live Studio</div>
 <StudioWidget />
 </div>
 </main>

 {/* FOOTER */}
 <footer style={{
 height:'var(--footer-height)',
 background:'var(--color-surface)',
 borderTop:'1px solid var(--color-border)',
 display:'flex', alignItems:'center',
 justifyContent:'space-between', padding:'0 24px'
 }}>
 <span style={{fontSize:'10px',color:'var(--color-text-3)'}}>
 ONEM STUDIO AI © 2026 · dashboard-v2.4
 </span>
 <div style={{display:'flex',gap:'16px'}}>
 <a href="https://github.com/proxy42bot/onem-studio-ai"
 style={{fontSize:'10px',color:'var(--color-text-3)',textDecoration:'none'}}>
 GitHub
 </a>
 <span style={{fontSize:'10px',color:'var(--color-text-3)'}}>● Operational</span>
 </div>
 </footer>

 {/* AGENT POPUP */}
 {selected && (
 <div
 onClick={() => setSelected(null)}
 style={{
 position:'fixed', inset:0,
 background:'rgba(0,0,0,0.3)',
 zIndex:500
 }}
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
 {/* TOP — image left, info right */}
 <div style={{
 padding:'16px', display:'flex',
 alignItems:'center', gap:'14px',
 borderBottom:'1px solid var(--color-border)',
 position:'relative'
 }}>
 <div style={{
 width:'80px', height:'80px',
 borderRadius:'14px', overflow:'hidden',
 flexShrink:0, border:'2px solid var(--color-border)'
 }}>
 <img
 src={`/avatars/${selected.id.toLowerCase()}.png`}
 alt={selected.id}
 style={{width:'100%',height:'100%',objectFit:'cover'}}
 />
 </div>
 <div style={{flex:1,minWidth:0}}>
 <div style={{fontSize:'18px',fontWeight:700,color:'var(--color-text)'}}>
 {selected.id}
 </div>
 <div style={{
 fontSize:'10px',color:'var(--color-text-2)',
 textTransform:'uppercase',letterSpacing:'.08em',marginTop:'2px'
 }}>
 {selected.role} · {selected.model}
 </div>
 <div style={{display:'flex',alignItems:'center',gap:'5px',marginTop:'6px'}}>
 <div style={{
 width:'7px',height:'7px',borderRadius:'50%',
 background:selected.status==='active'?'var(--color-text)':'var(--color-text-3)'
 }}/>
 <span style={{fontSize:'10px',color:'var(--color-text-2)'}}>
 {selected.status} · {selected.area}
 </span>
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

 {/* BODY */}
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
 <div style={{fontSize:'8px',color:'var(--color-text-3)',
 textTransform:'uppercase',letterSpacing:'.06em',marginTop:'2px'}}>{s.lbl}</div>
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
 Chat with {selected.id} →
 </button>
 </div>
 </div>
 </div>
 )}
 </div>
 )
}
