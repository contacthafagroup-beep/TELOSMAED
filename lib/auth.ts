import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'

interface TokenPayload {
  userId: string
  email: string
  name: string
  role: string
}

// Generate JWT token
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

// Verify JWT token
export async function verifyToken(token: string): Promise<TokenPayload> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload
    return decoded
  } catch (error) {
    throw new Error('Invalid token')
  }
}

// Simple authentication utilities (legacy - for backward compatibility)
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'telosmaed@2025'
}

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export function setAuthToken() {
  if (typeof window !== 'undefined') {
    const token = btoa(`${Date.now()}:admin`)
    // Use sessionStorage instead of localStorage for session-only authentication
    sessionStorage.setItem('admin_token', token)
    // Set expiration for current session only (1 hour)
    sessionStorage.setItem('admin_token_expires', (Date.now() + 60 * 60 * 1000).toString())
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    // Check sessionStorage instead of localStorage
    const token = sessionStorage.getItem('admin_token')
    const expires = sessionStorage.getItem('admin_token_expires')
    
    if (token && expires && Date.now() < parseInt(expires)) {
      return token
    }
    
    // Token expired or doesn't exist, clear it
    clearAuthToken()
  }
  return null
}

export function clearAuthToken() {
  if (typeof window !== 'undefined') {
    // Clear from sessionStorage
    sessionStorage.removeItem('admin_token')
    sessionStorage.removeItem('admin_token_expires')
    // Also clear from localStorage in case there are old tokens
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_token_expires')
  }
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null
}

// Clear authentication when navigating away from admin
export function clearAuthOnNavigation() {
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname
    if (!currentPath.startsWith('/admin')) {
      clearAuthToken()
    }
  }
}

// Auto-clear tokens on page visibility change (tab switch, minimize)
export function setupAutoLogout() {
  if (typeof window !== 'undefined') {
    let inactivityTimer: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        clearAuthToken()
        window.location.reload()
      }, 10 * 60 * 1000) // 10 minutes of inactivity
    }

    const handleActivity = () => {
      if (window.location.pathname.startsWith('/admin')) {
        resetTimer()
      }
    }

    // Reset timer on user activity
    document.addEventListener('mousedown', handleActivity)
    document.addEventListener('keydown', handleActivity)
    document.addEventListener('scroll', handleActivity)
    document.addEventListener('touchstart', handleActivity)

    // Initial timer
    resetTimer()

    return () => {
      clearTimeout(inactivityTimer)
      document.removeEventListener('mousedown', handleActivity)
      document.removeEventListener('keydown', handleActivity)
      document.removeEventListener('scroll', handleActivity)
      document.removeEventListener('touchstart', handleActivity)
    }
  }
}