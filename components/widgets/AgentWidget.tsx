'use client'

const agents = [
  { id: 'proxy',    name: 'PROXY',    role: 'Orchestrator',       status: 'active', task: 'System architecture',        border: 'pixel-border-neon',   text: 'neon-text',    dot: 'bg-cyber-neon',   avatar: '/avatars/proxy.jpg'    },
  { id: 'narryon',  name: 'NARRYON',  role: 'Storytelling',       status: 'idle',   task: 'Awaiting brief',             border: 'pixel-border-pink',   text: 'pink-text',    dot: 'bg-cyber-muted',  avatar: '/avatars/narryon.jpg'  },
  { id: 'visuyon',  name: 'VISUYON',  role: 'Production',         status: 'idle',   task: 'Awaiting narrative',         border: 'pixel-border-blue',   text: 'blue-text',    dot: 'bg-cyber-muted',  avatar: '/avatars/visuyon.jpg'  },
  { id: 'viryon',   name: 'VIRYON',   role: 'Growth',             status: 'idle',   task: 'Awaiting content',           border: 'pixel-border-yellow', text: 'yellow-text',  dot: 'bg-cyber-muted',  avatar: '/avatars/viryon.jpg'   },
  { id: 'codexyon', name: 'CODEXYON', role: 'Pipeline Architect',  status: 'active', task: 'Dashboard pipeline build',   border: 'pixel-border-neon',   text: 'neon-text',    dot: 'bg-cyber-neon',   avatar: '/avatars/codexyon.jpg' },
  { id: 'finyon',   name: 'FINYON',   role: 'Financial Intel',    status: 'idle',   task: 'Awaiting revenue data',      border: 'pixel-border-orange', text: 'orange-text',  dot: 'bg-cyber-muted',  avatar: '/avatars/finyon.jpg'   },
]

export default function AgentWidget() {
  return (
    <div className="flex flex-col gap-2">
      {agents.map((a) => (
        <div key={a.id} className={`${a.border} bg-cyber-bg flex items-center gap-3 p-2`}>
          <img src={a.avatar} alt={a.name} className="w-9 h-9 object-cover object-top shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className={`font-pixel text-xs ${a.text}`}>{a.name}</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
                <span className="font-mono text-xs text-cyber-muted uppercase">{a.status}</span>
              </div>
            </div>
            <div className="font-mono text-xs text-cyber-muted truncate">{a.task}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
