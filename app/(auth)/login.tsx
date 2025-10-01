import { Link } from 'expo-router'
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

import CustomInput from '@/components/ui/CustomInput'

import useLogin from '@/hooks/useLogin'

export default function LoginPage() {
  const { showPassword, setShowPassword, error, formik } = useLogin()

  return (
    <View className='flex-1 bg-primary'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1 py-20'
      >
        <Image source={images.bg} className='absolute w-full z-0' />
        <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto' />

        <View className='px-12'>
          <Text className='flex self-center text-4xl text-white font-bold mb-24'>
            Login
          </Text>

          <CustomInput
            className='text-white text-lg py-2 px-3 border-light-200 bg-dark-200 focus:border rounded-md'
            placeholder='Email'
            placeholderTextColor='#A8B5DB'
            textAlignVertical='center'
            name='email'
            formik={formik}
          />
          <View className='relative'>
            <CustomInput
              className=' relative text-white text-lg py-2 px-3 border-light-200 bg-dark-200 focus:border rounded-md'
              placeholder='Password'
              placeholderTextColor='#A8B5DB'
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              textAlignVertical='center'
              formik={formik}
              name='password'
            />
          </View>
          {error ? <Text className='text-red-500 my-2'>{error}</Text> : null}

          <TouchableOpacity
            onPress={() => formik.handleSubmit()}
            className='mt-4'
          >
            <LinearGradient
              colors={['#D6C6FF', '#A18CFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 8, width: '100%' }}
            >
              <Text className='self-center text-dark-100 font-bold text-xl py-2'>
                Login
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text className='text-white text-md mt-8 self-center'>
            Create a new account?{' '}
            <Link
              className='text-light-100 font-semibold'
              href='/(auth)/signup'
            >
              Sign up
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
