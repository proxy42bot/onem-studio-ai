'use client'

type StepState = 'completed' | 'active' | 'pending'

interface PipelineStep {
  id: string
  label: string
  state: StepState
}

const steps: PipelineStep[] = [
  { id: 'trendyon',  label: 'TRENDYON',  state: 'completed' },
  { id: 'narryon',   label: 'NARRYON',   state: 'completed' },
  { id: 'visuyon',   label: 'VISUYON',   state: 'active'    },
  { id: 'renderyon', label: 'RENDERYON', state: 'pending'   },
  { id: 'viryon',    label: 'VIRYON',    state: 'pending'   },
  { id: 'codexyon',  label: 'CODEXYON',  state: 'pending'   },
  { id: 'finyon',    label: 'FINYON',    state: 'pending'   },
]

const dotConfig: Record<StepState, { fill: string; border?: string; size: number }> = {
  completed: { fill: '#ABABAB',  size: 8 },
  active:    { fill: '#0A0A0A',  size: 8 },
  pending:   { fill: 'transparent', border: '1.5px solid #ABABAB', size: 8 },
}

const labelStyle: Record<StepState, React.CSSProperties> = {
  completed: { fontWeight: 400, color: 'var(--color-text-2)' },
  active:    { fontWeight: 500, color: 'var(--color-text)' },
  pending:   { fontWeight: 300, color: 'var(--color-text-3)' },
}

export default function PipelineIndicator() {
  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-card)',
      padding: '20px 32px',
      overflowX: 'auto',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        minWidth: 'max-content',
        gap: 0,
      }}>
        {steps.map((step, i) => {
          const dot = dotConfig[step.state]
          return (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Connector line (before first item skip) */}
              {i > 0 && (
                <div style={{
                  width: 40,
                  height: 1,
                  background: 'var(--color-border)',
                  flexShrink: 0,
                }} />
              )}

              {/* Step */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                {/* Dot */}
                <div style={{
                  width: dot.size,
                  height: dot.size,
                  borderRadius: '50%',
                  background: dot.fill,
                  border: dot.border ?? 'none',
                  flexShrink: 0,
                }} />

                {/* Label */}
                <span style={{
                  fontSize: 11,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  fontFamily: 'var(--font-primary)',
                  whiteSpace: 'nowrap',
                  ...labelStyle[step.state],
                }}>
                  {step.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
