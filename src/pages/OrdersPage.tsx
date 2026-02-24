import Layout from '../components/layout/Layout'
import Breadcrumbs from '../components/common/Breadcrumbs'
import { useEffect, useState } from 'react'
import { orderService } from '../services/orderService'
import { useAuthStore } from '../store/authStore'

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        if (!user) {
          if (mounted) setOrders([])
          return
        }
        const res = await orderService.getUserOrders(user.id)
        if (mounted) setOrders(res || [])
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
        <div className="max-w-5xl mx-auto px-4">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Orders' }]} />
          <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
          {loading ? (
            <p>Loading...</p>
          ) : orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((o: any) => (
                <div key={o.id} className="bg-white p-4 rounded shadow">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Order #{o.order_number}</div>
                      <div className="font-medium">{o.status}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₦{o.total}</div>
                      <div className="text-sm text-gray-500">{new Date(o.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
