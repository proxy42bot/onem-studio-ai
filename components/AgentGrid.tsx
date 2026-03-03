'use client'

interface Agent {
  id: string
  name: string
  role: string
  status: 'active' | 'idle' | 'blocked' | 'offline'
  currentTask: string
  borderClass: string
  textClass: string
  icon: string
  avatar: string
}

const agents: Agent[] = [
  {
    id: 'proxy',
    name: 'PROXY',
    role: 'Chief of Staff / System Orchestrator',
    status: 'active',
    currentTask: 'System architecture + dashboard deployment',
    borderClass: 'pixel-border-neon',
    textClass: 'neon-text',
    icon: '⬡',
    avatar: '/avatars/proxy.jpg',
  },
  {
    id: 'narryon',
    name: 'NARRYON',
    role: 'Storytelling Engine',
    status: 'idle',
    currentTask: 'Awaiting brief',
    borderClass: 'pixel-border-pink',
    textClass: 'pink-text',
    icon: '✦',
    avatar: '/avatars/narryon.jpg',
  },
  {
    id: 'visuyon',
    name: 'VISUYON',
    role: 'Production Engine',
    status: 'idle',
    currentTask: 'Awaiting narrative input',
    borderClass: 'pixel-border-blue',
    textClass: 'blue-text',
    icon: '◈',
    avatar: '/avatars/visuyon.jpg',
  },
  {
    id: 'viryon',
    name: 'VIRYON',
    role: 'Growth Engine',
    status: 'idle',
    currentTask: 'Awaiting content',
    borderClass: 'pixel-border-yellow',
    textClass: 'yellow-text',
    icon: '▲',
    avatar: '/avatars/viryon.jpg',
  },
  {
    id: 'codexyon',
    name: 'CODEXYON',
    role: 'Pipeline Architect',
    status: 'active',
    currentTask: 'Dashboard pipeline build',
    borderClass: 'pixel-border-neon',
    textClass: 'neon-text',
    icon: '⟨/⟩',
    avatar: '/avatars/codexyon.jpg',
  },
  {
    id: 'finyon',
    name: 'FINYON',
    role: 'Financial Intelligence',
    status: 'idle',
    currentTask: 'Awaiting revenue data',
    borderClass: 'pixel-border-orange',
    textClass: 'orange-text',
    icon: '◎',
    avatar: '/avatars/finyon.jpg',
  },
]

const statusDot: Record<string, string> = {
  active:  'bg-cyber-neon shadow-neon',
  idle:    'bg-cyber-muted',
  blocked: 'bg-cyber-red shadow-red',
  offline: 'bg-cyber-muted opacity-30',
}

const statusLabel: Record<string, string> = {
  active:  'neon-text',
  idle:    'text-cyber-muted',
  blocked: 'red-text',
  offline: 'text-cyber-muted opacity-40',
}

export default function AgentGrid() {
  return (
    <section>
      <h2 className="font-pixel text-xs neon-text mb-4 tracking-widest">◆ AGENT MATRIX</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`bg-cyber-panel ${agent.borderClass} p-4 flex flex-col gap-3`}
          >
            {/* Header row: avatar + name + status */}
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className={`shrink-0 w-12 h-12 rounded-sm overflow-hidden border ${agent.borderClass} shadow-sm`}
                   style={{ boxShadow: 'none' }}>
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Name + role */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-pixel text-xs ${agent.textClass}`}>{agent.name}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className={`w-2 h-2 rounded-full ${statusDot[agent.status]}`} />
                    <span className={`font-mono text-xs uppercase ${statusLabel[agent.status]}`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
                <div className="text-cyber-muted font-mono text-xs leading-tight mt-0.5 truncate">
                  {agent.role}
                </div>
              </div>
            </div>

            {/* Current task */}
            <div className="border-t border-cyber-border pt-2">
              <span className="text-cyber-muted font-mono text-xs uppercase tracking-wider">TASK › </span>
              <span className="font-mono text-sm text-cyber-text">{agent.currentTask}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
