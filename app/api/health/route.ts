import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const healthCheck = {
    timestamp: new Date().toISOString(),
    status: 'unknown',
    database: {
      connected: false,
      error: null as string | null,
      articlesCount: 0,
      usersCount: 0,
    },
    environment: {
      nodeEnv: process.env.NODE_ENV,
      databaseConfigured: !!process.env.DATABASE_URL,
      databaseUrlPrefix: process.env.DATABASE_URL?.substring(0, 20) + '...',
    }
  }

  try {
    // Test database connection with a simple query
    await db.$connect()
    
    // Try to count articles
    const articlesCount = await db.article.count()
    const usersCount = await db.user.count()
    
    healthCheck.database.connected = true
    healthCheck.database.articlesCount = articlesCount
    healthCheck.database.usersCount = usersCount
    healthCheck.status = 'healthy'

    await db.$disconnect()

    return NextResponse.json(healthCheck, { status: 200 })
  } catch (error: any) {
    healthCheck.status = 'unhealthy'
    healthCheck.database.connected = false
    healthCheck.database.error = error.message || 'Unknown database error'

    console.error('Health check failed:', error)

    return NextResponse.json(healthCheck, { status: 503 })
  }
}
