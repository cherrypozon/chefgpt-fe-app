import { createAsyncThunk } from '@reduxjs/toolkit'
import { complianceApi } from '../api/complianceApi'
import type { LogCheckRequest } from '../types'

const fetchStats = createAsyncThunk(
  'compliance/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await complianceApi.getStats()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch compliance stats')
    }
  }
)

const fetchSafetyChecks = createAsyncThunk(
  'compliance/fetchSafetyChecks',
  async (_, { rejectWithValue }) => {
    try {
      return await complianceApi.getSafetyChecks()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch safety checks')
    }
  }
)

const fetchSafetyTasks = createAsyncThunk(
  'compliance/fetchSafetyTasks',
  async (_, { rejectWithValue }) => {
    try {
      return await complianceApi.getSafetyTasks()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch safety tasks')
    }
  }
)

const logCheck = createAsyncThunk(
  'compliance/logCheck',
  async (request: LogCheckRequest, { rejectWithValue }) => {
    try {
      return await complianceApi.logCheck(request)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to log check')
    }
  }
)

const generateReport = createAsyncThunk(
  'compliance/generateReport',
  async ({ dateRange, reportType }: { dateRange: string; reportType: string }, { rejectWithValue }) => {
    try {
      return await complianceApi.generateReport(dateRange, reportType)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to generate report')
    }
  }
)

const fetchReportTypes = createAsyncThunk(
  'compliance/fetchReportTypes',
  async (_, { rejectWithValue }) => {
    try {
      return await complianceApi.getReportTypes()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch report types')
    }
  }
)

const fetchDateRanges = createAsyncThunk(
  'compliance/fetchDateRanges',
  async (_, { rejectWithValue }) => {
    try {
      return await complianceApi.getDateRanges()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch date ranges')
    }
  }
)

export const complianceThunks = { 
  fetchStats, 
  fetchSafetyChecks, 
  fetchSafetyTasks, 
  logCheck, 
  generateReport, 
  fetchReportTypes, 
  fetchDateRanges 
}
