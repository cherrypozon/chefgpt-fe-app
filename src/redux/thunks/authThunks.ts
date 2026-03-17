import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../api/authApi'
import type { LoginCredentials } from '../types'

const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      return await authApi.login(credentials)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed')
    }
  }
)

const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.logout()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Logout failed')
    }
  }
)

const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.getProfile()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to get profile')
    }
  }
)

export const authThunks = { login, logout, getProfile }
