import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ComplianceState, SafetyCheck } from '../types'
import { complianceThunks } from '../thunks/complianceThunks'

const initialState: ComplianceState = {
  stats: [],
  safetyChecks: [],
  safetyTasks: [],
  reportTypes: [],
  dateRanges: [],
  selectedCheck: null,
  isGeneratingReport: false,
  isLoading: false,
  error: null,
}

const complianceSlice = createSlice({
  name: 'compliance',
  initialState,
  reducers: {
    setSelectedCheck: (state, action: PayloadAction<SafetyCheck | null>) => {
      state.selectedCheck = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch Stats
    builder
      .addCase(complianceThunks.fetchStats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(complianceThunks.fetchStats.fulfilled, (state, action) => {
        state.isLoading = false
        state.stats = action.payload.data
      })
      .addCase(complianceThunks.fetchStats.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Fetch Safety Checks
    builder
      .addCase(complianceThunks.fetchSafetyChecks.fulfilled, (state, action) => {
        state.safetyChecks = action.payload.data
      })

    // Fetch Safety Tasks
    builder
      .addCase(complianceThunks.fetchSafetyTasks.fulfilled, (state, action) => {
        state.safetyTasks = action.payload.data
      })

    // Log Check
    builder
      .addCase(complianceThunks.logCheck.pending, (state) => {
        state.isLoading = true
      })
      .addCase(complianceThunks.logCheck.fulfilled, (state, action) => {
        state.isLoading = false
        state.safetyChecks.unshift(action.payload.data)
      })
      .addCase(complianceThunks.logCheck.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Generate Report
    builder
      .addCase(complianceThunks.generateReport.pending, (state) => {
        state.isGeneratingReport = true
      })
      .addCase(complianceThunks.generateReport.fulfilled, (state) => {
        state.isGeneratingReport = false
      })
      .addCase(complianceThunks.generateReport.rejected, (state, action) => {
        state.isGeneratingReport = false
        state.error = action.payload as string
      })

    // Fetch Report Types
    builder
      .addCase(complianceThunks.fetchReportTypes.fulfilled, (state, action) => {
        state.reportTypes = action.payload.data
      })

    // Fetch Date Ranges
    builder
      .addCase(complianceThunks.fetchDateRanges.fulfilled, (state, action) => {
        state.dateRanges = action.payload.data
      })
  },
})

export const { setSelectedCheck, clearError } = complianceSlice.actions
export default complianceSlice.reducer
