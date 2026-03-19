'use client'

const steps = [
  { agent: 'ONEM',     role: 'Idea / Direction'  },
  { agent: 'PROXY',    role: 'Validate + Route'  },
  { agent: 'NARRYON',  role: 'Narrative'         },
  { agent: 'VISUYON',  role: 'Production'        },
  { agent: 'VIRYON',   role: 'Optimize + Reach'  },
  { agent: 'CODEXYON', role: 'Publish + Automate'},
  { agent: 'FINYON',   role: 'Analyze + Report'  },
  { agent: 'PROXY',    role: 'Adjust Strategy'   },
]

export default function WorkflowWidget() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {steps.map((s, i) => (
        <div key={i}>
          <div className="mac-raised" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 8px' }}>
            <span style={{ fontSize: 10, color: '#808080', width: 16, textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
            <span style={{ fontWeight: 'bold', fontSize: 12, color: '#000082', width: 72, flexShrink: 0 }}>{s.agent}</span>
            <span style={{ fontSize: 11, color: '#000000' }}>→ {s.role}</span>
          </div>
          {i < steps.length - 1 && <div className="mac-groove" />}
        </div>
      ))}
    </div>
  )
}
