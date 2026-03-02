'use client'
import { useEffect, useState } from 'react'

export default function StatusBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleString('en-US', {
      hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
      year: 'numeric', month: '2-digit', day: '2-digit'
    }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-cyber-panel border-b border-cyber-border text-xs font-pixel">
      <div className="flex items-center gap-4">
        <span className="neon-text animate-pulse-neon">◆ ONEM STUDIO AI</span>
        <span className="text-cyber-muted">SYS:ONLINE</span>
        <span className="text-cyber-muted">PROXY:ACTIVE</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-cyber-muted">v0.1.0</span>
        <span className="yellow-text">{time}</span>
      </div>
    </div>
  )
}
