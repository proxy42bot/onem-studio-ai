'use client'

interface ActivityItem {
  id: string
  time: string
  agent: string
  agentColor: string
  action: string
  target: string
}

const feed: ActivityItem[] = [
  { id: 'a1', time: '17:22', agent: 'PROXY',    agentColor: 'neon-text',    action: 'INIT',     target: 'System architecture defined' },
  { id: 'a2', time: '17:22', agent: 'CODEXYON', agentColor: 'neon-text',    action: 'DEPLOY',   target: 'GitHub repo created: onem-studio-ai' },
  { id: 'a3', time: '17:22', agent: 'CODEXYON', agentColor: 'neon-text',    action: 'BUILD',    target: 'Dashboard scaffold initiated' },
  { id: 'a4', time: '17:22', agent: 'PROXY',    agentColor: 'neon-text',    action: 'CONFIG',   target: 'Agent souls defined: NARRYON, VISUYON, VIRYON, CODEXYON, FINYON' },
  { id: 'a5', time: '17:11', agent: 'ONEM',     agentColor: 'yellow-text',  action: 'BRIEF',    target: 'AI creative studio concept approved' },
]

export default function ActivityFeed() {
  return (
    <section>
      <h2 className="font-pixel text-xs neon-text mb-4 tracking-widest">◆ ACTIVITY LOG</h2>
      <div className="bg-cyber-panel pixel-border p-4 flex flex-col gap-0">
        {feed.map((item, i) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 py-2 font-mono text-sm ${i !== feed.length - 1 ? 'border-b border-cyber-border' : ''}`}
          >
            <span className="text-cyber-muted shrink-0">{item.time}</span>
            <span className={`shrink-0 w-20 ${item.agentColor}`}>{item.agent}</span>
            <span className="text-cyber-muted shrink-0 w-16 uppercase">{item.action}</span>
            <span className="text-cyber-text">{item.target}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-3 font-mono text-sm text-cyber-muted">
          <span>&gt;</span>
          <span className="cursor" />
        </div>
      </div>
    </section>
  )
}
