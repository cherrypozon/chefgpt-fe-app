// Store
export { store, type RootState, type AppDispatch } from './store'

// Hooks
export { useAppDispatch, useAppSelector } from './hooks'

// Thunks
export { authThunks } from './thunks/authThunks'
export { chatThunks } from './thunks/chatThunks'
export { dashboardThunks } from './thunks/dashboardThunks'
export { knowledgeThunks } from './thunks/knowledgeThunks'
export { complianceThunks } from './thunks/complianceThunks'
export { contextFeedThunks } from './thunks/contextFeedThunks'

// Slice Actions - Auth
export { clearError as clearAuthError, setUser, resetAuth } from './slices/authSlice'

// Slice Actions - Chat
export { 
  setActiveChatId, 
  setSelectedModel, 
  setIsTyping, 
  addMessage, 
  clearMessages,
  clearPendingArtifact,
  clearError as clearChatError 
} from './slices/chatSlice'

// Slice Actions - Dashboard
export { clearError as clearDashboardError } from './slices/dashboardSlice'

// Slice Actions - Knowledge
export { 
  setSelectedDocument, 
  setSearchQuery, 
  clearError as clearKnowledgeError,
  updateDocumentStatus 
} from './slices/knowledgeSlice'

// Slice Actions - Compliance
export { setSelectedCheck, clearError as clearComplianceError } from './slices/complianceSlice'

// Slice Actions - Context Feed
export { clearError as clearContextFeedError, removeAlert } from './slices/contextFeedSlice'

// Slice Actions - UI
export { 
  setActiveTab,
  setSidebarOpen,
  toggleSidebar,
  setShowBanner,
  dismissBanner,
  toggleProfile,
  setProfileOpen,
  toggleHistoryVisible,
  setHistoryVisible,
  setInput,
  clearInput,
  setModelOpen,
  toggleModelOpen,
  addAttachedFile,
  addAttachedFiles,
  removeAttachedFile,
  clearAttachedFiles,
  setIsRecording,
  toggleRecording,
  setActiveArtifact,
  clearActiveArtifact,
  setIsDragging,
  setActiveModal,
  closeModal,
  resetUI,
} from './slices/uiSlice'

// Types
export type * from './types'
