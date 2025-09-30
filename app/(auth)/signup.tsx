import { account } from '@/services/appwrite'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { ID } from 'react-native-appwrite'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSignup = async () => {
    try {
      await account.create(ID.unique(), email, password, name)
      router.push('/auth/login' as any)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <View>
      <Text>Signup</Text>
      <TextInput placeholder='Email' value={email} onChangeText={setEmail} />
      <TextInput
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput placeholder='Name' value={name} onChangeText={setName} />
      <Button title='Signup' onPress={handleSignup} />
      {error ? <Text>{error}</Text> : null}
    </View>
  )
}
