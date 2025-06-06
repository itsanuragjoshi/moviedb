import { Star, Heart } from 'lucide-react'

function MovieCard({ movie, onFavoriteToggle, isFavorite, type = 'grid' }) {
  const isList = type === 'list'
  return (
    <div className={`bg-white rounded-lg overflow-hidden border-2 border-black shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300 ${isList ? 'flex' : 'flex flex-col h-full'}`}>
      <div className={`${isList ? 'w-24 h-36 flex-shrink-0' : 'border-b-2 border-black'}`}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={movie.Title}
          className={`${isList ? 'w-full h-full object-cover' : 'w-full aspect-2/3 object-cover'}`}
        />
      </div>
      <div className={`${isList ? 'p-3 flex-1 min-w-0' : 'p-4 flex flex-col flex-grow'}`}>
        <div className={`${isList ? 'flex items-start justify-between gap-2' : ''}`}>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">{movie.Title}</h3>
          {isList && (
            <button
              onClick={() => onFavoriteToggle(movie)}
              className="text-gray-400 hover:text-gray-400 transition-colors group"
              title="Favorites"
            >
              <Heart className="w-5 h-5 text-black group-hover:fill-gray-200" fill={isFavorite ? 'red' : 'none'} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-8 text-sm text-gray-600 mb-2">
          <span>{movie.Year}</span>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-black fill-yellow-500" />
            <span>{movie.imdbRating ? `${movie.imdbRating}/10` : 'N/A'}</span>
          </div>
          {!isList && (
            <button
              onClick={() => onFavoriteToggle(movie)}
              className="text-gray-400 hover:text-gray-400 transition-colors group"
              title="Favorites"
            >
              <Heart className="w-5 h-5 text-black group-hover:fill-gray-200" fill={isFavorite ? 'red' : 'none'} />
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {movie.Genre || 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default MovieCard 