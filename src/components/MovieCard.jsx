import { StarIcon, HeartIcon } from 'lucide-react'

function MovieCard({ movie, onFavoriteToggle, isFavorite, type = 'grid' }) {
  const defaultPoster = 'https://placehold.co/300x450/e2e8f0/1e293b?text=No+Poster'
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : defaultPoster

  const renderFavoriteButton = () => (
    <button
      onClick={() => onFavoriteToggle(movie)}
      className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full border-1 border-black hover:shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <HeartIcon 
        className="w-6 h-6 text-black" 
        fill={isFavorite ? 'red' : 'none'} 
      />
    </button>
  )

  const renderListCard = () => (
    <div className="flex bg-white rounded-lg overflow-hidden border-1 border-black shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300 relative">
      <div className="w-24 h-36 flex-shrink-0">
        <img
          src={posterUrl}
          alt={movie.Title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-3 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">{movie.Title}</h3>
        </div>
        <div className="flex items-center gap-8 text-sm text-gray-600 mb-2">
          <span>{movie.Year}</span>
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 text-black fill-yellow-500" />
            <span>{movie.imdbRating ? `${movie.imdbRating}/10` : 'N/A'}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {movie.Genre || 'N/A'}
        </p>
      </div>
      {renderFavoriteButton()}
    </div>
  )

  const renderGridCard = () => (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden border-1 border-black shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300">
      <div className="border-b-1 border-black relative">
        <img
          src={posterUrl}
          alt={movie.Title}
          className="w-full aspect-2/3 object-cover"
          loading="lazy"
          decoding="async"
        />
        {renderFavoriteButton()}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">{movie.Title}</h3>
        <div className="flex items-center gap-8 text-sm text-gray-600 mb-2">
          <span>{movie.Year}</span>
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 text-black fill-yellow-500" />
            <span>{movie.imdbRating ? `${movie.imdbRating}/10` : 'N/A'}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {movie.Genre || 'N/A'}
        </p>
      </div>
    </div>
  )

  return type === 'list' ? renderListCard() : renderGridCard();
}

export default MovieCard 