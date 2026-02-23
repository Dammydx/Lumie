import { useState } from 'react'
import { Trash2, ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Breadcrumbs from '../components/common/Breadcrumbs'
import Button from '../components/common/Button'
import { useCartStore } from '../store/cartStore'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore()
  const [couponCode, setCouponCode] = useState('')

  const subTotal = cart.items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)
  const tax = subTotal * 0.075 // 7.5% tax
  const shippingFee = subTotal > 50000 ? 0 : 2500
  const total = subTotal + tax + shippingFee

  if (cart.items.length === 0) {
    return (
      <Layout>
        <div className="bg-gray-50 min-h-screen py-12">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Cart' },
              ]}
            />

            <div className="text-center py-20">
              <CheckCircle size={64} className="mx-auto text-gray-300 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">Add some products to get started</p>
              <Link to="/shop">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cart' },
            ]}
          />

          <h1 className="text-3xl font-bold text-gray-900 my-8">Shopping Cart</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow p-6 flex gap-6 items-center"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
                      {item.product?.images?.[0] && (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product_id}`}
                        className="font-semibold text-gray-900 hover:text-purple-600"
                      >
                        {item.product?.title}
                      </Link>
                      <p className="text-2xl font-bold text-purple-600 mt-2">
                        ₦{((item.product?.discount_price || item.product?.price) || 0).toLocaleString()}
                      </p>

                      {/* Variant selections */}
                      {Object.entries(item.variant_selections).length > 0 && (
                        <div className="text-sm text-gray-600 mt-2">
                          {Object.entries(item.variant_selections).map(([key, value]) => (
                            <span key={key}>
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Clear Cart */}
              <button
                onClick={() => clearCart()}
                className="text-red-500 font-semibold mt-6 hover:text-red-700"
              >
                Clear cart
              </button>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Coupon */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <Button size="sm">Apply</Button>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-3 mb-6 border-b pb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₦{subTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (7.5%)</span>
                    <span>₦{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? 'Free' : `₦${shippingFee.toLocaleString()}`}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-purple-600">₦{total.toLocaleString()}</span>
                </div>

                {/* Checkout */}
                <Link to="/checkout" className="w-full">
                  <Button className="w-full flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </Button>
                </Link>

                {/* Continue Shopping */}
                <Link to="/shop" className="mt-3">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Info */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
                  ✓ Free shipping on orders over ₦50,000
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
