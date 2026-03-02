'use client'

interface Project {
  id: string
  name: string
  phase: string
  agent: string
  priority: 'HIGH' | 'MED' | 'LOW'
  status: 'active' | 'pending' | 'blocked' | 'done'
  progress: number
}

const projects: Project[] = [
  {
    id: 'p001',
    name: 'Studio Infrastructure',
    phase: 'Deployment',
    agent: 'PROXY + CODEXYON',
    priority: 'HIGH',
    status: 'active',
    progress: 65,
  },
  {
    id: 'p002',
    name: 'Brand Identity System',
    phase: 'Pending Brief',
    agent: 'NARRYON',
    priority: 'HIGH',
    status: 'pending',
    progress: 0,
  },
  {
    id: 'p003',
    name: 'Social Media Pipeline',
    phase: 'Planning',
    agent: 'VIRYON + CODEXYON',
    priority: 'MED',
    status: 'pending',
    progress: 0,
  },
  {
    id: 'p004',
    name: 'First Content Drop',
    phase: 'Awaiting Assets',
    agent: 'VISUYON',
    priority: 'MED',
    status: 'pending',
    progress: 0,
  },
]

const priorityColor: Record<string, string> = {
  HIGH: 'red-text',
  MED:  'yellow-text',
  LOW:  'text-cyber-muted',
}

const statusBorder: Record<string, string> = {
  active:  'pixel-border-neon',
  pending: 'pixel-border',
  blocked: 'pixel-border-red',
  done:    'pixel-border',
}

const statusLabel: Record<string, string> = {
  active:  'neon-text',
  pending: 'text-cyber-muted',
  blocked: 'red-text',
  done:    'text-cyber-muted',
}

export default function ProjectBoard() {
  return (
    <section>
      <h2 className="font-pixel text-xs neon-text mb-4 tracking-widest">◆ PROJECT REGISTRY</h2>
      <div className="flex flex-col gap-2">
        {projects.map((p) => (
          <div
            key={p.id}
            className={`bg-cyber-panel ${statusBorder[p.status]} p-4 flex flex-col gap-2`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-pixel text-xs text-cyber-text">{p.name}</span>
                <div className="mt-1 text-cyber-muted font-mono text-sm">
                  {p.phase} &nbsp;·&nbsp; {p.agent}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`font-mono text-xs uppercase ${priorityColor[p.priority]}`}>{p.priority}</span>
                <span className={`font-mono text-xs uppercase ${statusLabel[p.status]}`}>{p.status}</span>
              </div>
            </div>
            {p.status === 'active' && (
              <div className="mt-1">
                <div className="flex justify-between font-mono text-xs text-cyber-muted mb-1">
                  <span>PROGRESS</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-cyber-border">
                  <div
                    className="h-full bg-cyber-neon shadow-neon transition-all duration-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
