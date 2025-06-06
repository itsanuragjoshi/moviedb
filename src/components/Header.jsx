import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header({ searchQuery, onSearch, favoritesCount }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-2xl font-bold transition-colors whitespace-nowrap uppercase"
          >
            Movie<span className="text-red-500">DB</span>
          </Link>

          <SearchBar value={searchQuery} onChange={onSearch} className="flex-1" />

          <Link
            to="/favorites"
            className={`p-2 rounded-full transition-all border-2 border-black hover:shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 relative whitespace-nowrap`}
            aria-label="Favorites"
            title="Favorites"
          >
            <Heart className="w-6 h-6" fill="red"/>
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                {favoritesCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
