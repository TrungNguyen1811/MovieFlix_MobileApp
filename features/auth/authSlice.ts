import { SignUp } from '@/services/auth'
import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  userId: string | null
  email: string
  password: string
  tmdbSessionId?: string
}

const UserState: UserState = {
  userId: null,
  email: '',
  password: '',
  tmdbSessionId: '',
}

interface AuthState {
  user: UserState
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AuthState = {
  user: UserState || null,
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as string | null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignUp.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(SignUp.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export const {} = authSlice.actions

export default authSlice.reducer
