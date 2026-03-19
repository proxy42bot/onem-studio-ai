'use client'

/**
 * DashboardGrid — Step 2 skeleton
 * 960px / 12-col / draggable + resizable widgets
 * Content populated in Step 3.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const GridLayout = require('react-grid-layout').default ?? require('react-grid-layout')

import { useLayout } from '@/lib/useLayout'
import {
  GRID_COLS,
  GRID_WIDTH,
  GRID_ROW_HEIGHT,
  GRID_MARGIN,
} from '@/lib/gridConfig'
import Widget from './Widget'

type Accent = 'neon' | 'pink' | 'blue' | 'yellow' | 'orange' | 'red' | 'default'

// Placeholder until Step 3 fills each widget
function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-full font-mono text-sm text-cyber-muted opacity-40 select-none">
      {label}
    </div>
  )
}

// ── Widget registry ──────────────────────────────────────────────────────────
// Only file to edit when adding/removing a widget.
const REGISTRY: Record<string, { title: string; accent: Accent; node: React.ReactNode }> = {
  status:   { title: 'STATUS',           accent: 'neon',    node: <Placeholder label="STATUS" />   },
  metrics:  { title: 'SYSTEM METRICS',   accent: 'default', node: <Placeholder label="METRICS" />  },
  agents:   { title: 'AGENT MATRIX',     accent: 'neon',    node: <Placeholder label="AGENTS" />   },
  projects: { title: 'PROJECT REGISTRY', accent: 'default', node: <Placeholder label="PROJECTS" /> },
  alerts:   { title: 'ALERTS',           accent: 'yellow',  node: <Placeholder label="ALERTS" />   },
  activity: { title: 'ACTIVITY LOG',     accent: 'default', node: <Placeholder label="ACTIVITY" /> },
  workflow: { title: 'WORKFLOW',         accent: 'default', node: <Placeholder label="WORKFLOW" /> },
}

export default function DashboardGrid() {
  const { layout, onLayoutChange, resetLayout } = useLayout()

  return (
    <div className="min-h-screen bg-cyber-bg flex flex-col">

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-4 py-2 bg-cyber-panel border-b border-cyber-border shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-pixel text-xs neon-text">⬡ ONEM STUDIO AI</span>
          <span className="font-mono text-xs text-cyber-muted hidden sm:block">AI Art · Design · Animation</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-cyber-muted hidden lg:block opacity-40">
            DRAG TITLE BAR · RESIZE CORNER
          </span>
          <button
            onClick={resetLayout}
            className="font-mono text-xs text-cyber-muted border border-cyber-border px-2 py-1 hover:border-cyber-neon hover:neon-text transition-colors"
          >
            RESET LAYOUT
          </button>
        </div>
      </header>

      {/* ── Grid ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        {/* 960px container; horizontally scrollable on narrow screens */}
        <div className="mx-auto pb-8" style={{ width: GRID_WIDTH }}>
          <GridLayout
            layout={layout}
            cols={GRID_COLS}
            rowHeight={GRID_ROW_HEIGHT}
            width={GRID_WIDTH}
            margin={GRID_MARGIN}
            draggableHandle=".widget-drag-handle"
            onLayoutChange={onLayoutChange}
            isResizable
            isDraggable
            compactType="vertical"
            preventCollision={false}
            resizeHandles={['se']}
          >
            {layout.map(({ i }) => {
              const w = REGISTRY[i]
              if (!w) return null
              return (
                <div key={i}>
                  <Widget id={i} title={w.title} accent={w.accent}>
                    {w.node}
                  </Widget>
                </div>
              )
            })}
          </GridLayout>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-cyber-border px-4 py-2 font-mono text-xs text-cyber-muted flex justify-between shrink-0">
        <span>ONEM STUDIO AI © 2026</span>
        <a
          href="https://github.com/proxy42bot/onem-studio-ai"
          target="_blank"
          rel="noreferrer"
          className="hover:neon-text transition-colors"
        >
          GITHUB ↗
        </a>
      </footer>
    </div>
  )
}
