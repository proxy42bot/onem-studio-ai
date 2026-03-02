'use client'

interface Metric {
  label: string
  value: string
  sub: string
  color: string
  borderClass: string
}

const metrics: Metric[] = [
  { label: 'ACTIVE PROJECTS',  value: '1',       sub: '+3 in queue',       color: 'neon-text',    borderClass: 'pixel-border-neon'   },
  { label: 'AGENTS ONLINE',    value: '2/6',     sub: 'Proxy + Codexyon',  color: 'neon-text',    borderClass: 'pixel-border-neon'   },
  { label: 'REVENUE (MTD)',     value: '$0',      sub: 'Channels pending',  color: 'yellow-text',  borderClass: 'pixel-border-yellow' },
  { label: 'CONTENT PIECES',   value: '0',       sub: 'First drop pending',color: 'blue-text',    borderClass: 'pixel-border-blue'   },
  { label: 'PIPELINE STATUS',  value: 'BUILDING',sub: 'Dashboard live soon',color: 'pink-text',   borderClass: 'pixel-border-pink'   },
  { label: 'ALERTS',           value: '1',       sub: 'Setup in progress', color: 'yellow-text',  borderClass: 'pixel-border-yellow' },
]

export default function MetricsPanel() {
  return (
    <section>
      <h2 className="font-pixel text-xs neon-text mb-4 tracking-widest">◆ SYSTEM METRICS</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className={`bg-cyber-panel ${m.borderClass} p-4`}>
            <div className="font-mono text-xs text-cyber-muted uppercase tracking-widest mb-1">{m.label}</div>
            <div className={`font-pixel text-xl ${m.color} mb-1`}>{m.value}</div>
            <div className="font-mono text-xs text-cyber-muted">{m.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
