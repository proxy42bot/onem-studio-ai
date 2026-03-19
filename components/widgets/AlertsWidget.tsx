'use client'

type Level = 'INFO' | 'WARN' | 'BLOCK' | 'OK'

const alerts = [
  { level: 'WARN' as Level,  agent: 'FINYON',   message: 'No revenue channels configured.' },
  { level: 'WARN' as Level,  agent: 'VISUYON',  message: 'No asset storage configured.' },
  { level: 'INFO' as Level,  agent: 'VISUYON',  message: 'Replicate API key needed for image generation.' },
  { level: 'INFO' as Level,  agent: 'PROXY',    message: 'Dashboard liquid grid — deployment in progress.' },
]

const levelIcon: Record<Level, string> = { WARN: '⚠', INFO: 'ℹ', BLOCK: '✖', OK: '✔' }
const levelColor: Record<Level, string> = { WARN: '#806000', INFO: '#000082', BLOCK: '#CC0000', OK: '#006600' }

export default function AlertsWidget() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {alerts.map((a, i) => (
        <div key={i} className="mac-raised" style={{ padding: '4px 6px', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 14, color: levelColor[a.level], flexShrink: 0, lineHeight: 1.2 }}>{levelIcon[a.level]}</span>
          <div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 1 }}>
              <span style={{ fontSize: 10, fontWeight: 'bold', color: levelColor[a.level] }}>{a.level}</span>
              <span style={{ fontSize: 10, color: '#808080' }}>{a.agent}</span>
            </div>
            <div style={{ fontSize: 11 }}>{a.message}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
