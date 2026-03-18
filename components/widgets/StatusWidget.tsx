'use client'
import { useEffect, useState } from 'react'

export default function StatusWidget() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col gap-3 h-full justify-center">
      <div>
        <div className="font-mono text-xs text-cyber-muted mb-1">FOUNDER</div>
        <div className="font-pixel text-sm yellow-text">ONEM</div>
      </div>
      <div>
        <div className="font-mono text-xs text-cyber-muted mb-1">ORCHESTRATOR</div>
        <div className="font-pixel text-sm neon-text">PROXY</div>
      </div>
      <div>
        <div className="font-mono text-xs text-cyber-muted mb-1">SYSTEM</div>
        <div className="neon-text font-mono text-sm">● OPERATIONAL</div>
      </div>
      <div>
        <div className="font-mono text-xs text-cyber-muted mb-1">LOCAL TIME</div>
        <div className="font-pixel text-xs yellow-text">{time}</div>
      </div>
      <div>
        <div className="font-mono text-xs text-cyber-muted mb-1">VERSION</div>
        <div className="font-mono text-xs text-cyber-muted">v0.1.0</div>
      </div>
    </div>
  )
}
