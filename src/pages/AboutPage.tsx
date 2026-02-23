import Layout from '../components/layout/Layout'
import Breadcrumbs from '../components/common/Breadcrumbs'
import Button from '../components/common/Button'
import { Heart, Shield, Leaf, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'About Us' },
              ]}
            />
            <h1 className="text-4xl md:text-5xl font-bold mt-8">About Lumié</h1>
            <p className="text-xl opacity-90 mt-4 max-w-2xl">
              Your destination for premium jewelry, fashion, and beauty products.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Our Story */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Lumié was founded with a simple vision: to make premium jewelry, fashion, and beauty
              products accessible to everyone. We believe that everyone deserves to feel beautiful
              and confident, regardless of their budget.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              What started as a small collection has grown into a curated marketplace featuring
              hundreds of handpicked products from emerging and established brands across Africa and
              beyond.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Today, we're proud to serve thousands of customers who trust us for quality,
              authenticity, and exceptional service.
            </p>
          </section>

          {/* Values */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12">Our Values</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: <Heart size={40} className="text-pink-600" />,
                  title: 'Quality',
                  desc: 'We curate every product to ensure it meets our high standards.',
                },
                {
                  icon: <Shield size={40} className="text-blue-600" />,
                  title: 'Trust',
                  desc: 'Your satisfaction and security are our top priorities.',
                },
                {
                  icon: <Leaf size={40} className="text-green-600" />,
                  title: 'Sustainability',
                  desc: 'We prioritize eco-friendly and ethical products.',
                },
                {
                  icon: <Zap size={40} className="text-yellow-600" />,
                  title: 'Innovation',
                  desc: 'We continuously improve to serve you better.',
                },
              ].map((value) => (
                <div key={value.title} className="bg-gray-50 p-6 rounded-lg">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* By Numbers */}
          <section className="mb-20 bg-purple-50 rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-12 text-center">By The Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: '10K+', label: 'Happy Customers' },
                { number: '2,500+', label: 'Products' },
                { number: '98%', label: 'Satisfaction Rate' },
                { number: '50+', label: 'Brands' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-bold text-purple-600 mb-2">{stat.number}</p>
                  <p className="text-gray-600 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Zainab Ahmed',
                  role: 'Founder & CEO',
                  bio: 'Fashion enthusiast with 10+ years in retail and e-commerce.',
                },
                {
                  name: 'Chioma Okoro',
                  role: 'Head of Products',
                  bio: 'Passionate about curating the best selection for our customers.',
                },
                {
                  name: 'James Mensah',
                  role: 'CTO',
                  bio: 'Tech innovator building the platform that powers Lumié.',
                },
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl text-white">
                    👤
                  </div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-purple-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Have a Question?</h2>
            <p className="text-lg opacity-90 mb-6">
              We'd love to hear from you. Reach out to our team anytime.
            </p>
            <a href="/contact">
              <Button variant="secondary">Contact Us</Button>
            </a>
          </section>
        </div>
      </div>
    </Layout>
  )
}
