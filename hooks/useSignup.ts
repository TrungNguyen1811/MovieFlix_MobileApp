import { useRouter } from 'expo-router'
import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import MessageSchema from '@/constants/message-schema'

import { signUp } from '@/services/auth'
import { unwrapResult } from '@reduxjs/toolkit'

import { useAppDispatch } from '@/hooks/hooks'

const logoutSchema = Yup.object().shape({
  email: Yup.string().email().required(MessageSchema.REQUIRE('Email')),
  password: Yup.string().required(MessageSchema.REQUIRE('Password')),
  confirmPassword: Yup.string()
    .required(MessageSchema.REQUIRE('Confirm password'))
    .oneOf([Yup.ref('password')], 'Passwords must match'),
})

const useSignup = () => {
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // const [name, setName] = useState('')
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()

  const router = useRouter()

  const handleSignup = async (values: { email: string; password: string }) => {
    try {
      const action = await dispatch(signUp(values))
      unwrapResult(action)
      router.push('/(auth)/login' as any)
    } catch (err: any) {
      setError(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: logoutSchema,
    onSubmit: handleSignup,
  })

  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    formik,
  }
}
export default useSignup
