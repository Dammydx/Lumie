import { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import Button from '../components/common/Button'
import { useCartStore } from '../store/cartStore'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Mail, Phone, MapPin } from 'lucide-react'
import { orderService } from '../services/orderService'
import { paymentService } from '../services/paymentService'
import { emailService } from '../services/emailService'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { cart, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const step = 3

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Nigeria',
    paymentMethod: 'paystack',
  })

  useEffect(() => {
    if (cart.items.length === 0) {
      navigate('/cart')
    }
  }, [cart, navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Build order payload
      const orderNumber = `ORD-${Date.now()}`
      const items = cart.items.map((it) => ({
        product_id: it.product?.id,
        variant_id: null,
        price: it.product?.discount_price || it.product?.price || 0,
        quantity: it.quantity,
      }))

      const orderPayload: any = {
        user_id: user?.id || null,
        order_number: orderNumber,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        shipping_address: `${formData.streetAddress}, ${formData.city}, ${formData.state}, ${formData.country}`,
        subtotal: subTotal,
        tax,
        shipping_fee: shippingFee,
        total,
        payment_method: formData.paymentMethod,
        payment_status: 'pending',
        status: 'pending',
        items,
      }

      // Create order record in DB
      const created = await orderService.createOrder(orderPayload)

      // Initialize payment based on selected provider
      if (formData.paymentMethod === 'paystack') {
        await paymentService.initializePaystack({
          email: formData.email,
          amount: Math.round(total),
          reference: orderNumber,
        })
        // For demo, mark completed immediately
        await orderService.updatePaymentStatus(created.id, 'completed')
      } else if (formData.paymentMethod === 'stripe') {
        await paymentService.initializeStripe({ paymentMethodId: null, amount: Math.round(total) })
        await orderService.updatePaymentStatus(created.id, 'completed')
      } else if (formData.paymentMethod === 'flutterwave') {
        await paymentService.initializeFlutterwave({ email: formData.email, amount: Math.round(total) })
        await orderService.updatePaymentStatus(created.id, 'completed')
      }

      // Send confirmation email (enqueue) - best-effort
      try {
        await emailService.sendOrderConfirmation({
          order_number: created.order_number || orderNumber,
          email: created.email || formData.email,
          total: created.total || total,
        })
      } catch (e) {
        console.warn('Failed to enqueue email', e)
      }

      // Clear cart and redirect to confirmation
      clearCart()
      navigate(`/order-confirmation/${created.id}`)
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const subTotal = cart.items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)
  const tax = subTotal * 0.075
  const shippingFee = subTotal > 50000 ? 0 : 2500
  const total = subTotal + tax + shippingFee

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          {/* Steps */}
          <div className="flex gap-2 mb-8 max-w-2xl">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full ${
                  s <= step ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Info */}
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Mail size={20} /> Contact Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <MapPin size={20} /> Delivery Address
                    </h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="streetAddress"
                        placeholder="Street Address"
                        value={formData.streetAddress}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        />
                        <input
                          type="text"
                          name="state"
                          placeholder="State/Province"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        />
                        <input
                          type="text"
                          name="postalCode"
                          placeholder="Postal Code"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        />
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        >
                          <option>Nigeria</option>
                          <option>Ghana</option>
                          <option>Kenya</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Phone size={20} /> Payment Method
                    </h2>
                    <div className="space-y-3">
                      {['paystack', 'stripe', 'flutterwave'].map((method) => (
                        <label key={method} className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={formData.paymentMethod === method}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span className="font-semibold capitalize">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <Button type="submit" isLoading={loading} className="w-full">
                    Complete Order
                  </Button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-6 pb-6 border-b max-h-96 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.product?.title?.substring(0, 20)}... x {item.quantity}
                      </span>
                      <span className="font-semibold">
                        ₦{(((item.product?.discount_price || item.product?.price) || 0) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Breakdown */}
                <div className="space-y-3 mb-6 border-b pb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{subTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (7.5%)</span>
                    <span>₦{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? 'Free' : `₦${shippingFee.toLocaleString()}`}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-purple-600">₦{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
