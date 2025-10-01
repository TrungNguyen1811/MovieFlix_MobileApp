import {
  Text,
  Button,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { logout } from '@/services/auth'
import { Link, router } from 'expo-router'

import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { LinearGradient } from 'expo-linear-gradient'

export default function Profile() {
  const { user, loading } = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    await dispatch(logout())
  }

  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <SafeAreaView className='flex-1 relative'>
      <StatusBar />
      <Text className='text-xl font-bold mb-4'>Profile</Text>
      <Image
        source={images.bgProfile}
        className='absolute w-full z-0 blur-xl'
      />
      <Image source={images.bg} className='absolute w-full z-10 ' />

      <LinearGradient
        colors={['#000000', 'rgba(0, 0, 0, 0.80)', 'rgba(0, 0, 0, 0.15)']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{ height: '100%', position: 'relative' }}
      >
        <View className='mt-[70%] flex-col justify-center items-center'>
          <Image source={icons.logo} className='mb-16' />

          {user ? (
            <>
              <Text className='mb-2'>Email: {user.email}</Text>
              <Button title='Logout' onPress={handleLogout} />
            </>
          ) : (
            <View className='flex-col justify-center items-center gap-8 px-6'>
              <Text className='text-3xl text-white text-center'>
                Start Watching Movies For Every Mood
              </Text>
              <Text className='text-lg text-light-300 text-center'>
                Watch Limited Movies, Music Video, TV Shows, Gaming and More
              </Text>
              <View>
                <TouchableOpacity
                  onPress={() => router.push('/login')}
                  className='mt-4'
                >
                  <LinearGradient
                    colors={['#D6C6FF', '#A18CFF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      borderRadius: 36,
                      width: '100%',
                      paddingVertical: 8,
                    }}
                  >
                    <Text className='self-center text-dark-100 font-bold text-xl py-2'>
                      LOGIN NOW
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <Text className='text-white text-md mt-4 self-center'>
                  Create a new account?{' '}
                  <Link
                    className='text-light-100 font-semibold'
                    href='/(auth)/signup'
                  >
                    Sign up
                  </Link>
                </Text>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}
