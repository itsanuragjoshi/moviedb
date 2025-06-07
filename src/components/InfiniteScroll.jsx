import { useEffect, useRef } from 'react';

function InfiniteScroll({ onLoadMore, hasMore, loading }) {
  // Refs for intersection observer and trigger element
  const observerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    // Setup intersection observer to detect when trigger element is visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Load more content when trigger is visible and conditions are met
        if (entry.isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px', // Start loading before reaching the bottom
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    observerRef.current = observer;

    // Cleanup observer on unmount
    return () => observerRef.current?.disconnect();
  }, [hasMore, loading, onLoadMore]);

  const renderLoadingSpinner = () => (
    <div className="animate-spin rounded-full h-6 w-6 border-b-1 border-black" />
  );

  return (
    <div
      ref={triggerRef}
      className="h-10 w-full flex items-center justify-center"
    >
      {loading && renderLoadingSpinner()}
    </div>
  );
}

export default InfiniteScroll; 