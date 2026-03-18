'use client'

import { useState, useCallback } from 'react'
import GridLayout, { Layout } from 'react-grid-layout'
import Widget from './Widget'
import MetricsWidget   from './widgets/MetricsWidget'
import AgentWidget     from './widgets/AgentWidget'
import ProjectWidget   from './widgets/ProjectWidget'
import ActivityWidget  from './widgets/ActivityWidget'
import AlertsWidget    from './widgets/AlertsWidget'
import WorkflowWidget  from './widgets/WorkflowWidget'
import StatusWidget    from './widgets/StatusWidget'

const COLS        = 12
const ROW_HEIGHT  = 40
const WIDTH       = 960
const MARGIN: [number, number] = [8, 8]

const STORAGE_KEY = 'onem-dashboard-layout'

const DEFAULT_LAYOUT: Layout[] = [
  { i: 'status',   x: 0,  y: 0,  w: 2,  h: 6,  minW: 2, minH: 4  },
  { i: 'metrics',  x: 2,  y: 0,  w: 10, h: 6,  minW: 4, minH: 4  },
  { i: 'agents',   x: 0,  y: 6,  w: 4,  h: 10, minW: 3, minH: 6  },
  { i: 'projects', x: 4,  y: 6,  w: 5,  h: 10, minW: 3, minH: 6  },
  { i: 'alerts',   x: 9,  y: 6,  w: 3,  h: 10, minW: 2, minH: 4  },
  { i: 'activity', x: 0,  y: 16, w: 7,  h: 8,  minW: 4, minH: 5  },
  { i: 'workflow', x: 7,  y: 16, w: 5,  h: 8,  minW: 3, minH: 4  },
]

function loadLayout(): Layout[] {
  if (typeof window === 'undefined') return DEFAULT_LAYOUT
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return DEFAULT_LAYOUT
}

export default function Dashboard() {
  const [layout, setLayout] = useState<Layout[]>(loadLayout)

  const handleLayoutChange = useCallback((newLayout: Layout[]) => {
    setLayout(newLayout)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newLayout)) } catch {}
  }, [])

  const resetLayout = () => {
    setLayout(DEFAULT_LAYOUT)
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  return (
    <div className="min-h-screen bg-cyber-bg flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-cyber-panel border-b border-cyber-border shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-pixel text-xs neon-text">⬡ ONEM STUDIO AI</span>
          <span className="font-mono text-xs text-cyber-muted hidden sm:block">AI Art · Design · Animation</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={resetLayout}
            className="font-mono text-xs text-cyber-muted hover:text-cyber-neon transition-colors border border-cyber-border px-2 py-1"
          >
            RESET LAYOUT
          </button>
          <span className="font-mono text-xs text-cyber-muted hidden md:block">DRAG WIDGETS TO REARRANGE · RESIZE FROM CORNER</span>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto" style={{ width: WIDTH }}>
          <GridLayout
            layout={layout}
            cols={COLS}
            rowHeight={ROW_HEIGHT}
            width={WIDTH}
            margin={MARGIN}
            draggableHandle=".widget-drag-handle"
            onLayoutChange={handleLayoutChange}
            isResizable
            isDraggable
            compactType="vertical"
            preventCollision={false}
          >
            <div key="status">
              <Widget title="STATUS" borderClass="pixel-border-neon">
                <StatusWidget />
              </Widget>
            </div>

            <div key="metrics">
              <Widget title="SYSTEM METRICS" borderClass="pixel-border">
                <MetricsWidget />
              </Widget>
            </div>

            <div key="agents">
              <Widget title="AGENT MATRIX" borderClass="pixel-border-neon">
                <AgentWidget />
              </Widget>
            </div>

            <div key="projects">
              <Widget title="PROJECT REGISTRY" borderClass="pixel-border">
                <ProjectWidget />
              </Widget>
            </div>

            <div key="alerts">
              <Widget title="ALERTS" titleColor="yellow-text" borderClass="pixel-border-yellow">
                <AlertsWidget />
              </Widget>
            </div>

            <div key="activity">
              <Widget title="ACTIVITY LOG" borderClass="pixel-border">
                <ActivityWidget />
              </Widget>
            </div>

            <div key="workflow">
              <Widget title="WORKFLOW" borderClass="pixel-border">
                <WorkflowWidget />
              </Widget>
            </div>
          </GridLayout>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-cyber-border px-4 py-2 font-mono text-xs text-cyber-muted flex justify-between shrink-0">
        <span>ONEM STUDIO AI © 2026</span>
        <a href="https://github.com/proxy42bot/onem-studio-ai" target="_blank" rel="noreferrer" className="hover:neon-text transition-colors">GITHUB ↗</a>
      </div>
    </div>
  )
}
