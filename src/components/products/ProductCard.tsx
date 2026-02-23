import { Link } from 'react-router-dom'
import { ShoppingCart, Heart } from 'lucide-react'
import { Product } from '../../types'

interface ProductCardProps {
  product: Product
  onAddToCart?: () => void
  onAddToWishlist?: () => void
}

export default function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
}: ProductCardProps) {
  const displayPrice = product.discount_price || product.price
  const hasDiscount = !!product.discount_price

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow group">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative overflow-hidden bg-gray-200 h-64">
        <div className="absolute inset-0 bg-gray-100">
          {product.images && product.images.length > 0 && (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          )}
        </div>

        {/* Stock badge */}
        {product.stock_quantity === 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Out of Stock
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Sale
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
          {product.category_id}
        </p>

        {/* Title */}
        <Link
          to={`/product/${product.id}`}
          className="font-semibold text-gray-900 line-clamp-2 hover:text-purple-600 mb-2 block"
        >
          {product.title}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-lg">
                {i < Math.floor(product.rating_avg) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.rating_count})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">₦{displayPrice.toLocaleString()}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ₦{product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex gap-1 mb-3 flex-wrap">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t">
          <button
            onClick={onAddToCart}
            disabled={product.stock_quantity === 0}
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart size={16} />
            Add
          </button>
          <button
            onClick={onAddToWishlist}
            className="flex-1 border-2 border-gray-300 text-gray-600 py-2 rounded-lg hover:border-purple-600 hover:text-purple-600 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <Heart size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
