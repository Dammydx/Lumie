import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Star, Check } from 'lucide-react'
import Layout from '../components/layout/Layout'
import Breadcrumbs from '../components/common/Breadcrumbs'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import Button from '../components/common/Button'
import { productService } from '../services/productService'
import { useCartStore } from '../store/cartStore'
import { ProductVariant } from '../types'

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return
      try {
        setLoading(true)
        const data = await productService.getProduct(id)
        setProduct(data)
      } catch (error) {
        console.error('Failed to load product:', error)
        navigate('/shop')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id, navigate])

  if (loading) return <LoadingSkeleton type="grid" />

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
      </Layout>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      product_id: product.id,
      quantity,
      variant_selections: selectedVariants,
      product,
    })
    alert('Added to cart!')
  }

  // Group variants by type
  const variantsByType: Record<string, ProductVariant[]> = {}
  if (product.variants) {
    product.variants.forEach((v: ProductVariant) => {
      if (!variantsByType[v.type]) {
        variantsByType[v.type] = []
      }
      variantsByType[v.type].push(v)
    })
  }

  const images = product.images || []
  const displayPrice = product.discount_price || product.price

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: product.title },
            ]}
          />

          <div className="grid md:grid-cols-2 gap-12 mt-8">
            {/* Images */}
            <div>
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-96 flex items-center justify-center">
                {images.length > 0 && (
                  <img
                    src={images[activeImageIndex]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`border-2 rounded-lg overflow-hidden h-24 ${
                        idx === activeImageIndex ? 'border-purple-600' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Title & Rating */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < Math.floor(product.rating_avg) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating_count} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">₦{displayPrice.toLocaleString()}</span>
                  {product.discount_price && (
                    <span className="text-lg text-gray-500 line-through">
                      ₦{product.price.toLocaleString()}
                    </span>
                  )}
                </div>
                {product.discount_price && (
                  <p className="text-sm text-red-500 font-semibold mt-2">
                    Save ₦{(product.price - product.discount_price).toLocaleString()} ({Math.round(((product.price - product.discount_price) / product.price) * 100)}%)
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="font-semibold text-lg mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Variants */}
              {Object.entries(variantsByType).map(([type, variants]) => (
                <div key={type} className="mb-6">
                  <h3 className="font-semibold mb-3 capitalize">{type}</h3>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariants((prev) => ({ ...prev, [type]: variant.value }))}
                        className={`px-4 py-2 border-2 rounded-lg transition-all ${
                          selectedVariants[type] === variant.value
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {variant.value}
                        {selectedVariants[type] === variant.value && (
                          <Check size={16} className="inline ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Stock Status */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                {product.stock_quantity > 0 ? (
                  <p className="text-blue-900 font-semibold flex items-center gap-2">
                    <Check size={18} /> In Stock ({product.stock_quantity} available)
                  </p>
                ) : (
                  <p className="text-red-900 font-semibold">Out of Stock</p>
                )}
              </div>

              {/* Quantity & Actions */}
              <div className="flex gap-4 mb-6">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock_quantity}
                    className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </Button>

                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Heart size={20} />
                  Wishlist
                </Button>
              </div>

              {/* Share */}
              <div className="pt-6 border-t">
                <p className="text-sm text-gray-600 mb-3">Share this product:</p>
                <div className="flex gap-2">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg">f</button>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg">𝕏</button>
                  <button className="p-2 bg-green-100 text-green-600 rounded-lg">𝕎</button>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border-b pb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">Customer {i + 1}</p>
                        <div className="flex text-yellow-400 text-sm">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} size={14} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="font-semibold mb-2">Great quality!</p>
                    <p className="text-gray-600 text-sm">This product exceeded my expectations. Highly recommend!</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4">Ratings & Reviews</h3>
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-gray-900">{product.rating_avg}</p>
                <div className="flex text-yellow-400 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < Math.floor(product.rating_avg) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Based on {product.rating_count} reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
