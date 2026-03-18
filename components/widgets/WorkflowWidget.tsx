'use client'

const steps = [
  { agent: 'ONEM',     role: 'IDEA / DIRECTION',   color: 'yellow-text' },
  { agent: 'PROXY',    role: 'VALIDATE + ROUTE',   color: 'neon-text'   },
  { agent: 'NARRYON',  role: 'NARRATIVE',          color: 'pink-text'   },
  { agent: 'VISUYON',  role: 'PRODUCTION',         color: 'blue-text'   },
  { agent: 'VIRYON',   role: 'OPTIMIZE + REACH',   color: 'yellow-text' },
  { agent: 'CODEXYON', role: 'PUBLISH + AUTOMATE', color: 'neon-text'   },
  { agent: 'FINYON',   role: 'ANALYZE + REPORT',   color: 'orange-text' },
  { agent: 'PROXY',    role: 'ADJUST STRATEGY',    color: 'neon-text'   },
]

export default function WorkflowWidget() {
  return (
    <div className="flex flex-wrap gap-x-1 gap-y-2 items-center">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="flex flex-col items-center">
            <span className={`font-pixel text-xs ${s.color}`}>{s.agent}</span>
            <span className="font-mono text-xs text-cyber-muted">{s.role}</span>
          </div>
          {i < steps.length - 1 && <span className="text-cyber-muted px-1">→</span>}
        </div>
      ))}
    </div>
  )
}
