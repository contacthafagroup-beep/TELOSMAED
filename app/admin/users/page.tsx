import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { UserManagement } from '@/components/admin/user-management'

export default async function AdminUsersPage() {
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
            <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
            <p className="mt-2 text-slate-600">Manage users, roles, and permissions</p>
          </div>

          <UserManagement />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Admin auth error:', error)
    redirect('/login')
  }
}