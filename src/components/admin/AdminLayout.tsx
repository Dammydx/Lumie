import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function AdminLayout({ children }: any) {
  const { user } = useAuthStore()

  // Allow admin access via Supabase admin role OR local hardcoded admin flag
  const localAdmin = typeof window !== 'undefined' && localStorage.getItem('admin_auth') === 'true'
  const isAdmin = (!!user && user?.role === 'admin') || localAdmin

  // Simple guard - real guard should redirect
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Admin Access Required</h2>
          <p className="text-sm text-gray-600 mb-4">You must be logged in as an admin to view this section.</p>
          <div className="flex gap-4">
            <Link to="/login" className="text-purple-600">Sign In</Link>
            <Link to="/admin/login" className="text-purple-600">Admin Login</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="hidden md:block w-64 bg-white border-r min-h-screen p-4">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Lumié Admin</h3>
          </div>
          <nav className="space-y-2 text-sm">
            <Link to="/admin" className="block text-gray-700">Overview</Link>
            <Link to="/admin/products" className="block text-gray-700">Products</Link>
            <Link to="/admin/orders" className="block text-gray-700">Orders</Link>
            <Link to="/admin/customers" className="block text-gray-700">Customers</Link>
            <Link to="/admin/coupons" className="block text-gray-700">Coupons</Link>
            <Link to="/admin/shipping" className="block text-gray-700">Shipping</Link>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-8">
          {/* Mobile nav for admin */}
          <div className="md:hidden bg-white p-3 rounded mb-4 shadow">
            <label className="sr-only">Admin navigation</label>
            <select
              onChange={(e) => { if (e.target.value) window.location.href = e.target.value }}
              className="w-full p-2 border rounded"
              defaultValue=""
            >
              <option value="">Go to...</option>
              <option value="/admin">Overview</option>
              <option value="/admin/products">Products</option>
              <option value="/admin/orders">Orders</option>
              <option value="/admin/customers">Customers</option>
              <option value="/admin/coupons">Coupons</option>
              <option value="/admin/shipping">Shipping</option>
            </select>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
