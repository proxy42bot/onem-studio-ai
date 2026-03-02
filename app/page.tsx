import StatusBar from '@/components/StatusBar'
import AgentGrid from '@/components/AgentGrid'
import ProjectBoard from '@/components/ProjectBoard'
import ActivityFeed from '@/components/ActivityFeed'
import MetricsPanel from '@/components/MetricsPanel'
import AlertsPanel from '@/components/AlertsPanel'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-cyber-bg flex flex-col">
      <StatusBar />

      {/* Header */}
      <div className="px-6 pt-8 pb-4 border-b border-cyber-border">
        <div className="max-w-screen-2xl mx-auto flex items-end justify-between">
          <div>
            <div className="font-mono text-cyber-muted text-sm mb-1 tracking-widest">
              FOUNDER: ONEM &nbsp;|&nbsp; ORCHESTRATOR: PROXY
            </div>
            <h1 className="font-pixel text-xl neon-text animate-flicker tracking-wide">
              ONEM STUDIO AI
            </h1>
            <div className="font-mono text-cyber-muted text-sm mt-1">
              AI Art · Design · Animation · Production
            </div>
          </div>
          <div className="font-mono text-xs text-right text-cyber-muted hidden md:block">
            <div>SYSTEM STATUS</div>
            <div className="neon-text text-lg mt-1">● OPERATIONAL</div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="flex-1 max-w-screen-2xl mx-auto w-full px-4 md:px-6 py-6 grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left column */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <MetricsPanel />
          <AgentGrid />
          <ProjectBoard />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <AlertsPanel />
          <ActivityFeed />

          {/* Footer / Workflow legend */}
          <section className="bg-cyber-panel pixel-border p-4">
            <h2 className="font-pixel text-xs neon-text mb-3 tracking-widest">◆ WORKFLOW</h2>
            <div className="font-mono text-sm text-cyber-muted flex flex-col gap-1">
              {[
                ['ONEM',      'IDEA / DIRECTION',  'yellow-text'],
                ['PROXY',     'VALIDATE + ROUTE',  'neon-text'],
                ['NARRYON',   'NARRATIVE',         'pink-text'],
                ['VISUYON',   'PRODUCTION',        'blue-text'],
                ['VIRYON',    'OPTIMIZE + REACH',  'yellow-text'],
                ['CODEXYON',  'PUBLISH + AUTOMATE','neon-text'],
                ['FINYON',    'ANALYZE + REPORT',  'yellow-text'],
                ['PROXY',     'ADJUST STRATEGY',   'neon-text'],
              ].map(([agent, role, color], i, arr) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`w-24 shrink-0 font-pixel text-xs ${color}`}>{agent}</span>
                  <span className="text-cyber-border">›</span>
                  <span>{role}</span>
                  {i < arr.length - 1 && <span className="ml-auto text-cyber-border">↓</span>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-cyber-border px-6 py-3 font-mono text-xs text-cyber-muted flex justify-between">
        <span>ONEM STUDIO AI © 2026</span>
        <span>
          <a
            href="https://github.com/proxy42bot/onem-studio-ai"
            target="_blank"
            rel="noreferrer"
            className="hover:neon-text transition-colors"
          >
            GITHUB ↗
          </a>
        </span>
      </div>
    </main>
  )
}
