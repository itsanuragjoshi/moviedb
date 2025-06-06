function MovieListSkeleton() {
  const renderSkeletonItem = (index) => (
    <div key={index} className="flex gap-4 p-4 bg-white rounded-lg border-2 border-black shadow-[0px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="w-24 h-36 flex-shrink-0 bg-gray-200 rounded-lg animate-pulse" />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
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

  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => renderSkeletonItem(index))}
    </div>
  );
}

export default MovieListSkeleton; 