import { Product } from '../../types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  onProductCardAction?: (productId: string, action: string) => void
}

export default function ProductGrid({
  products,
  isLoading = false,
  onProductCardAction,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg overflow-hidden shadow animate-pulse"
          >
            <div className="h-64 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters or search query</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => onProductCardAction?.(product.id, 'add-to-cart')}
          onAddToWishlist={() => onProductCardAction?.(product.id, 'add-to-wishlist')}
        />
      ))}
    </div>
  )
}
