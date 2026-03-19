'use client'
import { useState } from 'react'

const navItems = [
  { label: 'dashboard', active: true },
  { label: 'agents',    active: false },
  { label: 'projects',  active: false },
  { label: 'pipeline',  active: false },
  { label: 'settings',  active: false },
]

export default function NavBar() {
  const [active, setActive] = useState('dashboard')

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'var(--color-bg)',
      borderBottom: '1px solid var(--color-border)',
      height: 56,
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      {/* Wordmark */}
      <span style={{
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--color-text)',
        fontFamily: 'var(--font-primary)',
        letterSpacing: '-0.01em',
      }}>
        ONEM STUDIO AI
      </span>

      {/* Nav items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {navItems.map(item => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: active === item.label ? 500 : 400,
              color: 'var(--color-text)',
              fontFamily: 'var(--font-primary)',
              textDecoration: active === item.label ? 'underline' : 'none',
              textUnderlineOffset: 3,
              textDecorationThickness: 1,
              letterSpacing: '0',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
