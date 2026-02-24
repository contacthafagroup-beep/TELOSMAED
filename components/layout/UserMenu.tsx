'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export default function UserMenu() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch user on mount and when pathname changes
  useEffect(() => {
    fetchUser()
  }, [pathname])

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include',
        cache: 'no-store', // Don't cache this request
      })
      
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include',
      })
      setUser(null)
      // Force full page reload to clear all state
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
    )
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
      >
        Sign Out
      </button>
    </div>
  )
}
