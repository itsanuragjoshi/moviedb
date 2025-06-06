// Available movie genres for filtering
const GENRES = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'Film-Noir', 'History', 'Horror', 'Music', 'Musical',
  'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
]

function Filters({ selectedGenres, selectedYears, selectedRatings, onGenreChange, onYearChange, onRatingChange }) {
  const currentYear = new Date().getFullYear()

  // Toggles genre selection and updates parent state
  const renderGenreFilter = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest">
        Genres
      </label>
      <div className="flex flex-wrap gap-2">
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => {
              const newGenres = selectedGenres.includes(genre)
                ? selectedGenres.filter(g => g !== genre)
                : [...selectedGenres, genre]
              onGenreChange(newGenres)
            }}
            className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${
              selectedGenres.includes(genre)
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
      <hr className="mt-6 border-gray-200" />
    </div>
  )

  // Year range inputs with validation
  const renderYearFilter = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest">
        Release Year
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="From"
          value={selectedYears.split(' - ')[0]}
          onChange={(e) => onYearChange(`${e.target.value} - ${selectedYears.split(' - ')[1]}`)}
          min="1900"
          max={currentYear}
          className="w-full px-3 py-2 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:shadow-[0px_6px_0px_0px_rgba(0,0,0,1)]"
        />
        <span className="text-gray-500">to</span>
        <input
          type="number"
          placeholder="To"
          value={selectedYears.split(' - ')[1]}
          onChange={(e) => onYearChange(`${selectedYears.split(' - ')[0]} - ${e.target.value}`)}
          min="1900"
          max={currentYear}
          className="w-full px-3 py-2 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:shadow-[0px_6px_0px_0px_rgba(0,0,0,1)]"
        />
      </div>
      <hr className="mt-6 border-gray-200" />
    </div>
  )

  // IMDB rating range inputs with validation
  const renderRatingFilter = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest">
        IMDB Rating
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="1.0"
          value={selectedRatings.split(' - ')[0]}
          onChange={(e) => onRatingChange(`${e.target.value} - ${selectedRatings.split(' - ')[1]}`)}
          min="1.0"
          max="10.0"
          step="0.1"
          className="w-full px-3 py-2 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:shadow-[0px_6px_0px_0px_rgba(0,0,0,1)]"
        />
        <span className="text-gray-500">to</span>
        <input
          type="number"
          placeholder="10.0"
          value={selectedRatings.split(' - ')[1]}
          onChange={(e) => onRatingChange(`${selectedRatings.split(' - ')[0]} - ${e.target.value}`)}
          min="1.0"
          max="10.0"
          step="0.1"
          className="w-full px-3 py-2 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:shadow-[0px_6px_0px_0px_rgba(0,0,0,1)]"
        />
      </div>
    </div>
  )

  return (
    <div className="w-full p-6">
      <div className="space-y-6">
        {renderGenreFilter()}
        {renderYearFilter()}
        {renderRatingFilter()}
      </div>
    </div>
  )
}

export default Filters 