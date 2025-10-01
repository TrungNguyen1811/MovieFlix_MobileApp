import { Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { logout } from '@/services/auth'
import { Link } from 'expo-router'

import { useAppDispatch, useAppSelector } from '@/hooks/hooks'

export default function Profile() {
  const { user } = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    await dispatch(logout())
  }

  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      <Text className='text-xl font-bold mb-4'>Profile</Text>

      {user ? (
        <>
          <Text className='mb-2'>Email: {user.email}</Text>
          <Button title='Logout' onPress={handleLogout} />
        </>
      ) : (
        <Link href='/(auth)/login'>
          <Text className='text-blue-500 underline'>Login</Text>
        </Link>
      )}
    </SafeAreaView>
  )
}
