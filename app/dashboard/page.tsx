import NavBar             from '@/components/NavBar'
import StatsBar           from '@/components/StatsBar'
import PipelineIndicator  from '@/components/PipelineIndicator'
import AgentCardsGrid     from '@/components/AgentCardsGrid'
import ActivityLog        from '@/components/ActivityLog'
import AlertsPanel        from '@/components/AlertsPanel'

export const metadata = {
  title: 'ONEM STUDIO AI — Dashboard v2',
}

export default function DashboardV2Page() {
  return (
    <>
      {/* Apply token body class via inline style on wrapper */}
      <style>{`
        body {
          background: var(--color-bg);
          font-family: var(--font-primary);
          color: var(--color-text);
          margin: 0;
          padding: 0;
        }
        * { box-sizing: border-box; }
      `}</style>

      <NavBar />

      <main style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 32px',
        paddingTop: 80,   /* nav clearance */
        paddingBottom: 64,
      }}>

        {/* Stats Bar */}
        <section>
          <StatsBar />
        </section>

        {/* Pipeline */}
        <section style={{ marginTop: 48 }}>
          <PipelineIndicator />
        </section>

        {/* Agent Cards */}
        <section style={{ marginTop: 48 }}>
          <AgentCardsGrid />
        </section>

        {/* Activity Log */}
        <section style={{ marginTop: 48 }}>
          <ActivityLog />
        </section>

        {/* Alerts */}
        <section style={{ marginTop: 48 }}>
          <AlertsPanel />
        </section>

      </main>
    </>
  )
}
