import Layout from '../components/layout/Layout'
import Breadcrumbs from '../components/common/Breadcrumbs'
import { useEffect, useState } from 'react'
import { wishlistService } from '../services/wishlistService'
import { useAuthStore } from '../store/authStore'
import ProductGrid from '../components/products/ProductGrid'

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        if (!user) {
          if (mounted) setItems([])
          return
        }
        const res = await wishlistService.getUserWishlist(user.id)
        if (mounted) setItems(res || [])
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
          <h1 className="text-2xl font-semibold mb-6">Your Wishlist</h1>
          {loading ? (
            <p>Loading...</p>
          ) : items.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <ProductGrid products={items} />
          )}
        </div>
      </div>
    </Layout>
  )
}
