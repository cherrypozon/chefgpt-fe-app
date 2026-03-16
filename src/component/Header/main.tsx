'use client'

import { AlertTriangle } from 'lucide-react'
import type { HeaderProps, HeaderBadge } from '../../type/model'

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  badges = [],
  showDate = false,
  rightContent,
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-borderGrey bg-cards shrink-0">
      {/* Left side */}
      <div>
        <h2 className="text-xl font-semibold text-text">{title}</h2>
        <p className="text-[11px] font-mono uppercase tracking-[0.14em] mt-1 text-darkGrey">
          {subtitle}
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {badges.map((badge: HeaderBadge, i: number) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-medium ${badge.variant === 'success'
              ? 'border-green-500/30 bg-green-500/10 text-green-400'
              : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
              }`}
          >
            {badge.variant === 'success' && <span className="text-yellow-500">⚡</span>}
            {badge.variant === 'warning' && <AlertTriangle size={14} />}
            {badge.text}
          </div>
        ))}

        {showDate && (
          <div className="px-3 py-1.5 text-xs font-mono bg-cards text-darkGrey border border-borderGrey">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        )}

        {rightContent}
      </div>
    </div>
  )
}

export default Header
