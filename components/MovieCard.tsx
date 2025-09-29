import { icons } from '@/constants/icons'
import { Movie } from '@/interfaces/interfaces'
import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({ item }: { item: Movie }) => {
  return (
    <Link href={`/movies/${item.id}`} asChild>
      <TouchableOpacity className='w-[30%]'>
        <Image
          source={{
            uri: item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
          }}
          className='w-full h-52 rounded-lg'
          resizeMode='cover'
        />
        <Text className='text-sm font-bold text-white mt-2' numberOfLines={1}>
          {item.title}
        </Text>
        <View className='absolute top-2 right-2 flex-row bg-light-300 px-2 py-1 rounded-md items-center justify-start gap-x-1'>
          <Image source={icons.star} className='size-4' />
          <Text className='text-xs text-white font-bold uppercase'>
            {Math.floor(item.vote_average / 2)}
          </Text>
        </View>
        <View className='flex-row items-center justify-between'>
          <Text className='text-xs text-light-300 font-medium mt-1'>
            {item.release_date?.split('-')[0]}
          </Text>
        </View>
        <Text className='text-xs text-light-300 font-medium uppercase'>
          Movies
        </Text>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard

const styles = StyleSheet.create({})
