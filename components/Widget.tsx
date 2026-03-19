'use client'

import { ReactNode } from 'react'

interface WidgetProps {
  id: string
  title: string
  children: ReactNode
  noPad?: boolean
  accent?: string
}

export default function Widget({ id, title, children, noPad = false }: WidgetProps) {
  return (
    <div data-widget-id={id} className="mac-window">

      {/* ── Title bar ── */}
      <div className="mac-titlebar widget-drag-handle">
        {/* Close box */}
        <div className="mac-titlebox" title="Close">■</div>
        {/* Title */}
        <span className="mac-title-text">{title}</span>
        {/* Zoom box */}
        <div className="mac-titlebox" title="Zoom">+</div>
      </div>

      {/* ── Content ── */}
      <div className={`mac-content ${noPad ? '!p-0' : ''}`}>
        {children}
      </div>

    </div>
  )
}
