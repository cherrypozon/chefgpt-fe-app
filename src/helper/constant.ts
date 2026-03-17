import type React from 'react'
import type { TooltipStyle } from '../type/model'

export const TOOLTIP_STYLE: TooltipStyle = {
  backgroundColor: 'var(--cards)',
  borderColor:     'var(--border-grey)',
  color:           'var(--text)',
  fontSize:        12,
}

export const TOOLTIP_LABEL_STYLE: React.CSSProperties = {
  color: 'var(--text)',
}

export const TOOLTIP_ITEM_STYLE: React.CSSProperties = {
  color: 'var(--text)',
}
