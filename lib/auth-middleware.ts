import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-here-change-this-in-production'

export interface AuthUser {
  userId: string
  email: string
  role: string
}

export async function verifyAuth(request: NextRequest): Promise<AuthUser | null> {
  try {
    // Get token from cookie or Authorization header
    const token = request.cookies.get('auth_token')?.value || 
                  request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return null
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser

    // Verify user still exists and is active
    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, active: true }
    })

    if (!user || !user.active) {
      return null
    }

    return decoded

  } catch (error) {
    console.error('Auth verification error:', error)
    return null
  }
}

export async function requireAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: AuthUser) => Promise<NextResponse>
): Promise<NextResponse> {
  const user = await verifyAuth(request)

  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  return handler(request, user)
}

export async function requireRole(
  request: NextRequest,
  allowedRoles: string[],
  handler: (request: NextRequest, user: AuthUser) => Promise<NextResponse>
): Promise<NextResponse> {
  const user = await verifyAuth(request)

  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: 403 }
    )
  }

  return handler(request, user)
}

export async function requireAdmin(
  request: NextRequest,
  handler: (request: NextRequest, user: AuthUser) => Promise<NextResponse>
): Promise<NextResponse> {
  return requireRole(request, ['ADMIN', 'EDITOR'], handler)
}
