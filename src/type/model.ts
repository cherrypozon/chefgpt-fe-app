import type { LucideIcon } from 'lucide-react'

export interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  activeChatId: string
  setActiveChatId: (id: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  onLogout: () => void
}

export interface Message {
  id: number
  sender: 'user' | 'ai'
  text: string
  isArtifact: boolean
  title?: string
}

export interface Artifact {
  id: number
  text: string
  title: string
}

export interface ConversationProps {
  activeChatId: string
}

export interface Shortcut {
  icon: LucideIcon
  text: string
  iconClassName?: string
}

export interface ContextTag {
  icon: string
  text: string
  isMore?: boolean
}

export interface ChatArtifactModalProps {
  artifact: Artifact
  onClose: () => void
}

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  badge: string | null
}

export interface ChatItem {
  id: string
  label: string
}

export interface ChatGroup {
  period: string
  items: ChatItem[]
}

export interface StatItem {
  label: string
  value: string
  sub: string
  color: string
}

export interface WasteDataItem {
  name: string
  value: number
  fill: string
}

export interface DemographicItem {
  name: string
  value: number
  color: string
}

export interface CoversDataItem {
  day: number
  actual: number
  forecast: number
}

export interface WasteTrendItem {
  week: number
  rate: number
}

export interface TopDishItem {
  name: string
  rating: number
  color: string
}

export interface TooltipStyle {
  backgroundColor: string
  borderColor: string
  color: string
  fontSize: number
}

export interface KnowledgeDoc {
  id: number
  name: string
  size: string
  date: string
  tags: string[]
}

export interface SafetyCheck {
  id: number
  taskId: string
  task: string
  desc: string
  date: string
  status: 'pass' | 'warning' | 'fail'
  checkedBy: string
  check?: string
}

export interface ComplianceStatItem {
  label: string
  value: string
  textColor: string
  bgColor: string
  borderColor: string
}

export interface StatusConfig {
  textColor: string
  bgColor: string
  Icon: React.ComponentType<{ size?: number }>
}

export interface HeaderBadge {
  text: string
  variant: 'success' | 'warning'
}

export interface HeaderProps {
  title: string
  subtitle: string
  badges?: HeaderBadge[]
  showDate?: boolean
  rightContent?: React.ReactNode
}
