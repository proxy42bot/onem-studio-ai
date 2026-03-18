'use client'

const projects = [
  { id: 'p001', name: 'Studio Infrastructure', phase: 'Deployment',    agent: 'PROXY + CODEXYON', priority: 'HIGH', status: 'active',  progress: 70 },
  { id: 'p002', name: 'Brand Identity System',  phase: 'Pending Brief', agent: 'NARRYON',          priority: 'HIGH', status: 'pending', progress: 0  },
  { id: 'p003', name: 'Social Media Pipeline',  phase: 'Planning',      agent: 'VIRYON + CODEXYON',priority: 'MED',  status: 'pending', progress: 0  },
  { id: 'p004', name: 'First Content Drop',     phase: 'Awaiting Assets',agent: 'VISUYON',         priority: 'MED',  status: 'pending', progress: 0  },
]

const priorityColor: Record<string,string> = { HIGH: 'red-text', MED: 'yellow-text', LOW: 'text-cyber-muted' }
const statusColor:   Record<string,string> = { active: 'neon-text', pending: 'text-cyber-muted', blocked: 'red-text', done: 'text-cyber-muted' }
const statusBorder:  Record<string,string> = { active: 'pixel-border-neon', pending: 'pixel-border', blocked: 'pixel-border-red', done: 'pixel-border' }

export default function ProjectWidget() {
  return (
    <div className="flex flex-col gap-2">
      {projects.map((p) => (
        <div key={p.id} className={`${statusBorder[p.status]} bg-cyber-bg p-3`}>
          <div className="flex justify-between items-start gap-2 mb-1">
            <span className="font-pixel text-xs text-cyber-text leading-tight">{p.name}</span>
            <div className="flex gap-2 shrink-0">
              <span className={`font-mono text-xs uppercase ${priorityColor[p.priority]}`}>{p.priority}</span>
              <span className={`font-mono text-xs uppercase ${statusColor[p.status]}`}>{p.status}</span>
            </div>
          </div>
          <div className="font-mono text-xs text-cyber-muted">{p.phase} · {p.agent}</div>
          {p.status === 'active' && (
            <div className="mt-2">
              <div className="w-full h-1 bg-cyber-border">
                <div className="h-full bg-cyber-neon" style={{ width: `${p.progress}%` }} />
              </div>
              <div className="text-right font-mono text-xs text-cyber-muted mt-0.5">{p.progress}%</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
