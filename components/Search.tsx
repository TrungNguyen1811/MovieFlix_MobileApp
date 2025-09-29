import { icons } from '@/constants/icons'
import React from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'

interface Props {
  onPress?: () => void
  placeholder: string
  value?: string
  onChangeText?: (text: string) => void
}
const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View className='flex-row items-center w-full bg-dark rounded-full py-4 px-5'>
      <Image
        source={icons.search}
        tintColor={'#ab8bff'}
        className='size-5'
        resizeMode='contain'
      />
      <TextInput
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='#A8B5DB'
        className='flex-1 ml-2 text-white'
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})
