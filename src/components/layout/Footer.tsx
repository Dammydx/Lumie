import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter section */}
      <div className="bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p>Get the latest updates on new products and exclusive offers</p>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Lumié</h3>
            <p className="text-sm mb-4">
              Premium jewelry, fashion, and beauty products curated for your style.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=jewelry" className="hover:text-white">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/shop?category=fashion" className="hover:text-white">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/shop?category=beauty" className="hover:text-white">
                  Beauty
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-white">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-white">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-white">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact info */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-3 items-start">
              <Phone size={20} className="text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Phone</p>
                <p>+234 (0) 123 456 7890</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Mail size={20} className="text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Email</p>
                <p>support@lumie.com</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <MapPin size={20} className="text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Address</p>
                <p>Lagos, Nigeria</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {currentYear} Lumié. All rights reserved.</p>
          <div className="flex gap-6 text-sm mt-4 md:mt-0">
            <span>🇳🇬 Nigeria (NGN)</span>
            <span>English (EN)</span>
            <span>
              <Link to="/admin/login" className="hover:text-white">Admin</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
