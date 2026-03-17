import { createAsyncThunk } from '@reduxjs/toolkit'
import { contextFeedApi } from '../api/contextFeedApi'

const fetchEvents = createAsyncThunk(
  'contextFeed/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      return await contextFeedApi.getEvents()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch events')
    }
  }
)

const fetchDishFeedback = createAsyncThunk(
  'contextFeed/fetchDishFeedback',
  async (_, { rejectWithValue }) => {
    try {
      return await contextFeedApi.getDishFeedback()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch dish feedback')
    }
  }
)

const fetchGuestMix = createAsyncThunk(
  'contextFeed/fetchGuestMix',
  async (_, { rejectWithValue }) => {
    try {
      return await contextFeedApi.getGuestMix()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch guest mix')
    }
  }
)

const fetchContextSources = createAsyncThunk(
  'contextFeed/fetchContextSources',
  async (_, { rejectWithValue }) => {
    try {
      return await contextFeedApi.getContextSources()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch context sources')
    }
  }
)

const fetchAlerts = createAsyncThunk(
  'contextFeed/fetchAlerts',
  async (_, { rejectWithValue }) => {
    try {
      return await contextFeedApi.getAlerts()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch alerts')
    }
  }
)

const dismissAlert = createAsyncThunk(
  'contextFeed/dismissAlert',
  async (alertId: string, { rejectWithValue }) => {
    try {
      return await contextFeedApi.dismissAlert(alertId)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to dismiss alert')
    }
  }
)

const fetchAllContextFeed = createAsyncThunk(
  'contextFeed/fetchAllContextFeed',
  async (_, { rejectWithValue }) => {
    try {
      return await contextFeedApi.getAllContextFeed()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch context feed')
    }
  }
)

export const contextFeedThunks = { 
  fetchEvents, 
  fetchDishFeedback, 
  fetchGuestMix, 
  fetchContextSources, 
  fetchAlerts, 
  dismissAlert, 
  fetchAllContextFeed 
}
