function MovieGridSkeleton() {
  const renderSkeletonItem = (index) => (
    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="w-full aspect-2/3 bg-gray-200" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="flex items-center justify-between mt-2">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => renderSkeletonItem(index))}
    </div>
  );
}

export default MovieGridSkeleton;
