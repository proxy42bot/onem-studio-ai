'use client'

const projects = [
  { id: 'p001', name: 'Studio Infrastructure',  phase: 'Deployment',      agent: 'PROXY + CODEXYON',  priority: 'HIGH', status: 'active',  progress: 75 },
  { id: 'p002', name: 'Brand Identity System',   phase: 'Pending Brief',   agent: 'NARRYON',           priority: 'HIGH', status: 'pending', progress: 0  },
  { id: 'p003', name: 'Social Media Pipeline',   phase: 'Planning',        agent: 'VIRYON + CODEXYON', priority: 'MED',  status: 'pending', progress: 0  },
  { id: 'p004', name: 'First Content Drop',      phase: 'Awaiting Assets', agent: 'VISUYON',           priority: 'MED',  status: 'pending', progress: 0  },
]

const priorityColor: Record<string, string> = { HIGH: '#CC0000', MED: '#806000', LOW: '#808080' }
const statusColor:   Record<string, string> = { active: '#000082', pending: '#808080', blocked: '#CC0000', done: '#808080' }

export default function ProjectWidget() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {projects.map((p) => (
        <div key={p.id} className="mac-inset" style={{ padding: '4px 6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4, marginBottom: 2 }}>
            <span style={{ fontWeight: 'bold', fontSize: 12 }}>{p.name}</span>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 10, color: priorityColor[p.priority], fontWeight: 'bold' }}>{p.priority}</span>
              <span style={{ fontSize: 10, color: statusColor[p.status], textTransform: 'uppercase' }}>{p.status}</span>
            </div>
          </div>
          <div style={{ fontSize: 10, color: '#808080', marginBottom: p.status === 'active' ? 4 : 0 }}>
            {p.phase} · {p.agent}
          </div>
          {p.status === 'active' && (
            <div>
              <div className="mac-inset" style={{ height: 8, padding: 0, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${p.progress}%`, background: '#000082' }} />
              </div>
              <div style={{ fontSize: 10, color: '#808080', textAlign: 'right', marginTop: 2 }}>{p.progress}%</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
