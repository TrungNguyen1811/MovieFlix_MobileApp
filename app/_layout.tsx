import { store } from '@/store/store'
import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import './global.css'

export default function RootLayout() {
  return (
    <>
      <Provider store={store}>
        {/* <StatusBar hidden={true} /> */}
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='movies/[id]' options={{ headerShown: false }} />
          <Stack.Screen name='login' options={{ headerShown: false }} />
          <Stack.Screen name='signup' options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </>
  )
}

