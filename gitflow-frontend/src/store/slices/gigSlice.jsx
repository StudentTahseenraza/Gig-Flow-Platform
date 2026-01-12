import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchGigs = createAsyncThunk(
  'gigs/fetchGigs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/gigs')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const createGig = createAsyncThunk(
  'gigs/createGig',
  async (gigData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/gigs', gigData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const gigSlice = createSlice({
  name: 'gigs',
  initialState: {
    gigs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false
        state.gigs = action.payload.gigs
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch gigs'
      })
      .addCase(createGig.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.loading = false
        state.gigs.unshift(action.payload)
      })
      .addCase(createGig.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to create gig'
      })
  },
})

export const { clearError } = gigSlice.actions
export default gigSlice.reducer