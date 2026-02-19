import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export interface User {
  id: string
  email: string
  name: string | null
  role: string
  verified: boolean
  active: boolean
  avatar: string | null
  bio: string | null
  location: string | null
  website: string | null
  social: string | null
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        setState({
          user: data.user,
          loading: false,
          error: null,
        })
      } else {
        setState({
          user: null,
          loading: false,
          error: null,
        })
      }
    } catch (error) {
      setState({
        user: null,
        loading: false,
        error: 'Failed to check authentication',
      })
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok) {
        setState({
          user: data.user,
          loading: false,
          error: null,
        })
        return { success: true, user: data.user }
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: data.error || 'Login failed',
        }))
        return { success: false, error: data.error }
      }
    } catch (error) {
      const errorMessage = 'Login failed. Please try again.'
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      return { success: false, error: errorMessage }
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (response.ok) {
        // After registration, automatically log in
        return await login(email, password)
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: data.error || 'Registration failed',
        }))
        return { success: false, error: data.error }
      }
    } catch (error) {
      const errorMessage = 'Registration failed. Please try again.'
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      return { success: false, error: errorMessage }
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      setState({
        user: null,
        loading: false,
        error: null,
      })

      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        return { success: true, message: data.message }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: 'Failed to send reset email' }
    }
  }

  const resetPassword = async (token: string, password: string) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok) {
        return { success: true, message: data.message }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: 'Failed to reset password' }
    }
  }

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: !!state.user,
    isAdmin: state.user?.role === 'ADMIN' || state.user?.role === 'EDITOR',
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    refetch: checkAuth,
  }
}
