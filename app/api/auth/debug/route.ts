import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-here-change-this-in-production'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json({
        authenticated: false,
        message: 'No auth token found in cookies',
        cookies: Object.fromEntries(
          Array.from(cookieStore.getAll()).map(c => [c.name, c.value.substring(0, 20) + '...'])
        )
      })
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      
      return NextResponse.json({
        authenticated: true,
        token: token.substring(0, 20) + '...',
        decoded: {
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role,
          roleUpperCase: decoded.role?.toUpperCase(),
          isAdmin: decoded.role?.toUpperCase() === 'ADMIN',
          exp: decoded.exp ? new Date(decoded.exp * 1000).toISOString() : null
        }
      })
    } catch (jwtError: any) {
      return NextResponse.json({
        authenticated: false,
        message: 'Invalid token',
        error: jwtError.message,
        token: token.substring(0, 20) + '...'
      })
    }

  } catch (error: any) {
    return NextResponse.json({
      error: 'Debug check failed',
      message: error.message
    }, { status: 500 })
  }
}
