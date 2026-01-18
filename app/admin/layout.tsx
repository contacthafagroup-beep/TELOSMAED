import { Metadata } from 'next'
import { AuthGuard } from '@/components/admin/auth-guard'

export const metadata: Metadata = {
  title: 'Admin Dashboard - TELOS MAED',
  description: 'Administrative dashboard for TELOS MAED website management',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="admin-layout">
        {children}
      </div>
    </AuthGuard>
  )
}