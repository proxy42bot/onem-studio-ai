import { useState, useCallback } from 'react'
import { Layout } from 'react-grid-layout'
import { DEFAULT_LAYOUT, STORAGE_KEY } from './gridConfig'

function load(): Layout {
  if (typeof window === 'undefined') return DEFAULT_LAYOUT as unknown as Layout
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved) as Layout
  } catch {}
  return DEFAULT_LAYOUT as unknown as Layout
}

export function useLayout() {
  const [layout, setLayout] = useState<Layout>(load)

  const onLayoutChange = useCallback((next: Layout) => {
    setLayout(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }, [])

  const resetLayout = useCallback(() => {
    setLayout(DEFAULT_LAYOUT as unknown as Layout)
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }, [])

  return { layout, onLayoutChange, resetLayout }
}
