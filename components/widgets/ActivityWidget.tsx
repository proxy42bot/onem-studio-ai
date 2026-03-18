'use client'

const feed = [
  { time: '20:29', agent: 'PROXY',    color: 'neon-text',   action: 'BUILD',   target: 'Liquid grid dashboard initiated' },
  { time: '17:22', agent: 'CODEXYON', color: 'neon-text',   action: 'DEPLOY',  target: 'Vercel deployment live' },
  { time: '17:22', agent: 'CODEXYON', color: 'neon-text',   action: 'PUSH',    target: 'GitHub repo: onem-studio-ai' },
  { time: '17:22', agent: 'PROXY',    color: 'neon-text',   action: 'CONFIG',  target: 'Agent souls defined x5' },
  { time: '17:11', agent: 'ONEM',     color: 'yellow-text', action: 'BRIEF',   target: 'AI creative studio concept approved' },
]

export default function ActivityWidget() {
  return (
    <div className="flex flex-col h-full">
      {feed.map((item, i) => (
        <div key={i} className={`flex items-start gap-2 py-2 font-mono text-sm ${i !== feed.length - 1 ? 'border-b border-cyber-border' : ''}`}>
          <span className="text-cyber-muted shrink-0 text-xs">{item.time}</span>
          <span className={`shrink-0 w-20 text-xs ${item.color}`}>{item.agent}</span>
          <span className="text-cyber-muted shrink-0 w-14 uppercase text-xs">{item.action}</span>
          <span className="text-cyber-text text-xs leading-tight">{item.target}</span>
        </div>
      ))}
      <div className="flex items-center gap-1 pt-2 font-mono text-xs text-cyber-muted mt-auto">
        <span>&gt;</span><span className="cursor" />
      </div>
    </div>
  )
}
