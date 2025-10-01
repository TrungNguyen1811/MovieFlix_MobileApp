import { createAsyncThunk } from '@reduxjs/toolkit'
import { ID } from 'react-native-appwrite'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as WebBrowser from 'expo-web-browser'

import { UserState } from '@/features/auth/authSlice'

import { account } from '@/services/appwrite'
import { createRequestToken, createSession } from '@/services/tmdb'

interface SignUpArgs {
  email: string
  password: string
}

interface LoginArgs {
  email: string
  password: string
}

export const signUp = createAsyncThunk<void, SignUpArgs>(
  'auth/signUp',
  async (args, { rejectWithValue }) => {
    try {
      await account.create({
        userId: ID.unique(),
        email: args.email,
        password: args.password,
      })

      const tokenRes = await createRequestToken()
      const requestToken = tokenRes.request_token

      await WebBrowser.openBrowserAsync(
        `https://www.themoviedb.org/authenticate/${requestToken}`
      )

      const sessionRes = await createSession(requestToken)
      const sessionId = sessionRes.session_id

      await account.updatePrefs({ tmdbSession: sessionId })
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const login = createAsyncThunk<UserState, LoginArgs>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const session = await account.createEmailPasswordSession(email, password)

      await AsyncStorage.setItem('sessionId', session.$id)

      const user = await account.get()

      return {
        userId: user.$id,
        email: user.email,
        tmdbSessionId: user.prefs.tmdbSessionId ?? '',
      }
    } catch (err: any) {
      return rejectWithValue(err.toString())
    }
  }
)

export const restoreUser = createAsyncThunk<UserState>(
  'auth/restoreUser',
  async (_, { rejectWithValue }) => {
    try {
      const sessionId = await AsyncStorage.getItem('sessionId')
      if (!sessionId) throw new Error('No session found')

      await account.getSession(sessionId)

      const user = await account.get()

      return {
        userId: user.$id,
        email: user.email,
        tmdbSessionId: user.prefs.tmdbSessionId ?? '',
      }
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await account.deleteSession('current')
    await AsyncStorage.removeItem('sessionId')
  } catch (err) {
    console.log('Logout error:', err)
  }
})
