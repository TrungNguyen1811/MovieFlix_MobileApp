import { createSlice } from '@reduxjs/toolkit'
import { login, logout, restoreUser, signUp } from '@/services/auth'

export interface UserState {
  userId: string
  name?: string
  email: string
  tmdbSessionId: string
}

export interface AuthState {
  user: UserState | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(restoreUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(restoreUser.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.error = action.payload as string
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.loading = false
        state.error = null
      })
  },
})

export default authSlice.reducer
