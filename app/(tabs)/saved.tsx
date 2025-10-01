import { useAppDispatch } from '@/hooks/hooks'
import { logout } from '@/services/auth'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const Saved = () => {
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    await dispatch(logout())
  }
  return (
    <View>
      <Text>Saved</Text>
      <Button title='Logout' onPress={handleLogout} />
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({})
