'use client'
import { useEffect, useRef, useState } from 'react'

const TILE = 12
const COLS = 48
const ROWS = 20
const W = COLS * TILE
const H = ROWS * TILE

const AREAS = {
 proxy: { label:"PROXY's Office", color:'#7f77dd', x:0, y:0, w:10, h:8 },
 meeting: { label:'Meeting Room', color:'#ffd93d', x:10, y:0, w:12, h:8 },
 viral: { label:'Viral & Reach Hub', color:'#1d9e75', x:22, y:0, w:13, h:8 },
 creative: { label:'Creative Studio', color:'#d4537e', x:35, y:0, w:13, h:8 },
 analytics:{ label:'Analytics & Code Lab', color:'#ba7517', x:0, y:8, w:24, h:12 },
 lounge: { label:'Lounge', color:'#2d5a27', x:24, y:8, w:24, h:12 },
}

const AGENTS = [
 { id:'PROXY', initials:'PX', color:'#7f77dd', x:4, y:4, state:'working', dir:1 },
 { id:'TRENDYON', initials:'TR', color:'#1d9e75', x:25, y:3, state:'idle', dir:1 },
 { id:'VIRYON', initials:'VR', color:'#639922', x:30, y:5, state:'idle', dir:-1 },
 { id:'NARRYON', initials:'NA', color:'#d85a30', x:37, y:3, state:'idle', dir:1 },
 { id:'VISUYON', initials:'VI', color:'#d4537e', x:42, y:5, state:'idle', dir:-1 },
 { id:'RENDERYON', initials:'RX', color:'#378add', x:40, y:3, state:'idle', dir:1 },
 { id:'CODEXYON', initials:'CX', color:'#ba7517', x:5, y:13, state:'working', dir:1 },
 { id:'FINYON', initials:'FI', color:'#888780', x:14, y:13, state:'sleeping', dir:-1 },
 { id:'TRENDYON2', initials:'TR', color:'#1d9e75', x:28, y:13, state:'sleeping', dir:1 },
 { id:'VIRYON2', initials:'VR', color:'#639922', x:35, y:15, state:'sleeping', dir:-1 },
]

const STATE_COLORS: Record<string,string> = {
 working:'#0A0A0A', idle:'#767676',
 thinking:'#7f77dd', sleeping:'#ABABAB', error:'#E03E3E'
}

export default function StudioWidget() {
 const canvasRef = useRef<HTMLCanvasElement>(null)
 const [agentStates] = useState<Record<string,string>>({})

 useEffect(() => {
 const canvas = canvasRef.current
 if (!canvas) return
 const ctx = canvas.getContext('2d')
 if (!ctx) return
 ctx.imageSmoothingEnabled = false
 canvas.width = W
 canvas.height = H

 let animId: number
 let t = 0

 function drawFloors() {
 for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) {
 ctx.fillStyle = (r+c)%2===0 ? '#1e1c3a' : '#19172e'
 ctx.fillRect(c*TILE, r*TILE, TILE, TILE)
 }
 }

 function drawArea(a: typeof AREAS[keyof typeof AREAS]) {
 ctx.fillStyle = a.color + '18'
 ctx.fillRect(a.x*TILE, a.y*TILE, a.w*TILE, a.h*TILE)
 ctx.strokeStyle = a.color + '60'
 ctx.lineWidth = 2
 ctx.strokeRect(a.x*TILE+1, a.y*TILE+1, a.w*TILE-2, a.h*TILE-2)
 ctx.fillStyle = a.color + '90'
 ctx.fillRect(a.x*TILE, a.y*TILE, 4, 4)
 ctx.fillRect((a.x+a.w)*TILE-4, a.y*TILE, 4, 4)
 }

 function drawAreaLabel(a: typeof AREAS[keyof typeof AREAS]) {
 ctx.fillStyle = a.color
 ctx.font = 'bold 7px monospace'
 ctx.textAlign = 'center'
 ctx.fillText(a.label.toUpperCase(), (a.x+a.w/2)*TILE, a.y*TILE+9)
 }

 function drawWalls() {
 ctx.fillStyle = '#0d0c1a'
 ctx.fillRect(0, 8*TILE-2, W, 4)
 ctx.fillRect(10*TILE-2, 0, 4, 8*TILE)
 ctx.fillRect(22*TILE-2, 0, 4, 8*TILE)
 ctx.fillRect(35*TILE-2, 0, 4, 8*TILE)
 ctx.fillRect(24*TILE-2, 8*TILE, 4, 12*TILE)
 }

 function drawDoor(x: number, y: number, horiz: boolean) {
 ctx.fillStyle = '#8b6a52'
 if (horiz) {
 ctx.fillRect(x*TILE-1, y*TILE, TILE*2+2, 4)
 ctx.fillStyle = '#c49a6c'
 ctx.fillRect(x*TILE, y*TILE+1, TILE*2, 2)
 } else {
 ctx.fillRect(x*TILE, y*TILE-1, 4, TILE*2+2)
 ctx.fillStyle = '#c49a6c'
 ctx.fillRect(x*TILE+1, y*TILE, 2, TILE*2)
 }
 }

 function drawDesk(x: number, y: number) {
 ctx.fillStyle = '#6b4f3a'
 ctx.fillRect(x*TILE, y*TILE, TILE*2, TILE)
 ctx.fillStyle = '#8b6a52'
 ctx.fillRect(x*TILE, y*TILE, TILE*2, 3)
 ctx.fillStyle = '#1a3a4a'
 ctx.fillRect(x*TILE+2, y*TILE-6, TILE-2, 6)
 ctx.fillStyle = '#00d4ff'
 ctx.fillRect(x*TILE+3, y*TILE-5, TILE-4, 4)
 }

 function drawBigDesk(x: number, y: number) {
 ctx.fillStyle = '#4a3060'
 ctx.fillRect(x*TILE, y*TILE, TILE*3, TILE)
 ctx.fillStyle = '#6a50a0'
 ctx.fillRect(x*TILE, y*TILE, TILE*3, 3)
 ctx.fillStyle = '#0d0d1a'
 ctx.fillRect(x*TILE+2, y*TILE-8, TILE*2, 8)
 ctx.fillStyle = '#7f77dd'
 ctx.fillRect(x*TILE+3, y*TILE-7, TILE*2-2, 6)
 }

 function drawMeetingTable(x: number, y: number) {
 ctx.fillStyle = '#3a2e20'
 ctx.fillRect(x*TILE, y*TILE, TILE*6, TILE*3)
 ctx.fillStyle = '#5a4535'
 ctx.fillRect(x*TILE, y*TILE, TILE*6, 3)
 ctx.fillStyle = '#4a3828'
 ctx.fillRect(x*TILE+2, y*TILE+2, TILE*6-4, TILE*3-4)
 ctx.fillStyle = '#3a2a1a'
 for (let i=0;i<4;i++) {
 ctx.fillRect((x+1+i)*TILE, (y-1)*TILE, TILE-2, TILE/2)
 ctx.fillRect((x+1+i)*TILE, (y+3)*TILE+4, TILE-2, TILE/2)
 }
 }

 function drawServerRack(x: number, y: number) {
 ctx.fillStyle = '#1a1a3a'
 ctx.fillRect(x*TILE, y*TILE, TILE*2, TILE*4)
 for (let i=0;i<8;i++) {
 ctx.fillStyle = i%3===0 ? '#00ff88' : '#00aaff'
 ctx.fillRect(x*TILE+2, y*TILE+3+i*6, 3, 3)
 }
 }

 function drawRenderStation(x: number, y: number) {
 ctx.fillStyle = '#1a2a3a'
 ctx.fillRect(x*TILE, y*TILE, TILE*2, TILE*3)
 for (let i=0;i<3;i++) {
 ctx.beginPath()
 ctx.arc((x+1)*TILE, (y+0.5+i)*TILE, 4, 0, Math.PI*2)
 ctx.strokeStyle = '#378add'
 ctx.lineWidth = 1
 ctx.stroke()
 }
 }

 function drawMoodboard(x: number, y: number) {
 ctx.fillStyle = '#3a1a2a'
 ctx.fillRect(x*TILE-1, y*TILE-1, TILE*5+2, TILE*2+2)
 ctx.fillStyle = '#2a0d1a'
 ctx.fillRect(x*TILE, y*TILE, TILE*5, TILE*2)
 const pics = ['#d4537e','#d85a30','#7f77dd','#1d9e75','#ba7517']
 pics.forEach((col,i) => {
 ctx.fillStyle = col + '99'
 ctx.fillRect(x*TILE+2+i*TILE, y*TILE+2, TILE-4, TILE*2-4)
 })
 }

 function drawWhiteboard(x: number, y: number, color: string) {
 ctx.fillStyle = '#6b4f3a'
 ctx.fillRect(x*TILE-1, y*TILE-1, TILE*5+2, TILE*2+2)
 ctx.fillStyle = '#f0f0f0'
 ctx.fillRect(x*TILE, y*TILE, TILE*5, TILE*2)
 ctx.strokeStyle = color
 ctx.lineWidth = 1.5
 ctx.beginPath()
 ctx.moveTo(x*TILE+4, y*TILE+6)
 ctx.lineTo(x*TILE+TILE*2, y*TILE+TILE-4)
 ctx.lineTo(x*TILE+TILE*3, y*TILE+5)
 ctx.stroke()
 }

 function drawCouch(x: number, y: number, color: string) {
 ctx.fillStyle = color
 ctx.fillRect(x*TILE, y*TILE, TILE*3, TILE)
 ctx.fillStyle = color + 'cc'
 ctx.fillRect(x*TILE, y*TILE, TILE*3, 4)
 ctx.fillRect(x*TILE, y*TILE, 4, TILE)
 ctx.fillRect((x+3)*TILE-4, y*TILE, 4, TILE)
 }

 function drawTV(x: number, y: number) {
 ctx.fillStyle = '#111'
 ctx.fillRect(x*TILE, y*TILE, TILE*3, TILE*2)
 ctx.fillStyle = '#1d9e75'
 ctx.fillRect(x*TILE+1, y*TILE+1, TILE*3-2, TILE-2)
 ctx.fillStyle = '#2d5a27'
 ctx.fillRect(x*TILE+1, y*TILE+TILE, TILE*3-2, TILE-3)
 }

 function drawPlant(x: number, y: number) {
 ctx.fillStyle = '#5a3a2a'
 ctx.fillRect(x*TILE+3, (y+1)*TILE-3, 6, 3)
 ctx.fillStyle = '#3d7a35'
 ctx.fillRect(x*TILE+3, y*TILE-2, 6, 8)
 ctx.fillStyle = '#2d5a27'
 ctx.fillRect(x*TILE, y*TILE, 4, 8)
 ctx.fillRect(x*TILE+8, y*TILE+2, 4, 6)
 }

 function drawFinanceStation(x: number, y: number) {
 ctx.fillStyle = '#2a1a0a'
 ctx.fillRect(x*TILE, y*TILE, TILE*2, TILE*2)
 ctx.fillStyle = '#ba7517'
 for (let i=0;i<4;i++) {
 const h = (i+1)*3
 ctx.fillRect(x*TILE+2+i*5, y*TILE+TILE*2-h-1, 4, h)
 }
 ctx.fillStyle = '#ffd93d'
 ctx.fillRect(x*TILE+2, y*TILE+2, TILE*2-4, 2)
 }

 function drawTrendScreen(x: number, y: number) {
 ctx.fillStyle = '#0a1a0a'
 ctx.fillRect(x*TILE, y*TILE, TILE*2, TILE*2)
 ctx.fillStyle = '#1d9e75'
 ctx.font = 'bold 6px monospace'
 ctx.textAlign = 'left'
 ctx.fillText('▲IG', x*TILE+2, y*TILE+7)
 ctx.fillStyle = '#639922'
 ctx.fillText('▲YT', x*TILE+2, y*TILE+14)
 ctx.fillStyle = '#3d7a35'
 ctx.fillText('▲ X', x*TILE+2, y*TILE+21)
 }

 function drawAgent(a: typeof AGENTS[0]) {
 const state = agentStates[a.id] || a.state
 const bob = Math.sin(t/20+a.x)*(state==='working'?1.5:0.5)
 const px = Math.round(a.x*TILE)
 const py = Math.round(a.y*TILE)

 ctx.fillStyle = 'rgba(0,0,0,0.25)'
 ctx.fillRect(px+1, py+TILE-3, TILE-2, 3)
 ctx.fillStyle = a.color
 ctx.fillRect(px+3, py+5+bob, TILE-6, TILE-7)
 ctx.fillRect(px+4, py+bob, TILE-8, 7)
 ctx.fillStyle = '#fff'
 ctx.fillRect(px+5, py+2+bob, 2, 2)
 ctx.fillStyle = '#000'
 ctx.fillRect(px+6, py+2+bob, 1, 1)

 if (state==='working' && Math.floor(t/30)%2===0) {
 ctx.fillStyle = '#ffd93d'
 ctx.fillRect(px+TILE-3, py-2, 3, 3)
 } else if (state==='sleeping') {
 ctx.fillStyle = 'rgba(200,210,255,0.9)'
 ctx.font = 'bold 7px monospace'
 ctx.textAlign = 'center'
 ctx.fillText('z', px+TILE-1, py-1+Math.sin(t/20)*2)
 } else if (state==='thinking') {
 ctx.fillStyle = 'rgba(255,255,255,0.85)'
 ctx.beginPath()
 ctx.arc(px+TILE-2, py-3, 4, 0, Math.PI*2)
 ctx.fill()
 ctx.fillStyle = '#555'
 ctx.font = 'bold 5px monospace'
 ctx.textAlign = 'center'
 ctx.fillText('?', px+TILE-2, py-1)
 }

 ctx.fillStyle = 'rgba(0,0,0,0.75)'
 ctx.fillRect(px+1, py+TILE+1, TILE-2, 8)
 ctx.fillStyle = '#fff'
 ctx.font = 'bold 5px monospace'
 ctx.textAlign = 'center'
 ctx.fillText(a.initials, px+TILE/2, py+TILE+7)
 }

 function frame() {
 t++
 ctx.clearRect(0,0,W,H)
 drawFloors()
 Object.values(AREAS).forEach(drawArea)
 drawWalls()

 // Doors
 drawDoor(4,8,true); drawDoor(15,8,true)
 drawDoor(26,8,true); drawDoor(38,8,true)
 drawDoor(10,3,false); drawDoor(22,3,false); drawDoor(35,3,false)
 drawDoor(24,14,false)

 // Labels
 Object.values(AREAS).forEach(drawAreaLabel)

 // PROXY Office
 drawBigDesk(3,4); drawPlant(7,5); drawPlant(0,1)

 // Meeting Room
 drawMeetingTable(12,3); drawWhiteboard(11,1,'#ffd93d')

 // Viral & Reach Hub
 drawTrendScreen(23,1); drawDesk(26,4); drawDesk(29,4)
 drawWhiteboard(23,5,'#1d9e75'); drawPlant(33,6)

 // Creative Studio
 drawMoodboard(36,1); drawDesk(36,4); drawDesk(39,4)
 drawRenderStation(43,3); drawPlant(46,1); drawPlant(46,6)

 // Analytics & Code Lab
 drawServerRack(0,9); drawServerRack(0,14)
 drawDesk(3,11); drawDesk(6,11); drawDesk(9,11)
 drawDesk(3,15); drawDesk(6,15)
 drawFinanceStation(14,10); drawFinanceStation(14,14)
 drawDesk(17,11); drawDesk(20,11)
 drawPlant(22,18)

 // Lounge
 drawTV(25,9)
 drawCouch(25,12,'#3d2d5a')
 drawCouch(31,12,'#2d3d5a')
 drawCouch(37,12,'#2d5a3d')
 drawCouch(43,12,'#3d2d2d')
 drawPlant(24,18); drawPlant(46,9); drawPlant(46,18)

 AGENTS.forEach(a => drawAgent(a))
 animId = requestAnimationFrame(frame)
 }

 frame()
 return () => cancelAnimationFrame(animId)
 }, [agentStates])

 return (
 <div className="widget" style={{overflow:'hidden'}}>
 <div style={{
 padding:'10px 14px',
 borderBottom:'1px solid var(--color-border)',
 display:'flex', alignItems:'center', justifyContent:'space-between'
 }}>
 <div className="widget-label">ONEM Studio — Live World</div>
 <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
 <span style={{
 fontSize:'9px', background:'var(--color-text)',
 color:'var(--color-bg)', borderRadius:'99px',
 padding:'2px 8px', fontWeight:500
 }}>● live</span>
 <a href="https://minivrs.com" target="_blank" rel="noreferrer" style={{
 fontSize:'9px', background:'var(--color-surface-2)',
 borderRadius:'99px', padding:'2px 8px',
 color:'var(--color-text-2)',
 border:'1px solid var(--color-border)',
 textDecoration:'none'
 }}>miniverse ↗</a>
 </div>
 </div>
 <div style={{background:'#1a1a2e', overflow:'hidden'}}>
 <canvas
 ref={canvasRef}
 style={{display:'block', imageRendering:'pixelated', width:'100%'}}
 />
 </div>
 <div style={{
 padding:'8px 12px',
 borderTop:'1px solid var(--color-border)',
 display:'flex', gap:'6px', overflowX:'auto'
 }}>
 {[
 {id:'PROXY',color:'#7f77dd',state:'working'},
 {id:'TRENDYON',color:'#1d9e75',state:'idle'},
 {id:'VIRYON',color:'#639922',state:'idle'},
 {id:'NARRYON',color:'#d85a30',state:'idle'},
 {id:'VISUYON',color:'#d4537e',state:'idle'},
 {id:'RENDERYON',color:'#378add',state:'idle'},
 {id:'CODEXYON',color:'#ba7517',state:'working'},
 {id:'FINYON',color:'#888780',state:'sleeping'},
 ].map(a => (
 <div key={a.id} style={{
 display:'flex', alignItems:'center', gap:'4px',
 background:'var(--color-surface-2)',
 borderRadius:'99px', padding:'3px 8px 3px 5px',
 border:'1px solid var(--color-border)', flexShrink:0
 }}>
 <div style={{
 width:5, height:5, borderRadius:'50%',
 background: STATE_COLORS[a.state]||'#ABABAB'
 }}/>
 <span style={{fontSize:'9px',fontWeight:600,color:'var(--color-text)'}}>
 {a.id}
 </span>
 <span style={{fontSize:'8px',color:'var(--color-text-2)'}}>
 {a.state}
 </span>
 </div>
 ))}
 </div>
 </div>
 )
}
