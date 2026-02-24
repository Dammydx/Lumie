import Layout from '../components/layout/Layout'
import Breadcrumbs from '../components/common/Breadcrumbs'
import { useState } from 'react'
import { orderService } from '../services/orderService'

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function handleTrack(e: any) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await orderService.trackOrder(orderNumber)
      setResult(res)
    } catch (err) {
      console.error(err)
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Track Order' }]} />
          <h1 className="text-2xl font-semibold mb-6">Track Your Order</h1>
          <form onSubmit={handleTrack} className="mb-6">
            <input value={orderNumber} onChange={e => setOrderNumber(e.target.value)} placeholder="Enter order number" className="w-full p-3 rounded border" />
            <button disabled={loading || !orderNumber} className="mt-3 px-4 py-2 bg-purple-600 text-white rounded">Track</button>
          </form>

          {loading ? <p>Searching...</p> : result ? (
            <div className="bg-white p-4 rounded shadow">
              <p>Order #{result.order_number}</p>
              <p>Status: {result.status}</p>
              <p>Estimated Delivery: {result.estimated_delivery || '—'}</p>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  )
}
