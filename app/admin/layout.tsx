import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value

  console.log('[Admin Layout] Token exists:', !!token)

  if (!token) {
    console.log('[Admin Layout] No token, redirecting to login')
    redirect('/login')
  }

  try {
    const payload = await verifyToken(token)
    console.log('[Admin Layout] Token verified, role:', payload.role, 'isAdmin:', payload.role.toUpperCase() === 'ADMIN')
    
    // Check for both uppercase and lowercase admin role
    if (payload.role.toUpperCase() !== 'ADMIN') {
      console.log('[Admin Layout] Not admin, redirecting to home')
      redirect('/')
    }

    console.log('[Admin Layout] Access granted')
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-lg font-bold text-slate-900">
                  TELOS MAED
                </Link>
                <nav className="flex space-x-4">
                  <Link
                    href="/admin"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/articles"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Articles
                  </Link>
                  <Link
                    href="/admin/users"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Users
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Settings
                  </Link>
                </nav>
              </div>
              <Link
                href="/"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                ← Back to Site
              </Link>
            </div>
          </div>
        </div>
        {children}
      </div>
    )
  } catch (error) {
    console.error('[Admin Layout] Auth error:', error)
    redirect('/login')
  }
}
