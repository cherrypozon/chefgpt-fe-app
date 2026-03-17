import { createAsyncThunk } from '@reduxjs/toolkit'
import { chatApi } from '../api/chatApi'
import type { SendMessageRequest } from '../types'

const fetchChatHistory = createAsyncThunk(
  'chat/fetchChatHistory',
  async (_, { rejectWithValue }) => {
    try {
      return await chatApi.getChatHistory()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch chat history')
    }
  }
)

const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (chatId: string, { rejectWithValue }) => {
    try {
      return await chatApi.getMessages(chatId)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch messages')
    }
  }
)

const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (request: SendMessageRequest, { rejectWithValue }) => {
    try {
      return await chatApi.sendMessage(request)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to send message')
    }
  }
)

const fetchModels = createAsyncThunk(
  'chat/fetchModels',
  async (_, { rejectWithValue }) => {
    try {
      return await chatApi.getModels()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch models')
    }
  }
)

const fetchShortcuts = createAsyncThunk(
  'chat/fetchShortcuts',
  async (_, { rejectWithValue }) => {
    try {
      return await chatApi.getShortcuts()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch shortcuts')
    }
  }
)

export const chatThunks = { fetchChatHistory, fetchMessages, sendMessage, fetchModels, fetchShortcuts }
