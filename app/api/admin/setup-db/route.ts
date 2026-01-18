import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

export async function POST() {
  try {
    console.log('🚀 Setting up database schema...')
    
    // Push database schema to create tables
    execSync('npx prisma db push --accept-data-loss', { 
      stdio: 'inherit',
      env: { ...process.env }
    })
    
    console.log('✅ Database schema created successfully!')
    
    return NextResponse.json({ 
      message: 'Database schema created successfully!',
      next: 'You can now seed the database by calling /api/admin/seed'
    })

  } catch (error) {
    console.error('❌ Error setting up database:', error)
    return NextResponse.json(
      { 
        error: 'Failed to setup database schema', 
        details: error instanceof Error ? error.message : 'Unknown error',
        suggestion: 'Make sure DATABASE_URL is set correctly in environment variables'
      },
      { status: 500 }
    )
  }
}