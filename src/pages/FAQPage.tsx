import Layout from '../components/layout/Layout'
import Breadcrumbs from '../components/common/Breadcrumbs'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqItems = [
  {
    category: 'Shipping & Delivery',
    items: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 3-5 business days depending on location. Express shipping is available for 1-2 day delivery.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, we ship within Nigeria only. International shipping coming soon.',
      },
      {
        q: 'Is shipping free?',
        a: 'Shipping is free on orders over ₦50,000. Orders below incur a flat rate of ₦2,500.',
      },
      {
        q: 'Can I change my shipping address?',
        a: 'Yes, as long as the order hasn\'t been dispatched. Contact support immediately.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer 14-day returns on all items in original condition with original packaging.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Go to Orders in your account, select the item, and click "Return Item". Follow the instructions.',
      },
      {
        q: 'How long do refunds take?',
        a: 'Refunds are processed within 5-7 business days after we receive and inspect returned items.',
      },
      {
        q: 'What if the item is defective?',
        a: 'Contact support immediately with photos. We\'ll replace or refund without requiring return.',
      },
    ],
  },
  {
    category: 'Payments',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Paystack, Stripe, and Flutterwave for secure online payments.',
      },
      {
        q: 'Is it safe to use my card?',
        a: 'Yes, all payments are encrypted using SSL. We never store card information.',
      },
      {
        q: 'Can I use a gift card?',
        a: 'Gift cards are coming soon. We\'ll notify you when available.',
      },
      {
        q: 'What currencies do you accept?',
        a: 'Currently we accept NGN (Nigerian Naira) only. Multi-currency support coming soon.',
      },
    ],
  },
  {
    category: 'Products & Orders',
    items: [
      {
        q: 'What does "out of stock" mean?',
        a: 'It means that item is not currently available. You can sign up to be notified when it\'s back in stock.',
      },
      {
        q: 'Can I cancel my order?',
        a: 'Yes, if the order hasn\'t been dispatched yet. Contact support to cancel.',
      },
      {
        q: 'How do I track my order?',
        a: 'Go to Orders in your account or use Track Order page with your order number.',
      },
      {
        q: 'Do you have size guides?',
        a: 'Yes, check the product details page for size/fit information and measurement guides.',
      },
    ],
  },
  {
    category: 'Account',
    items: [
      {
        q: 'How do I create an account?',
        a: 'Click "Register" and enter your email and password. We\'ll send a verification email.',
      },
      {
        q: 'I forgot my password. What do I do?',
        a: 'Click "Forgot password" on the login page and follow the instructions to reset it.',
      },
      {
        q: 'Is my information secure?',
        a: 'Yes, we use industry-standard encryption and follow data protection regulations.',
      },
      {
        q: 'Can I delete my account?',
        a: 'Yes, contact support to delete your account and all personal information.',
      },
    ],
  },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'FAQ' },
            ]}
          />

          <h1 className="text-4xl font-bold mt-8 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 mb-12 text-lg">
            Find answers to common questions about shopping, shipping, returns, and more.
          </p>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {faqItems.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeCategory === idx
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-600'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {faqItems[activeCategory].items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => toggleItem(idx)}
                className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:border-purple-600 transition-all"
              >
                <div className="flex items-start gap-3">
                  <ChevronDown
                    size={24}
                    className={`text-purple-600 flex-shrink-0 transition-transform ${
                      openItems.includes(idx) ? 'rotate-180' : ''
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-lg">{item.q}</p>
                    {openItems.includes(idx) && (
                      <p className="text-gray-600 mt-3 text-base">{item.a}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Still need help */}
          <div className="mt-16 bg-purple-50 border-2 border-purple-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Can't find your answer?</h2>
            <p className="text-gray-600 mb-4">
              Our customer support team is here to help. Reach out to us anytime.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
