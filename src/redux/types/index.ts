// ═══════════════════════════════════════════════════════════════
// AUTH TYPES
// ═══════════════════════════════════════════════════════════════

export interface User {
  id: string
  email: string
  name: string
  role: string
  workspace: string
  avatarUrl: string | null
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  data: {
    user: User
    token: string
    expiresAt: string
  }
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// ═══════════════════════════════════════════════════════════════
// CHAT TYPES
// ═══════════════════════════════════════════════════════════════

export interface ChatItem {
  id: string
  label: string
  createdAt?: string
}

export interface ChatGroup {
  period: string
  items: ChatItem[]
}

export interface Message {
  id: number
  sender: 'user' | 'ai'
  text: string
  isArtifact: boolean
  artifactTitle?: string
  agentType?: string
  timestamp?: string
  contextSources?: string[]
}

export interface Artifact {
  id: number
  text: string
  title: string
}

export interface SendMessageRequest {
  chatId: string
  text: string
  modelId: string
  attachedFiles?: string[]
}

export interface SendMessageResponse {
  success: boolean
  data: {
    userMessage: Message
    aiMessage: Message
  }
}

export interface AgentResponse {
  text: string
  isArtifact: boolean
  artifactTitle?: string
  agentType: string
}

export interface Model {
  id: string
  label: string
  desc: string
}

export interface Shortcut {
  id: string
  icon: string
  text: string
  iconClassName?: string
}

export interface ChatState {
  chatHistory: ChatGroup[]
  activeChatId: string
  messages: Message[]
  models: Model[]
  shortcuts: Shortcut[]
  selectedModel: Model | null
  pendingArtifact: Artifact | null
  isTyping: boolean
  isLoading: boolean
  error: string | null
}

// ═══════════════════════════════════════════════════════════════
// DASHBOARD TYPES
// ═══════════════════════════════════════════════════════════════

export interface StatItem {
  label: string
  value: string
  sub: string
  trend: string
  color: string
}

export interface WasteDataItem {
  name: string
  value: number
  fill: string
  status: string
}

export interface DemographicItem {
  name: string
  value: number
  color: string
  count: number
}

export interface DemographicsData {
  totalCovers: number
  data: DemographicItem[]
}

export interface CoversDataItem {
  day: number
  date: string
  actual: number
  forecast: number
}

export interface WasteTrendItem {
  week: number
  startDate: string
  rate: number
}

export interface TopDishItem {
  id: string
  name: string
  rating: number
  reviewCount: number
  color: string
}

export interface DashboardState {
  stats: StatItem[]
  wasteData: WasteDataItem[]
  demographics: DemographicsData | null
  coversData: CoversDataItem[]
  wasteTrend: WasteTrendItem[]
  topDishes: TopDishItem[]
  isLoading: boolean
  error: string | null
}

// ═══════════════════════════════════════════════════════════════
// KNOWLEDGE BASE TYPES
// ═══════════════════════════════════════════════════════════════

export interface KnowledgeDocument {
  id: string
  name: string
  fileUrl: string
  size: string
  fileType: string
  uploadDate: string
  uploadedBy: string
  tags: string[]
  isIndexed: boolean
  chunkCount: number
  status: 'uploading' | 'chunking' | 'embedding' | 'indexing' | 'ready' | 'failed'
  date?: string
}

export interface DocumentTag {
  id: string
  name: string
}

export interface KnowledgeState {
  documents: KnowledgeDocument[]
  tags: DocumentTag[]
  selectedDocument: KnowledgeDocument | null
  searchQuery: string
  isUploading: boolean
  isLoading: boolean
  error: string | null
}

// ═══════════════════════════════════════════════════════════════
// COMPLIANCE TYPES
// ═══════════════════════════════════════════════════════════════

export interface ComplianceStat {
  label: string
  value: string
  status: 'pass' | 'warning' | 'fail'
  textColor: string
  bgColor: string
  borderColor: string
}

export interface SafetyTask {
  id: string
  name: string
  description: string
  frequency: string
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

export interface LogCheckRequest {
  taskId: string
  taskName: string
  status: 'pass' | 'warning' | 'fail'
  notes?: string
  photos?: string[]
  checkedBy: string
}

export interface ReportType {
  id: string
  label: string
}

export interface DateRange {
  id: string
  label: string
}

export interface ComplianceState {
  stats: ComplianceStat[]
  safetyChecks: SafetyCheck[]
  safetyTasks: SafetyTask[]
  reportTypes: ReportType[]
  dateRanges: DateRange[]
  selectedCheck: SafetyCheck | null
  isGeneratingReport: boolean
  isLoading: boolean
  error: string | null
}

// ═══════════════════════════════════════════════════════════════
// CONTEXT FEED TYPES
// ═══════════════════════════════════════════════════════════════

export interface Event {
  id: string
  date: string
  dateFormatted: string
  title: string
  location: string
  sub: string
  expectedCrowd: number
  impact: 'high' | 'medium' | 'low'
}

export interface DishFeedback {
  id: string
  name: string
  rating: number
  reviews: number
  trend: 'up' | 'down' | 'stable'
}

export interface GuestMix {
  label: string
  pct: number
  color: string
}

export interface ContextSource {
  id: string
  name: string
  type: string
  isActive: boolean
  lastSync: string
}

export interface Alert {
  id: string
  type: string
  message: string
  priority: 'high' | 'medium' | 'low'
  dismissible: boolean
  createdAt: string
}

export interface ContextFeedState {
  events: Event[]
  dishFeedback: DishFeedback[]
  guestMix: GuestMix[]
  contextSources: ContextSource[]
  alerts: Alert[]
  isLoading: boolean
  error: string | null
}
