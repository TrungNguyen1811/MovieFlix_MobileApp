import { router } from 'expo-router'
import { useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import MessageSchema from '@/constants/message-schema'
import { login } from '@/services/auth'

import { useAppDispatch } from '@/hooks/hooks'

const loginSchema = Yup.object({
  email: Yup.string().email().required(MessageSchema.REQUIRE('Email')),
  password: Yup.string().required(MessageSchema.REQUIRE('Password')),
})

const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const dispatch = useAppDispatch()

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const resultAction = await dispatch(login(values))
      unwrapResult(resultAction)
      router.push('/')
    } catch (err: any) {
      setError(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  })

  return {
    showPassword,
    setShowPassword,
    error,

    formik,
  }
}

export default useLogin
