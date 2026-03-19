/**
 * GRID CONFIGURATION
 * Single source of truth for all layout constants.
 */

export const GRID_COLS       = 12
export const GRID_WIDTH      = 960
export const GRID_ROW_HEIGHT = 40
export const GRID_MARGIN: [number, number] = [8, 8]
export const STORAGE_KEY     = 'onem-dashboard-layout-v2'

export interface WidgetLayout {
  i: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  minH?: number
}

export const DEFAULT_LAYOUT: WidgetLayout[] = [
  { i: 'status',   x: 0,  y: 0,  w: 2,  h: 6,  minW: 2, minH: 4  },
  { i: 'metrics',  x: 2,  y: 0,  w: 10, h: 6,  minW: 4, minH: 4  },
  { i: 'agents',   x: 0,  y: 6,  w: 4,  h: 10, minW: 3, minH: 6  },
  { i: 'projects', x: 4,  y: 6,  w: 5,  h: 10, minW: 3, minH: 6  },
  { i: 'alerts',   x: 9,  y: 6,  w: 3,  h: 10, minW: 2, minH: 4  },
  { i: 'activity', x: 0,  y: 16, w: 7,  h: 8,  minW: 4, minH: 5  },
  { i: 'workflow', x: 7,  y: 16, w: 5,  h: 8,  minW: 3, minH: 4  },
]
