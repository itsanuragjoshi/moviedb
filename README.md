# MovieDB - Movie Browser Application

A modern, responsive movie browser application built with React that allows users to search, filter, and save their favorite movies. The application uses the OMDB API to fetch movie data.

## Features

### Core Features
- Search movies with real-time results
- View movie details including title, year, rating, and genre
- Responsive design that adapts to different screen sizes
- Infinite scroll for seamless browsing
- Favorites system with local storage persistence

### Additional Features

1. **Responsive Layout**
   - Grid view for larger screens
   - List view for mobile devices
   - Automatic layout switching based on screen size

2. **Smart Filtering System**
   - Filter by genres
   - Filter by year range
   - Filter by IMDB rating
   - Active filter count indicator
   - Clear all filters functionality

3. **Enhanced User Experience**
   - Skeleton loading states with Suspense
   - Smooth animations and transitions
   - Favorite count indicator
   - Custom placeholder for missing movie posters
   - Debounced search to prevent API spam

4. **Modern UI Elements**
   - Custom shadow effects
   - Hover animations
   - Consistent border styling
   - Responsive header with search
   - Prominent favorite buttons

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OMDB API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movie-browser.git
cd movie-browser
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your OMDB API key:
```env
VITE_OMDB_API_KEY=your_api_key_here
VITE_OMDB_BASE_URL=http://www.omdbapi.com/
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Design Decisions

1. **Component Structure**
   - Modular components for better maintainability
   - Separation of concerns between data fetching and presentation
   - Reusable components like MovieCard, SearchBar, and Filters

2. **State Management**
   - Props-based state management for component communication
   - State passed down through component hierarchy
   - LocalStorage for favorites persistence
   - Centralized state in App component for global data

3. **Performance Optimizations**
   - Debounced search to prevent excessive API calls
   - Lazy loading of images for better performance
   - Skeleton loading states
   - Efficient filtering system

4. **UI/UX Considerations**
   - Consistent design language
   - Responsive layouts
   - Clear visual hierarchy
   - Intuitive navigation
   - Accessible components

## Potential Improvements

1. **Enhanced Browsing Experience**
   - Browse movies by categories
   - Popular categories section on homepage
   - Latest movies hero banner with detailed information
   - Sort functionality (A-Z, Z-A, rating, year)

2. **UI/UX Enhancements**
   - Manual toggle between list and grid views
   - Active filter indicators on the homepage
   - More detailed movie information
   - User ratings and reviews
   - Share functionality

3. **Technical Improvements**
   - Implement proper error boundaries
   - Add unit and integration tests
   - Implement proper TypeScript types
   - Add proper SEO optimization
   - Implement proper caching strategy

4. **Additional Features**
   - User authentication
   - Watchlist functionality
   - Movie recommendations
   - Social features
   - Advanced search filters

