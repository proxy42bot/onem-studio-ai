'use client'

import { useEffect, useState } from 'react'

const rows = [
  { label: 'Founder',      value: 'ONEM'          },
  { label: 'Orchestrator', value: 'PROXY'          },
  { label: 'System',       value: '● Operational' },
  { label: 'Version',      value: 'v0.1.0'        },
]

export default function StatusWidget() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {rows.map(({ label, value }) => (
        <div key={label} className="mac-inset" style={{ padding: '3px 6px' }}>
          <div className="mac-label" style={{ color: '#808080', fontSize: 10 }}>{label}</div>
          <div style={{ fontSize: 12, fontWeight: 'bold', color: '#000082' }}>{value}</div>
        </div>
      ))}
      <div className="mac-inset" style={{ padding: '3px 6px' }}>
        <div className="mac-label" style={{ color: '#808080', fontSize: 10 }}>Time (CST)</div>
        <div className="mac-mono" style={{ fontSize: 12, color: '#000000' }}>{time || '--:--:--'}</div>
      </div>
    </div>
  )
}
