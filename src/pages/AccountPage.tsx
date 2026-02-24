import Layout from '../components/layout/Layout'
import Breadcrumbs from '../components/common/Breadcrumbs'
import { useAuthStore } from '../store/authStore'
import { useState } from 'react'

export default function AccountPage() {
  const { profile, user } = useAuthStore()
  const [editing, setEditing] = useState(false)

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Account' }]} />
          <h1 className="text-2xl font-semibold mb-6">My Account</h1>
          {!user ? (
            <p>Please log in to view your account.</p>
          ) : (
            <div className="bg-white p-6 rounded shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium">{profile?.first_name} {profile?.last_name}</h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button className="text-sm text-purple-600" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
              </div>

              {editing ? (
                <p className="mt-4">Profile edit form goes here (not implemented).</p>
              ) : (
                <div className="mt-4 grid grid-cols-1 gap-2">
                  <div><strong>Phone:</strong> {profile?.phone || '—'}</div>
                  <div><strong>Default Address:</strong> —</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
