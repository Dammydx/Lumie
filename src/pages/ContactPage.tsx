import Layout from '../components/layout/Layout'
import Button from '../components/common/Button'
import Breadcrumbs from '../components/common/Breadcrumbs'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact Us' },
            ]}
          />

          <h1 className="text-4xl font-bold mt-8 mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-12 text-lg">
            Have questions? We'd love to hear from you. Get in touch with our support team.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Phone size={32} className="text-purple-600" />,
                title: 'Phone',
                details: '+234 (0) 123 456 7890',
                time: 'Mon-Fri: 9AM-6PM WAT',
              },
              {
                icon: <Mail size={32} className="text-purple-600" />,
                title: 'Email',
                details: 'support@lumie.com',
                time: '24/7 Response',
              },
              {
                icon: <MapPin size={32} className="text-purple-600" />,
                title: 'Address',
                details: 'Lagos, Nigeria',
                time: 'Visit by appointment',
              },
            ].map((contact) => (
              <div key={contact.title} className="bg-white rounded-lg shadow p-6 text-center">
                <div className="flex justify-center mb-4">{contact.icon}</div>
                <h3 className="font-bold text-lg mb-2">{contact.title}</h3>
                <p className="text-gray-900 font-semibold mb-2">{contact.details}</p>
                <p className="text-sm text-gray-600">{contact.time}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Message</label>
                  <textarea
                    placeholder="Tell us more..."
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  ></textarea>
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">FAQ</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'What is your return policy?',
                    a: 'We offer 14-day returns on all items in original condition.',
                  },
                  {
                    q: 'How long does shipping take?',
                    a: 'Standard shipping takes 3-5 business days. Expedited is 1-2 days.',
                  },
                  {
                    q: 'What payment methods do you accept?',
                    a: 'We accept Paystack, Stripe, and Flutterwave payments.',
                  },
                  {
                    q: 'Can I cancel my order?',
                    a: 'Yes, if not yet shipped. Contact support immediately.',
                  },
                ].map((item, i) => (
                  <div key={i} className="border-l-4 border-purple-600 pl-4">
                    <p className="font-semibold text-gray-900">{item.q}</p>
                    <p className="text-gray-600 text-sm mt-1">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
