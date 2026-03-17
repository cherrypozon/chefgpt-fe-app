import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ChatState, Message, Model } from '../types'
import { chatThunks } from '../thunks/chatThunks'

const initialState: ChatState = {
  chatHistory: [],
  activeChatId: 'chat-1',
  messages: [],
  models: [],
  shortcuts: [],
  selectedModel: null,
  pendingArtifact: null,
  isTyping: false,
  isLoading: false,
  error: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChatId: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload
    },
    setSelectedModel: (state, action: PayloadAction<Model>) => {
      state.selectedModel = action.payload
    },
    setIsTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    clearMessages: (state) => {
      state.messages = []
    },
    clearPendingArtifact: (state) => {
      state.pendingArtifact = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch Chat History
    builder
      .addCase(chatThunks.fetchChatHistory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(chatThunks.fetchChatHistory.fulfilled, (state, action) => {
        state.isLoading = false
        state.chatHistory = action.payload.data
      })
      .addCase(chatThunks.fetchChatHistory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Fetch Messages
    builder
      .addCase(chatThunks.fetchMessages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(chatThunks.fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.messages = action.payload.data
      })
      .addCase(chatThunks.fetchMessages.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Send Message
    builder
      .addCase(chatThunks.sendMessage.pending, (state) => {
        state.isTyping = true
      })
      .addCase(chatThunks.sendMessage.fulfilled, (state, action) => {
        state.isTyping = false
        state.messages.push(action.payload.data.userMessage)
        state.messages.push(action.payload.data.aiMessage)
        // Store pending artifact to auto-show in UI
        if (action.payload.data.aiMessage.isArtifact) {
          state.pendingArtifact = {
            id: action.payload.data.aiMessage.id,
            text: action.payload.data.aiMessage.text,
            title: action.payload.data.aiMessage.artifactTitle ?? '',
          }
        }
      })
      .addCase(chatThunks.sendMessage.rejected, (state, action) => {
        state.isTyping = false
        state.error = action.payload as string
      })

    // Fetch Models
    builder
      .addCase(chatThunks.fetchModels.fulfilled, (state, action) => {
        state.models = action.payload.data
        if (!state.selectedModel && action.payload.data.length > 0) {
          state.selectedModel = action.payload.data[0]
        }
      })

    // Fetch Shortcuts
    builder
      .addCase(chatThunks.fetchShortcuts.fulfilled, (state, action) => {
        state.shortcuts = action.payload.data
      })
  },
})

export const { 
  setActiveChatId, 
  setSelectedModel, 
  setIsTyping, 
  addMessage, 
  clearMessages,
  clearPendingArtifact,
  clearError 
} = chatSlice.actions

export default chatSlice.reducer
