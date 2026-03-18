'use client'

const alerts = [
  { level: 'INFO',  agent: 'PROXY',   message: 'Liquid grid dashboard building now' },
  { level: 'WARN',  agent: 'FINYON',  message: 'No revenue channels configured' },
  { level: 'WARN',  agent: 'VISUYON', message: 'No asset storage configured' },
  { level: 'INFO',  agent: 'VISUYON', message: 'Replicate API key needed to activate image generation' },
]

const cfg: Record<string, { text: string; bg: string; border: string }> = {
  WARN:  { text: 'yellow-text', bg: 'bg-yellow-900/10', border: 'border-l-2 border-yellow-500' },
  INFO:  { text: 'blue-text',   bg: 'bg-blue-900/10',   border: 'border-l-2 border-blue-500'   },
  BLOCK: { text: 'red-text',    bg: 'bg-red-900/10',    border: 'border-l-2 border-red-500'    },
  OK:    { text: 'neon-text',   bg: 'bg-green-900/10',  border: 'border-l-2 border-green-500'  },
}

export default function AlertsWidget() {
  return (
    <div className="flex flex-col gap-2">
      {alerts.map((a, i) => {
        const s = cfg[a.level]
        return (
          <div key={i} className={`${s.bg} ${s.border} px-3 py-2`}>
            <div className="flex gap-2 mb-0.5">
              <span className={`font-pixel text-xs ${s.text}`}>{a.level}</span>
              <span className="font-mono text-xs text-cyber-muted">{a.agent}</span>
            </div>
            <div className="font-mono text-xs text-cyber-text">{a.message}</div>
          </div>
        )
      })}
    </div>
  )
}
