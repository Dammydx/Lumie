import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useAuthStore } from '../../store/authStore'
import { productService } from '../../services/productService'
import { Category } from '../../types'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const cartItems = useCartStore((state) => state.cart.items)
  const { isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await productService.getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Failed to load categories:', error)
      }
    }

    loadCategories()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setIsSearchOpen(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setDropdownOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-gray-50 border-b px-4 py-2 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p>Welcome to Lumié - Premium Jewelry, Fashion & Beauty</p>
          <div className="space-x-4">
            <Link to="/about" className="hover:text-gray-900">
              About
            </Link>
            <Link to="/contact" className="hover:text-gray-900">
              Contact
            </Link>
            <Link to="/faq" className="hover:text-gray-900">
              FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="px-4 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile header */}
          <div className="flex md:hidden justify-between items-center mb-4">
            <Link to="/" className="text-2xl font-bold text-purple-600">
              Lumié
            </Link>
            <div className="flex gap-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Search size={20} />
              </button>
              <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg">
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Desktop header */}
          <div className="hidden md:flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-purple-600 flex-shrink-0">
              Lumié
            </Link>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex-1 mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                >
                  <Search size={18} className="text-gray-500" />
                </button>
              </div>
            </form>

            {/* Right icons */}
            <div className="flex gap-6 items-center flex-shrink-0">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <User size={20} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-10">
                      <Link
                        to="/account"
                        className="block px-4 py-2 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Account
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block px-4 py-2 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Wishlist
                      </Link>
                      <Link
                        to="/admin"
                        className="block px-4 py-2 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 border-t flex items-center gap-2"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-1"
                >
                  <User size={20} /> Login
                </Link>
              )}

              <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Heart size={20} />
              </Link>

              <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-lg relative">
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Categories menu */}
          <div className="hidden md:flex gap-6 mt-4 border-t pt-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="hover:text-purple-600 font-medium"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-4 border-t">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search size={18} className="text-gray-500" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="px-4 py-4 space-y-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="block py-2 hover:text-purple-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <hr />
                <Link
                  to="/account"
                  className="block py-2 hover:text-purple-600"
                  onClick={() => setIsOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  to="/orders"
                  className="block py-2 hover:text-purple-600"
                  onClick={() => setIsOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="block py-2 hover:text-purple-600"
                  onClick={() => setIsOpen(false)}
                >
                  Wishlist
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 hover:text-purple-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <hr />
                <Link
                  to="/login"
                  className="block py-2 hover:text-purple-600"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 hover:text-purple-600"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
