'use client'

import React, { useRef, useEffect } from 'react'
import { ChevronDown, ChevronRight, User, MessageSquare, LayoutDashboard, FileText, ShieldCheck } from 'lucide-react'
import ProfileModal from '../Modal/ProfileModal'
import {
  useAppDispatch,
  useAppSelector,
  setActiveTab,
  setActiveChatId,
  setSidebarOpen,
  setProfileOpen,
  toggleHistoryVisible,
} from '../../redux'
import type { RootState } from '../../redux/store'

// Nav items config (static, kept here since it's UI config not data)
const NAV_ITEMS = [
  { id: 'conversation', label: 'Conversation',   icon: MessageSquare,   badge: null },
  { id: 'dashboard',    label: 'Dashboard',      icon: LayoutDashboard, badge: null },
  { id: 'knowledge',    label: 'Knowledge Base', icon: FileText,        badge: null },
  { id: 'safety',       label: 'Compliance',     icon: ShieldCheck,     badge: null },
]

interface SidebarProps {
  onLogout: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector((state: RootState) => state.ui.activeTab)
  const activeChatId = useAppSelector((state: RootState) => state.chat.activeChatId)
  const sidebarOpen = useAppSelector((state: RootState) => state.ui.sidebarOpen)
  const profileOpen = useAppSelector((state: RootState) => state.ui.profileOpen)
  const historyVisible = useAppSelector((state: RootState) => state.ui.historyVisible)
  const chatHistory = useAppSelector((state: RootState) => state.chat.chatHistory)
  const knowledgeDocs = useAppSelector((state: RootState) => state.knowledge.documents)
  
  const profileRef = useRef<HTMLDivElement>(null)

  /* Close popup when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        dispatch(setProfileOpen(false))
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dispatch])

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 md:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      {/* Sidebar shell */}
      <aside
        className={[
          'fixed md:static inset-y-0 left-0 z-50',
          'flex flex-col w-full h-screen',
          'border-r border-borderGrey bg-cards text-text',
          'transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        ].join(' ')}
      >

        {/* Logo */}
        <div className="px-6 pt-7 pb-3 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="w-7 h-7 flex items-center justify-center shrink-0 mr-1.5 bg-darkPurple">
              <div className="w-3.5 h-3.5 bg-corePurple" />
            </div>
            <span className="text-[22px] font-extrabold text-text tracking-tight leading-none">
              Chef
            </span>
            <span className="text-[22px] font-bold text-corePurple tracking-tight leading-none">
              GPT
            </span>
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] mt-1.5 text-darkGrey">
            Kitchen Intelligence V2
          </p>
        </div>

        <div className="px-6 pt-4 pb-1.5 mb-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-darkGrey">
            Workspace
          </p>
        </div>

        {/* Nav items */}
        <nav className="pb-2">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id
            const badge = id === 'knowledge' && knowledgeDocs.length > 0 ? String(knowledgeDocs.length) : null
            return (
              <button
                key={id}
                onClick={() => { 
                  dispatch(setActiveTab(id as 'conversation' | 'dashboard' | 'knowledge' | 'safety'))
                  dispatch(setSidebarOpen(false))
                }}
                className={[
                  'w-full flex items-center justify-between px-6 py-2.5',
                  'text-left border-l-[3px] transition-all duration-150',
                  active
                    ? 'border-l-corePurple bg-background text-corePurple'
                    : 'border-l-transparent text-darkGrey hover:bg-background',
                ].join(' ')}
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} />
                  <span className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
                    {label}
                  </span>
                </span>
                {badge && (
                  <span className="text-[11px] font-bold px-1.5 py-0.5 bg-yellow-500 text-black">
                    {badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Chat History */}
        <button
          onClick={() => dispatch(toggleHistoryVisible())}
          className="w-full flex items-center justify-between px-6 pt-5 pb-1 mt-2 group mb-3"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-darkGrey">
            Chat History
          </p>
          <ChevronDown
            size={14}
            className={[
              'text-darkGrey transition-transform duration-200',
              historyVisible ? 'rotate-0' : '-rotate-90',
            ].join(' ')}
          />
        </button>
        <div
          className={[
            'overflow-y-auto pl-4 pb-2 hide-scrollbar',
            'transition-all duration-200',
            historyVisible ? 'flex-1 opacity-100' : 'max-h-0 opacity-0 overflow-hidden',
          ].join(' ')}
        >
          {chatHistory.map(({ period, items }) => (
            <div key={period} className="mb-5">
              <p className="text-[10px] font-semibold px-2 py-1.5 text-darkGrey">
                {period}
              </p>
              {items.map(({ id, label }) => {
                const active = activeChatId === id
                return (
                  <button
                    key={id}
                    onClick={() => {
                      dispatch(setActiveChatId(id))
                      dispatch(setActiveTab('conversation'))
                      dispatch(setSidebarOpen(false))
                    }}
                    className={[
                      'w-full flex items-center justify-between gap-1',
                      'px-2 py-1.5 text-[12px] text-left',
                      'transition-all duration-150',
                      active
                        ? 'bg-background text-text font-medium'
                        : 'text-darkGrey hover:bg-background',
                    ].join(' ')}
                  >
                    <span className="truncate">{label}</span>
                    {active && <ChevronRight size={12} className="shrink-0 opacity-50 mr-4" />}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto py-5 px-2 border-t border-borderGrey">
          <div className="relative w-full" ref={profileRef}>

            {profileOpen && (
              <ProfileModal
                onLogout={onLogout}
              />
            )}

            <button
              onClick={() => dispatch(setProfileOpen(!profileOpen))}
              className="w-full flex items-center gap-2.5 py-2 px-1 hover:opacity-80 transition-opacity duration-150"
            >
              <div className={[
                'w-8 h-8 flex items-center justify-center shrink-0 bg-darkPurple',
                'transition-all duration-150',
                profileOpen ? 'ring-2 ring-corePurple' : '',
              ].join(' ')}>
                <User size={16} className="text-corePurple" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[13px] font-semibold truncate text-text">
                  chef@restaurant.com
                </p>
                <p className="text-[11px] text-darkGrey">Head Chef</p>
              </div>
              <ChevronRight
                size={14}
                className={[
                  'text-darkGrey shrink-0 transition-transform duration-200 mr-3',
                  profileOpen ? '-rotate-90' : 'rotate-90',
                ].join(' ')}
              />
            </button>

          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar