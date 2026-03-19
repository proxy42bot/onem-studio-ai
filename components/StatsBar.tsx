'use client'

interface StatItem {
  label: string
  value: string | number
}

const stats: StatItem[] = [
  { label: 'Agents Online', value: 2 },
  { label: 'Projects',      value: 1 },
  { label: 'Pipeline',      value: 'Active' },
  { label: 'Content Pieces', value: 0 },
  { label: 'Alerts',        value: 1 },
]

export default function StatsBar() {
  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-card)',
      display: 'grid',
      gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
      overflow: 'hidden',
    }}>
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          style={{
            padding: '20px 24px',
            borderLeft: i > 0 ? '1px solid var(--color-border)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <span style={{
            fontSize: 10,
            textTransform: 'uppercase',
            color: 'var(--color-text-2)',
            letterSpacing: '0.12em',
            fontFamily: 'var(--font-primary)',
            fontWeight: 500,
          }}>
            {stat.label}
          </span>
          <span style={{
            fontSize: 48,
            fontWeight: 700,
            color: 'var(--color-text)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            fontFamily: 'var(--font-primary)',
          }}>
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  )
}
