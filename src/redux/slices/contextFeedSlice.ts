import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ContextFeedState } from '../types'
import { contextFeedThunks } from '../thunks/contextFeedThunks'

const initialState: ContextFeedState = {
  events: [],
  dishFeedback: [],
  guestMix: [],
  contextSources: [],
  alerts: [],
  isLoading: false,
  error: null,
}

const contextFeedSlice = createSlice({
  name: 'contextFeed',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(a => a.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    // Fetch All Context Feed
    builder
      .addCase(contextFeedThunks.fetchAllContextFeed.pending, (state) => {
        state.isLoading = true
      })
      .addCase(contextFeedThunks.fetchAllContextFeed.fulfilled, (state, action) => {
        state.isLoading = false
        state.events = action.payload.data.events
        state.dishFeedback = action.payload.data.dishFeedback
        state.guestMix = action.payload.data.guestMix
        state.contextSources = action.payload.data.contextSources
        state.alerts = action.payload.data.alerts
      })
      .addCase(contextFeedThunks.fetchAllContextFeed.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Individual fetches
    builder
      .addCase(contextFeedThunks.fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload.data
      })
      .addCase(contextFeedThunks.fetchDishFeedback.fulfilled, (state, action) => {
        state.dishFeedback = action.payload.data
      })
      .addCase(contextFeedThunks.fetchGuestMix.fulfilled, (state, action) => {
        state.guestMix = action.payload.data
      })
      .addCase(contextFeedThunks.fetchContextSources.fulfilled, (state, action) => {
        state.contextSources = action.payload.data
      })
      .addCase(contextFeedThunks.fetchAlerts.fulfilled, (state, action) => {
        state.alerts = action.payload.data
      })

    // Dismiss Alert
    builder
      .addCase(contextFeedThunks.dismissAlert.fulfilled, (state, action) => {
        state.alerts = state.alerts.filter(a => a.id !== action.meta.arg)
      })
  },
})

export const { clearError, removeAlert } = contextFeedSlice.actions
export default contextFeedSlice.reducer
