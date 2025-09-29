import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { TrendingCardProps } from '@/interfaces/interfaces'
import MaskedView from '@react-native-masked-view/masked-view'
import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const TrendingCard = ({ index, movie }: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie.movie_id}`} asChild>
      <TouchableOpacity className='w-32 relative pl-4'>
        <Image
          source={{
            uri: movie.poster_url
              ? `https://image.tmdb.org/t/p/w500${movie.poster_url}`
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
          }}
          className='w-[full] h-52 rounded-lg'
          resizeMode='cover'
        />

        <View className='absolute bottom-9 left-0'>
          <MaskedView
            maskElement={
              <Text className='text-6xl text-white font-bold'>{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className='size-14'
              resizeMode='cover'
            />
          </MaskedView>
        </View>

        <Text className='text-sm font-bold text-white mt-2' numberOfLines={1}>
          {movie.title}
        </Text>
        <View className='absolute top-2 right-2 flex-row bg-light-300 px-2 py-1 rounded-md movies-center justify-start gap-x-1'>
          <Image source={icons.star} className='size-4' />
          <Text className='text-xs text-white font-bold uppercase'>
            {movie.count / 2}
          </Text>
        </View>
        <Text className='text-xs text-light-300 font-medium uppercase'>
          movies
        </Text>
      </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard

const styles = StyleSheet.create({})
