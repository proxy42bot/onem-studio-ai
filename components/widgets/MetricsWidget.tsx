'use client'

const metrics = [
  { label: 'ACTIVE PROJECTS',  value: '1',        sub: '+3 in queue',        color: 'neon-text'    },
  { label: 'AGENTS ONLINE',    value: '2 / 6',    sub: 'Proxy + Codexyon',   color: 'neon-text'    },
  { label: 'REVENUE (MTD)',    value: '$0',        sub: 'Channels pending',   color: 'yellow-text'  },
  { label: 'CONTENT PIECES',  value: '0',         sub: 'First drop pending', color: 'blue-text'    },
  { label: 'PIPELINE',        value: 'LIVE',      sub: 'Dashboard deployed', color: 'pink-text'    },
  { label: 'ALERTS',          value: '1',         sub: 'Setup in progress',  color: 'yellow-text'  },
]

export default function MetricsWidget() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 h-full content-start">
      {metrics.map((m) => (
        <div key={m.label} className="pixel-border bg-cyber-bg p-3 flex flex-col gap-1">
          <div className="font-mono text-xs text-cyber-muted uppercase tracking-widest leading-tight">{m.label}</div>
          <div className={`font-pixel text-lg leading-none ${m.color}`}>{m.value}</div>
          <div className="font-mono text-xs text-cyber-muted">{m.sub}</div>
        </div>
      ))}
    </div>
  )
}
