import { useState } from 'react'
import ImageUpload from '../common/ImageUpload'
import { productService } from '../../services/productService'

export default function AdminProductForm({ onCreated }: any) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    try {
      const created = await productService.createProduct({
        title,
        price: Number(price),
        currency: 'NGN',
        sku: `SKU-${Date.now()}`,
        stock_quantity: 100,
        images: imageUrl ? [imageUrl] : [],
        status: 'active',
      } as any)
      setTitle('')
      setPrice('')
      setImageUrl('')
      onCreated && onCreated(created)
      alert('Product created')
    } catch (err) {
      console.error('Create product failed', err)
      alert('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="font-medium mb-2">Create Product</h3>
      <div className="grid grid-cols-1 gap-2">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded" />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" className="p-2 border rounded" />
        <ImageUpload onUpload={(url: string) => setImageUrl(url)} />
        <div>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">{loading ? 'Saving...' : 'Save Product'}</button>
        </div>
      </div>
    </form>
  )
}
