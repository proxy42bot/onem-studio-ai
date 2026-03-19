'use client'
import { useState } from 'react'

type LogStatus = 'deployed' | 'running' | 'error'

interface LogEntry {
  id: string
  time: string
  agent: string
  mode: string
  action: string
  status: LogStatus
}

const entries: LogEntry[] = [
  { id: '1', time: '12:35:01', agent: 'CODEXYON', mode: 'BUILD',   action: 'tokens.css created',           status: 'deployed' },
  { id: '2', time: '12:34:50', agent: 'PROXY',    mode: 'SYSTEM',  action: 'Dashboard init',                status: 'deployed' },
  { id: '3', time: '12:34:22', agent: 'TRENDYON', mode: 'SCAN',    action: 'Trend scan queued',             status: 'running'  },
  { id: '4', time: '12:33:10', agent: 'FINYON',   mode: 'CRON',    action: 'Revenue check scheduled',       status: 'running'  },
  { id: '5', time: '12:30:00', agent: 'VIRYON',   mode: 'PUBLISH', action: 'Awaiting content handoff',      status: 'error'    },
]

const pillStyle: Record<LogStatus, React.CSSProperties> = {
  deployed: {
    border: '1px solid #0A0A0A',
    color: '#0A0A0A',
  },
  running: {
    border: '1px solid #767676',
    color: '#767676',
  },
  error: {
    border: '1px solid #E03E3E',
    color: '#E03E3E',
  },
}

export default function ActivityLog() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--color-border)',
        display: 'grid',
        gridTemplateColumns: '90px 100px 80px 1fr 90px',
        gap: 12,
      }}>
        {['Time', 'Agent', 'Mode', 'Action', 'Status'].map(col => (
          <span key={col} style={{
            fontSize: 10,
            textTransform: 'uppercase',
            color: 'var(--color-text-2)',
            letterSpacing: '0.12em',
            fontFamily: 'var(--font-primary)',
            fontWeight: 500,
          }}>
            {col}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div>
        {entries.map((entry, i) => (
          <div
            key={entry.id}
            onMouseEnter={() => setHoveredRow(entry.id)}
            onMouseLeave={() => setHoveredRow(null)}
            style={{
              padding: '12px 24px',
              borderTop: i > 0 ? '1px solid var(--color-border)' : 'none',
              display: 'grid',
              gridTemplateColumns: '90px 100px 80px 1fr 90px',
              gap: 12,
              alignItems: 'center',
              background: hoveredRow === entry.id ? 'var(--color-surface-2)' : 'transparent',
              borderRadius: hoveredRow === entry.id ? 8 : 0,
              transition: 'background 0.15s ease',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--color-text-3)',
            }}>
              {entry.time}
            </span>
            <span style={{
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--color-text)',
              fontFamily: 'var(--font-primary)',
            }}>
              {entry.agent}
            </span>
            <span style={{
              fontSize: 11,
              color: 'var(--color-text-2)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
            }}>
              {entry.mode}
            </span>
            <span style={{
              fontSize: 13,
              color: 'var(--color-text)',
              fontFamily: 'var(--font-primary)',
            }}>
              {entry.action}
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 10px',
              borderRadius: 'var(--radius-pill)',
              fontSize: 10,
              fontFamily: 'var(--font-primary)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              ...pillStyle[entry.status],
            }}>
              {entry.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
