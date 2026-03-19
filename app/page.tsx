// dashboard-v2.1 — ONEM STUDIO AI main dashboard
export default function Dashboard() {
  return (
    <div style={{maxWidth:'1280px', margin:'0 auto', padding:'32px'}}>

      {/* NAV */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, height:'56px',
        background:'var(--color-bg)', borderBottom:'1px solid var(--color-border)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 32px', zIndex:100
      }}>
        <span style={{fontSize:'13px', fontWeight:500}}>ONEM STUDIO AI</span>
        <div style={{display:'flex', gap:'32px', fontSize:'12px'}}>
          <a href="#agents">agents</a>
          <a href="#pipeline">pipeline</a>
          <a href="#activity">activity</a>
          <a href="#alerts">alerts</a>
        </div>
      </nav>

      <div style={{marginTop:'80px', display:'flex', flexDirection:'column', gap:'48px'}}>

        {/* STATS BAR */}
        <div className="card" style={{
          display:'grid', gridTemplateColumns:'repeat(5,1fr)', padding:0, overflow:'hidden'
        }}>
          {[
            {label:'AGENTS ONLINE', value:'2 / 8'},
            {label:'PROJECTS',      value:'1'},
            {label:'PIPELINE',      value:'LIVE'},
            {label:'CONTENT PIECES',value:'0'},
            {label:'ALERTS',        value:'2'}
          ].map((stat, i) => (
            <div key={i} style={{
              padding:'16px 24px',
              borderRight: i < 4 ? '1px solid var(--color-border)' : 'none'
            }}>
              <div style={{
                fontSize:'10px', fontWeight:500, letterSpacing:'0.12em',
                color:'var(--color-text-2)', marginBottom:'8px'
              }}>{stat.label}</div>
              <div style={{
                fontSize:'48px', fontWeight:700, letterSpacing:'-0.02em',
                color:'var(--color-text)', lineHeight:1
              }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* AGENT GRID */}
        <div id="agents">
          <div style={{
            fontSize:'10px', fontWeight:500, letterSpacing:'0.12em',
            color:'var(--color-text-2)', marginBottom:'16px'
          }}>AGENT MATRIX</div>
          <div style={{
            display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px'
          }}>
            {[
              {name:'PROXY',    role:'Orchestrator',     status:'active'},
              {name:'TRENDYON', role:'Trend Scout',       status:'idle'},
              {name:'NARRYON',  role:'Narrative',         status:'idle'},
              {name:'VISUYON',  role:'Visual Production', status:'idle'},
              {name:'RENDERYON',role:'Asset Pipeline',    status:'idle'},
              {name:'VIRYON',   role:'Optimize & Reach',  status:'idle'},
              {name:'CODEXYON', role:'Build & Security',  status:'active'},
              {name:'FINYON',   role:'Analytics',         status:'idle'}
            ].map((agent, i) => (
              <div key={i} className="card" style={{display:'flex', alignItems:'center', gap:'12px'}}>
                <div style={{
                  width:'40px', height:'40px', borderRadius:'12px',
                  background:'var(--color-surface-2)', flexShrink:0
                }}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:'14px', fontWeight:500}}>{agent.name}</div>
                  <div style={{
                    fontSize:'11px', letterSpacing:'0.1em',
                    color:'var(--color-text-2)', textTransform:'uppercase'
                  }}>{agent.role}</div>
                </div>
                <div style={{
                  width:'6px', height:'6px', borderRadius:'50%',
                  background: agent.status === 'active' ? '#0A0A0A' : '#ABABAB'
                }}/>
              </div>
            ))}
          </div>
        </div>

        {/* ALERTS */}
        <div id="alerts">
          <div style={{
            fontSize:'10px', fontWeight:500, letterSpacing:'0.12em',
            color:'var(--color-text-2)', marginBottom:'16px'
          }}>ALERTS</div>
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            {[
              {type:'WARN', agent:'FINYON',   msg:'No revenue channels configured.'},
              {type:'WARN', agent:'VISUYON',  msg:'No asset storage configured.'},
              {type:'INFO', agent:'VISUYON',  msg:'Replicate API key needed.'},
              {type:'INFO', agent:'PROXY',    msg:'Dashboard deployment in progress.'}
            ].map((alert, i) => (
              <div key={i} style={{
                background:'var(--color-surface)',
                borderRadius:'var(--radius-alert)',
                border:'1px solid var(--color-border)',
                borderLeft:`3px solid ${alert.type === 'WARN' ? '#F5C518' : '#ABABAB'}`,
                padding:'14px 20px',
                display:'flex', gap:'12px', alignItems:'center'
              }}>
                <span style={{
                  fontSize:'10px', fontWeight:500, letterSpacing:'0.1em',
                  color:'var(--color-text-2)'
                }}>{alert.type}</span>
                <span style={{fontSize:'11px', fontWeight:500}}>
                  {alert.agent}
                </span>
                <span style={{fontSize:'13px', color:'var(--color-text-2)'}}>
                  {alert.msg}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
// v2.1-force-redeploy 1773951907
