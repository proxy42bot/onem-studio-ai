'use client'
import { useState } from 'react'

type AgentStatus = 'active' | 'idle'

interface AgentCard {
  id: string
  name: string
  role: string
  status: AgentStatus
  avatar: string
}

const agents: AgentCard[] = [
  { id: 'proxy',    name: 'PROXY',    role: 'System Orchestrator',   status: 'active', avatar: '/avatars/proxy.jpg' },
  { id: 'narryon', name: 'NARRYON',  role: 'Storytelling Engine',   status: 'idle',   avatar: '/avatars/narryon.jpg' },
  { id: 'visuyon', name: 'VISUYON',  role: 'Production Engine',     status: 'idle',   avatar: '/avatars/visuyon.jpg' },
  { id: 'viryon',  name: 'VIRYON',   role: 'Growth Engine',         status: 'idle',   avatar: '/avatars/viryon.jpg' },
  { id: 'codexyon',name: 'CODEXYON', role: 'Pipeline Architect',    status: 'active', avatar: '/avatars/codexyon.jpg' },
  { id: 'finyon',  name: 'FINYON',   role: 'Financial Intelligence', status: 'idle',  avatar: '/avatars/finyon.jpg' },
  { id: 'trendyon',name: 'TRENDYON', role: 'Trend & Intel Scout',   status: 'idle',   avatar: '/avatars/trendyon.jpg' },
  { id: 'renderyon',name:'RENDERYON',role: 'Asset Pipeline Mgr',    status: 'idle',   avatar: '/avatars/renderyon.jpg' },
]

function AgentCardItem({ agent }: { agent: AgentCard }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-card)',
        boxShadow: hovered ? 'var(--shadow-hover)' : 'var(--shadow-card)',
        border: `1px solid ${hovered ? 'var(--color-border-hover)' : 'transparent'}`,
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        cursor: 'default',
      }}
    >
      {/* Avatar */}
      <div style={{
        width: '100%',
        aspectRatio: '1',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--color-surface-2)',
      }}>
        <img
          src={agent.avatar}
          alt={agent.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>

      {/* Info */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--color-text)',
            fontFamily: 'var(--font-primary)',
            marginBottom: 2,
          }}>
            {agent.name}
          </div>
          <div style={{
            fontSize: 11,
            textTransform: 'uppercase',
            color: 'var(--color-text-2)',
            letterSpacing: '0.1em',
            fontFamily: 'var(--font-primary)',
          }}>
            {agent.role}
          </div>
        </div>

        {/* Status dot */}
        <div style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: agent.status === 'active' ? '#0A0A0A' : '#ABABAB',
          flexShrink: 0,
          marginTop: 5,
        }} />
      </div>
    </div>
  )
}

export default function AgentCardsGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
    }}
      className="agent-cards-grid"
    >
      <style>{`
        @media (max-width: 1024px) {
          .agent-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .agent-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      {agents.map(agent => (
        <AgentCardItem key={agent.id} agent={agent} />
      ))}
    </div>
  )
}
