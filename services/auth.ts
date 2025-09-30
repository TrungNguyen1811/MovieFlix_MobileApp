import { account } from '@/services/appwrite'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface SignUpArgs {
  userId: string
  email: string
  password: string
}
export interface AccountData {
  userId: string
  email: string
  password: string
}

// API call
export const SignUp = createAsyncThunk<AccountData, SignUpArgs>(
  'auth/SignUp',
  async (args, { rejectWithValue }) => {
    try {
      await account.create({
        userId: args.userId,
        email: args.email,
        password: args.password,
      })

      const data: AccountData = {
        userId: args.userId,
        email: args.email,
        password: args.password,
      }
      return data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
