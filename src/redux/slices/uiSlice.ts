import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  // Main layout
  activeTab: 'conversation' | 'dashboard' | 'knowledge' | 'safety'
  sidebarOpen: boolean
  showBanner: boolean
  
  // Sidebar
  profileOpen: boolean
  historyVisible: boolean
  
  // Conversation
  input: string
  modelOpen: boolean
  attachedFiles: string[]
  isRecording: boolean
  activeArtifact: { id: number; text: string; title: string } | null
  
  // Knowledge
  isDragging: boolean
  
  // Compliance
  activeModal: 'report' | 'history' | 'log' | null
}

const initialState: UIState = {
  // Main layout
  activeTab: 'conversation',
  sidebarOpen: false,
  showBanner: true,
  
  // Sidebar
  profileOpen: false,
  historyVisible: true,
  
  // Conversation
  input: '',
  modelOpen: false,
  attachedFiles: [],
  isRecording: false,
  activeArtifact: null,
  
  // Knowledge
  isDragging: false,
  
  // Compliance
  activeModal: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Main layout
    setActiveTab: (state, action: PayloadAction<UIState['activeTab']>) => {
      state.activeTab = action.payload
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setShowBanner: (state, action: PayloadAction<boolean>) => {
      state.showBanner = action.payload
    },
    dismissBanner: (state) => {
      state.showBanner = false
    },
    
    // Sidebar
    setProfileOpen: (state, action: PayloadAction<boolean>) => {
      state.profileOpen = action.payload
    },
    toggleProfile: (state) => {
      state.profileOpen = !state.profileOpen
    },
    setHistoryVisible: (state, action: PayloadAction<boolean>) => {
      state.historyVisible = action.payload
    },
    toggleHistoryVisible: (state) => {
      state.historyVisible = !state.historyVisible
    },
    
    // Conversation
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload
    },
    clearInput: (state) => {
      state.input = ''
    },
    setModelOpen: (state, action: PayloadAction<boolean>) => {
      state.modelOpen = action.payload
    },
    toggleModelOpen: (state) => {
      state.modelOpen = !state.modelOpen
    },
    addAttachedFile: (state, action: PayloadAction<string>) => {
      state.attachedFiles.push(action.payload)
    },
    addAttachedFiles: (state, action: PayloadAction<string[]>) => {
      state.attachedFiles.push(...action.payload)
    },
    removeAttachedFile: (state, action: PayloadAction<string>) => {
      state.attachedFiles = state.attachedFiles.filter(f => f !== action.payload)
    },
    clearAttachedFiles: (state) => {
      state.attachedFiles = []
    },
    setIsRecording: (state, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload
    },
    toggleRecording: (state) => {
      state.isRecording = !state.isRecording
    },
    setActiveArtifact: (state, action: PayloadAction<UIState['activeArtifact']>) => {
      state.activeArtifact = action.payload
    },
    clearActiveArtifact: (state) => {
      state.activeArtifact = null
    },
    
    // Knowledge
    setIsDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload
    },
    
    // Compliance
    setActiveModal: (state, action: PayloadAction<UIState['activeModal']>) => {
      state.activeModal = action.payload
    },
    closeModal: (state) => {
      state.activeModal = null
    },
    
    // Reset
    resetUI: () => initialState,
  },
})

export const {
  // Main layout
  setActiveTab,
  setSidebarOpen,
  toggleSidebar,
  setShowBanner,
  dismissBanner,
  
  // Sidebar
  setProfileOpen,
  toggleProfile,
  setHistoryVisible,
  toggleHistoryVisible,
  
  // Conversation
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
  
  // Knowledge
  setIsDragging,
  
  // Compliance
  setActiveModal,
  closeModal,
  
  // Reset
  resetUI,
} = uiSlice.actions

export default uiSlice.reducer
