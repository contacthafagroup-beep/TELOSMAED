'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, clearAuthToken, setupAutoLogout } from '@/lib/auth'
import { LoginForm } from './login-form'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated()
      setIsAuth(authenticated)
    }

    // Initial auth check
    checkAuth()
    
    // Check auth status more frequently (every 30 seconds)
    const interval = setInterval(checkAuth, 30000)
    
    // Setup auto-logout on inactivity
    const cleanup = setupAutoLogout()
    
    // Clear tokens when page is about to unload (browser close/refresh)
    const handleBeforeUnload = () => {
      clearAuthToken()
    }
    
    // Clear tokens when user navigates away from admin
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden (user switched tabs or minimized)
        // Clear tokens after 2 minutes of inactivity for extra security
        setTimeout(() => {
          if (document.hidden) {
            clearAuthToken()
            setIsAuth(false)
          }
        }, 2 * 60 * 1000) // Clear after 2 minutes of inactivity
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      clearInterval(interval)
      cleanup?.()
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Loading state
  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Not authenticated - show login form
  if (!isAuth) {
    return <LoginForm />
  }

  // Authenticated - show admin content
  return <>{children}</>
}