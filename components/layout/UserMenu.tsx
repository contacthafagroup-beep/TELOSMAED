'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export default function UserMenu() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      router.push('/')
      router.refresh()
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
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-slate-700 hover:text-slate-900 font-medium transition"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-slate-200">
            <p className="font-semibold text-slate-900">{user.name}</p>
            <p className="text-sm text-slate-600">{user.email}</p>
            <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
              {user.role}
            </span>
          </div>

          <div className="py-2">
            {user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="block px-4 py-2 text-slate-700 hover:bg-slate-50 transition"
                onClick={() => setIsOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            <Link
              href="/profile"
              className="block px-4 py-2 text-slate-700 hover:bg-slate-50 transition"
              onClick={() => setIsOpen(false)}
            >
              Profile Settings
            </Link>
            <Link
              href="/my-articles"
              className="block px-4 py-2 text-slate-700 hover:bg-slate-50 transition"
              onClick={() => setIsOpen(false)}
            >
              My Articles
            </Link>
          </div>

          <div className="border-t border-slate-200 pt-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
