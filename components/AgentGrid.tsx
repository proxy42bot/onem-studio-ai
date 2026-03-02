'use client'

interface Agent {
  id: string
  name: string
  role: string
  status: 'active' | 'idle' | 'blocked' | 'offline'
  currentTask: string
  color: string
  borderClass: string
  textClass: string
  icon: string
}

const agents: Agent[] = [
  {
    id: 'proxy',
    name: 'PROXY',
    role: 'Chief of Staff / System Orchestrator',
    status: 'active',
    currentTask: 'System architecture + dashboard deployment',
    color: 'neon',
    borderClass: 'pixel-border-neon',
    textClass: 'neon-text',
    icon: '⬡',
  },
  {
    id: 'narryon',
    name: 'NARRYON',
    role: 'Storytelling Engine',
    status: 'idle',
    currentTask: 'Awaiting brief',
    color: 'pink',
    borderClass: 'pixel-border-pink',
    textClass: 'pink-text',
    icon: '✦',
  },
  {
    id: 'visuyon',
    name: 'VISUYON',
    role: 'Production Engine',
    status: 'idle',
    currentTask: 'Awaiting narrative input',
    color: 'blue',
    borderClass: 'pixel-border-blue',
    textClass: 'blue-text',
    icon: '◈',
  },
  {
    id: 'viryon',
    name: 'VIRYON',
    role: 'Growth Engine',
    status: 'idle',
    currentTask: 'Awaiting content',
    color: 'yellow',
    borderClass: 'pixel-border-yellow',
    textClass: 'yellow-text',
    icon: '▲',
  },
  {
    id: 'codexyon',
    name: 'CODEXYON',
    role: 'Pipeline Architect',
    status: 'active',
    currentTask: 'Dashboard pipeline build',
    color: 'neon',
    borderClass: 'pixel-border-neon',
    textClass: 'neon-text',
    icon: '⟨/⟩',
  },
  {
    id: 'finyon',
    name: 'FINYON',
    role: 'Financial Intelligence',
    status: 'idle',
    currentTask: 'Awaiting revenue data',
    color: 'yellow',
    borderClass: 'pixel-border-yellow',
    textClass: 'yellow-text',
    icon: '◎',
  },
]

const statusColors: Record<string, string> = {
  active:  'neon-text',
  idle:    'text-cyber-muted',
  blocked: 'red-text',
  offline: 'text-cyber-muted opacity-40',
}

const statusDot: Record<string, string> = {
  active:  'bg-cyber-neon shadow-neon',
  idle:    'bg-cyber-muted',
  blocked: 'bg-cyber-red shadow-red',
  offline: 'bg-cyber-muted opacity-30',
}

export default function AgentGrid() {
  return (
    <section>
      <h2 className="font-pixel text-xs neon-text mb-4 tracking-widest">◆ AGENT MATRIX</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`bg-cyber-panel ${agent.borderClass} rounded-none p-4 flex flex-col gap-2`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-lg ${agent.textClass}`}>{agent.icon}</span>
                <span className={`font-pixel text-xs ${agent.textClass}`}>{agent.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${statusDot[agent.status]}`} />
                <span className={`font-mono text-sm uppercase ${statusColors[agent.status]}`}>
                  {agent.status}
                </span>
              </div>
            </div>
            <div className="text-cyber-muted font-mono text-sm leading-tight">{agent.role}</div>
            <div className="border-t border-cyber-border pt-2 mt-1">
              <span className="text-cyber-muted font-mono text-xs uppercase tracking-wider">TASK › </span>
              <span className="font-mono text-sm text-cyber-text">{agent.currentTask}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
