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
import WishlistPage from './pages/WishlistPage'
import AccountPage from './pages/AccountPage'
import OrdersPage from './pages/OrdersPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import TrackOrderPage from './pages/TrackOrderPage'

// Admin
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminProductsPage from './pages/admin/AdminProductsPage'
import AdminOrdersPage from './pages/admin/AdminOrdersPage'
import AdminCustomersPage from './pages/admin/AdminCustomersPage'
import AdminCouponsPage from './pages/admin/AdminCouponsPage'
import AdminShippingPage from './pages/admin/AdminShippingPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import ScrollToTopOnRoute from './components/common/ScrollToTopOnRoute'
import ScrollToTopButton from './components/common/ScrollToTopButton'

export default function App() {
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <Router>
      <ScrollToTopOnRoute />
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
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
        <Route path="/shipping" element={<div className="p-8">Shipping Info - Coming Soon</div>} />
        <Route path="/returns" element={<div className="p-8">Returns & Exchanges - Coming Soon</div>} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/refund" element={<div className="p-8">Refund Policy - Coming Soon</div>} />
        <Route path="/forgot-password" element={<div className="p-8">Forgot Password - Coming Soon</div>} />
        <Route path="/reset-password" element={<div className="p-8">Reset Password - Coming Soon</div>} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/new-arrivals" element={<ShopPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/customers" element={<AdminCustomersPage />} />
        <Route path="/admin/coupons" element={<AdminCouponsPage />} />
        <Route path="/admin/shipping" element={<AdminShippingPage />} />

        {/* Scroll to top button (visible site-wide) */}

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ScrollToTopButton />
    </Router>
  )
}


