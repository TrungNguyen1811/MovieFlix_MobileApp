import instance from '@/services/axios'

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : `/discover/movie?sort_by=popularity.desc`

  try {
    const response = await instance.get(endpoint)

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`)
    }

    return response.data.results
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occurred'
    )
  }
}

export const fetchMovieDetails = async (movieId: number) => {
  const endpoint = `/movie/${movieId}`

  try {
    const response = await instance.get(endpoint)

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Failed to fetch movie details ${response.statusText}`)
    }

    return response.data
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occurred'
    )
  }
}

export const getReleaseDate = async (movieId: number) => {
  const endpoint = `/movie/${movieId}/release_dates`

  try {
    const response = await instance.get(endpoint)

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Failed to fetch movie details ${response.statusText}`)
    }
    return response.data.results
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occurred'
    )
  }
}
