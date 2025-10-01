import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { Stack } from 'expo-router'

import { store } from '@/store/store'
import { restoreUser } from '@/services/auth'

import { useAppDispatch } from '@/hooks/hooks'

import './global.css'

function RootLayoutInner() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(restoreUser())
  }, [dispatch])

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='movies/[id]' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)' options={{ headerShown: false }} />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutInner />
    </Provider>
  )
}
