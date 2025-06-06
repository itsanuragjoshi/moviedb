import { Search } from 'lucide-react'

function SearchBar({ value, onChange, className = '' }) {
  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] transition-colors duration-200"
      />
    </div>
  )
}

export default SearchBar 