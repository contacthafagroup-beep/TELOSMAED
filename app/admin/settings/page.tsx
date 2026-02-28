import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

export default async function AdminSettingsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value

  if (!token) {
    redirect('/login')
  }

  try {
    const payload = await verifyToken(token)
    
    if (payload.role.toUpperCase() !== 'ADMIN') {
      redirect('/')
    }

    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Site Settings</h1>
            <p className="mt-2 text-slate-600">Configure site-wide settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">General Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Site Title
                  </label>
                  <input
                    type="text"
                    defaultValue="TELOS MAED"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Site Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="An Evangelical Christian intellectual magazine focused on faith, leadership, youth culture, and creative worship."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    placeholder="admin@telosmaed.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Content Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Content Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Enable Comments
                    </label>
                    <p className="text-xs text-slate-500">Allow users to comment on articles</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Moderate Comments
                    </label>
                    <p className="text-xs text-slate-500">Require approval before publishing</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Enable Newsletter
                    </label>
                    <p className="text-xs text-slate-500">Allow newsletter subscriptions</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    defaultValue="Christian magazine, faith, leadership, youth culture, worship, evangelical"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    placeholder="GA-XXXXXXXXX-X"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Social Media</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Facebook Page
                  </label>
                  <input
                    type="url"
                    placeholder="https://facebook.com/telosmaed"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Twitter Handle
                  </label>
                  <input
                    type="text"
                    placeholder="@telosmaed"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/telosmaed"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Admin auth error:', error)
    redirect('/login')
  }
}