import type React from 'react'
import { MessageSquare, LayoutDashboard, FileText, ShieldCheck, AlertTriangle } from 'lucide-react'
import type { NavItem, ChatGroup, Message, Shortcut, ContextTag } from '../type/model'

export const NAV_ITEMS: NavItem[] = [
  { id: 'conversation', label: 'Conversation',   icon: MessageSquare,   badge: null },
  { id: 'dashboard',    label: 'Dashboard',      icon: LayoutDashboard, badge: null },
  { id: 'knowledge',    label: 'Knowledge Base', icon: FileText,        badge: '6'  },
  { id: 'safety',       label: 'Compliance',     icon: ShieldCheck,     badge: null },
]

export const CHAT_HISTORY: ChatGroup[] = [
  {
    period: 'Today',
    items: [{ id: 'chat-1', label: "Optimize tonight's menu" }],
  },
  {
    period: 'Previous 7 Days',
    items: [
      { id: 'chat-2', label: 'Generate PO for weekend'   },
      { id: 'chat-3', label: 'Analyze Papaitan waste'    },
      { id: 'chat-4', label: 'Staff scheduling conflict' },
    ],
  },
  {
    period: 'Previous 30 Days',
    items: [
      { id: 'chat-5', label: 'New vegan dessert ideas'     },
      { id: 'chat-6', label: 'Supplier negotiation points' },
    ],
  },
]

export const CHAT_HISTORY_DATA: Record<string, Message[]> = {
  'chat-1': [
    {
      id: 1,
      sender: 'ai',
      isArtifact: false,
      text: "Good morning, Chef! I've loaded your context for today. Here's your briefing:\n\n📅 Tonight's forecast: 340 F&B covers expected (↑18% vs last week)\n🎵 Nearby event: Music festival at SM Mall of Asia (~5,000 attendees)\n🌍 Guest mix today: 42% Filipino, 28% Korean, 18% American\n⚠️ High-waste alert: Callos (83%) and Papaitan (81%) flagged\n\nWhat would you like to focus on today?",
    },
  ],
  'chat-2': [
    {
      id: 1,
      sender: 'ai',
      isArtifact: false,
      text: "I'll help you generate a purchase order for the weekend. Let me pull the current inventory levels and projected demand.",
    },
  ],
  'chat-3': [
    {
      id: 1,
      sender: 'ai',
      isArtifact: false,
      text: "Let's analyze the Papaitan waste patterns. Based on the last 7 days, Papaitan has an 81% waste rate. Here are the key contributing factors.",
    },
  ],
  'chat-4': [
    {
      id: 1,
      sender: 'ai',
      isArtifact: false,
      text: "I see there's a staff scheduling conflict. Let me review the roster and suggest adjustments.",
    },
  ],
}

export const SHORTCUTS: Shortcut[] = [
  { icon: FileText,      text: "Optimize tonight's menu" },
  { icon: AlertTriangle, text: 'Fix high-waste dishes', iconClassName: 'text-green-500' },
  { icon: FileText,      text: 'Generate PO'             },
  { icon: FileText,      text: 'Event-based suggestions' },
]

export const CONTEXT_TAGS: ContextTag[] = [
  { icon: '🗓️', text: 'Nearby Events (3 days)' },
  { icon: '⭐', text: 'Recent Dish Feedback'    },
  { icon: '👥', text: "Today's Guest Mix"        },
]
  
import type {
  StatItem, WasteDataItem, DemographicItem,
  CoversDataItem, WasteTrendItem, TopDishItem, TooltipStyle
} from '../type/model'

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

export const STATS: StatItem[] = [
  { label: "TODAY'S COVERS",    value: '340',   sub: '↑ 18% vs last week',   color: 'text-emerald-400' },
  { label: 'AVG WASTE RATE',    value: '34%',   sub: '↑ 4% — action needed', color: 'text-pink-400'    },
  { label: 'EST. WASTE COST',   value: '₱59k',  sub: 'This week',            color: 'text-amber-400'   },
  { label: 'GUEST SATISFACTION',value: '4.1/5', sub: '↑ 0.3 vs last month',  color: 'text-emerald-400' },
]

export const WASTE_DATA: WasteDataItem[] = [
  { name: 'Callos',    value: 83, fill: '#D97706' },
  { name: 'Papaitan',  value: 81, fill: '#D97706' },
  { name: 'Squash',    value: 52, fill: '#F59E0B' },
  { name: 'Pizza',     value: 38, fill: '#10B981' },
  { name: 'Menudo',    value: 29, fill: '#10B981' },
  { name: 'Kare-Kara', value: 24, fill: '#059669' },
  { name: 'Lumpia',    value: 19, fill: '#059669' },
]

export const DEMOGRAPHICS: DemographicItem[] = [
  { name: 'Filipino', value: 42, color: '#A100FF' },
  { name: 'Korean',   value: 28, color: '#D97706' },
  { name: 'American', value: 18, color: '#65A30D' },
  { name: 'Others',   value: 12, color: '#4B5563' },
]

export const COVERS_DATA: CoversDataItem[] = [
  { day: 1, actual: 200, forecast: 210 },
  { day: 2, actual: 220, forecast: 215 },
  { day: 3, actual: 250, forecast: 240 },
  { day: 4, actual: 280, forecast: 270 },
  { day: 5, actual: 310, forecast: 300 },
  { day: 6, actual: 340, forecast: 320 },
  { day: 7, actual: 350, forecast: 340 },
]

export const WASTE_TREND: WasteTrendItem[] = [
  { week: 1, rate: 28 }, { week: 2, rate: 29 },
  { week: 3, rate: 27 }, { week: 4, rate: 26 },
  { week: 5, rate: 30 }, { week: 6, rate: 34 },
]

export const TOP_DISHES: TopDishItem[] = [
  { name: 'Kare-Kare', rating: 4.8, color: '#10B981' },
  { name: 'Lumpia',    rating: 4.5, color: '#10B981' },
  { name: 'Menudo',    rating: 4.1, color: '#D97706' },
  { name: 'Squash',    rating: 3.2, color: '#D97706' },
  { name: 'Papaitan',  rating: 2.8, color: '#EF4444' },
  { name: 'Callos',    rating: 2.3, color: '#EF4444' },
]

/* ── Knowledge Constants ── */
import type { KnowledgeDoc, SafetyCheck, ComplianceStatItem } from '../type/model'
import { Check, AlertTriangle as AlertTriangleIcon, X } from 'lucide-react'

export const INITIAL_DOCS: KnowledgeDoc[] = [
  { id: 1, name: 'Cuisine Techniques Q1.pdf', size: '2.4 MB', date: 'Mar 1 2026',  tags: ['Recipes', 'Training'] },
  { id: 2, name: 'Cuisine Techniques Q2.pdf', size: '2.1 MB', date: 'Mar 3 2026',  tags: ['Recipes', 'Training'] },
  { id: 3, name: 'Cuisine Techniques Q3.pdf', size: '1.9 MB', date: 'Mar 5 2026',  tags: ['Recipes', 'Training'] },
  { id: 4, name: 'Cuisine Techniques Q4.pdf', size: '2.3 MB', date: 'Mar 8 2026',  tags: ['Recipes', 'Training'] },
  { id: 5, name: 'Cuisine Techniques Q5.pdf', size: '1.7 MB', date: 'Mar 10 2026', tags: ['Recipes', 'Training'] },
]

/* ── Compliance Constants ── */
export const SAFETY_CHECKS: SafetyCheck[] = [
  { id: 1, task: 'Cold Storage Temperature',     desc: 'All refrigeration units must be between 1°C and 4°C.',          date: 'Today 06:00',   status: 'pass'    },
  { id: 2, task: 'Hot Holding Temperature',       desc: 'Hot food must be held at 60°C or above before service.',        date: 'Today 08:30',   status: 'pass'    },
  { id: 3, task: 'Hand Hygiene Station Check',    desc: 'All stations must be stocked with soap and sanitizer.',          date: 'Today 07:00',   status: 'warning' },
  { id: 4, task: 'Pest Control Inspection',       desc: 'Monthly inspection by licensed pest control provider.',          date: 'Mar 01 2026',   status: 'pass'    },
  { id: 5, task: 'Cross-Contamination Protocol',  desc: 'Allergen separation procedures must be followed at all times.',  date: 'Today 09:00',   status: 'fail'    },
  { id: 6, task: 'Supplier Delivery Inspection',  desc: 'Incoming goods must be checked for temperature and labelling.',  date: 'Today 07:45',   status: 'warning' },
]

export const COMPLIANCE_STATS: ComplianceStatItem[] = [
  { label: 'PASSING',  value: '24', textColor: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500' },
  { label: 'WARNINGS', value: '3',  textColor: 'text-amber-400',   bgColor: 'bg-amber-500/10',   borderColor: 'border-amber-500'   },
  { label: 'FAILED',   value: '1',  textColor: 'text-red-400',     bgColor: 'bg-red-500/10',     borderColor: 'border-red-500'     },
]

export const STATUS_CONFIG: Record<SafetyCheck['status'], { textColor: string; bgColor: string; Icon: React.ComponentType<{ size?: number }> }> = {
  pass:    { textColor: 'text-emerald-400', bgColor: 'bg-emerald-500/10', Icon: Check            },
  warning: { textColor: 'text-amber-400',   bgColor: 'bg-amber-500/10',   Icon: AlertTriangleIcon },
  fail:    { textColor: 'text-red-400',     bgColor: 'bg-red-500/10',     Icon: X                },
}

export const MODELS = [
  { id: 'orchestrator', label: 'ChefGPT Orchestrator', desc: 'Full agent pipeline'  },
  { id: 'specialist',   label: 'Specialist Agent',      desc: 'Single domain focus'  },
  { id: 'fast',         label: 'ChefGPT Fast',          desc: 'Quick responses'      },
]
