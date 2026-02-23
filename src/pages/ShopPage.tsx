import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronDown, Filter } from 'lucide-react'
import Layout from '../components/layout/Layout'
import Breadcrumbs from '../components/common/Breadcrumbs'
import ProductGrid from '../components/products/ProductGrid'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import Button from '../components/common/Button'
import { productService } from '../services/productService'
import { useCartStore } from '../store/cartStore'
import { Product, Category } from '../types'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const addToCart = useCartStore((state) => state.addToCart)

  // Filter states
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : 0,
    maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : 1000000,
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'newest',
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Load categories
        const cats = await productService.getCategories()
        setCategories(cats)

        // Load products
        const { data, total: count } = await productService.getProducts(page, 12, {
          category_id: filters.category || undefined,
          min_price: filters.minPrice || undefined,
          max_price: filters.maxPrice || undefined,
          search: filters.search || undefined,
          sort: filters.sort,
        })

        setProducts(data || [])
        setTotal(count || 0)
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [filters, page])

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)

    // Update URL
    const params = new URLSearchParams()
    if (filters.category) params.set('category', filters.category)
    if (filters.search) params.set('search', filters.search)
    if (filters.minPrice > 0) params.set('minPrice', filters.minPrice.toString())
    if (filters.maxPrice < 1000000) params.set('maxPrice', filters.maxPrice.toString())
    if (filters.sort !== 'newest') params.set('sort', filters.sort)

    navigate(`/shop?${params.toString()}`)
  }

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      addToCart({
        id: `${product.id}-1`,
        product_id: product.id,
        quantity: 1,
        variant_selections: {},
        product,
      })
    }
  }

  const handleAddToWishlist = (productId: string) => {
    // Implement wishlist functionality
    alert('Added to wishlist')
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
            ]}
          />

          {/* Header */}
          <div className="mt-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop</h1>
            <p className="text-gray-600">
              Showing {products.length} of {total} products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar - Desktop */}
            <div className="hidden md:block">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Filter size={20} /> Filters
                </h3>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Category</h4>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Min: ₦{filters.minPrice.toLocaleString()}</label>
                      <input
                        type="range"
                        min="0"
                        max="500000"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Max: ₦{filters.maxPrice.toLocaleString()}</label>
                      <input
                        type="range"
                        min="0"
                        max="1000000"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Sort */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Sort By</h4>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="newest">Newest</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="md:hidden mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex justify-center items-center gap-2"
              >
                <Filter size={18} /> Filters
              </Button>

              {showFilters && (
                <div className="bg-white rounded-lg shadow p-4 mt-4 space-y-4">
                  {/* Mobile filters similar to desktop */}
                  <div>
                    <h4 className="font-semibold mb-2">Category</h4>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Sort By</h4>
                    <select
                      value={filters.sort}
                      onChange={(e) => handleFilterChange('sort', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="newest">Newest</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Products */}
            <div className="md:col-span-3">
              {loading ? (
                <LoadingSkeleton type="card" count={12} />
              ) : (
                <ProductGrid
                  products={products}
                  onProductCardAction={(id, action) => {
                    if (action === 'add-to-cart') {
                      handleAddToCart(id)
                    } else if (action === 'add-to-wishlist') {
                      handleAddToWishlist(id)
                    }
                  }}
                />
              )}

              {/* Pagination */}
              {!loading && total > 12 && (
                <div className="flex justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: Math.ceil(total / 12) }).map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={page === i + 1 ? 'primary' : 'outline'}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    disabled={page >= Math.ceil(total / 12)}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
