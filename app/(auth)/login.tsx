import { account } from '@/services/appwrite'
import { router } from 'expo-router'
import { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      await account.createEmailPasswordSession(email, password)
      router.replace('/index' as any)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder='Email' value={email} onChangeText={setEmail} />
      <TextInput
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title='Login' onPress={handleLogin} />
      {error ? <Text>{error}</Text> : null}
    </View>
  )
}
