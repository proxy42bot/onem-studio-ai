'use client'

import { GridLayout } from 'react-grid-layout'
import { useLayout } from '@/lib/useLayout'
import { GRID_COLS, GRID_WIDTH, GRID_ROW_HEIGHT, GRID_MARGIN } from '@/lib/gridConfig'

import Widget         from './Widget'
import StatusWidget   from './widgets/StatusWidget'
import MetricsWidget  from './widgets/MetricsWidget'
import AgentWidget    from './widgets/AgentWidget'
import ProjectWidget  from './widgets/ProjectWidget'
import AlertsWidget   from './widgets/AlertsWidget'
import ActivityWidget from './widgets/ActivityWidget'
import WorkflowWidget from './widgets/WorkflowWidget'

export default function Dashboard() {
  const { layout, onLayoutChange, resetLayout } = useLayout()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#C0C0C0' }}>

      {/* ── Menu bar ── */}
      <header style={{
        background: '#C0C0C0',
        borderBottom: '1px solid #000000',
        boxShadow: '0 1px 0 #FFFFFF',
        padding: '2px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        userSelect: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Apple-style logo placeholder */}
          <span style={{ fontWeight: 'bold', fontSize: 14 }}>⬡</span>
          {['File','Edit','View','Agents','Window'].map(item => (
            <span key={item} style={{ fontSize: 12, cursor: 'default', padding: '1px 4px' }}
              className="hover:mac-selected"
            >{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="mac-btn" onClick={resetLayout}>
            Reset Layout
          </button>
          <span style={{ fontSize: 11, color: '#000082', fontWeight: 'bold' }}>
            ONEM STUDIO AI
          </span>
        </div>
      </header>

      {/* ── Desktop area ── */}
      <main className="flex-1 overflow-auto" style={{ padding: '8px 0' }}>
        <div className="mx-auto" style={{ width: GRID_WIDTH }}>
          <GridLayout
            layout={layout}
            width={GRID_WIDTH}
            gridConfig={{ cols: GRID_COLS, rowHeight: GRID_ROW_HEIGHT, margin: GRID_MARGIN }}
            dragConfig={{ handle: '.widget-drag-handle' }}
            onLayoutChange={onLayoutChange}
          >
            <div key="status">
              <Widget id="status" title="Status">
                <StatusWidget />
              </Widget>
            </div>
            <div key="metrics">
              <Widget id="metrics" title="System Metrics">
                <MetricsWidget />
              </Widget>
            </div>
            <div key="agents">
              <Widget id="agents" title="Agent Matrix">
                <AgentWidget />
              </Widget>
            </div>
            <div key="projects">
              <Widget id="projects" title="Project Registry">
                <ProjectWidget />
              </Widget>
            </div>
            <div key="alerts">
              <Widget id="alerts" title="Alerts">
                <AlertsWidget />
              </Widget>
            </div>
            <div key="activity">
              <Widget id="activity" title="Activity Log">
                <ActivityWidget />
              </Widget>
            </div>
            <div key="workflow">
              <Widget id="workflow" title="Workflow">
                <WorkflowWidget />
              </Widget>
            </div>
          </GridLayout>
        </div>
      </main>

      {/* ── Status bar ── */}
      <footer style={{
        background: '#C0C0C0',
        borderTop: '1px solid #000000',
        boxShadow: 'inset 0 1px 0 #FFFFFF',
        padding: '2px 8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        fontSize: 11,
      }}>
        <span>Onem Studio AI © 2026</span>
        <a
          href="https://github.com/proxy42bot/onem-studio-ai"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#000082', textDecoration: 'none' }}
        >
          GitHub ↗
        </a>
      </footer>
    </div>
  )
}
