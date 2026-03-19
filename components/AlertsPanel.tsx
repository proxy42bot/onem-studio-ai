'use client'

type AlertLevel = 'warn' | 'critical' | 'info'

interface Alert {
  id: string
  level: AlertLevel
  title: string
  message: string
}

const alerts: Alert[] = [
  {
    id: '1',
    level: 'critical',
    title: 'VIRYON: No content handoff',
    message: 'RENDERYON has not delivered assets. Pipeline stalled at publish stage.',
  },
  {
    id: '2',
    level: 'warn',
    title: 'Next.js security flag',
    message: 'Vercel build reports outdated Next.js version. Upgrade recommended.',
  },
  {
    id: '3',
    level: 'info',
    title: 'FINYON: Revenue channels undefined',
    message: 'No revenue channels configured. FINYON idle until resolved.',
  },
]

const accentColor: Record<AlertLevel, string> = {
  warn:     '#F5C518',
  critical: '#E03E3E',
  info:     '#ABABAB',
}

const levelLabel: Record<AlertLevel, string> = {
  warn:     'WARN',
  critical: 'CRITICAL',
  info:     'INFO',
}

export default function AlertsPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {alerts.map(alert => (
        <div
          key={alert.id}
          style={{
            borderRadius: 'var(--radius-alert)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {/* Left accent bar */}
          <div style={{
            width: 3,
            flexShrink: 0,
            background: accentColor[alert.level],
            ...(alert.level === 'critical' ? {
              animation: 'critical-pulse 2s ease-in-out infinite',
            } : {}),
          }} />

          {/* Content */}
          <div style={{ padding: '12px 16px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: accentColor[alert.level],
                fontFamily: 'var(--font-primary)',
              }}>
                {levelLabel[alert.level]}
              </span>
              <span style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--color-text)',
                fontFamily: 'var(--font-primary)',
              }}>
                {alert.title}
              </span>
            </div>
            <p style={{
              fontSize: 12,
              color: 'var(--color-text-2)',
              fontFamily: 'var(--font-primary)',
              lineHeight: 1.5,
              margin: 0,
            }}>
              {alert.message}
            </p>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes critical-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
