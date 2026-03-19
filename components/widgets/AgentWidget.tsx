'use client'

const agents = [
  { id: 'proxy',    name: 'PROXY',    role: 'Orchestrator',       status: 'active',  task: 'System architecture + dashboard', avatar: '/avatars/proxy.jpg'    },
  { id: 'narryon',  name: 'NARRYON',  role: 'Storytelling',       status: 'idle',    task: 'Awaiting brief',                  avatar: '/avatars/narryon.jpg'  },
  { id: 'visuyon',  name: 'VISUYON',  role: 'Production',         status: 'idle',    task: 'Awaiting narrative input',         avatar: '/avatars/visuyon.jpg'  },
  { id: 'viryon',   name: 'VIRYON',   role: 'Growth',             status: 'idle',    task: 'Awaiting content',                avatar: '/avatars/viryon.jpg'   },
  { id: 'codexyon', name: 'CODEXYON', role: 'Pipeline Architect',  status: 'active',  task: 'Dashboard build',                 avatar: '/avatars/codexyon.jpg' },
  { id: 'finyon',   name: 'FINYON',   role: 'Financial Intel',    status: 'idle',    task: 'Awaiting revenue data',           avatar: '/avatars/finyon.jpg'   },
]

const dotClass: Record<string, string> = {
  active:  'mac-dot-active',
  idle:    'mac-dot-idle',
  blocked: 'mac-dot-blocked',
}

export default function AgentWidget() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {agents.map((a, i) => (
        <div key={a.id}>
          <div className="mac-raised" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px' }}>
            <img src={a.avatar} alt={a.name} style={{ width: 28, height: 28, objectFit: 'cover', objectPosition: 'top', border: '1px solid #000', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                <span style={{ fontWeight: 'bold', fontSize: 12 }}>{a.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                  <span className={dotClass[a.status]} />
                  <span style={{ fontSize: 10, color: '#808080', textTransform: 'uppercase' }}>{a.status}</span>
                </div>
              </div>
              <div style={{ fontSize: 10, color: '#808080', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.task}</div>
            </div>
          </div>
          {i < agents.length - 1 && <div className="mac-groove" />}
        </div>
      ))}
    </div>
  )
}
