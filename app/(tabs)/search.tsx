import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/Search'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
  const router = useRouter()
  const [query, setQuery] = React.useState('')

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({ query: query }), false)

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query.trim()) {
        await refetchMovies()
      } else {
        resetMovies()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [query])

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(query, movies[0])
    }
  }, [movies])

  return (
    <SafeAreaView className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 z-0' resizeMode='cover' />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className='px-5'
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-5'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>
            <View className='my-2'>
              <SearchBar
                placeholder='Search for a movie'
                value={query}
                onChangeText={(text) => setQuery(text)}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator
                size='large'
                color='#000ff'
                className='mt-10 self-center'
              />
            )}
            {moviesError && (
              <Text className='text-red-500 px-5 my-3'>
                Error: {moviesError}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              query.trim() &&
              movies?.length > 0 && (
                <Text className='text-xl text-white font-bold'>
                  Search results for{' '}
                  <Text className='text-accent'>{query.trim()}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {query.trim() ? 'No results found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})
