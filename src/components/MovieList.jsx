import { Suspense } from 'react'
import MovieCard from './MovieCard'
import MovieListSkeleton from './MovieListSkeleton'

function MovieList({ movies, onFavoriteToggle, favorites }) {
  if (movies.length === 0) {
    return (
      <div className="py-12">
        <p className="text-gray-500 text-lg">No movies found</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<MovieListSkeleton />}>
      <div className="space-y-4">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
            type="list"
          />
        ))}
      </div>
    </Suspense>
  )
}

export default MovieList
