'use client'
import { ReactNode } from 'react'

interface WidgetProps {
  title: string
  titleColor?: string
  borderClass?: string
  children: ReactNode
  className?: string
  noPad?: boolean
}

export default function Widget({
  title,
  titleColor = 'neon-text',
  borderClass = 'pixel-border',
  children,
  className = '',
  noPad = false,
}: WidgetProps) {
  return (
    <div className={`bg-cyber-panel ${borderClass} flex flex-col w-full h-full overflow-hidden ${className}`}>
      {/* Drag handle — title bar */}
      <div className={`widget-drag-handle flex items-center justify-between px-3 py-2 border-b border-cyber-border shrink-0 select-none`}>
        <span className={`font-pixel text-xs tracking-widest ${titleColor}`}>◆ {title}</span>
        <span className="text-cyber-muted text-xs opacity-40">⠿</span>
      </div>
      {/* Content */}
      <div className={`flex-1 overflow-auto ${noPad ? '' : 'p-3'}`}>
        {children}
      </div>
    </div>
  )
}
