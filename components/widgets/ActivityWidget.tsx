'use client'

const feed = [
  { time: '22:43', agent: 'PROXY',    action: 'BUILD',   target: 'Liquid grid — Step 3 widgets'    },
  { time: '22:29', agent: 'PROXY',    action: 'BUILD',   target: 'Liquid grid dashboard initiated'  },
  { time: '20:18', agent: 'CODEXYON', action: 'FIX',     target: 'Agent avatar crops — recut'       },
  { time: '20:13', agent: 'CODEXYON', action: 'DEPLOY',  target: 'Agent avatars live on dashboard'  },
  { time: '17:22', agent: 'CODEXYON', action: 'DEPLOY',  target: 'Vercel + GitHub live'             },
  { time: '17:11', agent: 'ONEM',     action: 'BRIEF',   target: 'Studio concept approved'          },
]

export default function ActivityWidget() {
  return (
    <div className="mac-inset" style={{ padding: 0, height: '100%', overflow: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, fontFamily: '"Monaco", monospace' }}>
        <thead>
          <tr style={{ background: '#C0C0C0', borderBottom: '1px solid #000' }}>
            <th style={{ padding: '2px 6px', textAlign: 'left', fontWeight: 'bold', width: 42 }}>Time</th>
            <th style={{ padding: '2px 6px', textAlign: 'left', fontWeight: 'bold', width: 70 }}>Agent</th>
            <th style={{ padding: '2px 6px', textAlign: 'left', fontWeight: 'bold', width: 56 }}>Action</th>
            <th style={{ padding: '2px 6px', textAlign: 'left', fontWeight: 'bold' }}>Event</th>
          </tr>
        </thead>
        <tbody>
          {feed.map((e, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#E8E8E8', borderBottom: '1px solid #C0C0C0' }}>
              <td style={{ padding: '2px 6px', color: '#808080' }}>{e.time}</td>
              <td style={{ padding: '2px 6px', color: '#000082', fontWeight: 'bold' }}>{e.agent}</td>
              <td style={{ padding: '2px 6px', color: '#808080' }}>{e.action}</td>
              <td style={{ padding: '2px 6px' }}>{e.target}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
