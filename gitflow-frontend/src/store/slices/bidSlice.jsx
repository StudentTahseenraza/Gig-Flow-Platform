import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createBid = createAsyncThunk(
  'bids/createBid',
  async (bidData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/bids', bidData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const bidSlice = createSlice({
  name: 'bids',
  initialState: {
    bids: [],
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
      .addCase(createBid.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createBid.fulfilled, (state, action) => {
        state.loading = false
        state.bids.push(action.payload)
      })
      .addCase(createBid.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to create bid'
      })
  },
})

export const { clearError } = bidSlice.actions
export default bidSlice.reducer