import AdminLayout from '../../components/admin/AdminLayout'
import AdminProductForm from '../../components/admin/AdminProductForm'
import { useEffect, useState } from 'react'
import { productService } from '../../services/productService'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const res = await productService.getProducts(1, 1000)
      setProducts(res.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    try {
      await productService.deleteProduct(id)
      await load()
    } catch (err) {
      console.error(err)
      alert('Failed to delete')
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Products</h1>
      </div>
      <div className="space-y-4">
        <AdminProductForm onCreated={load} />

        <div className="bg-white p-4 rounded shadow overflow-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="p-2">Title</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Stock</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2">{p.title}</td>
                    <td className="p-2">₦{p.price?.toLocaleString()}</td>
                    <td className="p-2">{p.stock_quantity}</td>
                    <td className="p-2">
                      <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
