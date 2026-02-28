import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import Link from 'next/link'

export default async function AdminTest() {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()
  const token = cookieStore.get('auth_token')?.value

  let authStatus = {
    hasToken: !!token,
    tokenLength: token?.length || 0,
    cookieCount: allCookies.length,
    cookies: allCookies.map(c => c.name),
    verified: false,
    role: null,
    error: null
  }

  if (token) {
    try {
      const payload = await verifyToken(token)
      authStatus.verified = true
      authStatus.role = payload.role
    } catch (error: any) {
      authStatus.error = error.message
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Authentication Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Server-Side Cookie Check</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>Has Token: <span className={authStatus.hasToken ? 'text-green-600' : 'text-red-600'}>
              {authStatus.hasToken ? 'YES' : 'NO'}
            </span></div>
            <div>Token Length: {authStatus.tokenLength}</div>
            <div>Cookie Count: {authStatus.cookieCount}</div>
            <div>Cookies: {authStatus.cookies.join(', ')}</div>
            <div>Verified: <span className={authStatus.verified ? 'text-green-600' : 'text-red-600'}>
              {authStatus.verified ? 'YES' : 'NO'}
            </span></div>
            <div>Role: {authStatus.role || 'N/A'}</div>
            {authStatus.error && <div className="text-red-600">Error: {authStatus.error}</div>}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Comparison</h2>
          <p className="mb-4">
            If this page shows you have a token but /admin redirects to login, 
            there's an issue with how the admin layout reads cookies.
          </p>
          <div className="space-y-2">
            <Link 
              href="/api/auth/debug"
              className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
            >
              Check /api/auth/debug
            </Link>
            <Link 
              href="/admin"
              className="block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
            >
              Try /admin (will redirect if broken)
            </Link>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold mb-2">Expected Behavior:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Has Token: YES</li>
            <li>Verified: YES</li>
            <li>Role: ADMIN</li>
            <li>/admin should NOT redirect</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
