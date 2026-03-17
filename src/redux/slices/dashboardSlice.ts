import { createSlice } from '@reduxjs/toolkit'
import type { DashboardState } from '../types'
import { dashboardThunks } from '../thunks/dashboardThunks'

const initialState: DashboardState = {
  stats: [],
  wasteData: [],
  demographics: null,
  coversData: [],
  wasteTrend: [],
  topDishes: [],
  isLoading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch All Dashboard Data
    builder
      .addCase(dashboardThunks.fetchAllData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(dashboardThunks.fetchAllData.fulfilled, (state, action) => {
        state.isLoading = false
        state.stats = action.payload.data.stats
        state.wasteData = action.payload.data.wasteData
        state.demographics = action.payload.data.demographics
        state.coversData = action.payload.data.coversData
        state.wasteTrend = action.payload.data.wasteTrend
        state.topDishes = action.payload.data.topDishes
      })
      .addCase(dashboardThunks.fetchAllData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Individual fetches
    builder
      .addCase(dashboardThunks.fetchStats.fulfilled, (state, action) => {
        state.stats = action.payload.data
      })
      .addCase(dashboardThunks.fetchWasteData.fulfilled, (state, action) => {
        state.wasteData = action.payload.data
      })
      .addCase(dashboardThunks.fetchDemographics.fulfilled, (state, action) => {
        state.demographics = action.payload.data
      })
      .addCase(dashboardThunks.fetchCoversData.fulfilled, (state, action) => {
        state.coversData = action.payload.data
      })
      .addCase(dashboardThunks.fetchWasteTrend.fulfilled, (state, action) => {
        state.wasteTrend = action.payload.data
      })
      .addCase(dashboardThunks.fetchTopDishes.fulfilled, (state, action) => {
        state.topDishes = action.payload.data
      })
  },
})

export const { clearError } = dashboardSlice.actions
export default dashboardSlice.reducer
