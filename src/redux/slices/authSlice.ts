import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, User } from '../types'
import { authThunks } from '../thunks/authThunks'

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(authThunks.login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(authThunks.login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.data.user
        state.token = action.payload.data.token
      })
      .addCase(authThunks.login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Logout
    builder
      .addCase(authThunks.logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(authThunks.logout.fulfilled, () => initialState)
      .addCase(authThunks.logout.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Get Profile
    builder
      .addCase(authThunks.getProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(authThunks.getProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data
      })
      .addCase(authThunks.getProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, setUser, resetAuth } = authSlice.actions
export default authSlice.reducer
