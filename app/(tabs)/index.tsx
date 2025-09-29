import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/Search'
import TrendingCard from '@/components/TrendingCard'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { getTrendingMovies } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import { useRouter } from 'expo-router'
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native'

export default function Index() {
  const router = useRouter()

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(() => getTrendingMovies())

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: '' }))

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute w-full z-0' />
      <ScrollView
        className='flex-1 px-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto' />

        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator
            size='large'
            color='#000ff'
            className='mt-10 self-center'
          />
        ) : moviesError || trendingMoviesError ? (
          <Text>Error: {moviesError || trendingMoviesError}</Text>
        ) : (
          <View className='flex-1'>
            <SearchBar
              onPress={() => {
                router.push('/search')
              }}
              placeholder='Search through 300+ movies online'
            />

            {trendingMovies && (
              <View className='mt-10'>
                <Text className='text-lg text-white font-bold mb-3'>
                  Trending Movies
                </Text>
                <FlatList
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard index={index} movie={item} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  horizontal={true}
                  contentContainerStyle={{
                    justifyContent: 'flex-start',
                    width: '100%',
                    gap: 15,
                    padding: 5,
                    marginBottom: 10,
                  }}
                  // showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
            <>
              <Text className='text-lg text-white font-bold mt-5 mb-3'>
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard item={item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  padding: 5,
                  marginBottom: 10,
                }}
                className='mt-2 pb-32'
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

