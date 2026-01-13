import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'
import api from '../../utils/axiosConfig' // Import your configured api instance

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Use the same api instance for consistency
      await api.post('/auth/logout')
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      // Use the same api instance for consistency
      const response = await api.get('/auth/me')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    // Add a manual logout reducer for immediate UI update
    manualLogout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Registration failed'
      })
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Login failed'
      })
      .addCase(logout.pending, (state) => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        // Even if logout API fails, we still log out locally
        state.user = null
        state.isAuthenticated = false
        state.error = action.payload?.message || 'Logout failed'
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(getMe.rejected, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
      })
  },
})

export const { clearError, manualLogout } = authSlice.actions
export default authSlice.reducer