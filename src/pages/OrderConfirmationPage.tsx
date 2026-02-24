import Layout from '../components/layout/Layout'
import Breadcrumbs from '../components/common/Breadcrumbs'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { orderService } from '../services/orderService'

export default function OrderConfirmationPage() {
  const { id } = useParams()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!id) return
      setLoading(true)
      try {
        const res = await orderService.getOrder(id)
        if (mounted) setOrder(res)
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [id])

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Order Confirmation' }]} />
          {loading ? (
            <p>Loading confirmation...</p>
          ) : !order ? (
            <p>Order not found.</p>
          ) : (
            <div className="bg-white p-6 rounded shadow">
              <h1 className="text-2xl font-semibold mb-4">Thank you — your order is confirmed</h1>
              <p className="mb-2">Order Number: <strong>{order.order_number}</strong></p>
              <p className="mb-4">Total Paid: <strong>₦{order.total}</strong></p>
              <p className="mb-4">We sent a confirmation email to <strong>{order.email}</strong>.</p>
              <Link to="/orders" className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded">View Your Orders</Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
