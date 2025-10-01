import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { icons } from '@/constants/icons'
import { images } from '@/constants/images'

import CustomInput from '@/components/ui/CustomInput'
import useSignup from '@/hooks/useSignup'

export default function Signup() {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    formik,
  } = useSignup()

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
            Sign Up
          </Text>

          <CustomInput
            className='text-white text-lg py-2 px-3 border-light-200 bg-dark-200 focus:border rounded-md'
            placeholder='Email'
            placeholderTextColor='#A8B5DB'
            name='email'
            formik={formik}
            textAlignVertical='center'
          />
          <View className='relative'>
            <CustomInput
              className=' relative text-white text-lg py-2 px-3 border-light-200 bg-dark-200 focus:border rounded-md'
              placeholder='Password'
              placeholderTextColor='#A8B5DB'
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              secureTextEntry
              textAlignVertical='center'
              formik={formik}
              name='password'
            />
          </View>
          <View className='relative'>
            <CustomInput
              className=' relative text-white text-lg py-2 px-3 border-light-200 bg-dark-200 focus:border rounded-md'
              placeholder='Confirm password'
              placeholderTextColor='#A8B5DB'
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              secureTextEntry
              textAlignVertical='center'
              formik={formik}
              name='confirmPassword'
            />
          </View>

          <TouchableOpacity
            onPress={() => formik.handleSubmit()}
            className='mt-8'
          >
            <LinearGradient
              colors={['#D6C6FF', '#A18CFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 8, width: '100%' }}
            >
              <Text className='self-center text-dark-100 font-bold text-xl py-2'>
                Sign Up
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {error ? <Text>{error}</Text> : null}

          <Text className='text-white text-md mt-8 self-center'>
            Have an account?{' '}
            <Link className='text-light-100 font-semibold' href='/(auth)/login'>
              Login
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
