import { useEffect, useRef } from 'react';

function InfiniteScroll({ onLoadMore, hasMore, loading }) {
  const observerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, onLoadMore]);

  return (
    <div
      ref={triggerRef}
      className="h-10 w-full flex items-center justify-center"
    >
      {loading && (
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
      )}
    </div>
  );
}

export default InfiniteScroll; 