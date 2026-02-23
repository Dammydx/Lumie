import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'

// Pages
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'

export default function App() {
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Information Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Placeholder routes - implement these pages */}
        <Route path="/wishlist" element={<div className="p-8">Wishlist Page - Coming Soon</div>} />
        <Route path="/account" element={<div className="p-8">Account Page - Coming Soon</div>} />
        <Route path="/orders" element={<div className="p-8">Orders Page - Coming Soon</div>} />
        <Route path="/order-confirmation/:id" element={<div className="p-8">Order Confirmation - Coming Soon</div>} />
        <Route path="/shipping" element={<div className="p-8">Shipping Info - Coming Soon</div>} />
        <Route path="/returns" element={<div className="p-8">Returns & Exchanges - Coming Soon</div>} />
        <Route path="/track-order" element={<div className="p-8">Track Order - Coming Soon</div>} />
        <Route path="/refund" element={<div className="p-8">Refund Policy - Coming Soon</div>} />
        <Route path="/forgot-password" element={<div className="p-8">Forgot Password - Coming Soon</div>} />
        <Route path="/reset-password" element={<div className="p-8">Reset Password - Coming Soon</div>} />
        <Route path="/new-arrivals" element={<ShopPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<div className="p-8">Admin Dashboard - Coming Soon</div>} />
        <Route path="/admin/products" element={<div className="p-8">Products Manager - Coming Soon</div>} />
        <Route path="/admin/orders" element={<div className="p-8">Orders Manager - Coming Soon</div>} />
        <Route path="/admin/customers" element={<div className="p-8">Customers Manager - Coming Soon</div>} />
        <Route path="/admin/coupons" element={<div className="p-8">Coupons Manager - Coming Soon</div>} />
        <Route path="/admin/shipping" element={<div className="p-8">Shipping Settings - Coming Soon</div>} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}


