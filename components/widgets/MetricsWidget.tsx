'use client'

const kpis = [
  { label: 'Active Projects', value: '1',        sub: '+3 in queue'        },
  { label: 'Agents Online',   value: '2 / 6',    sub: 'Proxy + Codexyon'   },
  { label: 'Revenue (MTD)',   value: '$0',        sub: 'Channels pending'   },
  { label: 'Content Pieces',  value: '0',         sub: 'First drop pending' },
  { label: 'Pipeline',        value: 'LIVE',      sub: 'Dashboard deployed' },
  { label: 'Alerts',          value: '2',         sub: 'Pending decisions'  },
]

export default function MetricsWidget() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
      {kpis.map((k) => (
        <div key={k.label} className="mac-inset" style={{ padding: '4px 6px' }}>
          <div style={{ fontSize: 10, color: '#808080', marginBottom: 2 }}>{k.label}</div>
          <div style={{ fontSize: 16, fontWeight: 'bold', color: '#000082', lineHeight: 1 }}>{k.value}</div>
          <div style={{ fontSize: 10, color: '#808080', marginTop: 2 }}>{k.sub}</div>
        </div>
      ))}
    </div>
  )
}
