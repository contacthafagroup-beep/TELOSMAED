import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Try to query the users table
    const users = await db.user.findMany({
      take: 1,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount: users.length,
      hasPasswordColumn: false, // We'll check this manually
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      details: 'Database connection failed or password column missing'
    }, { status: 500 })
  }
}
