import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/Layout'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setError('')
    if (password === 'MailPassword1') {
      if (typeof window !== 'undefined') localStorage.setItem('admin_auth', 'true')
      navigate('/admin')
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-6 rounded shadow">
          <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter admin password"
                required
              />
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>
            <div className="flex justify-between items-center">
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">Sign In</button>
              <button type="button" className="text-sm text-gray-500" onClick={() => { if (typeof window !== 'undefined') localStorage.removeItem('admin_auth'); navigate('/') }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
