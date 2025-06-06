import Header from './Header'

function Layout({ children, searchQuery, onSearch, favoritesCount }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        searchQuery={searchQuery}
        onSearch={onSearch}
        favoritesCount={favoritesCount}
      />
      {children}
    </div>
  )
}

export default Layout 