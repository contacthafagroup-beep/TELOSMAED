import { NextRequest, NextResponse } from 'next/server'

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'telosmaed2024' // Change this to a secure password
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      return NextResponse.json({ 
        success: true, 
        message: 'Authentication successful' 
      })
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    )
  }
}