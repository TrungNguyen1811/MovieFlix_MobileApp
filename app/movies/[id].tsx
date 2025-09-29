import DotSeparator from '@/components/ui/DotSeparator'
import { icons } from '@/constants/icons'
import { MovieDetails, ReleaseDates } from '@/interfaces/interfaces'
import { fetchMovieDetails, getReleaseDate } from '@/services/api'
import useFetch from '@/services/useFetch'
import formattedDate from '@/utils/formatDate'
import getMoney from '@/utils/getMoney'
import getRunTimeMovie from '@/utils/getRunTimeMovie'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { Fragment } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

type RootStackParamList = {
  MovieDetail: { id: number }
}

type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>

const MovieDetail = () => {
  const router = useRoute<MovieDetailRouteProp>()
  const navigation = useNavigation()
  const { id } = router.params

  const { data, loading, error } = useFetch<MovieDetails>(() =>
    fetchMovieDetails(id as number)
  )

  const { data: releaseDate, loading: releaseDateLoading } = useFetch<
    ReleaseDates[]
  >(() => getReleaseDate(id as number))

  const date = new Date(data?.release_date as string)
  return (
    <View className='flex-1 bg-primary '>
      <ScrollView
        className='flex-1'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <View className='relative'>
          <Image
            source={{
              uri: data?.poster_path
                ? `https://image.tmdb.org/t/p/w500${data?.poster_path}`
                : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
            }}
            className='w-full h-[50vh] rounded-lg'
            resizeMode='cover'
          />

          <View className='absolute bottom-0 right-6 translate-y-1/2 bg-white rounded-full p-4'>
            <Image
              source={icons.play}
              className='size-8'
              resizeMode='contain'
            />
          </View>
        </View>

        <View className='p-5 pt-8'>
          <View className='flex-col gap-4'>
            <View>
              <Text className='text-white text-3xl font-bold'>
                {data?.title}
              </Text>
              <View className='flex-row justify-start items-center'>
                <Text className='text-light-200 text-lg'>
                  {date.getFullYear()}
                </Text>
                <DotSeparator />
                <Text className='text-light-200 text-lg'>
                  {releaseDate?.[0]?.release_dates?.[0]?.certification ?? 'N/A'}
                </Text>
                <DotSeparator />
                <Text className='text-light-200 text-lg'>
                  {getRunTimeMovie(data?.runtime as number)}
                </Text>
              </View>
            </View>
            <View className='flex-row justify-start items-center gap-3'>
              <View className='flex-row justify-start items-center gap-1 bg-dark-100 p-1 px-3 rounded-md'>
                <Image source={icons.star} className='size-4' />
                <Text className='text-light-200'>
                  <Text className='text-white font-bold'>
                    {data?.vote_average}
                  </Text>
                  /10 ({data?.vote_count as number})
                </Text>
              </View>
              <View className='flex-row justify-start items-center gap-1 bg-dark-100  p-1 px-3 rounded-md'>
                <Image
                  source={icons.arrow}
                  className='size-4'
                  tintColor={'#A8B5DB'}
                />
                <Text className='text-light-200'>1</Text>
              </View>
            </View>
          </View>
          <View className='flex-col gap-8 mt-8'>
            <View>
              <Text className='text-sm text-light-200'>Overview</Text>
              <Text className='text-white  mt-2'>{data?.overview}</Text>
            </View>
            <View className='flex-row justify-start items-center gap-8'>
              <View className='flex-col justify-start items-start '>
                <Text className='text-sm text-light-200'>Release date</Text>
                <Text className='text-light-100 mt-2 font-bold '>
                  {formattedDate(date)}
                </Text>
              </View>
              <View className='flex-col justify-start items-start'>
                <Text className='text-sm text-light-200'>Status</Text>
                <Text className='text-light-100 mt-2 font-bold'>
                  {data?.status}
                </Text>
              </View>
            </View>
            <View>
              <Text className='text-sm text-light-200'>Genres</Text>
              <View className='flex-row flex-wrap gap-3'>
                {data?.genres.map((genre) => (
                  <Text
                    className='bg-dark-100 px-3 py-1 rounded-md text-white mt-2 font-semibold'
                    key={genre.id}
                  >
                    {genre.name}
                  </Text>
                ))}
              </View>
            </View>
            <View>
              <Text className='text-sm text-light-200'>Countries</Text>
              <View className='flex-row flex-wrap items-center'>
                {data?.production_countries.map((country, index) => (
                  <Fragment key={country.iso_3166_1}>
                    <Text className='text-light-100 mt-2 font-bold'>
                      {country.name}
                    </Text>
                    {data?.production_countries.length !== index + 1 && (
                      <DotSeparator />
                    )}
                  </Fragment>
                ))}
              </View>
            </View>
            <View className='flex-row justify-start items-center gap-8'>
              <View className='flex-col justify-start items-start '>
                <Text className='text-sm text-light-200'>Budget</Text>
                <Text className='text-light-100 mt-2 font-bold '>
                  ${getMoney(data?.budget as number)}
                </Text>
              </View>
              <View className='flex-col justify-start items-start'>
                <Text className='text-sm text-light-200'>Revenue</Text>
                <Text className='text-light-100 mt-2 font-bold'>
                  ${getMoney(data?.revenue as number)}
                </Text>
              </View>
            </View>
            <View>
              <Text className='text-sm text-light-200'>Tagline</Text>
              <View className='flex-row flex-wrap'>
                <Text className='text-light-100 mt-2 font-bold'>
                  {data?.tagline && data?.tagline.trim() !== ''
                    ? data.tagline
                    : "45.6 Billion Won is Child's Play"}
                </Text>
              </View>
            </View>
            <View>
              <Text className='text-sm text-light-200'>
                Production Companies
              </Text>
              <View className='flex-row flex-wrap items-center justify-start'>
                {data?.production_companies.map((company, index) => (
                  <Fragment key={company.id ?? index}>
                    <Text className='text-light-100 mt-2 font-bold'>
                      {company.name}
                    </Text>
                    {index < data.production_companies.length - 1 && (
                      <DotSeparator />
                    )}
                  </Fragment>
                ))}
              </View>
            </View>
            <Pressable onPress={() => navigation.goBack()}>
              <LinearGradient
                colors={['#D6C6FF', '#A18CFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ borderRadius: 8 }}
              >
                <View className='flex-row justify-center items-center px-4 py-3 gap-2'>
                  <Text className='text-dark-100 font-bold mr-2'>
                    Visit Homepage
                  </Text>
                  <Image
                    source={icons.arrow}
                    className='size-4 text-dark-100'
                  />
                </View>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default MovieDetail

const styles = StyleSheet.create({})
