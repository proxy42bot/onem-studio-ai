'use client'
import { useState, useRef, useEffect } from 'react'

const AGENTS = [
 { id:'PROXY', initials:'PX', color:'#7f77dd', status:'active' },
 { id:'TRENDYON', initials:'TR', color:'#1d9e75', status:'idle' },
 { id:'VIRYON', initials:'VR', color:'#639922', status:'idle' },
 { id:'NARRYON', initials:'NA', color:'#d85a30', status:'idle' },
 { id:'VISUYON', initials:'VI', color:'#d4537e', status:'idle' },
 { id:'RENDERYON', initials:'RX', color:'#378add', status:'idle' },
 { id:'CODEXYON', initials:'CX', color:'#ba7517', status:'active' },
 { id:'FINYON', initials:'FI', color:'#888780', status:'idle' },
]

const QUICK_CMDS = [
 '[OC] status',
 'run TRENDYON',
 'new brief',
 'GUARD check',
 'pipeline status',
]

type Message = {
 from: 'onem' | 'agent'
 agent?: string
 text: string
 ts: string
}

const RESPONSES: Record<string, string> = {
 '[OC] status': '{ "agents_online": 2, "pipeline": "LIVE", "alerts": 2, "version": "1.4", "cache_status": "hit" }',
 'run TRENDYON': 'Routing to TRENDYON. Haiku tier. Scanning Instagram · YouTube · X now.',
 'new brief': 'Ready. Send the project name, goal and target audience.',
 'GUARD check': '{ "mode": "GUARD", "severity": "INFO", "status": "monitoring", "threats": 0 }',
 'pipeline status': 'TRENDYON ✓ → NARRYON ✓ → VISUYON ● → RENDERYON ○ → VIRYON ○ → CODEXYON ○ → FINYON ○',
}

export default function FloatingChat() {
 const [open, setOpen] = useState(false)
 const [agent, setAgent] = useState(AGENTS[0])
 const [messages, setMessages] = useState<Message[]>([
 { from:'agent', agent:'PROXY', text:'System online. All 8 agents loaded. Awaiting directive from ONEM.', ts:'now' }
 ])
 const [input, setInput] = useState('')
 const [typing, setTyping] = useState(false)
 const [unread, setUnread] = useState(1)
 const messagesRef = useRef<HTMLDivElement>(null)

 useEffect(() => {
 if (messagesRef.current) {
 messagesRef.current.scrollTop = messagesRef.current.scrollHeight
 }
 }, [messages, typing])

 useEffect(() => {
 if (open) setUnread(0)
 }, [open])

 function sendMsg(text?: string) {
 const t = (text || input).trim()
 if (!t) return
 setInput('')
 const now = new Date().toLocaleTimeString('en-US',{
 hour:'2-digit', minute:'2-digit', hour12:false
 })
 setMessages(prev => [...prev, { from:'onem', text:t, ts:now }])
 setTyping(true)
 setTimeout(() => {
 setTyping(false)
 const reply = RESPONSES[t] || `Understood. Processing directive via ${agent.id}.`
 setMessages(prev => [...prev, {
 from:'agent', agent:agent.id, text:reply, ts:now
 }])
 if (!open) setUnread(u => u + 1)
 }, 900)
 }

 return (
 <>
 {/* FAB BUTTON */}
 <div style={{
 position:'fixed', bottom:'24px', right:'24px',
 zIndex:900, display:'flex', flexDirection:'column',
 alignItems:'center', gap:'4px'
 }}>
 <button
 onClick={() => setOpen(o => !o)}
 style={{
 width:'48px', height:'48px',
 background:'var(--color-text)',
 border:'none', borderRadius:'50%',
 cursor:'pointer', position:'relative',
 boxShadow:'0 4px 16px rgba(0,0,0,0.2)',
 display:'flex', alignItems:'center',
 justifyContent:'center', transition:'transform 150ms',
 }}
 onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.08)')}
 onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')}
 >
 <span style={{
 color:'var(--color-bg)',
 fontSize: open ? '18px' : '20px',
 fontWeight:700, lineHeight:1
 }}>
 {open ? '×' : '⬡'}
 </span>
 {unread > 0 && !open && (
 <div style={{
 position:'absolute', top:'-2px', right:'-2px',
 width:'16px', height:'16px',
 background:'#E03E3E', borderRadius:'50%',
 border:'2px solid var(--color-bg)',
 display:'flex', alignItems:'center',
 justifyContent:'center', fontSize:'8px',
 fontWeight:700, color:'#fff'
 }}>{unread}</div>
 )}
 </button>
 <span style={{
 fontSize:'8px', color:'var(--color-text-3)',
 letterSpacing:'0.04em'
 }}>PROXY</span>
 </div>

 {/* CHAT WINDOW */}
 {open && (
 <div style={{
 position:'fixed', bottom:'88px', right:'24px',
 width:'320px', height:'420px',
 background:'var(--color-surface)',
 borderRadius:'16px',
 border:'1px solid var(--color-border)',
 boxShadow:'0 8px 32px rgba(0,0,0,0.16)',
 zIndex:899, display:'flex',
 flexDirection:'column', overflow:'hidden',
 animation:'chatPopUp 200ms cubic-bezier(0.34,1.56,0.64,1)',
 transformOrigin:'bottom right',
 }}>

 {/* HEADER */}
 <div style={{
 padding:'10px 14px',
 background:'var(--color-text)',
 display:'flex', alignItems:'center', gap:'10px',
 flexShrink:0
 }}>
 <div style={{
 width:'28px', height:'28px', borderRadius:'8px',
 background: agent.color + '40',
 border:`1px solid ${agent.color}`,
 display:'flex', alignItems:'center',
 justifyContent:'center', fontSize:'9px',
 fontWeight:700, color:'#fff', flexShrink:0
 }}>{agent.initials}</div>
 <div style={{flex:1}}>
 <div style={{fontSize:'12px',fontWeight:600,color:'var(--color-bg)'}}>
 {agent.id}
 </div>
 <div style={{fontSize:'9px',color:'rgba(255,255,255,0.5)'}}>
 ● {agent.status} · orchestrator
 </div>
 </div>
 <button
 onClick={() => setOpen(false)}
 style={{
 width:'22px', height:'22px',
 background:'rgba(255,255,255,0.1)',
 border:'none', borderRadius:'6px',
 cursor:'pointer', color:'rgba(255,255,255,0.7)',
 fontSize:'12px', display:'flex',
 alignItems:'center', justifyContent:'center'
 }}>×</button>
 </div>

 {/* AGENT SELECTOR */}
 <div style={{
 padding:'6px 10px',
 background:'var(--color-surface-2)',
 display:'flex', gap:'4px',
 overflowX:'auto', flexShrink:0
 }}>
 {AGENTS.map(a => (
 <button
 key={a.id}
 onClick={() => setAgent(a)}
 style={{
 fontSize:'9px', padding:'3px 8px',
 borderRadius:'99px', cursor:'pointer',
 whiteSpace:'nowrap', flexShrink:0,
 transition:'all 120ms',
 background: agent.id===a.id ? 'var(--color-text)' : 'transparent',
 color: agent.id===a.id ? 'var(--color-bg)' : 'var(--color-text-2)',
 border: agent.id===a.id ?
 '1px solid var(--color-text)' :
 '1px solid var(--color-border)',
 fontWeight: agent.id===a.id ? 600 : 400,
 }}
 >{a.id}</button>
 ))}
 </div>

 {/* MESSAGES */}
 <div ref={messagesRef} style={{
 flex:1, padding:'10px 12px',
 display:'flex', flexDirection:'column',
 gap:'8px', overflowY:'auto'
 }}>
 {messages.map((m, i) => (
 <div key={i} style={{
 display:'flex', flexDirection:'column', gap:'2px',
 maxWidth:'88%',
 alignSelf: m.from==='onem' ? 'flex-end' : 'flex-start'
 }}>
 <div style={{
 fontSize:'7px', color:'var(--color-text-3)',
 padding:'0 3px',
 textAlign: m.from==='onem' ? 'right' : 'left'
 }}>
 {m.from==='onem' ? 'ONEM' : m.agent} · {m.ts}
 </div>
 <div style={{
 padding:'7px 10px',
 lineHeight:1.5,
 background: m.from==='onem' ?
 'var(--color-text)' : 'var(--color-surface-2)',
 color: m.from==='onem' ?
 'var(--color-bg)' : 'var(--color-text)',
 borderRadius: m.from==='onem' ?
 '10px 10px 2px 10px' : '10px 10px 10px 2px',
 border: m.from==='agent' ?
 '1px solid var(--color-border)' : 'none',
 fontFamily: m.text.startsWith('{') ?
 'var(--font-mono)' : 'var(--font-primary)',
 fontSize: m.text.startsWith('{') ? '9px' : '10px',
 }}>{m.text}</div>
 </div>
 ))}
 {typing && (
 <div style={{
 display:'flex', gap:'3px', alignItems:'center',
 padding:'8px 10px',
 background:'var(--color-surface-2)',
 borderRadius:'10px 10px 10px 2px',
 border:'1px solid var(--color-border)',
 width:'fit-content'
 }}>
 {[0,1,2].map(i => (
 <div key={i} style={{
 width:'4px', height:'4px',
 background:'var(--color-text-3)',
 borderRadius:'50%',
 animation:`typingBounce 1s ease infinite`,
 animationDelay:`${i*0.15}s`
 }}/>
 ))}
 </div>
 )}
 </div>

 {/* QUICK COMMANDS */}
 <div style={{
 padding:'6px 10px',
 borderTop:'1px solid var(--color-border)',
 display:'flex', flexWrap:'wrap', gap:'4px',
 flexShrink:0
 }}>
 {QUICK_CMDS.map((cmd,i) => (
 <button key={i} onClick={() => sendMsg(cmd)} style={{
 fontSize:'8px',
 background:'var(--color-surface-2)',
 borderRadius:'99px', padding:'2px 7px',
 color:'var(--color-text)',
 border:'1px solid var(--color-border)',
 cursor:'pointer', whiteSpace:'nowrap',
 transition:'background 120ms'
 }}>{cmd}</button>
 ))}
 </div>

 {/* INPUT */}
 <div style={{
 padding:'8px 10px',
 borderTop:'1px solid var(--color-border)',
 display:'flex', gap:'6px', alignItems:'center',
 flexShrink:0
 }}>
 <input
 value={input}
 onChange={e => setInput(e.target.value)}
 onKeyDown={e => e.key==='Enter' && sendMsg()}
 placeholder={`Command ${agent.id}...`}
 style={{
 flex:1,
 background:'var(--color-surface-2)',
 border:'1px solid var(--color-border)',
 borderRadius:'99px', padding:'6px 12px',
 fontSize:'10px', color:'var(--color-text)',
 outline:'none', fontFamily:'var(--font-primary)'
 }}
 />
 <button
 onClick={() => sendMsg()}
 style={{
 width:'28px', height:'28px',
 background:'var(--color-text)',
 border:'none', borderRadius:'50%',
 cursor:'pointer', color:'var(--color-bg)',
 fontSize:'12px', flexShrink:0,
 display:'flex', alignItems:'center',
 justifyContent:'center'
 }}>→</button>
 </div>
 </div>
 )}

 <style>{`
 @keyframes chatPopUp {
 from { transform: scale(0.85) translateY(16px); opacity: 0; }
 to { transform: scale(1) translateY(0); opacity: 1; }
 }
 @keyframes typingBounce {
 0%,100% { transform: translateY(0); }
 50% { transform: translateY(-3px); }
 }
 `}</style>
 </>
 )
}
