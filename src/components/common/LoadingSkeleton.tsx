interface LoadingSkeletonProps {
  type?: 'card' | 'grid' | 'bar' | 'text'
  count?: number
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      <div className="h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
      </div>
    </div>
  )
}

export default function LoadingSkeleton({
  type = 'card',
  count = 3,
}: LoadingSkeletonProps) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (type === 'grid') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-24 h-24 bg-gray-200 animate-pulse rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 animate-pulse rounded"></div>
      ))}
    </div>
  )
}
