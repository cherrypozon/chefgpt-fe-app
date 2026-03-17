import { createAsyncThunk } from '@reduxjs/toolkit'
import { dashboardApi } from '../api/dashboardApi'

const fetchStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardApi.getStats()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch stats')
    }
  }
)

const fetchWasteData = createAsyncThunk(
  'dashboard/fetchWasteData',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardApi.getWasteData()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch waste data')
    }
  }
)

const fetchDemographics = createAsyncThunk(
  'dashboard/fetchDemographics',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardApi.getDemographics()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch demographics')
    }
  }
)

const fetchCoversData = createAsyncThunk(
  'dashboard/fetchCoversData',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardApi.getCoversData()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch covers data')
    }
  }
)

const fetchWasteTrend = createAsyncThunk(
  'dashboard/fetchWasteTrend',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardApi.getWasteTrend()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch waste trend')
    }
  }
)

const fetchTopDishes = createAsyncThunk(
  'dashboard/fetchTopDishes',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardApi.getTopDishes()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch top dishes')
    }
  }
)

const fetchAllData = createAsyncThunk(
  'dashboard/fetchAllData',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardApi.getAllDashboardData()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch dashboard data')
    }
  }
)

export const dashboardThunks = { 
  fetchStats, 
  fetchWasteData, 
  fetchDemographics, 
  fetchCoversData, 
  fetchWasteTrend, 
  fetchTopDishes, 
  fetchAllData 
}
