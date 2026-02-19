'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useAuth, User } from '@/lib/hooks/use-auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<any>
  register: (email: string, password: string, name: string) => Promise<any>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<any>
  resetPassword: (token: string, password: string) => Promise<any>
  refetch: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
