import AdminLayout from '../../components/admin/AdminLayout'

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Total Orders: —</div>
        <div className="bg-white p-4 rounded shadow">Revenue: —</div>
        <div className="bg-white p-4 rounded shadow">Active Products: —</div>
      </div>
    </AdminLayout>
  )
}
