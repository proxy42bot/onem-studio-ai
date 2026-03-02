'use client'

interface Alert {
  id: string
  level: 'WARN' | 'INFO' | 'BLOCK' | 'OK'
  message: string
  agent: string
}

const alerts: Alert[] = [
  { id: 'al1', level: 'INFO',  agent: 'PROXY',    message: 'Dashboard deployment in progress — ETA: minutes' },
  { id: 'al2', level: 'WARN',  agent: 'FINYON',   message: 'No revenue channels configured. Define sales channels to activate FINYON.' },
  { id: 'al3', level: 'WARN',  agent: 'VISUYON',  message: 'No asset storage configured. Define storage layer before production starts.' },
  { id: 'al4', level: 'INFO',  agent: 'CODEXYON', message: 'Vercel deploy pending. GitHub push required.' },
]

const levelColor: Record<string, string> = {
  WARN:  'yellow-text border-l-2 border-yellow-500',
  INFO:  'blue-text border-l-2 border-blue-500',
  BLOCK: 'red-text border-l-2 border-red-500',
  OK:    'neon-text border-l-2 border-green-500',
}

const levelBg: Record<string, string> = {
  WARN:  'bg-yellow-900/10',
  INFO:  'bg-blue-900/10',
  BLOCK: 'bg-red-900/10',
  OK:    'bg-green-900/10',
}

export default function AlertsPanel() {
  return (
    <section>
      <h2 className="font-pixel text-xs neon-text mb-4 tracking-widest">◆ ALERTS</h2>
      <div className="flex flex-col gap-2">
        {alerts.map((a) => (
          <div key={a.id} className={`${levelBg[a.level]} ${levelColor[a.level]} px-4 py-3 font-mono text-sm`}>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs uppercase font-pixel">{a.level}</span>
              <span className="text-cyber-muted text-xs">{a.agent}</span>
            </div>
            <div className="text-cyber-text">{a.message}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
