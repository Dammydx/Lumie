import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Play } from 'lucide-react'
import Layout from '../components/layout/Layout'
import ProductGrid from '../components/products/ProductGrid'
import Button from '../components/common/Button'
import { productService } from '../services/productService'
import { Product } from '../types'

export default function HomePage() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([])
  const [bestSellers, setBestSellers] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data: arrivals } = await productService.getProducts(1, 8, {
          sort: 'newest',
        })
        const { data: sellers } = await productService.getProducts(1, 8, {
          sort: 'rating',
        })

        setNewArrivals(arrivals || [])
        setBestSellers(sellers || [])
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Luxe Fashion, Jewelry & Beauty
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Discover curated collections of premium jewelry, fashion items, and beauty products for every occasion.
            </p>
            <div className="flex gap-4">
              <Link to="/shop">
                <Button size="lg" variant="secondary">
                  Shop Now <ChevronRight size={20} />
                </Button>
              </Link>
              <a href="#featured" className="flex items-center gap-2 text-white hover:opacity-80">
                <Play size={20} fill="white" /> Watch Demo
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-purple-400 rounded-2xl h-96 flex items-center justify-center">
              <span className="text-6xl">💎</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Shop by Category</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Jewelry', emoji: '💎', color: 'from-purple-500' },
              { name: 'Fashion', emoji: '👗', color: 'from-pink-500' },
              { name: 'Beauty', emoji: '💄', color: 'from-blue-500' },
            ].map((cat) => (
              <Link
                key={cat.name}
                to={`/shop?category=${cat.name.toLowerCase()}`}
                className={`bg-gradient-to-br ${cat.color} to-transparent rounded-2xl p-12 text-white group overflow-hidden relative`}
              >
                <div className="relative z-10">
                  <span className="text-6xl block mb-4">{cat.emoji}</span>
                  <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                  <p className="flex items-center gap-2 opacity-90">
                    Explore <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section id="featured" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold">New Arrivals</h2>
              <p className="text-gray-600">Check out our latest collection</p>
            </div>
            <Link to="/shop?sort=newest">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <ProductGrid products={newArrivals} />
          )}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold">Best Sellers</h2>
              <p className="text-gray-600">Customer favorites</p>
            </div>
            <Link to="/shop?sort=rating">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <ProductGrid products={bestSellers} />
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over ₦50,000' },
              { icon: '🔒', title: 'Secure Payment', desc: 'Multiple payment options' },
              { icon: '↩️', title: 'Easy Returns', desc: 'Within 14 days' },
              { icon: '💬', title: '24/7 Support', desc: 'We are here to help' },
            ].map((feat) => (
              <div key={feat.title} className="text-center">
                <div className="text-5xl mb-4">{feat.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
                <p className="text-gray-600 text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-8 opacity-90">
            Get exclusive deals, new arrivals, and style tips delivered to your inbox.
          </p>

          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
              required
            />
            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  )
}
