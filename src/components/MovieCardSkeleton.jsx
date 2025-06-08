function MovieCardSkeleton({ type = 'grid' }) {
  const renderListCardSkeleton = () => (
    <div className="flex bg-white rounded-lg shadow-md">
      <div className="w-24 aspect-2/3 object-cover flex-shrink-0 bg-gray-200 animate-pulse" />
      <div className="flex-1 p-3 min-w-0">
        <div className="flex items-start justify-between">
          <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-4">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>
      </div>
    </div>
  );

  const renderGridCardSkeleton = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="w-full aspect-2/3 bg-gray-200" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-full mb-2" />
        <div className="flex items-center w-3/4 justify-between my-2">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      </div>
    </div>
  );

  return type === 'list' ? renderListCardSkeleton() : renderGridCardSkeleton();
}

export default MovieCardSkeleton; 